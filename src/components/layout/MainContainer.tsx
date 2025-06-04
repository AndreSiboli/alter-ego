import { ReactNode } from "react";

import Navbar from "@/components/navbar/Index";
import Footer from "@/components/layout/Footer";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "relative", minHeight: "100dvh" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
