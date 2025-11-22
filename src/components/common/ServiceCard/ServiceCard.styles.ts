import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    width: '100%',
    height: getFigmaDimension(180),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  service: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  onlineBadge: {
    width: getFigmaDimension(12),
    height: getFigmaDimension(12),
    borderRadius: borderRadius.full,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  starIcon: {
    fontSize: getFigmaDimension(14),
  },
  rating: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  reviewCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  distance: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  priceLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  price: {
    ...typography.h3,
    color: colors.primary,
  },
});
