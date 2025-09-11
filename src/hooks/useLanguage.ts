// src/hooks/useLanguage.ts

import { useState, useEffect, useCallback } from "react";

import { UseLanguageType } from "@/types/language";

const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANGUAGE: UseLanguageType = "ko";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<UseLanguageType>(() => {
    if (typeof window !== "undefined") {
      const currentLanguage = localStorage.getItem(
        LANGUAGE_STORAGE_KEY
      ) as UseLanguageType;
      return currentLanguage || DEFAULT_LANGUAGE;
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((newLanguage: UseLanguageType) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY && event.newValue) {
        setLanguageState(event.newValue as UseLanguageType);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    language,
    setLanguage,
  };
};
