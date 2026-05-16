"use client";

import { Wallet, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useChatStore } from "@/store/chat";
import type { StellarNetwork } from "@/types";

const NETWORKS: StellarNetwork[] = ["mainnet", "testnet", "futurenet"];

export function WalletBar() {
  const { walletAddress, network, setWalletAddress, setNetwork } = useChatStore();

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-border/60 bg-card/20 backdrop-blur-sm">
      {/* Wallet address input */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Wallet className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <Input
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Paste Stellar address (optional)..."
          className="h-8 text-xs bg-transparent border-border/40 font-mono"
          aria-label="Stellar wallet address"
        />
      </div>

      {/* Network selector */}
      <div className="flex items-center gap-1.5">
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex gap-1">
          {NETWORKS.map((net) => (
            <button
              key={net}
              onClick={() => setNetwork(net)}
              className="focus:outline-none focus:ring-2 focus:ring-ring rounded-full"
              aria-label={`Switch to ${net}`}
            >
              <Badge
                variant={network === net ? "stellar" : "outline"}
                className="cursor-pointer capitalize text-[11px] px-2 py-0"
              >
                {net}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
