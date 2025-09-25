import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface Form26QEmployee {
    // Employee Personal Details
    employeePAN: string;
    employeeName: string;
    employeeAddress: string;
    employeeCity: string;
    employeeState: string;
    employeePincode: string;
    employeeMobile: string;
    employeeEmail: string;
    employeeDOB: string;
    employeeGender: string;
    employeeFatherName: string;
    
    // Employment Details
    employeeDesignation: string;
    employeeDOJ: string; // Date of Joining
    employeeDOL: string; // Date of Leaving (if applicable)
    employeeDepartment: string;
    employeeEmployeeID: string;
    
    // Salary Structure
    basicSalary: string;
    dearnessAllowance: string;
    houseRentAllowance: string;
    conveyanceAllowance: string;
    medicalAllowance: string;
    specialAllowance: string;
    otherAllowances: string;
    grossSalary: string;
    
    // Deductions
    professionalTax: string;
    providentFund: string;
    employeeStateInsurance: string;
    otherDeductions: string;
    totalDeductions: string;
    
    // Taxable Income and Tax
    taxableIncome: string;
    taxDeducted: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTaxDeducted: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tdsCertificateNumber: string;
}

export interface Form26QEntry {
    id?: string;
    tan: string;
    financialYear: string;
    quarter: string;
    employees: Form26QEmployee[];
    totalSalaryPaid: string;
    totalTdsDeducted: string;
    totalTdsDeposited: string;
    totalTdsRefund: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Form26QPeriod {
    financialYear: string;
    quarter: string;
}

export interface Form26QState {
    currentEntry: Form26QEntry | null;
    entries: Form26QEntry[];
    suggestedPeriod: Form26QPeriod | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface Form26QFilterParams {
    tan: string;
    financialYear?: string;
    quarter?: string;
}

const initialState: Form26QState = {
    currentEntry: null,
    entries: [],
    suggestedPeriod: null,
    loading: false,
    error: null,
    success: false,
};

export const saveForm26QEntry = createAsyncThunk(
    'form26q/save',
    async (entryData: Partial<Form26QEntry>, { rejectWithValue }) => {
        try {
            const url = '/tds/form26q';
            const method = entryData.id ? 'put' : 'post';

            console.log("Form 26Q Entry Data:", entryData);
            const response = await apiRestricted[method](url, entryData);
            return response.data as Form26QEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to save Form 26Q entry'
            );
        }
    }
);

export const getForm26QEntry = createAsyncThunk(
    'form26q/getOne',
    async (params: Form26QFilterParams, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form26q', { params });
            return response.data.data.entry as Form26QEntry;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 26Q entry'
            );
        }
    }
);

export const getForm26QEntries = createAsyncThunk(
    'form26q/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form26q/all');
            return response.data.data.form26qEntries as Form26QEntry[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch Form 26Q entries'
            );
        }
    }
);

export const getSuggestedForm26QPeriod = createAsyncThunk(
    'form26q/getSuggestedPeriod',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiRestricted.get('/tds/form26q/suggestedPeriod');
            return response.data.data.suggestedPeriod as Form26QPeriod | null;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch suggested Form 26Q period'
            );
        }
    }
);

const form26qSlice = createSlice({
    name: 'form26q',
    initialState,
    reducers: {
        setCurrentForm26QEntry(state, action: PayloadAction<Form26QEntry | null>) {
            state.currentEntry = action.payload;
        },
        resetForm26QState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearForm26QEntries(state) {
            state.entries = [];
        },
        updateEmployee(state, action: PayloadAction<Partial<Form26QEmployee>>) {
            if (state.currentEntry) {
                if (!state.currentEntry.employees) {
                    state.currentEntry.employees = [];
                }
                state.currentEntry.employees.push(action.payload as Form26QEmployee);
            }
        },
        setSuggestedPeriod(state, action: PayloadAction<Form26QPeriod | null>) {
            state.suggestedPeriod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveForm26QEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveForm26QEntry.fulfilled, (state, action) => {
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
            .addCase(saveForm26QEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm26QEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm26QEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEntry = action.payload;
            })
            .addCase(getForm26QEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getForm26QEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getForm26QEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(getForm26QEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSuggestedForm26QPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuggestedForm26QPeriod.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Setting suggested Form 26Q period:', action.payload); 
                state.suggestedPeriod = action.payload;
            })
            .addCase(getSuggestedForm26QPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setCurrentForm26QEntry,
    updateEmployee,
    resetForm26QState,
    clearForm26QEntries,
    setSuggestedPeriod
} = form26qSlice.actions;

export default form26qSlice.reducer;
