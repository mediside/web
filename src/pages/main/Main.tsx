import { Center, Grid, GridItem, Heading, HStack, RoutePath, Separator, Skeleton, Stack, Text, useTranslation } from '@shared'
import { Card } from './Card'
import { useLocation } from 'wouter'
import { useCollections } from '@entities'
import { useEffect } from 'react'
import { CollectionCard } from './CollectionCard'

const SKELETONS = new Array(7).fill(0).map((_, k) => <Skeleton key={k} shadow="ui" h={{ base: 200, md: 400 }} rounded="4xl" />)

export const Main: FC = () => {
  const t = useTranslation('pages.main')
  const [, navigate] = useLocation()

  const collectiones = useCollections()

  useEffect(() => {
    collectiones.get.fetch()
  }, [])

  return (
    <Center>
      <Stack gap={10}>
        <Grid gap={6} templateColumns={{ md: '1fr 300px' }}>
          <Card h={300} bg="gray.contrast">
            <Heading size="4xl" color="teal.fg">
              {t('titles.classify')}
            </Heading>
            <Text color="teal.solid">{t('paragraphs.classify')}</Text>
          </Card>
          <Card bg="gray.contrast" onClick={() => navigate(RoutePath.About)}>
            <Heading size="4xl">{t('titles.about')}</Heading>
            <Text>{t('paragraphs.about')}</Text>
          </Card>
        </Grid>
        <HStack>
          <Separator flex="1" size="md" />
          <Text flexShrink="0" color="fg.subtle">
            {t('labels.collection')}
          </Text>
          <Separator flex="1" size="md" />
        </HStack>
        {
          <Grid gap={6} templateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}>
            {collectiones.get.pending ? (
              SKELETONS
            ) : collectiones.collectiones.length ? (
              collectiones.collectiones.map((r) => <CollectionCard collection={r} key={r.id} />)
            ) : (
              <GridItem colSpan={{ sm: 2, md: 3, xl: 4 }}>
                <Center>
                  <Text color="fg.muted" textAlign="center" maxW={600}>
                    {t('paragraphs.no-collection', { cardTitle: t('titles.classify') })}
                  </Text>
                </Center>
              </GridItem>
            )}
          </Grid>
        }
      </Stack>
    </Center>
  )
}
