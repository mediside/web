import { Effect } from 'effector'
import { useUnit } from 'effector-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFxPending = <P, R>(fx: Effect<P, R, any>) => useUnit({ fetch: fx, pending: fx.pending })
