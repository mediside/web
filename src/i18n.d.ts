import { ruTranslations as translations } from './shared/i18n/translations'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translations
    }
    returnObjects: true
  }
}
