import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';
import { getFigmaDimension } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(4),
    backgroundColor: colors.gray[300],
    borderRadius: borderRadius.full,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    width: getFigmaDimension(32),
    height: getFigmaDimension(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
});
