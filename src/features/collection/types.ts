export type FetchedCollection = {
  id: string
  num: number
  title: string
  pathology_level: number
  created_at: string
}

export type Collection = {
  id: string
  num: number
  title: string | null // null нужен, чтобы вывести название по-умолчанию
  pathologyLevel: number
  createdAt: Date
}
