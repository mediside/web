import { Research } from '@entities'
import {
  Grid,
  VStack,
  Pagination,
  IconButton,
  IconChevronLeft,
  IconChevronRight,
  Text,
  useTranslation,
  ButtonGroup,
  Spacer,
} from '@shared'
import { ResearchCard } from './ResearchCard'
import { useState } from 'react'

type ResearchesWithPagination = {
  researches: Research[]
  deleteResearch: (id: string) => void
  pathologyLevel: number
}

const PAGE_SIZE = 40

export const ResearchesWithPagination: FC<ResearchesWithPagination> = ({ researches, deleteResearch, pathologyLevel }) => {
  const t = useTranslation('pages.collection')

  const [page, setPage] = useState(1)
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const visibleItems = researches.slice(start, end)

  return (
    <>
      {researches.length ? (
        <Grid overflow="auto" templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap={3}>
          {visibleItems.map((r) => (
            <ResearchCard pathologyLevel={pathologyLevel} key={r.id} research={r} deleteResearch={() => deleteResearch(r.id)} />
          ))}
        </Grid>
      ) : (
        <VStack h="full" justify="center">
          <Text color="fg.muted" textAlign="center" maxW={600}>
            {t('paragraphs.no-researches')}
          </Text>
        </VStack>
      )}
      <Spacer />
      {researches.length > PAGE_SIZE && (
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
      )}
    </>
  )
}
