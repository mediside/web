import { About, Main } from '@pages'
import { RoutePath } from '@shared'
import { Route } from 'wouter'

export const Router: FC = () => {
  return (
    <>
      <Route path={RoutePath.Main}>
        <Main />
      </Route>
      <Route path={RoutePath.About}>
        <About />
      </Route>
    </>
  )
}
