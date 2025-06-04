import styles from "@/styles/carousel/CarouselRadio.module.scss";
import { ComponentProps } from "react";

interface PropsType extends ComponentProps<"input"> {
  id: string;
}

export default function CarouselRadio(props: PropsType) {
  const { id, ...rest } = props;

  return (
    <div className={styles.radio}>
      <input {...rest} type="radio" id={id} />
      <label htmlFor={id} />
    </div>
  );
}
