import { StyleSheet } from 'react-native';
import { colors, typography, spacing, getFigmaDimension } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.massive,
  },
  logo: {
    fontSize: getFigmaDimension(80),
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.displayLarge,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.h3,
    color: colors.white,
    opacity: 0.9,
  },
  tagline: {
    ...typography.bodyMedium,
    color: colors.white,
    opacity: 0.8,
    position: 'absolute',
    bottom: spacing.massive,
  },
});
