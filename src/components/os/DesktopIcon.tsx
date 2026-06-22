"use client"

import { useOSStore } from "@/store/useOSStore"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import React from "react"

// ─── Document icons type PostHog ─────────────────────────────────────────────
function DocSVG({ topColor, bodyColor, accent, label }: {
  topColor: string; bodyColor: string; accent: string; label?: string
}) {
  return (
    <svg viewBox="0 0 52 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
      {/* Body */}
      <path d="M6 0C3.79 0 2 1.79 2 4V60C2 62.21 3.79 64 6 64H46C48.21 64 50 62.21 50 60V16L36 0H6Z" fill={bodyColor}/>
      {/* Folded corner */}
      <path d="M36 0L50 16H40C37.79 16 36 14.21 36 12V0Z" fill={topColor}/>
      {/* Lines of text */}
      <rect x="10" y="26" width="28" height="3" rx="1.5" fill={accent} opacity="0.7"/>
      <rect x="10" y="33" width="22" height="3" rx="1.5" fill={accent} opacity="0.5"/>
      <rect x="10" y="40" width="26" height="3" rx="1.5" fill={accent} opacity="0.5"/>
      <rect x="10" y="47" width="16" height="3" rx="1.5" fill={accent} opacity="0.35"/>
      {/* Small label badge */}
      {label && (
        <g>
          <rect x="8" y="13" width={label.length * 5.5 + 8} height="10" rx="3" fill={accent} opacity="0.9"/>
          <text x="12" y="21" fontSize="7" fontWeight="700" fill="white" fontFamily="monospace">{label}</text>
        </g>
      )}
    </svg>
  )
}

function FolderSVG({ color, shade }: { color: string; shade: string }) {
  return (
    <svg viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
      {/* Back */}
      <path d="M4 10C4 7.79 5.79 6 8 6H24L30 14H60C62.21 14 64 15.79 64 18V48C64 50.21 62.21 52 60 52H8C5.79 52 4 50.21 4 48V10Z" fill={shade}/>
      {/* Front panel */}
      <rect x="0" y="16" width="64" height="36" rx="4" fill={color}/>
      {/* Tab shape */}
      <path d="M0 16H26L22 6H4C1.79 6 0 7.79 0 10V16Z" fill={color}/>
    </svg>
  )
}

function MailSVG() {
  return (
    <svg viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
      <rect x="2" y="2" width="60" height="48" rx="6" fill="#EF4444"/>
      {/* Envelope flap */}
      <path d="M2 8L32 32L62 8" stroke="#FEE2E2" strokeWidth="2" fill="none"/>
      {/* Envelope body lines */}
      <path d="M2 44L20 28" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62 44L44 28" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ToolSVG() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
      <rect width="56" height="56" rx="14" fill="#3B82F6"/>
      {/* Wrench */}
      <path d="M36 8a12 12 0 0 0-11.66 14.86L9 38.2a3 3 0 0 0 4.24 4.24l15.34-15.34A12 12 0 0 0 36 8z" fill="white" opacity="0.9"/>
      <circle cx="36" cy="20" r="5" fill="#3B82F6"/>
    </svg>
  )
}

function TrashSVG({ hasItems }: { hasItems?: boolean }) {
  return (
    <svg viewBox="0 0 52 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
      {/* Can body */}
      <path d="M6 16H46L42 60C41.6 62.28 39.6 64 37.3 64H14.7C12.4 64 10.4 62.28 10 60L6 16Z" fill={hasItems ? "#6B7280" : "#D1D5DB"}/>
      {/* Can stripes */}
      <line x1="20" y1="24" x2="19" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="26" y1="24" x2="26" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="32" y1="24" x2="33" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
      {/* Lid */}
      <rect x="2" y="10" width="48" height="8" rx="4" fill={hasItems ? "#374151" : "#9CA3AF"}/>
      {/* Handle */}
      <path d="M18 10V6C18 3.79 19.79 2 22 2H30C32.21 2 34 3.79 34 6V10" stroke={hasItems ? "#374151" : "#9CA3AF"} strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

// ─── Generic icon registry ────────────────────────────────────────────────────
const ICON_MAP: Record<string, (props?: any) => React.ReactNode> = {
  readme:   () => <DocSVG topColor="#C4B5FD" bodyColor="#EDE9FE" accent="#7C3AED" label="MD"/>,
  projects: () => <FolderSVG color="#FCD34D" shade="#F59E0B"/>,
  skills:   () => <ToolSVG/>,
  contact:  () => <MailSVG/>,
  resume:   () => <DocSVG topColor="#6EE7B7" bodyColor="#D1FAE5" accent="#059669" label="PDF"/>,
  about:    () => <DocSVG topColor="#93C5FD" bodyColor="#DBEAFE" accent="#1D4ED8" label="MDX"/>,
  blog:     () => <DocSVG topColor="#F9A8D4" bodyColor="#FCE7F3" accent="#BE185D" label="MD"/>,
  store:    () => <FolderSVG color="#FB923C" shade="#EA580C"/>,
  trash:    () => <TrashSVG hasItems={false}/>,
}

interface DesktopIconProps {
  id: string
  title: string
  x?: number
  y?: number
  right?: number
  content?: React.ReactNode
  desktopRef?: React.RefObject<HTMLDivElement | null>
}

export default function DesktopIcon({ id, title, x, y, right, content, desktopRef }: DesktopIconProps) {
  const { openWindow, windows } = useOSStore()
  const [contents, setContents] = useState<Record<string, React.ReactNode>>({})
  const wasDragged = useRef(false)

  useEffect(() => {
    import("./WindowContent").then(mod => {
      setContents({
        readme: React.createElement(mod.ReadmeContent),
        projects: React.createElement(mod.ProjectsContent),
        skills: React.createElement(mod.SkillsContent),
        contact: React.createElement(mod.ContactContent),
        resume: React.createElement(mod.ResumeContent),
      })
    })
  }, [])

  const isOpen = !!(windows[id] && !windows[id].isMinimized)
  const IconComponent = ICON_MAP[id] ?? ICON_MAP.readme

  const handleOpen = () => {
    if (wasDragged.current) return
    openWindow(id, {
      title,
      icon: "📄",
      content: content ?? contents[id],
      x: 150 + Math.random() * 60,
      y: 55 + Math.random() * 30,
      width: 960,
      height: 650,
    })
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ power: 0 }}
      dragConstraints={desktopRef}
      whileTap={{ scale: 0.95 }}
      onDragStart={() => {
        wasDragged.current = true
      }}
      onDragEnd={() => {
        setTimeout(() => {
          wasDragged.current = false
        }, 50)
      }}
      className="absolute flex flex-col items-center gap-1.5 px-2 pt-2 pb-1 rounded-xl cursor-grab active:cursor-grabbing group select-none hover:bg-black/[0.06] dark:hover:bg-white/[0.05] transition-colors"
      style={{
        left: x !== undefined ? x : undefined,
        right: right !== undefined ? right : undefined,
        top: y,
        width: 80
      }}
      onDoubleClick={handleOpen}
      onClick={(e) => {
        if (wasDragged.current) return
        if (typeof window !== "undefined" && window.innerWidth < 768) handleOpen()
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
        {IconComponent()}
      </div>

      {/* Label */}
      <span
        className="text-[11px] text-[var(--color-text-main)] text-center leading-snug font-medium px-1.5 py-0.5 rounded-[5px] max-w-full break-words"
        style={{
          background: isOpen
            ? "rgba(0,0,0,0.12)"
            : "rgba(0,0,0,0.08)",
          backdropFilter: "blur(4px)",
        }}
      >
        {title}
      </span>

      {/* Open indicator */}
      {isOpen && (
        <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-white/80 shadow-sm"/>
      )}
    </motion.div>
  )
}
