import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';

const LANGUAGE_KEY = '@app_language';

const i18n = new I18n({ en });
i18n.locale = getLocales()[0]?.languageCode ?? 'en';
i18n.enableFallback = true;

export async function loadLanguagePreference(): Promise<void> {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (stored) {
    i18n.locale = stored;
  }
}

export async function setLanguagePreference(locale: string | null): Promise<void> {
  if (locale) {
    await AsyncStorage.setItem(LANGUAGE_KEY, locale);
    i18n.locale = locale;
  } else {
    await AsyncStorage.removeItem(LANGUAGE_KEY);
    i18n.locale = getLocales()[0]?.languageCode ?? 'en';
  }
}

export function getAvailableLanguages(): { code: string | null; label: string }[] {
  return [
    { code: null, label: i18n.t('settings.deviceDefault') },
    { code: 'en', label: 'English' },
  ];
}

export default i18n;
