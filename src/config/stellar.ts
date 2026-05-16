import type { StellarNetwork } from "@/types";

/**
 * Stellar network configuration.
 * TODO: Add Soroban RPC endpoints when integrating smart contracts.
 */

export const STELLAR_NETWORKS: Record<
  StellarNetwork,
  { horizonUrl: string; networkPassphrase: string; label: string }
> = {
  mainnet: {
    horizonUrl: "https://horizon.stellar.org",
    networkPassphrase: "Public Global Stellar Network ; September 2015",
    label: "Mainnet",
  },
  testnet: {
    horizonUrl: "https://horizon-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
    label: "Testnet",
  },
  futurenet: {
    horizonUrl: "https://horizon-futurenet.stellar.org",
    networkPassphrase: "Test SDF Future Network ; October 2022",
    label: "Futurenet",
  },
};

export const DEFAULT_NETWORK: StellarNetwork = "testnet";

// Pagination defaults
export const HORIZON_PAGE_LIMIT = 20;
export const MAX_TRANSACTION_FETCH = 100;
