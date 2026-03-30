import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppProvider } from "./provider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Helpinaut",
  description:
    "Exploring better ways to help with a local services marketplace.",
  icons: "/helpinaut.svg",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
