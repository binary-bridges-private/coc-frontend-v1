import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface Form16ACertificate {
    // Deductor Details (TDS Certificate Issuer)
    deductorTAN: string;
    deductorName: string;
    deductorAddress: string;
    deductorCity: string;
    deductorState: string;
    deductorPincode: string;
    
    // Deductee Details (TDS Certificate Recipient)
    deducteePAN: string;
    deducteeName: string;
    deducteeAddress: string;
    deducteeCity: string;
    deducteeState: string;
    deducteePincode: string;
    
    // Payment Details
    paymentDate: string;
    paymentAmount: string;
    natureOfPayment: string;
    sectionCode: string;
    
    // Tax Details
    taxDeducted: string;
    taxDeposited: string;
    depositDate: string;
    challanNumber: string;
    bankName: string;
    
    // Certificate Details
    certificateNumber: string;
    certificateDate: string;
    assessmentYear: string;
    quarter: string;
    
    // Additional Details
    remarks: string;
}

export interface Form16AEntry {
    id?: string;
    tan: string;
    financialYear: string;
    quarter: string;
    certificates: Form16ACertificate[];
    totalSalaryPaid: string;
    totalTdsDeducted: string;
    totalTdsDeposited: string;
    totalTdsRefund: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Form16APeriod {
    financialYear: string;
    quarter: string;
}

export interface Form16AState {
    currentEntry: Form16AEntry | null;
    entries: Form16AEntry[];
    suggestedPeriod: Form16APeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface Form16AFilterParams {
    tan: string;
    financialYear?: string;
    quarter?: string;
}

const initialState: Form16AState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveForm16AEntry = createAsyncThunk(
    'form16a/save',
    async (entryData: Partial<Form16AEntry>, { rejectWithValue }) => {
        try {
            const url = '/tds/form16a';
            const method = entryData.id ? 'put' : 'post';

            console.log("Form 16A Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as Form16AEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save Form 16A entry'
            );
        }
    }
);

export const getForm16AEntry = createAsyncThunk(
    'form16a/getOne',
    async (params: Form16AFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form16a', { params });
            return response.data.data.entry as Form16AEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 16A entry'
            );
        }
    }
);

export const getForm16AEntries = createAsyncThunk(
    'form16a/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form16a/all');
            return response.data.data.form16aEntries as Form16AEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 16A entries'
            );
        }
    }
);

export const getSuggestedForm16APeriod = createAsyncThunk(
    'form16a/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form16a/suggestedPeriod');
            return response.data.data.suggestedPeriod as Form16APeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested Form 16A period'
            );
        }
    }
);

const form16aSlice = createSlice({
    name: 'form16a',
    initialState,
    reducers: {
        setCurrentForm16AEntry(state, action: PayloadAction<Form16AEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetForm16AState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearForm16AEntries(state) {
            state.entries = [];
        },
        updateCertificate(state, action: PayloadAction<Partial<Form16ACertificate>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.certificates) {
                    state.currentEntry.certificates = [];
                }
                state.currentEntry.certificates.push(action.payload as Form16ACertificate);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<Form16APeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveForm16AEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveForm16AEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentEntry = action.payload;

                // Update or add to entries list
                const index = state.entries.findIndex(e => e.id === action.payload.id);
                if (index >= 0) {
                    state.entries[index] = action.payload;
                } else {
                    state.entries.push(action.payload);
                }
            })
            .addCase(saveForm16AEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm16AEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm16AEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getForm16AEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm16AEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm16AEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getForm16AEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedForm16APeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedForm16APeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested Form 16A period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedForm16APeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentForm16AEntry,
    updateCertificate,
    resetForm16AState,
    clearForm16AEntries,
    setSuggestedPeriod
} = form16aSlice.actions;

export default form16aSlice.reducer;
