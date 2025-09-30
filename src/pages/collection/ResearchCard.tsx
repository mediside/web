import { Research } from '@entities'
import { Badge, Box, Code, Heading, HStack, IconButton, IconX, Spacer, Stack, Text, useTranslation, VStack } from '@shared'
import { ProbabilityBlock } from './ProbabilityBlock'

type ResearchCardProps = {
  research: Research
  pathologyLevel: number
  deleteResearch: () => void
}

export const ResearchCard: FC<ResearchCardProps> = ({ pathologyLevel, research: r, deleteResearch }) => {
  const t = useTranslation('pages.collection')
  let status = t('labels.research-status-unknown')
  let palette = 'gray'
  switch (r.status) {
    case 'corrupted':
      status = t('labels.research-status-corrupted')
      palette = 'red'
      break
    case 'done':
      status = t('labels.research-status-done')
      palette = 'teal'
      break
    case 'inferenceUavailable':
      status = t('labels.research-status-inference-unavailable')
      palette = 'orange'
      break
    case 'inProcessing':
      status = t('labels.research-status-processing')
      palette = 'blue'
      break
    case 'inQueue':
      status = t('labels.research-status-queue')
      palette = 'yellow'
      break
  }

  return (
    <Stack border="solid 2px" borderColor="gray.200" rounded="2xl" px={4} py={2}>
      <HStack alignItems="flex-start">
        <Heading wordBreak="break-all">{r.filename}</Heading>
        <Spacer />
        <Badge colorPalette={palette}>{status}</Badge>
        <IconButton onClick={deleteResearch} variant="ghost" size="2xs">
          <IconX />
        </IconButton>
      </HStack>
      {r.metadata ? (
        <Box>
          <Text wordBreak="break-all" fontSize="xs" color="fg.subtle">
            {t('labels.study-id', { id: r.metadata.studyId })}
          </Text>
          <Text wordBreak="break-all" fontSize="xs" color="fg.subtle">
            {t('labels.series-id', { id: r.metadata.seriesId })}
          </Text>
        </Box>
      ) : null}
      {!!(r.probabilityOfPathology !== undefined && r.processingDuration !== undefined) && (
        <ProbabilityBlock
          duration={r.processingDuration}
          pathologyLevel={pathologyLevel}
          probabilityOfPathology={r.probabilityOfPathology}
        />
      )}
      {!!r.archiveCorrupt && (
        <HStack h="full">
          <Text fontStyle="italic" textAlign="center" fontSize="sm" px={10} py={4} color="fg.muted">
            {t('paragraphs.corrupted')}
          </Text>
        </HStack>
      )}
      {!!r.inferenceError && (
        <VStack>
          <Text fontStyle="italic" textAlign="center" fontSize="sm" color="fg.muted">
            {t('paragraphs.inference-error')}
          </Text>
          <Code textAlign="center" fontSize="sm" color="fg.muted">
            {r.inferenceError}
          </Code>
        </VStack>
      )}
      <Spacer />
      {r.metadata && (
        <Text color="fg.subtle" w="full" textAlign="center" fontSize="xs">
          {t('labels.files', { count: r.metadata.filesCount })}
        </Text>
      )}
    </Stack>
  )
}
