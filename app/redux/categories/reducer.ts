import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  categories: object;
};

const initialState = {
  categories: [],
} as CategoryState;

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: () => initialState,

    setCategories: (state: CategoryState, action: PayloadAction<object>) => {
      state.categories = action.payload;
    },
  },
});

export const {
  reset,
  setCategories,
} = categories.actions;

export default categories.reducer;
