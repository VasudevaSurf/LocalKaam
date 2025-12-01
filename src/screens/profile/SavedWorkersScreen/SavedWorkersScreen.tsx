import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './SavedWorkersScreen.styles';
import { Header } from '../../../components/common/Header';
import { ServiceCard } from '../../../components/common/ServiceCard';
import { EmptyState } from '../../../components/common/EmptyState';

const MOCK_SAVED_WORKERS = [
  {
    id: '1',
    sellerName: 'Rajesh Kumar',
    sellerImage: '',
    service: 'Electrician',
    rating: 4.8,
    reviewCount: 156,
    distance: '2.5 km',
    price: '₹800/day',
    verified: true,
    online: true,
    images: ['https://picsum.photos/400/300?random=1'],
  },
  {
    id: '2',
    sellerName: 'Amit Singh',
    sellerImage: '',
    service: 'Plumber',
    rating: 4.6,
    reviewCount: 98,
    distance: '3.2 km',
    price: '₹700/day',
    verified: true,
    online: false,
    images: ['https://picsum.photos/400/300?random=2'],
  },
];

type SavedWorkersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SavedWorkers'
>;

export const SavedWorkersScreen: React.FC = () => {
  const navigation = useNavigation<SavedWorkersScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Saved Workers"
        subtitle={`${MOCK_SAVED_WORKERS.length} workers`}
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <FlatList
        data={MOCK_SAVED_WORKERS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            {...item}
            onPress={() =>
              navigation.navigate('WorkerProfile', { workerId: item.id })
            }
            style={styles.workerCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="❤️"
            title="No saved workers"
            description="Save your favorite workers to access them quickly"
          />
        }
      />
    </SafeAreaView>
  );
};
