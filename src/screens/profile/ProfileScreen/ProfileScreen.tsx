import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './ProfileScreen.styles';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Divider } from '../../../components/common/Divider';
import { spacing } from '../../../theme';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  subtitle?: string;
  badge?: number;
  onPress: () => void;
}

export interface ProfileScreenProps {
  userName: string;
  userPhone: string;
  userEmail?: string;
  userImage?: string;
  memberSince: string;
  totalBookings: number;
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

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  userPhone,
  userEmail,
  userImage,
  memberSince,
  totalBookings,
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
  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <View style={styles.menuContent}>
          <Text style={styles.menuLabel}>{item.label}</Text>
          {item.subtitle && (
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {item.badge && item.badge > 0 && (
          <Badge
            label={item.badge.toString()}
            variant="error"
            size="small"
            style={styles.menuBadge}
          />
        )}
        <Text style={styles.menuChevron}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const accountMenuItems: MenuItem[] = [
    {
      id: 'saved',
      icon: '❤️',
      label: 'Saved Workers',
      subtitle: 'Your favorite workers',
      onPress: onSavedWorkers,
    },
    {
      id: 'payment',
      icon: '💳',
      label: 'Payment History',
      subtitle: 'View all transactions',
      onPress: onPaymentHistory,
    },
    {
      id: 'reviews',
      icon: '⭐',
      label: 'My Reviews',
      subtitle: 'Reviews you have given',
      onPress: onReviews,
    },
    {
      id: 'addresses',
      icon: '📍',
      label: 'Saved Addresses',
      subtitle: 'Manage your addresses',
      onPress: onAddresses,
    },
  ];

  const appMenuItems: MenuItem[] = [
    {
      id: 'notifications',
      icon: '🔔',
      label: 'Notifications',
      subtitle: 'Manage notifications',
      badge: 3,
      onPress: onNotifications,
    },
    {
      id: 'settings',
      icon: '⚙️',
      label: 'Settings',
      subtitle: 'App preferences',
      onPress: onSettings,
    },
    {
      id: 'help',
      icon: '❓',
      label: 'Help & Support',
      subtitle: 'Get help',
      onPress: onHelpSupport,
    },
  ];

  const legalMenuItems: MenuItem[] = [
    {
      id: 'about',
      icon: 'ℹ️',
      label: 'About SkillProof',
      onPress: onAbout,
    },
    {
      id: 'privacy',
      icon: '🔒',
      label: 'Privacy Policy',
      onPress: onPrivacyPolicy,
    },
    {
      id: 'terms',
      icon: '📄',
      label: 'Terms & Conditions',
      onPress: onTermsConditions,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card style={styles.profileCard} elevation="md">
          <View style={styles.profileHeader}>
            <Avatar
              source={userImage ? { uri: userImage } : undefined}
              name={userName}
              size="xl"
            />
            <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPhone}>{userPhone}</Text>
          {userEmail && <Text style={styles.userEmail}>{userEmail}</Text>}

          <View style={styles.memberInfo}>
            <Text style={styles.memberText}>Member since {memberSince}</Text>
          </View>

          <Divider marginVertical={spacing.lg} />

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalBookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>
        </Card>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card style={styles.menuCard}>
            {accountMenuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item)}
                {index < accountMenuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Card style={styles.menuCard}>
            {appMenuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item)}
                {index < appMenuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Legal & About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & About</Text>
          <Card style={styles.menuCard}>
            {legalMenuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item)}
                {index < legalMenuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
