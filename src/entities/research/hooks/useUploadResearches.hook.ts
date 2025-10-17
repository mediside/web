import { useUnit } from 'effector-react'
import { $uploadInfo, uploadFilesFx } from '../model'
import { useFxPending } from '@shared'

export const useUploadResearches = () => ({
  upload: useFxPending(uploadFilesFx),
  info: useUnit($uploadInfo),
})
