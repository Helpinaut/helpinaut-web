import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || routing.defaultLocale;
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
