import axios, { HttpStatusCode } from "axios";

export type ApiError = {
  code: string;
  status?: HttpStatusCode;
  field?: string;
};

export const handleThunkError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      code: error.response?.data?.code ?? "UNKNOWN_ERROR",
      status: error.response?.status,
      field: error.response?.data?.field,
    };
  }

  return { code: "UNKNOWN_ERROR" };
};
