import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Platform,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { RootStackParamList } from '../../../navigation/types';
import { styles } from './LocationSetupScreen.styles';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Header } from '../../../components/common/Header';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';
import { colors as COLORS } from '../../../theme';

type LocationSetupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LocationSetup'
>;

type LocationSetupScreenRouteProp = RouteProp<
  { LocationSetup: { name: string; bio: string; profileImage?: string } },
  'LocationSetup'
>;

const { width } = Dimensions.get('window');
const ASPECT_RATIO = width / (width * 1.2);
const LATITUDE_DELTA = 0.005; // Closer zoom for precision
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

export const LocationSetupScreen: React.FC = () => {
  const navigation = useNavigation<LocationSetupScreenNavigationProp>();
  const route = useRoute<LocationSetupScreenRouteProp>();
  const { name, bio, profileImage } = route.params || {};
  const { updateUser, uploadUserImage } = useAuth();

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  // Detailed Address State
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  const [loading, setLoading] = useState(false); // For Save button
  const [addressLoading, setAddressLoading] = useState(false); // For Address Fetch
  const [detecting, setDetecting] = useState(false); // For "Detect Location"

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const isSelectionRef = useRef(false); // Track if query update is from selection

  // Map Center Tracking
  const [centerCoord, setCenterCoord] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const debouncedCenter = useDebounce(centerCoord, 800);

  // Fetch Address on Map Drag Stop
  useEffect(() => {
    // Only fetch if NOT currently showing predictions (user dragging map manually)
    // AND we are NOT in a selection flow (programmatic move)
    if (debouncedCenter && !showPredictions && !isSelectionRef.current) {
      setAddressLoading(true);
      fetchAddress(debouncedCenter.latitude, debouncedCenter.longitude);
    }
  }, [debouncedCenter]);

  // Fetch Autocomplete Predictions
  useEffect(() => {
    if (isSelectionRef.current) {
      // If we just selected, ensure list is CLOSED and predictions CLEARED
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
    // Double check ref before fetching
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

  const onRegionChangeComplete = (newRegion: Region) => {
    // This fires after animateToRegion too.
    setCenterCoord({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  const onPanDrag = () => {
    // User is manually dragging, so unlock any selection lock
    isSelectionRef.current = false;
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
    isSelectionRef.current = false; // Allow updates
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
        console.error(error);
        setDetecting(false);
        Alert.alert('Error', 'Could not detect location.');
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handlePredictionPress = async (
    placeId: string,
    description: string,
  ) => {
    isSelectionRef.current = true; // Block auto-search
    setSearchQuery(description);
    setShowPredictions(false);
    setPredictions([]); // Clear predictions immediately

    setAddressLoading(true); // Show loading feedback

    try {
      const details = await api.getPlaceDetails(placeId);

      if (details && details.lat && details.lng) {
        // IMMEDIATE UPDATE with details from Place API
        setCity(details.city || '');
        setState(details.state || '');
        setArea(details.area || '');
        setPincode(details.pincode || '');
        setFormattedAddress(details.formattedAddress || description);

        const { lat, lng } = details;

        // FAILSAFE: If critical details are missing from Places API, force a Reverse Geocode
        // This handles cases where the Place result is just a point without full address components
        if (!details.city && !details.pincode) {
          console.log(
            'Incomplete place details, falling back to reverse geocode',
          );
          fetchAddress(lat, lng);
        }

        // Move the map
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
        Alert.alert('Error', 'Could not fetch location details.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load location.');
    } finally {
      setAddressLoading(false);
      // Reset selection lock after animation + buffer to allow manual drag later
      setTimeout(() => {
        isSelectionRef.current = false;
      }, 2000);
    }
  };

  const handleContinue = async () => {
    if (!city.trim() || !formattedAddress.trim()) {
      // Validating required fields
    }

    const fullAddress = `${houseNo ? houseNo + ', ' : ''}${formattedAddress}`;

    if (!city.trim()) {
      Alert.alert(
        'Required',
        'City is missing. Please select a valid location.',
      );
      return;
    }

    setLoading(true);
    try {
      let profileImageUrl = profileImage;
      if (profileImage && !profileImage.startsWith('http')) {
        profileImageUrl = await uploadUserImage(profileImage);
      }

      const profileData = {
        name,
        bio,
        profileImage: profileImageUrl,
        // New Structure
        location: {
          address: fullAddress,
          area: area || city,
          city,
          state,
          pincode,
          coordinates: centerCoord
            ? { lat: centerCoord.latitude, lng: centerCoord.longitude }
            : undefined,
        },
        // Legacy Support
        city: { name: city, state: state || 'Punjab' },
        address: fullAddress,
        userType: 'customer',
      };

      const success = await updateUser(profileData);
      if (success) {
        navigation.reset({ index: 0, routes: [{ name: 'Main' as any }] });
      } else {
        Alert.alert('Error', 'Failed to save profile.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Map Section (Top Half) */}
        <View style={{ height: '50%', width: '100%' }}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={region}
            onRegionChangeComplete={onRegionChangeComplete}
            onPanDrag={onPanDrag}
            showsUserLocation={false}
            showsMyLocationButton={false}
          />

          {/* Header */}
          <View style={localStyles.headerOverlay}>
            <Header
              title="Set Location"
              leftIcon={<Text style={styles.backIcon}>←</Text>}
              onLeftPress={() => navigation.goBack()}
              transparent
            />
          </View>

          {/* Search Bar Overlay */}
          <View style={localStyles.searchContainer}>
            <View style={localStyles.searchBox}>
              <Text style={{ marginRight: 8 }}>🔍</Text>
              <TextInput
                placeholder="Search for your area..."
                value={searchQuery}
                onChangeText={text => {
                  isSelectionRef.current = false; // User typing -> Unlock search
                  setSearchQuery(text);
                  if (text.length === 0) setShowPredictions(false);
                }}
                style={localStyles.searchInput}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={{ color: '#999' }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Predictions List */}
            {showPredictions && predictions.length > 0 && (
              <View style={localStyles.predictionsList}>
                <FlatList
                  data={predictions}
                  keyExtractor={item => item.place_id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={localStyles.predictionItem}
                      onPress={() =>
                        handlePredictionPress(item.place_id, item.description)
                      }
                    >
                      <Text style={localStyles.predictionText}>
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
          <View style={localStyles.markerFixed}>
            <Text style={{ fontSize: 40, marginBottom: 40 }}>📍</Text>
          </View>

          {/* Detect Button */}
          <TouchableOpacity
            style={localStyles.detectButton}
            onPress={getCurrentLocation}
            disabled={detecting}
          >
            <Text style={localStyles.detectButtonText}>
              {detecting ? 'Locating...' : '🎯 Detect My Location'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Address Form (Bottom Half) */}
        <View style={localStyles.formContainer}>
          <Text style={styles.title}>Confirm Address</Text>
          <Text style={[styles.description, { marginBottom: 20 }]}>
            {formattedAddress || 'Move the map pin to select a location'}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={styles.label}>House No / Building / Floor</Text>
            <TextInput
              style={styles.input}
              value={houseNo}
              onChangeText={setHouseNo}
              placeholder="e.g. #42, LocalKaam Tower"
              placeholderTextColor="#999"
              editable={!addressLoading}
            />

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Area / Sector</Text>
                <TextInput
                  style={[
                    styles.input,
                    addressLoading && {
                      opacity: 0.5,
                      backgroundColor: '#f0f0f0',
                    },
                  ]}
                  value={addressLoading ? 'Loading...' : area}
                  onChangeText={setArea}
                  placeholder="Locality"
                  placeholderTextColor="#999"
                  editable={!addressLoading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput
                  style={[
                    styles.input,
                    addressLoading && {
                      opacity: 0.5,
                      backgroundColor: '#f0f0f0',
                    },
                  ]}
                  value={addressLoading ? '...' : pincode}
                  onChangeText={setPincode}
                  placeholder="110001"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={6}
                  editable={!addressLoading}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: '#F0F0F0', color: '#666' },
                    addressLoading && { opacity: 0.5 },
                  ]}
                  value={addressLoading ? 'Loading...' : city}
                  editable={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: '#F0F0F0', color: '#666' },
                    addressLoading && { opacity: 0.5 },
                  ]}
                  value={addressLoading ? 'Loading...' : state}
                  editable={false}
                />
              </View>
            </View>

            <View style={{ marginTop: 24 }}>
              <Button
                title="Save & Continue"
                variant="primary"
                size="large"
                onPress={handleContinue}
                fullWidth
                loading={loading}
                disabled={!city || addressLoading}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 60, // Below header
    left: 16,
    right: 16,
    zIndex: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  predictionsList: {
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 8,
    elevation: 4,
    maxHeight: 200,
  },
  predictionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  predictionText: {
    color: '#333',
    fontSize: 14,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -35,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detectButtonText: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 16,
    elevation: 20,
    marginTop: -20, // Overlap map slightly
  },
});
