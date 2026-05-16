"use client";

import { motion } from "framer-motion";
import { Github, Star, GitFork, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CONTRIBUTION_AREAS = [
  { label: "AI prompt engineering", color: "text-stellar-400" },
  { label: "Stellar SDK integrations", color: "text-indigo-400" },
  { label: "UI components", color: "text-violet-400" },
  { label: "Soroban support", color: "text-emerald-400" },
  { label: "Documentation", color: "text-amber-400" },
  { label: "Bug fixes", color: "text-rose-400" },
];

export function OpenSourceSection() {
  return (
    <section className="py-24 px-4 border-t border-border/40" id="contribute">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4 text-rose-400" />
            <span className="text-sm">Built in the open</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold">
            Open source &amp;{" "}
            <span className="bg-gradient-to-r from-stellar-400 to-violet-400 bg-clip-text text-transparent">
              contributor-friendly
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl">
            Stellar AI ChainOracle is fully open source. Whether you&apos;re a blockchain dev, AI
            engineer, or frontend developer — there&apos;s a place for you here.
          </p>

          {/* Contribution areas */}
          <Card className="w-full border-border/60 bg-card/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">We welcome contributions in:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {CONTRIBUTION_AREAS.map((area) => (
                  <span
                    key={area.label}
                    className={`text-sm font-medium px-3 py-1 rounded-full border border-border/60 bg-muted/30 ${area.color}`}
                  >
                    {area.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GitHub CTAs */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="stellar" size="lg" className="gap-2">
              <a
                href="https://github.com/your-org/stellar-ai-chainoracle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a
                href="https://github.com/your-org/stellar-ai-chainoracle/fork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork className="h-4 w-4" />
                Fork &amp; Contribute
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400" />
              MIT License
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork className="h-4 w-4 text-stellar-400" />
              Good first issues available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
