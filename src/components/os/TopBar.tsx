"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"

// ─── Keyboard shortcut badge ──────────────────────────────────────────────────
function Kbd({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-0.5 ml-auto">
      {keys.map(k => (
        <kbd key={k} className="bg-black/[0.08] dark:bg-white/[0.1] text-[var(--color-text-muted)] text-[10px] font-semibold px-1.5 py-0.5 rounded min-w-[22px] text-center font-mono">
          {k}
        </kbd>
      ))}
    </div>
  )
}

// ─── Logo "Apple menu" ────────────────────────────────────────────────────────
function LogoMenu({ onClose }: { onClose: () => void }) {
  const { minimizeWindow, windows } = useOSStore()
  const allIds = Object.keys(windows)

  const closeAll = () => {
    const store = useOSStore.getState()
    allIds.forEach(id => store.closeWindow(id))
    onClose()
  }

  const items = [
    { label: "About luvalOS", action: onClose },
    { label: "About this website", action: onClose },
    { sep: false },
    { label: "Display options", shortcut: [">"], hasArrow: true, action: onClose },
    { label: "Switch to website mode", action: onClose },
    { separator: true },
    { label: "Start screensaver", shortcut: ["Shift", "Z"], action: onClose },
    { label: "Close all windows", shortcut: ["Shift", "X"], action: closeAll, disabled: allIds.length === 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      className="absolute top-[44px] left-0 z-[950] min-w-[260px] bg-[var(--color-bg-primary)] border border-[var(--color-border-medium)] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] py-1.5 overflow-hidden"
    >
      {items.map((item: any, idx) => {
        if (item.separator) {
          return <div key={idx} className="my-1.5 border-t border-[var(--color-border-subtle)]"/>
        }
        return (
          <button
            key={idx}
            disabled={item.disabled}
            onClick={() => { item.action?.(); onClose() }}
            className={`w-full flex items-center justify-between px-4 py-2 text-[13.5px] font-medium transition-colors ${
              item.disabled
                ? "text-[var(--color-text-muted)] opacity-40 cursor-not-allowed"
                : "text-[var(--color-text-main)] hover:bg-[var(--color-hover-bg)] cursor-pointer"
            }`}
          >
            <span>{item.label}</span>
            {item.shortcut ? <Kbd keys={item.shortcut}/> : item.hasArrow ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)]">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            ) : null}
          </button>
        )
      })}
    </motion.div>
  )
}

// ─── Mega dropdown item con icono de color ────────────────────────────────────
function MegaItem({ icon, label, hasArrow }: { icon: React.ReactNode; label: string; hasArrow?: boolean }) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-2 hover:bg-[var(--color-hover-bg)] transition-colors group rounded-sm">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0">{icon}</span>
        <span className="text-[13.5px] font-medium text-[var(--color-text-main)]">{label}</span>
      </div>
      {hasArrow && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)]">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      )}
    </button>
  )
}

// Colorful mini icon
const CI = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
    {children}
  </div>
)

// ─── Proyectos dropdown ───────────────────────────────────────────────────────
function ProyectosMenu() {
  const items = [
    { label: "Overview",           bg: "#E5E7EB", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { label: "Web Apps",           bg: "#DBEAFE", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, arrow: true },
    { label: "APIs & Backend",     bg: "#D1FAE5", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, arrow: true },
    { label: "Open Source",        bg: "#FEF3C7", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
    { label: "Design Systems",     bg: "#FCE7F3", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
    { label: "CLI Tools",          bg: "#EDE9FE", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
  ]
  return (
    <div className="py-1">
      {items.map(item => (
        <button key={item.label} className="w-full flex items-center justify-between px-3 py-2 hover:bg-[var(--color-hover-bg)] transition-colors rounded-sm">
          <div className="flex items-center gap-3">
            <CI bg={item.bg}>{item.icon}</CI>
            <span className="text-[13.5px] font-medium text-[var(--color-text-main)]">{item.label}</span>
          </div>
          {item.arrow && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)]"><polyline points="9 18 15 12 9 6"/></svg>}
        </button>
      ))}
    </div>
  )
}

// ─── Skills dropdown ──────────────────────────────────────────────────────────
function SkillsMenu() {
  const items = [
    { label: "React / Next.js",    bg: "#DBEAFE", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.3"/><path d="M12 2c-5.52 0-10 4.48-10 10h4c0-3.31 2.69-6 6-6s6 2.69 6 6h4C22 6.48 17.52 2 12 2z"/></svg> },
    { label: "TypeScript",         bg: "#DBEAFE", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="#3B82F6"><rect x="0" y="0" width="24" height="24" rx="3" fill="#3B82F6" opacity="0.15"/><text x="3" y="17" fontSize="13" fontWeight="900" fill="#3B82F6" fontFamily="monospace">TS</text></svg> },
    { label: "Node.js",            bg: "#D1FAE5", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, arrow: true },
    { label: "PostgreSQL",         bg: "#E0E7FF", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
    { label: "CSS / Tailwind",     bg: "#FCE7F3", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-0.74L12 2z"/></svg> },
    { label: "Docker / DevOps",    bg: "#FEF3C7", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, arrow: true },
    { label: "Figma / UI Design",  bg: "#FEE2E2", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg> },
    { label: "Git / GitHub",       bg: "#E5E7EB", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="#374151"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  ]
  const topItems = items.slice(0, 3)
  const rest = items.slice(3)
  return (
    <div className="py-1">
      {items.map(item => (
        <button key={item.label} className="w-full flex items-center justify-between px-3 py-2 hover:bg-[var(--color-hover-bg)] transition-colors rounded-sm">
          <div className="flex items-center gap-3">
            <CI bg={(item as any).bg}>{(item as any).icon}</CI>
            <span className="text-[13.5px] font-medium text-[var(--color-text-main)]">{item.label}</span>
          </div>
          {(item as any).arrow && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)]"><polyline points="9 18 15 12 9 6"/></svg>}
        </button>
      ))}
    </div>
  )
}

// ─── Nav dropdown wrapper ─────────────────────────────────────────────────────
function NavDropdown({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const show = () => setOpen(true)
  const hide = () => setOpen(false)  // close immediately, no timeout

  return (
    <div className="relative h-full flex items-center" onMouseEnter={show} onMouseLeave={hide}>
      <button className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[13.5px] font-medium transition-colors ${
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
            className="absolute top-[44px] left-0 z-[950] min-w-[240px] bg-[var(--color-bg-primary)] border border-[var(--color-border-medium)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-1 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Window Counter Badge ───────────────────────────────────────────────────────
function TabCounter() {
  const { windows, focusWindow } = useOSStore()
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const openWindows = Object.values(windows).filter(w => w.isOpen)
  const count = openWindows.length

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return
    const handle = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setShowMenu(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [showMenu])

  return (
    <div
      ref={menuRef}
      className="relative flex items-center justify-center h-full mr-1"
    >
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
            className="absolute top-[44px] right-0 z-[9999] min-w-[200px] bg-white dark:bg-[var(--color-bg-primary)] border border-[var(--color-border-medium)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] py-1.5"
          >
            {count === 0 ? (
              <div className="px-4 py-3 text-center">
                <p className="text-[13px] font-bold text-[var(--color-text-main)]">You have no open windows</p>
                <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">Manage them here when active</p>
              </div>
            ) : (
              openWindows.map(win => (
                <button
                  key={win.id}
                  onClick={() => {
                    focusWindow(win.id)
                    setShowMenu(false)
                  }}
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

// ─── TopBar ───────────────────────────────────────────────────────────────────
export default function TopBar() {
  const [time, setTime] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoOpen, setLogoOpen] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Cerrar logo menu al hacer click fuera
  useEffect(() => {
    if (!logoOpen) return
    const handle = (e: MouseEvent) => {
      if (!logoRef.current?.contains(e.target as Node)) setLogoOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [logoOpen])

  return (
    <div
      className="h-[44px] w-full flex items-center justify-between px-4 gap-2 select-none relative"
      style={{ zIndex: 900, background: "var(--color-os-bar)", borderBottom: "1px solid var(--color-border-subtle)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}

    >
      {/* ── Left ─────────────────────────────────────────────── */}
      <div className="flex items-center h-full gap-0.5">
        {/* Logo button — opens Apple-style menu */}
        <div ref={logoRef} className="relative h-full flex items-center mr-2">
          <button
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md transition-colors ${
              logoOpen ? "bg-black/[0.07] dark:bg-white/[0.07]" : "hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
            }`}
            onClick={() => setLogoOpen(v => !v)}
          >
            <div className="w-[24px] h-[24px] relative flex-shrink-0">
              <Image src="/logo.svg" alt="luvalOS" fill className="object-contain"/>
            </div>
            <span className="font-black text-[14px] tracking-tight text-[var(--color-text-main)] hidden sm:block">
              luvalOS
            </span>
          </button>
          <AnimatePresence>
            {logoOpen && <LogoMenu onClose={() => setLogoOpen(false)}/>}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="hidden md:flex items-center h-full gap-0">
          <NavDropdown title="Proyectos">
            <ProyectosMenu />
          </NavDropdown>
          <NavDropdown title="Skills">
            <SkillsMenu />
          </NavDropdown>
          <button className="px-2.5 py-1 rounded-md text-[13.5px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
            Acerca de
          </button>
          <button className="px-2.5 py-1 rounded-md text-[13.5px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
            Contacto
          </button>
        </div>
      </div>

      {/* ── Right ────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5">
        <button className="w-8 h-8 hidden sm:flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <button
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-bold text-white mr-1"
          style={{ background: "var(--color-accent)", boxShadow: "0 2px 0 var(--color-accent-hover)" }}
        >
          Descargar CV
        </button>

        <TabCounter />

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          >
            {theme === "dark"
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        )}

        <div className="text-[12.5px] font-mono font-semibold text-[var(--color-text-muted)] tabular-nums pl-1 pr-0.5">
          {time}
        </div>
      </div>
    </div>
  )
}
