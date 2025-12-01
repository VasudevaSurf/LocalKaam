import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './EditProfileScreen.styles';
import { Header } from '../../../components/common/Header';
import { Avatar } from '../../../components/ui/Avatar';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      await updateProfile({ name: name.trim(), email: email.trim() });
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangePhoto = () => {
    Alert.alert('Coming Soon', 'Photo upload coming soon');
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
            source={user?.profileImage ? { uri: user.profileImage } : undefined}
            name={name}
            size="xl"
          />
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handleChangePhoto}
          >
            <Text style={styles.changePhotoText}>Change Photo</Text>
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
          title="Save Changes"
          variant="primary"
          size="large"
          onPress={handleSave}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
