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
    paddingBottom: spacing.massive,
  },
  searchBar: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  browseSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  browseText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
