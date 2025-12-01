import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './LocationSetupScreen.styles';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Header } from '../../../components/common/Header';
import { useAuth } from '../../../context/AuthContext';

type LocationSetupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LocationSetup'
>;

// Define a specific route prop since we are passing params
type LocationSetupScreenRouteProp = RouteProp<
  { LocationSetup: { name: string; bio: string; profileImage?: string } },
  'LocationSetup'
>;

export const LocationSetupScreen: React.FC = () => {
  const navigation = useNavigation<LocationSetupScreenNavigationProp>();
  const route = useRoute<LocationSetupScreenRouteProp>();
  const { name, bio, profileImage } = route.params || {};
  const { updateUser, uploadUserImage, user } = useAuth();

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

  const handleContinue = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return;
    }
    if (!area.trim()) {
      Alert.alert('Error', 'Please enter your area');
      return;
    }

    setLoading(true);
    try {
      // 1. Upload Profile Image if exists
      let profileImageUrl = profileImage;
      if (profileImage && !profileImage.startsWith('http')) {
        // It's a local URI, upload it
        const uploadResult = await uploadUserImage(profileImage);
        if (uploadResult) {
          profileImageUrl = uploadResult;
        } else {
          // Upload failed, maybe show a warning but proceed
          console.log('Image upload failed, proceeding with profile update');
        }
      }

      // 2. Update User Profile with all data
      const profileData = {
        name,
        bio,
        city: { name: city, state: 'Punjab' }, // Hardcoded state for now or derive
        profileImage: profileImageUrl,
        userType: 'customer',
      };

      const success = await updateUser(profileData);

      if (success) {
        console.log('Profile setup complete, navigating to Main');
        // Explicitly navigate to Main stack to ensure user doesn't get stuck
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' as any }],
        });
      } else {
        Alert.alert('Error', 'Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Profile Save Error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
          loading={loading && !city} // Only show loading on button if detecting
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
          title="Complete Setup"
          variant="primary"
          size="large"
          onPress={handleContinue}
          fullWidth
          loading={loading && !!city} // Show loading when saving
          disabled={!city.trim() || !area.trim()}
        />
      </View>
    </SafeAreaView>
  );
};
