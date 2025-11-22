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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    fontSize: getFigmaDimension(24),
  },
  textContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  location: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  chevron: {
    ...typography.h2,
    color: colors.textSecondary,
  },
});
