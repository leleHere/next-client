"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface DarkModeContextType {
  theme: "light" | "dark";
  mounted: boolean;
  toggleTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  isDark: boolean;
  isLight: boolean;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const darkMode = useDarkMode();

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }
  return context;
};
