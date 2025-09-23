import { api } from '@shared'
import { FetchedCollection } from './types'

export const getCollections = async () => (await api.get<FetchedCollection[]>('collections')).data

export const getOneCollection = async (id: string) => (await api.get<FetchedCollection>(`collections/${id}`)).data

export const createCollection = async () => (await api.post<FetchedCollection>('collections/new')).data

export const deleteCollection = async (id: string) => {
  await api.delete(`collectiones/${id}`)
}
