import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './MyBookingsScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingState } from '../../../components/common/LoadingState';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';

interface ServiceRequest {
  _id: string;
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

type MyBookingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export const MyBookingsScreen: React.FC = () => {
  const navigation = useNavigation<MyBookingsScreenNavigationProp>();
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState<
    'all' | 'active' | 'completed' | 'cancelled'
  >('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    if (!user?.id) return;

    try {
      const data = await api.getMyServiceRequests(user.id);
      setRequests(data || []);
      filterRequests(data || [], selectedTab);
    } catch (error) {
      console.error('[MyBookings] Error fetching requests:', error);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = (
    allRequests: ServiceRequest[],
    tab: typeof selectedTab,
  ) => {
    let filtered = allRequests;

    if (tab === 'active') {
      filtered = allRequests.filter(
        r =>
          r.status === 'pending' ||
          r.status === 'quoted' ||
          r.status === 'accepted',
      );
    } else if (tab === 'completed') {
      filtered = allRequests.filter(r => r.status === 'completed');
    } else if (tab === 'cancelled') {
      filtered = allRequests.filter(r => r.status === 'cancelled');
    }

    setFilteredRequests(filtered);
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.id]);

  useEffect(() => {
    filterRequests(requests, selectedTab);
  }, [selectedTab, requests]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
    setRefreshing(false);
  };

  const handleRequestPress = (requestId: string) => {
    navigation.navigate('ActiveRequest', { requestId });
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

  const getStatusVariant = (
    status: string,
  ): 'success' | 'warning' | 'error' | 'info' => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      pending: 'warning',
      quoted: 'info',
      accepted: 'success',
      completed: 'success',
      cancelled: 'error',
    };
    return variants[status] || 'info';
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Requests" />
        <LoadingState message="Loading your requests..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Requests" />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'all' && styles.tabTextActive,
            ]}
          >
            All ({requests.length})
          </Text>
        </TouchableOpacity>
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
            Active (
            {
              requests.filter(r =>
                ['pending', 'quoted', 'accepted'].includes(r.status),
              ).length
            }
            )
          </Text>
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
            Completed ({requests.filter(r => r.status === 'completed').length})
          </Text>
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
            Cancelled ({requests.filter(r => r.status === 'cancelled').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredRequests.length === 0 ? (
          <EmptyState
            icon={
              selectedTab === 'active'
                ? '📋'
                : selectedTab === 'completed'
                ? '✅'
                : selectedTab === 'cancelled'
                ? '❌'
                : '📋'
            }
            title={
              selectedTab === 'active'
                ? 'No Active Requests'
                : selectedTab === 'completed'
                ? 'No Completed Requests'
                : selectedTab === 'cancelled'
                ? 'No Cancelled Requests'
                : 'No Requests Yet'
            }
            description={
              selectedTab === 'all'
                ? 'Create your first service request to get started!'
                : selectedTab === 'active'
                ? 'You have no active service requests at the moment.'
                : selectedTab === 'completed'
                ? 'Your completed requests will appear here.'
                : 'You have no cancelled requests.'
            }
            actionLabel={selectedTab === 'all' ? 'Create Request' : undefined}
            onAction={
              selectedTab === 'all'
                ? () => navigation.navigate('RequestService')
                : undefined
            }
          />
        ) : (
          filteredRequests.map(request => (
            <TouchableOpacity
              key={request._id}
              onPress={() => handleRequestPress(request._id)}
              activeOpacity={0.7}
            >
              <Card style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.requestHeaderLeft}>
                    <Text style={styles.serviceIcon}>
                      {getServiceIcon(request.serviceType)}
                    </Text>
                    <View style={styles.requestInfo}>
                      <Text style={styles.serviceName}>
                        {request.serviceType}
                      </Text>
                      <Text style={styles.requestTime}>
                        {getTimeAgo(request.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Badge
                    label={
                      request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)
                    }
                    variant={getStatusVariant(request.status)}
                  />
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {request.description}
                </Text>

                <View style={styles.requestMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📍</Text>
                    <Text style={styles.metaText} numberOfLines={1}>
                      {request.location.address}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>💰</Text>
                    <Text style={styles.metaText}>
                      ₹{request.budget.toLocaleString()}
                    </Text>
                  </View>
                  {request.quotesCount > 0 && (
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>💼</Text>
                      <Text style={styles.metaText}>
                        {request.quotesCount} quote
                        {request.quotesCount > 1 ? 's' : ''}
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
