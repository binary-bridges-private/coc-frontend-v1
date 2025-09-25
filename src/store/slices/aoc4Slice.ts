import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface AOC4FinancialData {
    // Company Details
    companyName: string;
    cin: string;
    financialYear: string;
    reportingDate: string;
    
    // Revenue from Operations
    revenueFromOperations: string;
    otherIncome: string;
    totalRevenue: string;
    
    // Cost of Materials and Operations
    costOfMaterialsConsumed: string;
    purchasesOfStockInTrade: string;
    changesInInventories: string;
    employeeBenefitsExpense: string;
    financeCosts: string;
    depreciationAndAmortisationExpense: string;
    otherExpenses: string;
    totalExpenses: string;
    
    // Profit and Loss
    profitBeforeTax: string;
    taxExpense: string;
    profitAfterTax: string;
    otherComprehensiveIncome: string;
    totalComprehensiveIncome: string;
    
    // Balance Sheet - Equity
    shareCapital: string;
    otherEquity: string;
    totalEquity: string;
    
    // Balance Sheet - Liabilities
    nonCurrentLiabilities: string;
    currentLiabilities: string;
    totalLiabilities: string;
    
    // Balance Sheet - Assets
    nonCurrentAssets: string;
    currentAssets: string;
    totalAssets: string;
    
    // Auditor Details
    auditorName: string;
    auditorFirm: string;
    auditorReportDate: string;
    auditorReportType: string;
    
    // Additional Information
    notesToAccounts: string;
    boardResolutionDate: string;
    filingDate: string;
}

export interface AOC4Entry {
    id?: string;
    cin: string;
    financialYear: string;
    financialData: AOC4FinancialData;
    balanceSheetData: Record<string, string>;
    profitLossData: Record<string, string>;
    cashFlowData: Record<string, string>;
    notesToAccounts: string;
    auditorName: string;
    auditorReportDate: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AOC4Period {
    financialYear: string;
}

export interface AOC4State {
    currentEntry: AOC4Entry | null;
    entries: AOC4Entry[];
    suggestedPeriod: AOC4Period | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface AOC4FilterParams {
    cin: string;
    financialYear?: string;
}

const initialState: AOC4State = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveAOC4Entry = createAsyncThunk(
    'aoc4/save',
    async (entryData: Partial<AOC4Entry>, { rejectWithValue }) => {
        try {
            const url = '/roc/aoc4';
            const method = entryData.id ? 'put' : 'post';

            console.log("AOC-4 Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as AOC4Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save AOC-4 entry'
            );
        }
    }
);

export const getAOC4Entry = createAsyncThunk(
    'aoc4/getOne',
    async (params: AOC4FilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/aoc4', { params });
            return response.data.data.entry as AOC4Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch AOC-4 entry'
            );
        }
    }
);

export const getAOC4Entries = createAsyncThunk(
    'aoc4/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/aoc4/all');
            return response.data.data.aoc4Entries as AOC4Entry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch AOC-4 entries'
            );
        }
    }
);

export const getSuggestedAOC4Period = createAsyncThunk(
    'aoc4/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/aoc4/suggestedPeriod');
            return response.data.data.suggestedPeriod as AOC4Period | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested AOC-4 period'
            );
        }
    }
);

const aoc4Slice = createSlice({
    name: 'aoc4',
    initialState,
    reducers: {
        setCurrentAOC4Entry(state, action: PayloadAction<AOC4Entry | null>) {
            state.currentEntry = action.payload;
        },
        resetAOC4State(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearAOC4Entries(state) {
            state.entries = [];
        },
        updateFinancialData(state, action: PayloadAction<Partial<AOC4FinancialData>>) {
            if (state.currentEntry) {
                state.currentEntry.financialData = { ...state.currentEntry.financialData, ...action.payload };
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<AOC4Period | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAOC4Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveAOC4Entry.fulfilled, (state, action) => {
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
            .addCase(saveAOC4Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAOC4Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAOC4Entry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getAOC4Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAOC4Entries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAOC4Entries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getAOC4Entries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedAOC4Period.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedAOC4Period.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested AOC-4 period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedAOC4Period.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentAOC4Entry,
    updateFinancialData,
    resetAOC4State,
    clearAOC4Entries,
    setSuggestedPeriod
} = aoc4Slice.actions;

export default aoc4Slice.reducer;
