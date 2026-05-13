/**
 * Ken Research Design System — Top-Level Barrel Export
 *
 * Architecture:
 *   tokens.ts       → JS mirror of theme.css CSS custom properties
 *   components/     → Reusable UI primitives (Avatar, Button, Divider, etc.)
 *
 * Usage:
 *   import { Button, Avatar, Divider } from '../../design-system';
 *   import { colors, spacing } from '../../design-system';
 */

// Tokens
export {
  fontScale,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  dimensions,
  breakpoints,
  DESIGN_SYSTEM_VERSION,
} from './tokens';

// Token types
export type {
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  BorderRadiusTokens,
  ShadowTokens,
  TransitionTokens,
  ZIndexTokens,
  DimensionTokens,
  BreakpointTokens,
} from './tokens';

// Components
export {
  Avatar,
  Button,
  Divider,
  Logo,
  MenuItem,
  SkipLink,
  StatusDot,
  TextLink,
} from './components';

// Component types
export type { ButtonVariant, ButtonSize, ButtonBackground } from './components';