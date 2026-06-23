"use client"
import { useTheme } from "next-themes";
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOSStore } from "@/store/useOSStore"
import * as WindowContent from "../WindowContent"
import { Kbd } from "./Utils";

// ─── Logo "Apple menu" ────────────────────────────────────────────────────────
export default function LogoMenu({ onClose }: { onClose: () => void }) {
  const { windows } = useOSStore()
  const { theme, setTheme } = useTheme()
  const allIds = Object.keys(windows)
  const { openWindow } = useOSStore()

  const closeAll = () => {
    const store = useOSStore.getState()
    allIds.forEach(id => store.closeWindow(id))
    onClose()
  }

  const openAbout = () => {
    onClose()
    import("../WindowContent").then(mod => {
      openWindow("about", {
        title: "about.mdx",
        icon: "📄",
        content: React.createElement(mod.AboutContent),
        x: 160, y: 56, width: 960, height: 650,
      })
    })
  }

  const openSiteInfo = () => {
    onClose()
    import("../WindowContent").then(mod => {
      openWindow("siteinfo", {
        title: "Acerca de este sitio",
        icon: "ℹ️",
        content: React.createElement(mod.SiteInfoContent),
        x: 200, y: 80, width: 520, height: 400,
      })
    })
  }

  const items = [
    { label: "Acerca de luvalOS", action: openAbout },
    { label: "Acerca de este sitio", action: openSiteInfo },
    { separator: true },
    { label: theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro", action: () => { setTheme(theme === "dark" ? "light" : "dark"); onClose() } },
    { separator: true },
    { label: "Cerrar todas las ventanas", shortcut: ["Shift", "X"], action: closeAll, disabled: allIds.length === 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      className="absolute top-[44px] left-0 z-[950] min-w-[260px] bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] py-1.5 overflow-hidden"
    >
      {items.map((item: any, idx) => {
        if (item.separator) {
          return <div key={idx} className="my-1.5 border-t border-[var(--color-border-subtle)]"/>
        }
        return (
          <button
            key={idx}
            disabled={item.disabled}
            onClick={() => { item.action?.() }}
            className={`w-full flex items-center justify-between px-4 py-2 text-[13.5px] font-medium transition-colors ${
              item.disabled
                ? "text-[var(--color-text-muted)] opacity-40 cursor-not-allowed"
                : "text-[var(--color-text-main)] hover:bg-[var(--color-hover-bg)] cursor-pointer"
            }`}
          >
            <span>{item.label}</span>
            {item.shortcut && <Kbd keys={item.shortcut}/>}
          </button>
        )
      })}
    </motion.div>
  )
}