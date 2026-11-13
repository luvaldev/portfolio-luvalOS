"use client"

import React, { useMemo } from "react"

export default function AuroraBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        left: `${((i * 37 + 11) % 97) + 1}%`,
        top: `${((i * 23 + 7) % 58) + 2}%`,
        size: i % 5 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
        delay: `${(i % 7) * 0.65}s`,
        duration: `${2.2 + (i % 4) * 0.7}s`,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Night-sky Overworld / Command Station gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0b071a 0%, #170e33 44%, #1f1442 68%, #100b1e 100%)",
        }}
      />

      {/* Crisp pixel moon (zero blur) */}
      <div
        className="absolute top-[74px] right-[9%] w-16 h-16 border-4 border-[#d6c9ff]/30 bg-[#f6f1cf]"
        style={{
          boxShadow:
            "inset -6px -6px 0 #d9cf9c, inset 4px 4px 0 #ffffff, 0 0 0 8px rgba(173, 138, 255, 0.08)",
        }}
      >
        <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-[#dfd5a4]" />
        <div className="absolute bottom-3 right-3 w-3 h-3 bg-[#d5c88e]" />
      </div>

      {/* Pixel Stars */}
      <div className="absolute inset-0">
        {stars.map((s, idx) => (
          <div
            key={idx}
            className="absolute bg-[#fff8dc] animate-twinkle"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Pixel Horizon: Voxel Citadel & Overworld Silhouettes */}
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-[290px]"
        viewBox="0 0 1280 290"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        {/* Distant Amethyst Mountain Ridge */}
        <path
          d="M0 290V170h80v-28h72v-24h88v24h92v-36h96v-24h84v32h110v28h92v-42h96v-20h102v28h88v20h96v-26h104v34h80V290z"
          fill="#1b1238"
        />
        {/* Command Citadel Silhouettes & Glowing Windows */}
        <path
          d="M0 290V212h120v-30h64v30h140v-44h48v-28h56v28h52v44h180v-24h90v24h160v-52h52v-24h64v24h56v52h198V290z"
          fill="#110b24"
        />
        {/* Glowing Command Block / Lantern Windows */}
        <rect x="148" y="196" width="8" height="8" fill="#52ffd5" opacity="0.85" />
        <rect x="346" y="156" width="10" height="10" fill="#ffcf4d" opacity="0.9" />
        <rect x="382" y="156" width="10" height="10" fill="#ffcf4d" opacity="0.85" />
        <rect x="364" y="176" width="10" height="10" fill="#52ffd5" opacity="0.8" />
        <rect x="942" y="152" width="10" height="10" fill="#d975ff" opacity="0.85" />
        <rect x="972" y="152" width="10" height="10" fill="#ffcf4d" opacity="0.85" />
        <rect x="957" y="174" width="10" height="10" fill="#52ffd5" opacity="0.85" />
        {/* Deep Grass / Obsidian Bedrock Floor */}
        <rect x="0" y="250" width="1280" height="8" fill="#2e7328" />
        <rect x="0" y="258" width="1280" height="32" fill="#18121f" />
      </svg>

      {/* Subtle Pixel Block Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mc-os-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="#805ad5" strokeWidth="1" strokeOpacity="0.24" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mc-os-grid)" />
      </svg>
    </div>
  )
}
