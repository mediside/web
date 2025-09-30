import { api } from '@shared'
import { FetchedResearchStreamMsg, ResearchStreamMsg } from './types'
import { Effect } from 'effector'

export const uploadFiles = async (collectionId: string, data: FormData) =>
  (await api.post(`researches/upload?collection_id=${collectionId}`, data)).data

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
