import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './SplashScreen.styles';

export interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🔧</Text>
        <Text style={styles.title}>SkillProof</Text>
        <Text style={styles.subtitle}>Find Skilled Workers</Text>
      </View>
      <Text style={styles.tagline}>Hire with Trust</Text>
    </View>
  );
};
