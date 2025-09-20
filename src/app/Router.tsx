import { About, Main, Research } from '@pages'
import { Box, RoutePath } from '@shared'
import { Route } from 'wouter'

export const Router: FC = () => {
  return (
    <Box px={2}>
      <Route path={RoutePath.Main}>
        <Main />
      </Route>
      <Route path={RoutePath.About}>
        <About />
      </Route>
      <Route path={RoutePath.Research}>
        <Research />
      </Route>
    </Box>
  )
}
