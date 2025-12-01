import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  profileImage?: string;
  city?: {
    name: string;
    state: string;
  };
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<Partial<User>>) => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUser: state => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
