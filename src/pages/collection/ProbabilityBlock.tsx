import { Stat, Heading, HStack, useTranslation, Text, Icon, IconStopwatch } from '@shared'

const SECONDS_IN_MINUTE = 60

type ProbabilityBlockProps = {
  pathologyLevel: number
  probabilityOfPathology: number
  duration: number
}

export const ProbabilityBlock: FC<ProbabilityBlockProps> = ({ probabilityOfPathology, pathologyLevel, duration }) => {
  const t = useTranslation('pages.collection')

  const minutes = Math.floor(duration / SECONDS_IN_MINUTE)
  const seconds = duration % SECONDS_IN_MINUTE

  return (
    <Stat.Root
      gap={2}
      bg={
        probabilityOfPathology < pathologyLevel
          ? { _light: 'green.50', _dark: 'green.900' }
          : { _light: 'red.50', _dark: 'red.900' }
      }
      px={3}
      py={2}
      rounded="xl"
    >
      <Heading size="sm">
        {probabilityOfPathology < pathologyLevel ? t('labels.pathology-no') : t('labels.pathology-yes')}
      </Heading>
      <HStack>
        <Stat.ValueText color={probabilityOfPathology < pathologyLevel ? 'fg.success' : 'fg.error'}>
          {(probabilityOfPathology * 100).toFixed(1)} %
        </Stat.ValueText>
        <Stat.ValueUnit color="fg.subtle">- {t('labels.pathology-probability')}</Stat.ValueUnit>
      </HStack>
      <HStack>
        <Icon color="fg.muted">
          <IconStopwatch />
        </Icon>

        <Text color="fg.muted" fontSize="sm">
          {minutes > 0 ? t('labels.minutes', { count: minutes }) : null} {t('labels.seconds', { count: seconds })}
        </Text>
      </HStack>
    </Stat.Root>
  )
}
