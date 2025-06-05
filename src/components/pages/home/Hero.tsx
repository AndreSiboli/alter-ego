"use client";

import { characters } from "@/data/characters";
import { use, useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/home/Hero.module.scss";
import gsap from "gsap";
import { NavbarContext } from "@/_context/NavbarContext";
import Image from "next/image";
import Container from "@/components/layout/Container";

import { LiaExchangeAltSolid } from "react-icons/lia";
import { LoadingContext } from "@/_context/Loading";

export default function Hero() {
  const { isLoading } = use(LoadingContext);
  const { setNavStyles } = use(NavbarContext);
  const [currCharacter, setCurrCharacter] = useState(characters[0]);
  const [isChanging, setIsChanging] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const asideRightRef = useRef<HTMLDivElement>(null);
  const asideLeftRef = useRef<HTMLDivElement>(null);

  function appearAnimation() {
    setNavStyles({ color: currCharacter.palletColor.font });
    gsap
      .timeline()
      .to(parentRef.current, {
        background: currCharacter.palletColor.normal,
        duration: 0.2,
        ease: "power1.inOut",
      })
      .to(
        [asideLeftRef.current, asideRightRef.current],
        {
          duration: 0.5,
          ease: "power2.inOut",
          opacity: 1,
          stagger: 0.2,
        },
        "-=.1"
      )
      .fromTo(
        h1Ref.current,
        {
          xPercent: -50,
          yPercent: 40,
        },
        {
          opacity: 1,
          yPercent: -50,
          ease: "power2.inOut",
          duration: 0.5,
        },
        "-=.3"
      )
      .to(
        heroImageRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          duration: 0.5,
          onComplete: () => {
            setIsChanging(false);
          },
        },
        "-=.2"
      );
  }

  function disappearAnimation() {
    gsap
      .timeline()
      .to([asideLeftRef.current, asideRightRef.current], {
        duration: 0.5,
        ease: "power2.inOut",
        opacity: 0,
        stagger: 0.2,
        onComplete: () => {
          asideLeftRef.current!.style.color = currCharacter.palletColor.font;
          asideRightRef.current!.style.color = currCharacter.palletColor.font;
        },
      })
      .to(
        heroImageRef.current,
        {
          opacity: 0,
          y: 100,
          ease: "power2.inOut",
          duration: 0.5,
        },
        "-=.5"
      )
      .to(
        h1Ref.current,
        {
          yPercent: 40,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.5,
          onComplete: () => {
            h1Ref.current!.style.color = currCharacter.palletColor.font;
          },
        },
        "-=.35"
      );
  }

  function changeBg() {
    gsap.to(parentRef.current, {
      background: currCharacter.palletColor.normal,
    });
  }

  function changeColor() {
    setNavStyles({ color: currCharacter.palletColor.font });
    gsap
      .timeline()
      .to([asideLeftRef.current, asideRightRef.current], {
        color: currCharacter.palletColor.font,
      })
      .to(h1Ref.current, {
        color: currCharacter.palletColor.font,
      });
  }

  function changeCharacter(id: string) {
    setCurrCharacter(characters.find((c) => c.id === id) || characters[0]);
  }

  //First loading
  useEffect(() => {
    changeColor();
    changeBg();
    if (isLoading) return;
    appearAnimation();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    changeColor();
    setTimeout(() => {
      appearAnimation();
    }, 250);
  }, [currCharacter]);

  function handleCharacterChange(id: string) {
    if (isChanging) return;
    setIsChanging(true);

    disappearAnimation();
    setTimeout(() => {
      changeCharacter(id);
    }, 800);
  }

  return (
    <div className={styles.hero} id="home" ref={parentRef}>
      <Container>
        <div className={styles.hero_middle}>
          <div className={styles.hero_title} ref={h1Ref}>
            <h1>{currCharacter.title}</h1>
          </div>

          <figure className={styles.hero_image} ref={heroImageRef}>
            <Image
              src={currCharacter.image.src}
              alt={currCharacter.image.alt}
              sizes="100vw"
            />
          </figure>

          <div className={styles.hero_button}>
            <button
              className={styles.test}
              aria-label="Change character"
              onClick={() => {
                const num = Number(currCharacter.id);
                handleCharacterChange(
                  num > 5 ? characters[0].id : characters[num].id
                );
              }}
            >
              <LiaExchangeAltSolid />
            </button>
          </div>
        </div>
      </Container>

      <aside className={styles.hero_infinite} ref={asideLeftRef}>
        {infiniteSlide({ string: currCharacter.japanese, length: 4 })}
      </aside>

      <aside
        className={`${styles.hero_infinite} ${styles.right}`}
        ref={asideRightRef}
      >
        {infiniteSlide({ string: "Embrace your alter ego", length: 2 })}
      </aside>
    </div>
  );
}

function infiniteSlide(props: { string: string; length: number }) {
  return (
    <div className={styles.infinite_wrapper}>
      <div className={styles.wrapper_container}>
        {Array.from({ length: props.length }, (_, i) =>
          i === 0 ? (
            <p aria-hidden="true" key={i}>
              {props.string}
            </p>
          ) : (
            <p key={i}>{props.string}</p>
          )
        )}
      </div>
      <div className={styles.wrapper_container} aria-hidden="true">
        {Array.from({ length: props.length }, (_, i) => (
          <p key={i}>{props.string}</p>
        ))}
      </div>
    </div>
  );
}
