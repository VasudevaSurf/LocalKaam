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
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.massive,
    paddingBottom: getFigmaDimension(100),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successCircle: {
    width: getFigmaDimension(100),
    height: getFigmaDimension(100),
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: getFigmaDimension(56),
    color: colors.white,
    fontFamily: typography.h1.fontFamily,
  },
  title: {
    ...typography.displayMedium,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
  },
  detailsCard: {
    marginBottom: spacing.lg,
  },
  workerHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  workerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  workerName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  workerService: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  detailsSection: {
    gap: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  statusBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.badge,
  },
  statusText: {
    ...typography.caption,
    fontFamily: typography.captionBold.fontFamily,
    color: colors.success,
  },
  amountLabel: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  amountValue: {
    ...typography.h2,
    color: colors.success,
  },
  paymentMethodCard: {
    backgroundColor: colors.backgroundSecondary,
    marginBottom: spacing.lg,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentIcon: {
    fontSize: getFigmaDimension(32),
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  paymentMethodValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  receiptCard: {
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '30',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  receiptIcon: {
    fontSize: getFigmaDimension(32),
  },
  receiptInfo: {
    flex: 1,
  },
  receiptTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  receiptText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(20),
  },
  actionsSection: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  thankYouCard: {
    backgroundColor: colors.success + '10',
    borderWidth: 1,
    borderColor: colors.success + '30',
    flexDirection: 'row',
    gap: spacing.md,
  },
  thankYouIcon: {
    fontSize: getFigmaDimension(32),
  },
  thankYouContent: {
    flex: 1,
  },
  thankYouTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  thankYouText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(20),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
});
