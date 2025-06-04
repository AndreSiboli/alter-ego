import styles from "@/styles/carousel/CarouselButtons.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PropsType {
  handleCarousel: (number: -1 | 0 | 1) => void;
}

export default function CarouselButtons(props: PropsType) {
  const { handleCarousel } = props;

  return (
    <div className={styles.buttons}>
      <div className={styles.button}>
        <button onClick={() => handleCarousel(-1)}>
          <FaAngleLeft />
        </button>
      </div>
      <div className={styles.button}>
        <button onClick={() => handleCarousel(1)}>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}
