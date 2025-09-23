import { useFxPending } from '@shared'
import { $collectiones, createCollectionFx, deleteCollectionFx, getCollectionsFx } from '../model'
import { useUnit } from 'effector-react'

export const useCollections = () => ({
  get: useFxPending(getCollectionsFx),
  create: useFxPending(createCollectionFx),
  delete: useFxPending(deleteCollectionFx),
  collectiones: useUnit($collectiones),
})
