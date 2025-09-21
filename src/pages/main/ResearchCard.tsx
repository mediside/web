import { HStack, Text } from '@shared'
import { Card } from './Card'
import { Research, ResearchTitle } from '@entities'

type ResearchCardProps = {
  research: Research
}

export const ResearchCard: FC<ResearchCardProps> = ({ research }) => {
  return (
    <Card bg="gray.contrast">
      <HStack justify="space-between">
        <ResearchTitle title={research.title} num={research.num} />
        <Text color="fg.subtle">#{research.num}</Text>
      </HStack>
      <Text fontSize="md">{research.createdAt.toLocaleString()}</Text>
    </Card>
  )
}
