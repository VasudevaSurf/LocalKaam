import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './Chip.styles';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  disabled = false,
  style,
  textStyle,
}) => {
  const chipStyles = [
    styles.chip,
    selected && styles.chipSelected,
    disabled && styles.chipDisabled,
    style,
  ];

  const labelStyles = [
    styles.label,
    selected && styles.labelSelected,
    disabled && styles.labelDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={chipStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && icon}
      <Text style={labelStyles}>{label}</Text>
    </TouchableOpacity>
  );
};
