import { api } from '@shared'
import { FetchedProgressStreamMsg, FetchedResearchStreamMsg, ProgressStreamMsg, ResearchStreamMsg } from './types'
import { Effect } from 'effector'

export const uploadFiles = async (collectionId: string, data: FormData, onprogress: Parameters<typeof api.upload>[2]) =>
  await api.upload(`researches/upload?collection_id=${collectionId}`, data, onprogress)

export const checkExists = async (collectionId: string, filename: string): Promise<boolean> =>
  (await api.get<{ exists: boolean }>(`researches/check?collection_id=${collectionId}&filename=${filename}`)).data.exists

export const deleteResearch = async (id: string) => await api.delete(`researches/${id}`)

export const connectResearchStream = (updater: Effect<FetchedResearchStreamMsg, ResearchStreamMsg, Error>) => {
  const suburl = 'researches/update/ws/'
  const socket = api.stream(suburl)

  socket.onopen = function () {
    console.log(suburl, 'connected')
  }

  socket.onmessage = function (event) {
    const msg: FetchedResearchStreamMsg = JSON.parse(event.data)
    updater(msg)
  }

  socket.onerror = function (error) {
    console.error(suburl, 'WebSocket error:', error)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(suburl, 'connection clean close', event)
    } else {
      console.log(suburl, 'disconnected', event)
    }
  }
}

export const connectInferenceStream = (updater: Effect<FetchedProgressStreamMsg, ProgressStreamMsg, Error>) => {
  const suburl = 'inference/progress/ws/'
  const socket = api.stream(suburl)

  socket.onopen = function () {
    console.log(suburl, 'connected')
  }

  socket.onmessage = function (event) {
    const msg: FetchedProgressStreamMsg = JSON.parse(event.data)
    updater(msg)
  }

  socket.onerror = function (error) {
    console.error(suburl, 'WebSocket error:', error)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(suburl, 'connection clean close', event)
    } else {
      console.log(suburl, 'disconnected', event)
    }
  }
}
