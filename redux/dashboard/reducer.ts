import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DashboardState = {
  tempJobPost: object;
};

const initialState = {
  tempJobPost: {}, // temp save job post
} as DashboardState;

export const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: () => initialState,

    setTempJobPost: (state: DashboardState, action: PayloadAction<object>) => {
      state.tempJobPost = { ...state.tempJobPost, ...action.payload };
    },
    // setSelectedApplicantJobPost: (state: DashboardState, action: PayloadAction<object>) => {
    //   state.selectedApplicantJobPost = { ...state.selectedApplicantJobPost, ...action.payload };
    // },
    // setSelectedPostInApplicant: (state: DashboardState, action: PayloadAction<object>) => {
    //   state.selectedPostInApplicant = { ...state.selectedPostInApplicant, ...action.payload };
    // },
    // setSelectedDashboard: (state: DashboardState, action: PayloadAction<DashboardType>) => {
    //   state.selectedDashboard = action.payload;
    // },
    // setIsDisabledFooter: (state: DashboardState, action: PayloadAction<boolean>) => {
    //   state.isDisabledFooter = action.payload;
    // },
    // setIsOpenOutJobPostModal: (state: DashboardState, action: PayloadAction<boolean>) => {
    //   state.isOpenOutJobPostModal = action.payload;
    // },
    // setIsOpenSaveJobPostToast: (state: DashboardState, action: PayloadAction<boolean>) => {
    //   state.isOpenSaveJobPostToast = action.payload;
    // },
    // setScrapProfiles: (state: DashboardState, action: PayloadAction<[]>) => {
    //   state.scrapProfiles = { ...state.scrapProfiles, ...action.payload };
    // },
    // setDisabledFooter: (state: DashboardState, action: PayloadAction<boolean>) => {
    //   state.isDisabledFooter = action.payload;
    // },
  },
});

export const {
  reset,
  setTempJobPost,
  // setScrapProfiles,
  // setIsDisabledFooter,
  // setSelectedDashboard,
  // setIsOpenOutJobPostModal,
  // setIsOpenSaveJobPostToast,
  // setSelectedApplicantJobPost,
  // setDisabledFooter,
} = dashboard.actions;

export default dashboard.reducer;
