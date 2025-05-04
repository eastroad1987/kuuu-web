"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  categories: object;
  backgroundColor: string;
};

const initialState = {
  categories: [],
  backgroundColor: "#FFFFFF",
} as AppState;

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: () => initialState,

    setCategories: (state: AppState, action: PayloadAction<object>) => {
      state.categories = action.payload;
    },

    setBackgroundColor: (state: AppState, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const {
  reset,
  setCategories,
  setBackgroundColor,
} = app.actions;

export default app.reducer;
