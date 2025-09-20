import { Center, Grid, Heading, HStack, RoutePath, Separator, Skeleton, Stack, Text, useTranslation } from '@shared'
import { Card } from './Card'
import { useLocation } from 'wouter'

export const Main: FC = () => {
  const t = useTranslation('pages.main')
  const [, navigate] = useLocation()

  return (
    <Center>
      <Stack gap={10}>
        <Grid gap={6} templateColumns={{ md: '1fr 300px' }}>
          <Card h={300} bg="blue.subtle">
            <Heading color="blue.fg">{t('titles.classify')}</Heading>
            <Text color="blue.solid">{t('paragraphs.classify')}</Text>
          </Card>
          <Card bg="gray.contrast" onClick={() => navigate(RoutePath.About)}>
            <Heading>{t('titles.about')}</Heading>
            <Text color="fg.subtle">{t('paragraphs.about')}</Text>
          </Card>
        </Grid>
        <HStack>
          <Separator flex="1" size="md" />
          <Text flexShrink="0" color="fg.subtle">
            {t('labels.research')}
          </Text>
          <Separator flex="1" size="md" />
        </HStack>
        <Grid gap={6} templateColumns={{ md: '1fr 1fr' }}>
          <Skeleton h={{ base: 200, md: 400 }} rounded="2xl" />
          <Skeleton h={{ base: 200, md: 400 }} rounded="2xl" />
        </Grid>
      </Stack>
    </Center>
  )
}
