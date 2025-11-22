import { StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  statusBarHeight,
  getFigmaDimension,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  skipButton: {
    position: 'absolute',
    top: statusBarHeight + spacing.md,
    right: spacing.screenPadding,
    zIndex: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding * 2,
  },
  icon: {
    fontSize: getFigmaDimension(120),
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.displayMedium,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: getFigmaDimension(28),
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: getFigmaDimension(8),
    height: getFigmaDimension(8),
    borderRadius: getFigmaDimension(4),
    backgroundColor: colors.gray[300],
  },
  dotActive: {
    width: getFigmaDimension(24),
    backgroundColor: colors.primary,
  },
});
