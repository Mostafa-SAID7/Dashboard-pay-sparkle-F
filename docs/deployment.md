# Deployment

## Current production

- **URL:** https://pay-sparkle.vercel.app
- **Platform:** Vercel
- **Framework preset:** Vite

## Deploy steps (Vercel)

1. Connect the GitHub repository to Vercel.
2. Framework: Vite (auto-detected).
3. Build command: `npm run build`
4. Output directory: `dist` (Vite default)
5. Node.js version: **22.x** (set in Project Settings → General)

## Build locally before deploy

```bash
npm run build
npm run preview   # verify the production build
```

## Environment variables

If the app later needs secrets (API keys, backend URLs):

- Add them in Vercel → Project → Settings → Environment Variables
- Never commit real secrets to the repository
- Document the variable names in this file

## CI / CD

Every pull request runs the GitHub Actions CI workflow (lint + build).  
Only merge when the workflow is green. Vercel can be configured to deploy automatically from `main`.
