import { createEffect, createEvent, createStore } from 'effector'
import * as api from './../api'
import { UploadParams } from '../types'

type UploadInfo = {
  startedAt: Date
  remainingTs: number
  files: {
    total: number
    uploadIndex: number
    currentProgress: number
    currentFilename: string
  }
}

const fileProgressEvent = createEvent<Parameters<Parameters<typeof api.uploadFiles>[2]>[0]>()
const nextFileEvent = createEvent<{ index: number; filename: string }>()
const totalFilesEvent = createEvent<number>()

export const uploadFilesFx = createEffect(async ({ files, collectionId }: UploadParams) => {
  if (files.length === 0) {
    return
  }

  totalFilesEvent(files.length)

  for (let i = 0; i < files.length; i++) {
    nextFileEvent({ index: i, filename: files[i].name })
    const exists = await api.checkExists(collectionId, files[i].name)
    if (exists) {
      continue // файлы весят много - есть смысл проверять их наличие на сервере перед загрузкой
    }
    const formData = new FormData()
    formData.append('files', files[i])
    await api.uploadFiles(collectionId, formData, fileProgressEvent)
  }
})

export const $uploadInfo = createStore<null | UploadInfo>(null)
  .on(uploadFilesFx, (_, { files }) => ({
    files: { total: files.length, uploadIndex: 0, currentProgress: 0, currentFilename: '' },
    startedAt: new Date(),
    remainingTs: 0,
  }))
  .on(totalFilesEvent, (info, total) => {
    if (!info) {
      return info
    }

    return { ...info, files: { ...info.files, total } }
  })
  .on(fileProgressEvent, (info, { loaded, total }) => {
    if (!info) {
      return info
    }

    const current = new Date().getTime()
    const started = info.startedAt.getTime()
    const spend = current - started // мс прошло
    const uploadProgress = info.files.uploadIndex + info.files.currentProgress / 100

    let remaining = 0
    if (uploadProgress) {
      remaining = ((info.files.total - uploadProgress) * spend) / uploadProgress / 1000
    }

    const currentProgress = (loaded / total) * 100
    return { ...info, remainingTs: remaining, files: { ...info.files, currentProgress } }
  })
  .on(nextFileEvent, (info, { filename, index }) => {
    if (!info) {
      return info
    }

    return { ...info, files: { ...info.files, uploadIndex: index, currentFilename: filename, currentProgress: 0 } }
  })
  .reset(uploadFilesFx.finally)
