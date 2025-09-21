import { useFxPending } from '@shared'
import { $researches, createResearchFx, deleteResearchFx, getResearchesFx } from '../model'
import { useUnit } from 'effector-react'

export const useResearches = () => ({
  get: useFxPending(getResearchesFx),
  create: useFxPending(createResearchFx),
  delete: useFxPending(deleteResearchFx),
  researches: useUnit($researches),
})
