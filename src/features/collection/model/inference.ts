import { attach } from 'effector'
import * as api from '../api'
import { $currentCollection } from './collections'

export const runFolderInferenceFx = attach({
  source: $currentCollection,
  effect: async (c) => {
    if (!c) {
      return
    }

    await api.runFolderInference(c.id)
  },
})
