import { Research } from '@entities'
import { Stack, Heading, useTranslation, DataList, Badge, Separator, Grid, VStack, Text, GridItem } from '@shared'

type StatisticsProps = {
  researches: Research[]
  pathologyLevel: number
}

export const Statistics: FC<StatisticsProps> = ({ researches, pathologyLevel }) => {
  const t = useTranslation('pages.collection')

  const total = researches.length
  const corrupted = researches.filter((r) => r.status === 'corrupted').length
  const inQueue = researches.filter((r) => r.status === 'inQueue').length
  const inProcessing = researches.filter((r) => r.status === 'inProcessing').length
  const err = researches.filter((r) => r.status === 'inferenceUavailable').length
  const finished = researches.filter((r) => r.status === 'done').length
  const withPathology = researches.filter((r) =>
    r.probabilityOfPathology === undefined ? false : r.probabilityOfPathology >= pathologyLevel
  ).length
  // TODO: подумать над оптимизацией. Возможно лучше единым циклом сделать

  return (
    <Stack flex={1} bg="gray.contrast" p={6} rounded="2xl" shadow="ui">
      <Heading mb={5}>{t('titles.statistics')}</Heading>
      <Grid gap={6} templateColumns={{ base: '1fr', xl: '1fr', md: '1fr auto auto 1fr', lg: '1fr' }}>
        <Stack>
          <Heading size="md">{t('titles.statistics-processing')}</Heading>
          <DataList.Root gap={2} orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-total')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge>{total}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-corrupt')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge colorPalette="red">{corrupted}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-queue')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge colorPalette="yellow">{inQueue}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-now')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge colorPalette="blue">{inProcessing}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-err')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge colorPalette="orange">{err}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>{t('labels.statistics-processing-finished')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge colorPalette="teal">{finished}</Badge>
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Stack>
        <GridItem colSpan={2}>
          <Separator
            orientation={{ base: 'horizontal', md: 'vertical', lg: 'horizontal' }}
            size="md"
            h="full"
            w={{ md: '0', lg: 'full' }}
          />
        </GridItem>
        <Stack>
          <Heading size="md">{t('titles.statistics-recognition')}</Heading>
          <VStack bg="gray.50" rounded="xl" p={2}>
            <Text color="fg.muted" textAlign="center" fontSize="xs">
              {t('paragraphs.statistics-total-percent-before')}
            </Text>
            <Heading color="fg.muted" size="5xl">
              {((withPathology / finished) * 100).toFixed(1)} %
            </Heading>
            <Text color="fg.muted" textAlign="center" fontSize="xs">
              {t('paragraphs.statistics-total-percent-after')}
            </Text>
          </VStack>
        </Stack>
      </Grid>
    </Stack>
  )
}
