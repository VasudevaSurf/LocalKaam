import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './ActiveRequestScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingState } from '../../../components/common/LoadingState';
import * as api from '../../../services/api';
import SocketService from '../../../services/SocketService';

interface ServiceRequest {
  _id: string;
  customerId: string;
  customerPhone: string;
  customerName: string;
  serviceType: string;
  description: string;
  location: {
    address: string;
    city?: string;
  };
  budget: number;
  urgency: string;
  status: string;
  quotesCount: number;
  createdAt: string;
  updatedAt: string;
}

type ActiveRequestScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ActiveRequest'
>;

type ActiveRequestScreenRouteProp = RouteProp<
  RootStackParamList,
  'ActiveRequest'
>;

export const ActiveRequestScreen: React.FC = () => {
  const navigation = useNavigation<ActiveRequestScreenNavigationProp>();
  const route = useRoute<ActiveRequestScreenRouteProp>();
  const { requestId } = route.params;

  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestDetails = async () => {
    try {
      setError(null);
      const data = await api.getServiceRequest(requestId);
      setRequest(data);
    } catch (err: any) {
      console.error('[ActiveRequest] Error fetching request:', err);
      setError('Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequestDetails();
    setRefreshing(false);
  };

  const handleCancelRequest = async () => {
    Alert.alert(
      'Cancel Request',
      'Are you sure you want to cancel this service request?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.cancelServiceRequest(requestId);
              Alert.alert('Success', 'Request cancelled successfully');
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', 'Failed to cancel request');
            }
          },
        },
      ],
    );
  };

  const getServiceIcon = (serviceType: string) => {
    const icons: Record<string, string> = {
      Electrician: '⚡',
      Plumber: '🔧',
      Painter: '🎨',
      Carpenter: '🔨',
      Cook: '👨‍🍳',
      Mechanic: '🚗',
      Cleaner: '🧹',
    };
    return icons[serviceType] || '🔧';
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels: Record<string, string> = {
      asap: 'ASAP',
      today: 'Today',
      tomorrow: 'Tomorrow',
      scheduled: 'Scheduled',
    };
    return labels[urgency] || urgency;
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Real-time quotes state
  const [realTimeQuotes, setRealTimeQuotes] = useState<
    Array<{
      quote: any;
      expiresAt: number;
    }>
  >([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Listen for request accepted event
    const socket = SocketService.connect();
    SocketService.joinRequestRoom(requestId);

    SocketService.onQuoteReceived(data => {
      console.log('[ActiveRequest] Quote received:', data);
      const newQuote = data.quote;

      // Add to list with 15s expiration
      setRealTimeQuotes(prev => {
        // Remove existing quote from same worker if any (update case)
        const filtered = prev.filter(
          q => q.quote.workerId !== newQuote.workerId,
        );
        return [
          {
            quote: newQuote,
            expiresAt: Date.now() + 15000, // 15 seconds from now
          },
          ...filtered,
        ];
      });
    });

    socket.on('request_accepted', data => {
      console.log('[ActiveRequest] Request accepted:', data);
      setRequest(data.updatedRequest);
      setRealTimeQuotes([]);
      Alert.alert('Success', 'You have accepted the offer!');
    });

    // Update timer every second
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      SocketService.offQuoteReceived();
      socket.off('request_accepted');
      clearInterval(timer);
    };
  }, [requestId]);

  // Filter out expired quotes
  const activeQuotes = realTimeQuotes.filter(q => q.expiresAt > now);

  const handleAcceptQuote = async (quote: any) => {
    Alert.alert(
      'Accept Quote',
      `Accept offer of ₹${quote.quotedPrice} from ${quote.workerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              setLoading(true);
              await api.acceptQuote(quote._id);
              // UI will update via socket event, but we can also force refresh
              await fetchRequestDetails();
            } catch (err) {
              Alert.alert('Error', 'Failed to accept quote');
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Your Request"
          leftIcon={<Text style={styles.backIcon}>←</Text>}
          onLeftPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Main');
            }
          }}
        />
        <LoadingState message="Loading request details..." />
      </SafeAreaView>
    );
  }

  if (error || !request) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Your Request"
          leftIcon={<Text style={styles.backIcon}>←</Text>}
          onLeftPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Main');
            }
          }}
        />
        <EmptyState
          icon="❌"
          title="Request Not Found"
          description={error || 'Could not load request details'}
          actionLabel="Go Back"
          onAction={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Your Request"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Main');
          }
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Request Details Card */}
        <Card style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <View style={styles.requestHeaderLeft}>
              <Text style={styles.serviceIcon}>
                {getServiceIcon(request.serviceType)}
              </Text>
              <View>
                <Text style={styles.serviceName}>{request.serviceType}</Text>
                <Text style={styles.requestTime}>
                  Posted {getTimeAgo(request.createdAt)}
                </Text>
              </View>
            </View>
            <Badge
              label={
                request.status.charAt(0).toUpperCase() + request.status.slice(1)
              }
              variant={
                request.status === 'pending'
                  ? 'warning'
                  : request.status === 'cancelled'
                  ? 'error'
                  : 'success'
              }
            />
          </View>

          <View style={styles.requestDetails}>
            <Text style={styles.requestDescription}>{request.description}</Text>
            <View style={styles.requestMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>📍</Text>
                <Text style={styles.metaText}>{request.location.address}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>💰</Text>
                <Text style={styles.metaText}>
                  Budget: ₹{request.budget.toLocaleString()}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⏰</Text>
                <Text style={styles.metaText}>
                  Urgency: {getUrgencyLabel(request.urgency)}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Stats Card */}
        <Card style={styles.statsCard} elevation="none">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{request.quotesCount}</Text>
              <Text style={styles.statLabel}>Quotes Received</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor(
                  (new Date().getTime() -
                    new Date(request.createdAt).getTime()) /
                    (1000 * 60),
                )}
                m
              </Text>
              <Text style={styles.statLabel}>Time Active</Text>
            </View>
          </View>
        </Card>

        {/* Quotes Section or Cancelled/Accepted Message */}
        {request.status === 'accepted' && request.workerId ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Assigned Worker</Text>
              <Badge label="Accepted" variant="success" />
            </View>

            <Card style={styles.workerProfileCard}>
              <View style={styles.workerProfileHeader}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.largeInitials}>
                    {/* @ts-ignore: workerId is populated */}
                    {request.workerId.name?.charAt(0) || 'W'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.workerNameLarge}>
                    {/* @ts-ignore: workerId is populated */}
                    {request.workerId.name}
                  </Text>
                  <Text style={styles.workerSkill}>
                    {/* @ts-ignore: workerId is populated */}
                    {request.workerId.skill || request.serviceType} Expert
                  </Text>
                  <Text style={styles.workerRatingLarge}>
                    {/* @ts-ignore: workerId is populated */}⭐{' '}
                    {request.workerId.rating || 4.8} (
                    {request.workerId.jobsCount || 12} jobs)
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <Button
                  title="Message"
                  variant="outline"
                  style={styles.actionButton}
                  onPress={() =>
                    Alert.alert('Message', 'Chat feature coming soon!')
                  }
                />
                <Button
                  title="Call Worker"
                  style={styles.actionButton}
                  onPress={() =>
                    Alert.alert(
                      'Call',
                      `Calling ${/* @ts-ignore */ request.workerId.name}...`,
                    )
                  }
                />
              </View>
            </Card>
          </View>
        ) : request.status === 'accepted' ? (
          // Fallback if workerId is not populated yet (should not happen with new backend)
          <Card style={[styles.comingSoonCard, { backgroundColor: '#E8F5E9' }]}>
            <Text
              style={[
                styles.comingSoonText,
                { color: '#2E7D32', fontSize: 18, fontWeight: 'bold' },
              ]}
            >
              ✅ Offer Accepted!
            </Text>
            <Text style={styles.comingSoonSubtext}>
              You have accepted a quote. The worker has been notified and will
              contact you shortly.
            </Text>
            <View style={{ marginTop: 16, width: '100%' }}>
              <Button
                title="Call Worker"
                onPress={() => Alert.alert('Call', 'Calling worker...')}
              />
            </View>
          </Card>
        ) : request.status !== 'cancelled' ? (
          <View style={styles.quotesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Live Quotes ({activeQuotes.length})
              </Text>
              <Text style={styles.liveIndicator}>
                <Text style={styles.liveDot}>●</Text> Real-time
              </Text>
            </View>

            {activeQuotes.length === 0 ? (
              <EmptyState
                icon="⏳"
                title="Waiting for quotes..."
                description="New quotes will appear here instantly."
              />
            ) : (
              activeQuotes.map((item, index) => {
                const timeLeft = Math.max(
                  0,
                  Math.ceil((item.expiresAt - now) / 1000),
                );
                return (
                  <Card key={item.quote._id || index} style={styles.quoteCard}>
                    <View style={styles.quoteHeader}>
                      <View style={styles.workerInfo}>
                        <View style={styles.workerAvatar}>
                          <Text style={styles.workerInitials}>
                            {item.quote.workerName?.charAt(0) || 'W'}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.workerName}>
                            {item.quote.workerName}
                          </Text>
                          <Text style={styles.workerRating}>
                            ⭐ 4.8 (12 jobs)
                          </Text>
                        </View>
                      </View>
                      <View style={styles.timerBadge}>
                        <Text style={styles.timerText}>{timeLeft}s</Text>
                      </View>
                    </View>

                    <View style={styles.quoteContent}>
                      <Text style={styles.quotePrice}>
                        ₹{item.quote.quotedPrice}
                      </Text>
                      {item.quote.message ? (
                        <Text style={styles.quoteMessage}>
                          "{item.quote.message}"
                        </Text>
                      ) : null}
                    </View>

                    <Button
                      title="Accept Offer"
                      onPress={() => handleAcceptQuote(item.quote)}
                      style={styles.acceptButton}
                    />
                  </Card>
                );
              })
            )}
          </View>
        ) : (
          <Card style={styles.comingSoonCard}>
            <Text style={styles.comingSoonText}>❌ Request Cancelled</Text>
            <Text style={styles.comingSoonSubtext}>
              This request has been cancelled and is no longer active.
            </Text>
          </Card>
        )}

        {/* Cancel Request Button */}
        {request.status === 'pending' && (
          <Button
            title="Cancel Request"
            variant="ghost"
            size="medium"
            onPress={handleCancelRequest}
            style={styles.cancelButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
