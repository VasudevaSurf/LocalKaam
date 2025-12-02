import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PostServiceScreen as PostServiceScreenComponent } from './PostServiceScreen';

export const PostServiceScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <PostServiceScreenComponent
      onCreateRequest={() => navigation.navigate('RequestService')}
      onViewRequest={(requestId: string) =>
        navigation.navigate('ActiveRequest', { requestId })
      }
      onLocationPress={() => console.log('Location picker - Coming soon')}
      onNotificationPress={() => navigation.navigate('Notifications')}
    />
  );
};
