import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { styles } from './Card.styles';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 'sm',
}) => {
  const cardStyles = [styles.card, styles[`elevation_${elevation}`], style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};
