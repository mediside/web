import { KeyPrefix } from 'i18next'
import { useTranslation as useI18nextTranslation } from 'react-i18next'

export const useTranslation = (keyPrefix: KeyPrefix<'translation'>) =>
  useI18nextTranslation('translation', { keyPrefix }).t
