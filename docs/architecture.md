# Architecture

## Overview

PayFlow is a single-page React application focused on payment operations:

- Dashboard overview
- Individual payments management
- Batch processing
- Users & accounts
- Settings

## High-level structure

```
src/
├── components/
│   ├── layout/          # AppLayout, AppSidebar
│   ├── pay/             # Domain components (StatCard, StatusBadge, …)
│   └── ui/              # shadcn/ui primitives + shared UI
├── pages/               # Route-level pages
├── features/            # Feature-specific logic (if used)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities & helpers
├── routes/              # Route definitions (TanStack / React Router)
└── assets/              # Images & static media
```

## Routing

Main routes (see `src/App.tsx` / route tree):

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/payments` | Payments |
| `/batch` | Batch Processing |
| `/users` | Users & Accounts |
| `/settings` | Settings |

All authenticated pages are wrapped by `AppLayout` (sidebar + content area).

## Key UI pieces

- **AppSidebar** — collapsible desktop sidebar + mobile drawer, dark-mode toggle
- **StatCard / StatusBadge / RailBadge** — payment-domain visual components
- **shadcn/ui** — consistent design system (Button, Card, Dialog, Chart, …)
- **Theme** — light / dark via CSS variables + toggle

## Data layer

- TanStack Query for server state and caching
- Local component state for UI interactions
- Forms powered by React Hook Form + Zod where validation is needed

## Styling

- Tailwind CSS v4
- CSS variables for theming
- Motion for micro-interactions and sidebar animations

Keep domain components under `src/components/pay` and pure UI under `src/components/ui` to avoid duplication.
