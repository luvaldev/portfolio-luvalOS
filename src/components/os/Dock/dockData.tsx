import React from "react"
import {
  PixelBookSprite,
  PixelCommandBlockIcon,
  PixelGrassBlockIcon,
  PixelRedstoneRepeaterIcon,
  PixelSwordCodeIcon,
  PixelTntBlockIcon,
} from "@/components/icons/PixelIcons"

export const AppIcon = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div
    className="w-full h-full flex items-center justify-center relative overflow-hidden border-2 border-[#0c0717]"
    style={{
      background: bg,
      boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.16), inset -2px -2px 0 rgba(0,0,0,0.45)",
    }}
  >
    {children}
  </div>
)

export const DOCK_ICONS: Record<string, React.ReactNode> = {
  "arcade-hub": (
    <AppIcon bg="#2d174f">
      <PixelCommandBlockIcon size={32} />
    </AppIcon>
  ),
  minecraft: (
    <AppIcon bg="#21421d">
      <PixelGrassBlockIcon size={32} />
    </AppIcon>
  ),
  "creeper-sweeper": (
    <AppIcon bg="#4d1414">
      <PixelTntBlockIcon size={32} />
    </AppIcon>
  ),
  "redstone-snake": (
    <AppIcon bg="#421424">
      <PixelRedstoneRepeaterIcon size={32} />
    </AppIcon>
  ),
  "nether-invaders": (
    <AppIcon bg="#192c4d">
      <PixelSwordCodeIcon size={32} />
    </AppIcon>
  ),
  "memory-enchants": (
    <AppIcon bg="#371952">
      <PixelBookSprite size={32} />
    </AppIcon>
  ),
}
