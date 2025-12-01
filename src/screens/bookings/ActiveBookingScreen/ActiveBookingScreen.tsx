import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './ActiveBookingScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Divider } from '../../../components/common/Divider';
import { colors } from '../../../theme';
import { Linking } from 'react-native';

type ActiveBookingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ActiveBooking'
>;

type ActiveBookingScreenRouteProp = RouteProp<
  RootStackParamList,
  'ActiveBooking'
>;

export const ActiveBookingScreen: React.FC = () => {
  const navigation = useNavigation<ActiveBookingScreenNavigationProp>();
  const route = useRoute<ActiveBookingScreenRouteProp>();
  const {
    bookingId,
    workerName,
    workerPhone,
    service,
    location,
    scheduledDate,
    scheduledTime,
    amount,
    otp,
    status,
  } = route.params;

  const workerImage = undefined; // Or pass from params

  const handleCall = () => {
    Linking.openURL(`tel:${workerPhone}`);
  };

  const handleChat = () => {
    console.log('Navigate to chat');
    // navigation.navigate('Chat', { userId: workerId });
  };

  // const handleCancelBooking = () => {
  //   // API call
  //   console.log('Cancelling booking', bookingId);
  //   navigation.goBack();
  // };

  const handleCompletePayment = () => {
    navigation.navigate('PaymentSuccess', {
      amount: amount.toString(),
      transactionId: 'tx_' + Date.now(),
      date: new Date().toLocaleDateString(),
      recipientName: workerName,
      recipientId: 'worker_123', // Mock
    });
  };
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'confirmed':
        return {
          icon: '✅',
          title: 'Booking Confirmed',
          subtitle: 'Worker will arrive soon',
          color: colors.success,
        };
      case 'worker_on_way':
        return {
          icon: '🚗',
          title: 'Worker is on the way',
          subtitle: 'Expected arrival in 10 mins',
          color: colors.warning,
        };
      case 'in_progress':
        return {
          icon: '⚡',
          title: 'Work in Progress',
          subtitle: `Started ${formatTime(timer)} ago`,
          color: colors.primary,
        };
      case 'payment_pending':
        return {
          icon: '💰',
          title: 'Payment Pending',
          subtitle: 'Work completed, please confirm payment',
          color: colors.error,
        };
      default:
        return {
          icon: '⏳',
          title: 'Processing',
          subtitle: 'Please wait',
          color: colors.gray[500],
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: onCancelBooking,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Active Booking"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Banner */}
        <Card
          style={[
            styles.statusBanner,
            { backgroundColor: statusInfo.color + '15' },
          ]}
          elevation="none"
        >
          <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
          <View style={styles.statusContent}>
            <Text style={[styles.statusTitle, { color: statusInfo.color }]}>
              {statusInfo.title}
            </Text>
            <Text style={styles.statusSubtitle}>{statusInfo.subtitle}</Text>
          </View>
        </Card>

        {/* OTP Card - ALWAYS VISIBLE (Like Rapido) */}
        <Card style={styles.otpCard} elevation="lg">
          <View style={styles.otpHeader}>
            <Text style={styles.otpLabel}>Share this OTP with Worker</Text>
            <Badge label="Security Code" variant="primary" size="small" />
          </View>

          <View style={styles.otpDisplay}>
            {otp.split('').map((digit, index) => (
              <View key={index} style={styles.otpDigit}>
                <Text style={styles.otpDigitText}>{digit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.otpInfo}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.otpInfoText}>
              Worker needs to enter this OTP in their app to confirm completion
            </Text>
          </View>
        </Card>

        {/* Worker Info */}
        <Card style={styles.workerCard}>
          <View style={styles.workerHeader}>
            <Avatar
              source={workerImage ? { uri: workerImage } : undefined}
              name={workerName}
              size="lg"
              badge={<View style={styles.onlineBadge} />}
            />
            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{workerName}</Text>
              <Text style={styles.workerService}>{service}</Text>
              <View style={styles.workerMeta}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.rating}>4.8</Text>
                <Text style={styles.reviews}>(156 reviews)</Text>
              </View>
            </View>
          </View>

          <Divider marginVertical={spacing.lg} />

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <Button
              title="📞 Call"
              variant="outline"
              size="medium"
              onPress={handleCall}
              style={styles.contactButton}
            />
            <Button
              title="💬 Chat"
              variant="outline"
              size="medium"
              onPress={handleChat}
              style={styles.contactButton}
            />
          </View>
        </Card>

        {/* Booking Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Booking Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🆔</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>#{bookingId}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>
                {scheduledDate} • {scheduledTime}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={[styles.detailValue, styles.amountText]}>
                ₹{amount.toLocaleString()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Payment Instructions */}
        {status === 'in_progress' && (
          <Card style={styles.instructionsCard} elevation="none">
            <Text style={styles.instructionsTitle}>
              📋 Payment Instructions
            </Text>
            <View style={styles.instructionsList}>
              <View style={styles.instructionItem}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.instructionText}>
                  After work is completed, pay ₹{amount.toLocaleString()} in
                  cash to the worker
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.instructionText}>
                  Share the OTP code shown above with the worker
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.instructionText}>
                  Worker will enter the OTP in their app to confirm payment
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Payment Pending Actions */}
        {status === 'payment_pending' && (
          <View style={styles.paymentActions}>
            <Text style={styles.paymentPendingText}>
              Worker has completed the work. Please pay ₹
              {amount.toLocaleString()} in cash and share the OTP.
            </Text>
            <Button
              title="I Have Paid in Cash"
              variant="primary"
              size="large"
              onPress={handleCompletePayment}
              fullWidth
            />
          </View>
        )}

        {/* Cancel Button (Only for confirmed/on_way status) */}
        {(status === 'confirmed' || status === 'worker_on_way') && (
          <Button
            title="Cancel Booking"
            variant="ghost"
            size="medium"
            onPress={() => {
              Alert.alert(
                'Cancel Booking',
                'Are you sure you want to cancel this booking?',
                [
                  { text: 'No', style: 'cancel' },
                  {
                    text: 'Yes, Cancel',
                    style: 'destructive',
                    onPress: handleCancelBooking,
                  },
                ],
              );
            }}
            style={styles.cancelButton}
          />
        )}

        {/* Support */}
        <Card style={styles.supportCard} elevation="none">
          <Text style={styles.supportIcon}>🆘</Text>
          <View style={styles.supportContent}>
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportText}>
              Contact our support team if you face any issues
            </Text>
          </View>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Get Help →</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
