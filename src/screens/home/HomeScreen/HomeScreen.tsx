import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { styles } from './HomeScreen.styles';
import { SearchBar } from '../../../components/ui/SearchBar';
import { Chip } from '../../../components/ui/Chip';
import { ServiceCard } from '../../../components/common/ServiceCard';
import { LocationPicker } from '../../../components/common/LocationPircker';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingState } from '../../../components/common/LoadingState';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';

const QUICK_CATEGORIES = [
  { id: '1', label: 'Electrician', icon: '⚡' },
  { id: '2', label: 'Plumber', icon: '🔧' },
  { id: '3', label: 'Painter', icon: '🎨' },
  { id: '4', label: 'Carpenter', icon: '🔨' },
  { id: '5', label: 'Cook', icon: '👨‍🍳' },
];

// Mock Data
const MOCK_WORKERS = [
  {
    id: '1',
    sellerName: 'Rajesh Kumar',
    sellerImage: '',
    service: 'Electrician',
    rating: 4.8,
    reviewCount: 156,
    distance: '2.5 km',
    price: '₹800/day',
    verified: true,
    online: true,
    images: ['https://picsum.photos/400/300?random=1'],
  },
  {
    id: '2',
    sellerName: 'Amit Singh',
    sellerImage: '',
    service: 'Plumber',
    rating: 4.6,
    reviewCount: 98,
    distance: '3.2 km',
    price: '₹700/day',
    verified: true,
    online: false,
    images: ['https://picsum.photos/400/300?random=2'],
  },
  {
    id: '3',
    sellerName: 'Suresh Patel',
    sellerImage: '',
    service: 'Painter',
    rating: 4.9,
    reviewCount: 203,
    distance: '1.8 km',
    price: '₹900/day',
    verified: true,
    online: true,
    images: ['https://picsum.photos/400/300?random=3'],
  },
];

export interface HomeScreenProps {
  onSearch: (query: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onWorkerPress: (workerId: string) => void;
  onLocationPress: () => void;
  onRequestService: () => void;
  onBrowseAll: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearch,
  onCategorySelect,
  onWorkerPress,
  onLocationPress,
  onRequestService,
  onBrowseAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  // Check for Active Request (Background Check)
  useEffect(() => {
    let mounted = true;

    const checkActiveRequest = async () => {
      // Small delay to ensure navigation is ready
      await new Promise(resolve => setTimeout(resolve as any, 500));

      if (user?.id && isFocused && mounted) {
        try {
          console.log('[HomeScreen] Checking for active request...');
          const request = await api.getActiveRequest(user.id);

          if (request && request._id) {
            console.log('[HomeScreen] Found active request:', request._id);
            // Verify we are not already on the screen (though unlikely given isFocused)
            navigation.navigate('ActiveRequest', { requestId: request._id });
          } else {
            console.log('[HomeScreen] No active request found');
          }
        } catch (error) {
          console.log('[HomeScreen] Check failed:', error);
        }
      }
    };

    checkActiveRequest();

    return () => {
      mounted = false;
    };
  }, [user?.id, isFocused]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    onCategorySelect(categoryId);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  if (loading) {
    return <LoadingState message="Finding workers near you..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Hello 👋</Text>
            <Text style={styles.userName}>Find Your Worker</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <LocationPicker
          location="Model Town, Ludhiana"
          onPress={onLocationPress}
          style={styles.locationPicker}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search for services..."
          showFilterButton
          onFilterPress={() => {}}
          containerStyle={styles.searchBar}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionCard, styles.requestCard]}
            onPress={onRequestService}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>📢</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Request Service</Text>
              <Text style={styles.actionSubtitle}>Get quotes from workers</Text>
            </View>
            <Text style={styles.actionChevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.browseCard]}
            onPress={onBrowseAll}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>🔍</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Browse Services</Text>
              <Text style={styles.actionSubtitle}>View all workers</Text>
            </View>
            <Text style={styles.actionChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {QUICK_CATEGORIES.map(category => (
              <Chip
                key={category.id}
                label={category.label}
                icon={<Text style={styles.chipIcon}>{category.icon}</Text>}
                selected={selectedCategory === category.id}
                onPress={() => handleCategorySelect(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Top Rated Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⭐ Top Rated Near You</Text>
            <TouchableOpacity onPress={onBrowseAll}>
              <Text style={styles.seeAll}>See All ›</Text>
            </TouchableOpacity>
          </View>
          {MOCK_WORKERS.slice(0, 2).map(worker => (
            <ServiceCard
              key={worker.id}
              {...worker}
              onPress={() => onWorkerPress(worker.id)}
              style={styles.serviceCard}
            />
          ))}
        </View>

        {/* Workers Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workers Near You</Text>
            <TouchableOpacity onPress={onBrowseAll}>
              <Text style={styles.seeAll}>See All ›</Text>
            </TouchableOpacity>
          </View>
          {MOCK_WORKERS.map(worker => (
            <ServiceCard
              key={worker.id}
              {...worker}
              onPress={() => onWorkerPress(worker.id)}
              style={styles.serviceCard}
            />
          ))}
        </View>

        {/* Empty State Example */}
        {MOCK_WORKERS.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No workers found"
            description="Try adjusting your filters or search in a different area"
            actionLabel="Browse All Services"
            onAction={onBrowseAll}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
