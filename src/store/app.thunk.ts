import { ApiError } from "@/lib/api/errors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: ApiError;
}>();
