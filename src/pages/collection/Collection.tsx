import { useCurrentCollection } from '@features'
import { Flex, Grid, HStack, Icon, IconArrowLeft, RoutePath, Skeleton, Stack, Text, useTranslation, VStack } from '@shared'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { UploadArea } from './UploadArea'
import { useResearches } from '@entities'
import { ResearchCard } from './ResearchCard'
import { Statistics } from './Statistics'
import { Report } from './Report'
import { ShortInfo } from './ShortInfo'

type WithId = { id: string }

export const Collection: FC = () => {
  const t = useTranslation('pages.collection')
  const { id } = useParams<WithId>()
  const [, navigate] = useLocation()

  const { get, close, collection, downloadReport, deleteCollection } = useCurrentCollection()
  const { researches, deleteResearch } = useResearches()

  useEffect(() => {
    get.fetch(id)

    return close
  }, [])

  const isLoading = !collection || get.pending

  return (
    <Flex gap={6} h="calc(100vh - 80px)" direction={{ base: 'column', lg: 'row' }}>
      <Flex flex="33%" direction="column" gap={6}>
        <Flex gap={6}>
          <HStack
            justify="center"
            transition="all 0.2s ease-in-out"
            cursor="pointer"
            _hover={{ shadow: 'uiHover' }}
            bg="gray.contrast"
            w={20}
            p={6}
            rounded="2xl"
            shadow="ui"
            onClick={() => navigate(RoutePath.Main)}
          >
            <Icon size="2xl">
              <IconArrowLeft />
            </Icon>
          </HStack>
          {isLoading ? (
            <Skeleton flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <ShortInfo
              deleteCollection={async () => {
                await deleteCollection()
                navigate(RoutePath.Main)
              }}
              collection={collection}
            />
          )}
        </Flex>
        <Flex gap={6} direction={{ base: 'column', sm: 'row', lg: 'column' }} h="full">
          {isLoading ? (
            <Skeleton flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <Statistics researches={researches} pathologyLevel={collection.pathologyLevel} />
          )}
          {isLoading ? (
            <Skeleton minW={250} flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <Report
              pathologyLevel={collection.pathologyLevel}
              downloadReport={downloadReport}
              disabled={!researches.filter((r) => r.status === 'done' || r.status === 'inferenceUavailable').length}
            />
          )}
        </Flex>
      </Flex>
      {isLoading ? (
        <Stack minH={400} w="full" rounded="2xl">
          <Skeleton w="full" h="full" shadow="ui" rounded="2xl" />
        </Stack>
      ) : (
        <Stack minH={600} w="full" bg="gray.contrast" p={6} rounded="2xl" shadow="ui" gap={6}>
          <UploadArea collectionId={collection.id} />
          {researches.length ? (
            <Grid overflow="auto" templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap={3}>
              {researches.map((r) => (
                <ResearchCard
                  pathologyLevel={collection.pathologyLevel}
                  key={r.id}
                  research={r}
                  deleteResearch={() => deleteResearch(r.id)}
                />
              ))}
            </Grid>
          ) : (
            <VStack h="full" justify="center">
              <Text color="fg.muted" textAlign="center" maxW={600}>
                {t('paragraphs.no-researches')}
              </Text>
            </VStack>
          )}
        </Stack>
      )}
    </Flex>
  )
}
