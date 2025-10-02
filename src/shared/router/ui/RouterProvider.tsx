import { Variants as AnimationVariants, Transition, AnimatePresence, motion } from 'motion/react'
import { PropsWithChildren } from 'react'
import { useActiveRoute } from '../hooks'

const ROUTE_TRANSITION: Transition = {
  duration: 0.2,
  ease: 'easeInOut',
}
const ROUTE_TRANSITION_STATE: AnimationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
} as const

export const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useActiveRoute()

  return (
    <>
      <AnimatePresence mode="wait">
        {route && (
          <motion.div
            key={`${route.path}`}
            style={{ height: 'full', width: 'full' }}
            variants={ROUTE_TRANSITION_STATE}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={ROUTE_TRANSITION}
          >
            {route.component}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
