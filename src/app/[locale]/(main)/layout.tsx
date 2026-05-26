import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
