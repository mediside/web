import { useUnit } from 'effector-react'
import { $currentCollection, deleteCollectionFx, downloadReportEvent, getOneCollectionFx, updateCollectionFx } from '../model'
import { useFxPending } from '@shared'
import { closeResearchesEvent } from '@entities'

export const useCurrentCollection = () => ({
  get: useFxPending(getOneCollectionFx),
  update: useUnit(updateCollectionFx),
  close: useUnit(closeResearchesEvent),
  collection: useUnit($currentCollection),
  downloadReport: useUnit(downloadReportEvent),
  deleteCollection: useUnit(deleteCollectionFx),
})
