import { Heading, useTranslation } from '@shared'

type CollectionTitleProps = {
  title: string | null
  num: number
}

export const CollectionTitle: FC<CollectionTitleProps> = ({ title, num }) => {
  const t = useTranslation('entities.collection')

  return <Heading>{title === null ? t('titles.default', { num }) : title}</Heading>
}
