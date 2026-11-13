"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import { PixelCommandBlockIcon, PixelServerBarsIcon } from "@/components/icons/PixelIcons"
import LogoMenu from "./TopBar/LogoMenu"
import TabCounter from "./TopBar/TabCounter"
import ClockMenu from "./TopBar/ClockCalendar"

export default function TopBar() {
  const [time, setTime] = useState("")
  const [logoOpen, setLogoOpen] = useState(false)
  const [clockOpen, setClockOpen] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const { openWindow, windows } = useOSStore()

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClockOpen(false)
        setLogoOpen(false)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const openApp = useCallback(
    (id: string, title: string, width = 940, height = 630) => {
      if (windows[id]) {
        useOSStore.getState().focusWindow(id)
        return
      }
      import("./WindowContent").then((mod) => {
        const contentMap: Record<string, React.ComponentType> = {
          "arcade-hub": mod.ArcadeHubContent,
          minecraft: mod.MinecraftWebContent,
          "creeper-sweeper": mod.CreeperSweeperContent,
          "redstone-snake": mod.RedstoneSnakeContent,
          "nether-invaders": mod.NetherInvadersContent,
          "memory-enchants": mod.MemoryEnchantsContent,
          trash: mod.TrashContent,
        }
        const Comp = contentMap[id]
        openWindow(id, {
          title,
          icon: "🎮",
          content: Comp ? React.createElement(Comp) : undefined,
          x: 130 + Math.random() * 55,
          y: 56 + Math.random() * 24,
          width,
          height,
        })
      })
    },
    [openWindow, windows],
  )

  return (
    <div
      className="h-[46px] w-full flex items-center justify-between px-3 sm:px-4 gap-2 select-none relative"
      style={{
        zIndex: 900,
        background: "linear-gradient(180deg, #3c1675 0%, #260c4f 100%)",
        borderBottom: "3px solid #120624",
        boxShadow: "inset 0 2px 0 #7c3aed, 0 3px 0 rgba(0,0,0,0.45)",
      }}
    >
      {/* Left: Command Block Menu + Quick Arcade App Bar */}
      <div className="flex items-center h-full gap-1">
        <div ref={logoRef} className="relative h-full flex items-center mr-1.5">
          <button
            type="button"
            onClick={() => setLogoOpen((v) => !v)}
            className="flex items-center gap-2 px-2.5 py-1 border-2 border-[#7c30a4] bg-[#1b0938] hover:border-[#ffcf4d] transition-colors cursor-pointer"
          >
            <PixelCommandBlockIcon size={20} />
            <span className="mc-pixel-font font-bold text-xs tracking-wide text-[#ffffff]">
              luvalOS // ARCADE
            </span>
          </button>
          <AnimatePresence>
            {logoOpen && <LogoMenu onClose={() => setLogoOpen(false)} />}
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {[
            { id: "arcade-hub", label: "Arcade Hub", w: 940, h: 630 },
            { id: "minecraft", label: "Minecraft Web", w: 1020, h: 670 },
            { id: "creeper-sweeper", label: "CreeperSweeper", w: 720, h: 610 },
            { id: "redstone-snake", label: "Snake", w: 680, h: 620 },
            { id: "trash", label: "Papelera", w: 680, h: 540 },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => openApp(btn.id, btn.label, btn.w, btn.h)}
              className="px-2.5 py-1 mc-pixel-font text-[11px] font-semibold text-[#e9d8ff] hover:text-[#ffe694] hover:bg-white/[0.08] border border-transparent hover:border-[#6b3fa0] transition-colors cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Return to Portfolio, Window Counter, Status Pill & Clock */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="px-3 py-1 bg-[#1b6131] border-2 border-[#2ee86c] text-[#ffffff] mc-pixel-font text-[10px] font-bold hover:brightness-110 transition-all"
        >
          ← VOLVER AL PORTAFOLIO
        </Link>

        <TabCounter />

        <div className="hidden xl:flex items-center gap-1.5 px-2 py-0.5 bg-[#160a29] border border-[#4f2d80]">
          <PixelServerBarsIcon size={16} />
          <Image
            src="/luval-avatar.png"
            alt="luvaldev"
            width={18}
            height={18}
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className="w-[18px] h-[18px] object-contain"
          />
          <span className="mc-pixel-font text-[9px] text-[#2ee86c]">PC MODE</span>
        </div>

        <div ref={clockRef} className="relative">
          <button
            type="button"
            onClick={() => setClockOpen((v) => !v)}
            className="mc-pixel-font text-[11px] font-bold text-[#ffe694] tabular-nums px-2 py-1 border border-[#4f2d80] bg-[#160a29] hover:border-[#ffcf4d] transition-colors cursor-pointer"
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
  )
}
