import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {styles} from './PhoneNumberScreen.styles';
import {Input} from '../../../components/ui/Input';
import {Button} from '../../../components/ui/Button';

export interface PhoneNumberScreenProps {
  onSendOTP: (phoneNumber: string) => void;
}

export const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({
  onSendOTP,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    // Validate phone number
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSendOTP(phoneNumber);
    }, 1000);
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
        style={styles.keyboardView}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          {/* Logo/Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔧</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Welcome to SkillProof</Text>
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