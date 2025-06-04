import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import styles from "@/styles/pages/home/Answer.module.scss";
import Container from "@/components/layout/Container";

gsap.registerPlugin(ScrollTrigger);

export default function Answer() {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!parentRef.current) return 

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
            Humans often seek motivation from people or things around them. An
            alter ego is no different, it&apos;s a second version of yourself. It can
            emerge from a situation or experience that forces you to reflect on
            who you are. In fiction, many characters have an alter ego. But this
            doesn&apos;t happen only in fiction, real people also experience this
            need. So, if your second self doesn&apos;t hurt you or anyone else, it&apos;s
            completely normal. Having an alter ego based on a character from an
            anime, movie, or even a real person can be a way to build your own
            identity. For example: Guts from Berserk.
          </p>

          <p>
            Guts was a warrior forged in blood, finding purpose with the Band of
            the Hawk—until his closest friend, Griffith, betrayed them in the
            Eclipse, sacrificing their comrades and violating Casca, Guts&apos;
            beloved. Crushed by loss and consumed by rage, Guts became the Black
            Swordsman, hunting demons in a spiral of vengeance. But through new
            allies and the will to protect, he slowly rises from the darkness,
            choosing redemption over revenge.
          </p>
          <p>
            A regular person who was once blinded by their own anger can come to
            see it as a way to grow. There are many examples of this, like
            Thorfinn from Vinland Saga or David from Cyberpunk: Edgerunners.
            It&apos;s a path toward becoming a better version of yourself.
          </p>
        </div>
      </Container>
    </div>
  );
}
