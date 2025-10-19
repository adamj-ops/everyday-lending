// TypeScript declarations for Svelte Web Components
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
      'svelte-user-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          apiurl?: string;
          ondataloaded?: (event: CustomEvent<{ count: number; data: any[] }>) => void;
          onuserselect?: (event: CustomEvent<{ user: any }>) => void;
          onrefresh?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
    }
  }
}

export {};
