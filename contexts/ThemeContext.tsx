"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode: any) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  useEffect(() => {
    const { isDarkMode } = context;
    const bodyElement = document.querySelector("body");
    const swiperBtnPrev = document.querySelector(".swiper-button-prev");
    const swiperBtnNext = document.querySelector(".swiper-button-next");

    if (bodyElement) {
      if (isDarkMode) {
        bodyElement.classList.add("dark-mode");
        swiperBtnNext?.classList.add("dark-mode");
        swiperBtnPrev?.classList.add("dark-mode");
      } else {
        bodyElement.classList.remove("dark-mode");
        swiperBtnNext?.classList.remove("dark-mode");
        swiperBtnPrev?.classList.remove("dark-mode");
      }
    }
  }, [context.isDarkMode]);

  return context;
};
