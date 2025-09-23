import { api } from '@shared'

export const UploadFiles = async (data: FormData) => (await api.post('researches/upload', data)).data
