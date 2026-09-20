'use client'

import React from 'react'
import type { NavFlyoutBlock as NavFlyoutBlockProps } from '@/payload-types'

export const NavFlyoutBlock: React.FC<NavFlyoutBlockProps> = ({ navItems }) => {
  if (!navItems || navItems.length === 0) return null

  const handleScroll = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn(`Element with id ${targetId} not found.`)
    }
  }

  return (
    <div
      className="
        fixed z-[9] 
        bottom-0 left-0 w-full flex justify-center pb-4
        md:bottom-auto md:top-[996px] md:pb-0 
        lg:top-[716px]
      "
    >
      <nav className="flex items-center gap-6 px-6 py-3 bg-white/80 backdrop-blur-md shadow-lg rounded-full border border-gray-200/50 md:gap-8">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => item.targetAnchor && handleScroll(item.targetAnchor)}
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
