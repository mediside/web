import { createEffect, createEvent, sample } from 'effector'
import { $currentCollection } from './collections'
import * as api from '../api'
import { serializeReportFilename } from '../helpers'
import { Collection } from '../types'

const downloadReportFx = createEffect(async (c: Collection) => {
  const blob = await api.downloadReport(c.id)

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = serializeReportFilename(c)
  a.href = url
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
})

export const downloadReportEvent = createEvent()

sample({
  clock: downloadReportEvent,
  source: $currentCollection,
  filter: (c) => !!c,
  fn: (c) => c!,
  target: downloadReportFx,
})
