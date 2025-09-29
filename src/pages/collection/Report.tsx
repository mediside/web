import { Heading, HStack, Text, Badge, Button, Stack, Spacer, useTranslation } from '@shared'

type ReportProps = {
  downloadReport: () => void
  pathologyLevel: number
}

export const Report: FC<ReportProps> = ({ downloadReport, pathologyLevel }) => {
  const t = useTranslation('pages.collection')

  return (
    <Stack minW={250} p={6} rounded="2xl" gap={2} shadow="uiInset">
      <Heading>{t('titles.report')}</Heading>
      <HStack>
        <Text fontSize="sm">{t('labels.pathology-recognition-treshold')}:</Text>
        <Badge variant="solid" size="lg">
          {pathologyLevel * 100} %
        </Badge>
      </HStack>
      <Spacer />
      <Button mt={2} onClick={downloadReport} bg="teal.fg" _hover={{ opacity: 0.9 }} rounded="xl">
        {t('buttons.download-xlsx')}
      </Button>
    </Stack>
  )
}
