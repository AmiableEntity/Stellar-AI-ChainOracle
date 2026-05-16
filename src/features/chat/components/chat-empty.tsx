import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "Analyze account GABCDEFG... and show me the balance",
  "Show all payments above 100 XLM from this wallet",
  "Track recent trustline changes for GABCDEFG...",
  "Summarize the last 30 days of wallet activity",
  "Are there any suspicious transaction patterns?",
];

interface ChatEmptyProps {
  onPromptSelect: (prompt: string) => void;
}

export function ChatEmpty({ onPromptSelect }: ChatEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full gap-8 px-4 py-12 text-center"
    >
      {/* Icon */}
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-stellar-gradient flex items-center justify-center shadow-lg shadow-stellar-500/30">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -inset-2 rounded-2xl bg-stellar-gradient opacity-20 blur-lg" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Ask the Oracle</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Query the Stellar blockchain using natural language. Paste a wallet address or ask
          anything about the network.
        </p>
      </div>

      {/* Example prompts */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptSelect(prompt)}
            className="text-left text-sm px-4 py-2.5 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-stellar-500/40 transition-all text-muted-foreground hover:text-foreground"
          >
            {prompt}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
