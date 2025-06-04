import type { Metadata } from "next";
import { UnifrakturCook, Exo_2 } from "next/font/google";
import "./globals.scss";
import MainContainer from "@/components/layout/MainContainer";
import NavbarProvider from "@/_context/NavbarContext";

const unifracturCook = UnifrakturCook({
  variable: "--font-cook",
  weight: ["700"],
  subsets: ["latin"],
});

const exo_2 = Exo_2({
  variable: "--font-exo2",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alter Ego",
  description:
    "This is just a project to practice my skills with GSAP. It's not an informative post. If you're interested in the topic, feel free to do your own research.",
  authors: [{ name: "André Siboli", url: "https://github.com/AndreSiboli" }],
  keywords: 'anime, alter ego, gsap, animation'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo_2.className} ${unifracturCook.variable}`}>
        <NavbarProvider>
          <MainContainer>{children}</MainContainer>
        </NavbarProvider>
      </body>
    </html>
  );
}
