import ReactNative from "react-native";
import I18n from "react-native-i18n";
import en from "./locales/en";

// Import all locales

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = { en };

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL: boolean = currentLocale.indexOf("he") === 0 || currentLocale.indexOf("ar") === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings (name: string, params: {
    [key: string]: string | number
} = {}): string {
  return I18n.t(name, params);
}

