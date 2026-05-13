import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  return {
    title: { default: t("title"), template: `%s | ${t("title")}` },
    description: t("description"),
    icons: {
      icon: [
        {
          url: "/helpinaut-light.svg",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/helpinaut-dark.svg",
          media: "(prefers-color-scheme: light)",
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster position="top-center" closeButton richColors theme="system" />
    </NextIntlClientProvider>
  );
}
