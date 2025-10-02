import { Progress, VStack, Text, useTranslation } from '@shared'
import { useUnit } from 'effector-react'
import { $progress, $researches } from '../model'

export const InferenceProgress = () => {
  const t = useTranslation('pages.collection')
  const progress = useUnit($progress)
  const researches = useUnit($researches)

  const total = researches.filter((r) => r.status !== 'corrupted').length
  const processed = researches.filter((r) => r.status === 'done' || r.status === 'inferenceUavailable').length
  let totalPercent = 100
  if (total > 0) {
    totalPercent = ((processed + (progress?.percent ?? 0) / 100) / total) * 100
  }

  const fileName = researches.find((r) => r.id === progress?.researchId)?.filename

  return (
    <VStack w="full" gap={0}>
      <Progress.Root value={totalPercent} w="full" colorPalette="teal" striped={totalPercent < 100} animated={totalPercent < 100}>
        <Progress.Track rounded="md">{total > 0 && <Progress.Range />}</Progress.Track>
      </Progress.Root>
      <Text fontSize="sm" color="fg.muted">
        {totalPercent >= 100
          ? total > 0
            ? t('labels.inference-done')
            : t('labels.inference-not-started')
          : t('labels.inference-in-progress')}
      </Text>
      <Text fontSize="xs" color="fg.muted" h="10px">
        {progress && !progress.done
          ? ` ${t('labels.inference-file')}: ${fileName ?? '-'}, ${t('labels.inference-step')}: ${
              progress.step
            }, ${progress.percent.toFixed()} %`
          : null}
      </Text>
    </VStack>
  )
}
