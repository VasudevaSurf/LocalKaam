import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { BottomTabBar } from '../components/navigation/BottomTabBar';

// Screens
import { PostServiceScreen } from '../screens/home/PostServiceScreen';
import { BrowseServicesScreen } from '../screens/browse/BrowseServicesScreen';
import { MyBookingsScreen } from '../screens/bookings/MyBookingsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={PostServiceScreen} />
      <Tab.Screen name="Browse" component={BrowseServicesScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
