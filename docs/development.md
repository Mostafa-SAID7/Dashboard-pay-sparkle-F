# PayFlow Development Guide

This guide covers everything you need to set up your local development environment and start coding on PayFlow.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22 or later** — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
  - Verify: `node --version` (should be v22.x.x or higher)
- **npm** — Comes with Node.js
  - Verify: `npm --version`
- **Git** — For version control
  - Verify: `git --version`
- **A code editor** — VS Code recommended with TypeScript support

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F.git
cd Dashboard-pay-sparkle-F
```

### 2. Install Dependencies

```bash
npm ci
```

**Why `npm ci` instead of `npm install`?**
- `npm ci` (clean install) ensures reproducible builds
- Uses exact versions from `package-lock.json`
- Required for CI/CD pipelines
- Recommended for all team members and environments

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`**

---

## 📚 Available npm Scripts

### Development

```bash
npm run dev
```
Start the Vite development server with hot module replacement (HMR).
- Fast rebuilds on file changes
- Automatic browser refresh
- Available at http://localhost:5173

### Building

```bash
npm run build
```
Build the app for production with optimizations.
- Minifies code and assets
- Tree-shakes unused code
- Output in `dist/` folder

```bash
npm run build:dev
```
Build for development (useful for debugging production builds).

### Preview

```bash
npm run preview
```
Preview the production build locally.
- Useful to test production build before deploying
- Available at http://localhost:4173

### Linting

```bash
npm run lint
```
Run ESLint to check code quality and style issues.
- Finds code quality problems
- Ensures style consistency
- Use `--fix` to auto-fix issues: `npm run lint -- --fix`

### Formatting

```bash
npm run format
```
Format all code with Prettier.
- Ensures consistent code style
- Run before committing

---

## 🏗️ Project Structure

See [Architecture](./architecture.md) for a detailed breakdown. Quick overview:

```
src/
├── pages/          # Page components (route destinations)
├── components/     # Reusable UI components
├── features/       # Feature-specific logic
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── routes/         # Route definitions (TanStack Router)
├── styles/         # Global styles
└── main.tsx        # App entry point
```

---

## 🎨 Coding Conventions

### TypeScript

All code must be TypeScript. No JavaScript allowed in `src/`.

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

const getUser = (id: string): User => {
  // implementation
};

// ❌ Bad
const getUser = (id) => {
  // implementation
};
```

### Component Naming

- **Components:** PascalCase (e.g., `PaymentCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `usePayments.ts`)
- **Utilities:** camelCase (e.g., `formatCurrency.ts`)

```typescript
// ✅ Good
export const PaymentCard = ({ payment }) => { /* ... */ };
export const usePayments = () => { /* ... */ };
export const formatCurrency = (amount) => { /* ... */ };

// ❌ Bad
export const paymentCard = ({ payment }) => { /* ... */ };
export const getPayments = () => { /* ... */ };
export const currency = (amount) => { /* ... */ };
```

### File Organization

Keep related files together:

```
src/components/pay/
├── StatCard.tsx
├── RailBadge.tsx
├── PaginationControls.tsx
└── PaymentList.tsx
```

Or by feature:

```
src/features/payments/
├── components/
├── hooks/
├── types.ts
└── queries.ts
```

### Imports

Use absolute imports with `@/`:

```typescript
// ✅ Good (from vite-tsconfig-paths)
import { Button } from '@/components/ui/button';
import { usePayments } from '@/hooks/usePayments';

// ❌ Bad (relative imports)
import { Button } from '../../../components/ui/button';
import { usePayments } from '../../hooks/usePayments';
```

### Component Props

Use interfaces for component props:

```typescript
interface PaymentCardProps {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  onAction?: () => void;
}

export const PaymentCard = ({ id, amount, status, onAction }: PaymentCardProps) => {
  // component logic
};
```

### Error Handling

Always handle errors explicitly:

```typescript
// ✅ Good
try {
  const data = await fetchPayments();
} catch (error) {
  console.error('Failed to fetch payments:', error);
  // Show error UI
}

// ❌ Bad
const data = await fetchPayments();
```

### Comments

Write comments for complex logic, not obvious code:

```typescript
// ✅ Good
// Calculate payment fee based on amount and payment method
const fee = amount * (paymentMethod === 'card' ? 0.03 : 0.01);

// ❌ Bad
// Get the fee
const fee = calculateFee(amount);
```

---

## 🎯 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming convention:
- `feature/payment-modal` – New feature
- `fix/sidebar-layout` – Bug fix
- `docs/architecture` – Documentation
- `refactor/component-structure` – Code refactor

### 2. Make Changes

- Edit files in `src/`
- Run `npm run dev` to see changes live
- Test in browser as you code

### 3. Lint & Format

```bash
npm run lint -- --fix
npm run format
```

Fix any linting errors before committing.

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add payment modal component"
```

Commit message format (Conventional Commits):
- `feat:` – New feature
- `fix:` – Bug fix
- `docs:` – Documentation
- `refactor:` – Code refactor
- `test:` – Tests
- `chore:` – Maintenance

### 5. Push & Create PR

```bash
git push -u origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 🧪 Testing

### Run Tests

```bash
npm run test
```

Tests use **Vitest** and are located in `src/test/` or with `.test.ts` suffix.

### Test Example

```typescript
// src/components/Button.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 🔍 Debugging

### Browser DevTools

1. Open your browser's Developer Tools (F12)
2. Use the React DevTools extension for React component inspection
3. Use the Network tab to inspect API calls

### Console Logging

```typescript
console.log('Debug info:', value);
console.error('Error message:', error);
console.table(arrayOfObjects); // Pretty-print arrays/objects
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

---

## 📦 Dependencies

### Key Dependencies

| Package | Purpose |
|---------|---------|
| **React 19** | UI framework |
| **TypeScript 5.8** | Type safety |
| **Vite 8** | Build tool |
| **TanStack Router** | Client-side routing |
| **React Query** | Server state management |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Pre-built components |

### Adding Dependencies

```bash
npm install package-name
```

**Use minimal dependencies.** Before adding a package, check:
- Is there a simpler alternative?
- Does the team already have a similar solution?
- What's the bundle size impact?

---

## 🆘 Troubleshooting

### Issue: `npm ci` fails

**Solution:** Clear cache and try again
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm ci
```

### Issue: Dev server won't start

**Solution:** Check for port conflicts or restart
```bash
# Kill process on port 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
npm run dev
```

### Issue: TypeScript errors in editor

**Solution:** Reload VS Code or restart TypeScript server
```
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Vite cache issues

**Solution:** Clear cache
```bash
rm -rf .vite
npm run dev
```

### Issue: Changes not reflecting in browser

**Solution:** Hard refresh (Cmd+Shift+R or Ctrl+Shift+R) or clear browser cache

---

## 📝 Useful Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## 💡 Tips & Best Practices

1. **Commit often** – Small, focused commits are easier to review and debug
2. **Test as you code** – Don't wait until the end
3. **Keep components small** – Break down large components into smaller pieces
4. **Use TypeScript** – Leverage types to catch errors early
5. **Read the error messages** – They often point to the solution
6. **Ask for help** – Team collaboration improves code quality
7. **Review your own code first** – Catch mistakes before PR review

---

## 🚀 Next Steps

- Ready to start coding? Pick a feature or bug from the [GitHub Issues](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/issues)
- Not sure what to build? Check the [Architecture](./architecture.md) guide
- Want to contribute? Read the [Contributing Guide](./contributing.md)

---

**Happy coding! 🎉**

Last Updated: September 2024
