import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { colors, typography, borderRadius } from '../../../theme';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';

const { width, height } = Dimensions.get('window');

type VideoDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VideoDetail'
>;

type VideoDetailScreenRouteProp = RouteProp<RootStackParamList, 'VideoDetail'>;

export const VideoDetailScreen: React.FC = () => {
  const navigation = useNavigation<VideoDetailScreenNavigationProp>();
  const route = useRoute<VideoDetailScreenRouteProp>();
  const { videoData, initialWorkerData } = route.params;

  const [paused, setPaused] = useState(false);

  // Worker Data structure from videoData or passed initialWorkerData
  const workerSource = initialWorkerData?.userId || videoData.userId;

  // Handle both populated object and string ID cases
  const workerId =
    typeof workerSource === 'string' ? workerSource : workerSource?._id;

  const workerName =
    typeof workerSource === 'object' ? workerSource?.name : 'Worker';

  const workerImage =
    typeof workerSource === 'object' ? workerSource?.profileImage : undefined;

  const handleProfilePress = () => {
    setPaused(true); // Pause when leaving
    navigation.navigate('WorkerProfile', {
      workerId: workerId,
      initialData: initialWorkerData || videoData, // Pass data for instant render
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Full Screen Video */}
      <Video
        source={{ uri: videoData.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={paused}
        poster={videoData.thumbnailUrl}
        posterResizeMode="cover"
        onBuffer={() => {}}
        onError={e => console.log('Video Error:', e)}
      />

      {/* Top Bar */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bottom Content Overlay */}
      <View style={styles.bottomOverlay}>
        <View style={styles.contentContainer}>
          {/* Video Info */}
          <Text style={styles.videoTitle}>
            {videoData.title || 'Work Video'}
          </Text>
          <Text style={styles.videoDescription}>
            {videoData.description || 'Professional work showcase'}
          </Text>

          {/* Worker Mini Card */}
          <TouchableOpacity
            style={styles.workerCard}
            onPress={handleProfilePress}
            activeOpacity={0.9}
          >
            <View style={styles.workerInfo}>
              <Avatar
                source={workerImage ? { uri: workerImage } : undefined}
                name={workerName}
                size="md"
              />
              <View style={styles.workerText}>
                <Text style={styles.workerName}>{workerName}</Text>
                <Text style={styles.viewProfileText}>
                  View Profile & Reviews ›
                </Text>
              </View>
            </View>
            <Button
              title="Hire"
              size="small"
              onPress={handleProfilePress} // Or direct hire action
              style={styles.hireButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingHorizontal: 16,
    // Gradient effect could be added here
  },
  contentContainer: {
    paddingBottom: 20,
  },
  videoTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  videoDescription: {
    color: '#EEE',
    fontSize: 14,
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  workerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.lg,
    padding: 12,
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerText: {
    marginLeft: 12,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  viewProfileText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  hireButton: {
    paddingHorizontal: 20,
  },
});
