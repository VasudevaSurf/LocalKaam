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
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  notificationButton: {
    width: getFigmaDimension(44),
    height: getFigmaDimension(44),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: getFigmaDimension(24),
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    minWidth: getFigmaDimension(18),
    height: getFigmaDimension(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  notificationBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontSize: getFigmaDimension(10),
    fontFamily: typography.captionBold.fontFamily,
  },
  locationContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.massive,
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.xl,
    backgroundColor: colors.primary + '08',
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  ctaIcon: {
    fontSize: getFigmaDimension(64),
    marginBottom: spacing.lg,
  },
  ctaTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ctaDescription: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    lineHeight: getFigmaDimension(22),
  },
  ctaButton: {
    minWidth: getFigmaDimension(240),
    marginBottom: spacing.xl,
  },
  ctaFeatures: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureIcon: {
    fontSize: getFigmaDimension(14),
    color: colors.success,
  },
  featureText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  stepsCard: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  stepNumber: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...typography.h3,
    color: colors.white,
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing.xs,
  },
  stepTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  stepDivider: {
    width: 2,
    height: getFigmaDimension(24),
    backgroundColor: colors.border,
    marginLeft: getFigmaDimension(19),
    marginVertical: spacing.sm,
  },
  requestCard: {
    marginBottom: spacing.md,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  requestHeaderLeft: {
    flex: 1,
  },
  requestService: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  requestTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  requestDescription: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: getFigmaDimension(20),
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestBudget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  budgetIcon: {
    fontSize: getFigmaDimension(16),
  },
  budgetText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  viewButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  viewButtonText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  statsCard: {
    backgroundColor: colors.success + '10',
    borderWidth: 1,
    borderColor: colors.success + '20',
  },
  statsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.success,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
