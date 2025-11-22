import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { styles } from './MyBookingsScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';

type BookingTab = 'active' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  workerName: string;
  workerImage?: string;
  service: string;
  status:
    | 'upcoming'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'pending_payment';
  date: string;
  time: string;
  location: string;
  amount: string;
  scheduledDate?: string;
}

// Mock Data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    workerName: 'Rajesh Kumar',
    workerImage: '',
    service: 'Electrician',
    status: 'in_progress',
    date: 'Today',
    time: '10:00 AM',
    location: 'Model Town, Ludhiana',
    amount: '₹2,400',
    scheduledDate: 'Nov 22, 2025',
  },
  {
    id: '2',
    workerName: 'Amit Singh',
    workerImage: '',
    service: 'Plumber',
    status: 'upcoming',
    date: 'Tomorrow',
    time: '2:00 PM',
    location: 'Civil Lines, Ludhiana',
    amount: '₹1,800',
    scheduledDate: 'Nov 23, 2025',
  },
  {
    id: '3',
    workerName: 'Suresh Patel',
    workerImage: '',
    service: 'Painter',
    status: 'completed',
    date: '2 days ago',
    time: '9:00 AM',
    location: 'Sarabha Nagar, Ludhiana',
    amount: '₹3,200',
    scheduledDate: 'Nov 20, 2025',
  },
];

export interface MyBookingsScreenProps {
  onBookingPress: (bookingId: string) => void;
  onContactWorker: (workerId: string) => void;
  onLeaveReview: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onBack: () => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  onBookingPress,
  onContactWorker,
  onLeaveReview,
  onCancelBooking,
  onBack,
}) => {
  const [selectedTab, setSelectedTab] = useState<BookingTab>('active');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge label="Upcoming" variant="info" size="small" />;
      case 'in_progress':
        return <Badge label="In Progress" variant="warning" size="small" />;
      case 'completed':
        return <Badge label="Completed" variant="success" size="small" />;
      case 'cancelled':
        return <Badge label="Cancelled" variant="error" size="small" />;
      case 'pending_payment':
        return <Badge label="Pending Payment" variant="warning" size="small" />;
      default:
        return null;
    }
  };

  const getFilteredBookings = () => {
    switch (selectedTab) {
      case 'active':
        return MOCK_BOOKINGS.filter(
          b =>
            b.status === 'upcoming' ||
            b.status === 'in_progress' ||
            b.status === 'pending_payment',
        );
      case 'completed':
        return MOCK_BOOKINGS.filter(b => b.status === 'completed');
      case 'cancelled':
        return MOCK_BOOKINGS.filter(b => b.status === 'cancelled');
      default:
        return [];
    }
  };

  const filteredBookings = getFilteredBookings();

  const renderBookingCard = (booking: Booking) => (
    <Card
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => onBookingPress(booking.id)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <Avatar
          source={
            booking.workerImage ? { uri: booking.workerImage } : undefined
          }
          name={booking.workerName}
          size="md"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.workerName}>{booking.workerName}</Text>
          <Text style={styles.service}>{booking.service}</Text>
        </View>
        {getStatusBadge(booking.status)}
      </View>

      {/* Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>
            {booking.date} • {booking.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText} numberOfLines={1}>
            {booking.location}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.amountText}>{booking.amount}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.cardActions}>
        {booking.status === 'upcoming' && (
          <>
            <Button
              title="Contact Worker"
              variant="outline"
              size="small"
              onPress={() => onContactWorker(booking.id)}
              style={styles.actionButton}
            />
            <Button
              title="Cancel"
              variant="ghost"
              size="small"
              onPress={() => onCancelBooking(booking.id)}
              style={styles.actionButton}
            />
          </>
        )}
        {booking.status === 'in_progress' && (
          <Button
            title="Track Progress"
            variant="primary"
            size="small"
            onPress={() => onBookingPress(booking.id)}
            fullWidth
          />
        )}
        {booking.status === 'completed' && (
          <>
            <Button
              title="View Details"
              variant="outline"
              size="small"
              onPress={() => onBookingPress(booking.id)}
              style={styles.actionButton}
            />
            <Button
              title="⭐ Review"
              variant="primary"
              size="small"
              onPress={() => onLeaveReview(booking.id)}
              style={styles.actionButton}
            />
          </>
        )}
        {booking.status === 'pending_payment' && (
          <Button
            title="Complete Payment"
            variant="primary"
            size="small"
            onPress={() => onBookingPress(booking.id)}
            fullWidth
          />
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My Bookings"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={onBack}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
          onPress={() => setSelectedTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'active' && styles.tabTextActive,
            ]}
          >
            Active
          </Text>
          <View
            style={[
              styles.tabBadge,
              selectedTab === 'active' && styles.tabBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.tabBadgeText,
                selectedTab === 'active' && styles.tabBadgeTextActive,
              ]}
            >
              2
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.tabActive]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'completed' && styles.tabTextActive,
            ]}
          >
            Completed
          </Text>
          <View
            style={[
              styles.tabBadge,
              selectedTab === 'completed' && styles.tabBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.tabBadgeText,
                selectedTab === 'completed' && styles.tabBadgeTextActive,
              ]}
            >
              1
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'cancelled' && styles.tabActive]}
          onPress={() => setSelectedTab('cancelled')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'cancelled' && styles.tabTextActive,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => renderBookingCard(booking))
        ) : (
          <EmptyState
            icon={
              selectedTab === 'active'
                ? '📅'
                : selectedTab === 'completed'
                ? '✅'
                : '❌'
            }
            title={`No ${selectedTab} bookings`}
            description={
              selectedTab === 'active'
                ? "You don't have any active bookings at the moment"
                : selectedTab === 'completed'
                ? "You haven't completed any bookings yet"
                : "You don't have any cancelled bookings"
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
