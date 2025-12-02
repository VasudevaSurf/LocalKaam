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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './RequestServiceScreen.styles';
import { Header } from '../../../components/common/Header';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Chip } from '../../../components/ui/Chip';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';

const SERVICE_TYPES = [
  { id: '1', label: 'Electrician', icon: '⚡' },
  { id: '2', label: 'Plumber', icon: '🔧' },
  { id: '3', label: 'Painter', icon: '🎨' },
  { id: '4', label: 'Carpenter', icon: '🔨' },
  { id: '5', label: 'Cook', icon: '👨‍🍳' },
  { id: '6', label: 'Mechanic', icon: '🚗' },
  { id: '7', label: 'Cleaner', icon: '🧹' },
  { id: '8', label: 'Other', icon: '🔧' },
];

const URGENCY_OPTIONS = [
  { id: 'asap', label: 'ASAP', subtitle: 'Within 1-2 hours' },
  { id: 'today', label: 'Today', subtitle: 'Within today' },
  { id: 'tomorrow', label: 'Tomorrow', subtitle: 'Next day' },
  { id: 'scheduled', label: 'Schedule', subtitle: 'Pick a date' },
];

type RequestServiceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RequestService'
>;

export const RequestServiceScreen: React.FC = () => {
  const navigation = useNavigation<RequestServiceScreenNavigationProp>();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Model Town, Ludhiana');
  const [budget, setBudget] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('asap');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedService) {
      Alert.alert('Error', 'Please select a service type');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe what you need');
      return;
    }
    if (!budget.trim()) {
      Alert.alert('Error', 'Please enter your budget');
      return;
    }

    const serviceName =
      SERVICE_TYPES.find(s => s.id === selectedService)?.label || '';

    try {
      setIsSubmitting(true);

      const requestData = {
        serviceType: serviceName,
        description: description.trim(),
        location,
        budget: parseFloat(budget),
        urgency: selectedUrgency,
        customerId: user?.id,
        customerPhone: user?.phoneNumber,
        customerName: user?.name,
      };

      console.log('[RequestService] Submitting request:', requestData);

      const createdRequest = await api.createServiceRequest(requestData);

      console.log('[RequestService] Request created:', createdRequest);

      Alert.alert(
        'Success!',
        'Your service request has been posted. Workers will send you quotes soon.',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('ActiveRequest', {
                requestId: createdRequest._id,
              }),
          },
        ],
      );
    } catch (error: any) {
      console.error('[RequestService] Error creating request:', error);
      Alert.alert(
        'Error',
        error.response?.data?.msg ||
          'Failed to create service request. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceName =
    SERVICE_TYPES.find(s => s.id === selectedService)?.label || '';

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Request a Service"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Info Card */}
        <Card style={styles.infoCard} elevation="none">
          <Text style={styles.infoIcon}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How it works</Text>
            <Text style={styles.infoText}>
              Post your request and workers will send you quotes. Compare and
              choose the best one!
            </Text>
          </View>
        </Card>

        {/* Service Type */}
        <View style={styles.section}>
          <Text style={styles.label}>
            What service do you need? <Text style={styles.required}>*</Text>
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {SERVICE_TYPES.map(service => (
              <Chip
                key={service.id}
                label={service.label}
                icon={<Text style={styles.chipIcon}>{service.icon}</Text>}
                selected={selectedService === service.id}
                onPress={() => setSelectedService(service.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Input
            label="Describe what you need"
            placeholder="E.g., Need house wiring for 2BHK apartment..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            required
          />
          <Text style={styles.helper}>Be specific to get accurate quotes</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Input
            label="Service Location"
            placeholder="Enter location"
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

        {/* Budget */}
        <View style={styles.section}>
          <Input
            label="Your Budget"
            placeholder="E.g., 800"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            leftIcon={<Text style={styles.inputIcon}>₹</Text>}
            required
          />
          <Text style={styles.helper}>
            Workers will quote based on your budget
          </Text>
        </View>

        {/* Urgency */}
        <View style={styles.section}>
          <Text style={styles.label}>When do you need it?</Text>
          <View style={styles.urgencyGrid}>
            {URGENCY_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.urgencyCard,
                  selectedUrgency === option.id && styles.urgencyCardSelected,
                ]}
                onPress={() => setSelectedUrgency(option.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.urgencyLabel,
                    selectedUrgency === option.id &&
                      styles.urgencyLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.urgencySubtitle,
                    selectedUrgency === option.id &&
                      styles.urgencySubtitleSelected,
                  ]}
                >
                  {option.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary Card */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Request Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service:</Text>
            <Text style={styles.summaryValue}>
              {serviceName || 'Not selected'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget:</Text>
            <Text style={styles.summaryValue}>
              {budget ? `₹${budget}` : 'Not set'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Location:</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title={
            isSubmitting ? 'Posting Request...' : 'Post Request & Get Quotes'
          }
          variant="primary"
          size="large"
          onPress={handleSubmit}
          fullWidth
          disabled={isSubmitting}
        />
        <Text style={styles.footerNote}>
          Free to post • Get multiple quotes
        </Text>
      </View>
    </SafeAreaView>
  );
};
