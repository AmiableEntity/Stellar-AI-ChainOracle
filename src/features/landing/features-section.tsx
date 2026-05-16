"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  ShieldAlert,
  Zap,
  GitBranch,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description:
      "Ask questions in plain English. No need to learn Horizon API syntax or blockchain jargon.",
    gradient: "from-stellar-500/20 to-stellar-600/5",
    iconColor: "text-stellar-400",
  },
  {
    icon: Search,
    title: "Deep Wallet Analysis",
    description:
      "Analyze balances, transaction history, trustlines, and account flags in seconds.",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-400",
  },
  {
    icon: ShieldAlert,
    title: "Suspicious Activity Detection",
    description:
      "Identify unusual patterns, rapid transfers, and unexpected trustline changes automatically.",
    gradient: "from-rose-500/20 to-rose-600/5",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "Streaming AI Responses",
    description:
      "Get real-time streamed responses as the AI analyzes blockchain data — no waiting.",
    gradient: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
  },
  {
    icon: GitBranch,
    title: "Swappable AI Providers",
    description:
      "Works with OpenAI, Groq, Together AI, or any OpenAI-compatible provider. Just swap env vars.",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Multi-Network Support",
    description:
      "Query Mainnet, Testnet, or Futurenet. Soroban and multi-chain support coming soon.",
    gradient: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-stellar-400 to-violet-400 bg-clip-text text-transparent">
              understand Stellar
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete AI-powered toolkit for exploring and analyzing the Stellar blockchain.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm hover:border-border transition-colors group">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                  >
                    <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
