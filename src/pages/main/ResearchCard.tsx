import { HStack, RoutePath, Text } from '@shared'
import { Card } from './Card'
import { Research, ResearchTitle } from '@entities'
import { useLocation } from 'wouter'

type ResearchCardProps = {
  research: Research
}

export const ResearchCard: FC<ResearchCardProps> = ({ research }) => {
  const [, navigate] = useLocation()

  return (
    <Card bg="gray.contrast" onClick={() => navigate(`${RoutePath.ResearchBase}/${research.id}`)}>
      <HStack justify="space-between">
        <ResearchTitle title={research.title} num={research.num} />
        <Text color="fg.subtle">#{research.num}</Text>
      </HStack>
      <Text fontSize="md">{research.createdAt.toLocaleString()}</Text>
    </Card>
  )
}
