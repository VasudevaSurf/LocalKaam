export * from './colors';
export * from './typography';
export * from './spacing';
export * from '../utils/responsive';

import { colors } from './colors';
import { typography, fontFamilies } from './typography';
import { spacing, borderRadius, elevation } from './spacing';
import {
  getScreenHeight,
  getFigmaDimension,
  getScreenWidth,
} from '../utils/responsive';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  borderRadius,
  elevation,
  getScreenHeight,
  getFigmaDimension,
  getScreenWidth,
};

export type Theme = typeof theme;
