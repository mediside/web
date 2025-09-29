import { t } from 'i18next'
import { Collection } from '../types'

const FILE_EXTENSION = 'xlsx'

export const serializeReportFilename = (c: Collection) => {
  let title = c.title === null ? t('features.collection.titles.default', { num: c.num }) : c.title
  title = title.replace(' ', '-')

  return `${title}_${c.createdAt.toLocaleString()}.${FILE_EXTENSION}`
}
