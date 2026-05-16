// ─── Core Domain Types ────────────────────────────────────────────────────────

export type StellarNetwork = "mainnet" | "testnet" | "futurenet";

export interface StellarAccount {
  id: string;
  sequence: string;
  balances: StellarBalance[];
  subentryCount: number;
  lastModifiedLedger: number;
  thresholds: {
    lowThreshold: number;
    medThreshold: number;
    highThreshold: number;
  };
  flags: {
    authRequired: boolean;
    authRevocable: boolean;
    authImmutable: boolean;
  };
  signers: StellarSigner[];
  data: Record<string, string>;
}

export interface StellarBalance {
  assetType: "native" | "credit_alphanum4" | "credit_alphanum12" | "liquidity_pool_shares";
  assetCode?: string;
  assetIssuer?: string;
  balance: string;
  limit?: string;
  buyingLiabilities?: string;
  sellingLiabilities?: string;
}

export interface StellarSigner {
  weight: number;
  key: string;
  type: string;
}

export interface StellarTransaction {
  id: string;
  hash: string;
  ledger: number;
  createdAt: string;
  sourceAccount: string;
  fee: string;
  operationCount: number;
  memoType: string;
  memo?: string;
  successful: boolean;
  operations?: StellarOperation[];
}

export interface StellarOperation {
  id: string;
  type: string;
  sourceAccount?: string;
  createdAt: string;
  transactionHash: string;
  // Payment fields
  amount?: string;
  asset?: StellarAsset;
  from?: string;
  to?: string;
  // Trustline fields
  limit?: string;
  // Generic
  [key: string]: unknown;
}

export interface StellarAsset {
  type: "native" | "credit_alphanum4" | "credit_alphanum12";
  code?: string;
  issuer?: string;
}

// ─── Chat Types ───────────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  metadata?: MessageMetadata;
  createdAt: Date;
}

export interface MessageMetadata {
  queryType?: BlockchainQueryType;
  walletAddress?: string;
  network?: StellarNetwork;
  blockchainData?: unknown;
  error?: string;
}

export type BlockchainQueryType =
  | "account_info"
  | "transactions"
  | "payments"
  | "trustlines"
  | "wallet_summary"
  | "suspicious_activity"
  | "general";

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  walletAddress?: string;
  network?: StellarNetwork;
}

export interface ChatStreamChunk {
  type: "text" | "data" | "error" | "done";
  content?: string;
  data?: unknown;
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}
