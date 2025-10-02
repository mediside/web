import { HStack, useTranslation, Text, Switch, useColorMode } from '@shared'

export const ThemeSetting = () => {
  const t = useTranslation('pages.about')
  const mode = useColorMode()

  return (
    <HStack justifyContent="space-between" mb={10}>
      <Text>{t('paragraphs.settings-theme')}</Text>
      <Switch.Root checked={mode.colorMode === 'dark'} onChange={mode.toggleColorMode} size="lg">
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
    </HStack>
  )
}
