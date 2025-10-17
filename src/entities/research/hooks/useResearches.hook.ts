import { useUnit } from 'effector-react'
import { $researches, deleteResearch } from '../model'

export const useResearches = () => ({
  researches: useUnit($researches),
  deleteResearch: useUnit(deleteResearch),
})
