# Svelte Components in React - Integration Guide

This document explains how to embed Svelte components within the React/Next.js application using Web Components.

## 🎯 Overview

We've set up a system that allows you to:
1. Write components in Svelte with TanStack Query for data fetching
2. Compile them as Web Components (Custom Elements)
3. Use them seamlessly in React with full TypeScript support
4. Enable bi-directional communication between React and Svelte
5. Leverage Svelte's reactive system and TanStack Query's caching inside web components

## 📁 Project Structure

```
everyday-lending/
├── svelte-inside-react/          # Svelte project for building web components
│   ├── src/
│   │   ├── lib/
│   │   │   ├── SvelteCounter.svelte  # Example counter component
│   │   │   └── UserList.svelte       # Data-fetching component with TanStack Query
│   │   └── web-components.ts     # Entry point for web component build
│   ├── dist/                      # Build output
│   ├── package.json              # Includes @tanstack/svelte-query
│   └── vite.config.ts            # Configured for web components
│
├── src/
│   ├── components/
│   │   ├── SvelteCounter.tsx     # React wrapper for counter
│   │   └── SvelteUserList.tsx    # React wrapper for data-fetching component
│   ├── types/
│   │   └── svelte-components.d.ts # TypeScript declarations
│   └── app/
│       └── svelte-demo/
│           └── page.tsx          # Demo page
│
└── public/
    └── svelte-components/        # Built web components
        └── svelte-components.es.js  # ~127KB with TanStack Query
```

## 🔧 How It Works

### 1. Svelte Component with Custom Element

Svelte components use the `customElement` option to compile as Web Components:

```svelte
<!-- SvelteCounter.svelte -->
<svelte:options customElement="svelte-counter" />

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let { initialCount = 0 } = $props<{ initialCount?: number }>();
  let count = $state(initialCount);

  const dispatch = createEventDispatcher();

  const increment = () => {
    count += 1;
    dispatch('countchange', { count });
  };
</script>

<button onclick={increment}>
  count is {count}
</button>
```

**Key Points:**
- `<svelte:options customElement="svelte-counter" />` defines the custom element tag name
- Use `createEventDispatcher()` to emit events that React can listen to
- Props are automatically converted to HTML attributes (camelCase → lowercase)

### 2. Vite Configuration

The Svelte project is configured to build as a library:

```typescript
// svelte-inside-react/vite.config.ts
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true, // Enable Web Components
      },
    }),
  ],
  build: {
    lib: {
      entry: 'src/web-components.ts',
      name: 'SvelteComponents',
      formats: ['es', 'umd'],
    },
  },
});
```

### 3. React Wrapper Component

A React wrapper provides a clean API and TypeScript support:

```tsx
// src/components/SvelteCounter.tsx
'use client';

import { useEffect, useRef } from 'react';

type SvelteCounterProps = {
  initialCount?: number;
  onCountChange?: (count: number) => void;
};

export function SvelteCounter({ initialCount = 0, onCountChange }: SvelteCounterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load the web component script
    const script = document.createElement('script');
    script.src = '/svelte-components/svelte-components.es.js';
    script.type = 'module';
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Set attributes
    element.setAttribute('initialcount', String(initialCount));

    // Listen for custom events
    const handleCountChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number }>;
      onCountChange?.(customEvent.detail.count);
    };

    element.addEventListener('countchange', handleCountChange);
    return () => element.removeEventListener('countchange', handleCountChange);
  }, [initialCount, onCountChange]);

  return <svelte-counter ref={ref as any} />;
}
```

### 4. TypeScript Declarations

Add type definitions for the custom element:

```typescript
// src/types/svelte-components.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'svelte-counter': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          initialcount?: number;
          oncountchange?: (event: CustomEvent<{ count: number }>) => void;
        },
        HTMLElement
      >;
    }
  }
}
```

## 🚀 Usage in React

```tsx
import { SvelteCounter } from '@/components/SvelteCounter';

function MyPage() {
  const [count, setCount] = useState(0);

  return (
    <SvelteCounter
      initialCount={10}
      onCountChange={(newCount) => {
        setCount(newCount);
        console.log('Count updated:', newCount);
      }}
    />
  );
}
```

## 🔨 Building New Svelte Components

### Step 1: Create Svelte Component

```bash
cd svelte-inside-react/src/lib
# Create YourComponent.svelte
```

```svelte
<svelte:options customElement="your-component" />

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let { someProp = 'default' } = $props<{ someProp?: string }>();
  const dispatch = createEventDispatcher();

  function handleAction() {
    dispatch('action', { data: 'some data' });
  }
</script>

<button onclick={handleAction}>{someProp}</button>
```

### Step 2: Export in web-components.ts

```typescript
// svelte-inside-react/src/web-components.ts
import './lib/SvelteCounter.svelte';
import './lib/YourComponent.svelte'; // Add your component

export { default as SvelteCounter } from './lib/SvelteCounter.svelte';
export { default as YourComponent } from './lib/YourComponent.svelte';
```

### Step 3: Build

```bash
cd svelte-inside-react
npm run build
cp dist/svelte-components.es.js ../public/svelte-components/
```

### Step 4: Create React Wrapper

```tsx
// src/components/YourComponent.tsx
'use client';

type YourComponentProps = {
  someProp?: string;
  onAction?: (data: any) => void;
};

export function YourComponent({ someProp, onAction }: YourComponentProps) {
  // Similar implementation to SvelteCounter...
  return <your-component ref={ref as any} />;
}
```

### Step 5: Add TypeScript Declarations

```typescript
// src/types/svelte-components.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'your-component': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          someprop?: string;
          onaction?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
    }
  }
}
```

## 📊 Communication Patterns

### React → Svelte (Props/Attributes)

```tsx
<SvelteCounter initialCount={42} />
<SvelteUserList apiUrl="https://api.example.com/users" />
```

### Svelte → React (Custom Events)

```svelte
<script>
  dispatch('countchange', { count: newCount });
  dispatch('dataloaded', { count: users.length, data: users });
</script>
```

```tsx
<SvelteCounter onCountChange={(count) => console.log(count)} />
<SvelteUserList
  onDataLoaded={(data) => console.log('Loaded', data.count)}
  onUserSelect={(user) => console.log('Selected', user)}
/>
```

## 🔄 TanStack Query Integration

### Installation

The Svelte project includes TanStack Query for powerful data fetching:

```bash
cd svelte-inside-react
npm install @tanstack/svelte-query
```

### Example: Data-Fetching Component

```svelte
<!-- UserList.svelte -->
<svelte:options customElement="svelte-user-list" />

<script lang="ts">
  import { QueryClient, QueryClientProvider, createQuery } from '@tanstack/svelte-query';
  import { createEventDispatcher } from 'svelte';

  let { apiUrl = 'https://jsonplaceholder.typicode.com/users' } = $props<{ apiUrl?: string }>();

  // Create QueryClient for this component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  const dispatch = createEventDispatcher();

  // Fetch data
  async function fetchUsers() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    dispatch('dataloaded', { count: data.length, data });
    return data;
  }

  const usersQuery = createQuery(() => ({
    queryKey: ['users', apiUrl],
    queryFn: fetchUsers,
  }));

  function handleRefresh() {
    usersQuery.refetch();
    dispatch('refresh');
  }
</script>

<QueryClientProvider client={queryClient}>
  {#if $usersQuery.isLoading}
    <div>Loading...</div>
  {:else if $usersQuery.error}
    <div>Error: {$usersQuery.error.message}</div>
  {:else if $usersQuery.data}
    <div>
      {#each $usersQuery.data as user}
        <div>{user.name}</div>
      {/each}
    </div>
  {/if}
</QueryClientProvider>
```

### React Wrapper for Data-Fetching Component

```tsx
// src/components/SvelteUserList.tsx
import { useEffect, useRef } from 'react';

type SvelteUserListProps = {
  apiUrl?: string;
  onDataLoaded?: (data: { count: number; data: any[] }) => void;
  onUserSelect?: (user: any) => void;
  onRefresh?: () => void;
};

export function SvelteUserList({
  apiUrl,
  onDataLoaded,
  onUserSelect,
  onRefresh
}: SvelteUserListProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (apiUrl) {
      element.setAttribute('apiurl', apiUrl);
    }

    const handleDataLoaded = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number; data: any[] }>;
      onDataLoaded?.(customEvent.detail);
    };

    element.addEventListener('dataloaded', handleDataLoaded);
    return () => element.removeEventListener('dataloaded', handleDataLoaded);
  }, [apiUrl, onDataLoaded]);

  return <svelte-user-list ref={ref as any} />;
}
```

### Key Benefits of TanStack Query in Svelte Components

1. **Automatic Caching**: Data is cached and reused across component instances
2. **Background Refetching**: Stale data is automatically refreshed
3. **Request Deduplication**: Multiple simultaneous requests are consolidated
4. **Optimistic Updates**: UI updates before server confirmation
5. **Retry Logic**: Failed requests are automatically retried
6. **Loading States**: Built-in loading, error, and success states

### Important Notes for TanStack Query + Web Components

⚠️ **QueryClient Instance**: Each web component instance creates its own `QueryClient`. If you need shared caching across multiple instances, you'll need to implement a singleton pattern or use a shared external cache.

⚠️ **No SSR**: TanStack Query in web components runs client-side only. The React app can use `@tanstack/react-query` for SSR separately.

✅ **Best Practice**: Use TanStack Query in Svelte components for:
- API calls that benefit from caching
- Real-time data updates
- Complex data fetching patterns
- Paginated or infinite scroll data

## ⚡ Performance Considerations

1. **Script Loading**: The web component script is loaded once per component type
2. **Bundle Size**:
   - Base Svelte components: ~15-30KB (gzipped)
   - With TanStack Query: ~35KB additional (gzipped)
   - Total for data-fetching components: ~127KB uncompressed, ~35KB gzipped
3. **Shadow DOM**: Web Components use Shadow DOM by default (can be disabled)
4. **Reactivity**: Svelte's reactivity works independently of React's
5. **Caching**: TanStack Query provides intelligent caching, reducing network requests

## 🎨 Styling

Svelte components compiled as Web Components use Shadow DOM, which:
- ✅ Encapsulates styles (no CSS conflicts)
- ❌ Parent styles don't leak in
- ❌ Can't use Tailwind classes directly in Svelte components
- ✅ Can define internal styles or use CSS custom properties

To use Tailwind with Svelte components, you'd need to:
1. Import Tailwind CSS in the Svelte component
2. Or use CSS custom properties as a bridge
3. Or disable Shadow DOM (loses style encapsulation)

## 🧪 Testing

### Testing Svelte Components
Test in the Svelte project using Vitest + Testing Library:

```bash
cd svelte-inside-react
npm test
```

### Testing React Wrappers
Test in the main React app using existing test setup:

```bash
npm test
```

## 🔍 Debugging

1. **Check Console**: Web component loading errors appear in browser console
2. **Verify Build**: Ensure `svelte-components.es.js` exists in `public/`
3. **Check Network Tab**: Verify the script loads successfully
4. **Custom Element Registry**: Check `customElements.get('svelte-counter')`

## 📝 Best Practices

1. **Keep Components Small**: Web Components work best as leaf components
2. **Minimize Props**: Complex objects as props require serialization
3. **Use Events**: Prefer events over callbacks for child→parent communication
4. **Document Well**: Each Svelte component should document its API
5. **Version Control**: Keep track of which version of Svelte component is in use

## 🚨 Limitations

1. **No Server-Side Rendering**: Web Components don't work in SSR
2. **Props Are Strings**: All attributes are strings (need parsing for complex data)
3. **React Refs**: Don't work directly, use wrapper's ref
4. **React Context**: Can't access React context from Svelte components
5. **Bundle Size**: Adds Svelte runtime to the bundle

## 🔄 Build Automation

To automate the build and copy process, add to `package.json`:

```json
{
  "scripts": {
    "build:svelte": "cd svelte-inside-react && npm run build && cp dist/svelte-components.es.js ../public/svelte-components/",
    "dev:svelte": "cd svelte-inside-react && npm run dev",
    "build:all": "npm run build:svelte && npm run build"
  }
}
```

## 🎯 When to Use This Pattern

**Good Use Cases:**
- ✅ Gradual migration from Svelte to React (or vice versa)
- ✅ Sharing components across different framework projects
- ✅ Using Svelte's animation/transition features in React
- ✅ Embedding third-party Svelte components
- ✅ Data-fetching widgets that benefit from TanStack Query's caching
- ✅ Real-time data components with efficient updates

**Avoid When:**
- ❌ You need SSR/SSG for the component
- ❌ Deep integration with React features (Context, Suspense, etc.)
- ❌ Performance is critical and overhead matters
- ❌ Simple components (better to write in React)
- ❌ Need to share query cache with React's TanStack Query

## 📚 Resources

- [Svelte Custom Elements](https://svelte.dev/docs#compile-time-svelte-options-customElement)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Using Web Components in React](https://custom-elements-everywhere.com/#react)
- [TanStack Query for Svelte](https://tanstack.com/query/latest/docs/framework/svelte/overview)
- [TanStack Query Core Concepts](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

## 🎉 Demo

Visit `/svelte-demo` in the application to see a live demo of the integration with:
- Simple counter component
- Data-fetching component with TanStack Query
- Event communication examples
- State management across frameworks

---

**Last Updated**: October 19, 2025
**Svelte Version**: 5.39.6
**React Version**: 19.1.1
**TanStack Query (Svelte)**: Latest
**Bundle Size**: ~127KB uncompressed, ~35KB gzipped (with TanStack Query)
