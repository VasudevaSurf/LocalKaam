import React from 'react';
import { TouchableOpacity, Text, ViewStyle, View } from 'react-native';
import { styles } from './CategoryCard.styles';

export interface CategoryCardProps {
  icon: string;
  label: string;
  count?: number;
  onPress?: () => void;
  style?: ViewStyle;
  selected?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  label,
  count,
  onPress,
  style,
  selected = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, selected && styles.iconContainerSelected]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text
        style={[styles.label, selected && styles.labelSelected]}
        numberOfLines={2}
      >
        {label}
      </Text>
      {count !== undefined && <Text style={styles.count}>{count}+</Text>}
    </TouchableOpacity>
  );
};
