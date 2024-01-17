"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";
import i18n from "../i18n";
import React from "react";

type LanguageContextType = {
  language: string;
};

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language: "en" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
