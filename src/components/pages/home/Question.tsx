"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/pages/home/Question.module.scss";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Img from "@/components/utils/Img";

import cyberpunk from "@/assets/cyberpunk.png";

gsap.registerPlugin(SplitText);

export default function Question() {
  const parentRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line1Image = useRef<HTMLDivElement>(null);
  const line3Span = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const split1 = new SplitText(line1Ref.current, { type: "chars" });
    const split2 = new SplitText(line2Ref.current, { type: "lines" });
    const split3 = new SplitText(line3Ref.current, { type: "chars" });
    const split4 = new SplitText(line4Ref.current, { type: "words" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 90%",
        end: "60% top",
        scrub: 0.5,
      },
    });

    tl.from(split1.chars, {
      y: 100,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.05,
    })
      .from(line1Image.current, {
        scale: 0,
        duration: 0.15,
        ease: "back.out",
      })
      .fromTo(
        split2.lines,
        {
          "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          ease: "power2.out",
        }
      )
      .from(split3.chars, {
        scale: 0,
        perspective: "1000px",
        ease: "power2.out",
        stagger: 0.05,
      })

      .from(split4.words, {
        y: 100,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.15,
      })
      .to(
        line3Span.current,
        {
          background: "#fff",
          color: "#000",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=.8"
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.question} ref={parentRef}>
      <div className={styles.question_container}>
        <div className={styles.question_text}>
          <div className={styles.text_line}>
            <p ref={line1Ref}>Am I crazy</p>
            <figure className={styles.wrapper_image} ref={line1Image}>
              <Img src={cyberpunk} />
            </figure>
          </div>
          <p ref={line2Ref}>for having an</p>
          <p ref={line3Ref}>
            alter <span ref={line3Span}>ego</span>
          </p>
          <p ref={line4Ref}>based on anime?</p>
        </div>
      </div>
    </section>
  );
}
