import { FetchedCollection, Collection } from '../types'

export const parseCollection = (c: FetchedCollection): Collection => ({
  id: c.id,
  num: c.num,
  title: c.title.length ? c.title : null,
  pathologyLevel: c.pathology_level,
  createdAt: new Date(c.created_at),
})
