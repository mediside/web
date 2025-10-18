import { Stack } from '@shared'
import { PropsWithChildren } from 'react'

type CardProps = {
  h?: number | string
  bg: string // TODO: поддержать автодополнение
  rounded: string
  onClick?: () => unknown
}

export const Card: FC<PropsWithChildren & CardProps> = ({ children, h, bg, onClick, rounded }) => {
  return (
    <Stack
      position="relative"
      overflow="hidden"
      cursor="pointer"
      _hover={{ shadow: 'uiHover' }}
      transition="all 0.2s ease-in-out"
      gap={8}
      p={8}
      rounded={rounded}
      shadow="ui"
      h={h}
      bg={bg}
      onClick={onClick}
    >
      {children}
    </Stack>
  )
}
