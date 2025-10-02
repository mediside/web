import { About, Main, Collection } from '@pages'
import { Box, RoutePath, Route, RouterProvider } from '@shared'

export const Router: FC = () => {
  return (
    <Box px={2}>
      <RouterProvider>
        <Route path={RoutePath.Main}>
          <Main />
        </Route>
        <Route path={RoutePath.About}>
          <About />
        </Route>
        <Route path={RoutePath.Collection}>
          <Collection />
        </Route>
      </RouterProvider>
    </Box>
  )
}
