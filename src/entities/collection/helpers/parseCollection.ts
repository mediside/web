import { FetchedCollection, Collection } from '../types'

export const parseCollection = (r: FetchedCollection): Collection => ({
  id: r.id,
  num: r.num,
  title: r.title.length ? r.title : null,
  pathologyLevel: r.pathology_level,
  createdAt: new Date(r.created_at),
})
