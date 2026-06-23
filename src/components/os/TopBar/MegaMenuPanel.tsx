"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CI } from "./Utils";

export default function MegaMenuPanel<T extends { id: string; label: string; bg: string; icon: React.ReactNode; projects?: {name: string, desc: string}[]; skills?: { name: string; level: number, desc?: string }[] }>({
  categories,
  type,
  onAction,
}: {
  categories: T[]
  type: "projects" | "skills"
  onAction: (id: string) => void
}) {
  const [activeId, setActiveId] = useState<string>("")
  const [expandedProjectId, setExpandedProjectId] = useState<string>("")

  return (
    <div className="py-1.5 w-[220px] relative">
      {categories.map(cat => {
        const isActive = activeId === cat.id && cat.id !== "overview"
        return (
          <div key={cat.id} className="px-1 relative">
            <button
              onClick={(e) => {
                if (cat.id === "overview") {
                  onAction("overview")
                } else {
                  setActiveId(isActive ? "" : cat.id)
                  setExpandedProjectId("")
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                isActive
                  ? "bg-[var(--color-hover-bg)]"
                  : "hover:bg-[var(--color-hover-bg)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CI bg={cat.bg}>{cat.icon}</CI>
                <span className="text-[13px] font-medium text-[var(--color-text-main)]">{cat.label}</span>
              </div>
              {cat.id !== "overview" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--color-text-muted)]">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </button>

            {/* Cascading Subpanel */}
            {isActive && (
              <div className="absolute top-0 left-[calc(100%+4px)] z-[1000] w-[260px]">
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-1.5 overflow-hidden"
                >
                  <div className="px-3 py-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                      {cat.label}
                    </span>
                  </div>
                  {type === "projects" && cat.projects?.map(p => (
                    <div key={p.name} className="px-2 mb-1 last:mb-0">
                      <button
                        onClick={() => setExpandedProjectId(expandedProjectId === p.name ? "" : p.name)}
                        className="w-full flex items-center justify-between transition-colors text-left group px-2 py-1.5 rounded-md hover:bg-[var(--color-hover-bg)]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors flex-shrink-0 ${expandedProjectId === p.name ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-muted)] opacity-50 group-hover:bg-[var(--color-text-main)]"}`}/>
                          <span className={`text-[13px] font-medium transition-colors ${expandedProjectId === p.name ? "text-[var(--color-accent)]" : "text-[var(--color-text-main)] group-hover:text-[var(--color-accent)]"}`}>{p.name}</span>
                        </div>
                      </button>
                      <AnimatePresence>
                        {expandedProjectId === p.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-5 pr-2 pt-1 pb-1.5 text-[11.5px] text-[var(--color-text-muted)] leading-relaxed overflow-hidden"
                          >
                            {p.desc}
                            <button onClick={(e) => { e.stopPropagation(); onAction(cat.id); }} className="block mt-1.5 text-[var(--color-accent)] hover:underline font-medium">Ver en ventana →</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  {type === "skills" && cat.skills?.map(s => (
                    <div key={s.name} className="px-3 py-1.5">
                      <div className="flex justify-between mb-1">
                        <span className="text-[12.5px] font-medium text-[var(--color-text-main)]">{s.name}</span>
                        <span className="text-[11px] text-[var(--color-text-muted)] font-mono">{s.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-[var(--color-border-subtle)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: cat.bg === "#DBEAFE" ? "#3B82F6" : cat.bg === "#D1FAE5" ? "#10B981" : cat.bg === "#FEF3C7" ? "#F59E0B" : cat.bg === "#FEE2E2" ? "#EF4444" : cat.bg === "#EDE9FE" ? "#8B5CF6" : "#EC4899" }}/>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}