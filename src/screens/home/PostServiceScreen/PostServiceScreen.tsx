import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { styles } from './PostServiceScreen.styles';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { LocationPicker } from '../../../components/common/LocationPicker';
import { EmptyState } from '../../../components/common/EmptyState';
import { useAuth } from '../../../context/AuthContext';

interface ActiveRequest {
  id: string;
  service: string;
  description: string;
  budget: string;
  quotesCount: number;
  status: 'pending' | 'quoted' | 'accepted';
  postedTime: string;
}

const MOCK_ACTIVE_REQUESTS: ActiveRequest[] = [
  {
    id: '1',
    service: 'Electrician',
    description: 'Need house wiring for 2BHK apartment',
    budget: '₹2,500',
    quotesCount: 5,
    status: 'quoted',
    postedTime: '15 mins ago',
  },
];

export interface PostServiceScreenProps {
  onCreateRequest: () => void;
  onViewRequest: (requestId: string) => void;
  onLocationPress: () => void;
  onNotificationPress: () => void;
  activeRequests: any[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export const PostServiceScreen: React.FC<PostServiceScreenProps> = ({
  onCreateRequest,
  onViewRequest,
  onLocationPress,
  onNotificationPress,
  activeRequests = [],
  isLoading = false,
  onRefresh,
}) => {
  const { user } = useAuth();

  // Get first name from full name
  const getFirstName = () => {
    if (!user?.name) return 'there';
    return user.name.split(' ')[0];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {getFirstName()} 👋</Text>
          <Text style={styles.title}>What service do you need?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <LocationPicker
          location="Model Town, Ludhiana"
          onPress={onLocationPress}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {/* Main CTA Card */}
        <Card style={styles.ctaCard} elevation="lg">
          <Text style={styles.ctaIcon}>📢</Text>
          <Text style={styles.ctaTitle}>Post Your Service Request</Text>
          <Text style={styles.ctaDescription}>
            Tell us what you need and get quotes from verified workers near you
          </Text>
          <Button
            title="+ Create Request"
            variant="primary"
            size="large"
            onPress={onCreateRequest}
            fullWidth
            style={styles.ctaButton}
          />
          <View style={styles.ctaFeatures}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>Free to post</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>Get multiple quotes</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>Choose the best</Text>
            </View>
          </View>
        </Card>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Card style={styles.stepsCard} elevation="none">
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Post your request</Text>
                <Text style={styles.stepDescription}>
                  Describe the service you need
                </Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Receive quotes</Text>
                <Text style={styles.stepDescription}>
                  Workers send you their quotes
                </Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Compare & hire</Text>
                <Text style={styles.stepDescription}>
                  Choose the best worker for you
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Active Requests */}
        {activeRequests.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Active Requests</Text>
              <Badge
                label={`${activeRequests.length}`}
                variant="primary"
                size="small"
              />
            </View>

            {activeRequests.map(request => (
              <Card
                key={request._id}
                style={styles.requestCard}
                onPress={() => onViewRequest(request._id)}
              >
                <View style={styles.requestHeader}>
                  <View style={styles.requestHeaderLeft}>
                    <Text style={styles.requestService}>
                      {request.serviceType}
                    </Text>
                    <Text style={styles.requestTime}>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Badge
                    label={
                      request.status === 'pending'
                        ? 'Pending'
                        : request.status === 'quoted'
                        ? `${request.quotesCount || 0} Quotes`
                        : request.status
                    }
                    variant={
                      request.status === 'pending'
                        ? 'warning'
                        : request.status === 'quoted'
                        ? 'success'
                        : 'primary'
                    }
                    size="small"
                  />
                </View>

                <Text style={styles.requestDescription} numberOfLines={2}>
                  {request.description}
                </Text>

                <View style={styles.requestFooter}>
                  <View style={styles.requestBudget}>
                    <Text style={styles.budgetIcon}>💰</Text>
                    <Text style={styles.budgetText}>₹{request.budget}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => onViewRequest(request._id)}
                    style={styles.viewButton}
                  >
                    <Text style={styles.viewButtonText}>View Details →</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Stats */}
        <Card style={styles.statsCard} elevation="none">
          <Text style={styles.statsTitle}>Why choose SkillProof?</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>10k+</Text>
              <Text style={styles.statLabel}>Verified Workers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50k+</Text>
              <Text style={styles.statLabel}>Jobs Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8⭐</Text>
              <Text style={styles.statLabel}>Average Rating</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};
