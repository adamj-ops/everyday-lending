/**
 * Design tokens inspired by Attio × Mercury aesthetic
 * Elegant, minimal, glassy, confident
 */

export const theme = {
  colors: {
    'background': 'hsl(0 0% 100%)',
    'foreground': 'hsl(222 47% 11%)',
    'muted': 'hsl(210 20% 98%)',
    'muted-foreground': 'hsl(215 16% 47%)',
    'card': 'hsl(0 0% 100%)',
    'card-foreground': 'hsl(222 47% 11%)',
    'accent': 'hsl(221 83% 53%)',
    'accent-foreground': 'hsl(0 0% 100%)',
    'border': 'hsl(210 16% 93%)',
    'border-foreground': 'hsl(210 16% 93%)',
    'input': 'hsl(210 16% 93%)',
    'ring': 'hsl(221 83% 53%)',
    'destructive': 'hsl(0 84% 60%)',
    'destructive-foreground': 'hsl(0 0% 100%)',
    'success': 'hsl(142 76% 36%)',
    'success-foreground': 'hsl(0 0% 100%)',
    'warning': 'hsl(38 92% 50%)',
    'warning-foreground': 'hsl(0 0% 100%)',
  },
  radius: {
    'none': '0px',
    'sm': '0.25rem',
    'md': '0.5rem',
    'lg': '1rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    'full': '9999px',
  },
  shadows: {
    card: '0 1px 2px rgba(0,0,0,0.05)',
    drawer: '0 10px 40px rgba(0,0,0,0.1)',
    dropdown: '0 4px 20px rgba(0,0,0,0.08)',
    modal: '0 20px 60px rgba(0,0,0,0.15)',
  },
  spacing: {
    sidebar: '260px',
    topbar: '56px',
    content: '1.5rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.4',
      relaxed: '1.6',
    },
  },
  motion: {
    duration: {
      fast: '0.15s',
      normal: '0.2s',
      slow: '0.25s',
    },
    easing: {
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type Theme = typeof theme;
