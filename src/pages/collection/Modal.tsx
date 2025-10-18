import { Button, createOverlay, Dialog, IconButton, IconX, NumberInput, Portal, Stack, Text } from '@shared'
import { useState } from 'react'

interface ContactFormProps {
  title: string
  description: string
  defaultValue: string
  action: string
  onAction: (value: string) => void
}

const LEVEL_MIN = 0
const LEVEL_MAX = 100
const MAX_LENGTH = 5

// TODO: вынести в shared
export const contactDialog = createOverlay<ContactFormProps>(
  ({ title, description, action, onAction, defaultValue, ...props }) => {
    // TODO: возможно стоит переделать вероятность патологии с float32 на uint
    if (defaultValue.length > MAX_LENGTH) {
      defaultValue = defaultValue.slice(0, 5)
    }

    const [value, setValue] = useState(defaultValue)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      onAction(value)
      e.preventDefault()
      // Close dialog using injected `onOpenChange` prop
      props.onOpenChange?.({ open: false })
    }

    const v = +value
    const disabled = v < LEVEL_MIN || v > LEVEL_MAX || value === ''

    return (
      <Dialog.Root placement="center" motionPreset="slide-in-bottom" {...props}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content rounded="2xl">
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <form onSubmit={handleSubmit}>
                  <Stack gap="4">
                    <Text>{description}</Text>
                    <NumberInput.Root value={value} min={LEVEL_MIN} max={LEVEL_MAX} onValueChange={(e) => setValue(e.value)}>
                      <NumberInput.Control />
                      <NumberInput.Input maxLength={MAX_LENGTH} rounded="xl" />
                    </NumberInput.Root>
                    <Button disabled={disabled} bg="teal.fg" _hover={{ opacity: 0.9 }} rounded="xl" type="submit">
                      {action}
                    </Button>
                  </Stack>
                </form>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <IconButton variant="ghost" rounded="xl" size="sm">
                  <IconX />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  }
)
