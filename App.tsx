import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { colors } from './src/theme';

// Onboarding Screens
import {
  SplashScreen,
  WelcomeScreen,
  LocationSetupScreen,
} from './src/screens/onboarding';

// Main App Container
import { MainApp } from './src/containers/MainApp';

// Request Screens
import {
  RequestServiceScreen,
  ActiveRequestScreen,
} from './src/screens/request';

// Worker Screens
import { WorkerProfileScreen } from './src/screens/worker';

// Booking Screens
import {
  BookingConfirmationScreen,
  PaymentSuccessScreen,
} from './src/screens/booking';

// Active Booking with OTP
import { ActiveBookingScreen } from './src/screens/bookings';

// Profile Screens
import {
  EditProfileScreen,
  SavedWorkersScreen,
  PaymentHistoryScreen,
  NotificationsScreen,
  SettingsScreen,
  HelpSupportScreen,
} from './src/screens/profile';

type AppScreen =
  | 'splash'
  | 'welcome'
  | 'locationSetup'
  | 'mainApp'
  | 'requestService'
  | 'activeRequest'
  | 'workerProfile'
  | 'bookingConfirmation'
  | 'activeBooking'
  | 'paymentSuccess'
  | 'editProfile'
  | 'savedWorkers'
  | 'paymentHistory'
  | 'notifications'
  | 'settings'
  | 'helpSupport';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [screenParams, setScreenParams] = useState<any>({});

  // Navigation helper
  const navigateTo = (screen: AppScreen, params?: any) => {
    setCurrentScreen(screen);
    setScreenParams(params || {});
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      // ============ ONBOARDING ============
      case 'splash':
        return <SplashScreen onComplete={() => navigateTo('welcome')} />;

      case 'welcome':
        return (
          <WelcomeScreen onGetStarted={() => navigateTo('locationSetup')} />
        );

      case 'locationSetup':
        return (
          <LocationSetupScreen
            onComplete={location => {
              console.log('Location set:', location);
              navigateTo('mainApp');
            }}
          />
        );

      // ============ MAIN APP (4 TABS) ============
      case 'mainApp':
        return (
          <MainApp
            // Post Service handlers
            onCreateRequest={() => navigateTo('requestService')}
            onViewRequest={requestId =>
              navigateTo('activeRequest', { requestId })
            }
            onLocationPress={() => navigateTo('locationSetup')}
            onNotificationPress={() => navigateTo('notifications')}
            // Browse handlers
            onWorkerPress={workerId =>
              navigateTo('workerProfile', { workerId })
            }
            // Bookings handlers
            onBookingPress={bookingId =>
              navigateTo('activeBooking', {
                bookingId,
                workerName: 'Rajesh Kumar',
                service: 'Electrician',
                location: 'Model Town, Ludhiana',
                scheduledDate: 'Nov 22, 2025',
                scheduledTime: '10:00 AM',
                amount: 2400,
                otp: '123456',
                status: 'in_progress',
                workerPhone: '98765-43210',
              })
            }
            onContactWorker={workerId => console.log('Contact:', workerId)}
            onLeaveReview={bookingId => console.log('Review:', bookingId)}
            onCancelBooking={bookingId => console.log('Cancel:', bookingId)}
            // Profile handlers
            onEditProfile={() => navigateTo('editProfile')}
            onSavedWorkers={() => navigateTo('savedWorkers')}
            onPaymentHistory={() => navigateTo('paymentHistory')}
            onReviews={() => console.log('Reviews')}
            onAddresses={() => console.log('Addresses')}
            onNotifications={() => navigateTo('notifications')}
            onSettings={() => navigateTo('settings')}
            onHelpSupport={() => navigateTo('helpSupport')}
            onAbout={() => console.log('About')}
            onPrivacyPolicy={() => console.log('Privacy')}
            onTermsConditions={() => console.log('Terms')}
            onLogout={() => navigateTo('welcome')}
          />
        );

      // ============ REQUEST FLOW ============
      case 'requestService':
        return (
          <RequestServiceScreen
            onRequestSubmit={request => {
              console.log('Request:', request);
              navigateTo('activeRequest', { requestId: '123' });
            }}
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'activeRequest':
        return (
          <ActiveRequestScreen
            requestId={screenParams.requestId}
            onAcceptQuote={quoteId => {
              console.log('Quote accepted:', quoteId);
              navigateTo('bookingConfirmation', {
                workerId: '1',
                workerName: 'Rajesh Kumar',
                service: 'Electrician',
                basePrice: '₹800',
              });
            }}
            onViewProfile={sellerId =>
              navigateTo('workerProfile', { workerId: sellerId })
            }
            onChat={sellerId => console.log('Chat:', sellerId)}
            onCancelRequest={() => navigateTo('mainApp')}
            onBack={() => navigateTo('mainApp')}
          />
        );

      // ============ WORKER PROFILE ============
      case 'workerProfile':
        return (
          <WorkerProfileScreen
            workerId={screenParams.workerId}
            onBack={() => navigateTo('mainApp')}
            onHireNow={() =>
              navigateTo('bookingConfirmation', {
                workerId: screenParams.workerId,
                workerName: 'Rajesh Kumar',
                service: 'Electrician',
                basePrice: '₹800',
              })
            }
            onSendMessage={() => console.log('Message')}
            onCall={() => console.log('Call')}
            onShare={() => console.log('Share')}
          />
        );

      // ============ BOOKING FLOW ============
      case 'bookingConfirmation':
        return (
          <BookingConfirmationScreen
            {...screenParams}
            onConfirmBooking={bookingDetails => {
              console.log('Booking:', bookingDetails);
              // Go directly to active booking with OTP
              navigateTo('activeBooking', {
                bookingId: '123',
                workerName: screenParams.workerName,
                workerPhone: '98765-43210',
                service: screenParams.service,
                location: 'Model Town, Ludhiana',
                scheduledDate: 'Nov 22, 2025',
                scheduledTime: '10:00 AM',
                amount: 2400,
                otp: '123456',
                status: 'confirmed',
              });
            }}
            onBack={() =>
              navigateTo('workerProfile', { workerId: screenParams.workerId })
            }
          />
        );

      // ============ ACTIVE BOOKING (with OTP like Rapido) ============
      case 'activeBooking':
        return (
          <ActiveBookingScreen
            {...screenParams}
            onCall={() => console.log('Call worker')}
            onChat={() => console.log('Chat worker')}
            onCancelBooking={() => navigateTo('mainApp')}
            onCompletePayment={() => {
              navigateTo('paymentSuccess', {
                bookingId: screenParams.bookingId,
                workerName: screenParams.workerName,
                service: screenParams.service,
                amount: screenParams.amount,
                date: 'Nov 22, 2025',
              });
            }}
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'paymentSuccess':
        return (
          <PaymentSuccessScreen
            {...screenParams}
            onDownloadReceipt={() => console.log('Download receipt')}
            onLeaveReview={() => console.log('Leave review')}
            onBackToHome={() => navigateTo('mainApp')}
            onViewBooking={() => navigateTo('mainApp')}
          />
        );

      // ============ PROFILE SCREENS ============
      case 'editProfile':
        return (
          <EditProfileScreen
            userName="Amit Singh"
            userPhone="+91 98765 43210"
            userEmail="amit.singh@example.com"
            onSave={data => {
              console.log('Profile updated:', data);
              navigateTo('mainApp');
            }}
            onChangePhoto={() => console.log('Change photo')}
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'savedWorkers':
        return (
          <SavedWorkersScreen
            onWorkerPress={workerId =>
              navigateTo('workerProfile', { workerId })
            }
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'paymentHistory':
        return (
          <PaymentHistoryScreen
            onPaymentPress={paymentId => console.log('Payment:', paymentId)}
            onDownloadReceipt={paymentId => console.log('Download:', paymentId)}
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            onNotificationPress={notificationId =>
              console.log('Notification:', notificationId)
            }
            onMarkAllRead={() => console.log('Mark all read')}
            onBack={() => navigateTo('mainApp')}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => navigateTo('mainApp')}
            onChangeLanguage={() => console.log('Change language')}
            onChangeLocation={() => navigateTo('locationSetup')}
            onManageBlockedWorkers={() => console.log('Blocked workers')}
            onClearCache={() => console.log('Clear cache')}
          />
        );

      case 'helpSupport':
        return <HelpSupportScreen onBack={() => navigateTo('mainApp')} />;

      default:
        return <SplashScreen onComplete={() => navigateTo('welcome')} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {renderScreen()}
    </>
  );
}

export default App;
