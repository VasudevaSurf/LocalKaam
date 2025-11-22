import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from './EditProfileScreen.styles';
import { Header } from '../../../components/common/Header';
import { Avatar } from '../../../components/ui/Avatar';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export interface EditProfileScreenProps {
  userName: string;
  userPhone: string;
  userEmail?: string;
  userImage?: string;
  onSave: (data: { name: string; email: string }) => void;
  onChangePhoto: () => void;
  onBack: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  userName,
  userPhone,
  userEmail,
  userImage,
  onSave,
  onChangePhoto,
  onBack,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail || '');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    onSave({ name: name.trim(), email: email.trim() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={onBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <Avatar
            source={userImage ? { uri: userImage } : undefined}
            name={name}
            size="xl"
          />
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={onChangePhoto}
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
            value={userPhone}
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
