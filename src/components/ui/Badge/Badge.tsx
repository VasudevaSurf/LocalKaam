import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './Badge.styles';

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'medium',
  icon,
  style,
  textStyle,
}) => {
  const badgeStyles = [
    styles.badge,
    styles[`${variant}Badge`],
    styles[`${size}Badge`],
    style,
  ];

  const labelStyles = [
    styles.label,
    styles[`${variant}Label`],
    styles[`${size}Label`],
    textStyle,
  ];

  return (
    <View style={badgeStyles}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={labelStyles}>{label}</Text>
    </View>
  );
};
