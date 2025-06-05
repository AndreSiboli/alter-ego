"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext({} as ContextType);

interface ProviderType {
  children: ReactNode;
}

export default function LoadingProvider(props: ProviderType) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
