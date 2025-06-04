"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import styles from "@/styles/pages/home/About.module.scss";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const parentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !textRef.current) return;

    revealText(titleRef.current);

    const childrenText = [...textRef.current.children];
    childrenText.forEach((child) => {
      revealText(child, { y: 100 }, { y: 0 });
    });
  }, []);

  function revealText(
    element: Element,
    styleFrom?: GSAPTweenVars,
    styleTo?: GSAPTweenVars
  ) {
    gsap.fromTo(
      element,
      {
        ease: "power2.inOut",
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ...styleFrom,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "-10% bottom",
        },
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 0.5,
        ...styleTo,
      }
    );
  }

  return (
    <section className={styles.about} id="what-is-it" ref={parentRef}>
      <Container>
        <div className={styles.about_container}>
          <article className={styles.about_question}>
            <header className={styles.question_title} ref={titleRef}>
              <h1>What&apos;s alter ego?</h1>
            </header>
            <div className={styles.answer_text} ref={textRef}>
              <p>
                It can refer to a hidden or contrasting side of someone&apos;s
                personality. For example, a shy person might have an alter ego
                that&apos;s confident and bold in certain settings.
              </p>
              <p>
                An alter ego is a second version of yourself, a different
                identity or personality you create or step into. Maybe after a
                situation or experience that pushes you to express a side of
                yourself that&apos;s usually hidden, like being more confident,
                fearless, or creative.
              </p>
              <p>
                Humans are complex. We aren&apos;t just one thing. We have
                courage, fear, love, anger, ambition, doubt — and sometimes we
                need a different &quot;lens&quot; to act out what we feel
                inside. That&apos;s where an alter ego comes in.
              </p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
