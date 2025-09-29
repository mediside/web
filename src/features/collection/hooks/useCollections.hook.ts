import { useFxPending } from '@shared'
import { $collections, createCollectionFx, getCollectionsFx } from '../model'
import { useUnit } from 'effector-react'

export const useCollections = () => ({
  get: useFxPending(getCollectionsFx),
  create: useUnit(createCollectionFx),
  collections: useUnit($collections),
})
