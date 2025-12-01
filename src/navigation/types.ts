export type AuthStackParamList = {
  Welcome: undefined;
  PhoneNumber: undefined;
  OTPVerification: { phoneNumber: string; confirmation: any };
};

export type MainTabParamList = {
  Home: undefined;
  Browse: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  CustomerProfileSetup: undefined;
  LocationSetup: { name: string; bio: string; profileImage?: string };

  // Feature Screens
  RequestService: undefined;
  ActiveRequest: { requestId: string };
  WorkerProfile: { workerId: string };
  BookingConfirmation: {
    workerId: string;
    workerName: string;
    service: string;
    basePrice: string;
  };
  ActiveBooking: {
    bookingId: string;
    workerName: string;
    workerPhone: string;
    service: string;
    location: string;
    scheduledDate: string;
    scheduledTime: string;
    amount: number;
    otp: string;
    status: string;
  };
  PaymentSuccess: {
    bookingId: string;
    workerName: string;
    service: string;
    amount: number;
    date: string;
  };
  EditProfile: undefined;
  SavedWorkers: undefined;
  PaymentHistory: undefined;
  Notifications: undefined;
  Settings: undefined;
  HelpSupport: undefined;
};
