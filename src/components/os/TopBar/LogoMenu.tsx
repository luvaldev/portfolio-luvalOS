"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import { Kbd } from "./Utils"

export default function LogoMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const { windows, openWindow, focusWindow } = useOSStore()
  const allIds = Object.keys(windows)

  const closeAll = () => {
    const store = useOSStore.getState()
    allIds.forEach((id) => store.closeWindow(id))
    onClose()
  }

  const openArcadeWindow = (id: string, title: string, width = 940, height = 630) => {
    onClose()
    if (windows[id]) {
      focusWindow(id)
      return
    }
    import("../WindowContent").then((mod) => {
      const map: Record<string, React.ComponentType> = {
        "arcade-hub": mod.ArcadeHubContent,
        minecraft: mod.MinecraftWebContent,
        trash: mod.TrashContent,
      }
      const Comp = map[id]
      openWindow(id, {
        title,
        icon: "🎮",
        content: Comp ? React.createElement(Comp) : undefined,
        x: 150,
        y: 58,
        width,
        height,
      })
    })
  }

  const items: Array<
    | { separator: true }
    | { label: string; action: () => void; shortcut?: string[]; disabled?: boolean }
  > = [
    {
      label: "Abrir Centro Arcade",
      action: () => openArcadeWindow("arcade-hub", "Centro Arcade · luvalOS", 940, 630),
    },
    {
      label: "Jugar Minecraft Web",
      action: () => openArcadeWindow("minecraft", "Minecraft Web · Eaglercraft", 1020, 670),
    },
    {
      label: "Abrir Papelera",
      action: () => openArcadeWindow("trash", "Papelera", 680, 540),
    },
    { separator: true },
    {
      label: "Cerrar todas las ventanas",
      shortcut: ["Shift", "X"],
      action: closeAll,
      disabled: allIds.length === 0,
    },
    {
      label: "Volver al Portafolio Principal",
      action: () => {
        onClose()
        router.push("/")
      },
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="absolute top-[42px] left-0 z-[950] min-w-[270px] bg-[#150d26] border-3 border-[#0c0717] shadow-[4px_4px_0_#07040d,inset_2px_2px_0_#6b3fa0] py-1.5 overflow-hidden"
    >
      {items.map((item, idx) => {
        if ("separator" in item) {
          return <div key={idx} className="my-1.5 border-t-2 border-[#2d1e4a]" />
        }
        return (
          <button
            key={idx}
            type="button"
            disabled={item.disabled}
            onClick={() => item.action()}
            className={`w-full flex items-center justify-between px-4 py-2 text-xs mc-pixel-font font-semibold transition-colors ${
              item.disabled
                ? "text-[#7a6b99] opacity-45 cursor-not-allowed"
                : "text-[#f4edff] hover:bg-[#2a1a4a] hover:text-[#ffe694] cursor-pointer"
            }`}
          >
            <span>{item.label}</span>
            {item.shortcut && <Kbd keys={item.shortcut} />}
          </button>
        )
      })}
    </motion.div>
  )
}
