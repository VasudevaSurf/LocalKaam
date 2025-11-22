import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

export const styles = StyleSheet.create({
  // Base button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.button,
    gap: spacing.sm,
  },

  // Variants
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: colors.error,
  },

  // Sizes
  smallButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  mediumButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  largeButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },

  // States
  disabledButton: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Text variants
  buttonText: {
    textAlign: 'center',
  },
  primaryText: {
    ...typography.buttonMedium,
    color: colors.white,
  },
  secondaryText: {
    ...typography.buttonMedium,
    color: colors.white,
  },
  outlineText: {
    ...typography.buttonMedium,
    color: colors.primary,
  },
  ghostText: {
    ...typography.buttonMedium,
    color: colors.primary,
  },
  dangerText: {
    ...typography.buttonMedium,
    color: colors.white,
  },

  // Text sizes
  smallText: {
    ...typography.buttonSmall,
  },
  mediumText: {
    ...typography.buttonMedium,
  },
  largeText: {
    ...typography.buttonLarge,
  },

  disabledText: {
    opacity: 0.7,
  },
});
