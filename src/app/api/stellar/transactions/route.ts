import { NextRequest } from "next/server";
import { fetchTransactions } from "@/services/stellar";
import type { StellarNetwork } from "@/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const network = (searchParams.get("network") ?? "testnet") as StellarNetwork;
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const cursor = searchParams.get("cursor") ?? undefined;

  if (!address) {
    return Response.json({ error: "address is required" }, { status: 400 });
  }

  try {
    const transactions = await fetchTransactions(address, { limit, network, cursor });
    return Response.json({ data: transactions, success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch transactions";
    return Response.json({ error: message, success: false }, { status: 500 });
  }
}
