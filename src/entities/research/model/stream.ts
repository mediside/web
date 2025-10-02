import { createEffect, sample } from 'effector'
import { Research } from '../types'
import { parseResearchStreamMsg, updateStatus } from '../helpers'
import { $researches } from './researches'
import * as api from '../api'
import { $currentCollectionId } from './collection'

const streamFx = createEffect(parseResearchStreamMsg)

api.connectResearchStream(streamFx)

sample({
  source: { rs: $researches, colId: $currentCollectionId },
  clock: streamFx.doneData,
  filter: ({ colId }, rs) => colId === rs.collectionId,
  fn: ({ rs }, up) => {
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
  },
  target: $researches,
})
