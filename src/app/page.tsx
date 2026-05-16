import { Hero } from "@/features/landing/hero";
import { FeaturesSection } from "@/features/landing/features-section";
import { OpenSourceSection } from "@/features/landing/open-source-section";
import { Logo } from "@/components/brand/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <nav
          className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Features
            </Link>
            <Link
              href="#contribute"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Contribute
            </Link>
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <a
                href="https://github.com/your-org/stellar-ai-chainoracle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="stellar" size="sm">
              <Link href="/chat">Launch App</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <OpenSourceSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo size="sm" />
          <p>
            Open source under the{" "}
            <a
              href="https://github.com/your-org/stellar-ai-chainoracle/blob/main/LICENSE"
              className="text-stellar-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
