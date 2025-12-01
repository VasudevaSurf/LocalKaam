import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './ActiveRequestScreen.styles';
import { Header } from '../../../components/common/Header';
import { QuoteCard } from '../../../components/common/QuoteCard';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingState } from '../../../components/common/LoadingState';

// Mock quotes data
const MOCK_QUOTES = [
  {
    id: '1',
    sellerId: '1',
    seller: {
      id: '1',
      name: 'Rajesh Kumar',
      profileImage: '',
      rating: 4.8,
      reviewCount: 156,
      verified: true,
      online: true,
      services: ['Electrician'],
      distance: '2.5 km',
      price: '₹800/day',
      images: [],
    },
    quotedPrice: '₹2,400',
    estimatedTime: '3 days',
    message:
      'I have 15+ years experience in house wiring. Can start immediately.',
    timestamp: new Date(),
  },
  {
    id: '2',
    sellerId: '2',
    seller: {
      id: '2',
      name: 'Amit Singh',
      profileImage: '',
      rating: 4.6,
      reviewCount: 98,
      verified: true,
      online: true,
      services: ['Electrician'],
      distance: '3.2 km',
      price: '₹700/day',
      images: [],
    },
    quotedPrice: '₹2,200',
    estimatedTime: '2-3 days',
    message:
      'Quality work guaranteed. I can provide material at discounted rate.',
    timestamp: new Date(),
  },
  {
    id: '3',
    sellerId: '3',
    seller: {
      id: '3',
      name: 'Suresh Patel',
      profileImage: '',
      rating: 4.9,
      reviewCount: 203,
      verified: true,
      online: false,
      services: ['Electrician'],
      distance: '1.8 km',
      price: '₹900/day',
      images: [],
    },
    quotedPrice: '₹2,700',
    estimatedTime: '3-4 days',
    message: 'Premium quality wiring with warranty. Available from tomorrow.',
    timestamp: new Date(),
  },
];

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

  const [quotes, setQuotes] = useState(MOCK_QUOTES);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAcceptQuote = (quoteId: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      navigation.navigate('BookingConfirmation', {
        workerId: quote.sellerId,
        workerName: quote.seller.name,
        service: quote.seller.services[0],
        basePrice: quote.quotedPrice,
      });
    }
  };

  const handleViewProfile = (sellerId: string) => {
    navigation.navigate('WorkerProfile', { workerId: sellerId });
  };

  const handleChat = (sellerId: string) => {
    console.log('Navigate to chat with', sellerId);
    // navigation.navigate('Chat', { userId: sellerId });
  };

  const handleCancelRequest = () => {
    // Call API to cancel
    console.log('Cancelling request', requestId);
    navigation.goBack();
  };

  // Simulate real-time quote updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new quote coming in
      console.log('Checking for new quotes...');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  if (loading) {
    return <LoadingState message="Loading quotes..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Your Request"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
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
              <Text style={styles.serviceIcon}>⚡</Text>
              <View>
                <Text style={styles.serviceName}>Electrician</Text>
                <Text style={styles.requestTime}>Posted 15 mins ago</Text>
              </View>
            </View>
            <Badge label="Active" variant="success" />
          </View>

          <View style={styles.requestDetails}>
            <Text style={styles.requestDescription}>
              Need complete house wiring for 2BHK apartment. Include all rooms,
              MCB board, lights, fans.
            </Text>
            <View style={styles.requestMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>📍</Text>
                <Text style={styles.metaText}>Model Town, Ludhiana</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>💰</Text>
                <Text style={styles.metaText}>Budget: ₹2,500</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Stats Card */}
        <Card style={styles.statsCard} elevation="none">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{quotes.length}</Text>
              <Text style={styles.statLabel}>Quotes Received</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                ₹
                {Math.min(
                  ...quotes.map(q =>
                    parseInt(q.quotedPrice.replace(/[^\d]/g, '')),
                  ),
                ).toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Lowest Quote</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
          </View>
        </Card>

        {/* Quotes Section */}
        <View style={styles.quotesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quotes ({quotes.length})</Text>
            <Text style={styles.liveIndicator}>
              <Text style={styles.liveDot}>●</Text> Live
            </Text>
          </View>

          {quotes.length > 0 ? (
            quotes.map(quote => (
              <QuoteCard
                key={quote.id}
                {...quote}
                sellerName={quote.seller.name}
                sellerImage={quote.seller.profileImage}
                service={quote.seller.services[0]}
                rating={quote.seller.rating}
                reviewCount={quote.seller.reviewCount}
                distance={quote.seller.distance}
                verified={quote.seller.verified}
                onAccept={() => handleAcceptQuote(quote.id)}
                onViewProfile={() => handleViewProfile(quote.sellerId)}
                onChat={() => handleChat(quote.sellerId)}
                style={styles.quoteCard}
              />
            ))
          ) : (
            <EmptyState
              icon="⏳"
              title="Waiting for quotes..."
              description="Workers are viewing your request. You'll receive quotes soon!"
            />
          )}
        </View>

        {/* Cancel Request Button */}
        <Button
          title="Cancel Request"
          variant="ghost"
          size="medium"
          onPress={handleCancelRequest}
          style={styles.cancelButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
