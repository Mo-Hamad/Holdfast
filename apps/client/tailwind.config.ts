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
        // Backgrounds — warm dark wood tones
        base: '#1c1710',         // page background (darkest, like charred wood)
        surface: '#252019',      // sidebars, panels
        elevated: '#2e2a1d',     // chat area, message hover
        overlay: '#3a3425',      // modals, popovers
        border: '#3d3828',       // subtle warm dividers

        // Text — warm parchment tones
        primary: '#f0e6d0',      // main text
        secondary: '#b8a888',    // metadata, timestamps
        muted: '#7a6a50',        // placeholders, disabled

        // Accent (amber / gold)
        accent: {
          DEFAULT: '#c8922a',
          hover: '#e0a83a',
          muted: '#a07020',
        },

        // Status
        online: '#5db847',
        idle: '#e0a83a',
        offline: '#7a6a50',
        danger: '#d94f3a',
        success: '#5db847',
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
        rail: '4rem',        // 64px — top rail height
        sidebar: '15rem',    // 240px — channel + member sidebars
      },
    },
  },
  plugins: [],
} satisfies Config;
