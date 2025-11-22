import { StyleSheet } from 'react-native';
import { colors, typography, spacing, getFigmaDimension } from '../../../theme';

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
    paddingTop: spacing.xxl,
    paddingBottom: getFigmaDimension(100),
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  changePhotoButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  changePhotoText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  form: {
    gap: spacing.xl,
  },
  inputIcon: {
    fontSize: getFigmaDimension(18),
  },
  disabledInput: {
    opacity: 0.6,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: -spacing.md,
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
