import { Horizon } from "@stellar/stellar-sdk";
import { serverConfig } from "@/config/env";
import { STELLAR_NETWORKS } from "@/config/stellar";
import type { StellarNetwork } from "@/types";

/**
 * Stellar Horizon client factory.
 * TODO: Add Soroban RPC client here when integrating smart contracts.
 */
export function getHorizonClient(network?: StellarNetwork): Horizon.Server {
  const net = network ?? serverConfig.stellar.network;
  const networkConfig = STELLAR_NETWORKS[net];
  const url = serverConfig.stellar.horizonUrl ?? networkConfig.horizonUrl;

  return new Horizon.Server(url, { allowHttp: url.startsWith("http://") });
}
