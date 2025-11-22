import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './LocationPicker.styles';

export interface LocationPickerProps {
  location: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Your Location</Text>
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};
