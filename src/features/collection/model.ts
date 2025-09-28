import { createEffect, createEvent, createStore } from 'effector'
import * as api from './api'
import { Collection } from './types'
import { parseCollection } from './helpers'

export const getCollectionsFx = createEffect(async () => (await api.getCollections()).map(parseCollection).reverse())

export const getOneCollectionFx = createEffect(async (id: string) => parseCollection(await api.getOneCollection(id)))

export const createCollectionFx = createEffect(async () => parseCollection(await api.createCollection()))

export const deleteCollectionFx = createEffect(api.deleteCollection)

export const $collections = createStore<Collection[]>([]).on(getCollectionsFx.doneData, (_, data) => data)

export const closeCollectionEvent = createEvent()

export const $currentCollection = createStore<Collection | null>(null)
  .reset(closeCollectionEvent)
  .on(getOneCollectionFx.doneData, (_, data) => data)
