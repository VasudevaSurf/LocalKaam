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
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  userName: {
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
  locationPicker: {
    marginTop: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.massive,
  },
  searchBar: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
  },
  quickActions: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.white,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.card,
    gap: spacing.md,
  },
  requestCard: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  browseCard: {
    backgroundColor: colors.secondary + '15',
    borderWidth: 1,
    borderColor: colors.secondary + '30',
  },
  actionIcon: {
    fontSize: getFigmaDimension(32),
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  actionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionChevron: {
    ...typography.h2,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xxl,
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
  seeAll: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.primary,
  },
  categoriesContainer: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipIcon: {
    fontSize: getFigmaDimension(16),
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
});
