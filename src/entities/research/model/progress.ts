import { createEffect, createStore, sample } from 'effector'
import { ProgressStreamMsg } from '../types'
import { $researches, closeResearchesEvent } from './researches'
import { parseProgress } from '../helpers'
import * as api from '../api'
import { $currentCollectionId } from './collection'

export const $progress = createStore<null | ProgressStreamMsg>(null).reset(closeResearchesEvent)

const updateStreamFx = createEffect(parseProgress)

api.connectInferenceStream(updateStreamFx)

sample({
  source: { colId: $currentCollectionId, rs: $researches },
  clock: updateStreamFx.doneData,
  filter: ({ colId }, rs) => colId === rs.collectionId,
  fn: (_, progress) => progress,
  target: $progress,
})
