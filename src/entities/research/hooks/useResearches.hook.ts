import { useUnit } from 'effector-react'
import { $researches, uploadFilesFx } from '../model'

export const useResearches = () => useUnit({ upload: uploadFilesFx, researches: $researches })
