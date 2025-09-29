import { api } from '@shared'

export const uploadFiles = async (collectionId: string, data: FormData) =>
  (await api.post(`researches/upload?collection_id=${collectionId}`, data)).data

export const deleteResearch = async (id: string) => await api.delete(`researches/${id}`)
