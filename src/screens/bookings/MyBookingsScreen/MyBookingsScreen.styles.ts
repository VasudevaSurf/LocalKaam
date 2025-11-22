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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabBadge: {
    minWidth: getFigmaDimension(20),
    height: getFigmaDimension(20),
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  tabBadgeActive: {
    backgroundColor: colors.primary,
  },
  tabBadgeText: {
    ...typography.caption,
    fontSize: getFigmaDimension(10),
    fontFamily: typography.captionBold.fontFamily,
    color: colors.textSecondary,
  },
  tabBadgeTextActive: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.massive,
  },
  bookingCard: {
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  workerName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  service: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  cardDetails: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailIcon: {
    fontSize: getFigmaDimension(16),
  },
  detailText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    flex: 1,
  },
  amountText: {
    ...typography.h4,
    color: colors.primary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
