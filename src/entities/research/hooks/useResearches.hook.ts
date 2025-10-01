import { useUnit } from 'effector-react'
import { $researches, deleteResearch, uploadFilesFx } from '../model'
import { useFxPending } from '@shared'

export const useResearches = () => ({
  upload: useFxPending(uploadFilesFx),
  researches: useUnit($researches),
  deleteResearch: useUnit(deleteResearch),
})
