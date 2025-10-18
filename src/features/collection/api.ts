import { api } from '@shared'
import { FetchedCollection, FetchedCollectionWithResearches } from './types'

export const getCollections = async () => (await api.get<FetchedCollection[]>('collections')).data

export const updateCollection = async (id: string, c: Partial<FetchedCollection>) => await api.patch(`collections/${id}`, c)

export const getOneCollection = async (id: string) => (await api.get<FetchedCollectionWithResearches>(`collections/${id}`)).data

export const createCollection = async () => (await api.post<FetchedCollection>('collections/new')).data

export const deleteCollection = async (id: string) => {
  await api.delete(`collections/${id}`)
}

export const downloadReport = async (id: string) => await api.download(`collections/${id}/report`)
