import { configureStore } from '@reduxjs/toolkit';
import popupReducer, { openLoginPopup } from './slices/PopupSlice.ts';
import authReducer, { logout, logoutUser } from './slices/AuthSlice.ts';
import gstAuthReducer from './slices/gstAuthSlice.ts';
import gstr1Reducer from "./slices/gstr1Slice.ts";
import gstr3bReducer from "./slices/gstr3bSlice.ts";
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
    gstr3b: gstr3bReducer,
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
