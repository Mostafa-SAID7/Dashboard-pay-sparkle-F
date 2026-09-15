# Contributing to PayFlow

Thank you for contributing!

## Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run checks locally:
   ```bash
   npm run lint
   npm run build
   ```
5. Commit with a clear message
6. Push and open a Pull Request against `main`

## Pull Request guidelines

- Keep PRs focused and reasonably small
- Fill out the PR template
- Ensure the CI workflow passes (lint + build)
- Update documentation in `docs/` when behavior or structure changes
- Do **not** duplicate content that already exists in `README.md` or other docs

## Code style

- Follow existing patterns in the codebase
- ESLint + Prettier are the source of truth
- Prefer TypeScript types over `any`
- Avoid introducing duplicate components or Markdown files

## Agent / AI contributions

If you are an AI agent, also follow the rules in the root [AGENTS.md](../AGENTS.md).
