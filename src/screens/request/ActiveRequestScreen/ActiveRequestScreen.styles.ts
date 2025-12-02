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
  requestCard: {
    marginBottom: spacing.lg,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  requestHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  serviceIcon: {
    fontSize: getFigmaDimension(32),
  },
  serviceName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  requestTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  requestDetails: {
    gap: spacing.md,
  },
  requestDescription: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    lineHeight: getFigmaDimension(22),
  },
  requestMeta: {
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaIcon: {
    fontSize: getFigmaDimension(14),
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsCard: {
    backgroundColor: colors.primary + '10',
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  quotesSection: {
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
  liveIndicator: {
    ...typography.caption,
    fontFamily: typography.captionBold.fontFamily,
    color: colors.success,
  },
  liveDot: {
    fontSize: getFigmaDimension(8),
  },
  quoteCard: {
    marginBottom: spacing.md,
  },
  comingSoonCard: {
    backgroundColor: colors.background,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  comingSoonText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  comingSoonSubtext: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: spacing.lg,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  workerAvatar: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerInitials: {
    ...typography.h3,
    color: colors.primary,
  },
  workerName: {
    ...typography.bodyMedium,
    fontFamily: typography.h4.fontFamily,
    color: colors.textPrimary,
  },
  workerRating: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  timerBadge: {
    backgroundColor: colors.error + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  timerText: {
    ...typography.captionBold,
    color: colors.error,
  },
  quoteContent: {
    marginBottom: spacing.md,
  },
  quotePrice: {
    ...typography.h2,
    color: colors.success,
    marginBottom: spacing.xs,
  },
  quoteMessage: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  acceptButton: {
    width: '100%',
  },
  workerProfileCard: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  workerProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  largeAvatar: {
    width: getFigmaDimension(64),
    height: getFigmaDimension(64),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeInitials: {
    ...typography.h2,
    color: colors.primary,
  },
  workerNameLarge: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  workerSkill: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  workerRatingLarge: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontFamily: typography.h4.fontFamily,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
