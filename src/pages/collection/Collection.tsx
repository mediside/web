import { useCurrentCollection } from '@features'
import { Flex, HStack, Icon, IconArrowLeft, RoutePath, Skeleton, Stack, useLocation } from '@shared'
import { useEffect } from 'react'
import { UploadArea } from './UploadArea'
import { InferenceProgress, useResearches } from '@entities'
import { Statistics } from './Statistics'
import { Report } from './Report'
import { ShortInfo } from './ShortInfo'
import { ResearchesWithPagination } from './ResearchesWithPagination'

export const Collection: FC = () => {
  const [loc, navigate] = useLocation()

  const { get, close, collection, downloadReport, deleteCollection } = useCurrentCollection()
  const { researches, deleteResearch } = useResearches()

  useEffect(() => {
    // TODO: перестал работать хук useParams после добавления анимаций
    const id = loc.split('/').at(-1)
    if (id !== undefined) {
      get.fetch(id)
    }

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
            <Skeleton flex={1} shadow="ui" rounded="2xl" minH="116px" />
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
          <InferenceProgress />
          <ResearchesWithPagination
            researches={researches}
            pathologyLevel={collection.pathologyLevel}
            deleteResearch={deleteResearch}
          />
        </Stack>
      )}
    </Flex>
  )
}
