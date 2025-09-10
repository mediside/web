import { useTranslation } from '@shared'

export const App: FC = () => {
  const t = {
    common: useTranslation('common'),
  }

  return (
    <div>
      <h1>{t.common('product')}</h1>
    </div>
  )
}
