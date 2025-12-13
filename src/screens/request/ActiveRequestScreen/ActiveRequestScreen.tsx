import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import { colors as COLORS } from '../../../theme';
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
  otp?: string;
  createdAt: string;
  updatedAt: string;
  workerId?: {
    _id: string;
    name: string;
    phoneNumber: string;
    profileImage?: string;
    skill?: string;
    rating?: number;
    jobsCount?: number;
  };
  customerId?: {
    _id: string;
    name: string;
    profileImage?: string;
  };
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
  // Rating State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);

  // Quotes State
  const [quotes, setQuotes] = useState<any[]>([]);
  // Alias quotes to activeQuotes for compatibility with rendering logic
  const activeQuotes = quotes;
  const [now, setNow] = useState(Date.now());

  const fetchRequestDetails = async () => {
    try {
      setError(null);
      const [requestData, quotesData] = await Promise.all([
        api.getServiceRequest(requestId),
        api.getRequestQuotes(requestId),
      ]);
      setRequest(requestData);
      setQuotes(quotesData || []);
    } catch (err: any) {
      console.error('[ActiveRequest] Error fetching request details:', err);
      setError('Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  useEffect(() => {
    // Socket connection
    const socket = SocketService.connect();
    SocketService.joinRequestRoom(requestId);

    SocketService.onQuoteReceived(data => {
      console.log('[ActiveRequest] Quote received:', data);
      const newQuote = data.quote;

      setQuotes(prev => {
        const exists = prev.find(q => q._id === newQuote._id);
        if (exists) {
          return prev.map(q => (q._id === newQuote._id ? newQuote : q));
        }
        return [newQuote, ...prev];
      });

      setRequest(prev => {
        if (!prev) return prev;
        return { ...prev, quotesCount: (prev.quotesCount || 0) + 1 };
      });
    });

    socket.on('request_accepted', data => {
      console.log('[ActiveRequest] Request accepted:', data);
      setRequest(data.updatedRequest);
      fetchRequestDetails();
      Alert.alert('Success', 'You have accepted the offer!');
    });

    socket.on('job_cancelled_by_worker', data => {
      console.log('[ActiveRequest] Job cancelled by worker:', data);
      setRequest(data.updatedRequest);
      fetchRequestDetails();
      Alert.alert(
        'Job Cancelled',
        'The assigned worker has cancelled the job. Your request is now active for other workers to quote.',
      );
    });

    socket.on('job_completed', data => {
      console.log('[ActiveRequest] Job completed:', data);
      setRequest(data.updatedRequest);
      setShowRatingModal(true);
    });

    // Timer for updates (if needed for relative time, else can remove)
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      SocketService.offQuoteReceived();
      socket.off('request_accepted');
      socket.off('job_cancelled_by_worker');
      socket.off('job_completed');
      clearInterval(timer);
    };
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
              setLoading(true);
              await api.cancelServiceRequest(requestId);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', 'Failed to cancel request');
              setLoading(false);
            }
          },
        },
      ],
    );
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

  const handleRateWorker = async () => {
    if (rating === 0) {
      Alert.alert('Required', 'Please select a star rating.');
      return;
    }
    // @ts-ignore
    const workerId = request?.workerId?._id || request?.workerId;
    if (!workerId) return;

    try {
      setSubmittingRating(true);
      // @ts-ignore
      const customerId = request.customerId?._id || request.customerId;
      await api.rateWorker(workerId, rating, customerId, request._id);
      setShowRatingModal(false);
      Alert.alert('Thank You', 'Your rating has been submitted.', [
        { text: 'OK', onPress: () => navigation.navigate('Main') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating');
    } finally {
      setSubmittingRating(false);
    }
  };

  const renderRatingModal = () => (
    <Modal
      visible={showRatingModal}
      transparent
      animationType="slide"
      onRequestClose={() => {}} // Prevent back button closing
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 8,
              color: COLORS.textPrimary,
            }}
          >
            Job Completed!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.textSecondary,
              marginBottom: 24,
            }}
          >
            How was your experience with the worker?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 32,
            }}
          >
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text
                  style={{
                    fontSize: 40,
                    color: star <= rating ? COLORS.star : '#E5E7EB',
                  }}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title={submittingRating ? 'Submitting...' : 'Submit Rating'}
            onPress={handleRateWorker}
            disabled={submittingRating}
            fullWidth
          />
          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={() => {
              setShowRatingModal(false);
              navigation.navigate('Main');
            }}
          >
            <Text style={{ color: COLORS.textSecondary }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
      {renderRatingModal()}

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
        {request.status === 'completed' ? (
          <View>
            <Card
              style={{
                padding: 24,
                alignItems: 'center',
                backgroundColor: '#F0FDF4',
                borderColor: COLORS.success,
                borderWidth: 1,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: COLORS.success,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Icon name="check-bold" size={40} color={COLORS.white} />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: COLORS.success,
                  marginBottom: 8,
                }}
              >
                Job Completed!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  marginBottom: 24,
                }}
              >
                The work has been verified and marked as complete.
              </Text>

              {/* @ts-ignore */}
              <Text style={{ fontSize: 14, color: COLORS.textPrimary }}>
                Completed by {request.workerId?.name || 'Worker'}
              </Text>
            </Card>
          </View>
        ) : request.status === 'accepted' && request.workerId ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Assigned Worker</Text>
              <Badge label="Accepted" variant="success" />
            </View>

            {/* OTP Display Card */}
            {request.otp && (
              <Card
                style={{
                  marginBottom: 16,
                  backgroundColor: '#E3F2FD',
                  borderColor: '#BBDEFB',
                  borderWidth: 1,
                }}
              >
                <View style={{ alignItems: 'center', padding: 8 }}>
                  <Text
                    style={{ fontSize: 14, color: '#1976D2', marginBottom: 4 }}
                  >
                    Share this code with worker to start/complete job
                  </Text>
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      letterSpacing: 8,
                      color: '#1565C0',
                    }}
                  >
                    {request.otp}
                  </Text>
                </View>
              </Card>
            )}

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
                <Button
                  title="Cancel Job"
                  variant="ghost"
                  style={[
                    styles.actionButton,
                    { marginTop: 8, borderColor: COLORS.error, borderWidth: 1 },
                  ]}
                  textStyle={{ color: COLORS.error }}
                  onPress={handleCancelRequest}
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
              activeQuotes.map((quote, index) => {
                return (
                  <Card key={quote._id || index} style={styles.quoteCard}>
                    <View style={styles.quoteHeader}>
                      <View style={styles.workerInfo}>
                        <View style={styles.workerAvatar}>
                          <Text style={styles.workerInitials}>
                            {quote.workerName?.charAt(0) || 'W'}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.workerName}>
                            {quote.workerName}
                          </Text>
                          <Text style={styles.workerRating}>
                            ⭐ 4.8 (12 jobs)
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.timerBadge,
                          { backgroundColor: COLORS.success + '20' },
                        ]}
                      >
                        <Text
                          style={[styles.timerText, { color: COLORS.success }]}
                        >
                          Active
                        </Text>
                      </View>
                    </View>

                    <View style={styles.quoteContent}>
                      <Text style={styles.quotePrice}>
                        ₹{quote.quotedPrice}
                      </Text>
                      {quote.message ? (
                        <Text style={styles.quoteMessage}>
                          "{quote.message}"
                        </Text>
                      ) : null}
                    </View>

                    <Button
                      title="Accept Offer"
                      onPress={() => handleAcceptQuote(quote)}
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
