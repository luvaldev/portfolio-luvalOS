import type { IconProps } from "./IconProps"

export default function Mail({ size = 22, className }: IconProps) {
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
      {/* Pixel-art envelope */}
      <path d="M1 3h14v10H1V3Zm2 2v1h2v1h2v1h2V7h2V6h2V5H3Zm0 3v3h10V8h-2v1H9v1H7V9H5V8H3Z" />
    </svg>
  )
}
