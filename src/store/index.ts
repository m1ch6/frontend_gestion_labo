// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import miniprojectReducer from './slices/miniprojectSlice';
// import thesisReducer from './slices/thesisSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    miniprojects: miniprojectReducer,
    // thesis: thesisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
