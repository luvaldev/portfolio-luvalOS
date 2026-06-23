"use client"
import React, { useState } from "react"

// ─── Site Info (mini modal) ───────────────────────────────────────────────────
export function SiteInfoContent() {
  return (
    <div className="py-4 px-2 max-w-sm mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F9BD2B] to-[#E8601A] flex items-center justify-center text-white text-2xl font-black shadow-lg mx-auto mb-4">L</div>
      <h1 className="text-xl font-black text-[var(--color-text-main)] mb-1">luvalOS</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-5">Portfolio interactivo estilo sistema operativo</p>
      <div className="space-y-2 text-left">
        {[
          { label: "Framework", value: "Next.js 16 + TypeScript" },
          { label: "Estilos", value: "TailwindCSS v4" },
          { label: "Animaciones", value: "Framer Motion" },
          { label: "Estado", value: "Zustand" },
          { label: "Runtime", value: "Bun" },
          { label: "Versión", value: "1.0.0" },
        ].map(item => (
          <div key={item.label} className="flex justify-between text-[13px]">
            <span className="text-[var(--color-text-muted)] font-medium">{item.label}</span>
            <span className="text-[var(--color-text-main)] font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
