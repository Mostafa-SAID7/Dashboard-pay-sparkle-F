# Development

## Prerequisites

- **Node.js** ≥ 20 (recommended **22**)
- or **Bun** ≥ 1.1
- Git

## Setup

```bash
git clone https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F.git
cd Dashboard-pay-sparkle-F
npm install          # or bun install
npm run dev
```

Open http://localhost:5173.

## Available scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server (Vite) |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

## Code conventions

- TypeScript strict mode
- Functional components + hooks
- Prefer composition over large monolithic files
- Keep `pay/` components focused on domain; keep `ui/` generic
- Run `npm run lint` and `npm run format` before committing

## Testing

A `src/test` folder exists. Add unit / component tests with Vitest when introducing new logic. CI currently focuses on lint + build; expand the workflow when tests are added.

## Environment

No required `.env` for basic local development. Add environment variables only when integrating real APIs and document them here.
