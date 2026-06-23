"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOSStore } from "@/store/useOSStore"
import * as WindowContent from "./WindowContent"
import { useTheme } from "next-themes";
import LogoMenu from "./TopBar/LogoMenu";
import MegaMenuPanel from "./TopBar/MegaMenuPanel";
import NavDropdown from "./TopBar/NavDropdown";
import TabCounter from "./TopBar/TabCounter";
import ClockMenu from "./TopBar/ClockCalendar";
import SearchOverlay from "./TopBar/SearchOverlay";
import { PROJECT_CATEGORIES, SKILL_CATEGORIES } from "./TopBar/topBarData";
import { Kbd, CI } from "./TopBar/Utils";

// ─── TopBar ───────────────────────────────────────────────────────────────────
export default function TopBar() {
  const [time, setTime] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoOpen, setLogoOpen] = useState(false)
  const [clockOpen, setClockOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const { openWindow, windows } = useOSStore()

  useEffect(() => {
    setMounted(true)
    const tick = () => setTime(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    if (!logoOpen) return
    const handle = (e: MouseEvent) => {
      if (!logoRef.current?.contains(e.target as Node)) setLogoOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [logoOpen])

  useEffect(() => {
    if (!clockOpen) return
    const handle = (e: MouseEvent) => {
      if (!clockRef.current?.contains(e.target as Node)) setClockOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [clockOpen])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K → open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
      // Escape → close search
      if (e.key === "Escape") {
        setSearchOpen(false)
        setClockOpen(false)
        setLogoOpen(false)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const openWindowById = useCallback((id: string, title: string, icon: string) => {
    import("./WindowContent").then(mod => {
      const contentMap: Record<string, any> = {
        readme: mod.ReadmeContent, projects: mod.ProjectsContent,
        skills: mod.SkillsContent, contact: mod.ContactContent,
        resume: mod.ResumeContent, about: mod.AboutContent,
        blog: mod.BlogContent, store: mod.StoreContent,
        trash: mod.TrashContent,
      }
      const Comp = contentMap[id]
      if (windows[id]) {
        useOSStore.getState().focusWindow(id)
      } else {
        openWindow(id, {
          title, icon, content: Comp ? React.createElement(Comp) : undefined,
          x: 150 + Math.random() * 60, y: 55 + Math.random() * 30,
          width: 960, height: 650,
        })
      }
    })
  }, [openWindow, windows])

  return (
    <>
      <div
        className="h-[44px] w-full flex items-center justify-between px-4 gap-2 select-none relative"
        style={{ zIndex: 900, background: "var(--color-os-bar)", borderBottom: "1px solid var(--color-border-subtle)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        {/* ── Left ─────────────────────────────────────────────── */}
        <div className="flex items-center h-full gap-0.5">
          {/* Logo button */}
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
            {/* Proyectos mega menu */}
            <NavDropdown title="Proyectos">
              <MegaMenuPanel
                categories={PROJECT_CATEGORIES}
                type="projects"
                onAction={(id: string) => {
                  openWindowById(id === "overview" ? "projects" : "projects", "Proyectos", "📁")
                }}
              />
            </NavDropdown>

            {/* Skills mega menu */}
            <NavDropdown title="Skills">
              <MegaMenuPanel
                categories={SKILL_CATEGORIES}
                type="skills"
                onAction={() => openWindowById("skills", "Skills", "⚡")}
              />
            </NavDropdown>

            {/* Acerca de */}
            <button
              onClick={() => openWindowById("about", "about.mdx", "📄")}
              className="px-2.5 py-1 rounded-md text-[13.5px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
            >
              Acerca de
            </button>

            {/* Contacto */}
            <button
              onClick={() => openWindowById("contact", "Contacto", "✉️")}
              className="px-2.5 py-1 rounded-md text-[13.5px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
            >
              Contacto
            </button>
          </div>
        </div>

        {/* ── Right ────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 hidden sm:flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
            title="Buscar (Ctrl+K)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Download CV */}
          <button
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-bold text-white mr-1"
            style={{ background: "var(--color-accent)", boxShadow: "0 2px 0 var(--color-accent-hover)" }}
          >
            Descargar CV
          </button>

          <TabCounter />

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark"
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
          )}

          {/* Clock */}
          <div ref={clockRef} className="relative">
            <button
              onClick={() => setClockOpen(v => !v)}
              className="text-[12.5px] font-mono font-semibold text-[var(--color-text-muted)] tabular-nums pl-1 pr-0.5 hover:text-[var(--color-text-main)] transition-colors rounded-md px-2 py-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              title="Ver calendario"
            >
              {time}
            </button>
            <AnimatePresence>
              {clockOpen && <ClockMenu time={time} onClose={() => setClockOpen(false)} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  )
}