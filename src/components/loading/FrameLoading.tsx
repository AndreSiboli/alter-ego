"use client";

import styles from "@/styles/loading/FrameLoading.module.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface PropsType {
  handleLoading: (value: boolean) => void;
}

export default function FrameLoading(props: PropsType) {
  const { handleLoading } = props;
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !bgRef.current ||
      !lineRef.current ||
      !frameRef.current ||
      !textRef.current ||
      !loadingRef.current
    )
      return;

    document.body.style.overflow = "hidden";
    const children = bgRef.current.children;
    const childrenText = textRef.current.children;
    const tl = gsap.timeline();

    const c1 = getElementBounds(childrenText[0]);
    const c2 = getElementBounds(childrenText[1]);

    tl.to(childrenText[0], {
      x: c1.xMiddle - 55,
    })
      .to(childrenText[1], {
        x: c2.xMiddle + 40,
      })
      .to(childrenText, {
        duration: 0.5,
        ease: "power2.inOut",
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        stagger: 0.2,
      });

    gsap.delayedCall(3, () => {
      gsap
        .timeline()
        .to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          lineRef.current,
          {
            duration: 2,
            height: "100%",
            ease: "power4.inOut",
          },
          "=-.4"
        )
        .to(lineRef.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          childrenText,
          {
            duration: 0.15,
            "clip-path": " polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          },
          "=-.4"
        )
        .to(
          children,
          {
            duration: 0.5,
            scaleY: 0,
          },
          "=-.3"
        )
        .to(frameRef.current, {
          visibility: "hidden",
          onStart: () => {
            document.body.style.overflow = "auto";
            handleLoading(false);
          },
        });
    });
  }, []);

  function getElementBounds(el: Element) {
    const bound = el.getBoundingClientRect();
    const windowWidth = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;

    return {
      xMiddle: windowWidth - bound.left - bound.width * 0.5,
      yMiddle: windowHeight - bound.top - bound.height * 0.5,
    };
  }

  return (
    <div className={styles.frame} ref={frameRef}>
      <div className={styles.frame_bg} ref={bgRef}>
        <div className={styles.bg_part} />
        <div className={styles.bg_part} />
      </div>

      <div className={styles.frame_line} ref={lineRef} />

      <div className={styles.frame_text} ref={textRef}>
        <div>Alter</div>
        <div>Ego</div>
      </div>

      <div className={styles.frame_loading} ref={loadingRef} />
    </div>
  );
}
