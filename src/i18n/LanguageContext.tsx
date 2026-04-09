import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import translations, { type Lang, type TranslationKey } from './translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationKey;
}

const SUPPORTED_LANGS: Lang[] = ['sk', 'en'];

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
  return browserLang.startsWith('sk') ? 'sk' : 'en';
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
