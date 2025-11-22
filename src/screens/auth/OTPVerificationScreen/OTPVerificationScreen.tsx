import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from './OTPVerificationScreen.styles';
import { Button } from '../../../components/ui/Button';

export interface OTPVerificationScreenProps {
  phoneNumber: string;
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
  onBack: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  phoneNumber,
  onVerifyOTP,
  onResendOTP,
  onBack,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Pasted multiple digits
      const digits = value.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);

      // Focus last filled input
      const lastIndex = Math.min(index + digits.length, 5);
      inputRefs.current[lastIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onVerifyOTP(otpString);
    }, 1000);
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      onResendOTP();
    }
  };

  const isOTPComplete = otp.every(digit => digit !== '');

  const formatPhoneNumber = (phone: string) => {
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📱</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to{'\n'}
          <Text style={styles.phoneNumber}>
            {formatPhoneNumber(phoneNumber)}
          </Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.otpSection}>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[styles.otpInput, digit && styles.otpInputFilled]}
                value={digit}
                onChangeText={value => handleOTPChange(value, index)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
        </View>

        {/* Resend OTP */}
        <View style={styles.resendSection}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend OTP in <Text style={styles.timerCount}>{timer}s</Text>
            </Text>
          )}
        </View>

        {/* Help Text */}
        <View style={styles.helpSection}>
          <Text style={styles.helpIcon}>💡</Text>
          <Text style={styles.helpText}>
            Didn't receive the code? Check your SMS or try resending
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title="Verify & Continue"
          variant="primary"
          size="large"
          onPress={handleVerify}
          loading={loading}
          disabled={!isOTPComplete}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
