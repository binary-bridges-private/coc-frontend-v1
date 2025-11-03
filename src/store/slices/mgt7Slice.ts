import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface MGT7Director {
    // Director Personal Details
    directorDIN: string;
    directorName: string;
    directorAddress: string;
    directorCity: string;
    directorState: string;
    directorPincode: string;
    directorCountry: string;
    directorMobile: string;
    directorEmail: string;
    directorDOB: string;
    directorGender: string;
    directorFatherName: string;
    directorNationality: string;
    
    // Director Professional Details
    directorDesignation: string;
    directorDOJ: string; // Date of Joining
    directorDOL: string; // Date of Leaving (if applicable)
    directorCategory: string; // Executive/Non-Executive/Independent
    directorAppointmentType: string; // First/Reappointment
    directorQualification: string;
    directorExperience: string;
    
    // Director Financial Details
    directorRemuneration: string;
    directorSittingFees: string;
    directorCommission: string;
    directorPerquisites: string;
    directorTotalRemuneration: string;
    
    // Director Shareholding
    directorShares: string;
    directorPercentage: string;
    directorShareValue: string;
    
    // Director Compliance
    directorDisqualification: string;
    directorCriminalCases: string;
    directorInsolvency: string;
    directorDisqualificationDetails: string;
    
    // Assessment Details
    assessmentYear: string;
    financialYear: string;
}

export interface MGT7Shareholder {
    shareholderPan: string;
    shareholderName: string;
    shareholderAddress: string;
    shareholderState: string;
    shareholderPincode: string;
    shareholderMobile: string;
    shareholderEmail: string;
    shareholderDob: string;
    shareholderGender: string;
    shareholderFatherName: string;
    shareholderShares: string;
    shareholderPercentage: string;
    shareholderValue: string;
}

export interface MGT7Entry {
    id?: string;
    cin: string;
    financialYear: string;
    directors: MGT7Director[];
    shareholders: MGT7Shareholder[];
    totalShareCapital: string;
    totalShares: string;
    totalDirectors: string;
    totalShareholders: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MGT7Period {
    financialYear: string;
}

export interface MGT7State {
    currentEntry: MGT7Entry | null;
    entries: MGT7Entry[];
    suggestedPeriod: MGT7Period | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface MGT7FilterParams {
    cin: string;
    financialYear?: string;
}

const initialState: MGT7State = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveMGT7Entry = createAsyncThunk(
    'mgt7/save',
    async (entryData: Partial<MGT7Entry>, { rejectWithValue }) => {
        try {
            const url = '/roc/mgt7';
            const method = entryData.id ? 'put' : 'post';

            console.log("MGT-7 Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as MGT7Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save MGT-7 entry'
            );
        }
    }
);

export const getMGT7Entry = createAsyncThunk(
    'mgt7/getOne',
    async (params: MGT7FilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/mgt7', { params });
            return response.data.data.entry as MGT7Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch MGT-7 entry'
            );
        }
    }
);

export const getMGT7Entries = createAsyncThunk(
    'mgt7/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/mgt7/all');
            return response.data.data.mgt7Entries as MGT7Entry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch MGT-7 entries'
            );
        }
    }
);

export const getSuggestedMGT7Period = createAsyncThunk(
    'mgt7/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/roc/mgt7/suggestedPeriod');
            return response.data.data.suggestedPeriod as MGT7Period | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested MGT-7 period'
            );
        }
    }
);

const mgt7Slice = createSlice({
    name: 'mgt7',
    initialState,
    reducers: {
        setCurrentMGT7Entry(state, action: PayloadAction<MGT7Entry | null>) {
            state.currentEntry = action.payload;
        },
        resetMGT7State(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearMGT7Entries(state) {
            state.entries = [];
        },
        updateDirector(state, action: PayloadAction<Partial<MGT7Director>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.directors) {
                    state.currentEntry.directors = [];
                }
                state.currentEntry.directors.push(action.payload as MGT7Director);
            }
        },
        updateShareholder(state, action: PayloadAction<Partial<MGT7Shareholder>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.shareholders) {
                    state.currentEntry.shareholders = [];
                }
                state.currentEntry.shareholders.push(action.payload as MGT7Shareholder);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<MGT7Period | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveMGT7Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveMGT7Entry.fulfilled, (state, action) => {
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
            .addCase(saveMGT7Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getMGT7Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMGT7Entry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getMGT7Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getMGT7Entries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMGT7Entries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getMGT7Entries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedMGT7Period.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedMGT7Period.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested MGT-7 period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedMGT7Period.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentMGT7Entry,
    updateDirector,
    updateShareholder,
    resetMGT7State,
    clearMGT7Entries,
    setSuggestedPeriod
} = mgt7Slice.actions;

export default mgt7Slice.reducer;
