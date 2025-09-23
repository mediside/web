import { useResearches } from '@entities'
import { Button, FileUpload, useFileUpload, useTranslation, Text } from '@shared'

type DicomAreaProps = {
  collectionId: string
}

export const DicomArea: FC<DicomAreaProps> = ({ collectionId }) => {
  const t = useTranslation('pages.collection')
  console.log(collectionId)
  const fileUpload = useFileUpload({ maxFiles: 1000 })
  const researches = useResearches()

  const handleUpload = () => researches.upload(fileUpload.acceptedFiles)

  return (
    <FileUpload.RootProvider value={fileUpload} h="full" alignItems="stretch">
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone h="full" rounded="2xl">
        <FileUpload.DropzoneContent gap={5}>
          <Text color="fg.muted">{t('paragraphs.drug-and-drop')}</Text>
          <Button disabled={!fileUpload.acceptedFiles.length} onClick={handleUpload} rounded="xl">
            {t('buttons.send')}
          </Button>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
    </FileUpload.RootProvider>
  )
}
