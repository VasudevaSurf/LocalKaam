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
  searchSection: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  categoriesContainer: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipIcon: {
    fontSize: getFigmaDimension(16),
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  resultsCount: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.gray[50],
  },
  sortIcon: {
    fontSize: getFigmaDimension(14),
    color: colors.textSecondary,
  },
  sortText: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.massive,
  },
  workerCard: {
    marginBottom: spacing.md,
  },
  filtersContent: {
    flex: 1,
  },
  filtersContentContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  filterIcon: {
    fontSize: getFigmaDimension(24),
  },
  filterLabel: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  filterDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  checkbox: {
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
    borderRadius: borderRadius.xs,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: getFigmaDimension(14),
    fontFamily: typography.captionBold.fontFamily,
  },
  filterSection: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  filterSectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  ratingOptions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  ratingOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[50],
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  ratingOptionActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  ratingText: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textSecondary,
  },
  ratingTextActive: {
    color: colors.primary,
  },
  distanceOptions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  distanceOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[50],
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  distanceOptionActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  distanceText: {
    ...typography.bodySmall,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textSecondary,
  },
  distanceTextActive: {
    color: colors.primary,
  },
  activeFilters: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
  },
  activeFiltersTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  activeFiltersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filtersFooter: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
});
