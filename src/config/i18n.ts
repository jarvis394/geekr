import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translation_en from 'src/locales/en/translation.json'
import translation_ru from 'src/locales/ru/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
    ns: ['translation'],
    resources: {
      ru: { translation: translation_ru },
      en: { translation: translation_en },
    },
  })

export default i18n
