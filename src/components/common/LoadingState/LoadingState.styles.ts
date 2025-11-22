import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.massive,
  },
  message: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
});
