"use client"

import React, { useMemo } from "react"

export default function AuroraBackground() {
  // Generate random star coordinates once
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      size: `${Math.random() * 1.5 + 1}px`
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Blobs */}
      <div className="absolute inset-0 mix-blend-normal dark:mix-blend-screen opacity-70">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[100px] bg-[var(--color-aurora-1)] animate-aurora-1 will-change-transform" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[60%] rounded-full blur-[100px] bg-[var(--color-aurora-2)] animate-aurora-2 will-change-transform" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full blur-[100px] bg-[var(--color-aurora-3)] animate-aurora-3 will-change-transform" />
      </div>

      {/* Twinkling Stars (Only visible in Dark Mode for realism) */}
      <div className="absolute inset-0 hidden dark:block opacity-60">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Subtle Dot Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-aurora" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-black/[0.08] dark:text-white/[0.08]"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-aurora)"/>
      </svg>
    </div>
  )
}
