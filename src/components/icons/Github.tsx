import type { IconProps } from "./IconProps"

export default function Github({ size = 22, className }: IconProps) {
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
      {/* Pixel-art cat silhouette inspired by the reference icon sheet */}
      <path d="M4 2h2v2H4zM10 2h2v2h-2z" />
      <rect x="3" y="4" width="10" height="5" />
      <rect x="4" y="9" width="8" height="2" />
      <rect x="5" y="11" width="6" height="3" />
      <rect x="11" y="10" width="2" height="2" />
      <rect x="12" y="8" width="2" height="2" />
    </svg>
  )
}
