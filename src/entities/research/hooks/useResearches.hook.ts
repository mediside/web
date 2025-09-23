import { useUnit } from 'effector-react'
import { uploadFilesFx } from '../model'

export const useResearches = () => useUnit({ upload: uploadFilesFx })
