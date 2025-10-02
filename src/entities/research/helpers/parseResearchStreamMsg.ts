import { ResearchStatus } from '../constants'
import { FetchedResearchStreamMsg, ResearchStreamMsg } from '../types'

export const parseResearchStreamMsg = (r: FetchedResearchStreamMsg): ResearchStreamMsg => ({
  id: r.id,
  collectionId: r.collection_id,
  filepath: r.filepath,
  filename: r.filename,
  size: r.size,
  assessment: r.assessment,
  archiveCorrupt: r.archive_corrupt,
  probabilityOfPathology: r.probability_of_pathology,
  createdAt: r.created_at ? new Date(r.created_at) : undefined,
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
  status: ResearchStatus.Unknown,
})
