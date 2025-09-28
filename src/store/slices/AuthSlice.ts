import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api.ts";
import { resetGstAuth } from "./gstAuthSlice.ts";

interface AuthState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userData: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    enrollmentType: string | null;
  } | null;
}

const loadInitialState = (): AuthState => {
  const persistedAuth = localStorage.getItem("auth");
  if (persistedAuth) {
    try {
      return JSON.parse(persistedAuth);
    } catch (e) {
      console.error("Failed to parse persisted auth state", e);
    }
  }
  return {
    isAuthenticated: false,
    status: "idle",
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
  enrollmentNumber: string;
  password: string;
  userType: string;
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  enrollmentType: string;
}

interface ResetPasswordRequest {
  email: string;
  resetLink: string;
}

interface VerifyResetPasswordRequest {
  token: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      toast.success("Login successful!");
      console.log("login successful :", response.data);
      localStorage.setItem('accessToken', response.data?.data?.accessToken);
      return {
        userData: {
          email: response.data?.data?.user?.emailAddress,
          firstName: response.data?.data?.user?.firstName,
          lastName: response.data?.data?.user?.lastName,
          enrollmentType: response.data?.data?.user?.enrollmentType,
        },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", credentials);
      toast.success("Signup successful! Welcome!");
      return {
        userData: {
          email: response.data?.data?.user?.emailAddress,
          firstName: response.data?.data?.user?.firstName,
          lastName: response.data?.data?.user?.lastName,
          enrollmentType: response.data?.data?.user?.enrollmentType,
        },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await api.post("/auth/logout");
      dispatch(resetGstAuth());
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (data: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-pass-req", {
        toEmail: data.email,
        resetLink: data.resetLink
      });
      toast.success("Password reset link sent to your email!");
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send reset password email";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyPasswordReset = createAsyncThunk(
  "auth/verifyPasswordReset",
  async (data: VerifyResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-pass", {
        token: data.token,
        newPassword: data.password
      }, {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });
      toast.success("Password reset successful!");
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("gstAuth");
      localStorage.removeItem("accessToken");
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ userData: UserData }>) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          console.log("from redux :", action.payload.userData);
          state.userData = action.payload.userData;
          persistAuthState(state);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.userData = null;
      })

      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ userData: UserData }>) => {
          state.status = "succeeded";
          // state.isAuthenticated = true;
          // state.userData = action.payload.userData;
          // persistAuthState(state);
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem("auth");
        localStorage.removeItem("gstAuth");
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        // Still clear local state even if server logout failed
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem("auth");
        localStorage.removeItem("gstAuth");
        localStorage.removeItem("accessToken");
      })

      // Request Password Reset cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Verify Password Reset cases
      .addCase(verifyPasswordReset.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyPasswordReset.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyPasswordReset.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Helper function to persist relevant auth state to localStorage
function persistAuthState(state: AuthState) {
  const authStateToPersist = {
    isAuthenticated: state.isAuthenticated,
    userData: state.userData,
    // You might want to persist status as 'idle' instead of the current status
    status: "idle" as const,
    error: null,
  };
  localStorage.setItem("auth", JSON.stringify(authStateToPersist));
}

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
