import { Research } from '@entities'
import { Code, Heading, HStack, Stack, Text } from '@shared'

type ResearchCardProps = {
  research: Research
}

export const ResearchCard: FC<ResearchCardProps> = ({ research: r }) => {
  return (
    <Stack rounded="2xl" p={6} shadow="ui">
      <HStack justify="space-between">
        <Heading>{r.filename}</Heading>
        <Text>dsfs</Text>
      </HStack>
      <Text>{r.id}</Text>
      <Code size="xs">{r.filepath}</Code>
      {r.metadata ? (
        <>
          <Code>{r.metadata.studyId}</Code>
          <Code>{r.metadata.seriesId}</Code>
        </>
      ) : null}
    </Stack>
  )
}
