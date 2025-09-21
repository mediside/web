import { api } from '@shared'
import { FetchedResearch } from './types'

export const getResearches = async () => (await api.get<FetchedResearch[]>('researches')).data

export const createResearch = async () => (await api.post<FetchedResearch>('researches/new')).data

export const deleteResearch = async (id: string) => {
  await api.delete(`researches/${id}`)
}
