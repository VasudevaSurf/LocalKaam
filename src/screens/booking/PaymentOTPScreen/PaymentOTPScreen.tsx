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
import { styles } from './PaymentOTPScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { Divider } from '../../../components/common/Divider';
import { spacing } from '../../../theme';

export interface PaymentOTPScreenProps {
  bookingId: string;
  workerName: string;
  workerImage?: string;
  service: string;
  amount: number;
  workerPhone: string;
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
  onBack: () => void;
}

export const PaymentOTPScreen: React.FC<PaymentOTPScreenProps> = ({
  bookingId,
  workerName,
  workerImage,
  service,
  amount,
  workerPhone,
  onVerifyOTP,
  onResendOTP,
  onBack,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

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
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }
    onVerifyOTP(otpString);
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      onResendOTP();
    }
  };

  const isOTPComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Payment Confirmation"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={onBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔐</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Enter OTP from Worker</Text>
        <Text style={styles.subtitle}>
          The worker will receive this OTP on their phone. Ask them to share it
          with you.
        </Text>

        {/* Worker Info */}
        <Card style={styles.workerCard}>
          <View style={styles.workerHeader}>
            <Avatar
              source={workerImage ? { uri: workerImage } : undefined}
              name={workerName}
              size="md"
            />
            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{workerName}</Text>
              <Text style={styles.workerService}>{service}</Text>
            </View>
          </View>

          <Divider marginVertical={spacing.lg} />

          <View style={styles.paymentDetails}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Amount to Pay</Text>
              <Text style={styles.paymentAmount}>
                ₹{amount.toLocaleString()}
              </Text>
            </View>
            <Text style={styles.paymentNote}>Pay in cash to worker</Text>
          </View>
        </Card>

        {/* OTP Input */}
        <View style={styles.otpSection}>
          <Text style={styles.otpLabel}>Enter 6-Digit OTP</Text>
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
                autoFocus={index === 0}
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
            <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
          )}
        </View>

        {/* Instructions */}
        <Card style={styles.instructionsCard} elevation="none">
          <Text style={styles.instructionsTitle}>📋 Instructions</Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.instructionText}>
                Pay ₹{amount.toLocaleString()} in cash to {workerName}
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.instructionText}>
                Worker will receive OTP on their phone (+91-{workerPhone})
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.instructionText}>
                Ask worker to tell you the OTP verbally
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.instructionText}>
                Enter the OTP above to confirm payment
              </Text>
            </View>
          </View>
        </Card>

        {/* Warning */}
        <Card style={styles.warningCard} elevation="none">
          <Text style={styles.warningIcon}>⚠️</Text>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Important</Text>
            <Text style={styles.warningText}>
              Only enter OTP after you have paid cash to the worker. This OTP
              confirms your payment.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title="Verify & Confirm Payment"
          variant="primary"
          size="large"
          onPress={handleVerify}
          disabled={!isOTPComplete}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
