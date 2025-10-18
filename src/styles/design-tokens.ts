/**
 * Design Tokens
 * Extracted from Figma design system - Attio-inspired UI
 */

export const colors = {
  // Primary Colors
  primary: {
    DEFAULT: '#276bf0',
    50: '#e3eeff',
    100: '#dcedff',
    200: '#8dabe4',
    300: '#5081e0',
    400: '#346ad3',
    500: '#276bf0',
    600: '#2b6be8',
    700: '#256cf1',
    800: '#1e3c7d',
  },

  // Neutrals
  neutral: {
    0: '#ffffff',
    50: '#fdfefe',
    100: '#fbfbfb',
    150: '#f5f5f5',
    200: '#f4f5f7',
    300: '#eeeff1',
    400: '#e5e5e7',
    500: '#dcdbdd',
    600: '#bbb8be',
    700: '#8c8d91',
    800: '#7d8184',
    900: '#696a6c',
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#323334',
    tertiary: '#434548',
    muted: '#696a6c',
    disabled: '#838486',
    placeholder: '#a6a7a9',
    light: '#b8b9bb',
    lighter: '#b7b7b7',
  },

  // Accent Colors
  accent: {
    cyan: '#19bbe8',
    blue: '#2a6beb',
  },

  // Status Colors (to be added as needed)
  success: {
    DEFAULT: '#10b981',
    light: '#d1fae5',
  },
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fef3c7',
  },
  error: {
    DEFAULT: '#ef4444',
    light: '#fee2e2',
  },
} as const;

export const typography = {
  fontFamily: {
    primary: ['Manrope', 'system-ui', 'sans-serif'],
    secondary: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    'xs': '9.5px',
    'sm': '10px',
    'smPlus': '10.5px',
    'base': '12px',
    'basePlus': '12.5px',
    'md': '13px',
    'lg': '14px',
    'xl': '16px',
    'xlPlus': '16.5px',
    '2xl': '24px',
  },
  fontWeight: {
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.8',
  },
} as const;

export const spacing = {
  0: '0',
  0.5: '2px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const borderRadius = {
  'none': '0',
  'sm': '2px',
  'DEFAULT': '4px',
  'md': '5px',
  'lg': '8px',
  'xl': '10px',
  '2xl': '20px',
  'full': '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export const layout = {
  sidebar: {
    width: '261px',
    collapsedWidth: '64px',
  },
  header: {
    height: '49px',
  },
  contentMaxWidth: '1440px',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: '20px',
      md: '28px',
      lg: '32px',
      xl: '35px',
    },
    padding: {
      sm: '4px 8px',
      md: '6px 12px',
      lg: '8px 16px',
    },
  },
  input: {
    height: {
      sm: '28px',
      md: '35px',
      lg: '44px',
    },
  },
  table: {
    rowHeight: '37px',
    headerHeight: '37px',
  },
  avatar: {
    size: {
      sm: '20px',
      md: '24px',
      lg: '32px',
      xl: '40px',
    },
  },
  badge: {
    height: '19px',
    padding: '2px 5px',
  },
} as const;
