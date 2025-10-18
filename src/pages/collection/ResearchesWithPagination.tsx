import { Research } from '@entities'
import {
  Grid,
  VStack,
  Pagination,
  IconButton,
  IconChevronLeft,
  IconChevronRight,
  useTranslation,
  ButtonGroup,
  Spacer,
  Tabs,
  Icon,
  IconList,
  IconMoodWrrr,
  EmptyState,
  IconStack2,
} from '@shared'
import { ResearchCard } from './ResearchCard'
import { useState } from 'react'

enum Sort {
  Default = 'default',
  Pathology = 'pathology',
}

type ResearchesWithPagination = {
  researches: Research[]
  deleteResearch: (id: string) => void
  pathologyLevel: number
}

const PAGE_SIZE = 40

export const ResearchesWithPagination: FC<ResearchesWithPagination> = ({ researches, deleteResearch, pathologyLevel }) => {
  const t = useTranslation('pages.collection')

  const [sortOrder, setSortOrder] = useState(Sort.Default)

  const [page, setPage] = useState(1)
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const sortedResearches =
    sortOrder === Sort.Default
      ? researches
      : researches.slice().sort((a, b) => {
          if (a.probabilityOfPathology && b.probabilityOfPathology) {
            return Number(a.probabilityOfPathology < b.probabilityOfPathology)
          }
          if (a.inferenceError && !b.inferenceError) {
            return 1
          }
          if (a.archiveCorrupt && !b.archiveCorrupt) {
            return 1
          }

          return 0
        })
  const visibleItems = sortedResearches.slice(start, end)

  return (
    <>
      <Tabs.Root onValueChange={({ value }) => setSortOrder(value as Sort)} defaultValue={Sort.Default} variant="plain">
        <Tabs.List bg="bg.muted" rounded="xl" p="1">
          <Tabs.Trigger value={Sort.Default}>
            <Icon>
              <IconList />
            </Icon>
            {t('labels.sort-default')}
          </Tabs.Trigger>
          <Tabs.Trigger value={Sort.Pathology}>
            <Icon>
              <IconMoodWrrr />
            </Icon>
            {t('labels.sort-pathology')}
          </Tabs.Trigger>
          <Tabs.Indicator rounded="xl" />
        </Tabs.List>
      </Tabs.Root>
      {researches.length ? (
        <Grid overflow="auto" templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap={3}>
          {visibleItems.map((r) => (
            <ResearchCard pathologyLevel={pathologyLevel} key={r.id} research={r} deleteResearch={() => deleteResearch(r.id)} />
          ))}
        </Grid>
      ) : (
        <EmptyState.Root h="full" size="lg">
          <EmptyState.Content h="full">
            <EmptyState.Indicator>
              <IconStack2 />
            </EmptyState.Indicator>
            <EmptyState.Title>{t('titles.no-researches')}</EmptyState.Title>
            <EmptyState.Description textAlign="center" maxW={600}>
              {t('paragraphs.no-researches')}
            </EmptyState.Description>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
      {researches.length > PAGE_SIZE && (
        <>
          <Spacer />
          <VStack>
            <Pagination.Root
              pageSize={PAGE_SIZE}
              page={page}
              onPageChange={(e) => setPage(e.page)}
              count={researches.length}
              defaultPage={1}
            >
              <ButtonGroup size="sm" variant="ghost">
                <Pagination.PrevTrigger asChild>
                  <IconButton>
                    <IconChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>
                <Pagination.Items
                  render={(page) => <IconButton variant={{ base: 'ghost', _selected: 'solid' }}>{page.value}</IconButton>}
                />
                <Pagination.NextTrigger asChild>
                  <IconButton>
                    <IconChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>
          </VStack>
        </>
      )}
    </>
  )
}
