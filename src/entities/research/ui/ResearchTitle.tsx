import { Heading, useTranslation } from '@shared'

type ResearchTitleProps = {
  title: string | null
  num: number
}

export const ResearchTitle: FC<ResearchTitleProps> = ({ title, num }) => {
  const t = useTranslation('entities.research')

  return <Heading>{title === null ? t('titles.default', { num }) : title}</Heading>
}
