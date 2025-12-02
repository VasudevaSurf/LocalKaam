import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

// Stacks
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';

// Feature Screens
import { RequestServiceScreen, ActiveRequestScreen } from '../screens/request';
import { WorkerProfileScreen } from '../screens/worker';
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
  const [checkingActiveRequest, setCheckingActiveRequest] = useState(true);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  // Check for active request when user is authenticated
  useEffect(() => {
    const checkForActiveRequest = async () => {
      if (user?.id && user.id !== 'temp_id' && isAuthenticated) {
        try {
          console.log('[AppNavigator] Checking for active request...');
          const request = await api.getActiveRequest(user.id);
          if (request && request._id) {
            console.log('[AppNavigator] Active request found:', request._id);
            setActiveRequestId(request._id);
          } else {
            console.log('[AppNavigator] No active request found');
          }
        } catch (error) {
          console.error('[AppNavigator] Error checking active request:', error);
        }
      }
      setCheckingActiveRequest(false);
    };

    if (isInitialized && !checkingActiveRequest) {
      setCheckingActiveRequest(true);
    }

    if (isInitialized) {
      checkForActiveRequest();
    }
  }, [user?.id, isAuthenticated, isInitialized]);

  if (!isInitialized || (isAuthenticated && checkingActiveRequest)) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
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
            {activeRequestId ? (
              // Show ActiveRequest as initial screen if there's an active request
              <>
                <Stack.Screen
                  name="ActiveRequest"
                  component={ActiveRequestScreen}
                  initialParams={{ requestId: activeRequestId }}
                />
                <Stack.Screen name="Main" component={MainTabNavigator} />
              </>
            ) : (
              // Show Main tabs as initial screen if no active request
              <>
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen
                  name="ActiveRequest"
                  component={ActiveRequestScreen}
                />
              </>
            )}

            {/* Feature Screens */}
            <Stack.Screen
              name="RequestService"
              component={RequestServiceScreen}
            />
            <Stack.Screen
              name="WorkerProfile"
              component={WorkerProfileScreen}
            />
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
