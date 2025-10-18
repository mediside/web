import { createEffect, createEvent, createStore } from 'effector'
import { FetchedResearch, Research } from '../types'
import { ParseResearch } from '../helpers'
import * as api from '../api'

export const deleteResearch = createEffect(api.deleteResearch)

export const closeResearchesEvent = createEvent()

export const setResearchesFx = createEffect((frs: FetchedResearch[]) => frs.map((r) => ParseResearch(r)))

export const $researches = createStore<Research[]>([])
  .reset(closeResearchesEvent)
  .on(setResearchesFx.doneData, (_, rs) => rs)
  .on(deleteResearch.done, (rs, { params: id }) => rs.filter((r) => r.id !== id))
