import { FetchedResearch, Research } from '../types'

export const parseResearch = (r: FetchedResearch): Research => ({
  id: r.id,
  num: r.num,
  title: r.title.length ? r.title : null,
  pathologyLevel: r.pathology_level,
  createdAt: new Date(r.created_at),
})
