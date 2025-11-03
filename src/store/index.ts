import { configureStore } from '@reduxjs/toolkit';
import popupReducer, { openLoginPopup } from './slices/PopupSlice.ts';
import authReducer, { logout, logoutUser } from './slices/AuthSlice.ts';
import gstAuthReducer from './slices/gstAuthSlice.ts';
import gstr1Reducer from "./slices/gstr1Slice.ts";
import gstr2aReducer from "./slices/gstr2aSlice.ts";
import gstr2bReducer from "./slices/gstr2bSlice.ts";
import gstr3bReducer from "./slices/gstr3bSlice.ts";
import form26qReducer from "./slices/form26qSlice.ts";
import form16aReducer from "./slices/form16aSlice.ts";
import form27qReducer from "./slices/form27qSlice.ts";
import form27eqReducer from "./slices/form27eqSlice.ts";
import aoc4Reducer from "./slices/aoc4Slice.ts";
import mgt7Reducer from "./slices/mgt7Slice.ts";
import gstRegistrationReducer from "./slices/gstSlice.ts";
import bannerReducer from "./slices/BannerSlice.ts";

import { apiRestricted } from './api.ts';
import { toast } from 'react-toastify';

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
    gstAuth: gstAuthReducer,
    gstr1: gstr1Reducer,
    gstr2a: gstr2aReducer,
    gstr2b: gstr2bReducer,
    gstr3b: gstr3bReducer,
    form26q: form26qReducer,
    form16a: form16aReducer,
    form27q: form27qReducer,
    form27eq: form27eqReducer,
    aoc4: aoc4Reducer,
    mgt7: mgt7Reducer,
    gstRegistration: gstRegistrationReducer,
    banner: bannerReducer
  },
});

apiRestricted.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};

    if (status === 401 || status === 403) {
      console.log(":( not login");
      toast.error("Session expired. Please login to continue");
      store.dispatch(logout());
      store.dispatch(openLoginPopup());

      // window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
