import { FetchedProgressStreamMsg, ProgressStreamMsg } from '../types'

export const parseProgress = (p: FetchedProgressStreamMsg): ProgressStreamMsg => ({
  researchId: p.research_id,
  collectionId: p.collection_id,
  percent: p.percent,
  step: p.step,
  done: p.done,
})
