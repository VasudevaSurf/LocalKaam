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
    backgroundColor: '#F8F9FA',
  },
  // Map Implementation Styles
  mapContainer: {
    height: 350, // Taking nearly 40-50% of screen
    width: '100%',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  predictionsList: {
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 8,
    elevation: 4,
    maxHeight: 200,
  },
  predictionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  predictionText: {
    color: '#333',
    fontSize: 14,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -35,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detectButtonText: {
    fontWeight: '600',
    color: '#6200EE', // Primary
  },
  // Scroll Content (Form)
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 16, // Map is above, this is for form content below
    paddingBottom: 120, // Increased to avoid footer overlap
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  // Existing Styles...
  infoCard: {
    marginBottom: 24,
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '30',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  infoIcon: {
    fontSize: getFigmaDimension(24),
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: getFigmaDimension(20),
  },
  section: {
    marginTop: spacing.xxl,
  },
  label: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  required: {
    color: colors.error,
  },
  servicesContainer: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipIcon: {
    fontSize: getFigmaDimension(16),
  },
  textArea: {
    minHeight: getFigmaDimension(120),
    textAlignVertical: 'top',
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  inputIcon: {
    fontSize: getFigmaDimension(18),
  },
  urgencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  urgencyCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  urgencyCardSelected: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  urgencyLabel: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  urgencyLabelSelected: {
    color: colors.primary,
  },
  urgencySubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  urgencySubtitleSelected: {
    color: colors.primary,
  },
  summaryCard: {
    marginTop: spacing.xxl,
    backgroundColor: colors.backgroundSecondary,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.bodyMedium,
    fontFamily: typography.buttonMedium.fontFamily,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.sm,
  },
  footerNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  dateDisplay: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateDisplayText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  changeDateText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
