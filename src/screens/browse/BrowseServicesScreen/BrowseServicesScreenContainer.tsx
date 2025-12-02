import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BrowseServicesScreen as BrowseServicesScreenComponent } from './BrowseServicesScreen';

export const BrowseServicesScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <BrowseServicesScreenComponent
      onWorkerPress={(workerId: string) =>
        navigation.navigate('WorkerProfile', { workerId })
      }
      onBack={() => navigation.goBack()}
    />
  );
};
