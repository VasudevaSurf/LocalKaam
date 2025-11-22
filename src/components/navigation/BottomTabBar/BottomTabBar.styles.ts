import { StyleSheet, Platform } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  getFigmaDimension,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: getFigmaDimension(24),
    opacity: 0.6,
  },
  iconActive: {
    opacity: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    minWidth: getFigmaDimension(16),
    height: getFigmaDimension(16),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    ...typography.caption,
    fontSize: getFigmaDimension(9),
    fontFamily: typography.captionBold.fontFamily,
    color: colors.white,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  labelActive: {
    ...typography.captionBold,
    color: colors.primary,
  },
});
