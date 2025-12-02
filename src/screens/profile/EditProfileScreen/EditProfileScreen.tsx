import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { styles } from './EditProfileScreen.styles';
import { Header } from '../../../components/common/Header';
import { Avatar } from '../../../components/ui/Avatar';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile, uploadUserImage } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }

        const asset = response.assets?.[0];
        if (!asset?.uri) {
          Alert.alert('Error', 'No image selected');
          return;
        }

        try {
          setIsUploading(true);
          console.log('[EditProfile] Uploading image:', asset.uri);

          // Upload to Firebase Storage
          const imageUrl = await uploadUserImage(asset.uri);

          if (imageUrl) {
            setProfileImage(imageUrl);
            Alert.alert('Success', 'Photo uploaded successfully');
          } else {
            Alert.alert('Error', 'Failed to upload photo');
          }
        } catch (error) {
          console.error('[EditProfile] Error uploading image:', error);
          Alert.alert('Error', 'Failed to upload photo');
        } finally {
          setIsUploading(false);
        }
      },
    );
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      setIsSaving(true);
      const updateData: any = {
        name: name.trim(),
      };

      if (email.trim()) {
        updateData.email = email.trim();
      }

      if (profileImage && profileImage !== user?.profileImage) {
        updateData.profileImage = profileImage;
      }

      const success = await updateProfile(updateData);

      if (success) {
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('[EditProfile] Error saving:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <Avatar
            source={profileImage ? { uri: profileImage } : undefined}
            name={name}
            size="xl"
          />
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handleChangePhoto}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.changePhotoText}>Change Photo</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            required
          />

          <Input
            label="Phone Number"
            placeholder="Phone number"
            value={user?.phoneNumber || ''}
            editable={false}
            leftIcon={<Text style={styles.inputIcon}>📞</Text>}
            containerStyle={styles.disabledInput}
          />
          <Text style={styles.helperText}>Phone number cannot be changed</Text>

          <Input
            label="Email Address (Optional)"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Text style={styles.inputIcon}>📧</Text>}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title={isSaving ? 'Saving...' : 'Save Changes'}
          variant="primary"
          size="large"
          onPress={handleSave}
          fullWidth
          disabled={isSaving || isUploading}
        />
      </View>
    </SafeAreaView>
  );
};
