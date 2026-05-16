"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-dark-mesh pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stellar-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-4xl"
      >
        {/* Badge */}
        <Badge variant="stellar" className="gap-1.5 px-3 py-1 text-xs">
          <Sparkles className="h-3 w-3" />
          Open Source · Stellar Ecosystem
        </Badge>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="text-foreground">Chat with the</span>
          <br />
          <span className="bg-gradient-to-r from-stellar-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Stellar Blockchain
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Stellar AI ChainOracle lets you query wallets, analyze transactions, and detect
          suspicious patterns using plain English — no blockchain expertise required.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button asChild variant="stellar" size="lg" className="gap-2">
            <Link href="/chat">
              Try the Oracle
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href="https://github.com/your-org/stellar-ai-chainoracle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Example query pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 px-4 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-sm text-muted-foreground"
        >
          <span className="text-stellar-400">&quot;</span>
          Show me all payments above 100 XLM from GABCD...WXYZ
          <span className="text-stellar-400">&quot;</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
