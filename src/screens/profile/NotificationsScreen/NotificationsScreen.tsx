import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { styles } from './NotificationsScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/common/EmptyState';

type NotificationType = 'booking' | 'payment' | 'review' | 'general';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Booking Confirmed',
    message:
      'Your booking with Rajesh Kumar has been confirmed for tomorrow at 10:00 AM',
    time: '5 mins ago',
    read: false,
    actionLabel: 'View Booking',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment of ₹2,400 confirmed for house wiring service',
    time: '2 hours ago',
    read: false,
    actionLabel: 'View Receipt',
  },
  {
    id: '3',
    type: 'review',
    title: 'Leave a Review',
    message: 'How was your experience with Amit Singh? Share your feedback',
    time: '1 day ago',
    read: true,
    actionLabel: 'Write Review',
  },
  {
    id: '4',
    type: 'general',
    title: 'New Workers in Your Area',
    message: '5 new verified electricians joined near Model Town',
    time: '2 days ago',
    read: true,
    actionLabel: 'Browse',
  },
];

export interface NotificationsScreenProps {
  onNotificationPress: (notificationId: string) => void;
  onMarkAllRead: () => void;
  onBack: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNotificationPress,
  onMarkAllRead,
  onBack,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return '📋';
      case 'payment':
        return '💰';
      case 'review':
        return '⭐';
      case 'general':
        return '🔔';
      default:
        return '📬';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return colors.primary;
      case 'payment':
        return colors.success;
      case 'review':
        return colors.warning;
      case 'general':
        return colors.info;
      default:
        return colors.gray[500];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : undefined}
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        rightIcon={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={onMarkAllRead}>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          ) : undefined
        }
        onLeftPress={onBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Card
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard,
              ]}
              onPress={() => onNotificationPress(notification.id)}
            >
              <View style={styles.notificationHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        getNotificationColor(notification.type) + '15',
                    },
                  ]}
                >
                  <Text style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </Text>
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>
              </View>

              {notification.actionLabel && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={notification.onAction}
                >
                  <Text style={styles.actionButtonText}>
                    {notification.actionLabel} →
                  </Text>
                </TouchableOpacity>
              )}
            </Card>
          ))
        ) : (
          <EmptyState
            icon="🔔"
            title="No notifications"
            description="You're all caught up! Check back later for updates"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
