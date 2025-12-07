import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { BottomTabBar } from '../components/navigation/BottomTabBar';

// Container Screens (with navigation logic)
import { PostServiceScreenContainer } from '../screens/home/PostServiceScreen/PostServiceScreenContainer';
import { BrowseServicesScreenContainer } from '../screens/browse/BrowseServicesScreen/BrowseServicesScreenContainer';
import { MyBookingsScreenContainer } from '../screens/bookings/MyBookingsScreen/MyBookingsScreenContainer';
import { ProfileScreenContainer } from '../screens/profile/ProfileScreen/ProfileScreenContainer';
import { ReelsScreen } from '../screens/reels/ReelsScreen/ReelsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={PostServiceScreenContainer} />
      <Tab.Screen name="Browse" component={BrowseServicesScreenContainer} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreenContainer} />
      <Tab.Screen name="Profile" component={ProfileScreenContainer} />
    </Tab.Navigator>
  );
};
