import { StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  getFigmaDimension,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  backIcon: {
    fontSize: getFigmaDimension(24),
    color: colors.textPrimary,
  },
  markReadText: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.massive,
  },
  notificationCard: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  unreadCard: {
    backgroundColor: colors.primary + '05',
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconContainer: {
    width: getFigmaDimension(48),
    height: getFigmaDimension(48),
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: getFigmaDimension(24),
  },
  notificationContent: {
    flex: 1,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  notificationTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: getFigmaDimension(8),
    height: getFigmaDimension(8),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
  notificationMessage: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(20),
  },
  notificationTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  actionButtonText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
});
