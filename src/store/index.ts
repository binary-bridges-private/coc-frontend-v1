import { configureStore } from '@reduxjs/toolkit';
import popupReducer, { openLoginPopup } from './slices/PopupSlice.ts';
import authReducer, { logout } from './slices/AuthSlice.ts'; 
import gstAuthReducer from  './slices/gstAuthSlice.ts';
import { apiRestricted } from './api.ts';

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
    gstAuth: gstAuthReducer,
  },
});

apiRestricted.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};

    if (status === 401 || status === 403) {
      console.log(":( not login");

      store.dispatch(logout());
      store.dispatch(openLoginPopup());
    
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
