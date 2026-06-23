"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NavDropdown({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => setOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative h-full flex items-center">
      <button onClick={toggle} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[13.5px] font-medium transition-colors ${
        open ? "bg-black/[0.07] dark:bg-white/[0.07] text-[var(--color-text-main)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
      }`}>
        {title}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute top-[44px] left-0 z-[950] bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
