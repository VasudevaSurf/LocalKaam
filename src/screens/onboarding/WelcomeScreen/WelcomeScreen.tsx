import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, ViewToken } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { styles } from './WelcomeScreen.styles';
import { Button } from '../../../components/ui/Button';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    icon: '🔍',
    title: 'Find Verified Skilled Workers',
    description:
      'Search electricians, plumbers & more near you with verified profiles',
  },
  {
    id: '2',
    icon: '🎬',
    title: 'Watch Their Work Videos',
    description:
      'See their skills before you hire them through real work demonstrations',
  },
  {
    id: '3',
    icon: '💰',
    title: 'Get Best Quotes',
    description:
      'Request service and receive competitive quotes from multiple workers',
  },
];

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('PhoneNumber');
    }
  };

  const handleSkip = () => {
    navigation.navigate('PhoneNumber');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { width }]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <Button
          title="Skip"
          variant="ghost"
          size="small"
          onPress={handleSkip}
          style={styles.skipButton}
        />
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Footer */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* Next/Get Started Button */}
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          variant="primary"
          size="large"
          onPress={handleNext}
          fullWidth
        />
      </View>
    </View>
  );
};

