"use client"

import { motion, useDragControls, AnimatePresence } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import { useState, useRef, useEffect } from "react"

export default function Window({ id }: { id: string }) {
  const windowData = useOSStore((state) => state.windows[id])
  const focusWindow = useOSStore((state) => state.focusWindow)
  const closeWindow = useOSStore((state) => state.closeWindow)
  const minimizeWindow = useOSStore((state) => state.minimizeWindow)
  const toggleMaximize = useOSStore((state) => state.toggleMaximize)
  const dragControls = useDragControls()
  const [showCloseTooltip, setShowCloseTooltip] = useState(false)

  // Formatting state
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showZoomMenu, setShowZoomMenu] = useState(false)
  const zoomMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (zoomMenuRef.current && !zoomMenuRef.current.contains(event.target as Node)) {
        setShowZoomMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left")
  const [fontFamily, setFontFamily] = useState<"sans" | "serif" | "mono">("sans")

  // Local state for resizing
  const initialWidth = windowData?.width || 960
  const initialHeight = windowData?.height || 650
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight })

  // Custom resize handler
  const handleResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.w
    const startH = size.h

    const onPointerMove = (moveEvent: PointerEvent) => {
      setSize({
        w: Math.max(300, startW + (moveEvent.clientX - startX)),
        h: Math.max(200, startH + (moveEvent.clientY - startY))
      })
    }

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  if (!windowData || !windowData.isOpen) return null

  const startDrag = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("[data-nodrag]")) return
    dragControls.start(e)
  }

  return (
    <motion.div
      drag={!windowData.isMaximized && !windowData.isMinimized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}

      // ── Opening animation: small square from top-left → expands to window ──
      initial={{
        x: 8,
        y: 52,          // just below the topbar
        width: 52,
        height: 52,
        borderRadius: 16,
        opacity: 1,
      }}
      animate={{
        x: windowData.isMaximized ? 0 : windowData.x,
        y: windowData.isMinimized ? windowData.y + 60 : (windowData.isMaximized ? 44 : windowData.y),
        width: windowData.isMaximized ? "100vw" : size.w,
        height: windowData.isMaximized ? "calc(100vh - 44px)" : size.h,
        borderRadius: windowData.isMaximized ? 0 : 12,
        opacity: windowData.isMinimized ? 0 : 1,
        scale: windowData.isMinimized ? 0.9 : 1,
      }}
      exit={{
        scale: 0.92,
        opacity: 0,
        transition: { duration: 0.16, ease: "easeIn" },
      }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 30,
        mass: 0.9,
      }}

      onPointerDown={() => !windowData.isMinimized && focusWindow(id)}
      style={{
        zIndex: windowData.zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: windowData.isMinimized ? "none" : "auto",
      }}
      className={`flex flex-col overflow-hidden ${
        windowData.isFocused
          ? "shadow-[0_24px_72px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_72px_rgba(0,0,0,0.75)] ring-1 ring-black/[0.07] dark:ring-white/[0.09]"
          : "shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] opacity-[0.97]"
      }`}
    >
      {/* ── Titlebar ─────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 h-[42px] bg-[var(--color-os-wbar)] border-b border-[var(--color-border-subtle)] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={startDrag}
      >
        {/* Left: file icon dropdown */}
        <div
          data-nodrag
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.06] cursor-pointer transition-colors flex-shrink-0"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--color-text-muted)]">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        {/* Center: title */}
        <div className="flex-1 flex items-center justify-center px-3 h-full">
          <div
            data-nodrag
            className="flex items-center gap-1.5 px-3 py-1 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.06] cursor-pointer transition-colors max-w-[360px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="text-[13.5px] font-semibold text-[var(--color-text-main)] truncate">
              {windowData.title}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--color-text-muted)] flex-shrink-0">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Right: controls */}
        <div
          data-nodrag
          className="flex items-center gap-0"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => minimizeWindow(id)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          <button
            onClick={() => toggleMaximize(id)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {windowData.isMaximized ? (
                <path d="M8 8H20V20H8z M4 16V4H16" />
              ) : (
                <rect x="4" y="4" width="16" height="16" rx="1.5" />
              )}
            </svg>
          </button>

          {/* Close with tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setShowCloseTooltip(true)}
            onMouseLeave={() => setShowCloseTooltip(false)}
          >
            <button
              onClick={() => closeWindow(id)}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors text-[var(--color-text-muted)] hover:bg-red-500/10 hover:text-red-500"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {showCloseTooltip && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-[9999] pointer-events-none">
                <div className="bg-[#1D1E20] text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-2">
                  Cerrar ventana
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-medium">Shift</kbd>
                    <kbd className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-medium">W</kbd>
                  </span>
                </div>
                <div className="w-0 h-0 absolute right-3 -top-1.5 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#1D1E20]"/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Formatting Toolbar ────────────────────────────────────────── */}
      <div className="flex-shrink-0 h-[42px] bg-[var(--color-os-wbar)] border-b border-[var(--color-border-subtle)] flex items-center px-3 gap-1 overflow-visible">
        {/* Nav */}
        {[
          <svg key="l" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
          <svg key="r" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
        ].map((icon, i) => (
          <button key={i} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors text-[var(--color-text-muted)]">{icon}</button>
        ))}

        <div className="w-px h-4 bg-[var(--color-border-subtle)] mx-1.5"/>

        <div ref={zoomMenuRef} className="relative flex items-center" data-nodrag>
          <button
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--color-border-subtle)] rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] font-semibold select-none transition-colors"
          >
            <span>{zoomLevel * 100}%</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-150 ${showZoomMenu ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <AnimatePresence>
            {showZoomMenu && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.1 }}
                className="absolute left-0 top-[calc(100%+4px)] w-24 bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-lg shadow-xl py-1 z-[1000] overflow-hidden"
              >
                {[0.75, 1, 1.25, 1.5].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setZoomLevel(level)
                      setShowZoomMenu(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] font-semibold flex items-center justify-between transition-colors
                      ${zoomLevel === level 
                        ? "bg-[var(--color-accent)] text-white" 
                        : "text-[var(--color-text-main)] hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                      }
                    `}
                  >
                    <span>{level * 100}%</span>
                    {zoomLevel === level && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-4 bg-[var(--color-border-subtle)] mx-1.5"/>

        {[
          { l: "B", cls: "font-black text-[14px]", active: isBold, onClick: () => setIsBold(!isBold) },
          { l: "I", cls: "italic font-bold text-[14px]", active: isItalic, onClick: () => setIsItalic(!isItalic) },
          { l: "U", cls: "underline font-semibold text-[13px]", active: isUnderline, onClick: () => setIsUnderline(!isUnderline) },
        ].map(b => (
          <button key={b.l} onClick={b.onClick} className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${b.active ? "bg-[var(--color-accent)] text-white" : "hover:bg-black/[0.06] dark:hover:bg-white/[0.06] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"} ${b.cls}`}>{b.l}</button>
        ))}

        <div className="w-px h-4 bg-[var(--color-border-subtle)] mx-1.5"/>

        {[
          { align: "left", icon: <svg key="al" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg> },
          { align: "center", icon: <svg key="ac" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> },
          { align: "right", icon: <svg key="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg> },
        ].map((a) => (
          <button key={a.align} onClick={() => setTextAlign(a.align as any)} className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${textAlign === a.align ? "bg-[var(--color-border-medium)] text-[var(--color-text-main)]" : "hover:bg-black/[0.06] dark:hover:bg-white/[0.06] text-[var(--color-text-muted)]"}`}>{a.icon}</button>
        ))}

        <div className="w-px h-4 bg-[var(--color-border-subtle)] mx-1.5"/>

        <div onClick={() => setFontFamily(f => f === "sans" ? "serif" : f === "serif" ? "mono" : "sans")} className="flex items-center gap-1 px-2.5 py-1 border border-[var(--color-border-subtle)] rounded-md cursor-pointer hover:bg-black/[0.04] text-[12px] text-[var(--color-text-muted)] font-semibold select-none capitalize">
          {fontFamily === "sans" ? "Fuente" : fontFamily}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <div className="flex-1"/>
      </div>

      {/* ── Window Body ───────────────────────────────────────────────── */}
      <div 
        className={`flex-1 overflow-y-auto bg-[var(--color-bg-primary)] px-10 py-7 text-[var(--color-text-main)] relative
          ${isBold ? "font-bold *:font-bold" : ""}
          ${isItalic ? "italic *:italic" : ""}
          ${isUnderline ? "underline *:underline" : ""}
          ${textAlign === "center" ? "text-center *:text-center" : textAlign === "right" ? "text-right *:text-right" : "text-left *:text-left"}
          ${fontFamily === "serif" ? "font-serif *:font-serif" : fontFamily === "mono" ? "font-mono *:font-mono" : "font-sans *:font-sans"}
        `}
        style={{ zoom: zoomLevel }}
      >
        {windowData.content || (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <p className="text-sm font-medium">Sin contenido</p>
          </div>
        )}
      </div>

      {/* ── Resize Handle ─────────────────────────────────────────────── */}
      {!windowData.isMaximized && (
        <div
          onPointerDown={handleResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-1 opacity-50 hover:opacity-100 transition-opacity"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 14 20 20 14 20" />
            <polyline points="20 4 20 10 14 10" className="opacity-0" />
            <polyline points="4 20 10 20 10 14" className="opacity-0" />
            <polyline points="12 20 20 12" />
            <polyline points="16 20 20 16" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
