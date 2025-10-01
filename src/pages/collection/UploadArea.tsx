import { useResearches } from '@entities'
import { FileUpload, useFileUpload, useTranslation, Text, HStack, Spinner } from '@shared'
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
      researches.upload.fetch({ collectionId, files: fileUpload.acceptedFiles })
      fileUpload.clearFiles()
    }
  }, [fileUpload.acceptedFiles])

  return (
    <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
      <FileUpload.HiddenInput disabled={researches.upload.pending} />
      <FileUpload.Dropzone cursor={researches.upload.pending ? 'no-drop' : 'pointer'} minH="100px" rounded="2xl">
        <FileUpload.DropzoneContent pointerEvents="none" gap={5}>
          {researches.upload.pending ? (
            <HStack>
              <Spinner />
              <Text color="fg.muted">{t('paragraphs.uploading')}</Text>
            </HStack>
          ) : (
            <Text color="fg.muted">{t('paragraphs.drug-and-drop')}</Text>
          )}
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
    </FileUpload.RootProvider>
  )
}
