import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface Form27EQCollectee {
    // Collectee Personal Details
    collecteePAN: string;
    collecteeName: string;
    collecteeAddress: string;
    collecteeCity: string;
    collecteeState: string;
    collecteePincode: string;
    collecteeMobile: string;
    collecteeEmail: string;
    collecteeDOB: string;
    collecteeGender: string;
    collecteeFatherName: string;
    
    // Business Details
    businessType: string;
    businessCategory: string;
    businessRegistrationNumber: string;
    businessRegistrationDate: string;
    
    // Goods/Services Details
    goodsDescription: string;
    goodsCategory: string;
    goodsHSNCode: string;
    goodsQuantity: string;
    goodsUnit: string;
    goodsValue: string;
    
    // Collection Details
    collectionDate: string;
    collectionAmount: string;
    collectionMode: string;
    collectionReference: string;
    
    // TCS Details
    tcsRate: string;
    tcsAmount: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTCSAmount: string;
    tcsDeposited: string;
    depositDate: string;
    challanNumber: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tcsCertificateNumber: string;
}

export interface Form27EQEntry {
    id?: string;
    tan: string;
    financialYear: string;
    quarter: string;
    collectees: Form27EQCollectee[];
    totalAmountCollected: string;
    totalTcsCollected: string;
    totalTcsDeposited: string;
    totalTcsRefund: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Form27EQPeriod {
    financialYear: string;
    quarter: string;
}

export interface Form27EQState {
    currentEntry: Form27EQEntry | null;
    entries: Form27EQEntry[];
    suggestedPeriod: Form27EQPeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface Form27EQFilterParams {
    tan: string;
    financialYear?: string;
    quarter?: string;
}

const initialState: Form27EQState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveForm27EQEntry = createAsyncThunk(
    'form27eq/save',
    async (entryData: Partial<Form27EQEntry>, { rejectWithValue }) => {
        try {
            const url = '/tds/form27eq';
            const method = entryData.id ? 'put' : 'post';

            console.log("Form 27EQ Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as Form27EQEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save Form 27EQ entry'
            );
        }
    }
);

export const getForm27EQEntry = createAsyncThunk(
    'form27eq/getOne',
    async (params: Form27EQFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27eq', { params });
            return response.data.data.entry as Form27EQEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 27EQ entry'
            );
        }
    }
);

export const getForm27EQEntries = createAsyncThunk(
    'form27eq/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27eq/all');
            return response.data.data.form27eqEntries as Form27EQEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 27EQ entries'
            );
        }
    }
);

export const getSuggestedForm27EQPeriod = createAsyncThunk(
    'form27eq/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27eq/suggestedPeriod');
            return response.data.data.suggestedPeriod as Form27EQPeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested Form 27EQ period'
            );
        }
    }
);

const form27eqSlice = createSlice({
    name: 'form27eq',
    initialState,
    reducers: {
        setCurrentForm27EQEntry(state, action: PayloadAction<Form27EQEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetForm27EQState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearForm27EQEntries(state) {
            state.entries = [];
        },
        updateCollectee(state, action: PayloadAction<Partial<Form27EQCollectee>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.collectees) {
                    state.currentEntry.collectees = [];
                }
                state.currentEntry.collectees.push(action.payload as Form27EQCollectee);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<Form27EQPeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveForm27EQEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveForm27EQEntry.fulfilled, (state, action) => {
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
            .addCase(saveForm27EQEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm27EQEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm27EQEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getForm27EQEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm27EQEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm27EQEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getForm27EQEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedForm27EQPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedForm27EQPeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested Form 27EQ period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedForm27EQPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentForm27EQEntry,
    updateCollectee,
    resetForm27EQState,
    clearForm27EQEntries,
    setSuggestedPeriod
} = form27eqSlice.actions;

export default form27eqSlice.reducer;
