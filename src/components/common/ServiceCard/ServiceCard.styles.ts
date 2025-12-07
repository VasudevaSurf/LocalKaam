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
    aspectRatio: 9 / 16, // Vertical video aspect ratio
    height: undefined, // Let aspect ratio drive height
    position: 'relative',
    backgroundColor: colors.gray[50], // Background for loading
  },
  image: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  content: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    ...typography.bodyMedium, // Smaller font for grid
    fontFamily: typography.buttonMedium.fontFamily,
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
    gap: 2, // Tighter gap
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
