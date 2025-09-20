import { Stack } from '@shared'
import { PropsWithChildren } from 'react'

type CardProps = {
  h?: number | string
  bg: string // TODO: поддержать автодополнение
  onClick?: () => unknown
}

export const Card: FC<PropsWithChildren & CardProps> = ({ children, h, bg, onClick }) => {
  return (
    <Stack
      cursor="pointer"
      _hover={{ shadow: 'uiHover' }}
      transition="all 0.2s ease-in-out"
      gap={8}
      p={8}
      rounded="4xl"
      shadow="ui"
      h={h}
      bg={bg}
      onClick={onClick}
    >
      {children}
    </Stack>
  )
}
