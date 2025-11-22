import { StyleSheet, Platform } from 'react-native';
import {
  colors,
  typography,
  spacing,
  statusBarHeight,
  getFigmaDimension,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    minHeight:
      getFigmaDimension(60) + (Platform.OS === 'ios' ? statusBarHeight : 0),
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  iconButton: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
