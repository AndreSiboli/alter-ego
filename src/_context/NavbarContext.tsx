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
  navStyles: CSSProperties;
  setNavStyles: Dispatch<SetStateAction<CSSProperties>>;
}

export const NavbarContext = createContext({} as ContextType);

interface ProviderType {
  children: ReactNode;
}

export default function NavbarProvider(props: ProviderType) {
  const { children } = props;
  const [isOnTop, setIsOnTop] = useState(false); //It'll be used soon
  const [navStyles, setNavStyles] = useState<CSSProperties>({});

  function scrolling() {
    setIsOnTop(window.scrollY === 0);
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
      value={{
        isOnTop,
        setIsOnTop,
        navStyles: navStyles,
        setNavStyles: setNavStyles,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
