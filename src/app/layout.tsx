import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppProvider } from "./provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Helpinaut",
  description:
    "Exploring better ways to help with a local services marketplace.",
  icons: {
    icon: [
      {
        url: "/helpinaut-light.svg",
        media: "(prefers-color-scheme: dark",
      },
      {
        url: "/helpinaut-dark.svg",
        media: "(prefers-color-scheme: light",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-center"
              closeButton
              richColors
              theme="system"
            />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
