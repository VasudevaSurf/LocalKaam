import { StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    width: getFigmaDimension(100),
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  containerSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primary + '08',
  },
  iconContainer: {
    width: getFigmaDimension(56),
    height: getFigmaDimension(56),
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSelected: {
    backgroundColor: colors.primary + '15',
  },
  icon: {
    fontSize: getFigmaDimension(32),
  },
  label: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.primary,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
