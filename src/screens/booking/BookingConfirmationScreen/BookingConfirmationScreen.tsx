import React, { useState } from 'react';
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
import { styles } from './BookingConfirmationScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Divider } from '../../../components/common/Divider';
import { spacing } from '../../../theme';

const SCHEDULE_OPTIONS = [
  { id: 'asap', label: 'ASAP', subtitle: 'Within 2 hours' },
  { id: 'today', label: 'Today', subtitle: 'Later today' },
  { id: 'tomorrow', label: 'Tomorrow', subtitle: 'Next day' },
  { id: 'custom', label: 'Pick Date', subtitle: 'Choose date & time' },
];

type BookingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BookingConfirmation'
>;

type BookingConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  'BookingConfirmation'
>;

export const BookingConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<BookingConfirmationScreenNavigationProp>();
  const route = useRoute<BookingConfirmationScreenRouteProp>();
  const { workerId, workerName, service, basePrice } = route.params;
  const workerImage = undefined; // Or pass from params if available

  const [selectedSchedule, setSelectedSchedule] = useState('asap');
  const [location, setLocation] = useState('Model Town, Ludhiana');
  const [description, setDescription] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('1');
  const [notes, setNotes] = useState('');

  const calculateTotal = () => {
    const pricePerDay = parseInt(basePrice.replace(/[^\d]/g, ''));
    const days = parseInt(estimatedDays) || 1;
    return pricePerDay * days;
  };

  const handleConfirm = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe the work you need');
      return;
    }

    const totalAmount = calculateTotal();
    const bookingId = 'bk_' + Date.now();

    const bookingDetails = {
      bookingId,
      workerName,
      workerPhone: '+919876543210', // Mock
      service,
      location,
      scheduledDate: new Date().toLocaleDateString(),
      scheduledTime: '10:00 AM', // Mock
      amount: totalAmount,
      otp: '1234',
      status: 'confirmed',
    };

    // TODO: Call API to create booking
    console.log('Confirming booking:', bookingDetails);

    navigation.navigate('ActiveBooking', bookingDetails);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Confirm Booking"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Worker Info Card */}
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
              <Badge label="✓ Verified" variant="success" size="small" />
            </View>
          </View>
        </Card>

        {/* Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>When do you need it?</Text>
          <View style={styles.scheduleGrid}>
            {SCHEDULE_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.scheduleCard,
                  selectedSchedule === option.id && styles.scheduleCardSelected,
                ]}
                onPress={() => setSelectedSchedule(option.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.scheduleLabel,
                    selectedSchedule === option.id &&
                      styles.scheduleLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.scheduleSubtitle,
                    selectedSchedule === option.id &&
                      styles.scheduleSubtitleSelected,
                  ]}
                >
                  {option.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Input
            label="Service Location"
            placeholder="Enter your address"
            value={location}
            onChangeText={setLocation}
            leftIcon={<Text style={styles.inputIcon}>📍</Text>}
            rightIcon={
              <TouchableOpacity>
                <Text style={styles.inputIcon}>🎯</Text>
              </TouchableOpacity>
            }
            required
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Input
            label="Describe the work"
            placeholder="E.g., Need complete house wiring for 2BHK..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            required
          />
        </View>

        {/* Estimated Duration */}
        <View style={styles.section}>
          <Input
            label="Estimated Duration (Days)"
            placeholder="Number of days"
            value={estimatedDays}
            onChangeText={setEstimatedDays}
            keyboardType="numeric"
            leftIcon={<Text style={styles.inputIcon}>📅</Text>}
            required
          />
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Input
            label="Additional Notes (Optional)"
            placeholder="Any special requirements or instructions..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        {/* Pricing Breakdown */}
        <Card style={styles.pricingCard}>
          <Text style={styles.sectionTitle}>Pricing Details</Text>

          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Rate per day</Text>
            <Text style={styles.pricingValue}>{basePrice}</Text>
          </View>

          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Number of days</Text>
            <Text style={styles.pricingValue}>{estimatedDays} day(s)</Text>
          </View>

          <Divider marginVertical={spacing.md} />

          <View style={styles.pricingRow}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>
              ₹{calculateTotal().toLocaleString()}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Final amount may vary based on actual work. You'll pay in cash
              after completion.
            </Text>
          </View>
        </Card>

        {/* Payment Info */}
        <Card style={styles.paymentInfoCard} elevation="none">
          <Text style={styles.paymentInfoTitle}>💰 Payment Information</Text>
          <View style={styles.paymentInfoList}>
            <View style={styles.paymentInfoItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.paymentInfoText}>
                Pay in cash after work completion
              </Text>
            </View>
            <View style={styles.paymentInfoItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.paymentInfoText}>
                Confirm payment via OTP
              </Text>
            </View>
            <View style={styles.paymentInfoItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.paymentInfoText}>
                100% secure and verified
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <View>
            <Text style={styles.footerLabel}>Estimated Total</Text>
            <Text style={styles.footerPrice}>
              ₹{calculateTotal().toLocaleString()}
            </Text>
          </View>
          <Button
            title="Confirm Booking"
            variant="primary"
            size="large"
            onPress={handleConfirm}
            style={styles.confirmButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
