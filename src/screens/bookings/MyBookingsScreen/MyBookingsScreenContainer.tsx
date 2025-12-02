import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MyBookingsScreen as MyBookingsScreenComponent } from './MyBookingsScreen';

export const MyBookingsScreenContainer: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <MyBookingsScreenComponent
      onBookingPress={(bookingId: string) =>
        navigation.navigate('ActiveBooking', { bookingId })
      }
      onContactWorker={(workerId: string) =>
        console.log('Contact worker:', workerId)
      }
      onLeaveReview={(bookingId: string) =>
        console.log('Leave review:', bookingId)
      }
      onCancelBooking={(bookingId: string) =>
        console.log('Cancel booking:', bookingId)
      }
      onBack={() => navigation.goBack()}
    />
  );
};
