import { FetchedResearch } from '@entities'

export type FetchedCollection = {
  id: string
  num: number
  title: string
  folder: string
  pathology_level: number
  created_at: string
}

export type FetchedCollectionWithResearches = {
  id: string
  num: number
  title: string
  folder: string
  pathology_level: number
  created_at: string
  researches: FetchedResearch[]
}

export type Collection = {
  id: string
  num: number
  title: string | null // null нужен, чтобы вывести название по-умолчанию
  folder: string
  pathologyLevel: number
  createdAt: Date
}
