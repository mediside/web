import { createEffect } from 'effector'
import * as api from './../api'
import { UploadParams } from '../types'

export const uploadFilesFx = createEffect(async ({ files, collectionId }: UploadParams) => {
  if (files.length === 0) {
    return
  }

  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i])
  }

  const resp = await api.uploadFiles(collectionId, formData)
  console.log('Upload files resp', resp)
})
