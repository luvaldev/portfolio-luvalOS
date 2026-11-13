"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import TopBar from "./TopBar"
import BottomDock from "./Dock/SideDock"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"
import AuroraBackground from "./AuroraBackground"
import { useOSStore } from "@/store/useOSStore"

const LEFT_ICONS = [
  { id: "arcade-hub", title: "Centro Arcade", y: 0 },
  { id: "minecraft", title: "Minecraft Web", y: 102 },
  { id: "creeper-sweeper", title: "CreeperSweeper", y: 204 },
  { id: "redstone-snake", title: "Redstone Snake", y: 306 },
  { id: "nether-invaders", title: "Nether Invaders", y: 408 },
]

const RIGHT_ICONS = [
  { id: "memory-enchants", title: "Memoria Arcana", y: 0 },
  { id: "trash", title: "Papelera", y: 102 },
]

export default function DesktopEnvironment() {
  const { windows, openWindow, closeWindow } = useOSStore()
  const [contents, setContents] = useState<Record<string, React.ReactNode>>({})
  const desktopRef = useRef<HTMLDivElement>(null)
  const openedInitial = useRef(false)

  useEffect(() => {
    import("./WindowContent").then((mod) => {
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

  // Auto-open Arcade Hub on first boot of /os
  useEffect(() => {
    const hub = contents["arcade-hub"]
    if (!hub || openedInitial.current) return
    openedInitial.current = true
    const t = setTimeout(() => {
      openWindow("arcade-hub", {
        title: "Centro Arcade · luvalOS",
        icon: "🎮",
        content: hub,
        x: 165,
        y: 58,
        width: 920,
        height: 615,
      })
    }, 180)
    return () => clearTimeout(t)
  }, [contents, openWindow])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return

      if (e.shiftKey && e.key === "W") {
        e.preventDefault()
        const state = useOSStore.getState()
        if (state.focusedWindowId) {
          closeWindow(state.focusedWindowId)
        }
      }

      if (e.shiftKey && e.key === "X") {
        e.preventDefault()
        const state = useOSStore.getState()
        Object.keys(state.windows).forEach((id) => state.closeWindow(id))
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [closeWindow])

  return (
    <div
      id="desktop-root"
      ref={desktopRef}
      className="relative w-full h-full overflow-hidden select-none bg-[#0c0717]"
    >
      <AuroraBackground />

      <TopBar />

      {/* Left column arcade shortcuts */}
      {LEFT_ICONS.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          x={14}
          y={58 + icon.y}
          content={contents[icon.id]}
          desktopRef={desktopRef}
        />
      ))}

      {/* Right column memory + trash */}
      {RIGHT_ICONS.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          right={14}
          y={58 + icon.y}
          content={contents[icon.id]}
          desktopRef={desktopRef}
        />
      ))}

      {/* Active Arcade & Trash Windows */}
      <AnimatePresence>
        {Object.keys(windows).map((id) => (
          <Window key={id} id={id} />
        ))}
      </AnimatePresence>

      <BottomDock />
    </div>
  )
}
