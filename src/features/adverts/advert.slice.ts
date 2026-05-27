import { createAppAsyncThunk } from "@/store/app.thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdvertFilters = {
  title?: string | null;
  priceRange?: { min: number; max: number } | null;
  category?: string | null;
  isOffer?: boolean | null;
  page: number;
  limit: number;
};

const initialState: AdvertFilters = {
  title: null,
  priceRange: null,
  category: null,
  isOffer: null,
  page: 1,
  limit: 16,
};

// export const getAdverts = createAppAsyncThunk<>()

const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<AdvertFilters>>) {
      return { ...state, ...action.payload, page: 1 };
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const { setFilters, setPage, clearFilters } = advertsSlice.actions;
export const advertsReducer = advertsSlice.reducer;
