import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './PaymentSuccessScreen.styles';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Divider } from '../../../components/common/Divider';
import { spacing } from '../../../theme';

export interface PaymentSuccessScreenProps {
  bookingId: string;
  workerName: string;
  workerImage?: string;
  service: string;
  amount: number;
  date: string;
  onDownloadReceipt: () => void;
  onLeaveReview: () => void;
  onBackToHome: () => void;
  onViewBooking: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  bookingId,
  workerName,
  workerImage,
  service,
  amount,
  date,
  onDownloadReceipt,
  onLeaveReview,
  onBackToHome,
  onViewBooking,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Payment Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your payment has been successfully confirmed
        </Text>

        {/* Booking Details Card */}
        <Card style={styles.detailsCard}>
          <View style={styles.workerHeader}>
            <Avatar
              source={workerImage ? { uri: workerImage } : undefined}
              name={workerName}
              size="md"
            />
            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{workerName}</Text>
              <Text style={styles.workerService}>{service}</Text>
            </View>
          </View>

          <Divider marginVertical={spacing.lg} />

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>#{bookingId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>✓ Confirmed</Text>
              </View>
            </View>

            <Divider marginVertical={spacing.md} />

            <View style={styles.detailRow}>
              <Text style={styles.amountLabel}>Amount Paid</Text>
              <Text style={styles.amountValue}>₹{amount.toLocaleString()}</Text>
            </View>
          </View>
        </Card>

        {/* Payment Method Info */}
        <Card style={styles.paymentMethodCard} elevation="none">
          <View style={styles.paymentMethodRow}>
            <Text style={styles.paymentIcon}>💵</Text>
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodLabel}>Payment Method</Text>
              <Text style={styles.paymentMethodValue}>
                Cash Payment (OTP Verified)
              </Text>
            </View>
          </View>
        </Card>

        {/* Receipt Info */}
        <Card style={styles.receiptCard} elevation="none">
          <Text style={styles.receiptIcon}>📄</Text>
          <View style={styles.receiptInfo}>
            <Text style={styles.receiptTitle}>Digital Receipt</Text>
            <Text style={styles.receiptText}>
              Your payment receipt has been generated and is available for
              download
            </Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Button
            title="📥 Download Receipt"
            variant="outline"
            size="large"
            onPress={onDownloadReceipt}
            fullWidth
          />

          <Button
            title="⭐ Leave a Review"
            variant="secondary"
            size="large"
            onPress={onLeaveReview}
            fullWidth
          />

          <Button
            title="View Booking Details"
            variant="ghost"
            size="medium"
            onPress={onViewBooking}
            fullWidth
          />
        </View>

        {/* Thank You Message */}
        <Card style={styles.thankYouCard} elevation="none">
          <Text style={styles.thankYouIcon}>🎉</Text>
          <View style={styles.thankYouContent}>
            <Text style={styles.thankYouTitle}>Thank You!</Text>
            <Text style={styles.thankYouText}>
              Thank you for using SkillProof. We hope you had a great experience
              with {workerName}.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <Button
          title="Back to Home"
          variant="primary"
          size="large"
          onPress={onBackToHome}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
