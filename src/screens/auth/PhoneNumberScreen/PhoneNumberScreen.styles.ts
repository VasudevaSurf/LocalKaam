import { StyleSheet } from 'react-native';
import { colors, typography, spacing, getFigmaDimension } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.massive,
    paddingBottom: getFigmaDimension(100),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  icon: {
    fontSize: getFigmaDimension(100),
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
  inputSection: {
    marginBottom: spacing.xxxl,
  },
  countryCode: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    fontSize: getFigmaDimension(16),
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  termsText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: getFigmaDimension(20),
  },
  linkText: {
    color: colors.primary,
    fontFamily: typography.buttonMedium.fontFamily,
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
