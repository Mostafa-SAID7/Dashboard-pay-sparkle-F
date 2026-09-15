<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Agent Instructions — PayFlow (Dashboard-pay-sparkle-F)

You are an AI coding agent working on **PayFlow**, a modern payments dashboard.

## Core Goals

1. Keep the repository **clean, modern, and free of duplicate Markdown content**.
2. Place every base Markdown file in the **correct location from root**.
3. Maintain a useful `docs/` folder and a complete `.github/` folder with working workflows.
4. Prefer clarity and focus over long duplicated explanations.

---

## Required Repository Layout (Markdown & GitHub)

### Root (only these primary MD files)

| File | Purpose |
|------|---------|
| `README.md` | High-level overview, features, quick start, tech stack, live link. Keep it stylish and focused. **No deep architecture or long tutorials.** |
| `AGENTS.md` | This file — instructions for AI agents only. |
| `CONTRIBUTING.md` | Short contribution rules (or link to docs). Prefer the detailed version inside `docs/`. |

Do **not** put long guides in the root. Move detailed content into `docs/`.

### `docs/` folder (detailed, non-overlapping)

| File | Purpose |
|------|---------|
| `docs/README.md` | Index of all documentation |
| `docs/architecture.md` | App structure, routing, data flow, key components |
| `docs/development.md` | Local setup, scripts, coding conventions, testing |
| `docs/deployment.md` | Vercel / production notes |
| `docs/contributing.md` | Full contribution guide, PR process, code style |

**Rule:** Content in `docs/` must **not** duplicate the focused points already in root `README.md`. README = summary + entry point. Docs = depth.

### `.github/` folder (must exist and work)

```
.github/
├── workflows/
│   └── ci.yml              # Lint + build (must pass on every PR)
├── PULL_REQUEST_TEMPLATE.md
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
└── dependabot.yml          # Optional but recommended
```

#### Workflow version requirements (critical)

- Use **Node.js 22** (or at least ≥ 20) — matches modern React 19 + Vite 8 + TypeScript 5.8.
- Prefer `actions/setup-node@v4` with `cache: 'npm'`.
- Install with `npm ci` (or `bun install` if the workflow also supports Bun).
- Always run:
  - `npm run lint`
  - `npm run build`
- Keep the workflow simple and reliable. Do not add flaky steps.
- Pin action versions to major tags (`@v4`) so CI stays stable.

Example CI matrix is already provided in `.github/workflows/ci.yml`. Keep it working.

---

## Writing Rules for All Markdown

- **No duplication** across README ↔ docs ↔ AGENTS.
- Use clear headings, short paragraphs, tables, and code blocks.
- Keep language modern and professional.
- Prefer links between files instead of copying the same text.
- Update `docs/README.md` whenever you add a new doc file.

---

## When You Change Code

- Respect existing component structure (`src/components/pay`, `src/components/ui`, pages, etc.).
- Do not introduce duplicate components (e.g. avoid copying the same StatCard into multiple places).
- After structural or doc changes, ensure CI still passes.
- Never force-push or rewrite history on the connected branch.

---

## Quick Checklist Before Finishing a Task

- [ ] Root has a focused, stylish `README.md`
- [ ] `AGENTS.md` stays accurate and actionable
- [ ] `docs/` contains only non-overlapping detailed guides
- [ ] `.github/workflows/ci.yml` uses Node ≥ 20 (preferably 22) and runs lint + build successfully
- [ ] No duplicate Markdown content between files
- [ ] Project remains in a working state for Lovable sync

Follow these rules strictly so the repository stays professional, maintainable, and agent-friendly.
