import { createEffect, createEvent, createStore, sample } from 'effector'
import { FetchedResearch, Research } from '../types'
import { ParseResearch } from '../helpers'
import * as api from '../api'

export const deleteResearch = createEffect(api.deleteResearch)

export const closeResearchesEvent = createEvent()

export const setResearchesFx = createEffect((frs: FetchedResearch[]) => frs.map((r) => ParseResearch(r)))

export const $researches = createStore<Research[]>([])
  .reset(closeResearchesEvent)
  .on(setResearchesFx.doneData, (_, rs) => rs)

sample({
  source: $researches,
  clock: deleteResearch.done,
  fn: (rs, { params: id }) => {
    // в одном файле могут находиться несколько исследований / серий. При удалении одного из них удаляем все
    const research = rs.find((r) => r.id === id)
    if (!research) {
      return rs // в таком случае ничего не произойдет, т.к. effector ждет новый массив
    }

    return rs.filter((r) => r.filepath !== research.filepath)
    // TODO: подумать как лучше - принимать информацию об удалении по WebSocket,
    // или оставить как сейчас - самостоятельно удалять в интерфейсе
  },
  target: $researches,
})
