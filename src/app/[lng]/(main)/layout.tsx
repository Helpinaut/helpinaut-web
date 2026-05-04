"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { hydrateFromStorage } from "@/features/auth/auth.slice";
import { getMe } from "@/features/users/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ReactNode, useEffect } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
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
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <Hero />
      {children}
      <Footer />
    </div>
  );
}
