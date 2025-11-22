import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

export const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.badge,
    gap: spacing.xs,
  },

  // Variants
  primaryBadge: {
    backgroundColor: colors.primary + '15',
  },
  successBadge: {
    backgroundColor: colors.success + '15',
  },
  warningBadge: {
    backgroundColor: colors.warning + '15',
  },
  errorBadge: {
    backgroundColor: colors.error + '15',
  },
  infoBadge: {
    backgroundColor: colors.info + '15',
  },
  neutralBadge: {
    backgroundColor: colors.gray[100],
  },

  // Sizes
  smallBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  mediumBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  largeBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  // Text variants
  label: {
    ...typography.caption,
  },
  primaryLabel: {
    color: colors.primary,
  },
  successLabel: {
    color: colors.success,
  },
  warningLabel: {
    color: colors.warning,
  },
  errorLabel: {
    color: colors.error,
  },
  infoLabel: {
    color: colors.info,
  },
  neutralLabel: {
    color: colors.textSecondary,
  },

  // Text sizes
  smallLabel: {
    fontSize: typography.caption.fontSize,
  },
  mediumLabel: {
    fontSize: typography.captionBold.fontSize,
  },
  largeLabel: {
    fontSize: typography.bodySmall.fontSize,
  },

  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
