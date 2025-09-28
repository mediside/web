import { createEffect, createStore } from 'effector'
import { FetchedResearch, Research } from '../types'
import { ParseResearch } from '../helpers'

export const setResearchesFx = createEffect((frs: FetchedResearch[]) => frs.map((r) => ParseResearch(r)))

export const $researches = createStore<Research[]>([]).on(setResearchesFx.doneData, (_, rs) => {
  console.log('werwer', rs)
  return rs
})
