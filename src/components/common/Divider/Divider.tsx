import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './Divider.styles';

export interface DividerProps {
  text?: string;
  style?: ViewStyle;
  marginVertical?: number;
}

export const Divider: React.FC<DividerProps> = ({
  text,
  style,
  marginVertical,
}) => {
  if (text) {
    return (
      <View style={[styles.containerWithText, { marginVertical }, style]}>
        <View style={styles.line} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return <View style={[styles.divider, { marginVertical }, style]} />;
};
