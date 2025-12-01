import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { styles } from './PhoneNumberScreen.styles';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

type PhoneNumberScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'PhoneNumber'
>;

export const PhoneNumberScreen: React.FC = () => {
  const navigation = useNavigation<PhoneNumberScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    // Validate phone number
    if (phoneNumber.length !== 10) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit mobile number',
      );
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = `+91${phoneNumber}`;
      console.log('Sending OTP to:', formattedPhone);

      // Add 60s timeout to prevent infinite loading
      const confirmation = await Promise.race([
        signInWithPhoneNumber(getAuth(), formattedPhone),
        new Promise<any>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error('Request timed out. Please check your connection.'),
              ),
            60000,
          ),
        ),
      ]);

      setLoading(false);
      navigation.navigate('OTPVerification', { phoneNumber, confirmation });
    } catch (error: any) {
      setLoading(false);
      console.error('Error sending OTP:', error);

      let errorMessage = 'Failed to send OTP. Please try again.';

      if (error.message?.includes('timeout')) {
        errorMessage =
          'Request timed out. Please add SHA-1 fingerprint to Firebase Console (see guide).';
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'The phone number is invalid.';
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'SMS quota exceeded. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      setTimeout(() => {
        Alert.alert('Error', errorMessage);
      }, 500);
    }
  };

  const handlePhoneChange = (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔧</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Welcome to LocalKaam</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to get started
          </Text>

          {/* Phone Input */}
          <View style={styles.inputSection}>
            <Input
              label="Mobile Number"
              placeholder="Enter 10-digit mobile number"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={10}
              leftIcon={<Text style={styles.countryCode}>+91</Text>}
              required
            />
            <Text style={styles.helperText}>
              We'll send you a verification code
            </Text>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.footer}>
          <Button
            title="Send OTP"
            variant="primary"
            size="large"
            onPress={handleSendOTP}
            loading={loading}
            disabled={phoneNumber.length !== 10}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
