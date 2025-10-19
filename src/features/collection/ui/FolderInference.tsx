import { Button, Code, EmptyState, useFxPending, useTranslation } from '@shared'
import { useUnit } from 'effector-react'
import { $currentCollection, runFolderInferenceFx } from '../model'
import { useUploadResearches } from '@entities'

export const FolderInference: FC = () => {
  const t = useTranslation('features.collection')
  const { upload } = useUploadResearches()
  const c = useUnit($currentCollection)
  const run = useFxPending(runFolderInferenceFx)

  return (
    <>
      <EmptyState.Title textAlign="center" mt={6} color="teal.solid">
        {t('titles.run-local')}
      </EmptyState.Title>
      <EmptyState.Description color="teal.fg" textAlign="center" maxW={600}>
        {t('paragraphs.run-local-1')} <Code>{c?.folder ?? '-'}</Code> {t('paragraphs.run-local-2')}
      </EmptyState.Description>
      <EmptyState.Description fontSize="xs" color="fg.warning" textAlign="center" maxW={600}>
        {t('paragraphs.run-local-warn')}
      </EmptyState.Description>
      <Button loading={run.pending} disabled={upload.pending} onClick={run.fetch} h="60px" rounded="xl" bg="teal.fg" _hover={{ opacity: 0.9 }}>
        {t('buttons.run-local')}
      </Button>
    </>
  )
}
