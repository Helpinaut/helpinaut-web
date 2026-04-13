import axios from "axios";

export type ApiError = {
  message: string;
  status?: number;
};

export const handleThunkError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ?? error.message ?? "Request failed",
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Unknown error" };
};
