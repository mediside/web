import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { system } from '../model'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ChakraProvider value={system}>{children}</ChakraProvider>
)
