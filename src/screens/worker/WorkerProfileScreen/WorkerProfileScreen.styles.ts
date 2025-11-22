import { StyleSheet, Dimensions } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  getFigmaDimension,
} from '../../../theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  backIcon: {
    fontSize: getFigmaDimension(24),
    color: colors.white,
  },
  shareIcon: {
    fontSize: getFigmaDimension(24),
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: getFigmaDimension(100),
  },
  coverImage: {
    width: width,
    height: getFigmaDimension(200),
    backgroundColor: colors.gray[200],
  },
  profileHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.white,
  },
  avatar: {
    marginTop: getFigmaDimension(-40),
    marginBottom: spacing.lg,
    borderWidth: 4,
    borderColor: colors.white,
  },
  onlineBadge: {
    width: getFigmaDimension(16),
    height: getFigmaDimension(16),
    borderRadius: borderRadius.full,
    backgroundColor: colors.online,
    borderWidth: 3,
    borderColor: colors.white,
  },
  headerInfo: {
    gap: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  verifiedBadge: {
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: colors.white,
    fontSize: getFigmaDimension(14),
    fontFamily: typography.captionBold.fontFamily,
  },
  service: {
    ...typography.h4,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  starIcon: {
    fontSize: getFigmaDimension(16),
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
  dot: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsCard: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statIcon: {
    fontSize: getFigmaDimension(24),
  },
  statValue: {
    ...typography.h4,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  availabilityContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  pricingCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.lg,
  },
  pricingRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceValue: {
    ...typography.h2,
    color: colors.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabContent: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  bioText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(24),
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  languageText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  videosContainer: {
    gap: spacing.md,
  },
  videoCard: {
    width: getFigmaDimension(200),
  },
  videoThumbnail: {
    width: getFigmaDimension(200),
    height: getFigmaDimension(150),
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[200],
  },
  playButton: {
    position: 'absolute',
    top: getFigmaDimension(50),
    left: getFigmaDimension(75),
    width: getFigmaDimension(50),
    height: getFigmaDimension(50),
    borderRadius: borderRadius.full,
    backgroundColor: colors.white + 'DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: getFigmaDimension(20),
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  videoTitle: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  workImagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  workImageCard: {
    width: (width - spacing.screenPadding * 2 - spacing.sm * 2) / 3,
    aspectRatio: 1,
  },
  workImage: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[200],
  },
  ratingSummaryCard: {
    marginBottom: spacing.xl,
  },
  ratingSummary: {
    flexDirection: 'row',
    gap: spacing.xxl,
  },
  ratingLeft: {
    alignItems: 'center',
    minWidth: getFigmaDimension(100),
  },
  ratingLarge: {
    ...typography.displayLarge,
    color: colors.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: spacing.sm,
  },
  star: {
    fontSize: getFigmaDimension(16),
  },
  ratingCount: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  ratingBars: {
    flex: 1,
    gap: spacing.sm,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ratingBarLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    width: getFigmaDimension(40),
  },
  ratingBarContainer: {
    flex: 1,
    height: getFigmaDimension(6),
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: colors.warning,
  },
  ratingBarCount: {
    ...typography.caption,
    color: colors.textSecondary,
    width: getFigmaDimension(30),
    textAlign: 'right',
  },
  reviewsList: {
    gap: spacing.md,
  },
  reviewCard: {
    gap: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  reviewHeaderInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  reviewerName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  reviewComment: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(22),
  },
  reviewImagesContainer: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  reviewImage: {
    width: getFigmaDimension(80),
    height: getFigmaDimension(80),
    borderRadius: borderRadius.sm,
    backgroundColor: colors.gray[200],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  callButton: {
    width: getFigmaDimension(56),
  },
  messageButton: {
    width: getFigmaDimension(56),
  },
  hireButton: {
    flex: 1,
  },
});
