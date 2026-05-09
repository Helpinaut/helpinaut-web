"use client";

import { hydrateFromStorage } from "@/features/auth/auth.slice";
import { getMe } from "@/features/users/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ReactNode, useEffect } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.accessToken);

  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token]);

  return children;
}
