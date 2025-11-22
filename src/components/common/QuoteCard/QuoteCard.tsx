import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './QuoteCard.styles';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export interface QuoteCardProps {
  id: string;
  sellerName: string;
  sellerImage?: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: string;
  quotedPrice: string;
  estimatedTime: string;
  verified?: boolean;
  message?: string;
  onAccept?: () => void;
  onViewProfile?: () => void;
  onChat?: () => void;
  style?: ViewStyle;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  id,
  sellerName,
  sellerImage,
  service,
  rating,
  reviewCount,
  distance,
  quotedPrice,
  estimatedTime,
  verified = false,
  message,
  onAccept,
  onViewProfile,
  onChat,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar
          source={sellerImage ? { uri: sellerImage } : undefined}
          name={sellerName}
          size="md"
        />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.sellerName} numberOfLines={1}>
              {sellerName}
            </Text>
            {verified && (
              <View style={styles.verifiedIcon}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.service} numberOfLines={1}>
            {service}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({reviewCount})</Text>
            </View>
            <Text style={styles.distance}>• {distance}</Text>
          </View>
        </View>
      </View>

      {/* Message */}
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
        </View>
      )}

      {/* Quote Details */}
      <View style={styles.quoteDetails}>
        <View style={styles.quoteItem}>
          <Text style={styles.quoteLabel}>Quoted Price</Text>
          <Text style={styles.quotePrice}>{quotedPrice}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quoteItem}>
          <Text style={styles.quoteLabel}>Est. Time</Text>
          <Text style={styles.quoteTime}>{estimatedTime}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="View Profile"
          variant="outline"
          size="small"
          onPress={onViewProfile}
          style={styles.actionButton}
        />
        <Button
          title="💬"
          variant="ghost"
          size="small"
          onPress={onChat}
          style={styles.chatButton}
        />
        <Button
          title="Accept"
          variant="primary"
          size="small"
          onPress={onAccept}
          style={styles.acceptButton}
        />
      </View>
    </View>
  );
};
