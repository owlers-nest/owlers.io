import { RootState } from "../store";

export const getWindow = (state: RootState) => state.ui.window;
export const getIsSmallMobile = (state: RootState) => getWindow(state).isSmallMobile;
export const getIsTabletAndLargeMobile = (state: RootState) => getWindow(state).isTabletAndLargeMobile;
export const getIsMediumTableAndSmallLaptop = (state: RootState) => getWindow(state).isMediumTableAndSmallLaptop;
export const getIsLargeLaptopsAndDesktops = (state: RootState) => getWindow(state).isLargeLaptopsAndDesktops;
export const getIsExtraLarge = (state: RootState) => getWindow(state).isExtraLarge;

export const getIsSmallScreen = (state: RootState) => getIsSmallMobile(state) || getIsTabletAndLargeMobile(state);
