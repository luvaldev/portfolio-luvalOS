"use client"

import React, { useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { useOSStore } from "@/store/useOSStore"
import { PixelCloseIcon, PixelCommandBlockIcon } from "@/components/icons/PixelIcons"

export default function Window({ id }: { id: string }) {
  const windowData = useOSStore((state) => state.windows[id])
  const focusWindow = useOSStore((state) => state.focusWindow)
  const closeWindow = useOSStore((state) => state.closeWindow)
  const minimizeWindow = useOSStore((state) => state.minimizeWindow)
  const toggleMaximize = useOSStore((state) => state.toggleMaximize)
  const dragControls = useDragControls()

  const initialWidth = windowData?.width || 900
  const initialHeight = windowData?.height || 620
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight })

  const handleResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.w
    const startH = size.h

    const onPointerMove = (moveEvent: PointerEvent) => {
      setSize({
        w: Math.max(420, startW + (moveEvent.clientX - startX)),
        h: Math.max(320, startH + (moveEvent.clientY - startY)),
      })
    }

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }

  if (!windowData || !windowData.isOpen) return null

  const startDrag = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("[data-nodrag]")) return
    dragControls.start(e)
  }

  return (
    <motion.div
      drag={!windowData.isMaximized && !windowData.isMinimized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{
        x: 16,
        y: 54,
        width: 64,
        height: 64,
        opacity: 0.7,
      }}
      animate={{
        x: windowData.isMaximized ? 0 : windowData.x,
        y: windowData.isMinimized
          ? windowData.y + 60
          : windowData.isMaximized
            ? 46
            : windowData.y,
        width: windowData.isMaximized ? "100vw" : size.w,
        height: windowData.isMaximized ? "calc(100vh - 46px)" : size.h,
        opacity: windowData.isMinimized ? 0 : 1,
        scale: windowData.isMinimized ? 0.9 : 1,
      }}
      exit={{
        scale: 0.94,
        opacity: 0,
        transition: { duration: 0.14, ease: "easeIn" },
      }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 32,
        mass: 0.85,
      }}
      onPointerDown={() => !windowData.isMinimized && focusWindow(id)}
      style={{
        zIndex: windowData.zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: windowData.isMinimized ? "none" : "auto",
        boxShadow: windowData.isFocused
          ? "inset 2px 2px 0 #7a52b3, inset -2px -2px 0 #261642, 0 22px 54px rgba(0,0,0,0.72)"
          : "inset 2px 2px 0 #4d3573, inset -2px -2px 0 #1a102b, 0 10px 28px rgba(0,0,0,0.5)",
      }}
      className="flex flex-col overflow-hidden bg-[#130d21] border-4 border-[#090512]"
    >
      {/* Minecraft Command Copper / Obsidian Titlebar */}
      <div
        className="flex-shrink-0 h-[42px] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none"
        style={{
          background: windowData.isFocused
            ? "linear-gradient(180deg, #9c562c 0%, #6b3617 100%)"
            : "linear-gradient(180deg, #4b3169 0%, #2d1c42 100%)",
          borderBottom: "3px solid #0b0614",
          boxShadow: "inset 0 2px 0 rgba(255, 224, 178, 0.32)",
        }}
        onPointerDown={startDrag}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 grid place-items-center bg-[#180d07] border border-[#0a0502] shrink-0">
            <PixelCommandBlockIcon size={16} />
          </div>
          <span className="mc-pixel-font text-xs sm:text-[13px] font-bold text-[#ffe9c2] truncate">
            {windowData.title}
          </span>
        </div>

        {/* Pixel Controls */}
        <div data-nodrag className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => minimizeWindow(id)}
            title="Minimizar"
            className="w-7 h-7 flex items-center justify-center bg-[#1c132e] border-2 border-[#0c0717] text-[#ffe694] hover:border-[#ffcf4d] transition-colors cursor-pointer"
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges">
              <rect x="3" y="10" width="10" height="2" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => toggleMaximize(id)}
            title={windowData.isMaximized ? "Restaurar" : "Maximizar"}
            className="w-7 h-7 flex items-center justify-center bg-[#1c132e] border-2 border-[#0c0717] text-[#52ffd5] hover:border-[#2ee86c] transition-colors cursor-pointer"
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
              <rect x="3" y="3" width="10" height="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => closeWindow(id)}
            title="Cerrar (Shift+W)"
            className="w-7 h-7 flex items-center justify-center bg-[#7a1919] border-2 border-[#260606] text-[#ffffff] hover:bg-[#a82424] transition-colors cursor-pointer"
          >
            <PixelCloseIcon size={12} />
          </button>
        </div>
      </div>

      {/* Window Content Viewport */}
      <div className="flex-1 overflow-y-auto bg-[#110b1d] p-3 sm:p-4 text-[#f3edff] relative">
        {windowData.content || (
          <div className="flex flex-col items-center justify-center h-full text-center text-[#9d90bd]">
            <p className="mc-pixel-font text-xs">CARGANDO MÓDULO...</p>
          </div>
        )}
      </div>

      {/* Pixel Resize Handle */}
      {!windowData.isMaximized && (
        <div
          onPointerDown={handleResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 opacity-60 hover:opacity-100 text-[#ffe694]"
          title="Redimensionar ventana"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges">
            <rect x="11" y="11" width="3" height="3" />
            <rect x="7" y="11" width="3" height="3" />
            <rect x="11" y="7" width="3" height="3" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
