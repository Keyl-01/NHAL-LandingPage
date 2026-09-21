'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { NavFlyoutBlock as NavFlyoutBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPRING_CONFIG = { stiffness: 500, damping: 60, mass: 1 } as const
const SCROLL_OFFSET: ['start start', 'end start'] = ['start start', 'end start']
const REVEAL_Y_RANGE: [number, number] = [0, -86]

/** Observation zone: top 20 % – bottom 40 % of the viewport. */
const OBSERVER_ROOT_MARGIN = '-20% 0px -40% 0px'

/** Delay (ms) before observing targets – allows sibling blocks to mount. */
const OBSERVER_INIT_DELAY = 500

const ACTIVE_CLASS = 'bg-white text-nhal-dark shadow-[inset_0_0_0_1px_var(--nhal-border-color)]'

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Returns a spring-smoothed `y` MotionValue that transitions from 0 → -86
 * as `targetRef` scrolls through the viewport.
 */
function useScrollReveal(targetRef: React.RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: SCROLL_OFFSET })
  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG)
  return useTransform(smoothProgress, [0, 1], REVEAL_Y_RANGE)
}

/**
 * Tracks which navigation section is currently in view and returns its
 * `targetAnchor` id. Resets to `null` when no tracked section is visible.
 */
function useScrollSpy(anchors: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (anchors.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false

        for (const entry of entries) {
          const { id } = entry.target
          if (entry.isIntersecting) {
            visible.add(id)
            changed = true
          } else if (visible.has(id)) {
            visible.delete(id)
            changed = true
          }
        }

        if (!changed) return

        if (visible.size === 0) {
          setActiveId(null)
          return
        }

        // Prefer the lowest section on the page (last match in DOM order).
        for (let i = anchors.length - 1; i >= 0; i--) {
          if (visible.has(anchors[i])) {
            setActiveId(anchors[i])
            return
          }
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    )

    const timeoutId = setTimeout(() => {
      for (const id of anchors) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }, OBSERVER_INIT_DELAY)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [anchors])

  return { activeId, setActiveId }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const NavFlyoutBlock: React.FC<NavFlyoutBlockProps> = ({ navItems }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const y = useScrollReveal(scrollRef)

  // Build a stable list of anchor ids for the scroll-spy hook.
  const anchors = React.useMemo(
    () => (navItems ?? []).flatMap((item) => (item.targetAnchor ? [item.targetAnchor] : [])),
    [navItems],
  )

  const { activeId, setActiveId } = useScrollSpy(anchors)

  const handleNavigate = useCallback(
    (targetId: string) => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveId(targetId)
      }
    },
    [setActiveId],
  )

  if (!navItems || navItems.length === 0) return null

  return (
    <>
      <div
        className={cn(
          'fixed z-[9] bottom-0 left-0 right-0 h-[84px] overflow-hidden pointer-events-none',
        )}
      >
        <motion.div
          className={cn('absolute top-[86px] left-1/2 pointer-events-auto')}
          style={{ x: '-50%', y }}
        >
          <nav
            className={cn(
              'relative flex w-full items-center gap-[2px] p-[3px] bg-nhal-bg-cream rounded-full shadow-[0px_4px_8px_-4px_rgba(18,18,24,0.1),0px_12px_18px_-2px_rgba(18,18,24,0.05)] overflow-hidden',
            )}
          >
            {navItems.map((item, index) => (
              <button
                key={item.targetAnchor ?? index}
                onClick={() => item.targetAnchor && handleNavigate(item.targetAnchor)}
                className={cn(
                  'flex justify-center whitespace-nowrap items-center py-[8px] px-[10px] rounded-full text-brand-light text-[16px] font-medium leading-[24px] cursor-pointer transition-all duration-500',
                  'hover:bg-white hover:text-nhal-dark hover:shadow-[inset_0_0_0_1px_var(--nhal-border-color)]',
                  'md:px-[14px]',
                  activeId === item.targetAnchor && ACTIVE_CLASS,
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Sentinel element – its scroll progress drives the nav reveal animation. */}
      <div
        ref={scrollRef}
        id="navigation-scroll"
        className="absolute left-0 top-[148px] right-0 h-[32px]"
      />
    </>
  )
}
