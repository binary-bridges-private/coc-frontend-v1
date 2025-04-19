import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../api.ts';

interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  userData: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

const loadInitialState = (): AuthState => {
  const persistedAuth = localStorage.getItem('auth');
  if (persistedAuth) {
    try {
      return JSON.parse(persistedAuth);
    } catch (e) {
      console.error('Failed to parse persisted auth state', e);
    }
  }
  return {
    isAuthenticated: false,
    status: 'idle',
    error: null,
    userData: null,
  };
};

const initialState: AuthState = loadInitialState();

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      toast.success('Login successful!');
      return {
        userData: {
          email: response.data?.data?.email,
          firstName: response.data?.data?.firstName,
          lastName: response.data?.data?.lastName,
        }
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', credentials);
      toast.success('Signup successful! Welcome!');
      return {
        userData: {
          email: response.data?.data?.email,
          firstName: response.data?.data?.firstName,
          lastName: response.data?.data?.lastName,
        }
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('auth');
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ userData: UserData }>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.userData = action.payload.userData;
        persistAuthState(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.userData = null;
      })

      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<{ userData: UserData }>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.userData = action.payload.userData;
        persistAuthState(state);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('auth');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        // Still clear local state even if server logout failed
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('auth');
      });
  },
});

// Helper function to persist relevant auth state to localStorage
function persistAuthState(state: AuthState) {
  const authStateToPersist = {
    isAuthenticated: state.isAuthenticated,
    userData: state.userData,
    // You might want to persist status as 'idle' instead of the current status
    status: 'idle' as const,
    error: null,
  };
  localStorage.setItem('auth', JSON.stringify(authStateToPersist));
}

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;