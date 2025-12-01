import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './SettingsScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Divider } from '../../../components/common/Divider';
import { Alert } from 'react-native';

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

interface SettingOption {
  id: string;
  label: string;
  description?: string;
  value: string;
  onPress: () => void;
}

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleChangeLanguage = () => {
    Alert.alert('Language', 'Language selection coming soon');
  };

  const handleChangeLocation = () => {
    // navigation.navigate('LocationSetup');
    Alert.alert('Location', 'Location settings coming soon');
  };

  const handleManageBlockedWorkers = () => {
    Alert.alert('Blocked Workers', 'Blocked workers list coming soon');
  };

  const handleClearCache = () => {
    Alert.alert('Success', 'Cache cleared successfully');
  };
  // Notification Settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [promotions, setPromotions] = useState(false);

  // Privacy Settings
  const [showProfile, setShowProfile] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  // App Settings
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);

  const notificationSettings: SettingToggle[] = [
    {
      id: 'push',
      label: 'Push Notifications',
      description: 'Receive notifications on your device',
      value: pushNotifications,
      onToggle: setPushNotifications,
    },
    {
      id: 'booking',
      label: 'Booking Updates',
      description: 'Get notified about booking status',
      value: bookingUpdates,
      onToggle: setBookingUpdates,
    },
    {
      id: 'payment',
      label: 'Payment Alerts',
      description: 'Alerts for payment confirmations',
      value: paymentAlerts,
      onToggle: setPaymentAlerts,
    },
    {
      id: 'messages',
      label: 'New Messages',
      description: 'Notifications for chat messages',
      value: newMessages,
      onToggle: setNewMessages,
    },
    {
      id: 'promotions',
      label: 'Promotions & Offers',
      description: 'Updates about deals and offers',
      value: promotions,
      onToggle: setPromotions,
    },
  ];

  const privacySettings: SettingToggle[] = [
    {
      id: 'profile',
      label: 'Show Profile to Workers',
      description: 'Workers can see your profile details',
      value: showProfile,
      onToggle: setShowProfile,
    },
    {
      id: 'reviews',
      label: 'Public Reviews',
      description: 'Your reviews are visible to others',
      value: showReviews,
      onToggle: setShowReviews,
    },
  ];

  const appSettings: SettingToggle[] = [
    {
      id: 'autoplay',
      label: 'Auto-play Skill Videos',
      description: 'Videos play automatically when scrolling',
      value: autoPlayVideos,
      onToggle: setAutoPlayVideos,
    },
    {
      id: 'datasaver',
      label: 'Data Saver Mode',
      description: 'Reduce data usage',
      value: dataSaver,
      onToggle: setDataSaver,
    },
  ];

  const preferenceOptions: SettingOption[] = [
    {
      id: 'language',
      label: 'Language',
      description: 'English',
      value: 'English',
      onPress: handleChangeLanguage,
    },
    {
      id: 'location',
      label: 'Default Location',
      description: 'Model Town, Ludhiana',
      value: 'Model Town, Ludhiana',
      onPress: handleChangeLocation,
    },
  ];

  const renderToggleSetting = (setting: SettingToggle) => (
    <View key={setting.id} style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingLabel}>{setting.label}</Text>
        <Text style={styles.settingDescription}>{setting.description}</Text>
      </View>
      <Switch
        value={setting.value}
        onValueChange={setting.onToggle}
        trackColor={{ false: colors.gray[300], true: colors.primary + '50' }}
        thumbColor={setting.value ? colors.primary : colors.white}
      />
    </View>
  );

  const renderOptionSetting = (option: SettingOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.settingRow}
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingLabel}>{option.label}</Text>
        {option.description && (
          <Text style={styles.settingValue}>{option.description}</Text>
        )}
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Settings"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <Card style={styles.settingsCard}>
            {notificationSettings.map((setting, index) => (
              <React.Fragment key={setting.id}>
                {renderToggleSetting(setting)}
                {index < notificationSettings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Privacy</Text>
          <Card style={styles.settingsCard}>
            {privacySettings.map((setting, index) => (
              <React.Fragment key={setting.id}>
                {renderToggleSetting(setting)}
                {index < privacySettings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Preferences</Text>
          <Card style={styles.settingsCard}>
            {preferenceOptions.map((option, index) => (
              <React.Fragment key={option.id}>
                {renderOptionSetting(option)}
                {index < preferenceOptions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 App Settings</Text>
          <Card style={styles.settingsCard}>
            {appSettings.map((setting, index) => (
              <React.Fragment key={setting.id}>
                {renderToggleSetting(setting)}
                {index < appSettings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Account Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Account Management</Text>
          <Card style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleManageBlockedWorkers}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingLabel}>Blocked Workers</Text>
                <Text style={styles.settingDescription}>
                  Manage blocked workers
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleClearCache}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingLabel}>Clear Cache</Text>
                <Text style={styles.settingDescription}>
                  Free up storage space
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Card style={[styles.settingsCard, styles.dangerCard]}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <Text style={[styles.settingLabel, styles.dangerText]}>
                  Delete Account
                </Text>
                <Text style={styles.settingDescription}>
                  Permanently delete your account
                </Text>
              </View>
              <Text style={[styles.chevron, styles.dangerText]}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
