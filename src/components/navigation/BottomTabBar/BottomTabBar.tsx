import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { styles } from './BottomTabBar.styles';

export type TabRoute = 'home' | 'browse' | 'bookings' | 'profile';

export interface TabItem {
  key: TabRoute;
  icon: string;
  activeIcon: string;
  label: string;
  badge?: number;
}

export interface BottomTabBarProps {
  activeTab: TabRoute;
  onTabPress: (tab: TabRoute) => void;
}

const TABS: TabItem[] = [
  {
    key: 'home',
    icon: '📝',
    activeIcon: '📝',
    label: 'Post',
  },
  {
    key: 'browse',
    icon: '🔍',
    activeIcon: '🔍',
    label: 'Browse',
  },
  {
    key: 'bookings',
    icon: '📋',
    activeIcon: '📋',
    label: 'Bookings',
  },
  {
    key: 'profile',
    icon: '👤',
    activeIcon: '👤',
    label: 'Profile',
  },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, isActive && styles.iconActive]}>
                {isActive ? tab.activeIcon : tab.icon}
              </Text>
              {tab.badge && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
