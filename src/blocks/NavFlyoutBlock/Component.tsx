'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import type { NavFlyoutBlock as NavFlyoutBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollSpy } from '@/hooks/useScrollSpy'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_REVEAL_KEYFRAMES = { input: [0, 1], output: [0, -86] } as const
const NAV_SCROLL_OFFSET: ['start start', 'end start'] = ['start start', 'end start']

const ACTIVE_CLASS = 'bg-white text-nhal-dark shadow-[inset_0_0_0_1px_var(--nhal-border-color)]'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const NavFlyoutBlock: React.FC<NavFlyoutBlockProps> = ({ navItems }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const y = useScrollReveal(scrollRef, {
    keyframes: NAV_REVEAL_KEYFRAMES,
    offset: NAV_SCROLL_OFFSET,
  })

  // Build a stable list of anchor ids for the scroll-spy hook.
  const anchors = useMemo(
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
          'fixed z-50 bottom-0 left-0 right-0 h-[84px] overflow-hidden pointer-events-none',
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
