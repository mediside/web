import { useResearches } from '@entities'
import { FileUpload, useFileUpload, useTranslation, Text } from '@shared'
import { useEffect } from 'react'

type DicomAreaProps = {
  collectionId: string
}

export const UploadArea: FC<DicomAreaProps> = ({ collectionId }) => {
  const t = useTranslation('pages.collection')
  const fileUpload = useFileUpload({ maxFiles: 1000 })
  const researches = useResearches()

  useEffect(() => {
    if (fileUpload.acceptedFiles.length) {
      researches.upload({ collectionId, files: fileUpload.acceptedFiles })
      fileUpload.clearFiles()
    }
  }, [fileUpload.acceptedFiles])

  return (
    <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone minH="100px" rounded="2xl">
        <FileUpload.DropzoneContent gap={5}>
          <Text color="fg.muted">{t('paragraphs.drug-and-drop')}</Text>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
    </FileUpload.RootProvider>
  )
}
