import React, { useState, useEffect } from 'react';
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
import * as api from '../../../services/api';
import SocketService from '../../../services/SocketService';
import { useAuth } from '../../../context/AuthContext';

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

export interface BrowseServicesScreenProps {
  onWorkerPress: (workerId: string) => void;
  onBack: () => void;
}

export const BrowseServicesScreen: React.FC<BrowseServicesScreenProps> = ({
  onWorkerPress,
  onBack,
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);

  // Filter states
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(10);

  useEffect(() => {
    fetchVideos();

    // Connect socket for real-time updates
    const socket = SocketService.connect();

    // Listen for new videos
    SocketService.onNewVideo(newVideo => {
      console.log('[Browse] New video received:', newVideo._id);
      setVideos(prev => [newVideo, ...prev]);
    });

    return () => {
      SocketService.offNewVideo();
    };
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await api.getAllWorkVideos();
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchVideos();
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

  // Filter logic using real video data
  const filteredVideos = videos.filter(video => {
    // Category Filter
    if (
      selectedCategory !== 'all' &&
      video.category !==
        CATEGORIES.find(c => c.id === selectedCategory)?.label &&
      video.category !== selectedCategory // Fallback check
    ) {
      return false;
    }

    // Search Query
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (video.title && video.title.toLowerCase().includes(searchLower)) ||
      (video.description &&
        video.description.toLowerCase().includes(searchLower)) ||
      (video.userId?.name &&
        video.userId.name.toLowerCase().includes(searchLower)) ||
      (video.category && video.category.toLowerCase().includes(searchLower));

    if (searchQuery && !matchesSearch) {
      return false;
    }

    // Additional filters (dummy implementation as we don't have all fields on video yet)
    if (verifiedOnly) return false; // Placeholder
    if (onlineOnly) return false; // Placeholder

    return true;
  });

  // Map video data to ServiceCard props
  const renderVideoItem = ({ item }: { item: any }) => (
    <ServiceCard
      id={item._id}
      sellerName={item.userId?.name || 'Unknown Worker'}
      sellerImage={item.userId?.profileImage}
      service={item.category || 'Service'}
      rating={4.8} // Placeholder rating
      reviewCount={12} // Placeholder review count
      distance="Nearby" // Placeholder distance
      price="Ask for Quote" // Placeholder price
      verified={true} // Placeholder
      online={true} // Placeholder
      images={[item.thumbnailUrl || item.videoUrl]} // Use thumbnail or video as preview
      onPress={() => onWorkerPress(item.userId?._id)} // Navigate to worker profile or video detail
      style={styles.workerCard}
    />
  );

  if (loading && !refreshing && videos.length === 0) {
    return <LoadingState message="Loading videos..." />;
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
            {filteredVideos.length} videos found
          </Text>
          <TouchableOpacity style={styles.sortButton} onPress={() => {}}>
            <Text style={styles.sortIcon}>⇅</Text>
            <Text style={styles.sortText}>
              {SORT_OPTIONS.find(s => s.id === selectedSort)?.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Videos List */}
      <FlatList
        data={filteredVideos}
        keyExtractor={item => item._id}
        renderItem={renderVideoItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No videos found"
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
