import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import NotificationService from '../services/NotificationService';

// Stacks
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';

// Feature Screens
import { RequestServiceScreen, ActiveRequestScreen } from '../screens/request';
import { WorkerProfileScreen } from '../screens/worker';
import { VideoDetailScreen } from '../screens/browse/VideoDetailScreen/VideoDetailScreen';
import {
  BookingConfirmationScreen,
  PaymentSuccessScreen,
} from '../screens/booking';
import { ActiveBookingScreen } from '../screens/bookings';
import {
  EditProfileScreen,
  SavedWorkersScreen,
  PaymentHistoryScreen,
  NotificationsScreen,
  SettingsScreen,
  HelpSupportScreen,
} from '../screens/profile';
import { SplashScreen, LocationSetupScreen } from '../screens/onboarding';
import { CustomerProfileSetupScreen } from '../screens/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isInitialized, user } = useAuth();
  // Notification Handling
  const navigationRef = React.useRef<any>(null);
  const [pendingNotification, setPendingNotification] = useState<any>(null);

  // 1. Check Initial Notification (Quit State) ON MOUNT
  useEffect(() => {
    // Force explicit channel creation to ensure customer_alerts_v1 is registered
    NotificationService.createDefaultChannel();

    NotificationService.checkInitialNotification(remoteMessage => {
      console.log(
        '[AppNavigator] Queuing initial notification:',
        remoteMessage,
      );
      setPendingNotification(remoteMessage);
    });
  }, []);

  // 2. Handle Notification Navigation (Foreground/Background/Pending)
  useEffect(() => {
    if (!isAuthenticated || !isInitialized) return;

    const handleNotification = (remoteMessage: any) => {
      console.log('[AppNavigator] Handling notification:', remoteMessage);
      const { requestId, type } = remoteMessage.data || {};

      if (
        (type === 'NEW_QUOTE' ||
          type === 'JOB_COMPLETED' ||
          type === 'JOB_CANCELLED_WORKER') &&
        requestId &&
        navigationRef.current
      ) {
        // Navigate to Active Request Screen which shows quotes
        navigationRef.current?.navigate('ActiveRequest', {
          requestId: requestId,
        });
      }
    };

    // Process Pending Notification if any
    if (pendingNotification) {
      console.log('[AppNavigator] Processing pending notification');
      handleNotification(pendingNotification);
      setPendingNotification(null);
    }

    // 2. Background State
    const unsubscribeBackground =
      NotificationService.onNotificationOpenedApp(handleNotification);

    // 3. Foreground State
    const unsubscribeForeground =
      NotificationService.setupForegroundHandler(handleNotification);

    return () => {
      unsubscribeBackground();
      unsubscribeForeground();
    };
  }, [isAuthenticated, isInitialized, pendingNotification]);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : !user?.name || !user?.roles?.includes('customer') ? (
          <Stack.Screen
            name="CustomerProfileSetup"
            component={CustomerProfileSetupScreen}
          />
        ) : !user?.city?.name ? (
          <Stack.Screen
            name="LocationSetup"
            component={LocationSetupScreen}
            initialParams={{
              name: user.name,
              bio: (user as any).bio,
              profileImage: user.profileImage,
            }}
          />
        ) : (
          <>
            {/* Main Application Flow */}
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="ActiveRequest"
              component={ActiveRequestScreen}
            />

            {/* Feature Screens */}
            <Stack.Screen
              name="RequestService"
              component={RequestServiceScreen}
            />
            <Stack.Screen
              name="WorkerProfile"
              component={WorkerProfileScreen}
            />
            <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
            <Stack.Screen
              name="BookingConfirmation"
              component={BookingConfirmationScreen}
            />
            <Stack.Screen
              name="ActiveBooking"
              component={ActiveBookingScreen}
            />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
            />

            {/* Profile Screens */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="SavedWorkers" component={SavedWorkersScreen} />
            <Stack.Screen
              name="PaymentHistory"
              component={PaymentHistoryScreen}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
