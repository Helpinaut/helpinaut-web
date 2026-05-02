import { createAppAsyncThunk } from "@/store/app.thunk";
import { User } from "./user.types";
import { endpointPath } from "@/lib/api/endpoints";
import { getMeRequest } from "./user.service";
import { handleThunkError } from "@/lib/api/errors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "error";
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const getMe = createAppAsyncThunk<User>(
  endpointPath.USERS.ME,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeRequest();

      return res as User;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.error =
          action.payload?.message ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
