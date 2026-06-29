"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

import { HomePageV1, HomePageV2, HomePageV3 } from "./layout-test";
// export default HomePageV1
// export default HomePageV2
// export default HomePageV3
