'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Locale, TranslationDictionary } from './types';
import { TRANSLATIONS } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  dictionary: TranslationDictionary;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'atom_locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale from localStorage or browser language
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === 'ko' || saved === 'en' || saved === 'ja')) {
        setLocaleState(saved);
      } else {
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'ja') setLocaleState('ja');
        else if (browserLang === 'en') setLocaleState('en');
        else setLocaleState('ko');
      }
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = locale;
    }
  }, [locale, isInitialized]);

  const dictionary = useMemo(() => TRANSLATIONS[locale] || TRANSLATIONS.ko, [locale]);

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = dictionary;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <NextIntlClientProvider locale={locale} messages={dictionary as any}>
      <I18nContext.Provider value={{ locale, setLocale, t, dictionary }}>
        {children}
      </I18nContext.Provider>
    </NextIntlClientProvider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    // Return fallback context if used outside provider
    return {
      locale: 'ko',
      setLocale: () => {},
      t: (path: string, fallback?: string) => fallback || path,
      dictionary: TRANSLATIONS.ko,
    };
  }
  return context;
}
