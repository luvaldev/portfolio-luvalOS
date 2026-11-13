"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import {
  PixelBookSprite,
  PixelCommandBlockIcon,
  PixelGrassBlockIcon,
  PixelRedstoneRepeaterIcon,
  PixelSwordCodeIcon,
  PixelTntBlockIcon,
} from "@/components/icons/PixelIcons"

function PixelTrashSVG() {
  return (
    <svg viewBox="0 0 16 16" width={40} height={40} fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="1" width="8" height="2" fill="#464b5c" />
      <rect x="6" y="1" width="4" height="1" fill="#8b94a6" />
      <rect x="2" y="3" width="12" height="2" fill="#6b7280" />
      <rect x="3" y="5" width="10" height="10" fill="#374151" />
      <rect x="4" y="5" width="8" height="9" fill="#4b5563" />
      <rect x="5" y="7" width="1" height="5" fill="#9ca3af" />
      <rect x="7" y="7" width="2" height="5" fill="#9ca3af" />
      <rect x="10" y="7" width="1" height="5" fill="#9ca3af" />
      <rect x="4" y="13" width="8" height="1" fill="#ff7315" />
    </svg>
  )
}

const ARCADE_ICON_MAP: Record<string, { badgeBg: string; render: () => React.ReactNode }> = {
  "arcade-hub": {
    badgeBg: "#251442",
    render: () => <PixelCommandBlockIcon size={38} />,
  },
  minecraft: {
    badgeBg: "#1b3818",
    render: () => <PixelGrassBlockIcon size={38} />,
  },
  "creeper-sweeper": {
    badgeBg: "#3d1212",
    render: () => <PixelTntBlockIcon size={38} />,
  },
  "redstone-snake": {
    badgeBg: "#38121d",
    render: () => <PixelRedstoneRepeaterIcon size={38} />,
  },
  "nether-invaders": {
    badgeBg: "#162642",
    render: () => <PixelSwordCodeIcon size={38} />,
  },
  "memory-enchants": {
    badgeBg: "#2e1642",
    render: () => <PixelBookSprite size={38} />,
  },
  trash: {
    badgeBg: "#222530",
    render: () => <PixelTrashSVG />,
  },
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

  const isOpen = !!(windows[id] && !windows[id].isMinimized)
  const iconEntry = ARCADE_ICON_MAP[id] ?? ARCADE_ICON_MAP["arcade-hub"]

  const handleOpen = () => {
    if (wasDragged.current) return
    const dimensions: Record<string, { w: number; h: number }> = {
      "arcade-hub": { w: 940, h: 630 },
      minecraft: { w: 1020, h: 670 },
      "creeper-sweeper": { w: 720, h: 610 },
      "redstone-snake": { w: 680, h: 620 },
      "nether-invaders": { w: 740, h: 620 },
      "memory-enchants": { w: 660, h: 590 },
      trash: { w: 680, h: 540 },
    }
    const size = dimensions[id] ?? { w: 860, h: 610 }
    openWindow(id, {
      title,
      icon: "🎮",
      content: content ?? contents[id],
      x: 130 + Math.random() * 55,
      y: 56 + Math.random() * 26,
      width: size.w,
      height: size.h,
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
      className="absolute flex flex-col items-center gap-1.5 px-1.5 pt-2 pb-1.5 cursor-grab active:cursor-grabbing group select-none"
      style={{
        left: x !== undefined ? x : undefined,
        right: right !== undefined ? right : undefined,
        top: y,
        width: 96,
      }}
      onDoubleClick={handleOpen}
      onClick={() => {
        if (wasDragged.current) return
        handleOpen()
      }}
    >
      <div
        className="w-14 h-14 relative flex items-center justify-center border-3 border-[#0c0717] shadow-[3px_3px_0_#06030c] group-hover:-translate-y-0.5 group-hover:border-[#ffcf4d] transition-all"
        style={{ background: iconEntry.badgeBg }}
      >
        {iconEntry.render()}
      </div>

      <span
        className={`mc-pixel-font text-[10px] text-center leading-tight px-1.5 py-0.5 border max-w-full break-words ${
          isOpen
            ? "bg-[#2e1b52] border-[#ffcf4d] text-[#ffe694]"
            : "bg-[#120b22]/90 border-[#342357] text-[#f4edff] group-hover:border-[#9e66f2]"
        }`}
      >
        {title}
      </span>
    </motion.div>
  )
}
