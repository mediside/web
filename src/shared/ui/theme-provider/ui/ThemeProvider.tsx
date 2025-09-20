import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { system } from '../model'
import { ColorModeProvider } from './ColorModeProvider'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ChakraProvider value={system}>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ChakraProvider>
)
