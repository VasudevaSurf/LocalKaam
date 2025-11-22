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
    paddingBottom: getFigmaDimension(120),
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '30',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  infoIcon: {
    fontSize: getFigmaDimension(24),
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(20),
  },
  section: {
    marginTop: spacing.xxl,
  },
  label: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  required: {
    color: colors.error,
  },
  servicesContainer: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipIcon: {
    fontSize: getFigmaDimension(16),
  },
  textArea: {
    minHeight: getFigmaDimension(120),
    textAlignVertical: 'top',
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  inputIcon: {
    fontSize: getFigmaDimension(18),
  },
  urgencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  urgencyCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  urgencyCardSelected: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  urgencyLabel: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  urgencyLabelSelected: {
    color: colors.primary,
  },
  urgencySubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  urgencySubtitleSelected: {
    color: colors.primary,
  },
  summaryCard: {
    marginTop: spacing.xxl,
    backgroundColor: colors.backgroundSecondary,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.sm,
  },
  footerNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
