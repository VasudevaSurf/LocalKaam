import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sizes
  xsContainer: {
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
  },
  smContainer: {
    width: getFigmaDimension(32),
    height: getFigmaDimension(32),
  },
  mdContainer: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
  },
  lgContainer: {
    width: getFigmaDimension(56),
    height: getFigmaDimension(56),
  },
  xlContainer: {
    width: getFigmaDimension(80),
    height: getFigmaDimension(80),
  },

  // Image
  image: {
    borderRadius: 999,
  },
  xsImage: {
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
  },
  smImage: {
    width: getFigmaDimension(32),
    height: getFigmaDimension(32),
  },
  mdImage: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
  },
  lgImage: {
    width: getFigmaDimension(56),
    height: getFigmaDimension(56),
  },
  xlImage: {
    width: getFigmaDimension(80),
    height: getFigmaDimension(80),
  },

  // Placeholder
  placeholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text
  text: {
    color: colors.white,
    fontFamily: typography.h4.fontFamily,
  },
  xsText: {
    fontSize: getFigmaDimension(10),
  },
  smText: {
    fontSize: getFigmaDimension(12),
  },
  mdText: {
    fontSize: getFigmaDimension(14),
  },
  lgText: {
    fontSize: getFigmaDimension(20),
  },
  xlText: {
    fontSize: getFigmaDimension(28),
  },

  // Badge
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
