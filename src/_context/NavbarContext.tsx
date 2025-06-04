"use client";

import {
  createContext,
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ContextType {
  isOnTop: boolean;
  setIsOnTop: Dispatch<SetStateAction<boolean>>;
  globalStyles: CSSProperties;
  setglobalStyles: Dispatch<SetStateAction<CSSProperties>>;
}

export const NavbarContext = createContext({} as ContextType);

interface ProviderType {
  children: ReactNode;
}

export default function NavbarProvider(props: ProviderType) {
  const { children } = props;
  const [isOnTop, setIsOnTop] = useState(false);
  const [globalStyles, setglobalStyles] = useState<CSSProperties>({});

  function scrolling() {
    const scroll = window.scrollY;

    if (scroll === 0) setIsOnTop(true);
    else setIsOnTop(false);
  }

  useEffect(() => {
    scrolling();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrolling);

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [isOnTop]);

  return (
    <NavbarContext.Provider
      value={{ isOnTop, setIsOnTop, globalStyles, setglobalStyles }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
