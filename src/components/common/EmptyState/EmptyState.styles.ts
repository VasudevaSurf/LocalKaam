import { StyleSheet } from 'react-native';
import { colors, typography, spacing, getFigmaDimension } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.massive,
  },
  icon: {
    fontSize: getFigmaDimension(80),
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    maxWidth: getFigmaDimension(300),
  },
  button: {
    minWidth: getFigmaDimension(200),
  },
});
