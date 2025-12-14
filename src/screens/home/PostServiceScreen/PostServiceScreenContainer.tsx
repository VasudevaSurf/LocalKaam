import React from 'react';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import { PostServiceScreen as PostServiceScreenComponent } from './PostServiceScreen';
import { useAuth } from '../../../context/AuthContext';
import * as api from '../../../services/api';

export const PostServiceScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const [activeRequests, setActiveRequests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchRequests = React.useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await api.getActiveRequest(user.id);
      // Determine if we need to show a list or single item
      // The API currently returns a single active request object or null
      // But UI expects an array
      if (data && data._id) {
        console.log(
          '[PostServiceContainer] Found active request, navigating:',
          data._id,
        );
        setActiveRequests([data]);
        // Auto-navigate to Active Request Screen
        navigation.navigate('ActiveRequest', { requestId: data._id });
      } else {
        setActiveRequests([]);
      }
    } catch (error) {
      console.error('Error fetching active requests:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, navigation]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRequests();
    }, [fetchRequests]),
  );

  return (
    <PostServiceScreenComponent
      onCreateRequest={() => navigation.navigate('RequestService')}
      onViewRequest={(requestId: string) =>
        navigation.navigate('ActiveRequest', { requestId })
      }
      onLocationPress={() => console.log('Location picker - Coming soon')}
      onNotificationPress={() => navigation.navigate('Notifications')}
      activeRequests={activeRequests}
      isLoading={loading}
      onRefresh={fetchRequests}
    />
  );
};
