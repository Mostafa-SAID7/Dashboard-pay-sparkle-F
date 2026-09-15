# Agent Prompt — Keep PayFlow Repository Clean & Professional

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

## Your Mission

You are maintaining the repository: **https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F**

Project name: **PayFlow** – modern payments dashboard

Maintain and improve the repository so it always has:

1. Correct base Markdown files in the right locations from the root
2. A clean `docs/` folder with no overlaps
3. A complete `.github/` folder with all needed Markdown files and working workflows
4. **No duplicate content** between any Markdown files
5. A stylish, modern, focused root `README.md`
6. Workflows that actually work with the correct versions

---

## Required Structure (must always exist)

### Root (only these primary files)

- `README.md` → High-level, stylish, focused (features, tech stack, quick start, live demo). **No deep guides.**
- `AGENTS.md` → Instructions for AI agents only (keep the Lovable history warning + these rules)

### `docs/` folder (detailed, non-overlapping content)

- `docs/README.md` → Index of all docs
- `docs/architecture.md` → App structure, routing, components, data flow
- `docs/development.md` → Local setup, scripts, conventions
- `docs/deployment.md` → Vercel / production notes
- `docs/contributing.md` → Full contribution guide

**Strict rule:** Content in `docs/` must NOT repeat the focused points already written in the root `README.md`.

### `.github/` folder (must be complete and working)

- `workflows/ci.yml` → CI pipeline (Node 22, npm ci → lint → build)
- `pull_request_template.md` → PR format
- `ISSUE_TEMPLATE/bug.yml` → Bug report template
- `ISSUE_TEMPLATE/feature.yml` → Feature request template
- `dependabot.yml` → Automated dependency updates

---

## Workflow Rules

### Version Requirements

- **Node.js:** 22 (matches React 19 + Vite 8 + TypeScript 5.8)
- **Package Manager:** npm (use `npm ci` for reproducible installs)

### CI Pipeline

The `workflows/ci.yml` must:

1. Use `actions/checkout@v4`
2. Use `actions/setup-node@v4` with Node 22
3. Enable npm caching for speed
4. Run: `npm ci` → `npm run lint` → `npm run build`
5. Fail if lint or build fails
6. Never force-push results

### Git Safety

- **Never force-push** or rewrite history (Lovable sync safety)
- **Make clean commits** with clear messages
- **Always use `npm ci`** for reproducible installs in CI
- **Keep main branch working** at all times

---

## Documentation Guidelines

### Root README.md (Stylish & Focused)

Should include:
- Badges (License, Node, React, TypeScript, Vite)
- Feature list (short, impactful)
- Tech stack table
- Quick start (prerequisites, installation, running)
- Link to live demo
- Available scripts (dev, build, preview, lint, test)
- License & contributing links
- Documentation index pointing to `docs/`

**Must NOT include:**
- Detailed architecture (belongs in `docs/architecture.md`)
- Full setup steps (brief summary only; details in `docs/development.md`)
- Deployment guides (belongs in `docs/deployment.md`)
- Contribution details (belongs in `docs/contributing.md`)

### docs/README.md (Index)

Quick reference to all documentation files. Links and one-liner descriptions.

### docs/architecture.md (System Design)

- App structure (folders, routing)
- Component hierarchy
- Data flow & state management
- Key design decisions
- API integrations (if any)

### docs/development.md (Dev Workflow)

- Detailed local setup
- Available npm scripts with descriptions
- Coding conventions (naming, file structure)
- Testing approach
- Common issues & solutions

### docs/deployment.md (Production)

- Vercel deployment process
- Environment variables
- Build optimization
- Performance tips
- Monitoring & debugging in production

### docs/contributing.md (Contribution Guide)

- How to fork, branch, develop
- Commit message conventions
- PR process & checklist
- Code review expectations
- Setup for contributors

---

## Checklist for Agents

When working on PayFlow, verify:

- [ ] Root `README.md` is stylish, focused, and links to `docs/`
- [ ] `AGENTS.md` contains these rules + Lovable warning (never removed)
- [ ] All 5 `docs/` files exist and are non-overlapping
- [ ] `.github/` has all workflows and templates
- [ ] `workflows/ci.yml` uses Node 22 + npm ci
- [ ] No content is duplicated across Markdown files
- [ ] All commits have clear, descriptive messages
- [ ] Main branch always has working code
- [ ] No force-pushes or history rewrites

---

## Live Resources

- **Repository:** https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F
- **Live App:** https://pay-sparkle.vercel.app
- **CI Status:** Check GitHub Actions for workflow runs

---

**Last Updated:** September 2024  
**Maintained for:** PayFlow Development Team & AI Agents
