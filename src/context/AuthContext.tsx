import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../services/api';
import auth, { getAuth } from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from '../store/slices/authSlice';
import {
  setUser,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearUser,
} from '../store/slices/userSlice';
import { cache } from '../utils/cache';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  roles?: string[];
  city?: {
    name: string;
    state: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Alias for isLoading
  isInitialized: boolean;
  login: (phone: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>; // Alias for updateUser
  uploadUserImage: (imageUri: string) => Promise<string | null>;
  checkAuthStatus: () => Promise<boolean>;
  refreshUserProfile: (forceRefresh?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const { currentUser: user } = useAppSelector(state => state.user);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // Refresh profile on app start if user is logged in
      if (user?.phoneNumber) {
        await refreshUserProfile();
      }
      setIsInitialized(true);
    };
    initAuth();
  }, []);

  const refreshUserProfile = async (forceRefresh: boolean = false) => {
    try {
      if (user?.phoneNumber) {
        const cacheKey = `customer_profile_${user.phoneNumber}`;

        // Try to get from cache first if not forced
        if (!forceRefresh) {
          const cachedUser = await cache.get<User>(cacheKey);
          if (cachedUser) {
            console.log('[AuthContext] Using cached user profile');
            dispatch(setUser(cachedUser));
            return;
          }
        }

        // If forced, not in cache, or expired, fetch from API
        console.log(
          `[AuthContext] Fetching user profile from API (Force: ${forceRefresh})`,
        );
        const updatedUser = await api.getProfile(user.phoneNumber);
        if (updatedUser) {
          await cache.set(cacheKey, updatedUser);
          dispatch(setUser(updatedUser));
        }
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    return isAuthenticated;
  };

  const login = async (phone: string, otp: string): Promise<boolean> => {
    try {
      dispatch(loginStart());

      // 1. Verify OTP with Firebase (Assuming OTP verification logic is handled in the screen for now,
      //    or we can move it here if we pass the confirmation object.
      //    For this implementation, we assume the screen handles Firebase confirmation
      //    and calls this login function upon success to sync with backend).

      // Ideally, the screen calls this AFTER Firebase success.

      // 2. Fetch or Create User in Backend
      try {
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
        const cacheKey = `customer_profile_${formattedPhone}`;

        // Check cache first
        const cachedUser = await cache.get<User>(cacheKey);
        if (cachedUser) {
          console.log('[AuthContext] Login: User found in cache');
          dispatch(setUser(cachedUser));
          dispatch(loginSuccess('mock_token_123')); // In real app, get token from backend
          return true;
        }

        const existingUser = await api.getProfile(formattedPhone);
        if (existingUser) {
          console.log('User found:', existingUser);
          await cache.set(cacheKey, existingUser);
          dispatch(setUser(existingUser));
          dispatch(loginSuccess('mock_token_123'));
          return true;
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.log('User not found in DB, proceeding to setup new profile.');
        } else {
          console.error('Error fetching profile:', error);
        }
      }

      // If user doesn't exist, create a temporary local user state
      // The actual creation on backend happens when they save their profile
      const userData: User = {
        id: 'temp_id',
        name: '',
        phoneNumber: phone,
      };

      dispatch(loginSuccess('mock_token_123'));
      dispatch(setUser(userData));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure('Login failed'));
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (user?.phoneNumber) {
        await cache.remove(`customer_profile_${user.phoneNumber}`);
      }
      await getAuth().signOut();
      dispatch(logoutAction());
      dispatch(clearUser());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      dispatch(updateUserStart());

      const updatedProfile = await api.updateProfile({
        ...userData,
        phoneNumber: user.phoneNumber,
        firebaseUid: getAuth().currentUser?.uid || '',
      });

      // Update cache with new data from backend response
      const cacheKey = `customer_profile_${user.phoneNumber}`;
      await cache.set(cacheKey, updatedProfile);

      dispatch(updateUserSuccess(updatedProfile));
      return true;
    } catch (error: any) {
      console.error('Update user error:', error);

      // Demo Mode Fallback
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        console.log(
          '[AuthContext] Network error, using local fallback (Demo Mode)',
        );

        // Update cache with new data locally
        const cacheKey = `customer_profile_${user.phoneNumber}`;
        const currentUserData = (await cache.get<User>(cacheKey)) || user;
        const newUserData = { ...currentUserData, ...userData };
        await cache.set(cacheKey, newUserData);

        dispatch(updateUserSuccess(userData));
        return true; // Successfully updated locally
      }

      dispatch(updateUserFailure('Update failed'));
      return false;
    }
  };

  const uploadUserImage = async (imageUri: string): Promise<string | null> => {
    try {
      if (!user) throw new Error('User not logged in');
      const response = await api.uploadImage(imageUri, user.phoneNumber);

      // Update cache
      const cacheKey = `customer_profile_${user.phoneNumber}`;
      const currentUserData = (await cache.get<User>(cacheKey)) || user;
      const newUserData = {
        ...currentUserData,
        profileImage: response.imageUrl,
      };
      await cache.set(cacheKey, newUserData);

      dispatch(updateUserSuccess({ profileImage: response.imageUrl }));

      return response.imageUrl;
    } catch (error) {
      console.error('Upload image error:', error);
      // Don't throw, just return null so flow can continue
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loading: isLoading,
        isInitialized, // Expose initialization state
        login,
        logout,
        updateUser,
        updateProfile: updateUser,
        uploadUserImage,
        checkAuthStatus,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
