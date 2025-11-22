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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.massive,
  },
  summaryCard: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.primary + '08',
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    ...typography.h1,
    color: colors.primary,
  },
  summaryDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  statBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.badge,
  },
  statBadgeText: {
    ...typography.caption,
    fontFamily: typography.captionBold.fontFamily,
    color: colors.textSecondary,
  },
  filtersSection: {
    marginBottom: spacing.xl,
  },
  filtersContainer: {
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.md,
  },
  paymentsSection: {
    paddingHorizontal: spacing.screenPadding,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  paymentCard: {
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentInfo: {
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
  paymentMeta: {
    marginTop: spacing.xs,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  amountSection: {
    flex: 1,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.h2,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  paymentMethodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.badge,
    alignSelf: 'flex-start',
  },
  paymentMethodIcon: {
    fontSize: getFigmaDimension(12),
  },
  paymentMethodText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
  },
  downloadIcon: {
    fontSize: getFigmaDimension(16),
  },
  downloadText: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
});
