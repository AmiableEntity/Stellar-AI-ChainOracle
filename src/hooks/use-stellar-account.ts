"use client";

import { useQuery } from "@tanstack/react-query";
import type { StellarAccount, StellarNetwork, ApiResponse } from "@/types";

async function fetchAccountData(
  address: string,
  network: StellarNetwork
): Promise<StellarAccount> {
  const res = await fetch(
    `/api/stellar/account?address=${encodeURIComponent(address)}&network=${network}`
  );
  const json = (await res.json()) as ApiResponse<StellarAccount>;
  if (!json.success || !json.data) {
    throw new Error(json.error ?? "Failed to fetch account");
  }
  return json.data;
}

export function useStellarAccount(address: string | undefined, network: StellarNetwork = "testnet") {
  return useQuery({
    queryKey: ["stellar-account", address, network],
    queryFn: () => fetchAccountData(address!, network),
    enabled: !!address && address.length > 10,
    staleTime: 30_000,
    retry: 1,
  });
}
