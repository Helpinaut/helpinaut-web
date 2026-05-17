"use client";

import { endpointPath } from "@/lib/api/endpoints";
import { LoginFormValues, SignupFormValues } from "./auth.types";
import { User } from "../users/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginRequest, signupRequest } from "./auth.service";
import { handleThunkError } from "@/lib/api/errors";
import { createAppAsyncThunk } from "@/store/app.thunk";
import { tokenStorage } from "@/lib/auth/token";
import { clearUser } from "../users/user.slice";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "error";
  errorCode: string | null;
};

type AuthSessionPayload = {
  accessToken: string;
  remember: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  errorCode: null,
};

export const login = createAppAsyncThunk<AuthSessionPayload, LoginFormValues>(
  endpointPath.AUTH.LOGIN,
  async (dto, { rejectWithValue }) => {
    try {
      const { remember, ...credentials } = dto;
      const res = await loginRequest(credentials);

      return { accessToken: res.accessToken, remember };
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

export const signup = createAppAsyncThunk<AuthSessionPayload, SignupFormValues>(
  endpointPath.AUTH.SIGNUP,
  async (dto, { rejectWithValue }) => {
    try {
      const res = await signupRequest(dto);

      return { accessToken: res.accessToken, remember: true };
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

export const logout = createAppAsyncThunk(
  endpointPath.AUTH.LOGOUT,
  async (_, { dispatch }) => {
    dispatch(clearAuth());
    dispatch(clearUser());
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      const token = tokenStorage.get();

      if (token) {
        state.accessToken = token;
      }
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;

      tokenStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.errorCode = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthSessionPayload>) => {
          state.status = "idle";
          state.accessToken = action.payload.accessToken;

          tokenStorage.save(
            action.payload.accessToken,
            action.payload.remember,
          );
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.errorCode = action.payload?.code ?? "UNKNOWN_ERROR";
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.errorCode = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<AuthSessionPayload>) => {
          state.status = "idle";
          state.accessToken = action.payload.accessToken;

          tokenStorage.save(
            action.payload.accessToken,
            action.payload.remember,
          );
        },
      )
      .addCase(signup.rejected, (state, action) => {
        state.status = "error";
        state.errorCode = action.payload?.code ?? "UNKNOWN_ERROR";
      });
  },
});

export const { hydrateFromStorage, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
