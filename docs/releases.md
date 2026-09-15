# Releases, Versions & Tags

This document explains how versioning and automatic releases work in PayFlow.

## Versioning

We follow [Semantic Versioning](https://semver.org):

- **MAJOR** (`2.0.0`) → breaking changes
- **MINOR** (`1.1.0`) → new features, backward compatible
- **PATCH** (`1.0.1`) → bug fixes

Current version lives in:
- `package.json` → `"version": "x.y.z"`
- Git tags → `vX.Y.Z`

## How to create a release

### Option A — Tag push (recommended)

1. Update `package.json` version and `CHANGELOG.md`
2. Commit the changes:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore(release): v1.0.1"
   git push origin main
   ```
3. Create and push the tag:
   ```bash
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```
4. The **Release** workflow runs automatically:
   - Lints & builds
   - Creates a GitHub Release
   - Attaches the `dist/` build
   - Generates release notes

### Option B — Manual workflow dispatch

1. Go to **Actions → Release → Run workflow**
2. Enter the version (e.g. `1.0.1` or `v1.0.1`)
3. The workflow creates the tag and the GitHub Release for you

## What the Release workflow does

| Step | Action |
|------|--------|
| Checkout | Full history (for changelog) |
| Setup Node 22 | Correct runtime |
| Install + Lint + Build | Quality gates |
| Determine version | From tag or from input |
| Create tag (dispatch only) | Pushes `vX.Y.Z` |
| GitHub Release | Title, notes, artifacts |
| Upload artifact | `payflow-vX.Y.Z` for 30 days |

## CI vs Release

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | Push / PR to `main` | Lint + Build on every change |
| **Release** | Tag `v*` or manual dispatch | Official versioned release |

## Best practices

- Always update `CHANGELOG.md` before tagging
- Keep the version in `package.json` in sync with the tag
- Prefer `v1.2.3` style tags (the workflow handles both `v1.2.3` and `1.2.3`)
- Never force-push tags that already exist on the remote
- Let CI stay green on `main` before creating a release tag
