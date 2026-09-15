# PayFlow

> Modern payments dashboard — real-time insights, batch processing, and account management.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge&logo=vercel)](https://pay-sparkle.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

**Live:** [pay-sparkle.vercel.app](https://pay-sparkle.vercel.app)

---

## Features

- **Dashboard** — overview metrics, charts, and key payment KPIs
- **Payments** — list, filter, and manage individual transactions
- **Batch Processing** — bulk payment runs and status tracking
- **Users & Accounts** — user management and account views
- **Settings** — theme, preferences, and configuration
- **Dark / Light mode** with smooth transitions
- **Responsive** sidebar + mobile-friendly layout

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Data | TanStack Query |
| Routing | React Router |
| Charts | Recharts |
| Animation | Motion (Framer) |
| Icons | Lucide React |

---

## Quick Start

```bash
# Clone
git clone https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F.git
cd Dashboard-pay-sparkle-F

# Install (npm or bun)
npm install
# or: bun install

# Dev server
npm run dev
# → http://localhost:5173

# Build
npm run build

# Preview production build
npm run preview
```

**Requirements:** Node.js ≥ 20 (recommended 22) or Bun ≥ 1.1

---

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # UI + layout + pay-specific components
│   ├── pages/              # Route pages (Dashboard, Payments, …)
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities
│   ├── features/           # Feature modules
│   └── routes/             # Route definitions
├── docs/                   # Detailed documentation (no overlap with README)
├── .github/                # CI workflows + templates
├── AGENTS.md               # Instructions for AI agents (Lovable / coding agents)
└── package.json
```

See **[docs/](./docs/)** for architecture, development workflow, and deployment notes.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier format |

---

## Contributing

1. Fork & create a feature branch
2. Follow the code style (ESLint + Prettier)
3. Open a PR — CI must pass

Full guide: [docs/contributing.md](./docs/contributing.md)

---

## License

Private / All rights reserved unless otherwise stated.

Built with ❤️ using [Lovable](https://lovable.dev) + modern React tooling.
