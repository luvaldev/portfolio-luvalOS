import type { IconProps } from "./IconProps"

export default function Moon({ size = 22, className }: IconProps) {
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
      {/* Pixel-art crescent moon */}
      <rect x="6" y="2" width="4" height="2" />
      <rect x="4" y="4" width="3" height="2" />
      <rect x="3" y="6" width="3" height="4" />
      <rect x="4" y="10" width="3" height="2" />
      <rect x="6" y="12" width="6" height="2" />
      <rect x="11" y="10" width="2" height="2" />
      <rect x="11" y="4" width="1" height="1" />
    </svg>
  )
}
