// src/hooks/useLanguage.ts

import { useState, useEffect, useCallback } from "react";

import { UseLanguageType } from "@/types/language";

const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANGUAGE: UseLanguageType = "ko";
const LANGUAGE_CHANGE_EVENT = "languageChanged";

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
      window.dispatchEvent(
        new CustomEvent(LANGUAGE_CHANGE_EVENT, {
          detail: { language: newLanguage },
        })
      );
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY && event.newValue) {
        setLanguageState(event.newValue as UseLanguageType);
      }
    };

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguageState(event.detail.language);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      LANGUAGE_CHANGE_EVENT,
      handleLanguageChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        LANGUAGE_CHANGE_EVENT,
        handleLanguageChange as EventListener
      );
    };
  }, []);

  return {
    language,
    setLanguage,
  };
};
