// ... Imports
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  PermissionsAndroid,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import DatePicker from 'react-native-date-picker';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './RequestServiceScreen.styles';
import { Header } from '../../../components/common/Header';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Chip } from '../../../components/ui/Chip';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';

// ... Constants
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

const { width } = Dimensions.get('window');
const ASPECT_RATIO = width / 350; // Based on map height
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Custom Debounce Hook
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

type RequestServiceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RequestService'
>;

export const RequestServiceScreen: React.FC = () => {
  const navigation = useNavigation<RequestServiceScreenNavigationProp>();
  const { user } = useAuth();

  // Service Request State
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('asap');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map & Location State
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 20.5937, // Default India
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [centerCoord, setCenterCoord] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const debouncedCenter = useDebounce(centerCoord, 800);
  const [detecting, setDetecting] = useState(false);

  // Schedule State
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  // Detailed Address State
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const isSelectionRef = useRef(false);

  // --- Effects ---

  // 1. Initial Location (Current or User Profile)
  useEffect(() => {
    if (user?.location?.coordinates) {
      // If user has saved location, start there
      const { lat, lng } = user.location.coordinates;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      // Pre-fill fields
      if (user.location.address) setFormattedAddress(user.location.address);
      if (user.location.city) setCity(user.location.city);
      // We don't necessarily update centerCoord immediately to avoid re-fetch,
      // but user can move it.
    } else {
      requestLocationPermission();
    }
  }, []);

  // 2. Fetch Address on Map Move
  useEffect(() => {
    if (debouncedCenter && !showPredictions && !isSelectionRef.current) {
      setAddressLoading(true);
      fetchAddress(debouncedCenter.latitude, debouncedCenter.longitude);
    }
    if (isSelectionRef.current) {
      setTimeout(() => {
        isSelectionRef.current = false;
      }, 1000);
    }
  }, [debouncedCenter]);

  // 3. Search Predictions
  useEffect(() => {
    if (isSelectionRef.current) {
      setShowPredictions(false);
      return;
    }
    if (debouncedSearch && debouncedSearch.length > 2) {
      fetchPredictions(debouncedSearch);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [debouncedSearch]);

  const fetchPredictions = async (query: string) => {
    if (isSelectionRef.current) return;
    const results = await api.searchPlaces(query);
    if (!isSelectionRef.current) {
      setPredictions(results);
      setShowPredictions(true);
    }
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const data = await api.reverseGeocode(lat, lng);
      // Backend returns: formattedAddress, city, state, area, pincode
      if (data) {
        setFormattedAddress(data.formattedAddress || '');
        setCity(data.city || '');
        setState(data.state || '');
        setArea(data.area || '');
        setPincode(data.pincode || '');
      }
    } catch (error) {
      console.error('Reverse Geocode Error', error);
    } finally {
      setAddressLoading(false);
    }
  };

  const handlePredictionPress = async (
    placeId: string,
    description: string,
  ) => {
    isSelectionRef.current = true;
    setSearchQuery(description);
    setShowPredictions(false);
    setPredictions([]);
    setAddressLoading(true);

    try {
      const details = await api.getPlaceDetails(placeId);

      if (details && details.lat && details.lng) {
        setCity(details.city || '');
        setState(details.state || '');
        setArea(details.area || '');
        setPincode(details.pincode || '');
        setFormattedAddress(details.formattedAddress || description);

        const { lat, lng } = details;

        // Failsafe if details missing
        if (!details.city && !details.pincode) {
          fetchAddress(lat, lng);
        }

        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        setCenterCoord({ latitude: lat, longitude: lng });
      } else {
        Alert.alert('Error', 'Could not fetch location.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load location.');
    } finally {
      setAddressLoading(false);
      setTimeout(() => {
        isSelectionRef.current = false;
      }, 2000);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    setDetecting(true);
    isSelectionRef.current = false;
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        setDetecting(false);
      },
      error => {
        setDetecting(false);
        // Alert.alert('Error', 'Could not detect location.');
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setCenterCoord({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

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
    if (!formattedAddress || !city) {
      Alert.alert('Error', 'Please select a valid location');
      return;
    }

    const serviceName =
      SERVICE_TYPES.find(s => s.id === selectedService)?.label || '';
    const fullAddress = `${houseNo ? houseNo + ', ' : ''}${formattedAddress}`;

    try {
      setIsSubmitting(true);

      const requestData = {
        serviceType: serviceName,
        description: description.trim(),
        // Enhanced Location Object
        location: {
          address: fullAddress,
          city,
          area: area || city,
          state: state || 'Punjab',
          pincode,
          coordinates: centerCoord
            ? { lat: centerCoord.latitude, lng: centerCoord.longitude }
            : undefined,
        },
        budget: parseFloat(budget),
        urgency: selectedUrgency,
        scheduledDate: selectedUrgency === 'scheduled' ? scheduledDate : null,
        customerId: user?.id,
        customerPhone: user?.phoneNumber,
        customerName: user?.name,
      };

      const createdRequest = await api.createServiceRequest(requestData);

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

  const onPanDrag = () => {
    isSelectionRef.current = false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* MAP SECTION */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={onRegionChangeComplete}
            onPanDrag={onPanDrag}
            showsUserLocation={false}
          />

          {/* Header Overlay */}
          <View style={styles.headerOverlay}>
            <Header
              title="Request Service"
              leftIcon={<Text style={styles.backIcon}>←</Text>}
              onLeftPress={() => navigation.goBack()}
              transparent
            />
          </View>

          {/* Search Bar Overlay */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Text style={{ marginRight: 8 }}>🔍</Text>
              <TextInput
                placeholder="Search area..."
                value={searchQuery}
                onChangeText={text => {
                  isSelectionRef.current = false;
                  setSearchQuery(text);
                  if (text.length === 0) setShowPredictions(false);
                }}
                style={styles.searchInput}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={{ color: '#999' }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Predictions List */}
            {showPredictions && predictions.length > 0 && (
              <View style={styles.predictionsList}>
                <FlatList
                  data={predictions}
                  keyExtractor={item => item.place_id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.predictionItem}
                      onPress={() =>
                        handlePredictionPress(item.place_id, item.description)
                      }
                    >
                      <Text style={styles.predictionText}>
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="always"
                />
              </View>
            )}
          </View>

          {/* Center Marker */}
          <View style={styles.markerFixed}>
            <Text style={{ fontSize: 40, marginBottom: 40 }}>📍</Text>
          </View>

          {/* Detect Button */}
          <TouchableOpacity
            style={styles.detectButton}
            onPress={getCurrentLocation}
            disabled={detecting}
          >
            <Text style={styles.detectButtonText}>
              {detecting ? 'Locating...' : '🎯 Detect'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Detailed Address Form */}
          <View style={styles.section}>
            <Text style={[styles.label, { marginBottom: 10 }]}>
              Confirm Location
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                Formatted Address
              </Text>
              <Text style={{ fontSize: 14, color: '#333' }}>
                {formattedAddress || 'Move pin to select location'}
              </Text>
            </View>

            <Input
              label="House No / Landmark"
              placeholder="e.g. #42, Near Park"
              value={houseNo}
              onChangeText={setHouseNo}
              editable={!addressLoading}
            />

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 0 }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Area"
                  value={addressLoading ? '...' : area}
                  onChangeText={setArea}
                  editable={!addressLoading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="City"
                  value={addressLoading ? '...' : city}
                  editable={false} // Auto-filled
                  style={{ backgroundColor: '#F0F0F0', color: '#666' }}
                />
              </View>
            </View>
          </View>

          {/* Service Type */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Service Type <Text style={styles.required}>*</Text>
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
              label="Description"
              placeholder="What needs to be done?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.textArea}
              required
            />
          </View>

          {/* Budget */}
          <View style={styles.section}>
            <Input
              label="Your Budget (₹)"
              placeholder="e.g. 500"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              required
            />
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
                  onPress={() => {
                    setSelectedUrgency(option.id);
                    if (option.id === 'scheduled') {
                      setOpenDatePicker(true);
                    }
                  }}
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

            {/* Selected Schedule Display */}
            {selectedUrgency === 'scheduled' && (
              <TouchableOpacity
                style={styles.dateDisplay}
                onPress={() => setOpenDatePicker(true)}
              >
                <Text style={styles.dateDisplayText}>
                  📅{' '}
                  {scheduledDate.toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </Text>
                <Text style={styles.changeDateText}>Change</Text>
              </TouchableOpacity>
            )}

            <DatePicker
              modal
              open={openDatePicker}
              date={scheduledDate}
              onConfirm={date => {
                setOpenDatePicker(false);
                setScheduledDate(date);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
                // If cancelling on first open, maybe revert to 'asap'? No, keep 'scheduled' but default date is fine.
              }}
              minimumDate={new Date()} // Can't book in past
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={isSubmitting ? 'Posting...' : 'Post Request'}
            variant="primary"
            size="large"
            onPress={handleSubmit}
            fullWidth
            disabled={isSubmitting}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
