"use client";

import {
  MouseEvent,
  ReactElement,
  TouchEvent,
  cloneElement,
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  ChangeEvent,
} from "react";
import { CarouselConfigTypes } from "@/_type/CarouselTypes";
import styles from "@/styles/carousel/Carousel.module.scss";
import CarouselButtons from "./CarouselButtons";
import CarouselRadio from "./CarouselRadio";

interface CarouselProps {
  children: ReactElement<{
    onClick?: (e: MouseEvent) => void;
    draggable?: boolean;
    style?: CSSProperties;
  }>[];
  parentConfig?: CarouselConfigTypes;
}

const defaultConfig = {
  animationTime: 200,
  gap: 8,
  itemsAppearance: 1,
  itemsPerView: 1,
  itemsTotal: 1,
  peek: 0,
  isSlide: false,
  isButton: false,
  isRadio: false,
  parentWidth: "100%",
  controllLayout: undefined,
};

export default function Carousel({ children, parentConfig }: CarouselProps) {
  const [config, setConfig] = useState({
    ...defaultConfig,
    ...parentConfig,
  });

  const [currentPosition, setCurrentPosition] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isShifting = useRef(false);
  const wasDragged = useRef(false);
  const startDragPosition = useRef(0);
  const startDragTime = useRef(0);
  const initialTranslate = useRef(0);
  const animationTimeout = useRef<NodeJS.Timeout>(undefined);

  const fixItemsWhenResize = useCallback(() => {
    if (config.controllLayout === null) return;

    if (typeof config.controllLayout === "function") {
      return setConfig((prev) => ({ ...prev, ...config.controllLayout!() }));
    }

    const width = window.innerWidth;
    setConfig((prev) => ({
      ...prev,
      itemsPerView: width <= 768 ? 2 : 1,
      itemsAppearance: width <= 768 ? 2 : config.itemsTotal,
      gap: width <= 768 ? 8 : 16,
      isSlide: width <= 768,
    }));
  }, [config.itemsTotal]);

  //Initializating configs
  useEffect(() => {
    howManyItems();
    fixItemsWhenResize();
    slideCarouselTo(calculateNextMove(currentPosition));
  }, []);

  useEffect(() => {
    const handleResize = () => fixItemsWhenResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fixItemsWhenResize, config]);

  useEffect(() => {
    slideCarouselTo(calculateNextMove(0));
    setCurrentPosition(0);
  }, [config]);

  //Initialization functions

  const howManyItems = () => {
    if (!wrapperRef.current) return;
    setConfig((prev) => ({
      ...prev,
      itemsTotal: wrapperRef.current!.childNodes.length,
    }));
  };

  const howManyRadios = () => {
    if (!config.isRadio || !wrapperRef.current) return;
    const totalItems = wrapperRef.current.children.length;
    const totalRadios =
      Math.ceil((totalItems - config.itemsAppearance) / config.itemsPerView) +
      1; //This +1 is the item that is already in view
    const radios = Array.from({ length: totalRadios }, (_, i) =>
      getVisibleItemsLimit(i)
    );

    return radios.map((index) => (
      <CarouselRadio
        id={`${index}`}
        name="carousel-radio"
        value={index}
        checked={index === currentPosition}
        onChange={(e) => handleRadios(e)}
        key={index}
      />
    ));
  };

  //Calculation Function

  const calculateNextMove = (position: number) => {
    const wrapper = wrapperRef.current;
    const child = wrapper?.children[0];

    if (!wrapper || !child) return 0;
    if (position === 0) return config.gap / 2;

    const itemWidth = child.getBoundingClientRect().width;
    const totalWidth = itemWidth + config.gap;
    const peekWidth = itemWidth * config.peek;
    let peekOffset = Math.max(0, (peekWidth + config.gap) / 2);

    const maxItems = getVisibleItemsLimit(wrapper.childNodes.length);
    if (position === maxItems)
      peekOffset = Math.max(0, peekWidth + config.gap / 2);

    const totalDistance = totalWidth * position - peekOffset;

    return -totalDistance;
  };

  const getVisibleItemsLimit = (index: number) => {
    if (!wrapperRef.current) return 0;
    const totalItems = wrapperRef.current.children.length;
    const maxStartIndex = Math.max(0, totalItems - config.itemsAppearance);
    const nextMove = index * config.itemsPerView;
    return Math.max(0, Math.min(nextMove, maxStartIndex));
  };

  const defineNextIndex = (index: number) => {
    if (!wrapperRef.current) return 0;
    const totalItems = wrapperRef.current.children.length;
    const maxStartIndex = Math.max(0, totalItems - config.itemsAppearance);
    const nextMove = currentPosition + index * config.itemsPerView;
    return Math.max(0, Math.min(nextMove, maxStartIndex));
  };

  //Others

  const switchCarouselItem = (delta: -1 | 0 | 1) => {
    if (isDragging.current || isShifting.current) return;

    const nextItem = defineNextIndex(delta);

    handleCarouselAnimationTimeout(nextItem, config.animationTime);
  };

  //Animation Functions

  const slideCarouselTo = (to: number) => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = `translate3d(${to}px, 0, 0)`;
  };

  const addAnimation = (duration: number) => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transition = `transform ${duration}ms`;
  };

  //Handle Functions

  const handleRadios = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDragging.current || isShifting.current) return;

    const value = parseInt((e.target as HTMLInputElement).value);

    const lettingSmooth = Math.max(
      config.animationTime,
      (config.animationTime * Math.abs(value - currentPosition)) / 1.5
    );

    handleCarouselAnimationTimeout(value, lettingSmooth);
  };

  const handleCarouselAnimationTimeout = (
    nextIndex: number,
    duration: number
  ) => {
    isShifting.current = true;
    addAnimation(duration);
    slideCarouselTo(calculateNextMove(nextIndex));
    clearTimeout(animationTimeout.current);

    animationTimeout.current = setTimeout(() => {
      addAnimation(0);
      isShifting.current = false;
    }, duration);

    setCurrentPosition(nextIndex);
  };

  //Dragging Functions

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (!config.isSlide || isShifting.current) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    isDragging.current = true;
    wasDragged.current = false;
    const matrix = new WebKitCSSMatrix(
      window.getComputedStyle(wrapper).transform
    );
    initialTranslate.current = matrix.m41;
    startDragTime.current = e.timeStamp;
    startDragPosition.current = "touches" in e ? -e.touches[0].pageX : -e.pageX;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || isShifting.current) return;

    const wrapper = wrapperRef.current;
    const parent = parentRef.current;
    if (!wrapper || !parent) return;

    const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const offset = -(currentX + startDragPosition.current);
    const position = initialTranslate.current - offset;
    wasDragged.current = true;

    const surplus = 50;
    const childrenWidth = wrapper.children[0].getBoundingClientRect().width;
    const childrenLeft = wrapper.childNodes.length - config.itemsAppearance;
    const groupChildren = (childrenWidth + config.gap) * childrenLeft;
    const rightSurplus = groupChildren + surplus - config.gap; //Minus the last item gap

    if (-position <= -surplus || position <= -rightSurplus) return;

    slideCarouselTo(position);
    parent.style.cursor = "grabbing";
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (!config.isSlide || !parentRef.current || !wrapperRef.current) return;
    parentRef.current.style.cursor = "grab";
    isDragging.current = false;
    if (isShifting.current) return;

    const width = wrapperRef.current.children[0].clientWidth || 250;
    const duration = e.timeStamp - startDragTime.current;
    const clientX = "changedTouches" in e ? e.changedTouches[0].pageX : e.pageX;
    const threshold = duration <= 200 ? 25 : (width * config.itemsPerView) / 2; //How much I want to slide move

    let delta: -1 | 0 | 1 = 0;
    if (startDragPosition.current < -clientX - threshold) delta = 1;
    if (startDragPosition.current > -clientX + threshold) delta = -1;

    switchCarouselItem(delta);
    setTimeout(() => (wasDragged.current = false), 0);
  };

  const handleLinkClick = (e: MouseEvent) => {
    if (wasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDragged.current = false;
    }
  };

  const handleMouseOut = () => {
    isDragging.current = false;
    switchCarouselItem(0);
    if (parentRef.current) parentRef.current.style.cursor = "grab";
  };

  return (
    <div
      className={styles.carousel}
      ref={parentRef}
      style={{ maxWidth: config.parentWidth }}
      onMouseLeave={handleMouseOut}
      onMouseEnter={() => (isShifting.current = false)}
    >
      {config.isButton && (
        <CarouselButtons handleCarousel={switchCarouselItem} />
      )}
      {config.isRadio && (
        <div className={styles.carousel_radios}>{howManyRadios()}</div>
      )}

      <div
        ref={wrapperRef}
        className={styles.carousel_wrapper}
        style={{
          gridTemplateColumns: `repeat(${config.itemsTotal}, ${
            100 / (config.itemsAppearance + config.peek)
          }%)`,
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEndCapture={handleDragEnd}
      >
        {children.map((child) =>
          cloneElement(child, {
            onClick: handleLinkClick,
            draggable: false,
            style: { marginRight: `${config.gap}px` },
          })
        )}
      </div>
    </div>
  );
}
