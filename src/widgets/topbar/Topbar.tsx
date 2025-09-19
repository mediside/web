import { Box, Center, Heading, useTranslation } from '@shared'

export const Topbar: FC = () => {
  const t = {
    common: useTranslation('common'),
  }

  return (
    <Center>
      <Box bg="white" shadow="md" rounded="2xl" w="full" m="2" p="2" h="12">
        <Heading>{t.common('product')}</Heading>
      </Box>
    </Center>
  )
}
