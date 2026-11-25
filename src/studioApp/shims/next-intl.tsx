import React, { createContext, useContext, useState } from 'react';
import koMessages from '../../../messages/ko.json';
import enMessages from '../../../messages/en.json';

type Messages = Record<string, unknown>;

const MESSAGES_BY_LOCALE: Record<string, Messages> = {
  ko: koMessages as Messages,
  en: enMessages as Messages,
};

interface LocaleContextValue {
  locale: string;
  setLocale: (locale: 'ko' | 'en') => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'ko',
  setLocale: () => {},
});

export function StudioLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<'ko' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('atomsystem_studio_locale');
      if (saved === 'en' || saved === 'ko') return saved;
    } catch {
      // ignore
    }
    return 'ko';
  });

  const setLocale = (next: 'ko' | 'en') => {
    setLocaleState(next);
    try {
      localStorage.setItem('atomsystem_studio_locale', next);
    } catch {
      // ignore
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useStudioLocaleControl() {
  return useContext(LocaleContext);
}

export function useLocale(): string {
  return useContext(LocaleContext).locale;
}

function getNestedValue(obj: Messages, keyPath: string): string | undefined {
  const parts = keyPath.split('.');
  let cur: unknown = obj;
  for (const part of parts) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function useTranslations(namespace?: string) {
  const locale = useLocale();
  const rootMessages = MESSAGES_BY_LOCALE[locale] || MESSAGES_BY_LOCALE.ko;

  return (key: string, values?: Record<string, string | number>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let template = getNestedValue(rootMessages, fullKey);
    if (template === undefined) {
      template = getNestedValue(MESSAGES_BY_LOCALE.ko, fullKey) ?? key;
    }
    if (!values) return template;
    return template.replace(/\{(\w+)\}/g, (_, k) =>
      values[k] !== undefined ? String(values[k]) : `{${k}}`
    );
  };
}
