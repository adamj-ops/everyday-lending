'use client';

import { useEffect, useRef } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

type SvelteUserListProps = {
  apiUrl?: string;
  onDataLoaded?: (data: { count: number; data: User[] }) => void;
  onUserSelect?: (user: User) => void;
  onRefresh?: () => void;
  className?: string;
};

/**
 * React wrapper for the Svelte UserList Web Component with TanStack Query
 *
 * This component demonstrates:
 * - Svelte component with TanStack Query for data fetching
 * - Embedded in a React application via Web Components
 * - Full event communication between frameworks
 */
export function SvelteUserList({
  apiUrl = 'https://jsonplaceholder.typicode.com/users',
  onDataLoaded,
  onUserSelect,
  onRefresh,
  className,
}: SvelteUserListProps) {
  const ref = useRef<HTMLElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load the Svelte web component script if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = '/svelte-components/svelte-components.es.js';
      script.type = 'module';
      script.async = true;

      script.onload = () => {
        scriptLoadedRef.current = true;
      };

      script.onerror = (error) => {
        console.error('Failed to load Svelte web component:', error);
      };

      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Set API URL attribute
    if (apiUrl) {
      element.setAttribute('apiurl', apiUrl);
    }

    // Event handlers
    const handleDataLoaded = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number; data: User[] }>;
      if (onDataLoaded) {
        onDataLoaded(customEvent.detail);
      }
    };

    const handleUserSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ user: User }>;
      if (onUserSelect) {
        onUserSelect(customEvent.detail.user);
      }
    };

    const handleRefresh = () => {
      if (onRefresh) {
        onRefresh();
      }
    };

    element.addEventListener('dataloaded', handleDataLoaded);
    element.addEventListener('userselect', handleUserSelect);
    element.addEventListener('refresh', handleRefresh);

    return () => {
      element.removeEventListener('dataloaded', handleDataLoaded);
      element.removeEventListener('userselect', handleUserSelect);
      element.removeEventListener('refresh', handleRefresh);
    };
  }, [apiUrl, onDataLoaded, onUserSelect, onRefresh]);

  return (
    <svelte-user-list
      ref={ref as any}
      className={className}
    />
  );
}
