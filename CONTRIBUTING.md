# Contributing to Stellar AI ChainOracle

Thanks for your interest in contributing. This guide covers everything you need to get started.

---

## Code of Conduct

Be respectful, inclusive, and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

---

## Getting Started

### Local Setup

```bash
git clone https://github.com/your-org/stellar-ai-chainoracle.git
cd stellar-ai-chainoracle
npm install
cp .env.example .env.local
# Fill in your .env.local values
npm run db:push
npm run dev
```

### Running Checks

```bash
npm run type-check    # TypeScript
npm run lint          # ESLint
npm run format:check  # Prettier
```

---

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/short-description` | `feat/soroban-support` |
| Bug fix | `fix/short-description` | `fix/streaming-disconnect` |
| Docs | `docs/short-description` | `docs/api-overview` |
| Chore | `chore/short-description` | `chore/update-deps` |

---

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Soroban contract analysis
fix: handle unfunded account 404 gracefully
docs: update API overview in README
chore: bump stellar-sdk to 12.4
refactor: extract payment filter logic
```

---

## Pull Request Process

1. Fork the repo and create your branch from `develop`
2. Make your changes with clear, focused commits
3. Ensure all checks pass (`type-check`, `lint`, `format:check`)
4. Write a clear PR description explaining what and why
5. Link any related issues
6. Request a review

PR titles should follow the same Conventional Commits format.

---

## Code Standards

- **TypeScript strict mode** — no `any`, no implicit types
- **Server vs client** — use `"use client"` only when needed; prefer server components
- **Component size** — keep components focused; split if over ~150 lines
- **Comments** — explain _why_, not _what_; add `TODO:` for future work
- **Error handling** — always handle errors gracefully; never swallow exceptions silently
- **Accessibility** — add `aria-label` to interactive elements; use semantic HTML

---

## Architecture Notes

### Adding a new AI capability

1. Add prompt logic in `src/services/ai/prompts.ts`
2. Add blockchain data fetching in `src/services/ai/orchestrator.ts`
3. Update `detectQueryType()` if it's a new query category
4. Add the new `BlockchainQueryType` to `src/types/index.ts`

### Adding a new Stellar data source

1. Add the service function in `src/services/stellar/`
2. Export it from `src/services/stellar/index.ts`
3. Add a corresponding API route in `src/app/api/stellar/`
4. Add a React Query hook in `src/hooks/`

### Adding a UI component

Follow the shadcn/ui pattern in `src/components/ui/`. Keep components:
- Unstyled by default, styled via `className` props
- Typed with proper TypeScript interfaces
- Accessible with ARIA attributes

---

## Testing Instructions

Currently the project uses manual testing. Automated tests are a great contribution area.

To test manually:
1. Start the dev server: `npm run dev`
2. Open [http://localhost:3000/chat](http://localhost:3000/chat)
3. Paste a Stellar testnet address and ask questions
4. Test the landing page at [http://localhost:3000](http://localhost:3000)

Test addresses (Stellar testnet):
- Use [Stellar Laboratory](https://laboratory.stellar.org) to create testnet accounts

---

## Issue Reporting

When filing a bug:
- Describe what you expected vs what happened
- Include steps to reproduce
- Include your Node.js version and OS
- Attach relevant error messages or screenshots

Use the GitHub issue templates when available.

---

## Good First Issues

Look for issues labeled `good first issue`. These are intentionally scoped to be approachable:

- Adding new example prompts to `ChatEmpty`
- Improving error messages in API routes
- Adding loading skeletons to new components
- Writing documentation
- Adding TypeScript types for Horizon API responses

---

## Contributor Etiquette

- Be patient — maintainers are volunteers
- Keep PRs focused — one feature or fix per PR
- Respond to review feedback promptly
- Don't open duplicate issues — search first
- Celebrate others' contributions

---

Thank you for helping build Stellar AI ChainOracle. 🌟
