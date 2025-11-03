import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerState {
  visible: boolean;
  imageUrl: string;
}

const initialState: BannerState = {
  visible: true, 
  imageUrl: '/banner.jpg', 
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    hideBanner: (state) => {
      state.visible = false;
    },
    showBanner: (state, action: PayloadAction<string>) => {
      state.visible = true;
      state.imageUrl = action.payload;
    },
  },
});

export const { hideBanner, showBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
