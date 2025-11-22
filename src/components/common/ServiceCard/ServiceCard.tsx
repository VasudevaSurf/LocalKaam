import React from 'react';
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
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
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image Section */}
      {images.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          {verified && (
            <View style={styles.verifiedBadge}>
              <Badge label="✓ Verified" variant="success" size="small" />
            </View>
          )}
        </View>
      )}

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

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
