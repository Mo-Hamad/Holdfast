import type { Config } from 'tailwindcss';

/**
 * Holdfast UI palette.
 * Dark theme with cool greys and an indigo accent.
 *
 * Use semantic names (bg-base, text-secondary) in components — not raw colors.
 */
export default {
  content: ['./src/renderer/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds, lightest to darkest moving outward from chat content.
        base: '#1a1b1e',        // page background (rail + sidebar wash)
        surface: '#25262b',      // sidebars, panels
        elevated: '#2f3035',     // chat area, message hover
        overlay: '#3a3b40',      // modals, popovers
        border: '#3a3b40',       // subtle dividers

        // Text
        primary: '#e3e4e6',      // main text
        secondary: '#a8a9ad',    // metadata, timestamps
        muted: '#6e6f73',        // placeholders, disabled

        // Accent (indigo)
        accent: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
          muted: '#4f46e5',
        },

        // Status
        online: '#22c55e',
        idle: '#eab308',
        offline: '#6e6f73',
        danger: '#ef4444',
        success: '#10b981',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        // Compact scale tuned for chat density
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['0.9375rem', { lineHeight: '1.375rem' }], // 15px — chat body size
        lg: ['1.125rem', { lineHeight: '1.5rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
      },
      spacing: {
        // Sidebar widths
        rail: '4.5rem',      // 72px — hold rail
        sidebar: '15rem',    // 240px — channel + member sidebars
      },
    },
  },
  plugins: [],
} satisfies Config;
