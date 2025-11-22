import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './MainApp.styles';
import {
  BottomTabBar,
  TabRoute,
} from '../../components/navigation/BottomTabBar';

// Tab Screens
import { PostServiceScreen } from '../../screens/home/PostServiceScreen';
import { BrowseServicesScreen } from '../../screens/browse/BrowseServicesScreen';
import { MyBookingsScreen } from '../../screens/bookings/MyBookingsScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';

export interface MainAppProps {
  // Post Service handlers
  onCreateRequest: () => void;
  onViewRequest: (requestId: string) => void;
  onLocationPress: () => void;
  onNotificationPress: () => void;

  // Browse handlers
  onWorkerPress: (workerId: string) => void;

  // Bookings handlers
  onBookingPress: (bookingId: string) => void;
  onContactWorker: (workerId: string) => void;
  onLeaveReview: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;

  // Profile handlers
  onEditProfile: () => void;
  onSavedWorkers: () => void;
  onPaymentHistory: () => void;
  onReviews: () => void;
  onAddresses: () => void;
  onNotifications: () => void;
  onSettings: () => void;
  onHelpSupport: () => void;
  onAbout: () => void;
  onPrivacyPolicy: () => void;
  onTermsConditions: () => void;
  onLogout: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({
  onCreateRequest,
  onViewRequest,
  onLocationPress,
  onNotificationPress,
  onWorkerPress,
  onBookingPress,
  onContactWorker,
  onLeaveReview,
  onCancelBooking,
  onEditProfile,
  onSavedWorkers,
  onPaymentHistory,
  onReviews,
  onAddresses,
  onNotifications,
  onSettings,
  onHelpSupport,
  onAbout,
  onPrivacyPolicy,
  onTermsConditions,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabRoute>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <PostServiceScreen
            onCreateRequest={onCreateRequest}
            onViewRequest={onViewRequest}
            onLocationPress={onLocationPress}
            onNotificationPress={onNotificationPress}
          />
        );

      case 'browse':
        return (
          <BrowseServicesScreen
            onWorkerPress={onWorkerPress}
            onBack={() => setActiveTab('home')}
          />
        );

      case 'bookings':
        return (
          <MyBookingsScreen
            onBookingPress={onBookingPress}
            onContactWorker={onContactWorker}
            onLeaveReview={onLeaveReview}
            onCancelBooking={onCancelBooking}
            onBack={() => setActiveTab('home')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            userName="Amit Singh"
            userPhone="+91 98765 43210"
            userEmail="amit.singh@example.com"
            memberSince="Nov 2024"
            totalBookings={23}
            onEditProfile={onEditProfile}
            onSavedWorkers={onSavedWorkers}
            onPaymentHistory={onPaymentHistory}
            onReviews={onReviews}
            onAddresses={onAddresses}
            onNotifications={onNotifications}
            onSettings={onSettings}
            onHelpSupport={onHelpSupport}
            onAbout={onAbout}
            onPrivacyPolicy={onPrivacyPolicy}
            onTermsConditions={onTermsConditions}
            onLogout={onLogout}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};
