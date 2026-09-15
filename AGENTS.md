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
4. Support **automatic releases**, proper **versioning**, and **Git tags**.
5. Prefer clarity and focus over long duplicated explanations.

---

## Required Repository Layout

### Root (only these primary MD / config files)

| File | Purpose |
|------|---------|
| `README.md` | High-level overview, features, tech stack, quick start, live link. Stylish and focused. **No deep architecture.** |
| `AGENTS.md` | This file — instructions for AI agents only. |
| `CHANGELOG.md` | Keep a Changelog style. Update on every release. |
| `package.json` | Must always contain a valid `"version": "x.y.z"` field. |

### `docs/` folder (detailed, non-overlapping)

| File | Purpose |
|------|---------|
| `docs/README.md` | Index of all documentation |
| `docs/architecture.md` | App structure, routing, data flow |
| `docs/development.md` | Local setup, scripts, conventions |
| `docs/deployment.md` | Vercel / production |
| `docs/releases.md` | Versioning, tags, how releases work |
| `docs/contributing.md` | Contribution guide |

**Rule:** No content duplication between root README and docs.

### `.github/` folder (must be complete and working)

```
.github/
├── workflows/
│   ├── ci.yml                 # Lint + Build on every PR / push to main
│   └── release.yml            # Automatic GitHub Release on tags v*
├── PULL_REQUEST_TEMPLATE.md
├── ISSUE_TEMPLATE/
│   ├── bug_report.md (or .yml)
│   └── feature_request.md (or .yml)
└── dependabot.yml
```

---

## Workflows — Version & Tag Requirements (critical)

### CI (`.github/workflows/ci.yml`)
- Trigger: `push` + `pull_request` to `main`
- Node.js **22**
- `actions/checkout@v4` + `actions/setup-node@v4` (cache: npm)
- `npm ci` → `npm run lint` → `npm run build`
- Upload `dist/` as artifact (`actions/upload-artifact@v4`)
- Keep it green and simple

### Release (`.github/workflows/release.yml`)
- Trigger:
  - Push of tags matching `v*` (e.g. `v1.0.1`)
  - OR `workflow_dispatch` with a version input
- Must:
  - Use Node 22
  - Run lint + build
  - Create a **GitHub Release** with the tag
  - Attach build artifacts
  - Generate release notes
- Permissions: `contents: write`
- Never force-push or delete existing tags

### Versioning rules the agent must follow

1. Always keep `package.json` → `"version"` in sync with the latest tag.
2. When preparing a release:
   - Bump version in `package.json`
   - Update `CHANGELOG.md` (move Unreleased → new section)
   - Commit with message `chore(release): vX.Y.Z`
   - Create annotated tag `vX.Y.Z` and push it
3. Prefer Semantic Versioning (MAJOR.MINOR.PATCH).
4. Document any release process changes in `docs/releases.md`.

---

## Writing Rules for All Markdown

- Clear, modern, professional language
- Short paragraphs, tables, code blocks
- Prefer links instead of copy-paste
- Zero duplication
- Update `docs/README.md` when adding new docs

---

## When You Change Code or Docs

- Respect existing component structure
- Do not introduce duplicate components or Markdown files
- After structural / workflow changes, ensure CI still passes
- Never force-push or rewrite published history (Lovable sync)

---

## Final Checklist Before Finishing Any Task

- [ ] Root has stylish focused `README.md`
- [ ] `AGENTS.md` is accurate
- [ ] `CHANGELOG.md` and `package.json` version are consistent
- [ ] `docs/` contains only non-overlapping detailed guides (including `releases.md`)
- [ ] `.github/workflows/ci.yml` uses Node 22 and runs lint + build successfully
- [ ] `.github/workflows/release.yml` creates real GitHub Releases on `v*` tags
- [ ] No duplicate Markdown content
- [ ] Project remains in a working state for Lovable

Follow these rules strictly so the repository stays professional, versioned, and fully automated.
