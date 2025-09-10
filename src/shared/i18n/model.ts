import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ruTranslations } from './translations'

export const setupI18Next = () => {
  i18next.use(initReactI18next).init({
    resources: {
      ru: { translation: ruTranslations },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  })
}
