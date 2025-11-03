import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface GSTR1B2B {
    deemedExports?: boolean;
    sezWithPayment?: boolean;
    sezWithoutPayment?: boolean;
    reverseCharge?: boolean;
    intraStateIGST?: boolean;
    isDifferentialTax?: boolean;
    recipientGSTIN?: string;
    recipientName?: string;
    masterName?: string;
    invoiceNo?: string;
    invoiceDate?: string;
    totalValue?: string;
    pos?: string;
    supplyType?: string;
    source?: string;
    irn?: string;
    irnDate?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1B2C {
    isDifferentialTax?: boolean;
    pos?: string;
    invoiceNo?: string;
    invoiceDate?: string;
    supplyType?: string;
    totalValue?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1B2CS {
    pos?: string;
    taxableValue?: string;
    supplyType?: string;
    isDifferentialTax?: boolean;
    rate?: string;
    cgst?: string;
    sgst?: string;
    igst?: string;
    cess?: string;
}

export interface GSTR1Exports {
    invoiceNo?: string;
    invoiceDate?: string;
    portCode?: string;
    shippingBillNo?: string;
    shippingBillDate?: string;
    totalValue?: string;
    supplyType?: string;
    gstPayment?: string;
    source?: string;
    irn?: string;
    irnDate?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1NilRated {
    description?: string;
    nilRated?: string;
    exempted?: string;
    nonGst?: string;
}

export interface GSTR1Credit {
    deemedExports?: boolean;
    sezWithPayment?: boolean;
    sezWithoutPayment?: boolean;
    reverseCharge?: boolean;
    intraStateIGST?: boolean;
    isDifferentialTax?: boolean;
    recipientGSTIN?: string;
    recipientName?: string;
    masterName?: string;
    noteNumber?: string;
    noteDate?: string;
    noteType?: string;
    noteValue?: string;
    pos?: string;
    supplyType?: string;
    source?: string;
    irn?: string;
    irnDate?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1CreditUnregistered {
    isDifferentialTax?: boolean;
    type?: string;
    noteNumber?: string;
    noteDate?: string;
    noteValue?: string;
    noteType?: string;
    pos?: string;
    supplyType?: string;
    source?: string;
    irn?: string;
    irnDate?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1TaxLiability {
    pos?: string;
    supplyType?: string;
    isDifferentialTax?: boolean;
    advances?: Record<string, string>;
}

export interface GSTR1Adjustments {
    pos?: string;
    supplyType?: string;
    isDifferentialTax?: boolean;
    adjustments?: Record<string, string>;
}

export interface GSTR1HSN {
    hsn?: string;
    description?: string;
    productName?: string;
    uqc?: string;
    quantity?: string;
    taxableValue?: string;
    rate?: string;
    integratedTax?: string;
    centralTax?: string;
    stateTax?: string;
    cess?: string;
}

export interface GSTR1DocumentRow {
    id?: number;
    from?: string;
    to?: string;
    total?: string;
    cancelled?: string;
    netIssued?: string;
}

export interface GSTR1Documents {
    rows1?: GSTR1DocumentRow[];
    rows2?: GSTR1DocumentRow[];
    rows3?: GSTR1DocumentRow[];
    rows4?: GSTR1DocumentRow[];
    rows5?: GSTR1DocumentRow[];
    rows6?: GSTR1DocumentRow[];
    rows7?: GSTR1DocumentRow[];
    rows8?: GSTR1DocumentRow[];
    rows9?: GSTR1DocumentRow[];
    rows10?: GSTR1DocumentRow[];
    rows11?: GSTR1DocumentRow[];
    rows12?: GSTR1DocumentRow[];
}

export interface GSTR1SuppliesThroughEco {
    gstin?: string;
    legalName?: string;
    netValue?: string;
    integratedTax?: string;
    centralTax?: string;
    stateTax?: string;
    cess?: string;
}

export interface GSTR1SuppliesB2B {
    deemedExports?: boolean;
    sezWithPayment?: boolean;
    sezWithoutPayment?: boolean;
    supplierGstin?: string;
    supplierName?: string;
    recipientGstin?: string;
    recipientName?: string;
    documentNumber?: string;
    documentDate?: string;
    totalValue?: string;
    pos?: string;
    supplyType?: string;
    taxableValues?: Record<string, string>;
    cessValues?: Record<string, string>;
}

export interface GSTR1Entry {
    id?: string;
    financialYear: string;
    quarter: string;
    month: string;
    gstIn: string;
    userId: string;
    b2b?: GSTR1B2B;
    b2c?: GSTR1B2C;
    b2cs?: GSTR1B2CS;
    exports?: GSTR1Exports;
    nilRated?: GSTR1NilRated;
    credit?: GSTR1Credit;
    creditUnregistered?: GSTR1CreditUnregistered;
    taxLiability?: GSTR1TaxLiability;
    adjustments?: GSTR1Adjustments;
    hsn?: GSTR1HSN;
    documents?: GSTR1Documents;
    suppliesThroughEco?: GSTR1SuppliesThroughEco;
    suppliesB2b?: GSTR1SuppliesB2B;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GSTR1Period {
    financialYear: string;
    quarter: string;
    month: string;
    monthName: string;
}

export interface GSTR1State {
    currentEntry: GSTR1Entry | null;
    entries: GSTR1Entry[];
    suggestedPeriod: GSTR1Period | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface GSTR1FilterParams {
    gstIn: string;
    financialYear?: string;
    month?: string;
}

const initialState: GSTR1State = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveGSTR1Entry = createAsyncThunk(
    'gstr1/save',
    async (entryData: Partial<GSTR1Entry>, { rejectWithValue }) => {
        try {
            const url = '/gst/gstr1';
            const method = entryData.id ? 'put' : 'post';

            console.log("Entry Data :",entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as GSTR1Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save GSTR1 entry'
            );
        }
    }
);

export const getGSTR1Entry = createAsyncThunk(
    'gstr1/getOne',
    async (params: GSTR1FilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr1', { params });
            return response.data.data.entry as GSTR1Entry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR1 entry'
            );
        }
    }
);

export const getGSTR1Entries = createAsyncThunk(
    'gstr1/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr1/all');
            return response.data.data.gstr1Entries as GSTR1Entry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch GSTR1 entries'
            );
        }
    }
);

export const getSuggestedGSTR1Period = createAsyncThunk(
    'gstr1/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/gst/gstr1/suggestedPeriod');
            return response.data.data.suggestedPeriod as GSTR1Period | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested GSTR1 period'
            );
        }
    }
);

const gstr1Slice = createSlice({
    name: 'gstr1',
    initialState,
    reducers: {
        setCurrentGSTR1Entry(state, action: PayloadAction<GSTR1Entry | null>) {
            state.currentEntry = action.payload;
        },
        resetGSTR1State(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearGSTR1Entries(state) {
            state.entries = [];
        },

        updateB2B(state, action: PayloadAction<Partial<GSTR1B2B>>) {
            if (state.currentEntry) {
                state.currentEntry.b2b = {
                    ...(state.currentEntry.b2b || {}),
                    ...action.payload,
                };
            }
        },

        // B2C Section
        updateB2C(state, action: PayloadAction<Partial<GSTR1B2C>>) {
            if (state.currentEntry) {
                state.currentEntry.b2c = {
                    ...(state.currentEntry.b2c || {}),
                    ...action.payload,
                };
            }
        },

        // B2CS Section
        updateB2CS(state, action: PayloadAction<Partial<GSTR1B2CS>>) {
            if (state.currentEntry) {
                state.currentEntry.b2cs = {
                    ...(state.currentEntry.b2cs || {}),
                    ...action.payload,
                };
            }
        },

        // Exports Section
        updateExports(state, action: PayloadAction<Partial<GSTR1Exports>>) {
            if (state.currentEntry) {
                state.currentEntry.exports = {
                    ...(state.currentEntry.exports || {}),
                    ...action.payload,
                };
            }
        },

        // Nil Rated Section
        updateNilRated(state, action: PayloadAction<Partial<GSTR1NilRated>>) {
            if (state.currentEntry) {
                state.currentEntry.nilRated = {
                    ...(state.currentEntry.nilRated || {}),
                    ...action.payload,
                };
            }
        },

        // Credit Section
        updateCredit(state, action: PayloadAction<Partial<GSTR1Credit>>) {
            if (state.currentEntry) {
                state.currentEntry.credit = {
                    ...(state.currentEntry.credit || {}),
                    ...action.payload,
                };
            }
        },

        // Credit Unregistered Section
        updateCreditUnregistered(state, action: PayloadAction<Partial<GSTR1CreditUnregistered>>) {
            if (state.currentEntry) {
                state.currentEntry.creditUnregistered = {
                    ...(state.currentEntry.creditUnregistered || {}),
                    ...action.payload,
                };
            }
        },

        // Tax Liability Section
        updateTaxLiability(state, action: PayloadAction<Partial<GSTR1TaxLiability>>) {
            if (state.currentEntry) {
                state.currentEntry.taxLiability = {
                    ...(state.currentEntry.taxLiability || {}),
                    ...action.payload,
                };
            }
        },

        // Adjustments Section
        updateAdjustments(state, action: PayloadAction<Partial<GSTR1Adjustments>>) {
            if (state.currentEntry) {
                state.currentEntry.adjustments = {
                    ...(state.currentEntry.adjustments || {}),
                    ...action.payload,
                };
            }
        },

        // HSN Section
        updateHSN(state, action: PayloadAction<Partial<GSTR1HSN>>) {
            if (state.currentEntry) {
                state.currentEntry.hsn = {
                    ...(state.currentEntry.hsn || {}),
                    ...action.payload,
                };
            }
        },

        // Documents Section
        updateDocuments(state, action: PayloadAction<Partial<GSTR1Documents>>) {
            if (state.currentEntry) {
                state.currentEntry.documents = {
                    ...(state.currentEntry.documents || {}),
                    ...action.payload,
                };
            }
        },

        // Supplies Through ECO Section
        updateSuppliesThroughEco(state, action: PayloadAction<Partial<GSTR1SuppliesThroughEco>>) {
            if (state.currentEntry) {
                state.currentEntry.suppliesThroughEco = {
                    ...(state.currentEntry.suppliesThroughEco || {}),
                    ...action.payload,
                };
            }
        },

        // Supplies B2B Section
        updateSuppliesB2B(state, action: PayloadAction<Partial<GSTR1SuppliesB2B>>) {
            if (state.currentEntry) {
                state.currentEntry.suppliesB2b = {
                    ...(state.currentEntry.suppliesB2b || {}),
                    ...action.payload,
                };
            }
        },

        setSuggestedPeriod(state, action: PayloadAction<GSTR1Period | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGSTR1Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveGSTR1Entry.fulfilled, (state, action) => {
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
            .addCase(saveGSTR1Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR1Entry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR1Entry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getGSTR1Entry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGSTR1Entries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGSTR1Entries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getGSTR1Entries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedGSTR1Period.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedGSTR1Period.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedGSTR1Period.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentGSTR1Entry,
    updateB2B,
    updateB2C,
    updateB2CS,
    updateExports,
    updateNilRated,
    updateCredit,
    updateCreditUnregistered,
    updateTaxLiability,
    updateAdjustments,
    updateHSN,
    updateDocuments,
    updateSuppliesThroughEco,
    updateSuppliesB2B,
    resetGSTR1State,
    clearGSTR1Entries,
    setSuggestedPeriod
} = gstr1Slice.actions;

export default gstr1Slice.reducer;