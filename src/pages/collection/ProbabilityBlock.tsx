import { Stat, Heading, HStack, useTranslation } from '@shared'

type ProbabilityBlockProps = {
  pathologyLevel: number
  probabilityOfPathology: number
}

export const ProbabilityBlock: FC<ProbabilityBlockProps> = ({ probabilityOfPathology, pathologyLevel }) => {
  const t = useTranslation('pages.collection')

  return (
    <Stat.Root gap={0} bg={probabilityOfPathology < pathologyLevel ? 'green.50' : 'red.50'} px={3} py={2} rounded="xl">
      <Heading size="sm">
        {probabilityOfPathology < pathologyLevel ? t('labels.pathology-no') : t('labels.pathology-yes')}
      </Heading>
      <HStack>
        <Stat.ValueText color={probabilityOfPathology < pathologyLevel ? 'fg.success' : 'fg.error'}>
          {(probabilityOfPathology * 100).toFixed(1)} %
        </Stat.ValueText>
        <Stat.ValueUnit color="fg.subtle">- {t('labels.pathology-probability')}</Stat.ValueUnit>
      </HStack>
    </Stat.Root>
  )
}
