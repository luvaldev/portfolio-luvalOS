import type { ReactNode } from "react"
import type { IconProps } from "./IconProps"

export function PixelCornerFiligree({ size = 18, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* 3x3 lattice filigree matching the TIER 4 banner corners */}
      <rect x="0" y="0" width="12" height="2" />
      <rect x="0" y="0" width="2" height="12" />
      <rect x="4" y="2" width="2" height="8" />
      <rect x="2" y="4" width="8" height="2" />
      <rect x="8" y="2" width="2" height="4" />
      <rect x="2" y="8" width="4" height="2" />
    </svg>
  )
}

export function PixelScrollIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Crisp integer pixel-art CV credential sheet */}
      <rect x="2" y="1" width="10" height="14" fill="#14062e" />
      <rect x="12" y="3" width="2" height="12" fill="#14062e" />
      <rect x="11" y="2" width="2" height="2" fill="#14062e" />
      {/* Cream parchment body */}
      <rect x="3" y="2" width="7" height="12" fill="#ffe6b2" />
      <rect x="10" y="4" width="3" height="10" fill="#ffe6b2" />
      {/* Top & right pixel bevel */}
      <rect x="3" y="2" width="7" height="1" fill="#fff6d6" />
      <rect x="3" y="13" width="10" height="1" fill="#d98a2b" />
      <rect x="12" y="4" width="1" height="9" fill="#f5c056" />
      {/* Folded top-right corner */}
      <rect x="10" y="2" width="1" height="2" fill="#d98a2b" />
      <rect x="10" y="3" width="2" height="1" fill="#ffcf4d" />
      {/* Golden header bar & crisp text lines */}
      <rect x="4" y="4" width="5" height="2" fill="#ffcf4d" />
      <rect x="4" y="5" width="5" height="1" fill="#d98a2b" />
      <rect x="4" y="8" width="7" height="1" fill="#5c1b9e" />
      <rect x="4" y="10" width="7" height="1" fill="#5c1b9e" />
      <rect x="4" y="12" width="5" height="1" fill="#8b42cc" />
    </svg>
  )
}

export function PixelCopyIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d="M2 2h8v3H8V4H4v6h1v2H2V2Zm4 4h8v8H6V6Zm2 2v4h4V8H8Z" />
    </svg>
  )
}

export function PixelCheckIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d="M13 3h2v2h-2v2h-2v2H9v2H7v2H5v-2H3V9H1V7h2v2h2v2h2V9h2V7h2V5h2V3Z" />
    </svg>
  )
}

export function PixelDiamondIcon({ size = 24, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 2h6v1h2v2h1v4h-1v2h-2v2H9v1H7v-1H5v-2H3V9H2V5h1V3h2V2Z" fill="#0d1726" />
      <rect x="5" y="3" width="6" height="2" fill="#aef9ff" />
      <rect x="4" y="5" width="8" height="4" fill="#3be0ff" />
      <rect x="5" y="9" width="6" height="2" fill="#18a5d8" />
      <rect x="7" y="11" width="2" height="2" fill="#0f70a6" />
      <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
    </svg>
  )
}

export function PixelShieldIcon({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M3 2h10v7h-1v3h-2v2H9v1H7v-1H6v-2H4V9H3V2Z" fill="#140c1c" />
      <rect x="4" y="3" width="8" height="6" fill="#2ee86c" />
      <rect x="5" y="9" width="6" height="2" fill="#19b853" />
      <rect x="6" y="11" width="4" height="2" fill="#12873d" />
      <rect x="7" y="13" width="2" height="1" fill="#0e612c" />
      <rect x="5" y="4" width="2" height="4" fill="#9dffbc" />
      <rect x="7" y="5" width="2" height="4" fill="#e6fff0" />
    </svg>
  )
}

export function PixelRadarIcon({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2Z" fill="#140c1c" />
      <rect x="4" y="4" width="8" height="8" fill="#114d3b" />
      <rect x="5" y="3" width="6" height="1" fill="#32cf8e" />
      <rect x="5" y="12" width="6" height="1" fill="#1e8f61" />
      <rect x="7" y="5" width="2" height="6" fill="#2ee86c" />
      <rect x="5" y="7" width="6" height="2" fill="#2ee86c" />
      <rect x="10" y="5" width="2" height="2" fill="#d4ff33" />
      <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
    </svg>
  )
}

export function PixelKeyIcon({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 5h6v2h6v3h-1v3h-2v-2H9v-1H8v2H2V5Z" fill="#140c1c" />
      <rect x="3" y="6" width="4" height="4" fill="#ffcf4d" />
      <rect x="4" y="7" width="2" height="2" fill="#140c1c" />
      <rect x="7" y="7" width="6" height="2" fill="#ffb526" />
      <rect x="11" y="9" width="2" height="2" fill="#d97b16" />
      <rect x="3" y="6" width="2" height="1" fill="#fff2ad" />
    </svg>
  )
}

export function PixelBookSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M3 2h10v11h-1v1H3V2Z" fill="#140c1c" />
      <rect x="4" y="3" width="8" height="8" fill="#7c30a4" />
      <rect x="4" y="3" width="2" height="9" fill="#4f1875" />
      <rect x="6" y="4" width="5" height="2" fill="#ff4ed4" />
      <rect x="8" y="6" width="2" height="6" fill="#ff3dc8" />
      <rect x="7" y="6" width="4" height="2" fill="#ffbe4d" />
      <rect x="5" y="11" width="7" height="2" fill="#ebe0cc" />
      <rect x="6" y="12" width="2" height="2" fill="#eb21b3" />
    </svg>
  )
}

export function PixelCubeSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M6 1h4v1h3v2h1v8h-1v2h-3v1H6v-1H3v-2H2V4h1V2h3V1Z" fill="#140c1c" />
      <rect x="4" y="3" width="8" height="4" fill="#df96ff" />
      <rect x="3" y="5" width="5" height="7" fill="#9352f5" />
      <rect x="8" y="5" width="5" height="7" fill="#5e21a8" />
      <rect x="6" y="2" width="4" height="2" fill="#f6dbff" />
      <rect x="7" y="6" width="2" height="7" fill="#3a126e" />
    </svg>
  )
}

export function PixelChestSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 3h12v10H2V3Z" fill="#140c1c" />
      <rect x="3" y="4" width="10" height="3" fill="#b86b2b" />
      <rect x="3" y="7" width="10" height="5" fill="#8f4c19" />
      <rect x="3" y="6" width="10" height="1" fill="#3a200d" />
      <rect x="7" y="6" width="2" height="3" fill="#ffe694" />
      <rect x="4" y="4" width="3" height="1" fill="#e09853" />
    </svg>
  )
}

export function PixelChipSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 1h2v2h2V1h2v2h2v2h2v2h-2v2h2v2h-2v2h-2v2H9v-2H7v2H5v-2H3v-2H1V9h2V7H1V5h2V3h2V1Z" fill="#140c1c" />
      <rect x="5" y="2" width="1" height="1" fill="#ffcf4d" />
      <rect x="10" y="2" width="1" height="1" fill="#ffcf4d" />
      <rect x="5" y="13" width="1" height="1" fill="#ffcf4d" />
      <rect x="10" y="13" width="1" height="1" fill="#ffcf4d" />
      <rect x="4" y="4" width="8" height="8" fill="#3a3f4d" />
      <rect x="5" y="5" width="6" height="6" fill="#2ee86c" />
      <rect x="6" y="6" width="4" height="4" fill="#d4ff33" />
    </svg>
  )
}

export function PixelAnvilSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M1 4h14v4h-3v2h1v3H3v-3h1V8H2V7H1V4Z" fill="#140c1c" />
      <rect x="2" y="5" width="12" height="2" fill="#8b94a6" />
      <rect x="3" y="5" width="6" height="1" fill="#c7d0e0" />
      <rect x="5" y="7" width="6" height="3" fill="#596070" />
      <rect x="4" y="10" width="8" height="2" fill="#404654" />
    </svg>
  )
}

export function PixelHelmetSprite({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M4 2h8v2h2v8h-3v2H9v-3H7v3H5v-2H2V4h2V2Z" fill="#140c1c" />
      <rect x="5" y="3" width="6" height="2" fill="#ff744d" />
      <rect x="3" y="5" width="10" height="4" fill="#e83f39" />
      <rect x="3" y="9" width="3" height="3" fill="#b82320" />
      <rect x="10" y="9" width="3" height="3" fill="#b82320" />
      <rect x="6" y="5" width="4" height="2" fill="#ffe694" />
    </svg>
  )
}

export function PixelHeartIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 3h4v1h4V3h4v1h1v5h-1v2h-2v2h-2v1H6v-1H4v-2H2V9H1V4h1V3Z" fill="#140610" />
      <rect x="2" y="4" width="4" height="5" fill="#e61c24" />
      <rect x="10" y="4" width="4" height="5" fill="#e61c24" />
      <rect x="6" y="5" width="4" height="7" fill="#d4131c" />
      <rect x="4" y="9" width="8" height="2" fill="#b00c14" />
      <rect x="6" y="11" width="4" height="2" fill="#8f080f" />
      <rect x="7" y="13" width="2" height="1" fill="#700409" />
      <rect x="3" y="5" width="2" height="2" fill="#ffffff" />
      <rect x="10" y="5" width="2" height="1" fill="#ff7a80" />
    </svg>
  )
}

export function PixelArmorIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 2h4v2h4V2h4v5h-2v7H4V7H2V2Z" fill="#0d111a" />
      <rect x="3" y="3" width="2" height="3" fill="#c7d0e0" />
      <rect x="11" y="3" width="2" height="3" fill="#9ea8bd" />
      <rect x="5" y="5" width="6" height="8" fill="#8793ab" />
      <rect x="6" y="6" width="4" height="3" fill="#dce3f2" />
      <rect x="5" y="11" width="6" height="2" fill="#596378" />
    </svg>
  )
}

export function PixelEmeraldIcon({ size = 22, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 1h6v2h2v2h1v6h-1v2h-2v2H5v-2H3v-2H2V5h1V3h2V1Z" fill="#081f12" />
      <rect x="5" y="2" width="6" height="2" fill="#7dff9b" />
      <rect x="4" y="4" width="8" height="8" fill="#19c94e" />
      <rect x="5" y="5" width="6" height="6" fill="#42f575" />
      <rect x="6" y="6" width="4" height="4" fill="#109638" />
      <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
      <rect x="5" y="12" width="6" height="2" fill="#0b7028" />
    </svg>
  )
}

export function PixelTorchIcon({ size = 24, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="6" y="1" width="4" height="5" fill="#1a0d08" />
      <rect x="6" y="6" width="4" height="9" fill="#1a0d08" />
      <rect x="7" y="2" width="2" height="2" fill="#fff6a8" />
      <rect x="7" y="4" width="2" height="2" fill="#ff9f1c" />
      <rect x="6" y="3" width="1" height="2" fill="#ff6b1a" />
      <rect x="9" y="3" width="1" height="2" fill="#ff6b1a" />
      <rect x="7" y="6" width="2" height="8" fill="#8f5324" />
      <rect x="7" y="7" width="1" height="6" fill="#c47e3e" />
    </svg>
  )
}

export function PixelCraftingTableIcon({ size = 28, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#1c0d07" />
      {/* Top 3x3 crafting grid top face */}
      <rect x="2" y="2" width="12" height="5" fill="#9c5a2d" />
      <rect x="3" y="3" width="2" height="1" fill="#3a1c0c" />
      <rect x="7" y="3" width="2" height="1" fill="#3a1c0c" />
      <rect x="11" y="3" width="2" height="1" fill="#3a1c0c" />
      <rect x="3" y="5" width="2" height="1" fill="#3a1c0c" />
      <rect x="7" y="5" width="2" height="1" fill="#3a1c0c" />
      <rect x="11" y="5" width="2" height="1" fill="#3a1c0c" />
      {/* Front oak planks & hung tools */}
      <rect x="2" y="7" width="12" height="7" fill="#c78a4e" />
      <rect x="2" y="7" width="12" height="1" fill="#6b3b1b" />
      <rect x="4" y="9" width="3" height="4" fill="#8b94a6" />
      <rect x="5" y="10" width="1" height="3" fill="#522c14" />
      <rect x="10" y="9" width="2" height="4" fill="#596378" />
    </svg>
  )
}

export function PixelCommandBlockIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#170b1c" />
      <rect x="2" y="2" width="12" height="12" fill="#cc7a4b" />
      <rect x="3" y="3" width="10" height="10" fill="#a85c36" />
      <rect x="4" y="4" width="8" height="8" fill="#2d2738" />
      <rect x="5" y="5" width="2" height="2" fill="#2ee86c" />
      <rect x="9" y="5" width="2" height="2" fill="#2ce5d8" />
      <rect x="7" y="7" width="2" height="2" fill="#ffcf4d" />
      <rect x="5" y="9" width="2" height="2" fill="#df96ff" />
      <rect x="9" y="9" width="2" height="2" fill="#ff5e78" />
    </svg>
  )
}

export function PixelServerBarsIcon({ size = 22, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="9" width="3" height="5" fill="#0d2614" />
      <rect x="6" y="6" width="3" height="8" fill="#0d2614" />
      <rect x="10" y="2" width="4" height="12" fill="#0d2614" />
      <rect x="3" y="10" width="2" height="3" fill="#2ee86c" />
      <rect x="7" y="7" width="2" height="6" fill="#2ee86c" />
      <rect x="11" y="3" width="2" height="10" fill="#42ff85" />
    </svg>
  )
}

export function PixelXpOrbIcon({ size = 22, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2Z" fill="#0d2409" />
      <rect x="4" y="4" width="8" height="8" fill="#70f527" />
      <rect x="5" y="3" width="6" height="2" fill="#d4ff33" />
      <rect x="6" y="5" width="4" height="4" fill="#d4ff33" />
      <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
      <rect x="5" y="11" width="6" height="2" fill="#2fb814" />
    </svg>
  )
}

export function PixelTargetIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#1c110c" />
      <rect x="2" y="2" width="12" height="12" fill="#f0d9b5" />
      <rect x="4" y="4" width="8" height="8" fill="#cf2d27" />
      <rect x="6" y="6" width="4" height="4" fill="#f0d9b5" />
      <rect x="7" y="7" width="2" height="2" fill="#cf2d27" />
    </svg>
  )
}

export function PixelSwordCodeIcon({ size = 36, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M10 1h5v5h-2v2h-2v2H9v1H8v2H6v-1H5v2H2v-3h2v-1H3V8h2V7h1V5h2V3h2V1Z" fill="#0d1726" />
      <rect x="11" y="2" width="3" height="3" fill="#aef9ff" />
      <rect x="9" y="4" width="3" height="3" fill="#3be0ff" />
      <rect x="7" y="6" width="3" height="3" fill="#3be0ff" />
      <rect x="4" y="7" width="5" height="2" fill="#ffcf4d" />
      <rect x="7" y="9" width="2" height="3" fill="#ffcf4d" />
      <rect x="3" y="11" width="3" height="3" fill="#8f5324" />
    </svg>
  )
}

export function PixelArrowUpRightIcon({ size = 18, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 3h8v8h-2V7H9v2H7v2H5v2H3v-2h2V9h2V7h2V5H5V3Z" />
    </svg>
  )
}

export function PixelCloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M3 3h2v2h2v2h2V5h2V3h2v2h-2v2H9v2h2v2h2v2h-2v-2H9V9H7v2H5v2H3v-2h2V9h2V7H5V5H3V3Z" />
    </svg>
  )
}

export function PixelSearchIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M4 2h5v2H4V2Zm-2 2h2v5H2V4Zm7 0h2v5H9V4ZM4 9h5v2H4V9Zm5 2h2v2H9v-2Zm2 2h3v2h-3v-2Z" />
    </svg>
  )
}

export function PixelExternalLinkIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M9 2h5v5h-2V5h-2v2H8v2H6V7h2V5h2V4H9V2ZM2 4h5v2H4v6h6V9h2v5H2V4Z" />
    </svg>
  )
}

export function PixelEnderChestIcon({ size = 38, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" fill="#090710" />
      <rect x="3" y="3" width="10" height="4" fill="#183838" />
      <rect x="3" y="7" width="10" height="6" fill="#10292b" />
      <rect x="3" y="6" width="10" height="1" fill="#071012" />
      <rect x="4" y="3" width="3" height="1" fill="#2c635f" />
      <rect x="10" y="9" width="2" height="2" fill="#285957" />
      {/* Gold clasp & Ender eye core */}
      <rect x="7" y="5" width="2" height="3" fill="#ffe694" />
      <rect x="6" y="9" width="4" height="2" fill="#5cffc9" />
      <rect x="7" y="9" width="2" height="2" fill="#136b53" />
    </svg>
  )
}

export function PixelRedstoneRepeaterIcon({ size = 38, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="9" width="14" height="5" fill="#12141c" />
      <rect x="2" y="10" width="12" height="3" fill="#8b94a6" />
      <rect x="2" y="10" width="12" height="1" fill="#c7d0e0" />
      <rect x="3" y="11" width="10" height="1" fill="#e61c24" />
      {/* Left & Right Redstone Torches */}
      <rect x="3" y="4" width="3" height="7" fill="#1c080a" />
      <rect x="4" y="4" width="1" height="2" fill="#fff2b2" />
      <rect x="4" y="6" width="1" height="4" fill="#ff2e38" />
      <rect x="10" y="5" width="3" height="6" fill="#1c080a" />
      <rect x="11" y="5" width="1" height="2" fill="#fff2b2" />
      <rect x="11" y="7" width="1" height="3" fill="#ff2e38" />
    </svg>
  )
}

interface TechBadgeConfig {
  bg: string
  hi: string
  lo: string
  art: ReactNode
}

const TECH_BADGE_MAP: Record<string, TechBadgeConfig> = {
  // TypeScript: Lapis blue block with pixel diamond & TS glyph
  ts: {
    bg: "#1f54c4",
    hi: "#5c9cff",
    lo: "#113075",
    art: (
      <>
        <rect x="3" y="4" width="5" height="2" fill="#ffffff" />
        <rect x="5" y="6" width="2" height="6" fill="#ffffff" />
        <rect x="9" y="5" width="4" height="2" fill="#aee6ff" />
        <rect x="9" y="7" width="2" height="2" fill="#aee6ff" />
        <rect x="9" y="8" width="4" height="2" fill="#aee6ff" />
        <rect x="11" y="10" width="2" height="2" fill="#aee6ff" />
        <rect x="9" y="11" width="4" height="1" fill="#aee6ff" />
      </>
    ),
  },
  // C++: Forged Netherite Anvil & C+ Spark
  cpp: {
    bg: "#31427a",
    hi: "#6882d9",
    lo: "#1b2447",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#dce3f2" />
        <rect x="5" y="6" width="6" height="3" fill="#8b94a6" />
        <rect x="4" y="9" width="8" height="3" fill="#596070" />
        <rect x="7" y="5" width="2" height="2" fill="#3be0ff" />
        <rect x="10" y="7" width="3" height="1" fill="#ffcf4d" />
        <rect x="11" y="6" width="1" height="3" fill="#ffcf4d" />
      </>
    ),
  },
  // Python: Wisdom Potion Flask (Blue + Gold Orb)
  python: {
    bg: "#1f4d6e",
    hi: "#4996cc",
    lo: "#112b40",
    art: (
      <>
        <rect x="4" y="4" width="5" height="4" fill="#4aa8ff" />
        <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
        <rect x="7" y="8" width="5" height="4" fill="#ffcf4d" />
        <rect x="10" y="10" width="1" height="1" fill="#4d3300" />
        <rect x="6" y="7" width="4" height="2" fill="#90d4ff" />
      </>
    ),
  },
  // SQL: Double Iron Vault Chest
  sql: {
    bg: "#4a436e",
    hi: "#8378ba",
    lo: "#28233d",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#d9dfe8" />
        <rect x="4" y="7" width="8" height="2" fill="#aab5c7" />
        <rect x="4" y="10" width="8" height="2" fill="#7c879c" />
        <rect x="7" y="5" width="2" height="5" fill="#ffcf4d" />
      </>
    ),
  },
  // JavaScript: Gold Block + Lightning Bolt
  js: {
    bg: "#b88414",
    hi: "#ffe059",
    lo: "#704d06",
    art: (
      <>
        <rect x="7" y="3" width="4" height="2" fill="#fff9c4" />
        <rect x="6" y="5" width="3" height="2" fill="#fff9c4" />
        <rect x="5" y="7" width="6" height="2" fill="#ffffff" />
        <rect x="7" y="9" width="3" height="2" fill="#fff9c4" />
        <rect x="5" y="11" width="3" height="2" fill="#fff9c4" />
      </>
    ),
  },
  // Bash / Shell: Command Block Console
  bash: {
    bg: "#26362c",
    hi: "#52755f",
    lo: "#131c17",
    art: (
      <>
        <rect x="4" y="5" width="2" height="1" fill="#2ee86c" />
        <rect x="6" y="6" width="2" height="2" fill="#2ee86c" />
        <rect x="4" y="8" width="2" height="1" fill="#2ee86c" />
        <rect x="8" y="9" width="4" height="2" fill="#ffcf4d" />
      </>
    ),
  },
  // Dart: Precision Spectral Arrow
  dart: {
    bg: "#0e668c",
    hi: "#3dc2ff",
    lo: "#073952",
    art: (
      <>
        <rect x="9" y="3" width="4" height="4" fill="#aef9ff" />
        <rect x="7" y="6" width="3" height="3" fill="#ffffff" />
        <rect x="5" y="8" width="3" height="3" fill="#3be0ff" />
        <rect x="3" y="10" width="3" height="3" fill="#ffcf4d" />
      </>
    ),
  },
  // Next.js 16: Active Nether Portal Obsidian Frame
  nextjs: {
    bg: "#2b1647",
    hi: "#6b38ab",
    lo: "#140824",
    art: (
      <>
        <rect x="4" y="3" width="8" height="10" fill="#12071f" />
        <rect x="5" y="4" width="6" height="8" fill="#a83dff" />
        <rect x="6" y="5" width="4" height="6" fill="#f08aff" />
        <rect x="7" y="6" width="2" height="4" fill="#ffffff" />
      </>
    ),
  },
  // React 19: Cyan Nether Star Reactor
  react: {
    bg: "#125c75",
    hi: "#47d4ff",
    lo: "#093140",
    art: (
      <>
        <rect x="7" y="3" width="2" height="10" fill="#aef9ff" />
        <rect x="3" y="7" width="10" height="2" fill="#aef9ff" />
        <rect x="5" y="5" width="6" height="6" fill="#3be0ff" />
        <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
  // UI Architecture: Golden Item Frame & Amethyst Gem
  ui: {
    bg: "#8f4570",
    hi: "#e882bd",
    lo: "#54223f",
    art: (
      <>
        <rect x="4" y="4" width="8" height="8" fill="#ffcf4d" />
        <rect x="5" y="5" width="6" height="6" fill="#4a1e38" />
        <rect x="6" y="6" width="4" height="4" fill="#ff75b5" />
        <rect x="7" y="6" width="1" height="2" fill="#ffffff" />
      </>
    ),
  },
  // GSAP: Powered Redstone Rail
  gsap: {
    bg: "#26731e",
    hi: "#61e043",
    lo: "#133d0e",
    art: (
      <>
        <rect x="4" y="4" width="2" height="8" fill="#ffcf4d" />
        <rect x="10" y="4" width="2" height="8" fill="#ffcf4d" />
        <rect x="6" y="5" width="4" height="2" fill="#d4ff33" />
        <rect x="6" y="9" width="4" height="2" fill="#ff3842" />
      </>
    ),
  },
  // Tailwind: Breeze Feather
  tailwind: {
    bg: "#0b7a8c",
    hi: "#42e3ff",
    lo: "#06404a",
    art: (
      <>
        <rect x="4" y="5" width="7" height="2" fill="#aef9ff" />
        <rect x="6" y="7" width="6" height="2" fill="#ffffff" />
        <rect x="4" y="9" width="6" height="2" fill="#5ce8ff" />
      </>
    ),
  },
  // Framer Motion: Ender Pearl
  motion: {
    bg: "#5e2499",
    hi: "#b56eff",
    lo: "#331059",
    art: (
      <>
        <rect x="5" y="4" width="6" height="8" fill="#18a88b" />
        <rect x="4" y="5" width="8" height="6" fill="#2ee8bd" />
        <rect x="6" y="6" width="4" height="4" fill="#0d594c" />
        <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
  // Node.js & Express: Emerald Gear Core
  node: {
    bg: "#1f6e34",
    hi: "#4ce673",
    lo: "#0e3b1a",
    art: (
      <>
        <rect x="6" y="3" width="4" height="10" fill="#7dff9b" />
        <rect x="4" y="5" width="8" height="6" fill="#2ee86c" />
        <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
      </>
    ),
  },
  // NestJS: Bastion Crimson Banner Shield
  nest: {
    bg: "#8f1934",
    hi: "#f54971",
    lo: "#4d0919",
    art: (
      <>
        <rect x="4" y="4" width="8" height="6" fill="#ff5c7f" />
        <rect x="5" y="10" width="6" height="2" fill="#d92b51" />
        <rect x="7" y="5" width="2" height="5" fill="#fff0f3" />
      </>
    ),
  },
  // PostgreSQL: Chiseled Data Bookshelf
  postgres: {
    bg: "#274c7a",
    hi: "#5b9be8",
    lo: "#142945",
    art: (
      <>
        <rect x="4" y="4" width="8" height="8" fill="#7a4c28" />
        <rect x="5" y="5" width="2" height="3" fill="#3be0ff" />
        <rect x="8" y="5" width="3" height="3" fill="#ffcf4d" />
        <rect x="5" y="9" width="3" height="2" fill="#2ee86c" />
        <rect x="9" y="9" width="2" height="2" fill="#df96ff" />
      </>
    ),
  },
  // Prisma: Amethyst Crystal Cluster
  prisma: {
    bg: "#263659",
    hi: "#5b7cc2",
    lo: "#121a2e",
    art: (
      <>
        <rect x="7" y="3" width="2" height="10" fill="#ffffff" />
        <rect x="5" y="6" width="6" height="6" fill="#a84dff" />
        <rect x="4" y="9" width="8" height="3" fill="#7c30a4" />
      </>
    ),
  },
  // Supabase: Emerald Beacon Beam
  supabase: {
    bg: "#125c3c",
    hi: "#3df5a5",
    lo: "#08301f",
    art: (
      <>
        <rect x="6" y="3" width="4" height="7" fill="#7dffb8" />
        <rect x="7" y="4" width="2" height="5" fill="#ffffff" />
        <rect x="4" y="10" width="8" height="3" fill="#596070" />
      </>
    ),
  },
  // NextAuth: Golden Dungeon Key
  nextauth: {
    bg: "#4a277a",
    hi: "#9764e0",
    lo: "#241140",
    art: (
      <>
        <rect x="4" y="5" width="4" height="4" fill="#ffcf4d" />
        <rect x="5" y="6" width="2" height="2" fill="#241140" />
        <rect x="8" y="6" width="5" height="2" fill="#ffcf4d" />
        <rect x="11" y="8" width="2" height="2" fill="#e09214" />
      </>
    ),
  },
  // Scapy & Wireshark: Spyglass / Packet Radar
  scapy: {
    bg: "#184775",
    hi: "#479cf0",
    lo: "#0b243d",
    art: (
      <>
        <rect x="9" y="4" width="3" height="3" fill="#aef9ff" />
        <rect x="7" y="6" width="3" height="3" fill="#ffcf4d" />
        <rect x="4" y="8" width="4" height="4" fill="#a85c36" />
      </>
    ),
  },
  // Linux: Creeper Kernel Matrix
  linux: {
    bg: "#267322",
    hi: "#5ee053",
    lo: "#123b0f",
    art: (
      <>
        <rect x="4" y="4" width="2" height="2" fill="#0d170c" />
        <rect x="10" y="4" width="2" height="2" fill="#0d170c" />
        <rect x="6" y="6" width="4" height="3" fill="#0d170c" />
        <rect x="5" y="8" width="2" height="4" fill="#0d170c" />
        <rect x="9" y="8" width="2" height="4" fill="#0d170c" />
      </>
    ),
  },
  // ESP32 & Arduino: Redstone Torch & Signal
  esp32: {
    bg: "#75261e",
    hi: "#e0594b",
    lo: "#3d110c",
    art: (
      <>
        <rect x="7" y="4" width="2" height="3" fill="#fff2b2" />
        <rect x="6" y="5" width="4" height="3" fill="#ff3b42" />
        <rect x="7" y="8" width="2" height="5" fill="#9c5a2d" />
      </>
    ),
  },
  // Docker: Minecart with Chest Container
  docker: {
    bg: "#18598f",
    hi: "#49adff",
    lo: "#0b2e4d",
    art: (
      <>
        <rect x="4" y="4" width="8" height="4" fill="#c78a4e" />
        <rect x="4" y="8" width="8" height="3" fill="#8b94a6" />
        <rect x="5" y="11" width="2" height="2" fill="#2b2f3b" />
        <rect x="9" y="11" width="2" height="2" fill="#2b2f3b" />
      </>
    ),
  },
  // Protocolos RFC: Recovery Compass
  rfc: {
    bg: "#1f545c",
    hi: "#45b8c9",
    lo: "#0e292e",
    art: (
      <>
        <rect x="5" y="4" width="6" height="8" fill="#182b33" />
        <rect x="4" y="5" width="8" height="6" fill="#243f4a" />
        <rect x="7" y="5" width="2" height="3" fill="#2ce5d8" />
        <rect x="7" y="8" width="2" height="3" fill="#ff5252" />
      </>
    ),
  },
  // Git & GitHub: Pixel Cat Icon (matching Reference Image 2 cat tile)
  git: {
    bg: "#343947",
    hi: "#6e7791",
    lo: "#191c24",
    art: (
      <>
        <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
        <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
        <rect x="4" y="6" width="8" height="4" fill="#ffffff" />
        <rect x="5" y="10" width="6" height="2" fill="#e2e8f0" />
        <rect x="11" y="9" width="2" height="2" fill="#cbd5e1" />
      </>
    ),
  },
  // Java: Steaming Netherite Mug / Potion Brew
  java: {
    bg: "#7a2b14",
    hi: "#e06c3a",
    lo: "#451608",
    art: (
      <>
        <rect x="5" y="2" width="1" height="2" fill="#ffb885" />
        <rect x="8" y="2" width="1" height="2" fill="#ffe2a8" />
        <rect x="4" y="5" width="7" height="7" fill="#ffffff" />
        <rect x="5" y="6" width="5" height="2" fill="#703616" />
        <rect x="11" y="6" width="2" height="4" fill="#d9e0f0" />
        <rect x="11" y="7" width="1" height="2" fill="#7a2b14" />
        <rect x="3" y="12" width="9" height="1" fill="#9ea8bf" />
      </>
    ),
  },
  // Markdown / Docs: Engraved Chiseled Lectern Page
  markdown: {
    bg: "#263145",
    hi: "#5b7199",
    lo: "#121824",
    art: (
      <>
        <rect x="3" y="3" width="10" height="10" fill="#eef3ff" />
        <rect x="4" y="5" width="2" height="6" fill="#263145" />
        <rect x="6" y="6" width="1" height="2" fill="#263145" />
        <rect x="7" y="5" width="2" height="6" fill="#263145" />
        <rect x="10" y="5" width="2" height="4" fill="#3b82f6" />
        <rect x="10" y="9" width="2" height="2" fill="#1d4ed8" />
      </>
    ),
  },
  // IA Subagentes: Command Block Network & Dual Cores
  "ai-subagents": {
    bg: "#2b164d",
    hi: "#9b5cff",
    lo: "#150929",
    art: (
      <>
        <rect x="6" y="3" width="4" height="4" fill="#52ffd5" />
        <rect x="7" y="4" width="2" height="2" fill="#ffffff" />
        <rect x="3" y="9" width="3" height="3" fill="#ff9f43" />
        <rect x="10" y="9" width="3" height="3" fill="#ff9f43" />
        <rect x="5" y="7" width="2" height="2" fill="#c084fc" />
        <rect x="9" y="7" width="2" height="2" fill="#c084fc" />
        <rect x="6" y="10" width="4" height="1" fill="#52ffd5" />
      </>
    ),
  },
  // IA MCP & Control: Redstone / Command Matrix
  "ai-mcp": {
    bg: "#163640",
    hi: "#3eb8c9",
    lo: "#0a1c24",
    art: (
      <>
        <rect x="3" y="3" width="10" height="10" fill="#1e4954" />
        <rect x="4" y="4" width="2" height="2" fill="#ffcf4d" />
        <rect x="10" y="4" width="2" height="2" fill="#52ffd5" />
        <rect x="7" y="7" width="2" height="2" fill="#ff5277" />
        <rect x="4" y="10" width="2" height="2" fill="#52ffd5" />
        <rect x="10" y="10" width="2" height="2" fill="#ffcf4d" />
        <rect x="6" y="5" width="4" height="1" fill="#8ef9ff" />
        <rect x="6" y="10" width="4" height="1" fill="#8ef9ff" />
      </>
    ),
  },
  // IA Seguridad & Guardrails: Enchanted Totem Shield
  "ai-security": {
    bg: "#14382a",
    hi: "#37b87d",
    lo: "#081c14",
    art: (
      <>
        <rect x="4" y="3" width="8" height="6" fill="#52ffd5" />
        <rect x="5" y="9" width="6" height="2" fill="#32b886" />
        <rect x="6" y="11" width="4" height="2" fill="#1b7553" />
        <rect x="6" y="5" width="4" height="4" fill="#0d261d" />
        <rect x="7" y="6" width="2" height="2" fill="#ffe66d" />
      </>
    ),
  },
  // IA Implementación de Ideas: Nether Star / Beacon Spark
  "ai-ideation": {
    bg: "#3f1b52",
    hi: "#b55ee6",
    lo: "#1f0b2b",
    art: (
      <>
        <rect x="7" y="2" width="2" height="12" fill="#f7d2ff" />
        <rect x="2" y="7" width="12" height="2" fill="#f7d2ff" />
        <rect x="5" y="5" width="6" height="6" fill="#ffdf6b" />
        <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
      </>
    ),
  },
  // IA Flujos LLM & Contexto: Enchanted Book & Ender Eye
  "ai-rag": {
    bg: "#232a5c",
    hi: "#6b7eff",
    lo: "#111536",
    art: (
      <>
        <rect x="3" y="4" width="10" height="8" fill="#462b70" />
        <rect x="4" y="5" width="8" height="6" fill="#fff2d6" />
        <rect x="7" y="5" width="2" height="6" fill="#8a6845" />
        <rect x="5" y="7" width="1" height="2" fill="#52ffd5" />
        <rect x="10" y="7" width="1" height="2" fill="#a855f7" />
      </>
    ),
  },
  // IA Verificación & Calidad: Emerald Check Core
  "ai-eval": {
    bg: "#1b3f36",
    hi: "#49c9a2",
    lo: "#0b1f1a",
    art: (
      <>
        <rect x="3" y="3" width="10" height="10" fill="#102922" />
        <rect x="10" y="5" width="2" height="2" fill="#52ffd5" />
        <rect x="8" y="7" width="2" height="2" fill="#52ffd5" />
        <rect x="6" y="9" width="2" height="2" fill="#52ffd5" />
        <rect x="4" y="7" width="2" height="2" fill="#8fffde" />
      </>
    ),
  },
  // Velocity Proxy: Ender Eye / Wind Pearl
  velocity: {
    bg: "#113d4f",
    hi: "#38b6d9",
    lo: "#071d26",
    art: (
      <>
        <rect x="4" y="4" width="3" height="4" fill="#70f5ff" />
        <rect x="9" y="4" width="3" height="4" fill="#70f5ff" />
        <rect x="6" y="8" width="4" height="4" fill="#ffffff" />
        <rect x="7" y="10" width="2" height="2" fill="#38b6d9" />
      </>
    ),
  },
  // Spigot / Bukkit: Lava Bucket / Molten Tap
  spigot: {
    bg: "#6b380f",
    hi: "#f09a36",
    lo: "#361a05",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#ffd257" />
        <rect x="5" y="6" width="6" height="5" fill="#d9dfe8" />
        <rect x="6" y="6" width="4" height="2" fill="#ff7315" />
        <rect x="7" y="8" width="2" height="3" fill="#8f9bb0" />
      </>
    ),
  },
  // Redis / RedisDub: Redstone Cluster
  redis: {
    bg: "#631214",
    hi: "#e03d42",
    lo: "#2e0506",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#ff666b" />
        <rect x="4" y="7" width="8" height="2" fill="#ff3b42" />
        <rect x="4" y="10" width="8" height="2" fill="#c71c22" />
        <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
  // Maven: Feather Quill & Terracotta Tome
  maven: {
    bg: "#5c2519",
    hi: "#cc6349",
    lo: "#2b0f09",
    art: (
      <>
        <rect x="10" y="3" width="3" height="3" fill="#ff9f43" />
        <rect x="8" y="5" width="3" height="3" fill="#ffe694" />
        <rect x="6" y="7" width="3" height="3" fill="#ffffff" />
        <rect x="4" y="9" width="3" height="3" fill="#d9dfe8" />
        <rect x="3" y="11" width="2" height="2" fill="#ffb86c" />
      </>
    ),
  },
  // HikariCP: Nether Lightning Conduit
  hikari: {
    bg: "#1f355e",
    hi: "#5ea4ff",
    lo: "#0d182e",
    art: (
      <>
        <rect x="7" y="2" width="4" height="3" fill="#ffe66d" />
        <rect x="5" y="5" width="5" height="2" fill="#fff4a8" />
        <rect x="6" y="7" width="5" height="2" fill="#ffe66d" />
        <rect x="5" y="9" width="4" height="4" fill="#ffb830" />
      </>
    ),
  },
  // WorldGuard: Creeper Region Barrier
  worldguard: {
    bg: "#2e4d18",
    hi: "#6ec435",
    lo: "#142409",
    art: (
      <>
        <rect x="4" y="3" width="8" height="10" fill="#a8e876" />
        <rect x="5" y="5" width="2" height="2" fill="#182b0c" />
        <rect x="9" y="5" width="2" height="2" fill="#182b0c" />
        <rect x="7" y="7" width="2" height="2" fill="#182b0c" />
        <rect x="6" y="9" width="4" height="3" fill="#182b0c" />
      </>
    ),
  },
  // Three.js / R3F: Isometric Prism Block
  three: {
    bg: "#1b2436",
    hi: "#7c91b8",
    lo: "#0c101a",
    art: (
      <>
        <rect x="6" y="3" width="4" height="2" fill="#ffffff" />
        <rect x="4" y="5" width="8" height="2" fill="#c4d3eb" />
        <rect x="4" y="7" width="4" height="5" fill="#708cb8" />
        <rect x="8" y="7" width="4" height="5" fill="#465f87" />
      </>
    ),
  },
  // Webpay Plus / Mercado Pago: Emerald Merchant Coin
  webpay: {
    bg: "#3b175c",
    hi: "#a657f0",
    lo: "#1b092b",
    art: (
      <>
        <rect x="3" y="4" width="10" height="8" fill="#ffd257" />
        <rect x="4" y="5" width="8" height="2" fill="#3b175c" />
        <rect x="4" y="9" width="4" height="2" fill="#18b882" />
        <rect x="9" y="9" width="3" height="2" fill="#ffffff" />
      </>
    ),
  },
  mercadopago: {
    bg: "#104c6e",
    hi: "#3bb9ff",
    lo: "#062336",
    art: (
      <>
        <rect x="3" y="5" width="10" height="6" fill="#ffe66d" />
        <rect x="5" y="6" width="6" height="4" fill="#1aa3ff" />
        <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
  // Zod / Forms: Enchanted Seal Stamp
  zod: {
    bg: "#192d57",
    hi: "#528aff",
    lo: "#0b1429",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#70b0ff" />
        <rect x="8" y="6" width="3" height="2" fill="#ffffff" />
        <rect x="5" y="8" width="3" height="2" fill="#ffffff" />
        <rect x="4" y="10" width="8" height="2" fill="#70b0ff" />
      </>
    ),
  },
  rhf: {
    bg: "#4a1936",
    hi: "#e84a9e",
    lo: "#240a1a",
    art: (
      <>
        <rect x="3" y="4" width="10" height="3" fill="#ff85c0" />
        <rect x="3" y="8" width="6" height="4" fill="#ffffff" />
        <rect x="10" y="8" width="3" height="4" fill="#52ffd5" />
      </>
    ),
  },
  // FastAPI: Glowing Emerald Bolt
  fastapi: {
    bg: "#0e473c",
    hi: "#1fe0bd",
    lo: "#06211b",
    art: (
      <>
        <rect x="4" y="4" width="8" height="8" fill="#14b89a" />
        <rect x="7" y="5" width="3" height="2" fill="#ffffff" />
        <rect x="6" y="7" width="4" height="2" fill="#ffffff" />
        <rect x="6" y="9" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
  // SQLite: Compact Obsidian Vault
  sqlite: {
    bg: "#19364f",
    hi: "#52a2e8",
    lo: "#0a1926",
    art: (
      <>
        <rect x="4" y="3" width="8" height="10" fill="#7ec4ff" />
        <rect x="5" y="5" width="6" height="2" fill="#0d2336" />
        <rect x="5" y="8" width="6" height="2" fill="#0d2336" />
        <rect x="8" y="10" width="3" height="2" fill="#ffe66d" />
      </>
    ),
  },
  // Pydantic: Crimson Schema Crystal
  pydantic: {
    bg: "#571630",
    hi: "#eb3b7e",
    lo: "#290815",
    art: (
      <>
        <rect x="5" y="3" width="6" height="10" fill="#ff73a8" />
        <rect x="6" y="4" width="4" height="3" fill="#ffffff" />
        <rect x="5" y="8" width="3" height="5" fill="#eb3b7e" />
      </>
    ),
  },
  // Typer / Rich: CLI Command Lantern
  typer: {
    bg: "#1f242d",
    hi: "#6e7b94",
    lo: "#0d1014",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#52ffd5" />
        <rect x="7" y="6" width="2" height="6" fill="#52ffd5" />
        <rect x="4" y="10" width="2" height="2" fill="#ffe66d" />
      </>
    ),
  },
  rich: {
    bg: "#4a1b4d",
    hi: "#d15ce0",
    lo: "#210924",
    art: (
      <>
        <rect x="3" y="4" width="3" height="8" fill="#ff6b6b" />
        <rect x="6" y="4" width="4" height="8" fill="#ffd93d" />
        <rect x="10" y="4" width="3" height="8" fill="#4ecdc4" />
      </>
    ),
  },
  // YAML: Stacked Config Parchment
  yaml: {
    bg: "#403718",
    hi: "#c4a84b",
    lo: "#1c1808",
    art: (
      <>
        <rect x="4" y="4" width="2" height="2" fill="#ff6b6b" />
        <rect x="7" y="4" width="5" height="2" fill="#fff2c2" />
        <rect x="4" y="7" width="2" height="2" fill="#52ffd5" />
        <rect x="7" y="7" width="4" height="2" fill="#fff2c2" />
        <rect x="5" y="10" width="7" height="2" fill="#ffe66d" />
      </>
    ),
  },
  // Chrome Extensions / Manifest V3: Pixel Compass Orb
  chrome: {
    bg: "#1f3a5c",
    hi: "#63a9ff",
    lo: "#0d1b2e",
    art: (
      <>
        <rect x="4" y="3" width="8" height="3" fill="#ff595e" />
        <rect x="3" y="6" width="4" height="6" fill="#52b788" />
        <rect x="9" y="6" width="4" height="6" fill="#ffca3a" />
        <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
        <rect x="7" y="7" width="2" height="2" fill="#1982c4" />
      </>
    ),
  },
  // Gmail / Outlook: Sealed Letter Scroll
  gmail: {
    bg: "#5c1a1a",
    hi: "#e84a4a",
    lo: "#2b0909",
    art: (
      <>
        <rect x="3" y="4" width="10" height="8" fill="#ffffff" />
        <rect x="3" y="4" width="2" height="8" fill="#ea4335" />
        <rect x="11" y="4" width="2" height="8" fill="#ea4335" />
        <rect x="5" y="6" width="2" height="2" fill="#ea4335" />
        <rect x="9" y="6" width="2" height="2" fill="#ea4335" />
        <rect x="7" y="8" width="2" height="2" fill="#c5221f" />
      </>
    ),
  },
  outlook: {
    bg: "#133a6b",
    hi: "#4091f7",
    lo: "#071a33",
    art: (
      <>
        <rect x="3" y="4" width="6" height="8" fill="#28a8ea" />
        <rect x="9" y="5" width="4" height="6" fill="#ffffff" />
        <rect x="5" y="6" width="2" height="4" fill="#ffffff" />
      </>
    ),
  },
  // Handlebars: Forged Mustache Template Block
  handlebars: {
    bg: "#5c3416",
    hi: "#f08d3c",
    lo: "#2b1608",
    art: (
      <>
        <rect x="4" y="4" width="2" height="8" fill="#ffe694" />
        <rect x="3" y="7" width="1" height="2" fill="#ffe694" />
        <rect x="10" y="4" width="2" height="8" fill="#ffe694" />
        <rect x="12" y="7" width="1" height="2" fill="#ffe694" />
        <rect x="7" y="7" width="2" height="2" fill="#ff9f43" />
      </>
    ),
  },
  // JWT / bcrypt: Golden Key & Iron Padlock
  jwt: {
    bg: "#3f1c4d",
    hi: "#d14ee6",
    lo: "#1c0a24",
    art: (
      <>
        <rect x="7" y="3" width="2" height="10" fill="#ff5e99" />
        <rect x="3" y="7" width="10" height="2" fill="#52ffd5" />
        <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
      </>
    ),
  },
  bcrypt: {
    bg: "#26362d",
    hi: "#5ba87f",
    lo: "#101713",
    art: (
      <>
        <rect x="5" y="3" width="6" height="3" fill="#c7d0e0" />
        <rect x="6" y="4" width="4" height="2" fill="#26362d" />
        <rect x="4" y="6" width="8" height="7" fill="#ffe66d" />
        <rect x="7" y="8" width="2" height="3" fill="#1c241f" />
      </>
    ),
  },
  // Flutter: Cyan Wing Block
  flutter: {
    bg: "#123f6e",
    hi: "#54c5f8",
    lo: "#071c33",
    art: (
      <>
        <rect x="8" y="3" width="4" height="3" fill="#80d8ff" />
        <rect x="6" y="5" width="4" height="3" fill="#40c4ff" />
        <rect x="4" y="7" width="4" height="3" fill="#80d8ff" />
        <rect x="7" y="10" width="5" height="3" fill="#00b0ff" />
      </>
    ),
  },
  // Fusion 360: Isometric Gear Block
  fusion: {
    bg: "#5c2710",
    hi: "#ff813b",
    lo: "#2b1005",
    art: (
      <>
        <rect x="4" y="4" width="8" height="8" fill="#ffb86c" />
        <rect x="6" y="6" width="4" height="4" fill="#5c2710" />
        <rect x="4" y="4" width="3" height="3" fill="#ffffff" />
      </>
    ),
  },
  // BLE / FreeRTOS: Wireless Signal & Clockwork
  ble: {
    bg: "#142c66",
    hi: "#4785ff",
    lo: "#081433",
    art: (
      <>
        <rect x="7" y="3" width="2" height="10" fill="#ffffff" />
        <rect x="9" y="4" width="2" height="3" fill="#70b0ff" />
        <rect x="9" y="9" width="2" height="3" fill="#70b0ff" />
        <rect x="5" y="5" width="2" height="2" fill="#70b0ff" />
        <rect x="5" y="9" width="2" height="2" fill="#70b0ff" />
      </>
    ),
  },
  freertos: {
    bg: "#1d422e",
    hi: "#4dc482",
    lo: "#0b1c13",
    art: (
      <>
        <rect x="4" y="4" width="8" height="2" fill="#52ffd5" />
        <rect x="4" y="7" width="6" height="2" fill="#ffe66d" />
        <rect x="4" y="10" width="8" height="2" fill="#80d8ff" />
      </>
    ),
  },
  // Apache HTTP: Redstone Beacon Feather
  apache: {
    bg: "#521a35",
    hi: "#d9468f",
    lo: "#240816",
    art: (
      <>
        <rect x="9" y="3" width="3" height="3" fill="#ff9f43" />
        <rect x="7" y="5" width="4" height="3" fill="#ff595e" />
        <rect x="5" y="8" width="4" height="3" fill="#a855f7" />
        <rect x="4" y="11" width="2" height="2" fill="#ffffff" />
      </>
    ),
  },
}

const TECH_KEY_RULES: Array<[RegExp, string]> = [
  [/Subagentes/i, "ai-subagents"],
  [/MCP/i, "ai-mcp"],
  [/Guardrails/i, "ai-security"],
  [/Implementación IA/i, "ai-ideation"],
  [/Contexto/i, "ai-rag"],
  [/Calidad IA/i, "ai-eval"],
  [/Velocity/i, "velocity"],
  [/Spigot/i, "spigot"],
  [/Redis/i, "redis"],
  [/Maven/i, "maven"],
  [/HikariCP/i, "hikari"],
  [/WorldGuard/i, "worldguard"],
  [/React Hook Form/i, "rhf"],
  [/React Three Fiber|Three\.js/i, "three"],
  [/Webpay/i, "webpay"],
  [/Mercado Pago/i, "mercadopago"],
  [/Zod/i, "zod"],
  [/FastAPI/i, "fastapi"],
  [/SQLite/i, "sqlite"],
  [/Pydantic/i, "pydantic"],
  [/Typer/i, "typer"],
  [/Rich/i, "rich"],
  [/YAML/i, "yaml"],
  [/Manifest V3|Chrome/i, "chrome"],
  [/Gmail/i, "gmail"],
  [/Outlook/i, "outlook"],
  [/Handlebars/i, "handlebars"],
  [/JWT/i, "jwt"],
  [/bcrypt/i, "bcrypt"],
  [/Flutter/i, "flutter"],
  [/Fusion/i, "fusion"],
  [/FreeRTOS/i, "freertos"],
  [/BLE/i, "ble"],
  [/Apache/i, "apache"],
  [/TypeScript/i, "ts"],
  [/JavaScript/i, "js"],
  [/Python/i, "python"],
  [/Java\b/i, "java"],
  [/C\+\+/i, "cpp"],
  [/Dart/i, "dart"],
  [/SQL/i, "sql"],
  [/Bash/i, "bash"],
  [/Markdown/i, "markdown"],
  [/Next\.js/i, "nextjs"],
  [/React/i, "react"],
  [/Tailwind/i, "tailwind"],
  [/Framer Motion/i, "motion"],
  [/GSAP/i, "gsap"],
  [/NextAuth/i, "nextauth"],
  [/Prisma/i, "prisma"],
  [/PostgreSQL/i, "postgres"],
  [/Supabase/i, "supabase"],
  [/NestJS/i, "nest"],
  [/Node\.js|Express/i, "node"],
  [/Docker/i, "docker"],
  [/Scapy|Wireshark/i, "scapy"],
  [/Linux/i, "linux"],
  [/ESP32/i, "esp32"],
  [/RFC|IMAP|SPF|DKIM|DMARC/i, "rfc"],
  [/Git/i, "git"],
  [/Google OAuth|UI/i, "ui"],
]

export function getPixelTechKey(name: string): string {
  for (const [pattern, key] of TECH_KEY_RULES) {
    if (pattern.test(name)) return key
  }
  return "bash"
}

export function PixelTechBadge({
  techKey,
  size = 40,
  className,
}: IconProps & { techKey: string }) {
  const cfg = TECH_BADGE_MAP[techKey] ?? TECH_BADGE_MAP.bash
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Square outer pixel outline */}
      <rect x="1" y="0" width="14" height="16" fill="#100c18" />
      <rect x="0" y="1" width="16" height="14" fill="#100c18" />
      {/* Base tile fill */}
      <rect x="1" y="1" width="14" height="14" fill={cfg.bg} />
      {/* Top & left bevel highlight */}
      <rect x="1" y="1" width="14" height="1" fill={cfg.hi} />
      <rect x="1" y="1" width="1" height="14" fill={cfg.hi} />
      {/* Bottom & right bevel shadow */}
      <rect x="2" y="14" width="13" height="1" fill={cfg.lo} />
      <rect x="14" y="2" width="1" height="13" fill={cfg.lo} />
      {/* Crisp Minecraft/tech sprite art */}
      {cfg.art}
    </svg>
  )
}

export function PixelInstagramIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Outer rounded-pixel camera body */}
      <rect x="3" y="1" width="10" height="2" />
      <rect x="3" y="13" width="10" height="2" />
      <rect x="1" y="3" width="2" height="10" />
      <rect x="13" y="3" width="2" height="10" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="12" y="2" width="2" height="2" />
      <rect x="2" y="12" width="2" height="2" />
      <rect x="12" y="12" width="2" height="2" />
      {/* Center pixel lens ring */}
      <rect x="6" y="5" width="4" height="1" />
      <rect x="6" y="10" width="4" height="1" />
      <rect x="5" y="6" width="1" height="4" />
      <rect x="10" y="6" width="1" height="4" />
      <rect x="6" y="6" width="1" height="1" />
      <rect x="9" y="6" width="1" height="1" />
      <rect x="6" y="9" width="1" height="1" />
      <rect x="9" y="9" width="1" height="1" />
      {/* Top-right flash dot */}
      <rect x="10" y="3" width="2" height="2" />
    </svg>
  )
}

export function PixelFurnaceIcon({ size = 38, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#181a24" />
      <rect x="2" y="2" width="12" height="12" fill="#6b7080" />
      <rect x="2" y="2" width="12" height="2" fill="#9ea3b5" />
      <rect x="4" y="4" width="8" height="3" fill="#1b1c24" />
      <rect x="3" y="8" width="10" height="1" fill="#464b5c" />
      {/* Glowing fire box */}
      <rect x="4" y="9" width="8" height="4" fill="#1c1108" />
      <rect x="5" y="10" width="6" height="3" fill="#ff7315" />
      <rect x="6" y="11" width="4" height="2" fill="#ffcf4d" />
      <rect x="7" y="12" width="2" height="1" fill="#fff7bf" />
    </svg>
  )
}

export function PixelGrassBlockIcon({ size = 24, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#181410" />
      <rect x="2" y="2" width="12" height="4" fill="#599b2a" />
      <rect x="2" y="2" width="12" height="1" fill="#82cc49" />
      <rect x="3" y="6" width="3" height="2" fill="#4f8c23" />
      <rect x="10" y="6" width="2" height="2" fill="#4f8c23" />
      <rect x="2" y="6" width="12" height="8" fill="#855836" />
      <rect x="4" y="9" width="3" height="2" fill="#694225" />
      <rect x="10" y="11" width="3" height="2" fill="#9c6a43" />
    </svg>
  )
}

export function PixelTntBlockIcon({ size = 24, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" fill="#1a0b0b" />
      <rect x="2" y="2" width="12" height="3" fill="#d92b2b" />
      <rect x="2" y="11" width="12" height="3" fill="#b32020" />
      <rect x="2" y="5" width="12" height="6" fill="#f5f5f5" />
      {/* Mini TNT pixels */}
      <rect x="3" y="6" width="3" height="1" fill="#1a1a1a" />
      <rect x="4" y="7" width="1" height="3" fill="#1a1a1a" />
      <rect x="7" y="6" width="1" height="4" fill="#1a1a1a" />
      <rect x="8" y="7" width="1" height="2" fill="#1a1a1a" />
      <rect x="9" y="6" width="1" height="4" fill="#1a1a1a" />
      <rect x="11" y="6" width="2" height="1" fill="#1a1a1a" />
      <rect x="12" y="7" width="1" height="3" fill="#1a1a1a" />
    </svg>
  )
}

export function PixelOpenChestSprite({ size = 48, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      {/* Raised upper lid in oak wood + dark iron rim */}
      <rect x="2" y="1" width="12" height="4" fill="#1b1209" />
      <rect x="3" y="2" width="10" height="2" fill="#b97b38" />
      <rect x="3" y="2" width="10" height="1" fill="#e0a458" />
      <rect x="7" y="3" width="2" height="2" fill="#ffe66d" />
      {/* Open interior cavity glowing with treasure */}
      <rect x="1" y="5" width="14" height="4" fill="#181009" />
      <rect x="2" y="5" width="12" height="3" fill="#2c190d" />
      <rect x="3" y="6" width="3" height="2" fill="#52ffd5" />
      <rect x="6" y="6" width="4" height="2" fill="#ffe66d" />
      <rect x="10" y="6" width="3" height="2" fill="#c084fc" />
      {/* Lower wooden chest body + iron lock */}
      <rect x="1" y="9" width="14" height="6" fill="#181009" />
      <rect x="2" y="9" width="12" height="5" fill="#9c6228" />
      <rect x="2" y="9" width="12" height="1" fill="#c98842" />
      <rect x="2" y="13" width="12" height="1" fill="#6b4017" />
      <rect x="2" y="9" width="1" height="5" fill="#464b5c" />
      <rect x="13" y="9" width="1" height="5" fill="#464b5c" />
      <rect x="7" y="9" width="2" height="3" fill="#ffd257" />
      <rect x="7" y="10" width="2" height="1" fill="#fff7bf" />
    </svg>
  )
}

export function PixelTrophyMedalIcon({
  rank = 3,
  size = 28,
  className,
}: IconProps & { rank?: 1 | 2 | 3 | number }) {
  const isPodium = rank <= 3
  const primary = rank === 1 ? "#ffd747" : rank === 2 ? "#d9e4f5" : rank === 3 ? "#f59e0b" : "#80d8ff"
  const highlight = rank === 1 ? "#fff5b8" : rank === 2 ? "#ffffff" : rank === 3 ? "#fde68a" : "#c7efff"
  const shade = rank === 1 ? "#b45309" : rank === 2 ? "#64748b" : rank === 3 ? "#9a3412" : "#2563eb"

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="2" width="8" height="6" fill={primary} />
      <rect x="5" y="3" width="3" height="3" fill={highlight} />
      <rect x="2" y="3" width="2" height="3" fill={shade} />
      <rect x="12" y="3" width="2" height="3" fill={shade} />
      <rect x="5" y="8" width="6" height="2" fill={shade} />
      <rect x="7" y="10" width="2" height="2" fill={primary} />
      <rect x="4" y="12" width="8" height="2" fill={isPodium ? "#451a03" : "#1e293b"} />
      <rect x="5" y="12" width="6" height="1" fill={primary} />
    </svg>
  )
}



