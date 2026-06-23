"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { HeroSection }    from "./sections/HeroSection"
import { ProjectsSection } from "./sections/ProjectsSection"
import { SkillsSection }   from "./sections/SkillsSection"
import { ResumeSection }   from "./sections/ResumeSection"
import { ContactSection }  from "./sections/ContactSection"

// ── Tab configuration ────────────────────────────────────────────────────────
type TabId = "home" | "projects" | "skills" | "resume" | "contact"

const TABS: {
  id: TabId
  label: string
  icon: (active: boolean) => React.ReactNode
}[] = [
  {
    id: "home",
    label: "Inicio",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Proyectos",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        {active && <circle cx="12" cy="12" r="2" fill="currentColor"/>}
      </svg>
    ),
  },
  {
    id: "resume",
    label: "CV",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor"/>
        {active
          ? <><line x1="9" y1="13" x2="15" y2="13" stroke="white"/><line x1="9" y1="17" x2="13" y2="17" stroke="white"/></>
          : <><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>
        }
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contacto",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor"/>
      </svg>
    ),
  },
]

// ── Section content map ───────────────────────────────────────────────────────
const SECTION_CONTENT: Record<TabId, React.ReactNode> = {
  home:     <HeroSection />,
  projects: <ProjectsSection />,
  skills:   <SkillsSection />,
  resume:   <ResumeSection />,
  contact:  <ContactSection />,
}

// ── Component ────────────────────────────────────────────────────────────────
export default function MobileView() {
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [prevTab,   setPrevTab]   = useState<TabId>("home")

  // Determine slide direction based on tab index
  const currentIdx = TABS.findIndex(t => t.id === activeTab)
  const prevIdx    = TABS.findIndex(t => t.id === prevTab)
  const direction  = currentIdx > prevIdx ? 1 : -1

  const handleTabChange = (id: TabId) => {
    if (id === activeTab) return
    setPrevTab(activeTab)
    setActiveTab(id)
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "var(--color-os-bg)" }}
    >
      {/* ── Top header ─────────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b z-10"
        style={{
          background: "var(--color-os-bar)",
          borderColor: "var(--color-border-subtle)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image src="/logo.svg" alt="luvalOS" fill className="object-contain" priority />
          </div>
          <span className="font-black text-[15px] tracking-tight text-[var(--color-text-main)]">
            luvalOS
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border hidden xs:inline-flex"
            style={{
              background: "var(--color-accent)15",
              borderColor: "var(--color-accent)30",
              color: "var(--color-accent)",
            }}
          >
            mobile
          </span>
        </div>

        {/* Section title */}
        <span className="text-[13px] font-semibold text-[var(--color-text-muted)]">
          {TABS.find(t => t.id === activeTab)?.label}
        </span>
      </header>

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ x: direction * 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -28, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {SECTION_CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom navigation ──────────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-20 border-t"
        style={{
          background: "var(--color-os-bar)",
          borderColor: "var(--color-border-subtle)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-stretch justify-around h-[62px]">
          {TABS.map(tab => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-all active:scale-90"
                style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-muted)" }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {tab.icon(isActive)}
                </motion.div>

                {/* Label */}
                <span
                  className="text-[9.5px] font-semibold leading-none"
                  style={{ opacity: isActive ? 1 : 0.7 }}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
