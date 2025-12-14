import axios from 'axios';
import { getAuth, getIdToken } from '@react-native-firebase/auth';

// Use the same IP as LocalKaamWorker
// Use the same IP as LocalKaamWorker
const API_URL = 'https://localkaamserver-lpvt.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Firebase Auth token
api.interceptors.request.use(
  async config => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await getIdToken(user, true);
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      config.params || '',
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getProfile = async (phoneNumber: string) => {
  try {
    const encodedPhone = encodeURIComponent(phoneNumber);
    const response = await api.get(
      `/profile?phoneNumber=${encodedPhone}&type=customer`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Return null to allow fallback/creation logic in AuthContext
    return null;
  }
};

export const getWorkerById = async (workerId: string) => {
  try {
    const response = await api.get(`/profile/${workerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching worker by ID:', error);
    return null;
  }
};

export const updateProfile = async (userData: any) => {
  try {
    const response = await api.post('/profile', {
      ...userData,
      userType: 'customer', // Enforce customer type
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadImage = async (imageUri: string, phoneNumber: string) => {
  try {
    console.log('[API] Uploading image:', imageUri, 'for', phoneNumber);
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `profile_${phoneNumber}.jpg`,
    } as any);
    formData.append('phoneNumber', phoneNumber);
    formData.append('userType', 'customer');

    // Get token manually since we are bypassing the interceptor
    const auth = getAuth();
    const user = auth.currentUser;
    const token = user ? await getIdToken(user, true) : null;

    // Use a fresh axios call to avoid default Content-Type: application/json
    const response = await axios.post(
      `${API_URL}/profile/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Get work videos for a worker (for customer app)
export const getWorkerVideos = async (userId: string) => {
  try {
    const response = await api.get(`/work-videos/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching worker videos:', error);
    return [];
  }
};

// Get ALL work videos for browse feed
export const getAllWorkVideos = async () => {
  try {
    const response = await api.get('/work-videos');
    return response.data;
  } catch (error) {
    console.error('Error fetching all work videos:', error);
    return [];
  }
};

// Service Request APIs
export const createServiceRequest = async (requestData: {
  serviceType: string;
  description: string;
  location: any; // String or Object
  budget: number;
  urgency: string;
  scheduledDate?: Date;
}) => {
  try {
    const response = await api.post('/service-requests', requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating service request:', error);
    throw error;
  }
};

export const getMyServiceRequests = async (customerId: string) => {
  try {
    const response = await api.get(`/service-requests/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return [];
  }
};

export const getServiceRequest = async (requestId: string) => {
  try {
    const response = await api.get(`/service-requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service request:', error);
    throw error;
  }
};

export const getRequestQuotes = async (requestId: string) => {
  try {
    const response = await api.get(`/quotes/request/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching request quotes:', error);
    return [];
  }
};

export const updateServiceRequest = async (
  requestId: string,
  updates: { status?: string; quotesCount?: number },
) => {
  try {
    const response = await api.patch(`/service-requests/${requestId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating service request:', error);
    throw error;
  }
};

export const cancelServiceRequest = async (requestId: string) => {
  try {
    const response = await api.delete(`/service-requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling service request:', error);
    throw error;
  }
};

export const getActiveRequest = async (customerId: string) => {
  try {
    const response = await api.get(`/service-requests/active/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching active request:', error);
    return null; // Return null if no active request or error
  }
};

export const acceptQuote = async (quoteId: string) => {
  try {
    const response = await api.post(`/quotes/${quoteId}/accept`);
    return response.data;
  } catch (error) {
    console.error('Error accepting quote:', error);
    throw error;
  }
};

// Rate Worker
// Rate Worker
export const rateWorker = async (
  workerId: string,
  rating: number,
  customerId?: string,
  requestId?: string,
) => {
  try {
    const response = await api.post('/profile/rate', {
      workerId,
      rating,
      customerId,
      requestId,
    });
    return response.data;
  } catch (error) {
    console.error('Error rating worker:', error);
    throw error;
  }
};

export const updateFcmToken = async (userId: string, fcmToken: string) => {
  try {
    const response = await api.put('/profile/fcm-token', {
      userId,
      fcmToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating FCM token:', error);
    // Don't throw, just log
  }
};

// Location API
export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await api.post('/location/geocode', { lat, lng });
    return response.data;
  } catch (error) {
    console.error('Error in reverse geocode:', error);
    return null;
  }
};

export const searchPlaces = async (query: string) => {
  try {
    if (!query) return [];
    // Call our backend proxy
    const response = await api.get('/location/autocomplete', {
      params: { input: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

export const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await api.get('/location/place-details', {
      params: { placeId },
    });
    return response.data; // { lat, lng, formattedAddress }
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

export default api;
