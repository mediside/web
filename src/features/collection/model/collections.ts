import { attach, createEffect, createStore, sample } from 'effector'
import * as api from '../api'
import { Collection } from '../types'
import { parseCollection, parseCollectionWithResearches, serializeCollection } from '../helpers'
import { $currentCollectionId, closeResearchesEvent, setResearchesFx } from '@entities'

export const getCollectionsFx = createEffect(async () => (await api.getCollections()).map(parseCollection).reverse())

export const getOneCollectionFx = createEffect(async (id: string) =>
  parseCollectionWithResearches(await api.getOneCollection(id))
)

export const createCollectionFx = createEffect(async () => parseCollection(await api.createCollection()))

export const $collections = createStore<Collection[]>([]).on(getCollectionsFx.doneData, (_, data) => data)

export const $currentCollection = createStore<Collection | null>(null)
  .reset(closeResearchesEvent)
  .on(getOneCollectionFx.doneData, (_, data) => data.collection)

export const updateCollectionFx = attach({
  source: $currentCollection,
  effect: async (cur, c: Partial<Collection>) => {
    if (!cur) {
      return
    }

    await api.updateCollection(cur.id, serializeCollection(c))
  },
})

export const deleteCollectionFx = attach({
  source: $currentCollection,
  effect: async (c) => {
    if (!c) {
      return
    }
    await api.deleteCollection(c.id)
  },
})

sample({
  source: $currentCollection,
  clock: updateCollectionFx.done,
  filter: (c) => !!c,
  fn: (c, { params }) => ({ ...c!, ...params }),
  target: $currentCollection,
})

sample({
  source: getOneCollectionFx.doneData,
  fn: (s) => s.researches,
  target: setResearchesFx,
})

sample({
  source: $currentCollection,
  fn: (c) => c?.id || null,
  target: $currentCollectionId,
})
