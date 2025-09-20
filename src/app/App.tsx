import { Box } from '@shared'
import { Topbar } from '@widgets'
import { Router } from './Router'

export const App: FC = () => {
  return (
    <Box bg="#f8f9fa" h="100vh" px={2}>
      <Topbar />
      <Router />
    </Box>
  )
}
