import type { IconProps } from "./IconProps"

export default function Linkedin({ size = 22, className }: IconProps) {
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
      {/* Pixel-art 'in' monogram */}
      <rect x="3" y="3" width="2" height="2" />
      <rect x="3" y="6" width="2" height="7" />
      <rect x="7" y="6" width="2" height="7" />
      <rect x="9" y="6" width="3" height="2" />
      <rect x="11" y="8" width="2" height="5" />
    </svg>
  )
}
