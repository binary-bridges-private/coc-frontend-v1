import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isLoginPopupOpen: boolean;
  isSignupPopupOpen: boolean;
  isForgetPasswordPopupOpen: boolean;
}

const initialState: PopupState = {
  isLoginPopupOpen: false,
  isSignupPopupOpen: false,
  isForgetPasswordPopupOpen: false,
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
    toggleForgetPasswordPopup(state) {
      state.isForgetPasswordPopupOpen = !state.isForgetPasswordPopupOpen;
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
    },
    openForgetPasswordPopup(state) {
      state.isForgetPasswordPopupOpen = true;
    },
    closeForgetPasswordPopup(state) {
      state.isForgetPasswordPopupOpen = false;
    },
    switchLoginToForgetPassword(state) {
      state.isLoginPopupOpen = false;
      state.isForgetPasswordPopupOpen = true;
    },
    switchForgetPasswordToLogin(state) {
      state.isForgetPasswordPopupOpen = false;
      state.isLoginPopupOpen = true;
    }
  },
});

export const {
  toggleSignupPopup,
  toggleLoginPopup,
  toggleForgetPasswordPopup,
  openLoginPopup,
  closeLoginPopup,
  openSignupPopup,
  closeSignupPopup,
  switchLoginToSignup,
  switchSignupToLogin,
  openForgetPasswordPopup,
  closeForgetPasswordPopup,
  switchLoginToForgetPassword,
  switchForgetPasswordToLogin
} = popupSlice.actions;

export default popupSlice.reducer;
