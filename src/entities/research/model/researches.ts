import { createEffect, createEvent, createStore } from 'effector'
import { FetchedResearch, Research } from '../types'
import { ParseResearch } from '../helpers'

export const closeResearchesEvent = createEvent()

export const setResearchesFx = createEffect((frs: FetchedResearch[]) => frs.map((r) => ParseResearch(r)))

export const $researches = createStore<Research[]>([])
  .reset(closeResearchesEvent)
  .on(setResearchesFx.doneData, (_, rs) => {
    console.log('werwer', rs)
    return rs
  })
