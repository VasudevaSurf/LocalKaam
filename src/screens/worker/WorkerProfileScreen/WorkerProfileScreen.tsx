import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './WorkerProfileScreen.styles';
import { Header } from '../../../components/common/Header';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Card } from '../../../components/ui/Card';
import { Divider } from '../../../components/common/Divider';
import { Linking, Share, Alert } from 'react-native';
import { LoadingState } from '../../../components/common/LoadingState';
import { TextSkeleton } from '../../../components/ui/TextSkeleton';
import * as api from '../../../services/api';

const { width } = Dimensions.get('window');

type WorkerProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WorkerProfile'
>;

type WorkerProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'WorkerProfile'
>;

export const WorkerProfileScreen: React.FC = () => {
  const navigation = useNavigation<WorkerProfileScreenNavigationProp>();
  const route = useRoute<WorkerProfileScreenRouteProp>();
  const { workerId, initialData } = route.params;

  // Initialize with passed data if available (Instant Render)
  const initialWorkerState = initialData
    ? {
        _id: initialData.userId?._id || workerId,
        name: initialData.userId?.name || 'Worker',
        profileImage: initialData.userId?.profileImage,
        skill: initialData.category || initialData.userId?.skill || 'Service',
        // Set fields to null to trigger Skeletons
        rating: null,
        reviewCount: null,
        experience: null,
        videos: [
          {
            _id: initialData._id,
            videoUrl: initialData.videoUrl,
            thumbnailUrl: initialData.thumbnailUrl,
            title: initialData.title || 'Work Video',
          },
        ],
      }
    : null;

  const [loading, setLoading] = useState(!initialWorkerState);
  const [detailsLoading, setDetailsLoading] = useState(true); // New state for background fetch
  const [worker, setWorker] = useState<any>(initialWorkerState);
  const [workerVideos, setWorkerVideos] = useState<any[]>(
    initialWorkerState?.videos || [],
  );

  const [selectedTab, setSelectedTab] = useState<'about' | 'work' | 'reviews'>(
    'about',
  );

  useEffect(() => {
    fetchWorkerDetails();
  }, [workerId]);

  const fetchWorkerDetails = async () => {
    try {
      const [workerData, videosData] = await Promise.all([
        api.getWorkerById(workerId),
        api.getWorkerVideos(workerId),
      ]);
      setWorker(workerData);
      // Merge initial video with fetched videos if needed, or just set
      setWorkerVideos(videosData || []);
    } catch (error) {
      console.error('Error fetching worker details:', error);
      Alert.alert('Error', 'Failed to load worker profile');
      // Only go back if we have ABSOLUTELY no data to show
      if (!worker) navigation.goBack();
    } finally {
      setLoading(false);
      setDetailsLoading(false);
    }
  };

  const handleHireNow = () => {
    // Navigate to booking confirmation or chat - functionality might be limited as per user request
    if (worker) {
      navigation.navigate('BookingConfirmation', {
        workerId: worker._id,
        workerName: worker.name,
        service: worker.skill || 'Service',
        basePrice: 'Ask for Quote', // Dynamic price not fully implemented yet
      });
    }
  };

  const handleSendMessage = () => {
    console.log('Navigate to chat with', worker?._id);
    // navigation.navigate('Chat', { userId: worker.id });
    Alert.alert('Coming Soon', 'Chat feature is under development.');
  };

  const handleCall = () => {
    if (worker?.phoneNumber) {
      Linking.openURL(`tel:${worker.phoneNumber}`);
    }
  };

  const handleShare = async () => {
    try {
      if (worker) {
        await Share.share({
          message: `Check out ${worker.name}, a professional ${worker.skill} on LocalKaam!`,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not share profile');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={styles.star}>
        {i < Math.floor(rating) ? '⭐' : '☆'}
      </Text>
    ));
  };

  if (loading) {
    return <LoadingState message="Loading profile..." />;
  }

  if (!worker) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftIcon={<Text style={styles.backIcon}>←</Text>}
          onLeftPress={() => navigation.goBack()}
        />
        <View
          style={[
            styles.content,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text>Worker not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        rightIcon={<Text style={styles.shareIcon}>↗️</Text>}
        onLeftPress={() => navigation.goBack()}
        onRightPress={handleShare}
        transparent
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image - Use profile or placeholder */}
        <Image
          source={{
            uri:
              worker.profileImage ||
              `https://ui-avatars.com/api/?name=${worker.name}&background=random`,
          }}
          style={styles.coverImage}
        />

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar
            source={
              worker.profileImage ? { uri: worker.profileImage } : undefined
            }
            name={worker.name}
            size="xl"
            badge={
              worker.isOnline ? <View style={styles.onlineBadge} /> : undefined
            }
            style={styles.avatar}
          />

          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{worker.name}</Text>
              {worker.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.service}>
              {typeof worker.skill === 'object'
                ? worker.skill?.label ||
                  worker.skill?.value ||
                  'Service Provider'
                : worker.skill || 'Service Provider'}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                {detailsLoading ? (
                   <TextSkeleton width={20} />
                ) : (
                  <Text style={styles.rating}>{worker.rating || 0}</Text>
                )}
                {detailsLoading ? (
                   <TextSkeleton width={30} style={{ marginLeft: 4 }} />
                ) : (
                  <Text style={styles.reviewCount}>
                    ({worker.reviewCount || 0})
                  </Text>
                )}
              </View>
              <Text style={styles.dot}>•</Text>
              {detailsLoading ? (
                <TextSkeleton width={60} />
              ) : (
                <Text style={styles.metaText}>
                  {typeof worker.experience === 'object' ? worker.experience?.label || worker.experience?.value : worker.experience || 'New'} Exp
                </Text>
              )}
              <Text style={styles.dot}>•</Text>
              {detailsLoading ? (
                 <TextSkeleton width={50} />
              ) : (
                <Text style={styles.metaText}>
                  {worker.city?.name || 'Local'}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.availabilityContainer}>
          <Badge label={`🟢 Available`} variant="success" size="large" />
        </View>

        {/* Pricing - Using dynamic data if available */}
        {/* Removed or simplified as per user req, but kept minimal display if data exists */}
        {worker.hourlyRate && (
          <Card style={styles.pricingCard}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.pricingRow}>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Hourly Rate</Text>
                <Text style={styles.priceValue}>{worker.hourlyRate}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'about' && styles.tabActive]}
            onPress={() => setSelectedTab('about')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'about' && styles.tabTextActive,
              ]}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'work' && styles.tabActive]}
            onPress={() => setSelectedTab('work')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'work' && styles.tabTextActive,
              ]}
            >
              Work
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reviews' && styles.tabActive]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'reviews' && styles.tabTextActive,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'about' && (
          <View style={styles.tabContent}>
            {/* Bio */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              {detailsLoading ? (
                 <>
                   <TextSkeleton width="100%" height={16} style={{ marginBottom: 4 }} />
                   <TextSkeleton width="80%" height={16} />
                 </>
              ) : (
                <Text style={styles.bioText}>
                  {worker.bio || 'No bio available.'}
                </Text>
              )}
            </View>

            <Divider />

            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>skills</Text>
              <View style={styles.skillsContainer}>
                <Badge
                  label={worker.skill || 'General'}
                  variant="neutral"
                  size="medium"
                />
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'work' && (
          <View style={styles.tabContent}>
            {/* Videos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Skill Videos ({workerVideos.length})
              </Text>
              {workerVideos.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.videosContainer}
                >
                  {workerVideos.map(video => (
                    <TouchableOpacity key={video._id} style={styles.videoCard}>
                      {/* Use thumbnail or placeholder */}
                      <Image
                        source={{
                          uri:
                            video.thumbnailUrl ||
                            'https://via.placeholder.com/150',
                        }}
                        style={styles.videoThumbnail}
                      />
                      <View style={styles.playButton}>
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                      <Text style={styles.videoTitle} numberOfLines={2}>
                        {video.title || 'Work Video'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <Text style={{ marginTop: 10, color: '#666' }}>
                  No videos uploaded yet.
                </Text>
              )}
            </View>
          </View>
        )}

        {selectedTab === 'reviews' && (
          <View style={styles.tabContent}>
            <Text>No reviews yet.</Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Buttons - Kept as requested but connects to dynamic data */}
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <Button
            title="📞"
            variant="outline"
            size="large"
            onPress={handleCall}
            style={styles.callButton}
          />
          <Button
            title="💬"
            variant="outline"
            size="large"
            onPress={handleSendMessage}
            style={styles.messageButton}
          />
          <Button
            title="Hire Now"
            variant="primary"
            size="large"
            onPress={handleHireNow}
            style={styles.hireButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
