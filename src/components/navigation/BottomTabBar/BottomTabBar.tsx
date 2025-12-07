import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { styles } from './BottomTabBar.styles';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Map route names to icons
        let icon = '📝';
        let activeIcon = '📝';
        let badge = 0;

        switch (route.name) {
          case 'Home':
            icon = '📝';
            activeIcon = '📝';
            break;
          case 'Browse':
            icon = '🔍';
            activeIcon = '🔍';
            break;
          case 'Bookings':
            icon = '📋';
            activeIcon = '📋';
            break;
          case 'Profile':
            icon = '👤';
            activeIcon = '👤';
            break;
          case 'Reels':
            icon = '🎬';
            activeIcon = '🎬';
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, isFocused && styles.iconActive]}>
                {isFocused ? activeIcon : icon}
              </Text>
              {badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {badge > 9 ? '9+' : badge}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
