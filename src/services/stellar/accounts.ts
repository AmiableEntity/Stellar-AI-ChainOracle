import { getHorizonClient } from "./client";
import type { StellarAccount, StellarNetwork } from "@/types";

/**
 * Fetch a Stellar account by public key.
 * Returns null if the account does not exist on the network.
 */
export async function fetchAccount(
  address: string,
  network?: StellarNetwork
): Promise<StellarAccount | null> {
  try {
    const server = getHorizonClient(network);
    const account = await server.loadAccount(address);

    return {
      id: account.id,
      sequence: account.sequence,
      balances: account.balances.map((b) => ({
        assetType: b.asset_type as StellarAccount["balances"][0]["assetType"],
        assetCode: "asset_code" in b ? b.asset_code : undefined,
        assetIssuer: "asset_issuer" in b ? b.asset_issuer : undefined,
        balance: b.balance,
        limit: "limit" in b ? b.limit : undefined,
        buyingLiabilities: "buying_liabilities" in b ? b.buying_liabilities : undefined,
        sellingLiabilities: "selling_liabilities" in b ? b.selling_liabilities : undefined,
      })),
      subentryCount: account.subentry_count,
      lastModifiedLedger: account.last_modified_ledger,
      thresholds: {
        lowThreshold: account.thresholds.low_threshold,
        medThreshold: account.thresholds.med_threshold,
        highThreshold: account.thresholds.high_threshold,
      },
      flags: {
        authRequired: account.flags.auth_required,
        authRevocable: account.flags.auth_revocable,
        authImmutable: account.flags.auth_immutable,
      },
      signers: account.signers.map((s) => ({
        weight: s.weight,
        key: s.key,
        type: s.type,
      })),
      data: account.data_attr,
    };
  } catch (err: unknown) {
    // Horizon returns 404 for unfunded accounts
    if (err && typeof err === "object" && "response" in err) {
      const e = err as { response?: { status?: number } };
      if (e.response?.status === 404) return null;
    }
    throw err;
  }
}

/**
 * Get the native XLM balance from an account.
 */
export function getNativeBalance(account: StellarAccount): string {
  const native = account.balances.find((b) => b.assetType === "native");
  return native?.balance ?? "0";
}
