import { Box } from '@shared'
import { Topbar } from '@widgets'
import { Router } from './Router'

export const App: FC = () => {
  return (
    <Box bg={{ base: '#f0f3f5', _dark: '#1d1d1dff' }} minH="100vh">
      <Topbar />
      <Router />
    </Box>
  )
}
