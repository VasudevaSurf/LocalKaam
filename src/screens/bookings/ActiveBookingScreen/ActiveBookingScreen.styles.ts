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
    paddingBottom: spacing.massive,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
  },
  statusIcon: {
    fontSize: getFigmaDimension(32),
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  statusSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  otpCard: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.primary + '08',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  otpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  otpLabel: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  otpDisplay: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  otpDigit: {
    width: getFigmaDimension(48),
    height: getFigmaDimension(64),
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  otpDigitText: {
    ...typography.displayMedium,
    color: colors.primary,
  },
  otpInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    maxWidth: '90%',
  },
  infoIcon: {
    fontSize: getFigmaDimension(16),
  },
  otpInfoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: getFigmaDimension(18),
  },
  workerCard: {
    marginBottom: spacing.lg,
  },
  workerHeader: {
    flexDirection: 'row',
    gap: spacing.lg,
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
  workerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  starIcon: {
    fontSize: getFigmaDimension(14),
  },
  rating: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  reviews: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  onlineBadge: {
    width: getFigmaDimension(16),
    height: getFigmaDimension(16),
    borderRadius: borderRadius.full,
    backgroundColor: colors.online,
    borderWidth: 3,
    borderColor: colors.white,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  contactButton: {
    flex: 1,
  },
  detailsCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  detailIcon: {
    fontSize: getFigmaDimension(20),
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  amountText: {
    ...typography.h3,
    color: colors.primary,
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
  paymentActions: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  paymentPendingText: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: getFigmaDimension(24),
  },
  cancelButton: {
    marginBottom: spacing.xl,
  },
  supportCard: {
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '30',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  supportIcon: {
    fontSize: getFigmaDimension(32),
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  supportText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  supportButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  supportButtonText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.warning,
  },
});
