import { useFxPending } from '@shared'
import { $collections, createCollectionFx, getCollectionsFx } from '../model'
import { useUnit } from 'effector-react'

export const useCollections = () => ({
  get: useFxPending(getCollectionsFx),
  create: useFxPending(createCollectionFx),
  collections: useUnit($collections),
})
