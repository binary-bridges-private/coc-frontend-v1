import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface GSTR2BITC {
    // Supplier Details
    supplierGSTIN?: string;
    supplierName?: string;
    supplierAddress?: string;
    supplierState?: string;
    supplierPincode?: string;
    
    // Invoice Details
    invoiceNumber?: string;
    invoiceDate?: string;
    invoiceValue?: string;
    invoiceType?: string; // Regular/SEZ/Export/Import
    documentType?: string; // Invoice/Credit Note/Debit Note
    
    // Supply Details
    placeOfSupply?: string;
    reverseCharge?: boolean;
    ecommerceGSTIN?: string;
    ecommerceOperatorName?: string;
    
    // ITC Details
    itcEligible?: string;
    itcAvailable?: string;
    itcReversed?: string;
    itcUtilized?: string;
    itcBalance?: string;
    itcIneligible?: string;
    itcBlocked?: string;
    
    // Taxable Values
    taxableValueCGST?: string;
    taxableValueSGST?: string;
    taxableValueIGST?: string;
    taxableValueCess?: string;
    totalTaxableValue?: string;
    
    // Tax Amounts
    cgstRate?: string;
    cgstAmount?: string;
    sgstRate?: string;
    sgstAmount?: string;
    igstRate?: string;
    igstAmount?: string;
    cessRate?: string;
    cessAmount?: string;
    totalTaxAmount?: string;
    
    // Additional Details
    hsnCode?: string;
    itemDescription?: string;
    quantity?: string;
    unitOfMeasure?: string;
    unitPrice?: string;
    
    // Assessment Details
    financialYear?: string;
    taxPeriod?: string;
    returnPeriod?: string;
}

export interface GSTR2BEntry {
    id?: string;
    financialYear: string;
    quarter: string;
    month: string;
    gstIn: string;
    userId: string;
    itc?: GSTR2BITC[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GSTR2BPeriod {
    financialYear: string;
    quarter: string;
    month: string;
    monthName: string;
}

export interface GSTR2BState {
    currentEntry: GSTR2BEntry | null;
    entries: GSTR2BEntry[];
    suggestedPeriod: GSTR2BPeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface GSTR2BFilterParams {
    gstIn: string;
    financialYear?: string;
    month?: string;
}

const initialState: GSTR2BState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveGSTR2BEntry = createAsyncThunk(
    'gstr2b/save',
    async (entryData: Partial<GSTR2BEntry>, { rejectWithValue }) => {
        try {
            const url = '/gst/gstr2b';
            const method = entryData.id ? 'put' : 'post';

            console.log("GSTR2B Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as GSTR2BEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save GSTR2B entry'
            );
        }
    }
);

export const getGSTR2BEntry = createAsyncThunk(
    'gstr2b/getOne',
    async (params: GSTR2BFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2b', { params });
            return response.data.data.entry as GSTR2BEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR2B entry'
            );
        }
    }
);

export const getGSTR2BEntries = createAsyncThunk(
    'gstr2b/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2b/all');
            return response.data.data.gstr2bEntries as GSTR2BEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR2B entries'
            );
        }
    }
);

export const getSuggestedGSTR2BPeriod = createAsyncThunk(
    'gstr2b/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2b/suggestedPeriod');
            return response.data.data.suggestedPeriod as GSTR2BPeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested GSTR2B period'
            );
        }
    }
);

const gstr2bSlice = createSlice({
    name: 'gstr2b',
    initialState,
    reducers: {
        setCurrentGSTR2BEntry(state, action: PayloadAction<GSTR2BEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetGSTR2BState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearGSTR2BEntries(state) {
            state.entries = [];
        },
        updateITC(state, action: PayloadAction<Partial<GSTR2BITC>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.itc) {
                    state.currentEntry.itc = [];
                }
                state.currentEntry.itc.push(action.payload as GSTR2BITC);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<GSTR2BPeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGSTR2BEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveGSTR2BEntry.fulfilled, (state, action) => {
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
            .addCase(saveGSTR2BEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR2BEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR2BEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getGSTR2BEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR2BEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR2BEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getGSTR2BEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedGSTR2BPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedGSTR2BPeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested GSTR2B period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedGSTR2BPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentGSTR2BEntry,
    updateITC,
    resetGSTR2BState,
    clearGSTR2BEntries,
    setSuggestedPeriod
} = gstr2bSlice.actions;

export default gstr2bSlice.reducer;
