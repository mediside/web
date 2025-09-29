import { useUnit } from 'effector-react'
import { $currentCollection, downloadReportEvent, getOneCollectionFx } from '../model'
import { useFxPending } from '@shared'
import { closeResearchesEvent } from '@entities'

export const useCurrentCollection = () => ({
  get: useFxPending(getOneCollectionFx),
  close: useUnit(closeResearchesEvent),
  collection: useUnit($currentCollection),
  downloadReport: useUnit(downloadReportEvent),
})
