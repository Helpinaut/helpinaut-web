"use client";

import { authReducer } from "@/features/auth/auth.slice";
import { categoriesReducer } from "@/features/categories/categories.slice";
import { userReducer } from "@/features/users/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
