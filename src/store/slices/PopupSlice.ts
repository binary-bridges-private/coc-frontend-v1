import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isLoginPopupOpen: boolean;
  isSignupPopupOpen: boolean;
}

const initialState: PopupState = {
  isLoginPopupOpen: false,
  isSignupPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    toggleSignupPopup(state) {
      state.isSignupPopupOpen = !state.isSignupPopupOpen;
    },
    toggleLoginPopup(state) {
      state.isLoginPopupOpen = !state.isLoginPopupOpen;
    },
    openLoginPopup(state) {
      state.isLoginPopupOpen = true;
    },
    closeLoginPopup(state) {
      state.isLoginPopupOpen = false;
    },
    openSignupPopup(state) {
      state.isSignupPopupOpen = true;
    },
    closeSignupPopup(state) {
      state.isSignupPopupOpen = false;
    },
    switchLoginToSignup(state) {
      state.isLoginPopupOpen = false;
      state.isSignupPopupOpen = true;
    },
    switchSignupToLogin(state) {
      state.isSignupPopupOpen = false;
      state.isLoginPopupOpen = true;
    }
  },
});

export const {
  toggleSignupPopup,
  toggleLoginPopup,
  openLoginPopup,
  closeLoginPopup,
  openSignupPopup,
  closeSignupPopup,
  switchLoginToSignup,
  switchSignupToLogin
} = popupSlice.actions;

export default popupSlice.reducer;
