import { createEffect, createEvent, createStore } from 'effector'
import * as api from './api'
import { Research } from './types'
import { parseResearch } from './helpers'

export const getResearchesFx = createEffect(async () => (await api.getResearches()).map(parseResearch).reverse())

export const getOneResearchFx = createEffect(async (id: string) => parseResearch(await api.getOneResearch(id)))

export const createResearchFx = createEffect(async () => parseResearch(await api.createResearch()))

export const deleteResearchFx = createEffect(api.deleteResearch)

export const $researches = createStore<Research[]>([]).on(getResearchesFx.doneData, (_, data) => data)

export const closeResearchEvent = createEvent()

export const $currentResearch = createStore<Research | null>(null)
  .reset(closeResearchEvent)
  .on(getOneResearchFx.doneData, (_, data) => data)
