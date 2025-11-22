import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { styles } from './BrowseServicesScreen.styles';
import { Header } from '../../../components/common/Header';
import { SearchBar } from '../../../components/ui/SearchBar';
import { Chip } from '../../../components/ui/Chip';
import { ServiceCard } from '../../../components/common/ServiceCard';
import { BottomSheet } from '../../../components/common/BottomSheet';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingState } from '../../../components/common/LoadingState';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🔧' },
  { id: '1', label: 'Electrician', icon: '⚡' },
  { id: '2', label: 'Plumber', icon: '🔧' },
  { id: '3', label: 'Painter', icon: '🎨' },
  { id: '4', label: 'Carpenter', icon: '🔨' },
  { id: '5', label: 'Cook', icon: '👨‍🍳' },
];

const SORT_OPTIONS = [
  { id: 'distance', label: 'Nearest First' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'reviews', label: 'Most Reviewed' },
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
  {
    id: '4',
    sellerName: 'Vikram Sharma',
    sellerImage: '',
    service: 'Carpenter',
    rating: 4.7,
    reviewCount: 134,
    distance: '4.1 km',
    price: '₹850/day',
    verified: false,
    online: true,
    images: ['https://picsum.photos/400/300?random=4'],
  },
  {
    id: '5',
    sellerName: 'Ramesh Gupta',
    sellerImage: '',
    service: 'Electrician',
    rating: 4.5,
    reviewCount: 87,
    distance: '5.3 km',
    price: '₹750/day',
    verified: true,
    online: false,
    images: ['https://picsum.photos/400/300?random=5'],
  },
];

export interface BrowseServicesScreenProps {
  onWorkerPress: (workerId: string) => void;
  onBack: () => void;
}

export const BrowseServicesScreen: React.FC<BrowseServicesScreenProps> = ({
  onWorkerPress,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(10);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (verifiedOnly) count++;
    if (onlineOnly) count++;
    if (minRating > 0) count++;
    if (maxDistance < 10) count++;
    return count;
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    // Apply filters logic here
  };

  const handleClearFilters = () => {
    setVerifiedOnly(false);
    setOnlineOnly(false);
    setMinRating(0);
    setMaxDistance(10);
  };

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    if (
      selectedCategory !== 'all' &&
      worker.service !== CATEGORIES.find(c => c.id === selectedCategory)?.label
    ) {
      return false;
    }
    if (
      searchQuery &&
      !worker.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !worker.service.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (verifiedOnly && !worker.verified) {
      return false;
    }
    if (onlineOnly && !worker.online) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <LoadingState message="Finding workers..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Browse Services"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={onBack}
      />

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search workers or services..."
          showFilterButton
          filterCount={getActiveFilterCount()}
          onFilterPress={() => setShowFilters(true)}
        />

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => (
            <Chip
              key={category.id}
              label={category.label}
              icon={<Text style={styles.chipIcon}>{category.icon}</Text>}
              selected={selectedCategory === category.id}
              onPress={() => handleCategorySelect(category.id)}
            />
          ))}
        </ScrollView>

        {/* Results Count and Sort */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredWorkers.length} workers found
          </Text>
          <TouchableOpacity style={styles.sortButton} onPress={() => {}}>
            <Text style={styles.sortIcon}>⇅</Text>
            <Text style={styles.sortText}>
              {SORT_OPTIONS.find(s => s.id === selectedSort)?.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Workers List */}
      <FlatList
        data={filteredWorkers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            {...item}
            onPress={() => onWorkerPress(item.id)}
            style={styles.workerCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No workers found"
            description="Try adjusting your filters or search in a different area"
            actionLabel="Clear Filters"
            onAction={handleClearFilters}
          />
        }
      />

      {/* Filters Bottom Sheet */}
      <BottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        height={600}
      >
        <ScrollView
          style={styles.filtersContent}
          contentContainerStyle={styles.filtersContentContainer}
        >
          {/* Verified Only */}
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => setVerifiedOnly(!verifiedOnly)}
            activeOpacity={0.7}
          >
            <View style={styles.filterOptionLeft}>
              <Text style={styles.filterIcon}>✓</Text>
              <View>
                <Text style={styles.filterLabel}>Verified Workers Only</Text>
                <Text style={styles.filterDescription}>
                  Show only verified profiles
                </Text>
              </View>
            </View>
            <View
              style={[styles.checkbox, verifiedOnly && styles.checkboxActive]}
            >
              {verifiedOnly && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>

          {/* Online Only */}
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => setOnlineOnly(!onlineOnly)}
            activeOpacity={0.7}
          >
            <View style={styles.filterOptionLeft}>
              <Text style={styles.filterIcon}>🟢</Text>
              <View>
                <Text style={styles.filterLabel}>Online Workers Only</Text>
                <Text style={styles.filterDescription}>
                  Show only workers currently online
                </Text>
              </View>
            </View>
            <View
              style={[styles.checkbox, onlineOnly && styles.checkboxActive]}
            >
              {onlineOnly && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>

          {/* Minimum Rating */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
            <View style={styles.ratingOptions}>
              {[0, 3, 4, 4.5].map(rating => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingOption,
                    minRating === rating && styles.ratingOptionActive,
                  ]}
                  onPress={() => setMinRating(rating)}
                >
                  <Text
                    style={[
                      styles.ratingText,
                      minRating === rating && styles.ratingTextActive,
                    ]}
                  >
                    {rating === 0 ? 'All' : `${rating}+ ⭐`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Maximum Distance */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>
              Maximum Distance: {maxDistance} km
            </Text>
            <View style={styles.distanceOptions}>
              {[2, 5, 10, 20].map(distance => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.distanceOption,
                    maxDistance === distance && styles.distanceOptionActive,
                  ]}
                  onPress={() => setMaxDistance(distance)}
                >
                  <Text
                    style={[
                      styles.distanceText,
                      maxDistance === distance && styles.distanceTextActive,
                    ]}
                  >
                    {distance} km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Active Filters Summary */}
          {getActiveFilterCount() > 0 && (
            <View style={styles.activeFilters}>
              <Text style={styles.activeFiltersTitle}>
                Active Filters ({getActiveFilterCount()})
              </Text>
              <View style={styles.activeFiltersList}>
                {verifiedOnly && (
                  <Badge label="✓ Verified Only" variant="primary" />
                )}
                {onlineOnly && (
                  <Badge label="🟢 Online Only" variant="success" />
                )}
                {minRating > 0 && (
                  <Badge label={`${minRating}+ Rating`} variant="warning" />
                )}
                {maxDistance < 10 && (
                  <Badge label={`Within ${maxDistance} km`} variant="info" />
                )}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.filtersFooter}>
          <Button
            title="Clear All"
            variant="outline"
            size="medium"
            onPress={handleClearFilters}
            style={styles.clearButton}
          />
          <Button
            title="Apply Filters"
            variant="primary"
            size="medium"
            onPress={handleApplyFilters}
            style={styles.applyButton}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
