import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../../../context/AuthContext';
import { RootStackParamList } from '../../../navigation/types';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { colors } from '../../../theme';

type CustomerProfileSetupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, // Changed to RootStackParamList
  'CustomerProfileSetup'
>;

export const CustomerProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<CustomerProfileSetupScreenNavigationProp>();
  const { user, updateProfile } = useAuth();
  const phoneNumber = user?.phoneNumber || '';

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState<string | undefined>(
    user?.profileImage,
  );

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.assets && result.assets[0]?.uri) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      // Update profile in context/backend
      // This will trigger AppNavigator to switch to LocationSetupScreen automatically
      await updateProfile({
        name,
        bio,
        profileImage,
      });
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Tell us a bit about yourself to get started
        </Text>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imageWrapper}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>📷</Text>
              </View>
            )}
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Add Profile Photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            required
          />

          <Input
            label="Bio (Optional)"
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            style={styles.bioInput}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!name.trim() || loading}
          loading={loading}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderText: {
    fontSize: 40,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  editIcon: {
    fontSize: 16,
    color: colors.white,
  },
  imageLabel: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  form: {
    gap: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
