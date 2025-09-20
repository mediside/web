import { Center, Heading, HStack, useTranslation } from '@shared'

export const Topbar: FC = () => {
  const t = useTranslation('common')

  return (
    <Center>
      <HStack bg="gray.contrast" w="full" mb={6} px={10} h={12}>
        <Heading size="3xl">{t('product')}</Heading>
      </HStack>
    </Center>
  )
}
