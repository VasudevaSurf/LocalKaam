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
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: getFigmaDimension(120),
  },
  workerCard: {
    marginBottom: spacing.xl,
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  scheduleCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  scheduleCardSelected: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  scheduleLabel: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  scheduleLabelSelected: {
    color: colors.primary,
  },
  scheduleSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scheduleSubtitleSelected: {
    color: colors.primary,
  },
  inputIcon: {
    fontSize: getFigmaDimension(18),
  },
  textArea: {
    minHeight: getFigmaDimension(100),
    textAlignVertical: 'top',
  },
  pricingCard: {
    backgroundColor: colors.white,
    marginBottom: spacing.xl,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  pricingLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  pricingValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.h2,
    color: colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.info + '10',
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  infoIcon: {
    fontSize: getFigmaDimension(16),
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: getFigmaDimension(18),
  },
  paymentInfoCard: {
    backgroundColor: colors.success + '10',
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  paymentInfoTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  paymentInfoList: {
    gap: spacing.md,
  },
  paymentInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkIcon: {
    fontSize: getFigmaDimension(18),
    color: colors.success,
  },
  paymentInfoText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    flex: 1,
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
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  footerPrice: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  confirmButton: {
    minWidth: getFigmaDimension(160),
  },
});
