import { useUnit } from 'effector-react'
import { $currentCollection, getOneCollectionFx } from '../model'
import { useFxPending } from '@shared'
import { closeResearchesEvent } from '@entities'

export const useCurrentCollection = () => ({
  get: useFxPending(getOneCollectionFx),
  close: useUnit(closeResearchesEvent),
  collection: useUnit($currentCollection),
})
