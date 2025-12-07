import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BrowseServicesScreen as BrowseServicesScreenComponent } from './BrowseServicesScreen';

export const BrowseServicesScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <BrowseServicesScreenComponent
      onWorkerPress={(workerId: string, initialData?: any) =>
        navigation.navigate('VideoDetail', {
          videoData: initialData,
          initialWorkerData: initialData, // Pass same data for worker context
        })
      }
      onBack={() => navigation.goBack()}
    />
  );
};
