import { ResearchStatus } from '../constants'
import { FetchedResearch, Research } from '../types'

export const ParseResearch = (r: FetchedResearch): Research => {
  let status = ResearchStatus.Unknown

  if (r.archive_corrupt) {
    status = ResearchStatus.Corrupted
  } else if (r.probability_of_pathology) {
    status = ResearchStatus.Done
  } else if (r.inference_error) {
    status = ResearchStatus.InferenceUnavailable
  } else if (r.processing_started_at && !r.processing_finished_at) {
    status = ResearchStatus.InProcessing
  } else if (!r.processing_started_at) {
    status = ResearchStatus.InQueue
  }

  return {
    id: r.id,
    filepath: r.filepath,
    filename: r.filename,
    size: r.size,
    assessment: r.assessment,
    archiveCorrupt: r.archive_corrupt,
    probabilityOfPathology: r.probability_of_pathology,
    createdAt: new Date(r.created_at),
    processingStartedAt: r.processing_started_at ? new Date(r.processing_started_at) : undefined,
    processingFinishedAt: r.processing_finished_at ? new Date(r.processing_finished_at) : undefined,
    processingDuration: r.processing_duration, // мс
    inferenceError: r.inference_error,
    metadata: r.metadata
      ? {
          studyId: r.metadata.study_id,
          seriesId: r.metadata.series_id,
          filesCount: r.metadata.files_count,
        }
      : undefined,
    status: status,
  }
}
