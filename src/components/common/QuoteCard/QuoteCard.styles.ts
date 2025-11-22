import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sellerName: {
    ...typography.h4,
    color: colors.textPrimary,
    flex: 1,
  },
  verifiedIcon: {
    width: getFigmaDimension(18),
    height: getFigmaDimension(18),
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    ...typography.caption,
    color: colors.white,
    fontSize: getFigmaDimension(10),
  },
  service: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  starIcon: {
    fontSize: getFigmaDimension(12),
  },
  rating: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  distance: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  messageContainer: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  message: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  quoteDetails: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  quoteItem: {
    flex: 1,
    alignItems: 'center',
  },
  quoteLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  quotePrice: {
    ...typography.h2,
    color: colors.primary,
  },
  quoteTime: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  chatButton: {
    width: getFigmaDimension(44),
  },
  acceptButton: {
    flex: 1,
  },
});
