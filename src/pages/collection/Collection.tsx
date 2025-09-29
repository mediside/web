import { CollectionTitle, useCurrentCollection } from '@features'
import { Button, Flex, Grid, Heading, HStack, RoutePath, Skeleton, Stack, Text, useTranslation } from '@shared'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { UploadArea } from './UploadArea'
import { useResearches } from '@entities'
import { ResearchCard } from './ResearchCard'

// TODO: icons
type WithId = { id: string }

export const Collection: FC = () => {
  const t = useTranslation('pages.collection')
  const { id } = useParams<WithId>()
  const [, navigate] = useLocation()

  const { get, close, collection, downloadReport } = useCurrentCollection()
  const { researches } = useResearches()

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
            <Heading size="3xl">{'<'}</Heading>
          </HStack>
          {isLoading ? (
            <Skeleton flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <Stack bg="gray.contrast" flex={1} p={6} rounded="2xl" shadow="ui">
              <CollectionTitle num={collection.num} title={collection.title} />
              <Text color="fg.muted">{collection.createdAt.toLocaleString()}</Text>
            </Stack>
          )}
        </Flex>
        <Flex gap={6} direction={{ base: 'column', sm: 'row', lg: 'column' }} h="full">
          {isLoading ? (
            <Skeleton flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <Stack flex={1} bg="gray.contrast" p={6} rounded="2xl" shadow="ui">
              <Heading>{t('titles.statistics')}</Heading>
              <Text color="fg.subtle">-</Text>
            </Stack>
          )}
          {isLoading ? (
            <Skeleton minW={250} flex={1} shadow="ui" rounded="2xl" />
          ) : (
            <Stack minW={250} p={6} rounded="2xl" gap={6} shadow="uiInset">
              <Heading>{t('titles.report')}</Heading>
              <Button onClick={downloadReport} bg="teal.fg" _hover={{ opacity: 0.9 }} rounded="xl">
                {t('buttons.download-xlsx')}
              </Button>
            </Stack>
          )}
        </Flex>
      </Flex>
      {isLoading ? (
        <Stack minH={400} w="full" rounded="2xl">
          <Skeleton w="full" h="full" shadow="ui" rounded="2xl" />
        </Stack>
      ) : (
        <Stack minH={400} w="full" bg="gray.contrast" p={6} rounded="2xl" shadow="ui" gap={6}>
          <UploadArea collectionId={collection.id} />
          <Grid overflow="auto" templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap={3}>
            {researches.map((r) => (
              <ResearchCard pathologyLevel={collection.pathologyLevel} key={r.id} research={r} />
            ))}
          </Grid>
        </Stack>
      )}
    </Flex>
  )
}
