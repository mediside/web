import { createEffect } from 'effector'
import { FetchedResearchStreamMsg, Research } from '../types'
import { ParseResearchStreamMsg } from '../helpers'
import { $researches } from './researches'
import * as api from '../api'
import { ResearchStatus } from '../constants'

const streamFx = createEffect((msg: FetchedResearchStreamMsg) => ParseResearchStreamMsg(msg))

api.connectResearchStream(streamFx)

$researches.on(streamFx.doneData, (rs, up) => {
  const i = rs.findIndex((r) => r.id === up.id)
  if (i === -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore // при создании обязательно должен приходить filepath
    const newR: Research = up
    newR.status = updateStatus(newR)
    return [...rs, newR]
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  Object.keys(up).forEach((key) => (up[key] === undefined ? delete up[key] : {}))

  rs[i] = { ...rs[i], ...up }

  rs[i].status = updateStatus(rs[i])
  return [...rs]
})

const updateStatus = (r: Research) => {
  let status = ResearchStatus.Unknown

  if (r.archiveCorrupt) {
    status = ResearchStatus.Corrupted
  } else if (r.probabilityOfPathology !== undefined) {
    status = ResearchStatus.Done
  } else if (r.inferenceError) {
    status = ResearchStatus.InferenceUnavailable
  } else if (r.processingStartedAt && !r.processingFinishedAt) {
    status = ResearchStatus.InProcessing
  } else if (!r.processingStartedAt) {
    status = ResearchStatus.InQueue
  }

  return status
}
