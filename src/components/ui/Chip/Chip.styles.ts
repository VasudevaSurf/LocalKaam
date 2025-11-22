import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: 'transparent',
    gap: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontFamily: typography.buttonMedium.fontFamily,
  },
  labelSelected: {
    color: colors.white,
  },
  labelDisabled: {
    color: colors.textDisabled,
  },
});
