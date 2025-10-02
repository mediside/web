import { StoreValue } from 'effector'
import { useStoreMap } from 'effector-react'
import { createElement } from 'react'
import { Router, matchRoute, useLocation, useRouter } from 'wouter'
import { $routes } from '../model'
import { RouteInfo } from '../types'

type TRouteMatch = { [key in 'loose' | 'strict' | 'default']: RouteInfo | null }

export const useActiveRoute = (): RouteInfo | null => {
  const [location] = useLocation()
  const router = useRouter()
  const match = useStoreMap<StoreValue<typeof $routes>, TRouteMatch, [string]>({
    store: $routes,
    keys: [location],
    fn: (routes, [location]) =>
      Object.values(routes).reduce<TRouteMatch>(
        (match, route) => {
          const isStrictMatch = matchRoute(router.parser, route.path, location)[0] && `${route.path}` && !route.nest

          if (isStrictMatch) {
            match.strict = {
              ...route,
              component: createElement(Router, { ...router, base: route.base, children: route.component }),
            }
          }

          const [isLooseMatch, , base] = matchRoute(router.parser, route.path, location, route.nest) as [
            boolean,
            unknown,
            string?
          ]

          if (isLooseMatch) {
            if (route.nest) {
              match.loose = { ...route, component: createElement(Router, { ...router, base, children: route.component }) }
            } else {
              match.default = route
            }
          }

          return match
        },
        { loose: null, strict: null, default: null }
      ),
    defaultValue: { strict: null, loose: null, default: null },
  })

  return match.strict || match.loose || match.default
}
