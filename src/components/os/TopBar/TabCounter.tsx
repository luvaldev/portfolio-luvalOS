"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOSStore } from "@/store/useOSStore"
import * as WindowContent from "../WindowContent"

// ─── Window Counter Badge ─────────────────────────────────────────────────────
export default function TabCounter() {
  const { windows, focusWindow } = useOSStore()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const openWindows = Object.values(windows).filter(w => w.isOpen)
  const count = openWindows.length

  useEffect(() => {
    if (!showMenu) return
    const handle = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setShowMenu(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [showMenu])

  return (
    <div ref={menuRef} className="relative flex items-center justify-center h-full mr-1">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="relative w-8 h-8 flex items-center justify-center rounded-md transition-colors"
      >
        <div className="w-[20px] h-[20px] border border-[var(--color-border-medium)] rounded-[5px] flex flex-col overflow-hidden bg-[var(--color-bg-primary)]">
          <div className="h-[4px] w-full bg-black/[0.08] dark:bg-white/[0.1]" />
          <div className="flex-1 flex items-center justify-center text-[11px] font-bold text-[var(--color-text-main)]">
            {count}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute top-[44px] right-0 z-[9999] min-w-[200px] bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] py-1.5"
          >
            {count === 0 ? (
              <div className="px-4 py-3 text-center">
                <p className="text-[13px] font-bold text-[var(--color-text-main)]">Sin ventanas abiertas</p>
                <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">Gestiónalas aquí cuando estén activas</p>
              </div>
            ) : (
              openWindows.map(win => (
                <button
                  key={win.id}
                  onClick={() => { focusWindow(win.id); setShowMenu(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-hover-bg)] transition-colors text-left"
                >
                  <div className={`w-2 h-2 rounded-full ${win.isMinimized ? "bg-[var(--color-text-muted)] opacity-60" : "bg-[var(--color-accent)]"}`} />
                  <span className={`text-[13px] font-medium truncate flex items-center justify-between w-full ${win.isMinimized ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-main)]"}`}>
                    <span>{win.title}</span>
                    {win.isMinimized && <span className="text-[10px] opacity-70 font-normal italic pr-1">(minimizado)</span>}
                  </span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}