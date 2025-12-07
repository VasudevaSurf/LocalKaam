import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import * as api from '../../../services/api';
import { colors, borderRadius } from '../../../theme';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';

const { width, height } = Dimensions.get('window');

// Height for bottom tab bar adjustment (approx)
const TAB_BAR_HEIGHT = 49;
const SCREEN_HEIGHT = height - TAB_BAR_HEIGHT;

type ReelsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ReelsScreen: React.FC = () => {
  const navigation = useNavigation<ReelsScreenNavigationProp>();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const [isScreenFocused, setIsScreenFocused] = useState(true);

  // Manage focus state
  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);
      return () => setIsScreenFocused(false);
    }, []),
  );

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await api.getAllWorkVideos();
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentViewableItemIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80, // High threshold for full screen
  }).current;

  const handleProfilePress = (video: any) => {
    const worker = video.userId || {};
    // Use VideoDetail logic for consistency -> Go to Profile
    navigation.navigate('WorkerProfile', {
      workerId: worker._id,
      initialData: video,
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isFocused = index === currentViewableItemIndex;
    const shouldPlay = isFocused && isScreenFocused;

    return (
      <View style={styles.itemContainer}>
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={!shouldPlay}
          poster={item.thumbnailUrl}
          posterResizeMode="cover"
          // Optimization: only render video component if close to viewport
          // but FlatList windowSize usually handles this
        />

        {/* Overlay Content */}
        <View style={styles.overlay}>
          <View style={styles.workerContainer}>
            <TouchableOpacity
              style={styles.workerInfo}
              onPress={() => handleProfilePress(item)}
              activeOpacity={0.8}
            >
              <Avatar
                source={
                  item.userId?.profileImage
                    ? { uri: item.userId.profileImage }
                    : undefined
                }
                name={item.userId?.name || 'Worker'}
                size="md"
                style={{ borderWidth: 2, borderColor: '#FFF' }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.workerName}>
                  {item.userId?.name || 'Worker'}
                </Text>
                <Text style={styles.videoDescription} numberOfLines={2}>
                  {item.title || item.description || 'Professional Work'}
                </Text>
              </View>
            </TouchableOpacity>

            <Button
              title="Hire"
              size="small"
              variant="primary"
              onPress={() => handleProfilePress(item)}
              style={styles.hireButton}
            />
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={isScreenFocused} />
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  itemContainer: {
    width: width,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 20, // Push up slightly from bottom
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    // Gradient background could be added here for better text visibility
  },
  workerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  workerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  videoDescription: {
    color: '#EEE',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  hireButton: {
    paddingHorizontal: 20,
    minWidth: 80,
  },
});
