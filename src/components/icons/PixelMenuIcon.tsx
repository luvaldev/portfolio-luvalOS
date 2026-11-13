type PixelMenuIconProps = { size?: number; className?: string }

export default function PixelMenuIcon({ size = 22, className }: PixelMenuIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M3 4h18v4H3zm0 6h18v4H3zm0 6h18v4H3z" />
      <path fill="#6d2ca8" d="M5 6h14v1H5zm0 6h14v1H5zm0 6h14v1H5z" />
    </svg>
  )
}
