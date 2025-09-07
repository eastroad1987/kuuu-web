'use client'

import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { createLogger } from 'redux-logger';


// const logger = createLogger();

export const store = configureStore({
  reducer: {
    reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
