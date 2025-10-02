import { useUnit } from 'effector-react'
import { ReactElement, useEffect } from 'react'
import { useRouter } from 'wouter'
import { addRouteEvent } from '../model'
import { RouteInfo } from '../types'

type TRouteProps = Omit<RouteInfo, 'base' | 'component'> & {
  children: ReactElement
}

export const Route: FC<TRouteProps> = (props) => {
  const router = useRouter()
  const addRoute = useUnit(addRouteEvent)

  useEffect(() => {
    const { path, nest: isNestRoot, className, children } = props
    const id = path ? `${router.base}${path}` : 'default'

    addRoute({
      id,
      route: { path: path ? id : '', base: router.base, nest: isNestRoot, className, component: children },
    })
  }, [props, router.base, addRoute])

  return null
}
