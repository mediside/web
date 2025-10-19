import { Button, Code, EmptyState, useTranslation } from '@shared'
import { useUnit } from 'effector-react'
import { $currentCollection, runFolderInferenceFx } from '../model'

export const FolderInference: FC = () => {
  const t = useTranslation('features.collection')

  const c = useUnit($currentCollection)
  const runFolderInference = useUnit(runFolderInferenceFx)

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
      <Button onClick={runFolderInference} h="60px" rounded="xl" bg="teal.fg" _hover={{ opacity: 0.9 }}>
        {t('buttons.run-local')}
      </Button>
    </>
  )
}
