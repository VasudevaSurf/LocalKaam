import { StyleSheet } from 'react-native';
import { colors, typography, spacing, getFigmaDimension } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.massive,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  settingsCard: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  settingLeft: {
    flex: 1,
    marginRight: spacing.lg,
  },
  settingLabel: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  settingValue: {
    ...typography.bodySmall,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  chevron: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  dangerCard: {
    backgroundColor: colors.error + '08',
    borderWidth: 1,
    borderColor: colors.error + '20',
  },
  dangerText: {
    color: colors.error,
  },
});
