import { type TranslatedLanguages, type TranslationKeys, Translations } from './data/languages';

const defaultLocale: TranslatedLanguages = 'ko';
let locale: TranslatedLanguages = 'ko';

export function getBrowserLocale(): TranslatedLanguages {
  const lang = navigator.language.split('-')[0].toLowerCase();
  return lang in Translations ? (lang as TranslatedLanguages) : 'en';
}

export function t(key: string): string {
  if (locale && locale in Translations && key in Translations[locale]) {
    return Translations[locale][key as TranslationKeys];
  }
  if (key in Translations.en) {
    return Translations.en[key as TranslationKeys];
  }
  return key;
}

export function translateElement(element: Element) {
  if (!(element instanceof HTMLElement)) return;

  const prop = element.getAttribute('data-trans');

  if (prop) {
    const key = (element.getAttribute(prop) || '').trim();
    if (key) {
      element.setAttribute(prop, t(key));
    }
  } else {
    const rawKey = element.getAttribute('data-trans-key') || element.innerText.trim();
    if (rawKey) {
      if (!element.getAttribute('data-trans-key')) {
        element.setAttribute('data-trans-key', rawKey);
      }
      element.innerText = t(rawKey);
    }
  }
}

export function translatePage() {
  document.querySelectorAll('[data-trans]').forEach(translateElement);
}

export function setLocale(newLocale: string) {
  const newLocaleLower = newLocale.toLowerCase();
  locale = newLocaleLower in Translations ? (newLocaleLower as TranslatedLanguages) : defaultLocale;
  document.documentElement.lang = locale;
  translatePage();
}

export function getLocale(): TranslatedLanguages {
  return locale;
}

document.addEventListener('DOMContentLoaded', () => {
  const browserLocale = getBrowserLocale();
  setLocale(browserLocale);
});

(window as any).translateElement = translateElement;
(window as any).setLocale = setLocale;
(window as any).t = t;

