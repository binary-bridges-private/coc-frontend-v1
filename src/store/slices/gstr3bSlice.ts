import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api';
import { toast } from 'react-toastify';

// ==================== INTERFACES ====================

interface TaxDetails {
  taxableValue?: string;
  integratedTax?: string;
  centralTax?: string;
  stateTax?: string;
  cess?: string;
}

interface OutwardReverseCharge {
  ots?: TaxDetails;
  otsZeroRated?: TaxDetails;
  oss?: TaxDetails;
  is?: TaxDetails;
  os?: TaxDetails;
}

interface EcommerceSupplies {
  first?: TaxDetails;
  second?: TaxDetails;
}

interface InterstateSupplyRow {
  placeOfSupply?: string;
  taxableValue?: string;
  integratedTax?: string;
}

interface InterstateSupplies {
  nregisteredRows?: InterstateSupplyRow[];
  compositionRows?: InterstateSupplyRow[];
  uinRows?: InterstateSupplyRow[];
}

interface EligibleItc {
  importOfGoods?: TaxDetails;
  importOfServices?: TaxDetails;
  inwardSuppliesReverseCharge?: TaxDetails;
  inwardSuppliesFromIsd?: TaxDetails;
  allOtherItc?: TaxDetails;
  asPerRules?: TaxDetails;
  others?: TaxDetails;
  netItcAvailable?: TaxDetails;
  itcReclaimed?: TaxDetails;
  ineligibleItc?: TaxDetails;
}

interface InwardSupplies {
  supplierUnderScheme?: {
    interState?: string;
    intraState?: string;
  };
  nonGstSupply?: {
    interState?: string;
    intraState?: string;
  };
}

interface TaxInterest {
  integratedTax?: string;
  centralTax?: string;
  stateTax?: string;
  cess?: string;
}

interface InterestPreviousTaxPeriod {
  declare?: boolean;
  interest?: TaxInterest;
  lateFees?: TaxInterest;
}

interface PaymentLedger {
  igst?: string;
  cgst?: string;
  sgst?: string;
  cess?: string;
  total?: string;
}

interface PaymentCategory {
  cashLedger?: PaymentLedger;
  creditLedger?: PaymentLedger;
}

interface PaymentOfTax {
  Tax?: PaymentCategory;
  Interest?: PaymentCategory;
  LateFees?: PaymentCategory;
}

export interface Gstr3b {
  id?: string;
  userId: string;
  gstin: string;
  financialYear: string;
  month: string;
  outwardAndReverseChargeInward?: OutwardReverseCharge;
  suppliesThroughEcommerceOperators?: EcommerceSupplies;
  interStateSupplies?: InterstateSupplies;
  eligibleItc?: EligibleItc;
  inwardSupplies?: InwardSupplies;
  interestPreviousTaxPeriod?: InterestPreviousTaxPeriod;
  paymentOfTax?: PaymentOfTax;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Gstr3bState {
  currentReturn: Gstr3b | null;
  returns: Gstr3b[];
  suggestedPeriod: {
    financialYear: string;
    month: string;
  } | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// ==================== INITIAL STATE ====================

const initialState: Gstr3bState = {
  currentReturn: null,
  returns: [],
  suggestedPeriod: null,
  loading: false,
  error: null,
  success: false,
};

// ==================== ASYNC THUNKS ====================

export const saveGstr3b = createAsyncThunk(
  'gstr3b/save',
  async (returnData: Partial<Gstr3b>, { rejectWithValue }) => {
    try {
      const url = '/gst/gstr3b';
      const method = returnData.id ? 'put' : 'post';
      const response = await apiRestricted[method](url, returnData);
      toast.success('GSTR-3B saved successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save GSTR-3B');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getGstr3b = createAsyncThunk(
  'gstr3b/getOne',
  async ({ gstin, financialYear, month }: { gstin: string; financialYear: string; month: string }, 
  { rejectWithValue }) => {
    try {
      const response = await apiRestricted.get('/gst/gstr3b', {
        params: { gstin, financialYear, month }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getGstr3bList = createAsyncThunk(
  'gstr3b/getList',
  async (gstin: string, { rejectWithValue }) => {
    try {
      const response = await apiRestricted.get('/gst/gstr3b/all', {
        params: { gstin }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSuggestedPeriod = createAsyncThunk(
  'gstr3b/suggestedPeriod',
  async (gstin: string, { rejectWithValue }) => {
    try {
      const response = await apiRestricted.get('/gst/gstr3b/suggested-period', {
        params: { gstin }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==================== SLICE DEFINITION ====================

const gstr3bSlice = createSlice({
  name: 'gstr3b',
  initialState,
  reducers: {
    setCurrentReturn(state, action: PayloadAction<Gstr3b | null>) {
      state.currentReturn = action.payload;
    },
    resetGstr3bState(state) {
      Object.assign(state, initialState);
    },
    // Section-specific reducers
    updateOutwardSupplies(state, action: PayloadAction<Partial<OutwardReverseCharge>>) {
      if (state.currentReturn) {
        state.currentReturn.outwardAndReverseChargeInward = {
          ...(state.currentReturn.outwardAndReverseChargeInward || {}),
          ...action.payload
        };
      }
    },
    updateEcommerceSupplies(state, action: PayloadAction<Partial<EcommerceSupplies>>) {
      if (state.currentReturn) {
        state.currentReturn.suppliesThroughEcommerceOperators = {
          ...(state.currentReturn.suppliesThroughEcommerceOperators || {}),
          ...action.payload
        };
      }
    },
    updateInterStateSupplies(state, action: PayloadAction<Partial<InterstateSupplies>>) {
      if (state.currentReturn) {
        state.currentReturn.interStateSupplies = {
          ...(state.currentReturn.interStateSupplies || {}),
          ...action.payload
        };
      }
    },
    updateEligibleItc(state, action: PayloadAction<Partial<EligibleItc>>) {
      if (state.currentReturn) {
        state.currentReturn.eligibleItc = {
          ...(state.currentReturn.eligibleItc || {}),
          ...action.payload
        };
      }
    },
    updateInwardSupplies(state, action: PayloadAction<Partial<InwardSupplies>>) {
      if (state.currentReturn) {
        state.currentReturn.inwardSupplies = {
          ...(state.currentReturn.inwardSupplies || {}),
          ...action.payload
        };
      }
    },
    updateInterestPreviousPeriod(state, action: PayloadAction<Partial<InterestPreviousTaxPeriod>>) {
      if (state.currentReturn) {
        state.currentReturn.interestPreviousTaxPeriod = {
          ...(state.currentReturn.interestPreviousTaxPeriod || {}),
          ...action.payload
        };
      }
    },
    updatePaymentOfTax(state, action: PayloadAction<Partial<PaymentOfTax>>) {
      if (state.currentReturn) {
        state.currentReturn.paymentOfTax = {
          ...(state.currentReturn.paymentOfTax || {}),
          ...action.payload
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Save GSTR3B
      .addCase(saveGstr3b.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveGstr3b.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentReturn = action.payload;
        
        // Update or add to returns list
        const index = state.returns.findIndex(r => r.id === action.payload.id);
        if (index >= 0) {
          state.returns[index] = action.payload;
        } else {
          state.returns.push(action.payload);
        }
      })
      .addCase(saveGstr3b.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get single return
      .addCase(getGstr3b.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGstr3b.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReturn = action.payload;
      })
      .addCase(getGstr3b.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get return list
      .addCase(getGstr3bList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGstr3bList.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload;
      })
      .addCase(getGstr3bList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get suggested period
      .addCase(getSuggestedPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestedPeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestedPeriod = action.payload;
      })
      .addCase(getSuggestedPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// ==================== EXPORTS ====================

export const { 
  setCurrentReturn, 
  resetGstr3bState,
  updateOutwardSupplies,
  updateEcommerceSupplies,
  updateInterStateSupplies,
  updateEligibleItc,
  updateInwardSupplies,
  updateInterestPreviousPeriod,
  updatePaymentOfTax
} = gstr3bSlice.actions;

export default gstr3bSlice.reducer;