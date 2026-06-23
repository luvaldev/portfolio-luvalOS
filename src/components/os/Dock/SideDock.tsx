"use client"
import React, { useState, useRef, useCallback, useEffect } from "react"
import { useOSStore } from "@/store/useOSStore"
import { motion, AnimatePresence } from "framer-motion"
import { DOCK_ICONS } from "./dockData"

interface DockApp {
  id: string
  name: string
  icon: React.ReactNode
  content?: React.ReactNode
}

export default function BottomDock({ className = "" }: { className?: string }) {
  const { windows, openWindow, focusWindow, minimizeWindow } = useOSStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [contents, setContents] = useState<Record<string, React.ReactNode>>({})
  const dockRef = useRef<HTMLDivElement>(null)

  // Cargar contenido lazy
  useEffect(() => {
    import("../WindowContent").then(mod => {
      setContents({
        readme:   React.createElement(mod.ReadmeContent),
        projects: React.createElement(mod.ProjectsContent),
        skills:   React.createElement(mod.SkillsContent),
        contact:  React.createElement(mod.ContactContent),
        resume:   React.createElement(mod.ResumeContent),
        about:    React.createElement(mod.AboutContent),
        blog:     React.createElement(mod.BlogContent),
        store:    React.createElement(mod.StoreContent),
        trash:    React.createElement(mod.TrashContent),
      })
    })
  }, [])

  const apps: DockApp[] = [
    { id: "readme",   name: "README.md",   icon: DOCK_ICONS.readme,   content: contents.readme   },
    { id: "projects", name: "projects/",   icon: DOCK_ICONS.projects, content: contents.projects  },
    { id: "skills",   name: "skills.json", icon: DOCK_ICONS.skills,   content: contents.skills   },
    { id: "contact",  name: "contact.vcf", icon: DOCK_ICONS.contact,  content: contents.contact  },
    { id: "resume",   name: "resume.pdf",  icon: DOCK_ICONS.resume,   content: contents.resume   },
  ]

  const BASE = 52
  const MAX = 76
  const SPREAD = 130 // radio del efecto de magnification

  // Calcula el scale de cada ícono según distancia del mouse
  const getScale = (index: number): number => {
    if (mouseX === null || !dockRef.current) return 1
    const rect = dockRef.current.getBoundingClientRect()
    const GAP = 10
    const PADDING = 12
    const iconCenter = PADDING + index * (BASE + GAP) + BASE / 2
    const relX = mouseX - rect.left
    const dist = Math.abs(relX - iconCenter)
    if (dist > SPREAD) return 1
    const t = 1 - dist / SPREAD
    return 1 + (MAX / BASE - 1) * Math.cos((1 - t) * Math.PI / 2)
  }

  const openCounts = Object.keys(windows).filter(k => !windows[k].isMinimized).length

  const handleClick = (app: DockApp) => {
    const win = windows[app.id]
    if (win) {
      if (win.isMinimized) {
        focusWindow(app.id)
      } else if (win.isFocused) {
        minimizeWindow(app.id)
      } else {
        focusWindow(app.id)
      }
    } else {
      openWindow(app.id, {
        title: app.name,
        icon: "📄",
        content: app.content,
        x: 130 + Math.random() * 60,
        y: 56 + Math.random() * 20,
        width: 960,
        height: 650,
      })
    }
  }

  // El tooltip de ventanas vacías se movió al TopBar

  return (
    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center pb-3 ${className}`}>
      {/* Dock */}
      <div
        ref={dockRef}
        className="relative flex items-end shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.5)_inset,0_-1px_0_rgba(0,0,0,0.04)_inset] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)_inset,0_-1px_0_rgba(0,0,0,0.2)_inset]"
        style={{
          padding: "10px 12px 10px",
          background: "var(--color-os-bar)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: 22,
          gap: 10,
        }}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {apps.map((app, i) => {
          const scale = getScale(i)
          const size = BASE * scale
          const isOpen = !!windows[app.id]
          const isMinimized = windows[app.id]?.isMinimized
          const isFocused = windows[app.id]?.isFocused

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center cursor-pointer group"
              style={{ width: BASE, alignItems: "center" }}
              onClick={() => handleClick(app)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Label tooltip */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute pointer-events-none z-10 whitespace-nowrap"
                    style={{ bottom: size + 14 }}
                  >
                    <div className="bg-[#1D1E20] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg">
                      {app.name}
                    </div>
                    <div className="w-0 h-0 mx-auto border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1D1E20]"/>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <div
                className="transition-none flex-shrink-0"
                style={{
                  width: size,
                  height: size,
                  marginBottom: 6,
                  filter: isFocused ? "brightness(1.05)" : "brightness(1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)",
                  borderRadius: "22%",
                  transform: hoveredIndex === i ? "translateY(-4px)" : "translateY(0)",
                  transition: "transform 0.15s ease",
                }}
              >
                {app.icon}
              </div>

              {/* Active dot(s) */}
              <div className="absolute bottom-0.5 flex gap-0.5 justify-center" style={{ width: BASE }}>
                {isOpen && !isMinimized && (
                  <div className="w-1 h-1 rounded-full bg-[var(--color-text-main)] opacity-70"/>
                )}
                {isMinimized && (
                  <div className="w-1 h-1 rounded-full bg-[var(--color-text-muted)] opacity-40"/>
                )}
              </div>
            </div>
          )
        })}

        {/* Separator */}
        <div className="w-px self-stretch my-1 mx-1" style={{ background: "var(--color-border-medium)" }}/>

        {/* Trash icon */}
        <div
          className="relative flex flex-col items-center cursor-pointer"
          style={{ width: BASE }}
          onMouseEnter={() => setHoveredIndex(99)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === 99 && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute pointer-events-none z-10 whitespace-nowrap"
                style={{ bottom: BASE + 14 }}
              >
                <div className="bg-[#1D1E20] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg">
                  Papelera
                </div>
                <div className="w-0 h-0 mx-auto border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1D1E20]"/>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-[22%] mb-1.5"
            style={{
              width: BASE,
              height: BASE,
              background: "#6B7280",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transform: hoveredIndex === 99 ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.15s ease",
            }}
          >
            <div className="w-full h-full rounded-[22%] flex items-center justify-center relative overflow-hidden">
              <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none">
                <polyline points="3 6 5 6 21 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="w-1 h-1 opacity-0"/>
        </div>
      </div>

      {/* Dock reflection line */}
      <div className="w-full h-px mt-0.5 rounded-full opacity-20" style={{ background: "var(--color-border-medium)" }}/>
    </div>
  )
}
