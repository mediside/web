import { api } from '@shared'

export const UploadFiles = async (collectionId: string, data: FormData) =>
  (await api.post(`researches/upload?collection_id=${collectionId}`, data)).data
