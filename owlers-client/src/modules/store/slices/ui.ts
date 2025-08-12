import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Window {
  windowSize: {
    width: number;
    height: number;
  };
  isSmallMobile: boolean;
  isTabletAndLargeMobile: boolean;
  isMediumTableAndSmallLaptop: boolean;
  isLargeLaptopsAndDesktops: boolean;
  isExtraLarge: boolean;
}

interface UI {
  window: Window;
}

const initialState: UI = {
  window: {
    windowSize: {
      width: 0,
      height: 0,
    },
    isSmallMobile: false,
    isTabletAndLargeMobile: false,
    isMediumTableAndSmallLaptop: false,
    isLargeLaptopsAndDesktops: false,
    isExtraLarge: false,
  },
};

export const counterSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setWindow: (state, action: PayloadAction<Window>) => {
        state.window = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWindow } = counterSlice.actions;

export default counterSlice.reducer;
