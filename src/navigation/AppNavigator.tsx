import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuth } from '../context/AuthContext';

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

  if (!isInitialized) {
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
            <Stack.Screen name="Main" component={MainTabNavigator} />

            {/* Feature Screens */}
            <Stack.Screen
              name="RequestService"
              component={RequestServiceScreen}
            />
            <Stack.Screen
              name="ActiveRequest"
              component={ActiveRequestScreen}
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
