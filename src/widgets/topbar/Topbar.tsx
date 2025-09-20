import { Box, Center, Heading, useTranslation } from '@shared'

export const Topbar: FC = () => {
  const t = {
    common: useTranslation('common'),
  }

  return (
    <Center>
      <Box bg="gray.contrast" shadow="md" w="full" mb={6} p={2} h={12}>
        <Heading>{t.common('product')}</Heading>
      </Box>
    </Center>
  )
}
