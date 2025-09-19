import { Box } from '@shared'
import { Topbar } from '@widgets'
import { Router } from './Router'

export const App: FC = () => {
  return (
    <Box>
      <Topbar />
      <Router />
    </Box>
  )
}
