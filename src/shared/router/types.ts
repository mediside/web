import { ReactElement } from 'react'
import { PathPattern } from 'wouter'

export type RouteInfo = {
  path: PathPattern
  base: string
  nest?: boolean
  className?: string
  component: ReactElement
}
