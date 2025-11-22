import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { styles } from './LocationSetupScreen.styles';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Header } from '../../../components/common/Header';

export interface LocationSetupScreenProps {
  onComplete: (location: { city: string; area: string }) => void;
}

export const LocationSetupScreen: React.FC<LocationSetupScreenProps> = ({
  onComplete,
}) => {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDetectLocation = () => {
    setLoading(true);
    // Simulate GPS detection
    setTimeout(() => {
      setCity('Ludhiana');
      setArea('Model Town');
      setLoading(false);
    }, 1500);
  };

  const handleContinue = () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return;
    }
    if (!area.trim()) {
      Alert.alert('Error', 'Please enter your area');
      return;
    }
    onComplete({ city, area });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Set Your Location"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>

        {/* Title & Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Where are you located?</Text>
          <Text style={styles.description}>
            We'll show you workers available in your area
          </Text>
        </View>

        {/* Auto Detect Button */}
        <Button
          title="📍 Detect My Location"
          variant="outline"
          size="large"
          onPress={handleDetectLocation}
          loading={loading}
          fullWidth
          style={styles.detectButton}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Manual Entry */}
        <View style={styles.inputsContainer}>
          <Input
            label="City"
            placeholder="Enter your city"
            value={city}
            onChangeText={setCity}
            required
          />

          <Input
            label="Area / Locality"
            placeholder="Enter your area"
            value={area}
            onChangeText={setArea}
            required
          />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Your location helps us show you the most relevant workers near you.
            You can change this anytime.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          variant="primary"
          size="large"
          onPress={handleContinue}
          fullWidth
          disabled={!city.trim() || !area.trim()}
        />
      </View>
    </SafeAreaView>
  );
};
