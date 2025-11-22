export type RootStackParamList = {
  // Onboarding
  Splash: undefined;
  Welcome: undefined;
  ServiceSelection: undefined;
  LocationSetup: undefined;

  // Main App
  Home: undefined;

  // Request Flow
  RequestService: undefined;
  ActiveRequest: {
    requestId: string;
  };

  // Browse Flow
  BrowseServices: undefined;
  WorkerProfile: {
    workerId: string;
  };

  // Booking Flow
  BookingConfirmation: {
    workerId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    basePrice: string;
  };
  PaymentOTP: {
    bookingId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    amount: number;
    workerPhone: string;
  };
  PaymentSuccess: {
    bookingId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    amount: number;
    date: string;
  };

  // Bookings
  MyBookings: undefined;
};

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ServiceSelection: undefined;
  LocationSetup: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  RequestService: undefined;
  ActiveRequest: { requestId: string };
  BrowseServices: undefined;
  WorkerProfile: { workerId: string };
  BookingConfirmation: {
    workerId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    basePrice: string;
  };
  PaymentOTP: {
    bookingId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    amount: number;
    workerPhone: string;
  };
  PaymentSuccess: {
    bookingId: string;
    workerName: string;
    workerImage?: string;
    service: string;
    amount: number;
    date: string;
  };
  MyBookings: undefined;
};
