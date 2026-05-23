"use client";

import { endpointPath } from "@/lib/api/endpoints";
import { createAppAsyncThunk } from "@/store/app.thunk";
import { getCategoriesRequest } from "./categories.service";
import { Category } from "./categories.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/lib/api/errors";

type CategoriesState = {
  categories: Category[];
  status: "idle" | "loading" | "error";
  errorCode: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  errorCode: null,
};

export const getCategories = createAppAsyncThunk<Category[]>(
  endpointPath.ADVERTS.CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesRequest();
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.errorCode = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "idle";
          state.categories = action.payload;
        },
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "error";
        state.errorCode = action.payload?.code ?? "UNKNOWN_ERROR";
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
