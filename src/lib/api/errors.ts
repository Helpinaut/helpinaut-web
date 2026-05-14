import axios from "axios";

export type ApiError = {
  code: string;
  status?: number;
};

export const handleThunkError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      code: error.response?.data?.code ?? "UNKNOWN_ERROR",
      status: error.response?.status,
    };
  }

  return { code: "UNKNOWN_ERROR" };
};
