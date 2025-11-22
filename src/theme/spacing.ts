import { getFigmaDimension } from '../utils/responsive.ts';

export const spacing = {
  xs: getFigmaDimension(4),
  sm: getFigmaDimension(8),
  md: getFigmaDimension(12),
  lg: getFigmaDimension(16),
  xl: getFigmaDimension(20),
  xxl: getFigmaDimension(24),
  xxxl: getFigmaDimension(32),
  huge: getFigmaDimension(40),
  massive: getFigmaDimension(48),

  // Semantic spacing
  screenPadding: getFigmaDimension(16),
  cardPadding: getFigmaDimension(16),
  sectionGap: getFigmaDimension(24),
  itemGap: getFigmaDimension(12),
};

export const borderRadius = {
  xs: getFigmaDimension(4),
  sm: getFigmaDimension(8),
  md: getFigmaDimension(12),
  lg: getFigmaDimension(16),
  xl: getFigmaDimension(20),
  xxl: getFigmaDimension(24),
  full: 9999,

  // Semantic radius
  button: getFigmaDimension(12),
  card: getFigmaDimension(16),
  input: getFigmaDimension(12),
  badge: getFigmaDimension(8),
};

export const elevation = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  xxl: 16,
};
