import React from 'react';
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
import Video from 'react-native-video';
import { styles } from './ServiceCard.styles';
import { Badge } from '../../ui/Badge';
import { Avatar } from '../../ui/Avatar';

export interface ServiceCardProps {
  id: string;
  sellerName: string;
  sellerImage?: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
  verified?: boolean;
  online?: boolean;
  images?: string[];
  videoUrl?: string;
  isPlaying?: boolean;
  poster?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  sellerName,
  sellerImage,
  service,
  rating,
  reviewCount,
  distance,
  price,
  verified = false,
  online = false,
  images = [],
  videoUrl,
  isPlaying = false,
  poster,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Media Section */}
      <View style={styles.imageContainer}>
        {videoUrl ? (
          <Video
            source={{ uri: videoUrl }}
            style={styles.image}
            resizeMode="cover"
            repeat
            muted
            paused={!isPlaying}
            poster={poster || (images.length > 0 ? images[0] : undefined)}
            posterResizeMode="cover"
          />
        ) : images.length > 0 ? (
          <Image
            source={{ uri: images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
        {verified && (
          <View style={styles.verifiedBadge}>
            <Badge label="✓ Verified" variant="success" size="small" />
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Seller Info */}
        <View style={styles.sellerRow}>
          <Avatar
            source={sellerImage ? { uri: sellerImage } : undefined}
            name={sellerName}
            size="sm"
            badge={online ? <View style={styles.onlineBadge} /> : undefined}
          />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName} numberOfLines={1}>
              {sellerName}
            </Text>
            <Text style={styles.service} numberOfLines={1}>
              {service}
            </Text>
          </View>
        </View>

        {/* Rating & Distance */}
        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({reviewCount})</Text>
          </View>
          <Text style={styles.distance}>📍 {distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
