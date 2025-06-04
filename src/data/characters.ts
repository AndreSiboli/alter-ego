import { CharacterType } from "@/_type/CharacterType";
import gutsImage from "@/assets/guts.png";
import makimaImage from "@/assets/makima.png";
import kanekiImage from "@/assets/kaneki.png";
import getoImage from "@/assets/geto.png";
import nobaraImage from "@/assets/nobara.png";
import himikoImage from "@/assets/himiko.png";

export const characters: CharacterType[] = [
  {
    id: "1",
    name: "Guts",
    title: "Guts",
    image: { src: gutsImage, alt: "Guts from Berserk" },
    japanese: "ベルセルク",
    palletColor: {
      font: "#fff",
      normal: "#ba042b",
      hard: "#111",
    },
  },
  {
    id: "2",
    name: "Makima",
    title: "Makima",
    image: { src: makimaImage, alt: "Makima from Chainsaw Man" },
    japanese: "マキマ",
    palletColor: {
      font: "#fff",
      normal: "#B45555",
      hard: "#111",
    },
  },
  {
    id: "3",
    name: "Kaneki",
    title: "Kaneki",
    image: { src: kanekiImage, alt: "Kaneki from Tokyo Ghoul" },
    japanese: "金木 研",
    palletColor: {
      font: "#000",

      normal: "#DCE1E3",
      hard: "#111",
    },
  },
  {
    id: "4",
    name: "Getō Suguru",
    title: "Getō",
    image: { src: getoImage, alt: "Geto Suguru from Jujutsu Kaisen" },
    japanese: "夏油 傑",
    palletColor: {
      font: "#fff",
      normal: "#2B2A2A",
      hard: "#111",
    },
  },
  {
    id: "5",
    name: "Kugisaki Nobara",
    title: "Nobara",
    image: { src: nobaraImage, alt: "Kugisaki Nobara from Jujutsu Kaisen" },
    japanese: "釘崎野薔薇",
    palletColor: {
      font: "#fff",
      normal: "#6B3E2E",
      hard: "#111",
    },
  },
  {
    id: "6",
    name: "Himiko Toga",
    title: "Himiko",
    image: { src: himikoImage, alt: "Himiko Toga from My Hero Academia" },
    japanese: "渡我被身子",
    palletColor: {
      font: "#000",
      normal: "#E6D7A8",
      hard: "#111",
    },
  },
];
