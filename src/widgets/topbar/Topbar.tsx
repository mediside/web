import { Center, Heading, HStack, Icon, IconLogo, useTranslation } from '@shared'

export const Topbar: FC = () => {
  const t = useTranslation('common')

  return (
    <Center>
      <HStack bg="gray.contrast" w="full" mb={6} px={10} h={12}>
        <Icon size="2xl">
          <IconLogo />
        </Icon>
        <Heading size="3xl">{t('product')}</Heading>
      </HStack>
    </Center>
  )
}
