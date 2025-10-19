'use client';

import { useEffect, useRef } from 'react';

interface SvelteCounterProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
  className?: string;
}

/**
 * React wrapper for the Svelte Counter Web Component
 * 
 * This component demonstrates embedding Svelte components within a React application
 * using Web Components/Custom Elements as a bridge.
 */
export function SvelteCounter({ 
  initialCount = 0, 
  onCountChange,
  className 
}: SvelteCounterProps) {
  const ref = useRef<HTMLElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load the Svelte web component script
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
    if (!element) return;

    // Set initial count attribute
    if (initialCount !== undefined) {
      element.setAttribute('initialcount', String(initialCount));
    }

    // Listen for count change events
    const handleCountChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number }>;
      if (onCountChange) {
        onCountChange(customEvent.detail.count);
      }
    };

    element.addEventListener('countchange', handleCountChange);

    return () => {
      element.removeEventListener('countchange', handleCountChange);
    };
  }, [initialCount, onCountChange]);

  return (
    <svelte-counter 
      ref={ref as any}
      className={className}
    />
  );
}

