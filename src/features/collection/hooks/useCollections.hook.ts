import { useFxPending } from '@shared'
import { $collections, createCollectionFx, deleteCollectionFx, getCollectionsFx } from '../model'
import { useUnit } from 'effector-react'

export const useCollections = () => ({
  get: useFxPending(getCollectionsFx),
  create: useFxPending(createCollectionFx),
  delete: useFxPending(deleteCollectionFx),
  collections: useUnit($collections),
})
