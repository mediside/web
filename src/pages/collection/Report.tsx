import { Heading, HStack, Text, Badge, Button, Stack, Spacer, useTranslation, IconEdit, IconButton } from '@shared'
import { contactDialog } from './Modal'
import { useCurrentCollection } from '@features'

type ReportProps = {
  downloadReport: () => void
  pathologyLevel: number
  disabled: boolean
}

export const Report: FC<ReportProps> = ({ downloadReport, pathologyLevel, disabled }) => {
  const t = useTranslation('pages.collection')

  const { update } = useCurrentCollection()

  return (
    <Stack minW={250} p={6} rounded="2xl" gap={2} shadow="uiInset">
      <Heading>{t('titles.report')}</Heading>
      <HStack>
        <Text fontSize="sm">{t('labels.pathology-recognition-treshold')}:</Text>
        <Badge variant="solid" size="lg">
          {pathologyLevel * 100} %
        </Badge>
        <IconButton
          onClick={() =>
            contactDialog.open('form', {
              title: t('titles.set-level'),
              defaultValue: `${pathologyLevel * 100}`,
              description: t('paragraphs.set-level'),
              action: t('buttons.set-level'),
              onAction: (v) => update({ pathologyLevel: +v / 100 }),
            })
          }
          variant="subtle"
          rounded="xl"
        >
          <IconEdit />
        </IconButton>
      </HStack>
      <Spacer />
      <Button disabled={disabled} mt={2} onClick={downloadReport} bg="teal.fg" _hover={{ opacity: 0.9 }} rounded="xl">
        {t('buttons.download-xlsx')}
      </Button>
      <contactDialog.Viewport />
    </Stack>
  )
}
