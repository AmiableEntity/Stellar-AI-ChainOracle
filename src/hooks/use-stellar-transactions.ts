"use client";

import { useQuery } from "@tanstack/react-query";
import type { StellarTransaction, StellarNetwork, ApiResponse } from "@/types";

async function fetchTransactionData(
  address: string,
  network: StellarNetwork,
  limit: number
): Promise<StellarTransaction[]> {
  const res = await fetch(
    `/api/stellar/transactions?address=${encodeURIComponent(address)}&network=${network}&limit=${limit}`
  );
  const json = (await res.json()) as ApiResponse<StellarTransaction[]>;
  if (!json.success || !json.data) {
    throw new Error(json.error ?? "Failed to fetch transactions");
  }
  return json.data;
}

export function useStellarTransactions(
  address: string | undefined,
  network: StellarNetwork = "testnet",
  limit = 20
) {
  return useQuery({
    queryKey: ["stellar-transactions", address, network, limit],
    queryFn: () => fetchTransactionData(address!, network, limit),
    enabled: !!address && address.length > 10,
    staleTime: 30_000,
    retry: 1,
  });
}
