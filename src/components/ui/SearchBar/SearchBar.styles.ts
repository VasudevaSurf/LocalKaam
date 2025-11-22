import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.input,
    paddingHorizontal: spacing.lg,
    height: getFigmaDimension(48),
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    ...typography.bodyMedium,
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  iconText: {
    fontSize: getFigmaDimension(18),
  },
  filterButton: {
    width: getFigmaDimension(48),
    height: getFigmaDimension(48),
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    minWidth: getFigmaDimension(18),
    height: getFigmaDimension(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  filterBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontSize: getFigmaDimension(10),
    fontFamily: typography.captionBold.fontFamily,
  },
});
