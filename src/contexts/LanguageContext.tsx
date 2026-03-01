"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Lang = "ru" | "kz" | "en";

const STORAGE_KEY = "tigerfilms-lang";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const defaultContext: LanguageContextType = {
  lang: "ru",
  setLang: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && (stored === "ru" || stored === "kz" || stored === "en")) {
        setLangState(stored);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : "ru", setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? defaultContext;
}
