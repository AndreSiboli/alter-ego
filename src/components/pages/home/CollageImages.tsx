import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import styles from "@/styles/pages/home/CollageImages.module.scss";
import Img from "@/components/utils/Img";

import cowboy from "@/assets/thumbnails/cowboy.png";
import hiro from "@/assets/thumbnails/hiro.png";
import ochaco from "@/assets/thumbnails/ochaco.png";
import ichigo from "@/assets/thumbnails/ichigo.png";
import thorfinn from "@/assets/thumbnails/thorfinn.png";
import evagelion from "@/assets/thumbnails/evagelion.png";

gsap.registerPlugin(ScrollTrigger);

export default function CollageImages() {
  const images = [
    {
      src: cowboy,
      alt: "Image from Spike Spiegel from Cowboy Bebop",
      style: { objectPosition: "90% center" },
    },
    {
      src: hiro,
      alt: "Image from Hiro and Zero Two from Darling In The Franxx",
      style: { objectPosition: "30% center" },
    },
    {
      src: ochaco,
      alt: "Image from Ochaco Uraraka from My Hero Academia",
    },
    {
      src: ichigo,
      alt: "Image from Ichigo from Bleach",
    },
    {
      src: thorfinn,
      alt: "Image from Thorfinn from Vinland Saga",
      style: { objectPosition: "40% center" },
    },
    {
      src: evagelion,
      alt: "Image from Shinji Ikari from Evangelion",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prevIsMobile = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function resetStyles() {
    if (!parentRef.current) return;
    const children = [...parentRef.current.children] as HTMLElement[];
    children.forEach((child) => {
      gsap.set(child, { clearProps: "all" });
    });
  }

  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

    resetStyles();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "-10% bottom",
        end: "top top",
        scrub: 0.5,
      },
    });

    if (isMobile) mobileAnimation(tl);
    else screenAnimation(tl);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(); 
    });

    tlRef.current = tl;
    prevIsMobile.current = isMobile;
  }, [isMobile]);

  function mobileAnimation(tl: gsap.core.Timeline) {
    if (!parentRef.current) return;
    const children = [...parentRef.current.children];
    tl.from(children, {
      y: 200,
      opacity: 0,
      stagger: 0.1,
      ease: "power1.out",
    });
  }

  function screenAnimation(tl: gsap.core.Timeline) {
    if (!parentRef.current) return;
    const children = [...parentRef.current.children];
    const set = [
      { y: -50 },
      { y: -100 },
      { y: -50 },
      { y: 50 },
      { y: 100 },
      { y: 50 },
    ];

    children.forEach((child, i) => {
      tl.fromTo(
        child,
        {
          ...set[i],
          clipPath: "inset(12% 6% 5% 2%)",
          scale: 0.7,
        },
        {
          duration: 0.5,
          scale: 1,
          clipPath: "inset(0%)",
          ease: "power2.inOut",
          y: 0,
        },
        "-=0.5"
      );
    });
  }

  return (
    <section className={styles.images} id="inspirations" ref={parentRef}>
      {images.map((image, i) => (
        <figure className={styles.image_wrapper} key={image.alt + i}>
          <Img src={image.src} alt={image.alt} styles={image.style} />
        </figure>
      ))}
    </section>
  );
}
