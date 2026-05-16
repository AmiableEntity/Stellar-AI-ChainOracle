import { NextRequest } from "next/server";
import { fetchAccount } from "@/services/stellar";
import type { StellarNetwork } from "@/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const network = (searchParams.get("network") ?? "testnet") as StellarNetwork;

  if (!address) {
    return Response.json({ error: "address is required" }, { status: 400 });
  }

  try {
    const account = await fetchAccount(address, network);

    if (!account) {
      return Response.json({ error: "Account not found or unfunded" }, { status: 404 });
    }

    return Response.json({ data: account, success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch account";
    return Response.json({ error: message, success: false }, { status: 500 });
  }
}
