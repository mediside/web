import { Heading, HStack, Icon, IconArrowLeft, RoutePath, Stack, useTranslation, Text, Center, IconBookmark } from '@shared'
import { useLocation } from 'wouter'
import { ThemeSetting } from './ThemeSetting'

export const About: FC = () => {
  const t = useTranslation('pages.about')
  const [, navigate] = useLocation()

  return (
    <Center>
      <Stack position="relative" maxW="breakpoint-xl" bg="fg.inverted" p="6" rounded="4xl">
        <Icon position="absolute" opacity={0.85} right={10} top={0}>
          <IconBookmark />
        </Icon>
        <HStack
          justify="center"
          transition="all 0.2s ease-in-out"
          cursor="pointer"
          _hover={{ shadow: 'uiHover' }}
          bg="teal.solid"
          w={20}
          p={6}
          rounded="2xl"
          onClick={() => navigate(RoutePath.Main)}
        >
          <Icon color="gray.contrast" size="2xl">
            <IconArrowLeft />
          </Icon>
        </HStack>
        <Heading mt={8} size="2xl">
          {t('titles.conditions')}
        </Heading>
        <Text>{t('paragraphs.conditions')}</Text>
        <Heading mt={8} size="2xl">
          {t('titles.about')}
        </Heading>
        <Text>{t('paragraphs.about')}</Text>
        <Heading mt={8} size="2xl">
          {t('titles.opportunities')}
        </Heading>
        <Text>{t('paragraphs.opportunities-about')}</Text>
        <Text>{t('paragraphs.opportunities-main')}</Text>
        <Text>{t('paragraphs.opportunities-collection')}</Text>
        <Text>{t('paragraphs.opportunities-mobile')}</Text>
        <Heading mt={8} size="2xl">
          {t('titles.settings')}
        </Heading>
        <ThemeSetting />
      </Stack>
    </Center>
  )
}
