import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppProviders } from "./provider";

export const metadata: Metadata = {
  title: "Helpinaut",
  description:
    "Exploring better ways to help with a local services marketplace.",
  icons: "/helpinaut.svg",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
