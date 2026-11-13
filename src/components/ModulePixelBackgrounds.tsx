import type { ReactNode } from "react"
import Image from "next/image"

export type BiomeTransitionVariant =
  | "hero-to-village"
  | "village-to-arena"
  | "arena-to-library"
  | "library-to-cherry"
  | "cherry-to-desert"
  | "desert-to-bastion"

type GridOp = {
  x: number
  y: number
  w: number
  h: number
  tile: string
}

function buildGridMap(cols: number, rows: number, baseTile: string, ops: GridOp[]): string[] {
  const matrix = Array.from({ length: rows }, () => Array<string>(cols).fill(baseTile))
  for (const op of ops) {
    const x0 = Math.max(0, op.x)
    const y0 = Math.max(0, op.y)
    const x1 = Math.min(cols, op.x + op.w)
    const y1 = Math.min(rows, op.y + op.h)
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        matrix[y][x] = op.tile
      }
    }
  }
  return matrix.map((r) => r.join(""))
}

type MergedPatternGrid = {
  patterns: ReactNode[]
  rects: ReactNode[]
}

function buildMergedPatternGrid(
  map: string[],
  tileIds: Record<string, string>,
  fallbackId: string,
  prefix: string,
): MergedPatternGrid {
  const rows = map.length
  const cols = map[0]?.length ?? 0
  const widthPx = cols * 16
  const heightPx = rows * 16

  const grid: string[][] = Array.from({ length: rows }, (_, row) => {
    const line = map[row]
    return Array.from({ length: cols }, (_, col) => tileIds[line[col]] ?? fallbackId)
  })

  const uniqueTileIds = new Set<string>([fallbackId])
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      uniqueTileIds.add(grid[r][c])
    }
  }

  const patterns: ReactNode[] = Array.from(uniqueTileIds).map((tileId) => (
    <pattern
      key={`pat-${prefix}-${tileId}`}
      id={`${prefix}-pat-${tileId}`}
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <use href={`#${tileId}`} />
    </pattern>
  ))

  const rects: ReactNode[] = [
    <rect key={`base-${prefix}`} x={0} y={0} width={widthPx} height={heightPx} fill={`url(#${prefix}-pat-${fallbackId})`} />,
  ]

  const visited: boolean[][] = Array.from({ length: rows }, () => Array<boolean>(cols).fill(false))

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (visited[r][c]) continue
      const tileId = grid[r][c]
      if (tileId === fallbackId) {
        visited[r][c] = true
        continue
      }

      let w = 1
      while (c + w < cols && !visited[r][c + w] && grid[r][c + w] === tileId) {
        w++
      }

      let h = 1
      outer: while (r + h < rows) {
        for (let k = c; k < c + w; k++) {
          if (visited[r + h][k] || grid[r + h][k] !== tileId) break outer
        }
        h++
      }

      for (let dr = 0; dr < h; dr++) {
        for (let dc = 0; dc < w; dc++) {
          visited[r + dr][c + dc] = true
        }
      }

      rects.push(
        <rect
          key={`mr-${prefix}-${r}-${c}`}
          x={c * 16}
          y={r * 16}
          width={w * 16}
          height={h * 16}
          fill={`url(#${prefix}-pat-${tileId})`}
        />,
      )
    }
  }

  return { patterns, rects }
}

type WorldWalker = {
  src: string
  alt: string
  className: string
  style: React.CSSProperties
}

function WorldWalkers({ walkers }: { walkers: WorldWalker[] }) {
  return (
    <div className="mc-world-mobs-layer">
      {walkers.map((mob, idx) => (
        <div key={`${mob.src}-${idx}`} className={`mc-world-walker ${mob.className}`} style={mob.style}>
          <Image
            src={mob.src}
            alt={mob.alt}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className="mc-walker-sprite"
          />
        </div>
      ))}
    </div>
  )
}

/* ── 1. ALDEA OVERWORLD (64x38 Panoramic + Farolas con Halo de Luz + Costados Activos) ── */
const VILLAGE_MAP = buildGridMap(64, 38, "G", [
  // Outer forest clusters
  { x: 0, y: 0, w: 6, h: 4, tile: "T" },
  { x: 58, y: 0, w: 6, h: 4, tile: "T" },
  { x: 0, y: 33, w: 5, h: 5, tile: "T" },
  { x: 59, y: 33, w: 5, h: 5, tile: "T" },
  { x: 14, y: 0, w: 5, h: 3, tile: "T" },
  { x: 44, y: 0, w: 6, h: 3, tile: "T" },
  // Twin vertical canals (left flank & right flank)
  { x: 10, y: 0, w: 1, h: 38, tile: "R" },
  { x: 11, y: 0, w: 3, h: 38, tile: "W" },
  { x: 50, y: 0, w: 1, h: 38, tile: "R" },
  { x: 51, y: 0, w: 3, h: 38, tile: "W" },
  // Left & Right side promenades (visible in uncovered margins)
  { x: 3, y: 4, w: 2, h: 28, tile: "P" },
  { x: 58, y: 4, w: 2, h: 28, tile: "P" },
  // Horizontal dirt avenues + wooden bridges across canals
  { x: 0, y: 10, w: 64, h: 2, tile: "P" },
  { x: 11, y: 10, w: 3, h: 2, tile: "B" },
  { x: 51, y: 10, w: 3, h: 2, tile: "B" },
  { x: 0, y: 25, w: 64, h: 2, tile: "P" },
  { x: 11, y: 25, w: 3, h: 2, tile: "B" },
  { x: 51, y: 25, w: 3, h: 2, tile: "B" },
  // Left Flank Market Stalls (yellow/white awnings) & Cobble plaza
  { x: 1, y: 5, w: 2, h: 2, tile: "Y" },
  { x: 5, y: 5, w: 2, h: 2, tile: "S" },
  { x: 1, y: 14, w: 2, h: 2, tile: "S" },
  { x: 6, y: 16, w: 3, h: 4, tile: "O" },
  { x: 1, y: 20, w: 2, h: 3, tile: "C" },
  { x: 6, y: 28, w: 3, h: 3, tile: "H" },
  // Right Flank Market Stalls, Houses & Farm
  { x: 55, y: 4, w: 2, h: 2, tile: "Y" },
  { x: 60, y: 5, w: 2, h: 2, tile: "S" },
  { x: 55, y: 14, w: 3, h: 4, tile: "O" },
  { x: 60, y: 17, w: 2, h: 2, tile: "Y" },
  { x: 55, y: 20, w: 3, h: 3, tile: "H" },
  { x: 55, y: 29, w: 3, h: 3, tile: "C" },
  // Central Plaza & Oak Houses
  { x: 24, y: 4, w: 6, h: 4, tile: "O" },
  { x: 35, y: 5, w: 5, h: 3, tile: "C" },
  { x: 28, y: 15, w: 8, h: 6, tile: "C" },
  { x: 18, y: 29, w: 6, h: 4, tile: "O" },
  { x: 38, y: 28, w: 6, h: 4, tile: "H" },
])

const VILLAGE_TILES: Record<string, string> = {
  G: "vg-grass",
  T: "vg-tree",
  P: "vg-path",
  R: "vg-river-bank",
  W: "vg-water",
  B: "vg-bridge",
  Y: "vg-stall-y",
  S: "vg-stall-w",
  O: "vg-oak-roof",
  C: "vg-cobble",
  H: "vg-hay",
}

const VILLAGE_GRID = buildMergedPatternGrid(VILLAGE_MAP, VILLAGE_TILES, "vg-grass", "vg")

const VILLAGE_LANTERNS = [
  { x: 28, y: 120 },
  { x: 142, y: 162 },
  { x: 120, y: 382 },
  { x: 34, y: 438 },
  { x: 500, y: 142 },
  { x: 874, y: 154 },
  { x: 938, y: 224 },
  { x: 866, y: 392 },
  { x: 966, y: 446 },
  { x: 468, y: 428 },
]

const VILLAGE_WALKERS: WorldWalker[] = [
  {
    src: "/minecraft/avatar-minecraft-steve-drops.png",
    alt: "Steve recorriendo el sendero izquierdo",
    className: "mc-walk-side-r",
    style: { left: "1.8%", top: "14%", animationDuration: "18s" },
  },
  {
    src: "/minecraft/avatar-minecraft-alex-drops.png",
    alt: "Alex caminando junto al canal izquierdo",
    className: "mc-walk-wide-r",
    style: { left: "3.2%", top: "56%", animationDuration: "24s", animationDelay: "-4s" },
  },
  {
    src: "/minecraft/avatar-minecraft-vegettagaymer-drops.png",
    alt: "Vegetta vigilando la entrada",
    className: "mc-walk-side-r",
    style: { left: "2.4%", top: "78%", animationDuration: "21s", animationDelay: "-8s" },
  },
  {
    src: "/minecraft/avatar-minecraft-willyrex-drops.png",
    alt: "Willyrex paseando por la aldea derecha",
    className: "mc-walk-side-l",
    style: { right: "2%", top: "18%", animationDuration: "19s", animationDelay: "-3s" },
  },
  {
    src: "/minecraft/avatar-minecraft-luzuvlogs-drops.png",
    alt: "Luzu recorriendo el mercado derecho",
    className: "mc-walk-wide-l",
    style: { right: "2.8%", top: "48%", animationDuration: "25s", animationDelay: "-9s" },
  },
  {
    src: "/minecraft/avatar-minecraft-robleis01-drops.png",
    alt: "Robleis cerca del puente derecho",
    className: "mc-walk-side-l",
    style: { right: "2.4%", top: "74%", animationDuration: "20s", animationDelay: "-5s" },
  },
  {
    src: "/minecraft/avatar-minecraft-alexby11-drops.png",
    alt: "Alexby11 patrullando los puestos",
    className: "mc-walk-circuit",
    style: { left: "4.6%", top: "32%", animationDuration: "23s", animationDelay: "-12s" },
  },
  {
    src: "/minecraft/avatar-minecraft-pig-drops.png",
    alt: "Cerdito en la granja",
    className: "mc-walk-side-l",
    style: { right: "4.5%", top: "28%", animationDuration: "16s", animationDelay: "-6s" },
  },
]

export function VillageBiomePattern() {
  return (
    <div className="mc-module-bg-layer" aria-hidden="true">
      <svg
        className="mc-module-bg-svg"
        viewBox="0 0 1024 608"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id="vg-grass">
            <rect width="16" height="16" fill="#478020" />
            <rect x="0" y="0" width="8" height="8" fill="#529127" />
            <rect x="8" y="8" width="8" height="8" fill="#3f731b" />
            <rect x="3" y="4" width="2" height="2" fill="#6eb83b" />
            <rect x="11" y="12" width="2" height="2" fill="#336114" />
          </g>
          <g id="vg-river-bank">
            <rect width="16" height="16" fill="#478020" />
            <rect x="13" y="0" width="3" height="16" fill="#365c17" />
            <rect x="11" y="3" width="2" height="4" fill="#6eb83b" />
          </g>
          <g id="vg-tree">
            <rect width="16" height="16" fill="#2c5716" />
            <rect x="1" y="1" width="14" height="14" fill="#234a10" />
            <rect x="2" y="2" width="5" height="5" fill="#3b731e" />
            <rect x="9" y="3" width="4" height="4" fill="#458223" />
            <rect x="0" y="14" width="16" height="2" fill="#142b08" />
          </g>
          <g id="vg-path">
            <rect width="16" height="16" fill="#a87742" />
            <rect x="1" y="2" width="5" height="3" fill="#bf8b50" />
            <rect x="9" y="1" width="5" height="2" fill="#916535" />
            <rect x="4" y="8" width="5" height="3" fill="#8f6231" />
            <rect x="11" y="10" width="4" height="4" fill="#c49054" />
            <rect x="0" y="15" width="16" height="1" fill="#7d562b" />
          </g>
          <g id="vg-water">
            <rect width="16" height="16" fill="#2d3db3" />
            <rect x="0" y="0" width="1" height="16" fill="#1d2b82" />
            <rect x="4" y="3" width="6" height="2" fill="#4861d6" />
            <rect x="7" y="10" width="5" height="2" fill="#627af2" />
          </g>
          <g id="vg-bridge">
            <rect width="16" height="16" fill="#2d3db3" />
            <rect x="0" y="2" width="16" height="12" fill="#59381a" />
            <rect x="1" y="3" width="14" height="10" fill="#8f5d2e" />
            <rect x="3" y="5" width="4" height="6" fill="#6e4420" />
            <rect x="9" y="5" width="4" height="6" fill="#6e4420" />
          </g>
          <g id="vg-stall-y">
            <rect width="16" height="16" fill="#3b2310" />
            <rect x="1" y="1" width="14" height="13" fill="#f5de7a" />
            <rect x="1" y="1" width="7" height="13" fill="#e6c34e" />
            <rect x="1" y="1" width="14" height="2" fill="#fff5ba" />
          </g>
          <g id="vg-stall-w">
            <rect width="16" height="16" fill="#3b2310" />
            <rect x="1" y="1" width="14" height="13" fill="#f7f5eb" />
            <rect x="8" y="1" width="7" height="13" fill="#f5de7a" />
            <rect x="1" y="1" width="14" height="2" fill="#ffffff" />
          </g>
          <g id="vg-oak-roof">
            <rect width="16" height="16" fill="#4f3318" />
            <rect x="1" y="1" width="14" height="3" fill="#a3703d" />
            <rect x="1" y="5" width="14" height="3" fill="#916132" />
            <rect x="1" y="9" width="14" height="3" fill="#a3703d" />
            <rect x="1" y="13" width="14" height="2" fill="#7d5228" />
          </g>
          <g id="vg-cobble">
            <rect width="16" height="16" fill="#525766" />
            <rect x="1" y="1" width="6" height="6" fill="#707687" />
            <rect x="8" y="1" width="7" height="5" fill="#616675" />
            <rect x="1" y="8" width="8" height="7" fill="#646a7a" />
            <rect x="10" y="7" width="5" height="8" fill="#73798a" />
          </g>
          <g id="vg-hay">
            <rect width="16" height="16" fill="#d9ae26" />
            <rect x="1" y="3" width="14" height="2" fill="#9e1e1e" />
            <rect x="1" y="11" width="14" height="2" fill="#9e1e1e" />
          </g>
          <radialGradient id="vg-lantern-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff5b8" stopOpacity="0.92" />
            <stop offset="22%" stopColor="#ffc84d" stopOpacity="0.58" />
            <stop offset="55%" stopColor="#ff9429" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#ff9429" stopOpacity="0" />
          </radialGradient>
          {VILLAGE_GRID.patterns}
        </defs>

        {VILLAGE_GRID.rects}

        {/* Lily Pads on Both Canals */}
        <rect x="184" y="48" width="11" height="9" fill="#25752a" />
        <rect x="186" y="50" width="6" height="5" fill="#4fc755" />
        <rect x="192" y="290" width="11" height="9" fill="#25752a" />
        <rect x="822" y="86" width="11" height="9" fill="#25752a" />
        <rect x="824" y="88" width="6" height="5" fill="#4fc755" />
        <rect x="832" y="492" width="11" height="9" fill="#25752a" />

        {/* Pumpkins & Note Blocks */}
        <rect x="114" y="68" width="12" height="12" fill="#8a3d0a" />
        <rect x="116" y="70" width="8" height="8" fill="#e0741b" />
        <rect x="904" y="94" width="12" height="12" fill="#8a3d0a" />
        <rect x="906" y="96" width="8" height="8" fill="#e0741b" />
        <rect x="78" y="318" width="14" height="14" fill="#5e3218" />
        <rect x="80" y="304" width="4" height="5" fill="#2ee86c" />
        <rect x="90" y="296" width="4" height="5" fill="#ffcf33" />

        {/* Farolas con Halo de Luz Cálida */}
        {VILLAGE_LANTERNS.map((lamp, idx) => (
          <g key={`vg-lamp-${idx}`} transform={`translate(${lamp.x}, ${lamp.y})`}>
            <circle cx="8" cy="8" r="76" fill="url(#vg-lantern-halo)" className="mc-lantern-glow" />
            <rect x="5" y="10" width="6" height="22" fill="#4a2e16" />
            <rect x="6" y="10" width="2" height="22" fill="#784d27" />
            <rect x="1" y="2" width="14" height="10" fill="#232630" />
            <rect x="3" y="4" width="10" height="6" fill="#ffae2b" />
            <rect x="5" y="5" width="6" height="4" fill="#fff7bf" />
            <rect x="3" y="0" width="10" height="2" fill="#464b5c" />
          </g>
        ))}
      </svg>

      <WorldWalkers walkers={VILLAGE_WALKERS} />
      <div className="mc-module-scrim mc-scrim-village" />
    </div>
  )
}

/* ── 2. BOSQUE DE CEREZOS (64x48 Escala Compacta para #stack + Linternas de Piedra + Costados Activos) ── */
const CHERRY_MAP = buildGridMap(64, 48, "G", [
  // Compact cherry canopy clusters around top, left flank, right flank & bottom (never gigantic)
  { x: 0, y: 0, w: 8, h: 5, tile: "L" },
  { x: 1, y: 5, w: 6, h: 1, tile: "E" },
  { x: 12, y: 1, w: 7, h: 4, tile: "L" },
  { x: 46, y: 1, w: 8, h: 4, tile: "L" },
  { x: 56, y: 0, w: 8, h: 6, tile: "L" },
  { x: 57, y: 6, w: 6, h: 1, tile: "E" },
  // Winding Left-Flank Cherry Trail & Workshop Cabin
  { x: 2, y: 6, w: 3, h: 38, tile: "P" },
  { x: 5, y: 12, w: 4, h: 4, tile: "K" },
  { x: 9, y: 13, w: 1, h: 1, tile: "O" },
  { x: 9, y: 14, w: 1, h: 1, tile: "T" },
  { x: 0, y: 18, w: 2, h: 6, tile: "D" },
  { x: 5, y: 20, w: 5, h: 4, tile: "L" },
  { x: 6, y: 24, w: 4, h: 1, tile: "E" },
  { x: 5, y: 31, w: 4, h: 4, tile: "K" },
  { x: 9, y: 33, w: 1, h: 1, tile: "T" },
  { x: 1, y: 39, w: 6, h: 5, tile: "L" },
  // Winding Right-Flank Cherry Trail & Koi Pond
  { x: 57, y: 8, w: 3, h: 36, tile: "P" },
  { x: 52, y: 12, w: 5, h: 5, tile: "L" },
  { x: 51, y: 19, w: 5, h: 8, tile: "W" },
  { x: 51, y: 22, w: 5, h: 2, tile: "B" },
  { x: 53, y: 29, w: 4, h: 4, tile: "K" },
  { x: 52, y: 31, w: 1, h: 1, tile: "T" },
  { x: 55, y: 38, w: 7, h: 5, tile: "L" },
  { x: 62, y: 14, w: 2, h: 9, tile: "D" },
  // Center decorative cherry trees & paths (visible between cards)
  { x: 22, y: 10, w: 6, h: 5, tile: "L" },
  { x: 35, y: 12, w: 6, h: 5, tile: "L" },
  { x: 27, y: 23, w: 10, h: 2, tile: "P" },
  { x: 24, y: 34, w: 6, h: 5, tile: "L" },
  { x: 37, y: 36, w: 6, h: 5, tile: "L" },
])

const CHERRY_TILES: Record<string, string> = {
  G: "cg-grass",
  L: "cg-leaves",
  E: "cg-leaves-edge",
  D: "cg-cliff",
  P: "cg-path",
  K: "cg-planks",
  O: "cg-log",
  T: "cg-craft",
  W: "cg-water",
  B: "cg-bridge",
}

const CHERRY_GRID = buildMergedPatternGrid(CHERRY_MAP, CHERRY_TILES, "cg-grass", "cg")

const CHERRY_LANTERNS = [
  { x: 86, y: 148 },
  { x: 86, y: 418 },
  { x: 86, y: 634 },
  { x: 896, y: 186 },
  { x: 896, y: 432 },
  { x: 896, y: 616 },
]

const CHERRY_WALKERS: WorldWalker[] = [
  {
    src: "/minecraft/avatar-minecraft-elalex88-drops.png",
    alt: "Elalex88 paseando entre cerezos izquierdos",
    className: "mc-walk-side-r",
    style: { left: "1.8%", top: "14%", animationDuration: "20s" },
  },
  {
    src: "/minecraft/avatar-minecraft-atomicnugget24-drops(1).png",
    alt: "Atomicnugget24 en la pradera de pétalos",
    className: "mc-walk-wide-r",
    style: { left: "3%", top: "44%", animationDuration: "25s", animationDelay: "-5s" },
  },
  {
    src: "/minecraft/avatar-minecraft-lwcho-drops(1).png",
    alt: "Lwcho cerca de la cabaña de cerezo",
    className: "mc-walk-side-r",
    style: { left: "2.4%", top: "72%", animationDuration: "19s", animationDelay: "-10s" },
  },
  {
    src: "/minecraft/avatar-minecraft-alex-drops.png",
    alt: "Alex en el puente de cerezo",
    className: "mc-walk-side-l",
    style: { right: "2%", top: "16%", animationDuration: "18s", animationDelay: "-3s" },
  },
  {
    src: "/minecraft/avatar-minecraft-robleis01-drops.png",
    alt: "Robleis junto al estanque koi",
    className: "mc-walk-wide-l",
    style: { right: "3.2%", top: "48%", animationDuration: "24s", animationDelay: "-8s" },
  },
  {
    src: "/minecraft/avatar-minecraft-luzuvlogs-drops.png",
    alt: "Luzu caminando por el sendero de cerezos",
    className: "mc-walk-side-l",
    style: { right: "2.2%", top: "74%", animationDuration: "22s", animationDelay: "-12s" },
  },
  {
    src: "/minecraft/avatar-minecraft-steve-drops.png",
    alt: "Steve recolectando pétalos",
    className: "mc-walk-circuit",
    style: { left: "4%", top: "86%", animationDuration: "19s", animationDelay: "-7s" },
  },
  {
    src: "/minecraft/avatar-minecraft-pig-drops.png",
    alt: "Cerdito entre los cerezos",
    className: "mc-walk-side-l",
    style: { right: "4.6%", top: "88%", animationDuration: "17s", animationDelay: "-4s" },
  },
]

export function CherryGrovePattern() {
  return (
    <div className="mc-module-bg-layer" aria-hidden="true">
      <svg
        className="mc-module-bg-svg"
        viewBox="0 0 1024 768"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id="cg-grass">
            <rect width="16" height="16" fill="#4f9120" />
            <rect x="0" y="0" width="8" height="8" fill="#5ca128" />
            <rect x="8" y="8" width="8" height="8" fill="#437d19" />
            <rect x="2" y="3" width="3" height="2" fill="#ffd6ec" />
            <rect x="10" y="5" width="2" height="3" fill="#ff9ed0" />
            <rect x="5" y="11" width="3" height="2" fill="#ffc2e2" />
            <rect x="12" y="12" width="2" height="2" fill="#ffdf33" />
          </g>
          <g id="cg-leaves">
            <rect width="16" height="16" fill="#e67cb0" />
            <rect x="0" y="0" width="16" height="2" fill="#f7a8cf" />
            <rect x="0" y="14" width="16" height="2" fill="#b84d82" />
            <rect x="14" y="0" width="2" height="16" fill="#c7588f" />
            <rect x="4" y="3" width="2" height="4" fill="#ffcce6" />
            <rect x="3" y="4" width="4" height="2" fill="#ffcce6" />
            <rect x="10" y="9" width="2" height="4" fill="#ffb8db" />
            <rect x="9" y="10" width="4" height="2" fill="#ffb8db" />
          </g>
          <g id="cg-leaves-edge">
            <rect width="16" height="16" fill="#401a2a" />
            <rect x="0" y="0" width="15" height="12" fill="#d96da2" />
            <rect x="2" y="3" width="4" height="2" fill="#ffcce6" />
            <rect x="3" y="2" width="2" height="4" fill="#ffcce6" />
          </g>
          <g id="cg-cliff">
            <rect width="16" height="16" fill="#4f331c" />
            <rect x="0" y="0" width="16" height="5" fill="#5ca325" />
            <rect x="0" y="5" width="16" height="3" fill="#825631" />
            <rect x="2" y="9" width="4" height="4" fill="#6b4424" />
          </g>
          <g id="cg-path">
            <rect width="16" height="16" fill="#ba854d" />
            <rect x="3" y="2" width="4" height="3" fill="#d49c61" />
            <rect x="9" y="6" width="5" height="3" fill="#9e6d3a" />
            <rect x="2" y="10" width="5" height="4" fill="#a87540" />
          </g>
          <g id="cg-planks">
            <rect width="16" height="16" fill="#381822" />
            <rect x="1" y="1" width="14" height="3" fill="#f0b4be" />
            <rect x="1" y="5" width="14" height="3" fill="#de9ca7" />
            <rect x="1" y="9" width="14" height="3" fill="#ebaeb8" />
            <rect x="1" y="13" width="14" height="2" fill="#cf8a96" />
          </g>
          <g id="cg-log">
            <rect width="16" height="16" fill="#2b1219" />
            <rect x="2" y="2" width="12" height="12" fill="#4f2431" />
            <rect x="3" y="3" width="10" height="10" fill="#f2c4ca" />
            <rect x="5" y="5" width="6" height="6" fill="#d99fa8" />
          </g>
          <g id="cg-craft">
            <rect width="16" height="16" fill="#211109" />
            <rect x="1" y="1" width="14" height="14" fill="#c77d46" />
            <rect x="2" y="2" width="12" height="12" fill="#8f4c24" />
            <rect x="3" y="3" width="3" height="3" fill="#e6b08a" />
            <rect x="7" y="3" width="3" height="3" fill="#e6b08a" />
            <rect x="3" y="7" width="3" height="3" fill="#e6b08a" />
            <rect x="7" y="7" width="3" height="3" fill="#d48957" />
          </g>
          <g id="cg-water">
            <rect width="16" height="16" fill="#2e54bd" />
            <rect x="4" y="4" width="6" height="2" fill="#5b87f5" />
            <rect x="7" y="10" width="5" height="2" fill="#8bb0ff" />
          </g>
          <g id="cg-bridge">
            <rect width="16" height="16" fill="#2e54bd" />
            <rect x="0" y="2" width="16" height="12" fill="#4f202c" />
            <rect x="1" y="3" width="14" height="10" fill="#f0b4be" />
            <rect x="1" y="7" width="14" height="2" fill="#cf8a96" />
          </g>
          <radialGradient id="cg-lantern-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe5f2" stopOpacity="0.88" />
            <stop offset="30%" stopColor="#ffc857" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#ff94c8" stopOpacity="0" />
          </radialGradient>
          {CHERRY_GRID.patterns}
        </defs>

        {CHERRY_GRID.rects}

        {/* Koi pond lily pads + Tree trunks */}
        <rect x="832" y="318" width="10" height="8" fill="#25752a" />
        <rect x="834" y="320" width="5" height="4" fill="#4fc755" />
        <rect x="872" y="400" width="10" height="8" fill="#25752a" />
        <rect x="64" y="76" width="10" height="18" fill="#29121a" />
        <rect x="920" y="92" width="10" height="18" fill="#29121a" />
        <rect x="920" y="656" width="10" height="18" fill="#29121a" />

        {/* Stone Lanterns with Soft Halo */}
        {CHERRY_LANTERNS.map((lamp, idx) => (
          <g key={`cg-lamp-${idx}`} transform={`translate(${lamp.x}, ${lamp.y})`}>
            <circle cx="8" cy="8" r="62" fill="url(#cg-lantern-halo)" className="mc-lantern-glow" />
            <rect x="4" y="4" width="8" height="10" fill="#5e6270" />
            <rect x="5" y="6" width="6" height="6" fill="#ffcf6e" />
            <rect x="6" y="7" width="4" height="4" fill="#fff7d6" />
          </g>
        ))}

        {/* Floating Cherry Recipe Card on Right Flank */}
        <g transform="translate(822, 114)">
          <rect x="0" y="0" width="48" height="48" fill="#1e222e" />
          <rect x="2" y="2" width="44" height="44" fill="#e2e8f5" />
          <rect x="4" y="4" width="40" height="40" fill="#9c351e" />
          <rect x="7" y="7" width="10" height="10" fill="#f0b4be" />
          <rect x="7" y="19" width="10" height="10" fill="#f0b4be" />
          <rect x="19" y="19" width="10" height="10" fill="#f0b4be" />
          <rect x="7" y="31" width="10" height="10" fill="#f0b4be" />
          <rect x="19" y="31" width="10" height="10" fill="#f0b4be" />
          <rect x="31" y="31" width="10" height="10" fill="#f0b4be" />
        </g>
      </svg>

      <WorldWalkers walkers={CHERRY_WALKERS} />
      <div className="mc-module-scrim mc-scrim-cherry" />
    </div>
  )
}

/* ── 3. DESIERTO DE ARENISCA (64x38 + Costados Activos + Antorchas Iluminadas) ── */
const DESERT_MAP = buildGridMap(64, 38, "S", [
  // Oasis water canals cutting through the desert
  { x: 0, y: 18, w: 64, h: 3, tile: "W" },
  { x: 10, y: 0, w: 3, h: 38, tile: "W" },
  { x: 51, y: 0, w: 3, h: 38, tile: "W" },
  // Caravan sandstone & timber gravel roads
  { x: 0, y: 9, w: 64, h: 3, tile: "P" },
  { x: 0, y: 27, w: 64, h: 3, tile: "P" },
  { x: 30, y: 0, w: 4, h: 38, tile: "P" },
  // Bridges across the oasis canals
  { x: 9, y: 9, w: 5, h: 3, tile: "B" },
  { x: 50, y: 9, w: 5, h: 3, tile: "B" },
  { x: 9, y: 27, w: 5, h: 3, tile: "B" },
  { x: 50, y: 27, w: 5, h: 3, tile: "B" },
  { x: 30, y: 18, w: 4, h: 3, tile: "B" },
  // Lush oasis greenery & farms along canal banks
  { x: 14, y: 16, w: 12, h: 2, tile: "G" },
  { x: 38, y: 16, w: 12, h: 2, tile: "G" },
  { x: 14, y: 21, w: 12, h: 2, tile: "G" },
  { x: 38, y: 21, w: 12, h: 2, tile: "G" },
  { x: 54, y: 22, w: 9, h: 5, tile: "F" },
  { x: 55, y: 23, w: 7, h: 3, tile: "G" },
  // Left & right sandstone village towers, terracotta roofs & bazaar hay
  { x: 1, y: 1, w: 8, h: 7, tile: "U" },
  { x: 2, y: 2, w: 6, h: 5, tile: "T" },
  { x: 55, y: 1, w: 8, h: 7, tile: "U" },
  { x: 56, y: 2, w: 6, h: 5, tile: "T" },
  { x: 1, y: 13, w: 7, h: 4, tile: "D" },
  { x: 2, y: 14, w: 5, h: 2, tile: "H" },
  { x: 56, y: 13, w: 7, h: 4, tile: "D" },
  { x: 57, y: 14, w: 5, h: 2, tile: "H" },
  { x: 1, y: 31, w: 8, h: 6, tile: "U" },
  { x: 3, y: 32, w: 4, h: 4, tile: "T" },
  { x: 55, y: 31, w: 8, h: 6, tile: "D" },
  { x: 57, y: 32, w: 4, h: 4, tile: "H" },
  // Center ancient sandstone temple & sunken courtyard monuments
  { x: 20, y: 2, w: 9, h: 6, tile: "D" },
  { x: 35, y: 2, w: 9, h: 6, tile: "D" },
  { x: 20, y: 31, w: 9, h: 6, tile: "U" },
  { x: 35, y: 31, w: 9, h: 6, tile: "U" },
  { x: 18, y: 12, w: 6, h: 4, tile: "H" },
  { x: 40, y: 12, w: 6, h: 4, tile: "H" },
  // Cactus clusters
  { x: 5, y: 22, w: 3, h: 3, tile: "K" },
  { x: 27, y: 23, w: 2, h: 2, tile: "K" },
  { x: 35, y: 23, w: 2, h: 2, tile: "K" },
  { x: 15, y: 33, w: 3, h: 2, tile: "K" },
  { x: 47, y: 4, w: 3, h: 3, tile: "K" },
])

const DESERT_TILES: Record<string, string> = {
  S: "ds-sand",
  D: "ds-sunken",
  T: "ds-terracotta",
  H: "ds-hay",
  K: "ds-cactus",
  W: "ds-water",
  U: "ds-sandstone-wall",
  F: "ds-fence",
  G: "ds-pasture",
  P: "ds-path",
  B: "ds-bridge",
}

const DESERT_GRID = buildMergedPatternGrid(DESERT_MAP, DESERT_TILES, "ds-sand", "ds")

const DESERT_TORCHES = [
  { x: 136, y: 138 },
  { x: 468, y: 138 },
  { x: 548, y: 138 },
  { x: 874, y: 138 },
  { x: 136, y: 422 },
  { x: 468, y: 422 },
  { x: 548, y: 422 },
  { x: 874, y: 422 },
  { x: 48, y: 280 },
  { x: 968, y: 280 },
]

const DESERT_WALKERS: WorldWalker[] = [
  {
    src: "/minecraft/avatar-minecraft-creeper-drops.png",
    alt: "Creeper merodeando cerca del oasis",
    className: "mc-walk-side-r",
    style: { left: "1.8%", top: "18%", animationDuration: "19s" },
  },
  {
    src: "/minecraft/avatar-minecraft-zombie-drops.png",
    alt: "Zombi patrullando el bazar izquierdo",
    className: "mc-walk-wide-r",
    style: { left: "3%", top: "54%", animationDuration: "25s", animationDelay: "-5s" },
  },
  {
    src: "/minecraft/avatar-minecraft-skeleton-drops.png",
    alt: "Esqueleto en las dunas izquierdas",
    className: "mc-walk-side-r",
    style: { left: "2.4%", top: "78%", animationDuration: "20s", animationDelay: "-10s" },
  },
  {
    src: "/minecraft/avatar-minecraft-enderman-drops.png",
    alt: "Enderman en el costado derecho del desierto",
    className: "mc-walk-side-l",
    style: { right: "2.2%", top: "16%", animationDuration: "18s", animationDelay: "-4s" },
  },
  {
    src: "/minecraft/avatar-minecraft-elalex88-drops.png",
    alt: "Elalex88 vigilando el corral verde",
    className: "mc-walk-wide-l",
    style: { right: "3.2%", top: "58%", animationDuration: "24s", animationDelay: "-8s" },
  },
  {
    src: "/minecraft/avatar-minecraft-vegettagaymer-drops.png",
    alt: "Vegetta recorriendo los puestos del desierto",
    className: "mc-walk-circuit",
    style: { right: "3.2%", top: "32%", animationDuration: "22s", animationDelay: "-12s" },
  },
  {
    src: "/minecraft/avatar-minecraft-willyrex-drops.png",
    alt: "Willyrex junto al corral",
    className: "mc-walk-side-l",
    style: { right: "4.2%", top: "82%", animationDuration: "17s", animationDelay: "-6s" },
  },
]

export function SandstoneOutpostPattern() {
  return (
    <div className="mc-module-bg-layer" aria-hidden="true">
      <svg
        className="mc-module-bg-svg"
        viewBox="0 0 1024 608"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id="ds-sand">
            <rect width="16" height="16" fill="#bfa675" />
            <rect x="0" y="0" width="15" height="1" fill="#decb9e" />
            <rect x="3" y="3" width="10" height="10" fill="#b39a69" />
            <rect x="15" y="0" width="1" height="16" fill="#7d6741" />
            <rect x="0" y="15" width="16" height="1" fill="#7d6741" />
          </g>
          <g id="ds-sunken">
            <rect width="16" height="16" fill="#9c875e" />
            <rect x="1" y="1" width="14" height="14" fill="#ab9468" />
          </g>
          <g id="ds-terracotta">
            <rect width="16" height="16" fill="#2e1810" />
            <rect x="1" y="1" width="14" height="14" fill="#823b26" />
            <rect x="2" y="2" width="12" height="5" fill="#994b34" />
          </g>
          <g id="ds-hay">
            <rect width="16" height="16" fill="#2e2307" />
            <rect x="1" y="1" width="14" height="14" fill="#d9ae26" />
            <rect x="1" y="3" width="14" height="2" fill="#9e1e1e" />
            <rect x="1" y="11" width="14" height="2" fill="#9e1e1e" />
          </g>
          <g id="ds-cactus">
            <rect width="16" height="16" fill="#bfa675" />
            <rect x="2" y="2" width="12" height="12" fill="#2b261b" />
            <rect x="3" y="3" width="10" height="10" fill="#4f942c" />
            <rect x="5" y="4" width="2" height="2" fill="#17330c" />
            <rect x="10" y="8" width="2" height="2" fill="#17330c" />
          </g>
          <g id="ds-water">
            <rect width="16" height="16" fill="#413b99" />
            <rect x="2" y="3" width="6" height="2" fill="#635bd4" />
            <rect x="8" y="10" width="5" height="2" fill="#8079eb" />
          </g>
          <g id="ds-sandstone-wall">
            <rect width="16" height="16" fill="#85704a" />
            <rect x="1" y="1" width="14" height="14" fill="#b39c6f" />
          </g>
          <g id="ds-fence">
            <rect width="16" height="16" fill="#bfa675" />
            <rect x="1" y="6" width="14" height="4" fill="#6e4b2b" />
          </g>
          <g id="ds-pasture">
            <rect width="16" height="16" fill="#5da626" />
            <rect x="0" y="0" width="8" height="8" fill="#6ab52e" />
            <rect x="8" y="8" width="8" height="8" fill="#4e8f1d" />
          </g>
          <g id="ds-path">
            <rect width="16" height="16" fill="#a87d4b" />
            <rect x="1" y="2" width="6" height="4" fill="#c2955d" />
            <rect x="9" y="8" width="5" height="5" fill="#8f6639" />
            <rect x="3" y="10" width="4" height="3" fill="#b58952" />
          </g>
          <g id="ds-bridge">
            <rect width="16" height="16" fill="#6b4423" />
            <rect x="0" y="2" width="16" height="3" fill="#9c6838" />
            <rect x="0" y="7" width="16" height="3" fill="#8c5b30" />
            <rect x="0" y="12" width="16" height="3" fill="#9c6838" />
            <rect x="1" y="0" width="2" height="16" fill="#4f3117" />
            <rect x="13" y="0" width="2" height="16" fill="#4f3117" />
          </g>
          <radialGradient id="ds-torch-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff4b8" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffae33" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff911a" stopOpacity="0" />
          </radialGradient>
          {DESERT_GRID.patterns}
        </defs>

        {DESERT_GRID.rects}

        {/* Torches with Warm Glow */}
        {DESERT_TORCHES.map((t, idx) => (
          <g key={`ds-torch-${idx}`} transform={`translate(${t.x}, ${t.y})`}>
            <circle cx="4" cy="4" r="64" fill="url(#ds-torch-halo)" className="mc-lantern-glow" />
            <rect x="2" y="6" width="4" height="14" fill="#5e3a1c" />
            <rect x="1" y="1" width="6" height="6" fill="#ffb82b" />
            <rect x="2" y="2" width="4" height="4" fill="#fff7bd" />
          </g>
        ))}

        {/* Cows in Right Pasture */}
        <rect x="866" y="404" width="16" height="12" fill="#3d2415" />
        <rect x="871" y="406" width="6" height="5" fill="#f2ece4" />
        <rect x="928" y="432" width="14" height="12" fill="#3d2415" />
        <rect x="930" y="434" width="5" height="5" fill="#f2ece4" />

        <polygon points="0,0 260,0 1024,608 620,608 0,140" fill="#ffe4a8" opacity="0.1" />
      </svg>

      <WorldWalkers walkers={DESERT_WALKERS} />
      <div className="mc-module-scrim mc-scrim-desert" />
    </div>
  )
}

/* ── 4. BASTIÓN & PATIO DE ENTRENAMIENTO (64x38 + Costados Activos + Luminaria) ── */
const BASTION_MAP = buildGridMap(64, 38, "S", [
  { x: 14, y: 0, w: 36, h: 10, tile: "C" },
  { x: 15, y: 0, w: 7, h: 4, tile: "B" },
  { x: 42, y: 0, w: 7, h: 4, tile: "B" },
  { x: 24, y: 3, w: 16, h: 4, tile: "O" },
  { x: 1, y: 4, w: 6, h: 7, tile: "O" },
  { x: 56, y: 5, w: 7, h: 7, tile: "I" },
  { x: 2, y: 16, w: 6, h: 4, tile: "G" },
  { x: 56, y: 16, w: 6, h: 5, tile: "K" },
  { x: 2, y: 24, w: 6, h: 5, tile: "D" },
  { x: 56, y: 25, w: 6, h: 5, tile: "I" },
  { x: 4, y: 32, w: 6, h: 4, tile: "G" },
  { x: 54, y: 32, w: 6, h: 4, tile: "G" },
])

const BASTION_TILES: Record<string, string> = {
  S: "bo-sand",
  B: "bo-dark-roof",
  C: "bo-cobble",
  O: "bo-oak",
  W: "bo-wall-stone",
  I: "bo-iron-roof",
  D: "bo-sand-pit",
  G: "bo-moss",
  K: "bo-hay",
}

const BASTION_GRID = buildMergedPatternGrid(BASTION_MAP, BASTION_TILES, "bo-sand", "grid-bo")

const BASTION_TORCHES = [
  { x: 96, y: 184 },
  { x: 112, y: 468 },
  { x: 912, y: 196 },
  { x: 904, y: 472 },
]

const BASTION_WALKERS: WorldWalker[] = [
  {
    src: "/minecraft/avatar-minecraft-enderman-drops.png",
    alt: "Enderman patrullando el lado derecho",
    className: "mc-walk-side-l",
    style: { right: "2%", top: "14%", animationDuration: "18s" },
  },
  {
    src: "/minecraft/avatar-minecraft-skeleton-drops.png",
    alt: "Esqueleto en el patio izquierdo",
    className: "mc-walk-side-r",
    style: { left: "1.8%", top: "16%", animationDuration: "20s", animationDelay: "-5s" },
  },
  {
    src: "/minecraft/avatar-minecraft-creeper-drops.png",
    alt: "Creeper junto a los blancos de entrenamiento",
    className: "mc-walk-wide-r",
    style: { left: "3%", top: "56%", animationDuration: "25s", animationDelay: "-9s" },
  },
  {
    src: "/minecraft/avatar-minecraft-zombie-drops.png",
    alt: "Zombi recorriendo el borde derecho",
    className: "mc-walk-wide-l",
    style: { right: "3%", top: "54%", animationDuration: "24s", animationDelay: "-3s" },
  },
  {
    src: "/minecraft/avatar-minecraft-alexby11-drops.png",
    alt: "Alexby11 en el bastión izquierdo",
    className: "mc-walk-side-r",
    style: { left: "2.4%", top: "76%", animationDuration: "19s", animationDelay: "-11s" },
  },
  {
    src: "/minecraft/avatar-minecraft-atomicnugget24-drops(1).png",
    alt: "Atomicnugget24 en la zona de entrenamiento",
    className: "mc-walk-side-l",
    style: { right: "2.4%", top: "76%", animationDuration: "18s", animationDelay: "-7s" },
  },
  {
    src: "/minecraft/avatar-minecraft-lwcho-drops(1).png",
    alt: "Lwcho patrullando la entrada del bastión",
    className: "mc-walk-circuit",
    style: { right: "4.6%", top: "30%", animationDuration: "22s", animationDelay: "-6s" },
  },
]

export function BastionOutpostPattern() {
  return (
    <div className="mc-module-bg-layer" aria-hidden="true">
      <svg
        className="mc-module-bg-svg"
        viewBox="0 0 1024 608"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id="bo-sand">
            <rect width="16" height="16" fill="#d49c46" />
            <rect x="2" y="2" width="12" height="3" fill="#e0aa55" />
            <rect x="4" y="9" width="10" height="3" fill="#c78e3a" />
          </g>
          <g id="bo-sand-pit">
            <rect width="16" height="16" fill="#ad772d" />
            <rect x="2" y="2" width="12" height="12" fill="#c78d3c" />
          </g>
          <g id="bo-cobble">
            <rect width="16" height="16" fill="#505461" />
            <rect x="1" y="1" width="6" height="6" fill="#6b7080" />
            <rect x="8" y="1" width="7" height="5" fill="#5e6270" />
            <rect x="1" y="8" width="8" height="7" fill="#616675" />
            <rect x="10" y="7" width="5" height="8" fill="#707585" />
          </g>
          <g id="bo-oak">
            <rect width="16" height="16" fill="#2e1d12" />
            <rect x="1" y="1" width="14" height="3" fill="#6e482b" />
            <rect x="1" y="5" width="14" height="3" fill="#593a24" />
            <rect x="1" y="9" width="14" height="3" fill="#634028" />
            <rect x="1" y="13" width="14" height="2" fill="#472d1b" />
          </g>
          <g id="bo-dark-roof">
            <rect width="16" height="16" fill="#21120a" />
            <rect x="1" y="1" width="14" height="6" fill="#452817" />
            <rect x="1" y="8" width="14" height="6" fill="#381f11" />
          </g>
          <g id="bo-wall-stone">
            <rect width="16" height="16" fill="#454954" />
            <rect x="2" y="2" width="12" height="12" fill="#686d7d" />
          </g>
          <g id="bo-iron-roof">
            <rect width="16" height="16" fill="#616573" />
            <rect x="0" y="0" width="16" height="3" fill="#9ea3b5" />
            <rect x="2" y="4" width="12" height="10" fill="#7c8091" />
          </g>
          <g id="bo-moss">
            <rect width="16" height="16" fill="#637039" />
            <rect x="2" y="3" width="6" height="4" fill="#7a8a48" />
          </g>
          <g id="bo-hay">
            <rect width="16" height="16" fill="#d9ae26" />
            <rect x="1" y="3" width="14" height="2" fill="#9e1e1e" />
            <rect x="1" y="11" width="14" height="2" fill="#9e1e1e" />
          </g>
          <radialGradient id="bo-torch-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff4b8" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#ffae33" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ff911a" stopOpacity="0" />
          </radialGradient>
          {BASTION_GRID.patterns}
        </defs>

        {BASTION_GRID.rects}

        {/* Ominous Banners */}
        {[246, 336, 650, 740].map((bx, idx) => (
          <g key={`banner-${idx}`} transform={`translate(${bx}, 12)`}>
            <rect width="20" height="34" fill="#181a20" />
            <rect x="2" y="2" width="16" height="28" fill="#525766" />
            <rect x="4" y="12" width="4" height="4" fill="#2ee86c" />
            <rect x="12" y="12" width="4" height="4" fill="#2ee86c" />
            <rect x="7" y="17" width="6" height="8" fill="#272930" />
          </g>
        ))}

        {/* Carved-Pumpkin Training Dummies on Uncovered Flanks */}
        {[
          { x: 56, y: 214 },
          { x: 48, y: 392 },
          { x: 930, y: 222 },
          { x: 924, y: 404 },
        ].map((dummy, idx) => (
          <g key={`dummy-${idx}`} transform={`translate(${dummy.x}, ${dummy.y})`}>
            <rect x="2" y="10" width="24" height="6" fill="#4f2f16" />
            <rect x="11" y="14" width="6" height="16" fill="#4f2f16" />
            <rect x="6" y="2" width="16" height="16" fill="#291205" />
            <rect x="8" y="4" width="12" height="12" fill="#eb7c1e" />
            <rect x="10" y="6" width="8" height="4" fill="#ff9d3b" />
          </g>
        ))}

        {/* Bastion Torch Halos */}
        {BASTION_TORCHES.map((t, idx) => (
          <g key={`bo-torch-${idx}`} transform={`translate(${t.x}, ${t.y})`}>
            <circle cx="4" cy="4" r="64" fill="url(#bo-torch-halo)" className="mc-lantern-glow" />
            <rect x="2" y="6" width="4" height="14" fill="#4a2e16" />
            <rect x="1" y="1" width="6" height="6" fill="#ffb82b" />
            <rect x="2" y="2" width="4" height="4" fill="#fff7bd" />
          </g>
        ))}

        {/* Glowing XP Orbs */}
        <rect x="122" y="344" width="6" height="6" fill="#2ee86c" />
        <rect x="896" y="340" width="6" height="6" fill="#2ee86c" />

        {/* Diagonal Warm Sunlight Beams */}
        <polygon points="0,0 190,0 792,608 510,608 0,56" fill="#ffdfa8" opacity="0.12" />
        <polygon points="360,0 590,0 1024,420 1024,608 910,608 360,28" fill="#ffdfa8" opacity="0.09" />
      </svg>

      <WorldWalkers walkers={BASTION_WALKERS} />
      <div className="mc-module-scrim mc-scrim-bastion" />
    </div>
  )
}

/* ── 4B. ARENA DE ACTIVIDADES & TORNEOS (64x38 Bloques — Vista distante) ── */
const ARENA_MAP = buildGridMap(64, 38, "M", [
  // Dense pine/moss forest flanks on both sides
  { x: 0, y: 0, w: 6, h: 38, tile: "F" },
  { x: 58, y: 0, w: 6, h: 38, tile: "F" },
  // Coliseo outer stone perimeter & cobblestone battlement
  { x: 7, y: 2, w: 50, h: 34, tile: "C" },
  { x: 9, y: 4, w: 46, h: 30, tile: "S" },
  // Ceremonial canal / water moat framing left & right wings
  { x: 6, y: 0, w: 2, h: 38, tile: "W" },
  { x: 56, y: 0, w: 2, h: 38, tile: "W" },
  // Cross-roads & timber moat bridges
  { x: 0, y: 17, w: 64, h: 4, tile: "P" },
  { x: 30, y: 0, w: 4, h: 38, tile: "P" },
  { x: 6, y: 17, w: 2, h: 4, tile: "B" },
  { x: 56, y: 17, w: 2, h: 4, tile: "B" },
  // Quad tournament banners (Emerald Guild & Amber Trophy)
  { x: 12, y: 7, w: 15, h: 8, tile: "G" },
  { x: 37, y: 7, w: 15, h: 8, tile: "A" },
  { x: 12, y: 23, w: 15, h: 8, tile: "G" },
  { x: 37, y: 23, w: 15, h: 8, tile: "A" },
  // Amethyst CTF command tents in the outer clearings
  { x: 1, y: 6, w: 4, h: 6, tile: "T" },
  { x: 59, y: 6, w: 4, h: 6, tile: "T" },
  { x: 1, y: 26, w: 4, h: 6, tile: "T" },
  { x: 59, y: 26, w: 4, h: 6, tile: "T" },
  // Lit corner & gatehouse braziers
  { x: 9, y: 3, w: 2, h: 2, tile: "R" },
  { x: 53, y: 3, w: 2, h: 2, tile: "R" },
  { x: 9, y: 33, w: 2, h: 2, tile: "R" },
  { x: 53, y: 33, w: 2, h: 2, tile: "R" },
  { x: 27, y: 15, w: 2, h: 2, tile: "R" },
  { x: 35, y: 15, w: 2, h: 2, tile: "R" },
  { x: 27, y: 21, w: 2, h: 2, tile: "R" },
  { x: 35, y: 21, w: 2, h: 2, tile: "R" },
])

const ARENA_TILES: Record<string, string> = {
  M: "ar-moss",
  F: "ar-forest",
  C: "ar-cobble",
  S: "ar-stone",
  P: "ar-path",
  W: "ar-water",
  B: "ar-bridge",
  G: "ar-banner-g",
  A: "ar-banner-a",
  T: "ar-tent",
  R: "ar-brazier",
}

const ARENA_GRID = buildMergedPatternGrid(ARENA_MAP, ARENA_TILES, "ar-moss", "grid-ar")

const ARENA_LANTERNS = [
  { x: 152, y: 56 },
  { x: 856, y: 56 },
  { x: 152, y: 536 },
  { x: 856, y: 536 },
  { x: 440, y: 248 },
  { x: 568, y: 248 },
  { x: 440, y: 344 },
  { x: 568, y: 344 },
]

const ARENA_WALKERS: WorldWalker[] = [
  {
    src: "/minecraft/avatar-minecraft-lwcho-drops(1).png",
    alt: "Lwcho patrullando el pasillo izquierdo de Actividades",
    className: "mc-walk-side-r",
    style: { left: "1.8%", top: "18%", animationDuration: "18s" },
  },
  {
    src: "/minecraft/avatar-minecraft-alex-drops.png",
    alt: "Alex recorriendo el sendero de la arena",
    className: "mc-walk-wide-r",
    style: { left: "2.8%", top: "46%", animationDuration: "24s", animationDelay: "-5s" },
  },
  {
    src: "/minecraft/avatar-minecraft-vegettagaymer-drops.png",
    alt: "Vegetta en el pabellón izquierdo",
    className: "mc-walk-side-r",
    style: { left: "2.2%", top: "76%", animationDuration: "21s", animationDelay: "-9s" },
  },
  {
    src: "/minecraft/avatar-minecraft-steve-drops.png",
    alt: "Steve vigilando el lado derecho de Actividades",
    className: "mc-walk-side-l",
    style: { right: "2%", top: "16%", animationDuration: "19s", animationDelay: "-3s" },
  },
  {
    src: "/minecraft/avatar-minecraft-atomicnugget24-drops(1).png",
    alt: "Atomicnugget24 atravesando el cruce co-op",
    className: "mc-walk-wide-l",
    style: { right: "2.8%", top: "48%", animationDuration: "25s", animationDelay: "-8s" },
  },
  {
    src: "/minecraft/avatar-minecraft-creeper-drops.png",
    alt: "Creeper junto a los trofeos del coliseo",
    className: "mc-walk-side-l",
    style: { right: "2.4%", top: "78%", animationDuration: "20s", animationDelay: "-11s" },
  },
]

export function ActividadesArenaPattern() {
  return (
    <div className="mc-module-bg-layer" aria-hidden="true">
      <svg
        className="mc-module-bg-svg"
        viewBox="0 0 1024 608"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id="ar-moss">
            <rect width="16" height="16" fill="#2c5922" />
            <rect x="0" y="0" width="8" height="8" fill="#376e2b" />
            <rect x="10" y="9" width="4" height="4" fill="#468537" />
          </g>
          <g id="ar-forest">
            <rect width="16" height="16" fill="#183614" />
            <rect x="2" y="2" width="6" height="6" fill="#244f1e" />
            <rect x="9" y="8" width="5" height="5" fill="#2b5e24" />
          </g>
          <g id="ar-cobble">
            <rect width="16" height="16" fill="#464b59" />
            <rect x="1" y="1" width="6" height="6" fill="#5e6578" />
            <rect x="9" y="2" width="6" height="5" fill="#545a6b" />
            <rect x="2" y="9" width="7" height="6" fill="#585e70" />
          </g>
          <g id="ar-stone">
            <rect width="16" height="16" fill="#2b2f3b" />
            <rect x="1" y="1" width="14" height="14" fill="#353a47" />
            <rect x="2" y="2" width="12" height="2" fill="#484f61" />
          </g>
          <g id="ar-path">
            <rect width="16" height="16" fill="#9c6c3b" />
            <rect x="2" y="3" width="5" height="3" fill="#b88149" />
            <rect x="10" y="10" width="4" height="3" fill="#82572c" />
          </g>
          <g id="ar-water">
            <rect width="16" height="16" fill="#2d4fa3" />
            <rect x="2" y="4" width="6" height="2" fill="#4f75d9" />
            <rect x="8" y="11" width="5" height="2" fill="#7da0ff" />
          </g>
          <g id="ar-bridge">
            <rect width="16" height="16" fill="#633c1b" />
            <rect x="1" y="2" width="14" height="3" fill="#945c2c" />
            <rect x="1" y="7" width="14" height="3" fill="#7d4c23" />
            <rect x="1" y="12" width="14" height="3" fill="#945c2c" />
          </g>
          <g id="ar-banner-g">
            <rect width="16" height="16" fill="#1d4d2c" />
            <rect x="2" y="2" width="12" height="12" fill="#28703f" />
            <rect x="4" y="4" width="8" height="8" fill="#36a65a" />
          </g>
          <g id="ar-banner-a">
            <rect width="16" height="16" fill="#573914" />
            <rect x="2" y="2" width="12" height="12" fill="#8c5a1c" />
            <rect x="4" y="4" width="8" height="8" fill="#d99a26" />
          </g>
          <g id="ar-tent">
            <rect width="16" height="16" fill="#40236e" />
            <rect x="1" y="1" width="14" height="14" fill="#6338ad" />
            <rect x="3" y="3" width="10" height="3" fill="#9669f0" />
          </g>
          <g id="ar-brazier">
            <rect width="16" height="16" fill="#332e2c" />
            <rect x="3" y="3" width="10" height="10" fill="#ff8424" />
            <rect x="5" y="5" width="6" height="6" fill="#ffe478" />
          </g>
          <radialGradient id="ar-lantern-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff2b0" stopOpacity="0.92" />
            <stop offset="30%" stopColor="#4fe38a" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#ff9a2e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff9a2e" stopOpacity="0" />
          </radialGradient>
          {ARENA_GRID.patterns}
        </defs>
        {ARENA_GRID.rects}
        {ARENA_LANTERNS.map((lamp, idx) => (
          <g key={`ar-lamp-${idx}`}>
            <circle cx={lamp.x} cy={lamp.y} r="72" fill="url(#ar-lantern-halo)" />
            <rect x={lamp.x - 4} y={lamp.y - 4} width="8" height="8" fill="#ffe680" />
          </g>
        ))}
      </svg>
      <WorldWalkers walkers={ARENA_WALKERS} />
      <div className="mc-module-scrim mc-scrim-arena" />
    </div>
  )
}

/* ── 5. TRANSICIONES ENTRE MÓDULOS (64x4 Bloques graduados a distancia) ── */
const TRANSITION_CONFIG: Record<
  BiomeTransitionVariant,
  {
    tiles: Record<string, string>
    rows: string[]
  }
> = {
  "hero-to-village": {
    tiles: {
      H: "stone-purple",
      U: "grate-gold",
      P: "path",
      G: "grass",
      W: "water",
    },
    rows: [
      "HHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUHHUH",
      "HHGGUUHHPPGHUHHWWUHHGGUHHPPHUGGHUHHWWGGUHHGGUUHHGGUHHGGUHHPPGGUH",
      "GGGPPGGGGGGGGGGWWGGGGGGGGPPGGGGGGGGWWGGGGGGPPGGGGGGGGGGGGGPPGGGG",
      "GGGGGGGGGGGGGGGWWGGGGGGGGPPGGGGGGGGWWGGGGGGGGGGGGGGGGGGGGGPPGGGG",
    ],
  },
  "village-to-arena": {
    tiles: {
      G: "grass",
      P: "path",
      W: "water",
      C: "cobble",
      O: "dark-oak",
    },
    rows: [
      "GGGGPPPPGGGGWWGGGGGGPPGGGGGGPPPPGGGGWWGGGGGGGGPPPPGGGGGGGGPPGGGG",
      "GGCGPPGCGGOCWWGCCGGGPPGGCCGGPPGCGGOCWWGCGCCGGGPPGGGCGGGGCGPPGCCG",
      "CCCCOOCOCCCCCOCGGCCCOOCOCCCCCOCGGCCCOOCOCCCCCOCGGCCCOOCOCCCCCOCG",
      "CCCOOCCCCCOCCCCOCCCCCOCCCCOOCCCCCOCCCCOCCCCCOCCCCOOCCCCCOCCCCOCC",
    ],
  },
  "arena-to-library": {
    tiles: {
      C: "cobble",
      P: "path",
      O: "dark-oak",
      L: "obsidian",
      B: "bookshelf",
    },
    rows: [
      "CCCCPPPPCCCCOOCCCCCCPPCCCCCCPPPPCCCCOOCCCCCCCCPPPPCCCCCCCCPPCCCC",
      "CCCLPPCLCLOBOOCLLGGGPPGGLLGGPPCLCLBBOOCLCLLGGGPPGGCLCCCCLCPPCLLC",
      "LLLLBBLBLLLLLLBLLLBBLLLLLLLLBBLBLLLLBBLLLLLBBLLLLLLBBBLLLLBBLLLL",
      "LLLBBBBLLLLBBLLLLBBBBLLLLLBBBBLLLLBBLLLLLBBBBLLLLLLBBBLLLLBBBBLL",
    ],
  },
  "library-to-cherry": {
    tiles: {
      L: "obsidian",
      B: "bookshelf",
      C: "cherry-leaves",
      G: "cherry-grass",
      P: "path",
    },
    rows: [
      "LLBBLLLBBLLLBBLLLBLLLLBBLLLBBLLLBBLLLBLLLLBBLLLBBLLLBBLLLLBBLLLB",
      "LCGLLCGGCLBGGCLCGCLGPPBLLCGLLCGGCLBGGCLCGCLGPPBLLCGLLCGGCLBGGCLC",
      "CCCCGGGGGGGGCCCCGGGGPPGGCCCCGGGGGGGGCCCCGGGGPPGGCCCCGGGGGGGGCCCC",
      "CCCCCCGGGGGGCCCCCCGGPPGGGGCCCCCCGGGGCCCCCCGGPPGGGGCCCCCCGGGGGGCC",
    ],
  },
  "cherry-to-desert": {
    tiles: {
      C: "cherry-leaves",
      G: "cherry-grass",
      P: "path",
      S: "sand",
      H: "hay",
    },
    rows: [
      "CCCCGGGGPPPGGGGGGCCCGGGGCCCCGGGGPPPGGGGGGCCCGGGGCCCCGGGGPPPGGGGG",
      "GSCGGSSGPPGSSCGSHSGSSGCGGSCGGSSGPPGSSCGSHSGSSGCGGSCGGSSGPPGSSCGH",
      "SSSSSSSSPPSSSSSHHSSSSSSSSSSSSSSSPPSSSSSHHSSSSSSSSSSSSSSSPPSSSSSH",
      "SSSSSSSSPPSSSSSHHSSSSSSSSSSSSSSSPPSSSSSHHSSSSSSSSSSSSSSSPPSSSSSH",
    ],
  },
  "desert-to-bastion": {
    tiles: {
      S: "sand",
      H: "hay",
      D: "sunken-sand",
      C: "cobble",
      O: "dark-oak",
    },
    rows: [
      "SSSSHHSSSSDDSSSSSSSDDSSSSSSSHHSSSSDDSSSSSSSDDSSSSSSSHHSSSSDDSSSS",
      "SSCSDDSSCCSDCSOCSSSDCCSSSSCSDDSSCCSDCSOCSSSDCCSSSSCSDDSSCCSDCSOC",
      "CCCCCCOOOCCCCCCOOOCCCCCCCCCCCCOOOCCCCCCOOOCCCCCCCCCCCCOOOCCCCCCC",
      "CCCCCCOOOCCCCCCOOOCCCCCCCCCCCCOOOCCCCCCOOOCCCCCCCCCCCCOOOCCCCCCC",
    ],
  },
}

const TRANSITION_GRIDS = Object.fromEntries(
  (Object.keys(TRANSITION_CONFIG) as BiomeTransitionVariant[]).map((variant) => {
    const { tiles, rows } = TRANSITION_CONFIG[variant]
    const idPrefix = `tr-${variant}`
    const prefixedTiles = Object.fromEntries(Object.entries(tiles).map(([k, v]) => [k, `${idPrefix}-${v}`]))
    return [variant, buildMergedPatternGrid(rows, prefixedTiles, `${idPrefix}-stone-purple`, idPrefix)]
  }),
) as Record<BiomeTransitionVariant, MergedPatternGrid>

export function BiomeTransitionStrip({ variant }: { variant: BiomeTransitionVariant }) {
  const idPrefix = `tr-${variant}`
  const grid = TRANSITION_GRIDS[variant]

  return (
    <div className="mc-biome-transition" aria-hidden="true">
      <svg
        className="mc-biome-transition-svg"
        viewBox="0 0 1024 64"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <g id={`${idPrefix}-stone-purple`}>
            <rect width="16" height="16" fill="#250b4f" />
            <rect x="2" y="2" width="12" height="12" fill="#5e616e" />
            <rect x="3" y="3" width="10" height="2" fill="#828696" />
          </g>
          <g id={`${idPrefix}-grate-gold`}>
            <rect width="16" height="16" fill="#250b4f" />
            <rect x="1" y="1" width="14" height="14" fill="#d4aa3b" />
            <rect x="3" y="3" width="10" height="10" fill="#230b42" />
            <rect x="5" y="5" width="2" height="2" fill="#ffcf4d" />
            <rect x="9" y="9" width="2" height="2" fill="#ffcf4d" />
          </g>
          <g id={`${idPrefix}-grass`}>
            <rect width="16" height="16" fill="#478020" />
            <rect x="0" y="0" width="8" height="8" fill="#529127" />
            <rect x="8" y="8" width="8" height="8" fill="#3f731b" />
          </g>
          <g id={`${idPrefix}-path`}>
            <rect width="16" height="16" fill="#a87742" />
            <rect x="3" y="3" width="4" height="3" fill="#bf8b50" />
            <rect x="9" y="9" width="5" height="3" fill="#916535" />
          </g>
          <g id={`${idPrefix}-water`}>
            <rect width="16" height="16" fill="#2d3db3" />
            <rect x="4" y="4" width="6" height="2" fill="#4861d6" />
            <rect x="7" y="10" width="5" height="2" fill="#627af2" />
          </g>
          <g id={`${idPrefix}-obsidian`}>
            <rect width="16" height="16" fill="#170b2b" />
            <rect x="2" y="2" width="5" height="5" fill="#2e1854" />
            <rect x="9" y="8" width="5" height="5" fill="#3f2173" />
          </g>
          <g id={`${idPrefix}-bookshelf`}>
            <rect width="16" height="16" fill="#4d2c15" />
            <rect x="1" y="1" width="14" height="14" fill="#784a28" />
            <rect x="2" y="2" width="3" height="5" fill="#2ee86c" />
            <rect x="6" y="2" width="3" height="5" fill="#b473ff" />
            <rect x="10" y="2" width="3" height="5" fill="#ff9d26" />
            <rect x="2" y="9" width="4" height="5" fill="#38b6ff" />
            <rect x="7" y="9" width="6" height="5" fill="#e65353" />
          </g>
          <g id={`${idPrefix}-cherry-leaves`}>
            <rect width="16" height="16" fill="#e67cb0" />
            <rect x="4" y="3" width="2" height="4" fill="#ffcce6" />
            <rect x="3" y="4" width="4" height="2" fill="#ffcce6" />
            <rect x="10" y="9" width="2" height="4" fill="#ffb8db" />
            <rect x="9" y="10" width="4" height="2" fill="#ffb8db" />
          </g>
          <g id={`${idPrefix}-cherry-grass`}>
            <rect width="16" height="16" fill="#4f9120" />
            <rect x="3" y="4" width="3" height="2" fill="#ffd6ec" />
            <rect x="11" y="10" width="2" height="2" fill="#ffdf33" />
          </g>
          <g id={`${idPrefix}-sand`}>
            <rect width="16" height="16" fill="#bfa675" />
            <rect x="3" y="3" width="10" height="10" fill="#b39a69" />
            <rect x="15" y="0" width="1" height="16" fill="#7d6741" />
          </g>
          <g id={`${idPrefix}-sunken-sand`}>
            <rect width="16" height="16" fill="#9c875e" />
            <rect x="2" y="2" width="12" height="12" fill="#ab9468" />
          </g>
          <g id={`${idPrefix}-hay`}>
            <rect width="16" height="16" fill="#d9ae26" />
            <rect x="1" y="3" width="14" height="2" fill="#9e1e1e" />
            <rect x="1" y="11" width="14" height="2" fill="#9e1e1e" />
          </g>
          <g id={`${idPrefix}-cobble`}>
            <rect width="16" height="16" fill="#505461" />
            <rect x="1" y="1" width="6" height="6" fill="#6b7080" />
            <rect x="9" y="8" width="6" height="6" fill="#707585" />
          </g>
          <g id={`${idPrefix}-dark-oak`}>
            <rect width="16" height="16" fill="#2e1d12" />
            <rect x="1" y="1" width="14" height="6" fill="#593a24" />
            <rect x="1" y="9" width="14" height="6" fill="#472d1b" />
          </g>
          {grid.patterns}
        </defs>
        {grid.rects}
      </svg>
      <div className="mc-biome-transition-shade" />
    </div>
  )
}
