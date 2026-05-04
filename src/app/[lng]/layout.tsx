import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppProvider } from "./provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from "next-i18next/server";
import i18nConfig from "../../../i18n.config";
import { I18nProvider } from "next-i18next/client";
import { dir } from "i18next";

initServerI18next(i18nConfig);

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

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

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <html
      lang={lng}
      dir={dir(lng)}
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
            <I18nProvider language={lng} resources={resources}>
              {children}
            </I18nProvider>
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
