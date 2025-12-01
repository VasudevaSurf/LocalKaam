import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './PaymentHistoryScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Chip } from '../../../components/ui/Chip';
import { EmptyState } from '../../../components/common/EmptyState';
import { Alert } from 'react-native';

type FilterType = 'all' | 'this_month' | 'last_month' | 'older';

interface Payment {
  id: string;
  workerName: string;
  workerImage?: string;
  service: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending';
  paymentMethod: 'cash';
}

const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    workerName: 'Rajesh Kumar',
    workerImage: '',
    service: 'House Wiring',
    amount: 2400,
    date: 'Nov 20, 2025',
    time: '4:35 PM',
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: '2',
    workerName: 'Amit Singh',
    workerImage: '',
    service: 'Plumbing Work',
    amount: 1800,
    date: 'Nov 18, 2025',
    time: '2:15 PM',
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: '3',
    workerName: 'Suresh Patel',
    workerImage: '',
    service: 'Room Painting',
    amount: 3200,
    date: 'Nov 15, 2025',
    time: '11:20 AM',
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: '4',
    workerName: 'Vikram Sharma',
    workerImage: '',
    service: 'Furniture Repair',
    amount: 1200,
    date: 'Oct 28, 2025',
    time: '3:45 PM',
    status: 'completed',
    paymentMethod: 'cash',
  },
];

type PaymentHistoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentHistory'
>;

export const PaymentHistoryScreen: React.FC = () => {
  const navigation = useNavigation<PaymentHistoryScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);

  const handlePaymentPress = (paymentId: string) => {
    // navigation.navigate('PaymentDetail', { paymentId });
    Alert.alert('Info', 'Payment details coming soon');
  };

  const handleDownloadReceipt = (paymentId: string) => {
    Alert.alert('Success', 'Receipt downloaded');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getTotalAmount = () => {
    return MOCK_PAYMENTS.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getMonthlyAmount = () => {
    // Filter current month payments
    return MOCK_PAYMENTS.filter(p => p.date.includes('Nov')).reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Payment History"
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
        {/* Summary Card */}
        <Card style={styles.summaryCard} elevation="md">
          <Text style={styles.summaryTitle}>Total Spent</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>This Month</Text>
              <Text style={styles.summaryValue}>
                ₹{getMonthlyAmount().toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>All Time</Text>
              <Text style={styles.summaryValue}>
                ₹{getTotalAmount().toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeText}>
                {MOCK_PAYMENTS.length} Payments
              </Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeText}>100% Cash</Text>
            </View>
          </View>
        </Card>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            <Chip
              label="All"
              selected={selectedFilter === 'all'}
              onPress={() => setSelectedFilter('all')}
            />
            <Chip
              label="This Month"
              selected={selectedFilter === 'this_month'}
              onPress={() => setSelectedFilter('this_month')}
            />
            <Chip
              label="Last Month"
              selected={selectedFilter === 'last_month'}
              onPress={() => setSelectedFilter('last_month')}
            />
            <Chip
              label="Older"
              selected={selectedFilter === 'older'}
              onPress={() => setSelectedFilter('older')}
            />
          </ScrollView>
        </View>

        {/* Payments List */}
        <View style={styles.paymentsSection}>
          <Text style={styles.sectionTitle}>
            Transactions ({MOCK_PAYMENTS.length})
          </Text>

          {MOCK_PAYMENTS.length > 0 ? (
            MOCK_PAYMENTS.map(payment => (
              <Card
                key={payment.id}
                style={styles.paymentCard}
                onPress={() => handlePaymentPress(payment.id)}
              >
                <View style={styles.paymentHeader}>
                  <Avatar
                    source={
                      payment.workerImage
                        ? { uri: payment.workerImage }
                        : undefined
                    }
                    name={payment.workerName}
                    size="md"
                  />
                  <View style={styles.paymentInfo}>
                    <Text style={styles.workerName}>{payment.workerName}</Text>
                    <Text style={styles.service}>{payment.service}</Text>
                    <View style={styles.paymentMeta}>
                      <Text style={styles.metaText}>
                        {payment.date} • {payment.time}
                      </Text>
                    </View>
                  </View>
                  <Badge
                    label={
                      payment.status === 'completed' ? '✓ Paid' : 'Pending'
                    }
                    variant={
                      payment.status === 'completed' ? 'success' : 'warning'
                    }
                    size="small"
                  />
                </View>

                <View style={styles.paymentFooter}>
                  <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>Amount Paid</Text>
                    <Text style={styles.amount}>
                      ₹{payment.amount.toLocaleString()}
                    </Text>
                    <View style={styles.paymentMethodBadge}>
                      <Text style={styles.paymentMethodIcon}>💵</Text>
                      <Text style={styles.paymentMethodText}>Cash Payment</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => handleDownloadReceipt(payment.id)}
                  >
                    <Text style={styles.downloadIcon}>📥</Text>
                    <Text style={styles.downloadText}>Receipt</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          ) : (
            <EmptyState
              icon="💳"
              title="No payments yet"
              description="Your payment history will appear here"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
