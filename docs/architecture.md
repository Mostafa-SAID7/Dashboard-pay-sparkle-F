# PayFlow Architecture

This document describes the overall structure, design patterns, and key decisions behind PayFlow.

## 🏗️ High-Level Architecture

PayFlow is a modern single-page application (SPA) built with React and TypeScript, designed for fast rendering and type safety. The app uses TanStack Router for routing, React Query for server state management, and Tailwind CSS + shadcn/ui for styling.

```
┌─────────────────────────────────────────┐
│         Browser (React SPA)             │
├─────────────────────────────────────────┤
│  App.tsx (Root Component)               │
│    └─ Router (TanStack Router)          │
│         └─ Route Tree                   │
│              └─ Layout Routes           │
│                 └─ Page Components      │
├─────────────────────────────────────────┤
│  State Management                       │
│    ├─ React Query (Server State)        │
│    └─ React Context (UI State)          │
├─────────────────────────────────────────┤
│  UI Components                          │
│    ├─ shadcn/ui Components              │
│    └─ Custom Components                 │
└─────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
src/
├── main.tsx               # Vite entry point
├── start.ts               # App initialization
├── App.tsx                # Root app component
├── router.tsx             # Router configuration
├── routeTree.gen.ts       # Auto-generated route tree (TanStack Router)
│
├── pages/                 # Page components (route destinations)
│   ├── home/
│   ├── dashboard/
│   ├── payments/
│   └── [other pages]/
│
├── components/            # Reusable UI components
│   ├── layout/            # Layout components
│   │   ├── AppLayout.tsx
│   │   └── AppSidebar.tsx
│   ├── pay/               # Payment-related components
│   │   ├── StatCard.tsx
│   │   ├── RailBadge.tsx
│   │   ├── PaginationControls.tsx
│   │   └── [other pay components]/
│   ├── ui/                # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── [50+ UI components]/
│   └── NavLink.tsx        # Shared navigation component
│
├── features/              # Feature-specific logic & hooks
│   ├── auth/              # Authentication
│   ├── payments/          # Payment features
│   └── [other features]/
│
├── hooks/                 # Custom React hooks
│   └── [custom hooks]/
│
├── lib/                   # Utility functions & helpers
│   ├── mockData.ts        # Mock data for development
│   └── [other utilities]/
│
├── routes/                # TanStack Router route definitions
│   ├── __root.tsx
│   └── [route files]/
│
├── assets/                # Static assets (images, icons)
│   ├── feature-batch.jpg
│   ├── feature-network.jpg
│   └── [other assets]/
│
├── styles/                # Global styles
│   ├── index.css
│   ├── App.css
│   └── styles.css
│
├── test/                  # Test utilities & fixtures
│   └── [test helpers]/
│
└── vite-env.d.ts         # Vite type definitions
```

---

## 🔄 Data Flow & State Management

### Server State (React Query)

Handles asynchronous data from APIs:

```
Component → useQuery() → React Query Cache → API Call
                             ↓
                        Automatic Caching
                        Stale State Management
                        Background Refetching
```

**Typical Usage:**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['payments'],
  queryFn: fetchPayments,
});
```

### UI State (React Context / Local State)

Handles client-side UI state:

```
Component → useState() → Local Re-render
OR
Component → useContext() → Shared UI State
```

**Examples:**
- Theme toggle (dark/light mode)
- Modal open/close state
- Sidebar collapse state
- Current page in pagination

### Mock Data

During development, `src/lib/mockData.ts` provides sample payment and transaction data for testing UI components without API calls.

---

## 🛣️ Routing Architecture

PayFlow uses **TanStack Router** for modern, type-safe routing:

### Route Definition

Routes are defined in `src/routes/` and automatically compiled to `src/routeTree.gen.ts`:

```
src/routes/
├── __root.tsx              # Root layout
├── dashboard.tsx           # /dashboard
├── payments/
│   └── index.tsx           # /payments
└── settings.tsx            # /settings
```

### Layout Routes

The root layout (`__root.tsx`) defines the app shell:

```
AppLayout
├── Sidebar (Navigation)
├── Header
└── Outlet (Page Content)
```

### Nested Routes

Child routes inherit their parent's layout:

```
/dashboard              → dashboard.tsx (inside __root layout)
/payments              → payments/index.tsx (inside __root layout)
/payments/:id          → payments/$id.tsx (inside __root layout)
```

---

## 🎨 Component Architecture

### Component Hierarchy

```
App
└── Router (TanStack Router)
    └── __root (AppLayout)
        ├── Sidebar
        ├── Header
        └── Outlet
            └── Page Component
                └── Feature Components
                    └── UI Components (shadcn/ui)
```

### Component Types

#### 1. **Layout Components**
Provide structure and navigation:
- `AppLayout` – Main app shell
- `AppSidebar` – Navigation sidebar

#### 2. **Page Components**
Displayed based on routes:
- Dashboard page
- Payments page
- Settings page

#### 3. **Feature Components**
Business logic and feature-specific UI:
- Payment cards
- Transaction lists
- Statistics panels

#### 4. **UI Components**
Reusable shadcn/ui components:
- Button, Card, Dialog, Badge, etc.

---

## 🎯 Design Patterns

### 1. **Composition Over Inheritance**

Components are built by composing smaller pieces:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Payments</CardTitle>
  </CardHeader>
  <CardContent>
    <PaymentList payments={payments} />
  </CardContent>
</Card>
```

### 2. **Custom Hooks for Logic**

Reusable logic is extracted into custom hooks:

```typescript
// hooks/usePayments.ts
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  });
};

// Component usage
const { data, isLoading } = usePayments();
```

### 3. **Props Drilling Prevention**

React Context is used for deeply nested state:

```typescript
<ThemeProvider>
  <App />
</ThemeProvider>
```

### 4. **Error Boundaries**

Error boundaries catch React errors and display fallback UI (implemented in layout).

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| **React 19** | UI library |
| **TypeScript 5.8** | Type safety |
| **Vite 8** | Build tool & dev server |
| **TanStack Router** | Client-side routing |
| **React Query** | Server state management |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Pre-built UI components |
| **Vitest** | Unit testing |

---

## 🚀 Performance Optimizations

### 1. **Code Splitting**

TanStack Router automatically code-splits by route:
- Each route is loaded on-demand
- Reduces initial bundle size

### 2. **Component Memoization**

Expensive components use `React.memo()` to prevent unnecessary re-renders:

```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

### 3. **Query Caching**

React Query caches API responses and reuses stale data:
- Reduces API calls
- Improves perceived performance

### 4. **Lazy Loading**

Images and heavy components are lazy-loaded:

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## 🔐 Type Safety

All code is written in TypeScript with strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

This ensures:
- Type-safe props
- Type-safe API responses
- Type-safe state management

---

## 🧪 Testing Strategy

### Unit Tests

Test individual components and utilities:

```bash
npm run test
```

Tests are colocated with source code in `src/test/` or use `.test.ts` suffix.

### Integration Tests

Test component interactions and workflows (via feature tests).

### E2E Tests

Full user workflows tested in a browser environment (future enhancement).

---

## 📡 API Integration

PayFlow integrates with backend APIs using React Query:

```typescript
// Fetcher function
const fetchPayments = async () => {
  const response = await fetch('/api/payments');
  return response.json();
};

// Query usage
const { data: payments } = useQuery({
  queryKey: ['payments'],
  queryFn: fetchPayments,
});
```

**Mock Data:** During development, `mockData.ts` provides sample responses.

---

## 🎨 Styling Strategy

### Tailwind CSS

Primary styling framework:
- Utility-first CSS
- Customizable theme in `tailwind.config.ts`
- Optimized for production build

### shadcn/ui

Pre-built, accessible components:
- Built with Radix UI
- Styled with Tailwind CSS
- Fully customizable

### Custom Styles

Global styles in:
- `src/styles/index.css` – Base/reset styles
- `src/styles/App.css` – App-specific styles
- `src/components/[component].css` – Component-specific styles

---

## 🔄 Development Workflow

1. **Create or modify a component** in `src/components/`
2. **Add routing** in `src/routes/` (if needed)
3. **Connect to data** using React Query
4. **Style with Tailwind** and shadcn/ui
5. **Test with Vitest** and manual browser testing
6. **Commit** with clear commit messages

---

## 📚 Further Reading

- [Development Guide](./development.md) – How to run and develop PayFlow
- [Contributing Guide](./contributing.md) – How to contribute changes
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

**Last Updated:** September 2024
