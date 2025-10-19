import { FetchedResearch } from '@entities'
import { Collection, FetchedCollectionWithResearches } from '../types'

type Result = {
  collection: Collection
  researches: FetchedResearch[]
}

export const parseCollectionWithResearches = (c: FetchedCollectionWithResearches): Result => ({
  collection: {
    id: c.id,
    num: c.num,
    title: c.title.length ? c.title : null,
    folder: c.folder,
    pathologyLevel: c.pathology_level,
    createdAt: new Date(c.created_at),
  },
  researches: c.researches,
})
