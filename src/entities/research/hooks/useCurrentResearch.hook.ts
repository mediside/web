import { useUnit } from 'effector-react'
import { $currentResearch, closeResearchEvent, getOneResearchFx } from '../model'
import { useFxPending } from '@shared'

export const useCurrentResearch = () => ({
  get: useFxPending(getOneResearchFx),
  close: useUnit(closeResearchEvent),
  research: useUnit($currentResearch),
})
