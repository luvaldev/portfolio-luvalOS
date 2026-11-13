// The cover is drawn as an SVG so its block edges stay sharp at every book size.
const PLUM = ["#764566", "#865174", "#683b5e", "#985981", "#603250"]
const AMETHYST = ["#6a2e91", "#8039a7", "#9146b7", "#5b247e", "#a454c8", "#742f9c"]
const SHADOW = ["#351541", "#421951", "#4c205c", "#2c103a"]

function coverPixel(col: number, row: number) {
  const cluster = (Math.floor(col / 2) * 13 + Math.floor(row / 2) * 19 + col * row * 3) & 255
  if (row > 16) return SHADOW[cluster % SHADOW.length]
  if (col < 4 + Math.floor(row * .42)) return PLUM[cluster % PLUM.length]
  return AMETHYST[cluster % AMETHYST.length]
}

const COVER_PIXELS = Array.from({ length: 21 * 16 }, (_, index) => {
  const col = index % 16
  const row = Math.floor(index / 16)
  return { x: col * 20, y: row * 20, fill: coverPixel(col, row) }
})

const ARC_ROWS = [12, 12, 13, 14, 15, 16, 16, 17, 17, 17, 16, 16, 15, 14, 13, 13]
const RIBBON = Array.from({ length: 12 }, (_, row) => ({
  row,
  col: 3 + Math.floor(row * .45),
}))

function Corner({ x, y, flipX = false, flipY = false }: { x: number; y: number; flipX?: boolean; flipY?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flipX ? -1 : 1} ${flipY ? -1 : 1})`}>
      <path d="M0 0h70v24H30v12H24v34H0z" fill="#1c092d" />
      <path d="M0 0h64v18H24v12H18v34H0z" fill="#58217e" />
      <path d="M0 0h64v7H7v57H0z" fill="#9144bd" />
      <path d="M18 18h40v7H25v33h-7z" fill="#36124e" />
      <rect x="8" y="8" width="8" height="8" fill="#b369d5" />
      <rect x="48" y="8" width="8" height="8" fill="#401456" />
    </g>
  )
}

export default function EnchantedBookOrnament() {
  return (
    <svg viewBox="0 0 320 420" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
      {COVER_PIXELS.map((cell, index) => (
        <rect key={index} x={cell.x} y={cell.y} width="20" height="20" fill={cell.fill} />
      ))}

      {/* Fuchsia strip descends diagonally over the violet leather. */}
      {RIBBON.map(({ row, col }) => (
        <g key={row}>
          <rect x={col * 20} y={row * 20} width="20" height="20" fill="#ff37bd" />
          <rect x={(col + 1) * 20} y={row * 20} width="20" height="20" fill="#d61a9e" />
          <rect x={(col + 2) * 20} y={row * 20} width="10" height="20" fill="#a30f79" />
        </g>
      ))}

      {/* The stepped pale crescent is the main mark of the reference book. */}
      {ARC_ROWS.map((row, col) => (
        <g key={col}>
          <rect x={col * 20} y={row * 20} width="20" height="20" fill={col < 4 ? "#fff5ff" : "#eacfff"} />
          <rect x={col * 20} y={(row + 1) * 20} width="20" height="20" fill="#ba8cdd" />
        </g>
      ))}

      {/* Strap continues below the latch and around the page block. */}
      <rect x="191" y="218" width="10" height="202" fill="#23062f" opacity=".75" />
      <rect x="162" y="218" width="36" height="202" fill="#d51a9e" />
      <rect x="162" y="218" width="11" height="202" fill="#ff44c4" />
      <rect x="190" y="218" width="8" height="202" fill="#9c0e73" />
      <rect x="174" y="286" width="16" height="20" fill="#b91089" />
      <rect x="162" y="340" width="12" height="20" fill="#f632b8" />

      {/* Broad, simple gold clasp, with a bevel instead of a gem. */}
      <rect x="153" y="212" width="74" height="56" fill="#1c092d" opacity=".65" />
      <rect x="147" y="204" width="74" height="56" fill="#8b3f16" />
      <rect x="151" y="208" width="66" height="48" fill="#ef9d38" />
      <rect x="151" y="208" width="66" height="9" fill="#ffe2a0" />
      <rect x="151" y="208" width="9" height="48" fill="#ffc66b" />
      <rect x="209" y="217" width="8" height="39" fill="#bf692a" />
      <rect x="160" y="247" width="57" height="9" fill="#b56126" />
      <rect x="166" y="221" width="37" height="24" fill="#f9b451" />

      {/* Raised amethyst corner guards. */}
      <Corner x={0} y={0} />
      <Corner x={320} y={0} flipX />
      <Corner x={0} y={420} flipY />
      <Corner x={320} y={420} flipX flipY />
    </svg>
  )
}
