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
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: getFigmaDimension(100),
  },
  backButton: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  backIcon: {
    fontSize: getFigmaDimension(28),
    color: colors.textPrimary,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: getFigmaDimension(80),
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
    lineHeight: getFigmaDimension(28),
  },
  phoneNumber: {
    color: colors.textPrimary,
    fontFamily: typography.buttonMedium.fontFamily,
  },
  otpSection: {
    marginBottom: spacing.xxl,
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
    backgroundColor: colors.primary + '08',
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
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
  timerCount: {
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.info + '10',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  helpIcon: {
    fontSize: getFigmaDimension(20),
  },
  helpText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
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
