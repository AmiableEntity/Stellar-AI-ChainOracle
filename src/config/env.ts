/**
 * Environment variable validation and typed config.
 * Throws at startup if required vars are missing.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

// Server-side config (never exposed to client)
export const serverConfig = {
  database: {
    url: optionalEnv("DATABASE_URL", ""),
  },
  ai: {
    apiKey: optionalEnv("OPENAI_API_KEY", ""),
    baseUrl: optionalEnv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
    model: optionalEnv("OPENAI_MODEL", "gpt-4o-mini"),
  },
  stellar: {
    network: optionalEnv("STELLAR_NETWORK", "testnet") as
      | "mainnet"
      | "testnet"
      | "futurenet",
    horizonUrl: process.env.STELLAR_HORIZON_URL,
  },
} as const;

// Public config (safe to expose to client via NEXT_PUBLIC_*)
export const publicConfig = {
  appUrl: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  appName: optionalEnv("NEXT_PUBLIC_APP_NAME", "Stellar AI ChainOracle"),
} as const;

export type ServerConfig = typeof serverConfig;
export type PublicConfig = typeof publicConfig;
