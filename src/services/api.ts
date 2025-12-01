import axios from 'axios';
import { getAuth, getIdToken } from '@react-native-firebase/auth';

// Use the same IP as LocalKaamWorker
const API_URL = 'http://192.168.29.157:5000/api';

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

export default api;
