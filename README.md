# 🌟 Stellar AI ChainOracle

> An AI-powered blockchain assistant for the Stellar ecosystem. Query wallets, analyze transactions, and detect suspicious patterns using natural language.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Stellar](https://img.shields.io/badge/Stellar-SDK-7B61FF)

---

## Overview

Stellar AI ChainOracle bridges natural language and the Stellar blockchain. Instead of learning Horizon API syntax, you just ask:

- _"Show me all payments above 100 XLM from this wallet"_
- _"Analyze this Stellar account and summarize its activity"_
- _"Track suspicious transaction patterns for GABCD...WXYZ"_
- _"Show recent trustline changes"_

The AI fetches real blockchain data, analyzes it, and responds in plain English with structured formatting.

---

## Features

- **Natural language blockchain queries** — no API knowledge required
- **Streaming AI responses** — real-time output as the model analyzes data
- **Wallet analysis** — balances, trustlines, transaction history, flags
- **Suspicious activity detection** — pattern recognition across transactions
- **Swappable AI providers** — OpenAI, Groq, Together AI, Ollama (any OpenAI-compatible API)
- **Multi-network** — Mainnet, Testnet, Futurenet
- **Conversation history** — persistent sidebar with past chats
- **Dark mode** — futuristic blockchain-inspired UI
- **Open source** — MIT licensed, contributor-friendly

---

## Screenshots

> _Screenshots coming soon — contributions welcome!_

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, shadcn/ui, Framer Motion |
| State | Zustand, React Query |
| Backend | Next.js Route Handlers, Node.js |
| Blockchain | Stellar SDK, Horizon API |
| AI | OpenAI SDK (provider-agnostic) |
| Database | PostgreSQL, Prisma ORM |
| DevOps | Docker, GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (or use Docker)
- An OpenAI-compatible API key

### Installation

```bash
git clone https://github.com/your-org/stellar-ai-chainoracle.git
cd stellar-ai-chainoracle
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/chainoracle"
OPENAI_API_KEY="sk-your-key-here"
OPENAI_MODEL="gpt-4o-mini"
STELLAR_NETWORK="testnet"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
npm run db:push       # Push schema to database
npm run db:generate   # Generate Prisma client
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Docker

Start the full stack (app + PostgreSQL):

```bash
docker-compose up -d
```

Stop:

```bash
docker-compose down
```

---

## Swapping AI Providers

Change `OPENAI_BASE_URL` and `OPENAI_API_KEY` in `.env.local`:

| Provider | Base URL |
|----------|----------|
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| Ollama (local) | `http://localhost:11434/v1` |

---

## Folder Structure

```
src/
├── app/                  # Next.js App Router pages + API routes
│   ├── api/
│   │   ├── chat/         # Streaming chat endpoint
│   │   └── stellar/      # Blockchain data endpoints
│   ├── chat/             # Chat page
│   └── page.tsx          # Landing page
├── components/
│   ├── brand/            # Logo, branding
│   └── ui/               # Reusable UI primitives (shadcn-style)
├── config/               # Environment + Stellar network config
├── features/
│   ├── chat/             # Chat UI, hooks, components
│   └── landing/          # Landing page sections
├── hooks/                # React Query hooks, toast
├── lib/                  # Utilities, Prisma client
├── services/
│   ├── ai/               # AI provider, prompts, orchestrator
│   └── stellar/          # Horizon API wrappers
├── store/                # Zustand state stores
└── types/                # TypeScript types
```

---

## API Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Streaming AI chat with blockchain context |
| `/api/stellar/account` | GET | Fetch Stellar account data |
| `/api/stellar/transactions` | GET | Fetch account transactions |

---

## Roadmap

- [ ] Soroban smart contract analysis
- [ ] Multi-chain support (Ethereum bridge analysis)
- [ ] Stellar DEX trade history
- [ ] Wallet comparison mode
- [ ] Alert system for suspicious activity
- [ ] Public API with rate limiting
- [ ] Mobile-responsive chat UI improvements
- [ ] Export conversation as PDF/Markdown

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

Quick start:

```bash
git checkout -b feat/your-feature
# make changes
git commit -m "feat: add your feature"
git push origin feat/your-feature
# open a PR
```

---

## License

MIT — see [LICENSE](./LICENSE).

---

## Acknowledgements

- [Stellar Development Foundation](https://stellar.org) for the Stellar SDK and Horizon API
- [Vercel](https://vercel.com) for Next.js
- [shadcn/ui](https://ui.shadcn.com) for UI component patterns
- All contributors ❤️
