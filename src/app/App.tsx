import { useTranslation, Button, HStack } from '@shared'

export const App: FC = () => {
  const t = {
    common: useTranslation('common'),
  }

  return (
    <div>
      <h1>{t.common('product')}</h1>
      <HStack>
        <Button color="darkblue" background="cyan.400">
          Click me!
        </Button>
        <Button borderRadius="xl">Click me!</Button>
      </HStack>
    </div>
  )
}
