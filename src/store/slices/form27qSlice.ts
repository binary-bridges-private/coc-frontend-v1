import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface Form27QNonResident {
    // Non-Resident Personal Details
    deducteePAN: string;
    deducteeName: string;
    deducteeAddress: string;
    deducteeCountry: string;
    deducteeCity: string;
    deducteeState: string;
    deducteePincode: string;
    deducteeMobile: string;
    deducteeEmail: string;
    deducteeDOB: string;
    deducteeGender: string;
    deducteeFatherName: string;
    
    // Tax Treaty Details
    taxTreatyCountry: string;
    taxTreatyArticle: string;
    taxTreatyRate: string;
    taxTreatyCertificateNumber: string;
    taxTreatyCertificateDate: string;
    
    // Payment Details
    paymentDate: string;
    paymentAmount: string;
    paymentCurrency: string;
    exchangeRate: string;
    paymentAmountINR: string;
    natureOfPayment: string;
    sectionCode: string;
    
    // Tax Details
    taxDeducted: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTaxDeducted: string;
    taxDeposited: string;
    depositDate: string;
    challanNumber: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tdsCertificateNumber: string;
}

export interface Form27QEntry {
    id?: string;
    tan: string;
    financialYear: string;
    quarter: string;
    nonResidents: Form27QNonResident[];
    totalSalaryPaid: string;
    totalTdsDeducted: string;
    totalTdsDeposited: string;
    totalTdsRefund: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Form27QPeriod {
    financialYear: string;
    quarter: string;
}

export interface Form27QState {
    currentEntry: Form27QEntry | null;
    entries: Form27QEntry[];
    suggestedPeriod: Form27QPeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface Form27QFilterParams {
    tan: string;
    financialYear?: string;
    quarter?: string;
}

const initialState: Form27QState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveForm27QEntry = createAsyncThunk(
    'form27q/save',
    async (entryData: Partial<Form27QEntry>, { rejectWithValue }) => {
        try {
            const url = '/tds/form27q';
            const method = entryData.id ? 'put' : 'post';

            console.log("Form 27Q Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as Form27QEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save Form 27Q entry'
            );
        }
    }
);

export const getForm27QEntry = createAsyncThunk(
    'form27q/getOne',
    async (params: Form27QFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27q', { params });
            return response.data.data.entry as Form27QEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 27Q entry'
            );
        }
    }
);

export const getForm27QEntries = createAsyncThunk(
    'form27q/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27q/all');
            return response.data.data.form27qEntries as Form27QEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 27Q entries'
            );
        }
    }
);

export const getSuggestedForm27QPeriod = createAsyncThunk(
    'form27q/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form27q/suggestedPeriod');
            return response.data.data.suggestedPeriod as Form27QPeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested Form 27Q period'
            );
        }
    }
);

const form27qSlice = createSlice({
    name: 'form27q',
    initialState,
    reducers: {
        setCurrentForm27QEntry(state, action: PayloadAction<Form27QEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetForm27QState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearForm27QEntries(state) {
            state.entries = [];
        },
        updateNonResident(state, action: PayloadAction<Partial<Form27QNonResident>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.nonResidents) {
                    state.currentEntry.nonResidents = [];
                }
                state.currentEntry.nonResidents.push(action.payload as Form27QNonResident);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<Form27QPeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveForm27QEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveForm27QEntry.fulfilled, (state, action) => {
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
            .addCase(saveForm27QEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm27QEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm27QEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getForm27QEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm27QEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm27QEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getForm27QEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedForm27QPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedForm27QPeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested Form 27Q period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedForm27QPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentForm27QEntry,
    updateNonResident,
    resetForm27QState,
    clearForm27QEntries,
    setSuggestedPeriod
} = form27qSlice.actions;

export default form27qSlice.reducer;
