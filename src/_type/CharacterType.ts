import { StaticImageData } from "next/dist/shared/lib/get-img-props";

export interface CharacterType {
  id: string;
  name: string;
  title: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  japanese: string;
  palletColor: {
    font: string;
    normal: string;
    hard: string;
  };
}
