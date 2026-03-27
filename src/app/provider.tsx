"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function AppProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
