// Service Types
export interface Service {
  id: string;
  name: string;
  icon: string;
  category: string;
}

// Seller Types
export interface Seller {
  id: string;
  name: string;
  profileImage?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  online: boolean;
  services: string[];
  distance: string;
  price: string;
  images: string[];
  bio?: string;
  experience?: string;
  completedJobs?: number;
}

// Quote Types
export interface Quote {
  id: string;
  sellerId: string;
  seller: Seller;
  quotedPrice: string;
  estimatedTime: string;
  message?: string;
  timestamp: Date;
}

// Request Types
export interface ServiceRequest {
  id: string;
  customerId: string;
  serviceType: string;
  description: string;
  location: string;
  scheduledDate?: Date;
  budget?: string;
  images?: string[];
  status:
    | 'pending'
    | 'quoted'
    | 'accepted'
    | 'in_progress'
    | 'completed'
    | 'cancelled';
  quotes: Quote[];
  createdAt: Date;
}

// Booking Types
export interface Booking {
  id: string;
  customerId: string;
  sellerId: string;
  seller: Seller;
  serviceType: string;
  description: string;
  agreedPrice: string;
  scheduledDate: Date;
  location: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'awaiting_confirmation' | 'confirmed';
  otp?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// Location Types
export interface Location {
  address: string;
  city: string;
  state: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
