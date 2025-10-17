import { useUploadResearches } from '@entities'
import { FileUpload, useFileUpload, useTranslation, Text, HStack, Spinner, Box } from '@shared'
import { useEffect } from 'react'

const SECONDS_IN_MINUTE = 60

type DicomAreaProps = {
  collectionId: string
}

export const UploadArea: FC<DicomAreaProps> = ({ collectionId }) => {
  const t = useTranslation('pages.collection')
  const fileUpload = useFileUpload({ maxFiles: 1000 })
  const { info, upload } = useUploadResearches()

  useEffect(() => {
    if (fileUpload.acceptedFiles.length) {
      upload.fetch({ collectionId, files: fileUpload.acceptedFiles })
      fileUpload.clearFiles()
    }
  }, [fileUpload.acceptedFiles])

  let totalPercent = 0
  if (info) {
    totalPercent = ((info.files.uploadIndex + info.files.currentProgress / 100) / info.files.total) * 100
  }

  const minutes = Math.floor(Math.floor(info?.remainingTs ?? 0) / SECONDS_IN_MINUTE)
  const seconds = Math.floor(info?.remainingTs ?? 0) % SECONDS_IN_MINUTE

  return (
    <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
      <FileUpload.HiddenInput disabled={upload.pending} />
      <FileUpload.Dropzone position="relative" cursor={upload.pending ? 'no-drop' : 'pointer'} minH="100px" rounded="2xl">
        <FileUpload.DropzoneContent zIndex={1} pointerEvents="none" gap={0}>
          {upload.pending && info ? (
            <>
              <HStack>
                <Spinner color="fg.muted" />
                <Text color="fg.muted" fontSize="md">
                  {info.files.total > 1
                    ? t('paragraphs.uploading', {
                        current: info.files.uploadIndex,
                        total: info.files.total,
                        filename: info.files.currentFilename,
                      })
                    : t('paragraphs.uploading-one', { filename: info.files.currentFilename })}{' '}
                  ({info.files.currentProgress.toFixed()} %)
                </Text>
              </HStack>
              {info?.remainingTs ? (
                <Text color="fg.muted" fontSize="sm">
                  {minutes > 0 ? t('labels.minutes', { count: minutes }) : null} {t('labels.seconds', { count: seconds })}{' '}
                  {t('labels.upload-time-left')}
                </Text>
              ) : null}
            </>
          ) : (
            <Text color="fg.muted" fontSize="md">
              {t('paragraphs.drug-and-drop')}
            </Text>
          )}
        </FileUpload.DropzoneContent>
        <Box
          transition="right 0.5s linear"
          position="absolute"
          visibility={info ? 'visible' : 'hidden'}
          left={0}
          rounded="2xl"
          bg="gray.muted"
          h="full"
          right={`${100 - totalPercent}%`}
        />
      </FileUpload.Dropzone>
    </FileUpload.RootProvider>
  )
}
