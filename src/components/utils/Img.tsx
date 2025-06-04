import Image, { ImageProps, StaticImageData } from "next/image";
import { CSSProperties } from "react";

interface PropsType extends Omit<ImageProps, "src" | "alt"> {
  src: StaticImageData;
  alt?: string;
  styles?: CSSProperties;
}

export default function Img(props: PropsType) {
  const { src, alt = "", styles = {} } = props;

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover", ...styles }}
    />
  );
}
