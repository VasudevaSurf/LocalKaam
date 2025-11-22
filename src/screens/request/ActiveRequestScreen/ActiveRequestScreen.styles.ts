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
  cancelButton: {
    marginTop: spacing.lg,
  },
});
