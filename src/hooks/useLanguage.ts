import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { translations, LanguageCode, Translation } from '../translations/translations';

const STORAGE_KEY = 'mintara_language';

const detectBrowserLanguage = (): LanguageCode => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('tr')) return 'tr';
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('hi')) return 'hi';
  
  return 'en';
};

export const useLanguage = () => {
  const params = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Get from URL parameter first
    const urlLang = params.lang as LanguageCode;
    if (urlLang && translations[urlLang]) {
      return urlLang;
    }
    
    // Try to get from localStorage
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode;
    if (stored && translations[stored]) {
      return stored;
    }
    
    // Default to English
    return 'en';
  });
  
  // Sync language with URL parameter
  useEffect(() => {
    const urlLang = params.lang as LanguageCode;
    if (urlLang && translations[urlLang] && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem(STORAGE_KEY, urlLang);
    }
  }, [params.lang]);

  const t = useCallback((key: keyof Translation): string => {
    return translations[language][key] as string;
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    
    // Update URL to reflect language change
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
    const newPath = `/${lang}${pathWithoutLang === '/' ? '/' : pathWithoutLang}`;
    navigate(newPath, { replace: true });
  }, [navigate, location]);

  useEffect(() => {
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const languageNames = {
    en: { code: 'en' as LanguageCode, name: 'English', flag: '🇬🇧' },
    tr: { code: 'tr' as LanguageCode, name: 'Türkçe', flag: '🇹🇷' },
    ar: { code: 'ar' as LanguageCode, name: 'العربية', flag: '🇸🇦' },
    fr: { code: 'fr' as LanguageCode, name: 'Français', flag: '🇫🇷' },
    de: { code: 'de' as LanguageCode, name: 'Deutsch', flag: '🇩🇪' },
    es: { code: 'es' as LanguageCode, name: 'Español', flag: '🇪🇸' },
    zh: { code: 'zh' as LanguageCode, name: '中文', flag: '🇨🇳' },
    hi: { code: 'hi' as LanguageCode, name: 'हिन्दी', flag: '🇮🇳' },
  };

  return {
    language,
    setLanguage,
    t,
    availableLanguages: Object.values(languageNames),
  };
};
