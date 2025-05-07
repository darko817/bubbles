// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import sr from "./locales/sr.json";

i18n.use(initReactI18next).init({
  //lng: Localization.locale.split("-")[0] || "en",
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    sr: { translation: sr },
    ru: { translation: ru },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
