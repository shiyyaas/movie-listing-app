import { createTheme } from '@mui/material/styles';

/**
 * Apple Design System tokens from DESIGN.md
 * - Primary font stack: Inter, SF Pro Text / SF Pro Display, system-ui, -apple-system, BlinkMacSystemFont, sans-serif
 * - Primary Action Blue: #0066cc
 * - Backgrounds: #ffffff (canvas), #f5f5f7 (parchment), #fafafc (pearl)
 * - Text: #1d1d1f (ink/body), #7a7a7a (muted), #333333 (ink-muted-80)
 * - Hairlines: 1px solid #e0e0e0 (or rgba(0,0,0,0.06))
 * - Rounded metrics: xs: 5px, sm: 8px, md: 11px, lg: 18px, pill: 9999px
 * - Single system product shadow: rgba(0, 0, 0, 0.22) 3px 5px 30px
 */

export const appleColors = {
  primary: '#0066cc',
  primaryFocus: '#0071e3',
  primaryOnDark: '#2997ff',
  ink: '#1d1d1f',
  body: '#1d1d1f',
  bodyOnDark: '#ffffff',
  bodyMuted: '#cccccc',
  inkMuted80: '#333333',
  inkMuted48: '#7a7a7a',
  dividerSoft: '#f0f0f0',
  hairline: '#e0e0e0',
  canvas: '#ffffff',
  canvasParchment: '#f5f5f7',
  surfacePearl: '#fafafc',
  surfaceTile1: '#272729',
  surfaceTile2: '#2a2a2c',
  surfaceTile3: '#252527',
  surfaceBlack: '#000000',
  surfaceChipTranslucent: 'rgba(210, 210, 215, 0.64)',
  productShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px',
  cardBorder: '1px solid rgba(0, 0, 0, 0.08)',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: appleColors.primary,
      contrastText: '#ffffff',
    },
    background: {
      default: appleColors.canvasParchment,
      paper: appleColors.canvas,
    },
    text: {
      primary: appleColors.ink,
      secondary: appleColors.inkMuted48,
    },
    divider: appleColors.hairline,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Text"',
      '"SF Pro Display"',
      '"Inter"',
      'system-ui',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '40px',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.374px',
      color: appleColors.ink,
      '@media (max-width:640px)': {
        fontSize: '32px',
      },
    },
    h2: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '34px',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.374px',
      color: appleColors.ink,
    },
    h3: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.14,
      letterSpacing: '-0.2px',
      color: appleColors.ink,
    },
    h4: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '21px',
      fontWeight: 600,
      lineHeight: 1.19,
      letterSpacing: '0.231px',
      color: appleColors.ink,
    },
    body1: {
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: 1.47,
      letterSpacing: '-0.374px',
      color: appleColors.body,
    },
    body2: {
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '-0.224px',
      color: appleColors.inkMuted48,
    },
    subtitle1: {
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: 1.24,
      letterSpacing: '-0.374px',
      color: appleColors.ink,
    },
    caption: {
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.33,
      letterSpacing: '-0.12px',
      color: appleColors.inkMuted48,
    },
    button: {
      textTransform: 'none',
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '-0.224px',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: appleColors.canvasParchment,
          color: appleColors.ink,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
          margin: 0,
          padding: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          boxShadow: 'none',
          padding: '8px 18px',
          transition: 'all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)',
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&:hover': {
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: `2px solid ${appleColors.primaryFocus}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: appleColors.canvas,
          boxShadow: 'none',
          transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 400,
          fontSize: '13px',
          height: '32px',
          transition: 'all 0.15s ease',
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },
  },
});
