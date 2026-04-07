"use client";

import { endpointPath } from "@/lib/api/endpoints";
import { LoginDto, SignupDto, User } from "./auth.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginRequest, signupRequest } from "./auth.service";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "error";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  string,
  LoginDto,
  { rejectValue: string }
>(endpointPath.AUTH.LOGIN, async (dto, { rejectWithValue }) => {
  try {
    const res = await loginRequest(dto);

    return res.accessToken;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const signup = createAsyncThunk(
  endpointPath.AUTH.SIGNUP,
  async (dto: SignupDto, { rejectWithValue }) => {
    try {
      const res = await signupRequest(dto);

      return res.accessToken;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? error?.message ?? "Signup failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      if (typeof window === "undefined") {
        return;
      }

      const token = localStorage.getItem("accessToken");

      if (token) {
        state.accessToken = token;
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.accessToken = action.payload;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.accessToken = action.payload;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", action.payload);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { hydrateFromStorage, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
