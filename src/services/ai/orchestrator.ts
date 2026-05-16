import { getAIClient, AI_MODEL } from "./provider";
import { buildSystemPrompt, buildContextPrompt } from "./prompts";
import { extractStellarAddresses } from "@/lib/utils";
import { fetchAccount, fetchTransactions, fetchPayments, fetchTrustlineChanges } from "@/services/stellar";
import type { ChatMessage, StellarNetwork, BlockchainQueryType } from "@/types";

/**
 * Detect what kind of blockchain query the user is making.
 */
export function detectQueryType(message: string): BlockchainQueryType {
  const lower = message.toLowerCase();
  if (lower.includes("payment") || lower.includes("sent") || lower.includes("received")) {
    return "payments";
  }
  if (lower.includes("trustline") || lower.includes("trust")) {
    return "trustlines";
  }
  if (lower.includes("transaction") || lower.includes("tx") || lower.includes("history")) {
    return "transactions";
  }
  if (lower.includes("suspicious") || lower.includes("unusual") || lower.includes("pattern")) {
    return "suspicious_activity";
  }
  if (lower.includes("summary") || lower.includes("analyze") || lower.includes("overview")) {
    return "wallet_summary";
  }
  if (lower.includes("account") || lower.includes("balance") || lower.includes("wallet")) {
    return "account_info";
  }
  return "general";
}

/**
 * Fetch relevant blockchain data based on query type and wallet address.
 */
async function fetchBlockchainContext(
  message: string,
  walletAddress: string | undefined,
  network: StellarNetwork
): Promise<{ data: unknown; queryType: BlockchainQueryType }> {
  // Extract address from message if not provided
  const addresses = extractStellarAddresses(message);
  const address = walletAddress ?? addresses[0];

  if (!address) {
    return { data: null, queryType: "general" };
  }

  const queryType = detectQueryType(message);

  try {
    switch (queryType) {
      case "account_info":
      case "wallet_summary": {
        const [account, transactions] = await Promise.all([
          fetchAccount(address, network),
          fetchTransactions(address, { limit: 10, network }),
        ]);
        return { data: { account, recentTransactions: transactions }, queryType };
      }

      case "payments": {
        // Extract minimum amount from message if mentioned
        const amountMatch = message.match(/(\d+(?:\.\d+)?)\s*xlm/i);
        const minAmount = amountMatch ? parseFloat(amountMatch[1]) : undefined;
        const [account, payments] = await Promise.all([
          fetchAccount(address, network),
          fetchPayments(address, { limit: 20, network, minAmount }),
        ]);
        return { data: { account, payments }, queryType };
      }

      case "trustlines": {
        const [account, trustlineChanges] = await Promise.all([
          fetchAccount(address, network),
          fetchTrustlineChanges(address, { limit: 20, network }),
        ]);
        return { data: { account, trustlineChanges }, queryType };
      }

      case "transactions":
      case "suspicious_activity": {
        const [account, transactions] = await Promise.all([
          fetchAccount(address, network),
          fetchTransactions(address, { limit: 50, network }),
        ]);
        return { data: { account, transactions }, queryType };
      }

      default:
        return { data: null, queryType: "general" };
    }
  } catch {
    return { data: null, queryType };
  }
}

/**
 * Main chat orchestrator — fetches blockchain data and streams AI response.
 */
export async function* streamChatResponse(
  message: string,
  history: ChatMessage[],
  options: {
    walletAddress?: string;
    network?: StellarNetwork;
  } = {}
): AsyncGenerator<string> {
  const network = options.network ?? "testnet";
  const client = getAIClient();

  // Fetch relevant blockchain data
  const { data: blockchainData } = await fetchBlockchainContext(
    message,
    options.walletAddress,
    network
  );

  const contextualMessage = buildContextPrompt(
    message,
    blockchainData ? JSON.stringify(blockchainData, null, 2) : undefined
  );

  // Build message history for the model
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt(network) },
    ...history.slice(-10).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: contextualMessage },
  ];

  const stream = await client.chat.completions.create({
    model: AI_MODEL,
    messages,
    stream: true,
    temperature: 0.3, // Lower temp for more factual blockchain analysis
    max_tokens: 2048,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

// Re-export OpenAI type for use in messages array
import type OpenAI from "openai";
