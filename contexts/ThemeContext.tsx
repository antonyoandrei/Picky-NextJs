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
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode: any) => {
      const newMode = !prevMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newMode));
      }
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
    const headerElement = document.querySelector("header");
    const infoFooter = document.querySelector(".info-wrapper");
    const iconsFooter = document.querySelectorAll(".icon-social");
    const modalInputs = document.querySelectorAll(".modal-input");
    const userDetailsTitles = document.querySelectorAll(".user-details-titles");
    const userDetailsParagraph = document.querySelectorAll(
      ".user-details-paragraph"
    );
    const rightsFooter = document.querySelector(".rights-wrapper");
    const fallbackText = document.querySelector(".fallback-text-2");
    const swiperBtnPrev = document.querySelector(".swiper-button-prev");
    const swiperBtnNext = document.querySelector(".swiper-button-next");

    if (bodyElement) {
      if (isDarkMode) {
        bodyElement.classList.add("dark-mode");
        swiperBtnNext?.classList.add("dark-mode");
        swiperBtnPrev?.classList.add("dark-mode");
        headerElement?.classList.add("dark-mode");
        infoFooter?.classList.add("dark-mode");
        rightsFooter?.classList.add("dark-mode");
        fallbackText?.classList.add("dark-mode");
        iconsFooter.forEach((icon) => {
          icon.classList.add("dark-mode");
        });
        userDetailsTitles.forEach((title) => {
          title.classList.add("dark-mode");
        });
        userDetailsParagraph.forEach((paragraph) => {
          paragraph.classList.add("dark-mode");
        });
        modalInputs.forEach((input) => {
          input.classList.add("dark-mode");
        });
      } else {
        bodyElement.classList.remove("dark-mode");
        swiperBtnNext?.classList.remove("dark-mode");
        swiperBtnPrev?.classList.remove("dark-mode");
        headerElement?.classList.remove("dark-mode");
        infoFooter?.classList.remove("dark-mode");
        rightsFooter?.classList.remove("dark-mode");
        fallbackText?.classList.remove("dark-mode");
        iconsFooter.forEach((icon) => {
          icon.classList.remove("dark-mode");
        });
        userDetailsTitles.forEach((title) => {
          title.classList.remove("dark-mode");
        });
        userDetailsParagraph.forEach((paragraph) => {
          paragraph.classList.remove("dark-mode");
        });
        modalInputs.forEach((input) => {
          input.classList.remove("dark-mode");
        });
      }
    }
  }, [context.isDarkMode]);

  return context;
};
