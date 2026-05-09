import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppProvider } from "./provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <AppProvider>
          <NextIntlClientProvider>
            {children}
            <Toaster
              position="top-center"
              closeButton
              richColors
              theme="system"
            />
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
