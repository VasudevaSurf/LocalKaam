import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

// Mock Data
const MOCK_WORKER = {
  id: '1',
  name: 'Rajesh Kumar',
  profileImage: '',
  coverImage: 'https://picsum.photos/800/400?random=1',
  service: 'Electrician',
  rating: 4.8,
  reviewCount: 156,
  completedJobs: 342,
  experience: '15+ years',
  verified: true,
  online: true,
  distance: '2.5 km',
  price: '₹800/day',
  hourlyRate: '₹150/hour',
  responseTime: '~10 mins',
  bio: 'Professional electrician with 15+ years of experience in residential and commercial wiring. Specialized in house wiring, MCB installation, and electrical repairs.',
  skills: [
    'House Wiring',
    'MCB Installation',
    'Fan & Light Fixtures',
    'Electrical Repairs',
    'Emergency Services',
  ],
  languages: ['Hindi', 'Punjabi', 'English'],
  availability: 'Available Today',
  workImages: [
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6',
  ],
  videos: [
    {
      id: '1',
      thumbnail: 'https://picsum.photos/200/150?random=7',
      title: 'House Wiring Demo',
    },
    {
      id: '2',
      thumbnail: 'https://picsum.photos/200/150?random=8',
      title: 'MCB Board Installation',
    },
  ],
  reviews: [
    {
      id: '1',
      customerName: 'Amit Singh',
      rating: 5,
      comment: 'Excellent work! Very professional and completed on time.',
      date: '2 days ago',
      images: [],
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'Highly skilled electrician. Solved complex wiring issues.',
      date: '1 week ago',
      images: ['https://picsum.photos/100/100?random=9'],
    },
    {
      id: '3',
      customerName: 'Suresh Patel',
      rating: 4,
      comment: 'Good work, but took a bit longer than expected.',
      date: '2 weeks ago',
      images: [],
    },
  ],
  phone: '+919876543210', // Mock phone
};

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
  const { workerId } = route.params;

  const [selectedTab, setSelectedTab] = useState<'about' | 'work' | 'reviews'>(
    'about',
  );
  const worker = MOCK_WORKER; // In real app, fetch by workerId

  const handleHireNow = () => {
    navigation.navigate('BookingConfirmation', {
      workerId: worker.id,
      workerName: worker.name,
      service: worker.service,
      basePrice: worker.price,
    });
  };

  const handleSendMessage = () => {
    console.log('Navigate to chat with', worker.id);
    // navigation.navigate('Chat', { userId: worker.id });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${worker.phone}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${worker.name}, a professional ${worker.service} on LocalKaam!`,
      });
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
        {/* Cover Image */}
        {worker.coverImage && (
          <Image
            source={{ uri: worker.coverImage }}
            style={styles.coverImage}
          />
        )}

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar
            source={
              worker.profileImage ? { uri: worker.profileImage } : undefined
            }
            name={worker.name}
            size="xl"
            badge={
              worker.online ? <View style={styles.onlineBadge} /> : undefined
            }
            style={styles.avatar}
          />

          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{worker.name}</Text>
              {worker.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.service}>{worker.service}</Text>

            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.rating}>{worker.rating}</Text>
                <Text style={styles.reviewCount}>({worker.reviewCount})</Text>
              </View>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.metaText}>{worker.completedJobs} jobs</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.metaText}>{worker.distance}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <Card style={styles.statsCard} elevation="md">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statValue}>{worker.responseTime}</Text>
              <Text style={styles.statLabel}>Response Time</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Completion Rate</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>{worker.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </Card>

        {/* Availability Badge */}
        <View style={styles.availabilityContainer}>
          <Badge
            label={`🟢 ${worker.availability}`}
            variant="success"
            size="large"
          />
        </View>

        {/* Pricing */}
        <Card style={styles.pricingCard}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.pricingRow}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Daily Rate</Text>
              <Text style={styles.priceValue}>{worker.price}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Hourly Rate</Text>
              <Text style={styles.priceValue}>{worker.hourlyRate}</Text>
            </View>
          </View>
        </Card>

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
              Reviews ({worker.reviewCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'about' && (
          <View style={styles.tabContent}>
            {/* Bio */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{worker.bio}</Text>
            </View>

            <Divider />

            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills & Services</Text>
              <View style={styles.skillsContainer}>
                {worker.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    label={skill}
                    variant="neutral"
                    size="medium"
                  />
                ))}
              </View>
            </View>

            <Divider />

            {/* Languages */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.languagesContainer}>
                {worker.languages.map((language, index) => (
                  <Text key={index} style={styles.languageText}>
                    {language}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'work' && (
          <View style={styles.tabContent}>
            {/* Videos */}
            {worker.videos.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skill Videos</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.videosContainer}
                >
                  {worker.videos.map(video => (
                    <TouchableOpacity key={video.id} style={styles.videoCard}>
                      <Image
                        source={{ uri: video.thumbnail }}
                        style={styles.videoThumbnail}
                      />
                      <View style={styles.playButton}>
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                      <Text style={styles.videoTitle} numberOfLines={2}>
                        {video.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <Divider />

            {/* Work Images */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Work Gallery ({worker.workImages.length})
              </Text>
              <View style={styles.workImagesGrid}>
                {worker.workImages.map((image, index) => (
                  <TouchableOpacity key={index} style={styles.workImageCard}>
                    <Image source={{ uri: image }} style={styles.workImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'reviews' && (
          <View style={styles.tabContent}>
            {/* Rating Summary */}
            <Card style={styles.ratingSummaryCard}>
              <View style={styles.ratingSummary}>
                <View style={styles.ratingLeft}>
                  <Text style={styles.ratingLarge}>{worker.rating}</Text>
                  <View style={styles.starsRow}>
                    {renderStars(worker.rating)}
                  </View>
                  <Text style={styles.ratingCount}>
                    Based on {worker.reviewCount} reviews
                  </Text>
                </View>
                <View style={styles.ratingBars}>
                  {[5, 4, 3, 2, 1].map(star => (
                    <View key={star} style={styles.ratingBarRow}>
                      <Text style={styles.ratingBarLabel}>{star} ⭐</Text>
                      <View style={styles.ratingBarContainer}>
                        <View
                          style={[
                            styles.ratingBarFill,
                            {
                              width: `${
                                star === 5 ? 85 : star === 4 ? 12 : 3
                              }%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.ratingBarCount}>
                        {star === 5 ? 133 : star === 4 ? 18 : 5}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card>

            {/* Reviews List */}
            <View style={styles.reviewsList}>
              {worker.reviews.map(review => (
                <Card key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Avatar name={review.customerName} size="sm" />
                    <View style={styles.reviewHeaderInfo}>
                      <Text style={styles.reviewerName}>
                        {review.customerName}
                      </Text>
                      <View style={styles.reviewMeta}>
                        <View style={styles.reviewStars}>
                          {renderStars(review.rating)}
                        </View>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  {review.images.length > 0 && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.reviewImagesContainer}
                    >
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          source={{ uri: image }}
                          style={styles.reviewImage}
                        />
                      ))}
                    </ScrollView>
                  )}
                </Card>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Buttons */}
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
