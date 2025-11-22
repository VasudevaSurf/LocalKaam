import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { styles } from './HelpSupportScreen.styles';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Divider } from '../../../components/common/Divider';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded?: boolean;
}

const MOCK_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I book a worker?',
    answer:
      'You can book a worker in two ways:\n1. Post a service request and receive quotes from multiple workers\n2. Browse available workers and hire directly from their profile',
  },
  {
    id: '2',
    question: 'How does payment work?',
    answer:
      'All payments are made in cash directly to the worker after completion. You confirm payment via OTP for security.',
  },
  {
    id: '3',
    question: 'What is the OTP system?',
    answer:
      'After paying cash to the worker, you receive an OTP. Share this OTP with the worker who enters it in their app to confirm payment receipt.',
  },
  {
    id: '4',
    question: 'Can I cancel a booking?',
    answer:
      'Yes, you can cancel before the worker starts. After work begins, please contact the worker directly to discuss.',
  },
  {
    id: '5',
    question: 'How are workers verified?',
    answer:
      'Workers undergo verification including ID proof, skill assessment, and background checks before joining our platform.',
  },
  {
    id: '6',
    question: 'What if I face an issue with a worker?',
    answer:
      'Contact our support team immediately. We take all complaints seriously and will help resolve the issue.',
  },
];

export interface HelpSupportScreenProps {
  onBack: () => void;
}

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({
  onBack,
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleCall = () => {
    Linking.openURL('tel:+911234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@skillproof.com');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/911234567890');
  };

  const handleSubmitQuery = () => {
    if (message.trim()) {
      // Submit query logic
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Help & Support"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={onBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Options */}
        <Card style={styles.contactCard} elevation="md">
          <Text style={styles.cardTitle}>Get in Touch</Text>
          <Text style={styles.cardSubtitle}>
            Our support team is available 24/7 to help you
          </Text>

          <View style={styles.contactOptions}>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <View style={styles.contactIconContainer}>
                <Text style={styles.contactIcon}>📞</Text>
              </View>
              <Text style={styles.contactLabel}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleWhatsApp}
              activeOpacity={0.7}
            >
              <View style={styles.contactIconContainer}>
                <Text style={styles.contactIcon}>💬</Text>
              </View>
              <Text style={styles.contactLabel}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <View style={styles.contactIconContainer}>
                <Text style={styles.contactIcon}>📧</Text>
              </View>
              <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Card style={styles.faqCard}>
            {MOCK_FAQS.map((faq, index) => (
              <React.Fragment key={faq.id}>
                <TouchableOpacity
                  style={styles.faqItem}
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqQuestion}>
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <Text style={styles.faqToggle}>
                      {expandedFAQ === faq.id ? '−' : '+'}
                    </Text>
                  </View>
                  {expandedFAQ === faq.id && (
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  )}
                </TouchableOpacity>
                {index < MOCK_FAQS.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </View>

        {/* Submit Query */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Still Need Help?</Text>
          <Card style={styles.queryCard}>
            <Text style={styles.queryTitle}>Send us a message</Text>
            <Input
              placeholder="Describe your issue..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              style={styles.queryInput}
            />
            <Button
              title="Submit Query"
              variant="primary"
              size="medium"
              onPress={handleSubmitQuery}
              disabled={!message.trim()}
              fullWidth
            />
          </Card>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <Card style={styles.linksCard}>
            <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
              <Text style={styles.linkIcon}>📖</Text>
              <Text style={styles.linkText}>User Guide</Text>
              <Text style={styles.linkChevron}>›</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
              <Text style={styles.linkIcon}>💡</Text>
              <Text style={styles.linkText}>Safety Tips</Text>
              <Text style={styles.linkChevron}>›</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
              <Text style={styles.linkIcon}>📋</Text>
              <Text style={styles.linkText}>Terms of Service</Text>
              <Text style={styles.linkChevron}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
