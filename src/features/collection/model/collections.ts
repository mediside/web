import { createEffect, createStore, sample } from 'effector'
import * as api from '../api'
import { Collection } from '../types'
import { parseCollection, parseCollectionWithResearches } from '../helpers'
import { closeResearchesEvent, setResearchesFx } from '@entities'

export const getCollectionsFx = createEffect(async () => (await api.getCollections()).map(parseCollection).reverse())

export const getOneCollectionFx = createEffect(async (id: string) =>
  parseCollectionWithResearches(await api.getOneCollection(id))
)

export const createCollectionFx = createEffect(async () => parseCollection(await api.createCollection()))

export const deleteCollectionFx = createEffect(api.deleteCollection)

export const $collections = createStore<Collection[]>([]).on(getCollectionsFx.doneData, (_, data) => data)

export const $currentCollection = createStore<Collection | null>(null)
  .reset(closeResearchesEvent)
  .on(getOneCollectionFx.doneData, (_, data) => data.collection)

sample({
  source: getOneCollectionFx.doneData,
  fn: (s) => s.researches,
  target: setResearchesFx,
})
