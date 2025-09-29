import { useUnit } from 'effector-react'
import { $researches, deleteResearch, uploadFilesFx } from '../model'

export const useResearches = () => useUnit({ upload: uploadFilesFx, researches: $researches, deleteResearch: deleteResearch })
