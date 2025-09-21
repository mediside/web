export type FetchedResearch = {
  id: string
  num: number
  title: string
  pathology_level: number
  created_at: string
}

export type Research = {
  id: string
  num: number
  title: string | null // null нужен, чтобы вывести название по-умолчанию
  pathologyLevel: number
  createdAt: Date
}
