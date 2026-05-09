"use client";

import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

//TODO: fix error about "encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client" related to ThemeProvider when language is changed.

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
