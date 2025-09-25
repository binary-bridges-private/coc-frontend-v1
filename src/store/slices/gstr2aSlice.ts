import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface GSTR2AB2B {
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

export interface GSTR2AB2BA {
    supplierGstin?: string;
    supplierName?: string;
    invoiceNo?: string;
    invoiceDate?: string;
    invoiceValue?: string;
    placeOfSupply?: string;
    reverseCharge?: boolean;
    invoiceType?: string;
    ecommerceGstin?: string;
    taxableValue?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR2ACDN {
    supplierGstin?: string;
    supplierName?: string;
    documentNo?: string;
    documentDate?: string;
    documentType?: string;
    documentValue?: string;
    placeOfSupply?: string;
    reverseCharge?: boolean;
    taxableValue?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR2AISD {
    supplierGstin?: string;
    supplierName?: string;
    documentNo?: string;
    documentDate?: string;
    documentType?: string;
    documentValue?: string;
    placeOfSupply?: string;
    taxableValue?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR2AEntry {
    id?: string;
    financialYear: string;
    quarter: string;
    month: string;
    gstIn: string;
    userId: string;
    b2b?: GSTR2AB2B[];
    b2ba?: GSTR2AB2BA[];
    cdn?: GSTR2ACDN[];
    isd?: GSTR2AISD[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GSTR2APeriod {
    financialYear: string;
    quarter: string;
    month: string;
    monthName: string;
}

export interface GSTR2AState {
    currentEntry: GSTR2AEntry | null;
    entries: GSTR2AEntry[];
    suggestedPeriod: GSTR2APeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface GSTR2AFilterParams {
    gstIn: string;
    financialYear?: string;
    month?: string;
}

const initialState: GSTR2AState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveGSTR2AEntry = createAsyncThunk(
    'gstr2a/save',
    async (entryData: Partial<GSTR2AEntry>, { rejectWithValue }) => {
        try {
            const url = '/gst/gstr2a';
            const method = entryData.id ? 'put' : 'post';

            console.log("GSTR2A Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as GSTR2AEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save GSTR2A entry'
            );
        }
    }
);

export const getGSTR2AEntry = createAsyncThunk(
    'gstr2a/getOne',
    async (params: GSTR2AFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2a', { params });
            return response.data.data.entry as GSTR2AEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR2A entry'
            );
        }
    }
);

export const getGSTR2AEntries = createAsyncThunk(
    'gstr2a/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2a/all');
            return response.data.data.gstr2aEntries as GSTR2AEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR2A entries'
            );
        }
    }
);

export const getSuggestedGSTR2APeriod = createAsyncThunk(
    'gstr2a/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr2a/suggestedPeriod');
            return response.data.data.suggestedPeriod as GSTR2APeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested GSTR2A period'
            );
        }
    }
);

const gstr2aSlice = createSlice({
    name: 'gstr2a',
    initialState,
    reducers: {
        setCurrentGSTR2AEntry(state, action: PayloadAction<GSTR2AEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetGSTR2AState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearGSTR2AEntries(state) {
            state.entries = [];
        },
        updateB2B(state, action: PayloadAction<Partial<GSTR2AB2B>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.b2b) {
                    state.currentEntry.b2b = [];
                }
                state.currentEntry.b2b.push(action.payload as GSTR2AB2B);
            }
        },
        updateB2BA(state, action: PayloadAction<Partial<GSTR2AB2BA>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.b2ba) {
                    state.currentEntry.b2ba = [];
                }
                state.currentEntry.b2ba.push(action.payload as GSTR2AB2BA);
            }
        },
        updateCDN(state, action: PayloadAction<Partial<GSTR2ACDN>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.cdn) {
                    state.currentEntry.cdn = [];
                }
                state.currentEntry.cdn.push(action.payload as GSTR2ACDN);
            }
        },
        updateISD(state, action: PayloadAction<Partial<GSTR2AISD>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.isd) {
                    state.currentEntry.isd = [];
                }
                state.currentEntry.isd.push(action.payload as GSTR2AISD);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<GSTR2APeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGSTR2AEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveGSTR2AEntry.fulfilled, (state, action) => {
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
            .addCase(saveGSTR2AEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR2AEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR2AEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getGSTR2AEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR2AEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR2AEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getGSTR2AEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedGSTR2APeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedGSTR2APeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested GSTR2A period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedGSTR2APeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentGSTR2AEntry,
    updateB2B,
    updateB2BA,
    updateCDN,
    updateISD,
    resetGSTR2AState,
    clearGSTR2AEntries,
    setSuggestedPeriod
} = gstr2aSlice.actions;

export default gstr2aSlice.reducer;
