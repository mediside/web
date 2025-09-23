import { HStack, RoutePath, Text } from '@shared'
import { Card } from './Card'
import { Collection, CollectionTitle } from '@entities'
import { useLocation } from 'wouter'

type CollectionCardProps = {
  collection: Collection
}

export const CollectionCard: FC<CollectionCardProps> = ({ collection }) => {
  const [, navigate] = useLocation()

  return (
    <Card bg="gray.contrast" onClick={() => navigate(`${RoutePath.CollectionBase}/${collection.id}`)}>
      <HStack justify="space-between">
        <CollectionTitle title={collection.title} num={collection.num} />
        <Text color="fg.subtle">#{collection.num}</Text>
      </HStack>
      <Text color="fg.muted" fontSize="md">
        {collection.createdAt.toLocaleString()}
      </Text>
    </Card>
  )
}
