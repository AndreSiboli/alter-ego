"use client";

// import styles from "./page.module.scss";
import FrameLoading from "@/components/loading/FrameLoading";
import { useState } from "react";
import { Lenis } from "lenis/react";

import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import Question from "@/components/pages/home/Question";
import Answer from "@/components/pages/home/Answer";
import CollageImages from "@/components/pages/home/CollageImages";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <FrameLoading handleLoading={setIsLoading}/>
      <Lenis root options={{ anchors: true }}>
        <Hero isLoading={isLoading}/>
        <About />
        <Question />
        <Answer />
        <CollageImages />
      </Lenis>
    </>
  );
}
