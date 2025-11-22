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
  backIcon: {
    fontSize: getFigmaDimension(24),
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: getFigmaDimension(100),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: getFigmaDimension(80),
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: getFigmaDimension(22),
    marginBottom: spacing.xxl,
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
    ...typography.h4,
    color: colors.textPrimary,
  },
  workerService: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  paymentDetails: {
    gap: spacing.sm,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  paymentAmount: {
    ...typography.h2,
    color: colors.primary,
  },
  paymentNote: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  otpSection: {
    marginBottom: spacing.xl,
  },
  otpLabel: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  otpInput: {
    width: getFigmaDimension(48),
    height: getFigmaDimension(56),
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    backgroundColor: colors.white,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  resendText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  timerText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  instructionsCard: {
    backgroundColor: colors.info + '10',
    borderWidth: 1,
    borderColor: colors.info + '30',
    marginBottom: spacing.lg,
  },
  instructionsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  instructionsList: {
    gap: spacing.lg,
  },
  instructionItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepNumber: {
    ...typography.h4,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
    textAlign: 'center',
    lineHeight: getFigmaDimension(24),
    backgroundColor: colors.primary + '20',
    borderRadius: borderRadius.full,
  },
  instructionText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: getFigmaDimension(22),
  },
  warningCard: {
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '30',
    flexDirection: 'row',
    gap: spacing.md,
  },
  warningIcon: {
    fontSize: getFigmaDimension(24),
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  warningText: {
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
