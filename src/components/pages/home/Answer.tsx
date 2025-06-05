import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import styles from "@/styles/pages/home/Answer.module.scss";
import Container from "@/components/layout/Container";

gsap.registerPlugin(ScrollTrigger);

export default function Answer() {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "20% bottom",
      },
    });

    tl.from(parentRef.current.children, {
      y: 200,
      opacity: 0,
      duration: 0.5,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className={styles.answer} id="alter-ego">
      <Container>
        <div className={styles.answer_container} ref={parentRef}>
          <p>The short answer is no, but let&apos;s dive deeper.</p>
          <p>
            Humans often seek motivation in the world around them, and an alter
            ego is one way this search takes form. It&apos;s a second version of
            yourself—born from deep reflection or intense experiences—that helps
            you navigate who you are or who you want to become. While alter egos
            are common in fiction, they&apos;re just as real in everyday life. Many
            people shape theirs based on characters from anime, movies, or even
            real peoples who inspire them.
          </p>
          <p>
            Take Guts from Berserk as an example: a warrior shaped by pain and
            betrayal who, despite being consumed by rage, begins to seek
            redemption and protect others. His journey from vengeance to growth
            mirrors what many people experience internally. Other characters
            like Thorfinn from Vinland Saga or David from Cyberpunk: Edgerunners
            also show how suffering and anger can become catalysts for change.
          </p>
          <p>
            If your alter ego doesn&apos;t harm you or others, it&apos;s not just
            normal—it&apos;s a powerful way to grow. It can serve as a guide, helping
            you move from who you were to who you strive to be, one step at a
            time.
          </p>
        </div>
      </Container>
    </div>
  );
}
