import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/PopupSlice.ts';
import authReducer from './slices/AuthSlice.ts'; 

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
