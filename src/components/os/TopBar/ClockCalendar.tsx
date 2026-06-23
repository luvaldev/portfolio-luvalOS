"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOSStore } from "@/store/useOSStore"
import * as WindowContent from "../WindowContent"

// ─── Clock + Calendar ─────────────────────────────────────────────────────────
export default function ClockMenu({ time, onClose }: { time: string; onClose: () => void }) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()

  const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  const DAYS_ES = ["Lu","Ma","Mi","Ju","Vi","Sa","Do"]

  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const firstMon = (firstDay + 6) % 7 // convert to Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstMon; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      className="absolute top-[44px] right-0 z-[950] bg-[var(--color-menu-bg)] backdrop-blur-md border border-[var(--color-border-medium)] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] p-4 overflow-hidden"
      style={{ minWidth: 260 }}
    >
      {/* Big time display */}
      <div className="text-center mb-4">
        <div className="text-4xl font-black text-[var(--color-text-main)] font-mono tabular-nums tracking-tight">
          {time}
        </div>
        <div className="text-[12px] text-[var(--color-text-muted)] mt-1 font-medium">
          {now.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Calendar */}
      <div className="border-t border-[var(--color-border-subtle)] pt-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-bold text-[var(--color-text-main)] uppercase tracking-wide">
            {MONTHS_ES[month]} {year}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAYS_ES.map(d => (
            <div key={d} className="text-[10px] font-bold text-[var(--color-text-muted)] text-center py-0.5">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`text-[12px] text-center py-1 rounded-md font-medium ${
                day === today
                  ? "bg-[var(--color-accent)] text-white font-bold"
                  : day
                  ? "text-[var(--color-text-main)] hover:bg-[var(--color-hover-bg)] cursor-default"
                  : ""
              }`}
            >
              {day ?? ""}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}