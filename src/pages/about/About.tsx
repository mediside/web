import { Heading, HStack, Icon, IconArrowLeft, RoutePath, Stack, useTranslation, Text, Center } from '@shared'
import { useLocation } from 'wouter'
import { ThemeSetting } from './ThemeSetting'

export const About: FC = () => {
  const t = useTranslation('pages.about')
  const [, navigate] = useLocation()

  return (
    <Center>
      <Stack maxW="breakpoint-xl" bg="fg.inverted" p="6" rounded="4xl">
        <HStack
          justify="center"
          transition="all 0.2s ease-in-out"
          cursor="pointer"
          _hover={{ shadow: 'uiHover' }}
          bg="teal.muted"
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
