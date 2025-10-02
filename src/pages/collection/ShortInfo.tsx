import { Collection, CollectionTitle } from '@features'
import { HStack, Icon, IconButton, IconDots, IconX, Menu, Portal, Stack, Text, useTranslation } from '@shared'

type ShortInfoProps = {
  collection: Collection
  deleteCollection: () => void
}

export const ShortInfo: FC<ShortInfoProps> = ({ collection, deleteCollection }) => {
  const t = useTranslation('pages.collection')

  return (
    <Stack bg="gray.contrast" flex={1} p={6} rounded="2xl" shadow="ui">
      <HStack justify="space-between" alignItems="flex-start">
        <CollectionTitle num={collection.num} title={collection.title} />
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton variant="ghost" size="sm">
              <IconDots />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item onClick={deleteCollection} value="delete">
                  <Icon size="sm">
                    <IconX />
                  </Icon>
                  <Text>{t('buttons.delete')}</Text>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
      <Text color="fg.muted">{collection.createdAt.toLocaleString()}</Text>
    </Stack>
  )
}
