'use client';

import React from 'react';
import { useLocale, useMessages } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Locale, TranslationDictionary } from './types';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  dictionary: TranslationDictionary;
}

export function useI18n(): I18nContextType {
  const rawLocale = useLocale();
  const locale = (rawLocale === 'en' || rawLocale === 'ja' ? rawLocale : 'ko') as Locale;
  const messages = (useMessages() || {}) as unknown as TranslationDictionary;
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = messages;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  return {
    locale,
    setLocale,
    t,
    dictionary: messages,
  };
}

// Deprecated wrapper kept for backwards compatibility if needed
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
