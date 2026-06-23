"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOSStore } from "@/store/useOSStore"
import * as WindowContent from "../WindowContent"
import { Kbd, CI } from "./Utils";
import { PROJECT_CATEGORIES, SKILL_CATEGORIES } from "./topBarData";

// ─── Search Overlay ───────────────────────────────────────────────────────────
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const { windows, openWindow, focusWindow } = useOSStore()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  const ALL_ITEMS = [
    { id: "readme", label: "README.md", category: "Archivo", icon: "📄" },
    { id: "projects", label: "Proyectos", category: "Carpeta", icon: "📁" },
    { id: "skills", label: "Skills", category: "Archivo", icon: "⚡" },
    { id: "contact", label: "Contacto", category: "Archivo", icon: "✉️" },
    { id: "resume", label: "Curriculum Vitae", category: "Documento", icon: "📋" },
    { id: "about", label: "Acerca de", category: "Documento", icon: "📝" },
    { id: "blog", label: "Blog", category: "Archivo", icon: "📰" },
    { id: "store", label: "Tienda", category: "Carpeta", icon: "🛒" },
    { id: "trash", label: "Papelera", category: "Sistema", icon: "🗑️" },
  ]

  const filtered = query
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS.slice(0, 6)

  const handleSelect = (item: typeof ALL_ITEMS[0]) => {
    if (windows[item.id]) {
      focusWindow(item.id)
    } else {
      import("../WindowContent").then(mod => {
        const contentMap: Record<string, any> = {
          readme: mod.ReadmeContent, projects: mod.ProjectsContent,
          skills: mod.SkillsContent, contact: mod.ContactContent,
          resume: mod.ResumeContent, about: mod.AboutContent,
          blog: mod.BlogContent, store: mod.StoreContent,
          trash: mod.TrashContent,
        }
        const Comp = contentMap[item.id]
        openWindow(item.id, {
          title: item.label, icon: item.icon,
          content: Comp ? React.createElement(Comp) : undefined,
          x: 150 + Math.random() * 60, y: 55 + Math.random() * 30,
          width: 960, height: 650,
        })
      })
    }
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[2000] flex items-start justify-center pt-[12vh]"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-full max-w-[560px] bg-[var(--color-bg-primary)] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.3)] overflow-hidden border border-[var(--color-border-medium)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border-subtle)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--color-text-muted)] flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar en luvalOS..."
            className="flex-1 bg-transparent text-[15px] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] outline-none"
          />
          <kbd className="text-[11px] text-[var(--color-text-muted)] bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-1.5 py-0.5 rounded font-mono">ESC</kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-[380px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[var(--color-text-muted)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 opacity-40">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="text-sm">Sin resultados para "{query}"</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                {query ? "Resultados" : "Apertura rápida"}
              </div>
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-hover-bg)] transition-colors text-left"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="text-[13.5px] font-semibold text-[var(--color-text-main)]">{item.label}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{item.category}</div>
                  </div>
                  <svg className="ml-auto text-[var(--color-text-muted)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              ))}
            </>
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--color-border-subtle)] flex items-center gap-4">
          <span className="text-[11px] text-[var(--color-text-muted)]">
            <kbd className="bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-1 py-0.5 rounded text-[10px] font-mono mr-1">↵</kbd>
            Abrir
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]">
            <kbd className="bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-1 py-0.5 rounded text-[10px] font-mono mr-1">ESC</kbd>
            Cerrar
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}