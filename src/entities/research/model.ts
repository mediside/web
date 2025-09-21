import { createEffect, createStore } from 'effector'
import * as api from './api'
import { Research } from './types'
import { parseResearch } from './helpers'

export const getResearchesFx = createEffect(async () => (await api.getResearches()).map(parseResearch))

export const createResearchFx = createEffect(async () => parseResearch(await api.createResearch()))

export const deleteResearchFx = createEffect(api.deleteResearch)

export const $researches = createStore<Research[]>([]).on(getResearchesFx.doneData, (_, data) => data)
