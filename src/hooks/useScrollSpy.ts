'use client'

import { useEffect, useState } from 'react'

// ─── Default Configuration ───────────────────────────────────────────────────

/** Observation zone: top 20 % – bottom 40 % of the viewport. */
const DEFAULT_ROOT_MARGIN = '-20% 0px -40% 0px'

/** Delay (ms) before observing targets – allows sibling blocks to mount. */
const DEFAULT_INIT_DELAY = 500

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UseScrollSpyOptions {
  /**
   * IntersectionObserver `rootMargin`.
   * @default '-20% 0px -40% 0px'
   */
  rootMargin?: string
  /**
   * Milliseconds to wait before attaching the observer, giving target
   * elements time to mount.
   * @default 500
   */
  initDelay?: number
}

export interface UseScrollSpyReturn {
  /** The `id` of the currently active section, or `null`. */
  activeId: string | null
  /** Imperatively override the active id (e.g. on nav-item click). */
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Tracks which section is currently in view and returns its element `id`.
 * Resets to `null` when no tracked section is visible.
 *
 * Anchors are matched in **reverse DOM order** so that when multiple
 * sections overlap the observation zone the lowest one wins — this feels
 * natural when scrolling downward.
 *
 * @example
 * ```tsx
 * const anchors = useMemo(() => items.map(i => i.id), [items])
 * const { activeId, setActiveId } = useScrollSpy(anchors)
 * ```
 */
export function useScrollSpy(
  anchors: string[],
  options: UseScrollSpyOptions = {},
): UseScrollSpyReturn {
  const { rootMargin = DEFAULT_ROOT_MARGIN, initDelay = DEFAULT_INIT_DELAY } = options

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

        // Prefer the lowest section on the page (last match in anchor order).
        for (let i = anchors.length - 1; i >= 0; i--) {
          if (visible.has(anchors[i])) {
            setActiveId(anchors[i])
            return
          }
        }
      },
      { rootMargin },
    )

    const timeoutId = setTimeout(() => {
      for (const id of anchors) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }, initDelay)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [anchors, rootMargin, initDelay])

  return { activeId, setActiveId }
}
