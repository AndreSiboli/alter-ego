export interface CarouselConfigTypes {
  animationTime?: number;
  parentWidth?: string;
  gap?: 0 | 8 | 16 | 24 | 32;
  peek?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
  itemsPerView?: number;
  itemsAppearance?: number;
  itemsTotal?: number;
  isSlide?: boolean;
  isButton?: boolean;
  isRadio?: boolean;
  isAutoSlide?: boolean;
  controllLayout?: (() => Omit<CarouselConfigTypes, "controllLayout">) | null;
}
