import { Box } from '@shared'
import { Topbar } from '@widgets'
import { Router } from './Router'

export const App: FC = () => {
  return (
    <Box bg={{ base: '#f8f9fa', _dark: '#1d1d1dff' }} h="100vh">
      <Topbar />
      <Router />
    </Box>
  )
}
