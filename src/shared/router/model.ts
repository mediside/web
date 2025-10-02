import { createEvent, createStore } from 'effector'
import { createContext } from 'react'
import { RouteInfo } from './types'

type RoutesContext = {
  list: RouteInfo[]
  active: RouteInfo | null
  add: (id: string, route: RouteInfo) => void
}

export const RoutesContext = createContext<RoutesContext>({ list: [], active: null, add: () => {} })

export const addRouteEvent = createEvent<{ id: string; route: RouteInfo }>()

export const $routes = createStore<{ [key in string]: RouteInfo }>({}).on(addRouteEvent, (source, payload) => ({
  ...source,
  [payload.id]: payload.route,
}))
