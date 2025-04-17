import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRestricted } from '../api.ts';

export interface BusinessDetails {
    tradeName: string;
    constitutionOfBusiness: string;
    reasonForRegistration: string;
    commencementDate: string;
    liabilityDate: string;
    isCasualTaxablePerson: boolean;
    isCompositionOption: boolean;
    registrations: Array<{ type: string; number: string; date: string }>;
    document: File | null;
}

export interface Promoter {
    firstName: string;
    middleName: string;
    lastName: string;
    fathersFirstName: string;
    fathersMiddleName: string;
    fathersLastName: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    gender: string;
    telephoneNumber: string;
    designation: string;
    directorIdentificationNumber: string;
    isIndianCitizen: boolean;
    pan: string;
    passportNumber: string;
    aadhaarNumber: string;
    pinCode: string;
    state: string;
    district: string;
    city: string;
    locality: string;
    road: string;
    premisesName: string;
    buildingNumber: string;
    floorNumber: string;
    landmark: string;
    latitude: string;
    longitude: string;
    photograph: string | null;
    isAuthorizedSignatory: boolean;
}

export interface AuthorizedSignatory {
    firstName: string;
    middleName: string;
    lastName: string;
    fathersFirstName: string;
    fathersMiddleName: string;
    fathersLastName: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    gender: string;
    telephoneNumber: string;
    designation: string;
    directorIdentificationNumber: string;
    isIndianCitizen: boolean;
    pan: string;
    passportNumber: string;
    aadhaarNumber: string;
    pinCode: string;
    state: string;
    district: string;
    city: string;
    locality: string;
    road: string;
    premisesName: string;
    buildingNumber: string;
    floorNumber: string;
    landmark: string;
    latitude: string;
    longitude: string;
    photograph: string | null;
    proof: string | null;
    isPrimaryAuthorizedSignatory: boolean;
}

export interface AuthorizedRepresentative {
    type: string;
    enrollmentId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    designation: string;
    mobileNumber: string;
    email: string;
    pan: string;
    aadhaar: string;
    telephone: string;
    fax: string;
};

export interface PlaceDetails {
    pinCode: string;
    state: string;
    district: string;
    city: string;
    locality: string;
    road: string;
    premises: string;
    buildingNo: string;
    floorNo: string;
    landmark: string;
    latitude: string;
    longitude: string;
    stateJurisdiction: string;
    sector: string;
    commissioner: string;
    division: string;
    range: string;
    officeEmail: string;
    officeTelephone: string;
    mobileNumber: string;
    officeFax: string;
    natureOfPossession: string;
    documentProof: string;
    businessNature: string[];
    otherBusinessNature: string;
    uploadedFile: File | null;
}

export interface GstRegistrations {
    id?: string | null;
    userType?: string;
    state?: string;
    district?: string;
    businessName?: string;
    pan?: string;
    email?: string;
    mobileNumber?: string;
    businessDetails?: BusinessDetails;
    promoter?: Promoter[];
    authorizedSignatory?: AuthorizedSignatory[];
    authorizedRepresentative?: AuthorizedRepresentative;
    place?: PlaceDetails;
    additionalPlaces?: PlaceDetails[];
    goods?: Array<{ id: string; hsnCode: string; description: string }>;
    services?: Array<{ id: string; hsnCode: string; description: string }>;
    stateSpecificInfo?: {
        taxECNo: string;
        taxRegisCertNo: string;
        exciseLicenseNo: string;
        licenseHolderName: string;
    };
    isAdhaarAuth?: boolean;
    verification?: {
        signatory: string,
        place: string,
        designation: string,
        agreed: boolean,
    },
    gstIn?: string,
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface GstRegistrationState {
    currentRegistration: GstRegistrations | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    // lastOperation: 'create' | 'update' | null;
}

const initialState: GstRegistrationState = {
    currentRegistration: null,
    loading: false,
    error: null,
    success: false,
    // lastOperation: null,
};

// Unified thunk for create/update GST registration
export const saveGstRegistration = createAsyncThunk(
    'gstRegistration/save',
    async (registrationData: Partial<GstRegistrations>, { rejectWithValue }) => {
        try {
            // const isUpdate = !!registrationData.id;
            // const method = isUpdate ? 'put' : 'post';
            const url = '/gst/gst-registrations';
            console.log(registrationData);
            const response = await apiRestricted.post(url, registrationData);
            return {
                data: response.data,
                // operation: isUpdate ? 'update' : 'create'
            };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);

export const getGstIns = createAsyncThunk(
    'gst/gstins',
    async (_, { rejectWithValue }) => {
        try {
            const url = '/gst/gstIns';
            const response = await apiRestricted.get(url);
            return {
                data: response.data,
            };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch GSTINs'
            );
        }
    }
);

const gstRegistrationSlice = createSlice({
    name: 'gstRegistration',
    initialState,
    reducers: {
        setCurrentRegistration(state, action: PayloadAction<GstRegistrations | null>) {
            state.currentRegistration = action.payload;
        },
        resetGstRegistrationState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
            // state.lastOperation = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGstRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                // state.lastOperation = null;
            })
            .addCase(saveGstRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRegistration = action.payload.data;
                state.success = true;
                // state.lastOperation = action.payload.operation;
            })
            .addCase(saveGstRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // state.lastOperation = null;
            });
    },
});

export const { setCurrentRegistration, resetGstRegistrationState } = gstRegistrationSlice.actions;
export default gstRegistrationSlice.reducer;