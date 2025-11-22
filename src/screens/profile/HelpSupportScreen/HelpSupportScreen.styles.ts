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
  contactCard: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.primary + '08',
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  contactOption: {
    alignItems: 'center',
    gap: spacing.md,
  },
  contactIconContainer: {
    width: getFigmaDimension(64),
    height: getFigmaDimension(64),
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: getFigmaDimension(32),
  },
  contactLabel: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  faqCard: {
    padding: 0,
  },
  faqItem: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.md,
  },
  faqToggle: {
    ...typography.h2,
    color: colors.primary,
  },
  faqAnswer: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: getFigmaDimension(22),
  },
  queryCard: {
    gap: spacing.lg,
  },
  queryTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  queryInput: {
    minHeight: getFigmaDimension(120),
    textAlignVertical: 'top',
  },
  linksCard: {
    padding: 0,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  linkIcon: {
    fontSize: getFigmaDimension(24),
    marginRight: spacing.md,
  },
  linkText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    flex: 1,
  },
  linkChevron: {
    ...typography.h3,
    color: colors.textSecondary,
  },
});
