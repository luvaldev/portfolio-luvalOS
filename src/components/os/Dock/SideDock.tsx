"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import { DOCK_ICONS } from "./dockData"

interface DockApp {
  id: string
  name: string
  icon: React.ReactNode
  content?: React.ReactNode
  width: number
  height: number
}

export default function BottomDock({ className = "" }: { className?: string }) {
  const { windows, openWindow, focusWindow, minimizeWindow } = useOSStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [relMouseX, setRelMouseX] = useState<number | null>(null)
  const [contents, setContents] = useState<Record<string, React.ReactNode>>({})

  useEffect(() => {
    import("../WindowContent").then((mod) => {
      setContents({
        "arcade-hub": React.createElement(mod.ArcadeHubContent),
        minecraft: React.createElement(mod.MinecraftWebContent),
        "creeper-sweeper": React.createElement(mod.CreeperSweeperContent),
        "redstone-snake": React.createElement(mod.RedstoneSnakeContent),
        "nether-invaders": React.createElement(mod.NetherInvadersContent),
        "memory-enchants": React.createElement(mod.MemoryEnchantsContent),
        trash: React.createElement(mod.TrashContent),
      })
    })
  }, [])

  const apps: DockApp[] = [
    { id: "arcade-hub", name: "Centro Arcade", icon: DOCK_ICONS["arcade-hub"], content: contents["arcade-hub"], width: 940, height: 630 },
    { id: "minecraft", name: "Minecraft Web", icon: DOCK_ICONS.minecraft, content: contents.minecraft, width: 1020, height: 670 },
    { id: "creeper-sweeper", name: "CreeperSweeper", icon: DOCK_ICONS["creeper-sweeper"], content: contents["creeper-sweeper"], width: 720, height: 610 },
    { id: "redstone-snake", name: "Redstone Snake", icon: DOCK_ICONS["redstone-snake"], content: contents["redstone-snake"], width: 680, height: 620 },
    { id: "nether-invaders", name: "Nether Invaders", icon: DOCK_ICONS["nether-invaders"], content: contents["nether-invaders"], width: 740, height: 620 },
    { id: "memory-enchants", name: "Memoria Arcana", icon: DOCK_ICONS["memory-enchants"], content: contents["memory-enchants"], width: 660, height: 590 },
  ]

  const BASE = 50
  const MAX = 68
  const SPREAD = 120

  const getScale = (index: number): number => {
    if (relMouseX === null) return 1
    const GAP = 8
    const PADDING = 10
    const iconCenter = PADDING + index * (BASE + GAP) + BASE / 2
    const dist = Math.abs(relMouseX - iconCenter)
    if (dist > SPREAD) return 1
    const t = 1 - dist / SPREAD
    return 1 + (MAX / BASE - 1) * Math.cos(((1 - t) * Math.PI) / 2)
  }

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
      const openCount = Object.keys(windows).length
      openWindow(app.id, {
        title: app.name,
        icon: "🎮",
        content: app.content,
        x: 112 + (openCount % 5) * 28,
        y: 52 + (openCount % 4) * 20,
        width: app.width,
        height: app.height,
      })
    }
  }

  const openTrash = () => {
    const win = windows.trash
    if (win) {
      focusWindow("trash")
    } else {
      openWindow("trash", {
        title: "Papelera",
        icon: "🗑️",
        content: contents.trash,
        x: 200,
        y: 80,
        width: 680,
        height: 540,
      })
    }
  }

  return (
    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center pb-3 ${className}`}>
      {/* Minecraft Pixel Hotbar Dock */}
      <div
        className="relative flex items-end"
        style={{
          padding: "8px 10px 8px",
          background: "rgba(18, 12, 32, 0.94)",
          border: "3px solid #090512",
          boxShadow: "inset 2px 2px 0 #5b3b8c, inset -2px -2px 0 #23163b, 0 8px 24px rgba(0,0,0,0.55)",
          gap: 8,
        }}
        onMouseMove={(e) => setRelMouseX(e.clientX - e.currentTarget.getBoundingClientRect().left)}
        onMouseLeave={() => setRelMouseX(null)}
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
              className="relative flex flex-col items-center cursor-pointer"
              style={{ width: BASE, alignItems: "center" }}
              onClick={() => handleClick(app)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute pointer-events-none z-10 whitespace-nowrap"
                    style={{ bottom: size + 12 }}
                  >
                    <div className="bg-[#120b22] border-2 border-[#7c30a4] text-[#ffe694] mc-pixel-font text-[10px] font-bold px-2.5 py-1 shadow-[3px_3px_0_#07040d]">
                      {app.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="transition-none flex-shrink-0"
                style={{
                  width: size,
                  height: size,
                  marginBottom: 4,
                  outline: isFocused ? "2px solid #2ee86c" : undefined,
                }}
              >
                {app.icon}
              </div>

              <div className="flex gap-0.5 justify-center h-1">
                {isOpen && !isMinimized && <div className="w-2.5 h-1 bg-[#2ee86c]" />}
                {isMinimized && <div className="w-2.5 h-1 bg-[#ffcf4d]" />}
              </div>
            </div>
          )
        })}

        {/* Divider */}
        <div className="w-[2px] self-stretch my-1 mx-0.5 bg-[#442d6b]" />

        {/* Papelera */}
        <div
          className="relative flex flex-col items-center cursor-pointer"
          style={{ width: BASE }}
          onClick={openTrash}
          onMouseEnter={() => setHoveredIndex(99)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === 99 && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute pointer-events-none z-10 whitespace-nowrap"
                style={{ bottom: BASE + 14 }}
              >
                <div className="bg-[#120b22] border-2 border-[#7c30a4] text-[#ffcf4d] mc-pixel-font text-[10px] font-bold px-2.5 py-1 shadow-[3px_3px_0_#07040d]">
                  Papelera
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="flex-shrink-0 flex items-center justify-center mb-1 border-2 border-[#0c0717]"
            style={{
              width: BASE,
              height: BASE,
              background: "#2d3240",
              boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.12), inset -2px -2px 0 rgba(0,0,0,0.4)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
              <rect x="4" y="1" width="8" height="2" fill="#9ca3af" />
              <rect x="2" y="3" width="12" height="2" fill="#d1d5db" />
              <rect x="3" y="5" width="10" height="9" fill="#6b7280" />
              <rect x="5" y="7" width="1" height="5" fill="#1f2937" />
              <rect x="7" y="7" width="2" height="5" fill="#1f2937" />
              <rect x="10" y="7" width="1" height="5" fill="#1f2937" />
            </svg>
          </div>
          <div className="h-1">{windows.trash && <div className="w-2.5 h-1 bg-[#ffcf4d]" />}</div>
        </div>

        {/* Return to Portfolio Shortcut */}
        <Link
          href="/?world=minecraft"
          className="flex items-center justify-center px-3 h-[50px] mb-1 bg-[#1b5e2e] border-2 border-[#2ee86c] text-white mc-pixel-font text-[10px] font-bold hover:brightness-110 transition-all"
          title="Volver al Portafolio Principal"
        >
          ← SALIR
        </Link>
      </div>
    </div>
  )
}
