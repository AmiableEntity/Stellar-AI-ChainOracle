import { getHorizonClient } from "./client";
import type { StellarTransaction, StellarNetwork } from "@/types";
import { HORIZON_PAGE_LIMIT } from "@/config/stellar";

/**
 * Fetch recent transactions for a Stellar account.
 */
export async function fetchTransactions(
  address: string,
  options: {
    limit?: number;
    network?: StellarNetwork;
    cursor?: string;
    order?: "asc" | "desc";
  } = {}
): Promise<StellarTransaction[]> {
  const { limit = HORIZON_PAGE_LIMIT, network, cursor, order = "desc" } = options;
  const server = getHorizonClient(network);

  let builder = server
    .transactions()
    .forAccount(address)
    .limit(limit)
    .order(order)
    .includeFailed(false);

  if (cursor) {
    builder = builder.cursor(cursor);
  }

  const response = await builder.call();

  return response.records.map((tx) => ({
    id: tx.id,
    hash: tx.hash,
    ledger: tx.ledger_attr,
    createdAt: tx.created_at,
    sourceAccount: tx.source_account,
    fee: String(tx.fee_charged),
    operationCount: tx.operation_count,
    memoType: tx.memo_type ?? "none",
    memo: tx.memo,
    successful: tx.successful,
  }));
}

/**
 * Fetch payment operations for a Stellar account.
 * Filters to only payment-type operations.
 */
export async function fetchPayments(
  address: string,
  options: {
    limit?: number;
    network?: StellarNetwork;
    minAmount?: number;
  } = {}
) {
  const { limit = HORIZON_PAGE_LIMIT, network, minAmount } = options;
  const server = getHorizonClient(network);

  const response = await server
    .payments()
    .forAccount(address)
    .limit(limit)
    .order("desc")
    .call();

  let payments = response.records;

  // Filter by minimum amount if specified
  if (minAmount !== undefined) {
    payments = payments.filter((p) => {
      const amount = parseFloat("amount" in p ? (p.amount as string) : "0");
      return amount >= minAmount;
    });
  }

  return payments;
}

/**
 * Fetch trustline changes (change_trust operations) for an account.
 * TODO: Expand with Soroban token trustlines when available.
 */
export async function fetchTrustlineChanges(
  address: string,
  options: { limit?: number; network?: StellarNetwork } = {}
) {
  const { limit = HORIZON_PAGE_LIMIT, network } = options;
  const server = getHorizonClient(network);

  const response = await server
    .operations()
    .forAccount(address)
    .limit(limit)
    .order("desc")
    .call();

  return response.records.filter((op) => op.type === "change_trust");
}
