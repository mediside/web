import { useUnit } from 'effector-react'
import { $currentCollection, closeCollectionEvent, getOneCollectionFx } from '../model'
import { useFxPending } from '@shared'

export const useCurrentCollection = () => ({
  get: useFxPending(getOneCollectionFx),
  close: useUnit(closeCollectionEvent),
  collection: useUnit($currentCollection),
})
