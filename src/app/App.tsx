import { useTranslation, Button, HStack, Box } from '@shared'
import { Topbar } from '@widgets'

export const App: FC = () => {
  const t = {
    common: useTranslation('common'),
  }

  return (
    <Box>
      <Topbar />
      <h1>{t.common('product')}</h1>
      <HStack>
        <Button color="darkblue" background="cyan.400">
          Click me!
        </Button>
        <Button borderRadius="xl">Click me!</Button>
      </HStack>
    </Box>
  )
}
