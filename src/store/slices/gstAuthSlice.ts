import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

interface GstAuthState {
    isGstAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): GstAuthState => {
    const persistedGstAuth = localStorage.getItem('gstAuth');
    if (persistedGstAuth) {
        try {
            return JSON.parse(persistedGstAuth);
        } catch (e) {
            console.error('Failed to parse persisted GST auth state', e);
        }
    }
    return {
        isGstAuthenticated: false,
        status: 'idle',
        error: null,
    };
};

const initialState: GstAuthState = loadInitialState();

interface GstLoginCredentials {
    gstIn: string;
}

export const gstLogin = createAsyncThunk(
    'gstAuth/gstLogin',
    async (credentials: GstLoginCredentials, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.post('/auth/gst-login', {
                gstIn: credentials.gstIn
            });

            if (response.data.success === "success") {
                return true;
            }
            return rejectWithValue(response.data.message || 'GST authentication failed');
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'GST authentication failed'
            );
        }
    }
);

function persistGstAuthState(state: GstAuthState) {
    const gstAuthStateToPersist = {
        isGstAuthenticated: state.isGstAuthenticated,
    };
    localStorage.setItem('gstAuth', JSON.stringify(gstAuthStateToPersist));
}

const gstAuthSlice = createSlice({
    name: 'gstAuth',
    initialState,
    reducers: {
        clearGstAuthError(state) {
            state.error = null;
        },
        resetGstAuth(state) {
            state.isGstAuthenticated = false;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('gstAuth');
        },
    },
    extraReducers: (builder) => {
        builder
            // GST Login cases
            .addCase(gstLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(gstLogin.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isGstAuthenticated = true;
                persistGstAuthState(state);
            })
            .addCase(gstLogin.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.isGstAuthenticated = false;
                state.error = action.payload;
                localStorage.removeItem('gstAuth');
            })
    },
});

export const { clearGstAuthError, resetGstAuth } = gstAuthSlice.actions;
export default gstAuthSlice.reducer;