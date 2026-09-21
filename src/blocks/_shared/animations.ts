import type { Transition } from 'framer-motion'

export const SECTION_SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 1,
  delay: 0.6,
}

export const SECTION_ENTRANCE = {
  initial: { opacity: 0, y: 96 },
  animate: { opacity: 1, y: 0 },
  transition: SECTION_SPRING_TRANSITION,
}
