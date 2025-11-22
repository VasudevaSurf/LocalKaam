import { Platform } from 'react-native';
import { getFigmaDimension } from '../utils/responsive.ts';

// Font families - You'll need to download and add these
export const fontFamilies = {
  // Primary Font (e.g., Inter, Poppins, or Manrope)
  regular: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter-Regular',
  }),
  medium: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
  }),

  // Secondary Font (Optional - for headings)
  displayBold: Platform.select({
    ios: 'Poppins-Bold',
    android: 'Poppins-Bold',
  }),
  displaySemiBold: Platform.select({
    ios: 'Poppins-SemiBold',
    android: 'Poppins-SemiBold',
  }),
};

// Typography scale
export const typography = {
  // Display (Large headings)
  displayLarge: {
    fontFamily: fontFamilies.displayBold,
    fontSize: getFigmaDimension(32),
    lineHeight: getFigmaDimension(40),
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily: fontFamilies.displayBold,
    fontSize: getFigmaDimension(28),
    lineHeight: getFigmaDimension(36),
    letterSpacing: -0.5,
  },
  displaySmall: {
    fontFamily: fontFamilies.displaySemiBold,
    fontSize: getFigmaDimension(24),
    lineHeight: getFigmaDimension(32),
    letterSpacing: -0.3,
  },

  // Headings
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: getFigmaDimension(24),
    lineHeight: getFigmaDimension(32),
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: getFigmaDimension(20),
    lineHeight: getFigmaDimension(28),
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(18),
    lineHeight: getFigmaDimension(26),
    letterSpacing: -0.1,
  },
  h4: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(16),
    lineHeight: getFigmaDimension(24),
    letterSpacing: 0,
  },

  // Body
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: getFigmaDimension(16),
    lineHeight: getFigmaDimension(24),
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: fontFamilies.regular,
    fontSize: getFigmaDimension(14),
    lineHeight: getFigmaDimension(20),
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: getFigmaDimension(12),
    lineHeight: getFigmaDimension(16),
    letterSpacing: 0,
  },

  // Button
  buttonLarge: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(16),
    lineHeight: getFigmaDimension(24),
    letterSpacing: 0.2,
  },
  buttonMedium: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(14),
    lineHeight: getFigmaDimension(20),
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(12),
    lineHeight: getFigmaDimension(16),
    letterSpacing: 0.2,
  },

  // Caption
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: getFigmaDimension(12),
    lineHeight: getFigmaDimension(16),
    letterSpacing: 0.2,
  },
  captionBold: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(12),
    lineHeight: getFigmaDimension(16),
    letterSpacing: 0.2,
  },

  // Overline (Small labels)
  overline: {
    fontFamily: fontFamilies.semiBold,
    fontSize: getFigmaDimension(10),
    lineHeight: getFigmaDimension(12),
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
};
