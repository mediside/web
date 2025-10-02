import { ResearchStatus } from '../constants'
import { Research } from '../types'

export const updateStatus = (r: Research) => {
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
