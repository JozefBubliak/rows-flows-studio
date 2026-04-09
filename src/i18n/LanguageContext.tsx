import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import translations, { type Lang, type TranslationKey } from './translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationKey;
}

export const languageMeta: Record<Lang, { label: string; nativeLabel: string; locale: string }> = {
  sk: { label: 'Slovak', nativeLabel: 'Slovenčina', locale: 'sk-SK' },
  en: { label: 'English', nativeLabel: 'English', locale: 'en-GB' },
  de: { label: 'German', nativeLabel: 'Deutsch', locale: 'de-DE' },
  cs: { label: 'Czech', nativeLabel: 'Čeština', locale: 'cs-CZ' },
  uk: { label: 'Ukrainian', nativeLabel: 'Українська', locale: 'uk-UA' },
  pl: { label: 'Polish', nativeLabel: 'Polski', locale: 'pl-PL' },
  ru: { label: 'Russian', nativeLabel: 'Русский', locale: 'ru-RU' },
};

const SUPPORTED_LANGS: Lang[] = ['sk', 'en', 'de', 'cs', 'uk', 'pl', 'ru'];

const isSupportedLang = (value: string | null | undefined): value is Lang =>
  Boolean(value && SUPPORTED_LANGS.includes(value as Lang));

const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') {
    return 'sk';
  }

  const storedLang = window.localStorage.getItem('rows-and-flows-lang');
  if (isSupportedLang(storedLang)) {
    return storedLang;
  }

  const browserLang = window.navigator.language.toLowerCase();
  const matchedLang = SUPPORTED_LANGS.find((lang) => browserLang.startsWith(lang));
  return matchedLang ?? 'en';
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'sk',
  setLang: () => {},
  t: translations.sk,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.documentElement.lang = lang;
    window.localStorage.setItem('rows-and-flows-lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const supportedLangs = SUPPORTED_LANGS;
export const isSupportedLangParam = isSupportedLang;
