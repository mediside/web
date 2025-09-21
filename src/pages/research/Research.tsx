import { Flex, Heading, RoutePath, Stack, Text, useTranslation } from '@shared'
import { useLocation, useParams } from 'wouter'

type WithId = { id: string }

export const Research: FC = () => {
  const t = useTranslation('pages.research')
  const { id } = useParams<WithId>()

  const [, navigate] = useLocation()

  console.log(id)
  // TODO: breakpoints for mobile
  // TODO: icons
  return (
    <Flex gap={6} h="calc(100vh - 80px)">
      <Flex flex="33%" direction="column" gap={6}>
        <Flex gap={6}>
          <Stack
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
            {'<'}
          </Stack>
          <Stack bg="gray.contrast" flex={1} p={6} rounded="2xl" shadow="ui">
            <Heading>{t('titles.research')}</Heading>
            <Text color="fg.subtle">{new Date().toLocaleString()}</Text>
          </Stack>
        </Flex>

        <Stack flex={1} bg="gray.contrast" p={6} rounded="2xl" shadow="ui">
          <Heading>{t('titles.statistics')}</Heading>
          <Text color="fg.subtle">-</Text>
        </Stack>

        <Stack bg="gray.contrast" p={6} rounded="2xl" shadow="ui">
          <Heading>{t('titles.report')}</Heading>
          <Text color="fg.subtle">-</Text>
        </Stack>
      </Flex>

      <Stack w="full" bg="gray.contrast" p={6} rounded="2xl" shadow="ui"></Stack>
    </Flex>
  )
}
