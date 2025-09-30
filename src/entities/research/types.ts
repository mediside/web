import { ResearchStatus } from './constants'

export type FetchedResearch = {
  id: string
  filepath: string
  filename: string
  size: number
  assessment?: string
  archive_corrupt: boolean
  probability_of_pathology?: number
  created_at: string
  processing_started_at?: string
  processing_finished_at?: string
  processing_duration?: number // мс
  inference_error?: string
  metadata?: {
    study_id: string
    series_id: string
    files_count: number
  }
}

export type Research = {
  id: string
  filepath: string
  filename: string
  size: number
  assessment?: string
  archiveCorrupt: boolean
  probabilityOfPathology?: number
  createdAt: Date
  processingStartedAt?: Date
  processingFinishedAt?: Date
  processingDuration?: number // мс
  inferenceError?: string
  metadata?: {
    studyId: string
    seriesId: string
    filesCount: number
  }
  status: `${ResearchStatus}`
}

export type UploadParams = {
  collectionId: string
  files: File[]
}

export type FetchedResearchStreamMsg = {
  id: string
  collection_id: string
  filepath?: string
  filename?: string
  size?: number
  assessment?: string
  archive_corrupt?: boolean
  probability_of_pathology?: number
  created_at?: string
  processing_started_at?: string
  processing_finished_at?: string
  processing_duration?: number // мс
  inference_error?: string
  metadata?: {
    study_id: string
    series_id: string
    files_count: number
  }
}

export type ResearchStreamMsg = {
  id: string
  collectionId: string
  filepath?: string
  filename?: string
  size?: number
  assessment?: string
  archiveCorrupt?: boolean
  probabilityOfPathology?: number
  createdAt?: Date
  processingStartedAt?: Date
  processingFinishedAt?: Date
  processingDuration?: number // мс
  inferenceError?: string
  metadata?: {
    studyId: string
    seriesId: string
    filesCount: number
  }
  status: `${ResearchStatus}`
}
