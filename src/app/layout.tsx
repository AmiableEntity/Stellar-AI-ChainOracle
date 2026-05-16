import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stellar AI ChainOracle",
    template: "%s | Stellar AI ChainOracle",
  },
  description:
    "AI-powered blockchain assistant for the Stellar ecosystem. Query wallets, analyze transactions, and detect suspicious patterns using natural language.",
  keywords: ["Stellar", "blockchain", "AI", "crypto", "XLM", "Horizon", "wallet analysis"],
  authors: [{ name: "Stellar AI ChainOracle Contributors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Stellar AI ChainOracle",
    description: "Chat with the Stellar blockchain using natural language.",
    siteName: "Stellar AI ChainOracle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellar AI ChainOracle",
    description: "Chat with the Stellar blockchain using natural language.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
