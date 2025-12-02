import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreen as ProfileScreenComponent } from './ProfileScreen';
import { useAuth } from '../../../context/AuthContext';

export const ProfileScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  // Format member since date
  const getMemberSince = () => {
    if (!user) return 'Recently';
    // You can add createdAt field to User interface and use it here
    return 'Nov 2024'; // Placeholder for now
  };

  return (
    <ProfileScreenComponent
      userName={user?.name || 'Guest User'}
      userPhone={user?.phoneNumber || ''}
      userEmail={user?.email}
      userImage={user?.profileImage}
      memberSince={getMemberSince()}
      totalBookings={0} // TODO: Fetch from bookings API
      onEditProfile={() => navigation.navigate('EditProfile')}
      onSavedWorkers={() => navigation.navigate('SavedWorkers')}
      onPaymentHistory={() => navigation.navigate('PaymentHistory')}
      onReviews={() => console.log('Reviews - Coming soon')}
      onAddresses={() => console.log('Addresses - Coming soon')}
      onNotifications={() => navigation.navigate('Notifications')}
      onSettings={() => navigation.navigate('Settings')}
      onHelpSupport={() => navigation.navigate('HelpSupport')}
      onAbout={() => console.log('About - Coming soon')}
      onPrivacyPolicy={() => console.log('Privacy Policy - Coming soon')}
      onTermsConditions={() => console.log('Terms - Coming soon')}
      onLogout={async () => {
        await logout();
      }}
    />
  );
};
