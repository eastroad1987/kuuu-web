'use client'
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
// import { createLogger } from 'redux-logger';

import { setupListeners } from "@reduxjs/toolkit/dist/query";

// const logger = createLogger();

export const store = configureStore({
  reducer: {
    reducers,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
