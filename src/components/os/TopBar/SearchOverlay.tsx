"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"

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
    { id: "arcade-hub", label: "Centro Arcade", category: "Lanzador de Minijuegos", icon: "🕹️", width: 940, height: 630 },
    { id: "minecraft", label: "Minecraft Web (Eaglercraft)", category: "Juego Web 3D + Sandbox 2D", icon: "🟩", width: 1020, height: 670 },
    { id: "creeper-sweeper", label: "CreeperSweeper", category: "Minijuego · Buscaminas TNT", icon: "💣", width: 720, height: 610 },
    { id: "redstone-snake", label: "Redstone Snake", category: "Minijuego · Arcade Clásico", icon: "🔴", width: 680, height: 620 },
    { id: "nether-invaders", label: "Nether Invaders", category: "Minijuego · Shooter Nether", icon: "⚔️", width: 740, height: 620 },
    { id: "memory-enchants", label: "Memoria Arcana", category: "Minijuego · Runas de Encantamiento", icon: "📖", width: 660, height: 590 },
    { id: "trash", label: "Papelera", category: "Sistema · Basurero Arcade", icon: "🗑️", width: 680, height: 540 },
  ]

  const filtered = query
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS

  const handleSelect = (item: typeof ALL_ITEMS[0]) => {
    if (windows[item.id]) {
      focusWindow(item.id)
    } else {
      import("../WindowContent").then(mod => {
        const contentMap: Record<string, React.ComponentType> = {
          "arcade-hub": mod.ArcadeHubContent,
          minecraft: mod.MinecraftWebContent,
          "creeper-sweeper": mod.CreeperSweeperContent,
          "redstone-snake": mod.RedstoneSnakeContent,
          "nether-invaders": mod.NetherInvadersContent,
          "memory-enchants": mod.MemoryEnchantsContent,
          trash: mod.TrashContent,
        }
        const Comp = contentMap[item.id]
        const openCount = Object.keys(windows).length
        openWindow(item.id, {
          title: item.label,
          icon: item.icon,
          content: Comp ? React.createElement(Comp) : undefined,
          x: 112 + (openCount % 4) * 28,
          y: 52 + (openCount % 4) * 20,
          width: item.width,
          height: item.height,
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
      transition={{ duration: 0.14 }}
      className="fixed inset-0 z-[2000] flex items-start justify-center pt-[12vh]"
      style={{ background: "rgba(6,4,14,0.68)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        className="w-full max-w-[560px] bg-[#130c22] border-[3px] border-[#7c30a4] shadow-[6px_6px_0_#07040e] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-2 border-[#3c245f] bg-[#1a1030]">
          <span className="mc-pixel-font text-[12px] text-[#ffcf4d]">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar juego o comando en luvalOS..."
            className="flex-1 bg-transparent text-[14px] font-mono text-[#eef5ff] placeholder:text-[#9c8db8] outline-none"
          />
          <kbd className="text-[10px] mc-pixel-font text-[#ffcf4d] bg-[#0d0818] border-2 border-[#3c245f] px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="py-2 max-h-[380px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#9c8db8] font-mono">
              <p className="text-sm">Sin resultados para &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-1 mc-pixel-font text-[9px] uppercase tracking-widest text-[#9c8db8]">
                {query ? "Resultados" : "Minijuegos & Sistema"}
              </div>
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#2a1946] transition-colors text-left border-l-2 border-transparent hover:border-[#2ee86c]"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="mc-pixel-font text-[11px] font-bold text-[#eef5ff]">{item.label}</div>
                    <div className="text-[11px] font-mono text-[#a9a1c7]">{item.category}</div>
                  </div>
                  <span className="ml-auto mc-pixel-font text-[9px] text-[#ffcf4d]">ABRIR ▸</span>
                </button>
              ))}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}