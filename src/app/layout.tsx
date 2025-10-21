import type { Metadata } from "next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Helpinaut",
  description: "A community-driven local services marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
