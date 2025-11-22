import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { styles } from './Avatar.styles';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  source?: { uri: string } | number;
  name?: string;
  size?: AvatarSize;
  badge?: React.ReactNode;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  badge,
  style,
}) => {
  const containerStyles = [styles.container, styles[`${size}Container`], style];
  const imageStyles = [styles.image, styles[`${size}Image`]];
  const textStyles = [styles.text, styles[`${size}Text`]];

  const getInitials = (fullName?: string): string => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <View style={containerStyles}>
      {source ? (
        <Image source={source} style={imageStyles} />
      ) : (
        <View style={[imageStyles, styles.placeholder]}>
          <Text style={textStyles}>{getInitials(name)}</Text>
        </View>
      )}
      {badge && <View style={styles.badge}>{badge}</View>}
    </View>
  );
};
