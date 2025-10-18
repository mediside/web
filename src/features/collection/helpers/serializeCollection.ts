import { Collection, FetchedCollection } from '../types'

export const serializeCollection = (c: Partial<Collection>): Partial<FetchedCollection> => ({
  pathology_level: c.pathologyLevel,
  title: c.title ?? undefined,
})
