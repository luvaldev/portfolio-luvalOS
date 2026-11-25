"use client"

import { useEffect, useRef } from "react"

export interface TntBuildTransitionProps {
  active: boolean
  targetWorld: "minecraft" | "normal"
  origin?: { x: number; y: number } | null
  onMidpointSwap: () => void
  onComplete: () => void
}

type BlockKind =
  | "grass"
  | "dirt"
  | "stone"
  | "obsidian"
  | "crying_obsidian"
  | "amethyst"
  | "diamond_ore"
  | "emerald_ore"
  | "command"
  | "tnt"

interface SmokePuff {
  xOffset: number
  yOffset: number
  vx: number
  vy: number
  baseSize: number
  maxSize: number
  delay: number
  life: number
  color: string
}

interface EmberParticle {
  angle: number
  speed: number
  size: number
  delay: number
  life: number
  color: string
  gravity: number
}

interface DebrisChunk {
  angle: number
  speed: number
  vyBoost: number
  size: number
  delay: number
  life: number
  kind: BlockKind
}

interface MiniExplosion {
  triggerMs: number
  fuseMs: number
  xRatio: number
  smoke: SmokePuff[]
  embers: EmberParticle[]
  debris: DebrisChunk[]
}

interface XpOrb {
  xRatio: number
  yStartRatio: number
  vx: number
  vy: number
  size: number
  delay: number
  life: number
  color: string
  coreColor: string
}

interface FrontierBlock {
  col: number
  row: number
  x: number
  y: number
  kind: BlockKind
  colWaveOffset: number
  cellJitter: number
}

interface PortalVortexParticle {
  baseAngle: number
  startRadiusRatio: number
  angularSpeed: number
  delay: number
  life: number
  color: string
  trailColor: string
}

interface PortalSpark {
  angle: number
  speed: number
  size: number
  delay: number
  life: number
  color: string
}

interface ObsidianFrameTile {
  x: number
  y: number
  size: number
  isCorner: boolean
  isCrying: boolean
  phaseOffset: number
  inDelay: number
  outDelay: number
}

interface ObsidianGlint {
  x: number
  y: number
  size: number
  speed: number
  phase: number
  color: string
}

interface PortalSceneData {
  cx: number
  cy: number
  maxRadius: number
  particles: PortalVortexParticle[]
  sparks: PortalSpark[]
  frameTiles: ObsidianFrameTile[]
  glints: ObsidianGlint[]
}

interface SceneData {
  vw: number
  vh: number
  cellSize: number
  cols: number
  rows: number
  originX: number
  originY: number
  targetX: number
  targetY: number
  frontierBlocks: FrontierBlock[]
  primarySmoke: SmokePuff[]
  primaryEmbers: EmberParticle[]
  primaryDebris: DebrisChunk[]
  miniExplosions: MiniExplosion[]
  xpOrbs: XpOrb[]
  portal: PortalSceneData
}

const SMOKE_COLORS = ["#ffffff", "#e4e4e7", "#71717a", "#27272a"] as const
const EMBER_COLORS = ["#ff6b1a", "#ffcf4d", "#ff3b3b", "#ffe999"] as const
const XP_COLORS = ["#70f527", "#2ee86c", "#d4ff33", "#ffcf4d", "#ffe670"] as const
const BURST_COLORS = ["#2ee86c", "#70f527", "#b53cff", "#df96ff", "#ffcf4d"] as const
const PORTAL_COLORS = ["#3b0764", "#7e22ce", "#a855f7", "#e879f9", "#f5d0fe"] as const

const MINECRAFT_TOTAL_MS = 4200
const PRIMARY_EXPLOSION_START_MS = 900
const PRIMARY_EXPLOSION_PEAK_MS = 1040
const PRIMARY_EXPLOSION_END_MS = 1380
const MINECRAFT_MIDPOINT_MS = 1050
const BUILD_START_MS = 1100
const BUILD_END_MS = 3400

const NORMAL_TOTAL_MS = 2200
const NORMAL_MIDPOINT_MS = 1150

const REDUCED_TOTAL_MS = 650
const REDUCED_MIDPOINT_MS = 325

let cachedSprites: Record<BlockKind, HTMLCanvasElement> | null = null
let cachedPortalIcon: HTMLCanvasElement | null = null

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v
}

function easeOutCubic(t: number): number {
  const u = clamp(t, 0, 1)
  return 1 - (1 - u) * (1 - u) * (1 - u)
}

function easeInOutCubic(t: number): number {
  const u = clamp(t, 0, 1)
  return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2d(col: number, row: number, seed: number): number {
  let h = (col * 374761393 + row * 668265263 + seed * 1442695041) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function resolvePixelFontFamily(): string {
  if (typeof window === "undefined") {
    return "monospace"
  }
  const cssVar = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-pixel")
    .trim()
  return cssVar ? `${cssVar}, "Silkscreen", monospace` : `"Silkscreen", monospace`
}

function createSpriteCanvas(draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.imageSmoothingEnabled = false
    draw(ctx)
  }
  return canvas
}

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

function addBlockBevel(ctx: CanvasRenderingContext2D, light: string, dark: string) {
  ctx.fillStyle = light
  ctx.fillRect(0, 0, 16, 1)
  ctx.fillRect(0, 0, 1, 16)
  ctx.fillStyle = dark
  ctx.fillRect(0, 15, 16, 1)
  ctx.fillRect(15, 0, 1, 16)
}

function paintTexturedBase(
  ctx: CanvasRenderingContext2D,
  palette: readonly string[],
  seed: number,
  horizontalBias = false
) {
  const rng = mulberry32(seed)
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const n = horizontalBias ? rng() * 0.65 + ((x + y * 3) % 4) * 0.09 : rng()
      const idx = Math.min(palette.length - 1, Math.floor(n * palette.length))
      px(ctx, x, y, 1, 1, palette[idx])
    }
  }
}

function getBlockSprites(): Record<BlockKind, HTMLCanvasElement> {
  if (cachedSprites) return cachedSprites

  const dirtPalette = ["#8a5a36", "#74492a", "#9c6841", "#5e391f", "#7d6859"] as const
  const stonePalette = ["#7d7d7d", "#6c6c6c", "#8f8f8f", "#5b5b5b", "#9e9e9e"] as const
  const obsidianPalette = ["#140c21", "#1d1130", "#291842", "#0c0714", "#382159"] as const
  const amethystPalette = ["#7339c9", "#8e52e6", "#ab73f7", "#532499", "#cfa6ff"] as const

  const grass = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, dirtPalette, 202)
    const grassPalette = ["#4ca82c", "#5fc439", "#3c8c20", "#73db48"] as const
    const rng = mulberry32(203)
    const dripHeights = [4, 5, 4, 3, 5, 6, 4, 3, 5, 4, 6, 5, 3, 4, 5, 4]
    for (let x = 0; x < 16; x++) {
      const h = dripHeights[x]
      for (let y = 0; y < h; y++) {
        const c = y === 0 ? "#73db48" : grassPalette[Math.floor(rng() * grassPalette.length)]
        px(ctx, x, y, 1, 1, c)
      }
      px(ctx, x, h, 1, 1, "#3d2514")
    }
    addBlockBevel(ctx, "rgba(220,255,190,0.2)", "rgba(18,12,6,0.34)")
  })

  const dirt = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, dirtPalette, 101)
    px(ctx, 3, 4, 2, 1, "#5e5753")
    px(ctx, 11, 9, 2, 2, "#4f4945")
    px(ctx, 6, 12, 2, 1, "#827973")
    addBlockBevel(ctx, "rgba(255,220,180,0.12)", "rgba(20,10,5,0.32)")
  })

  const stone = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, stonePalette, 303, true)
    px(ctx, 2, 3, 4, 1, "#a6a6a6")
    px(ctx, 9, 7, 5, 1, "#545454")
    px(ctx, 3, 11, 5, 1, "#626262")
    addBlockBevel(ctx, "rgba(255,255,255,0.14)", "rgba(0,0,0,0.28)")
  })

  const obsidian = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, obsidianPalette, 404)
    px(ctx, 2, 2, 3, 2, "#462870")
    px(ctx, 9, 5, 3, 3, "#090510")
    px(ctx, 4, 10, 4, 2, "#351e54")
    px(ctx, 11, 11, 2, 3, "#4e2e7a")
    addBlockBevel(ctx, "rgba(180,130,255,0.14)", "rgba(0,0,0,0.45)")
  })

  const crying_obsidian = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, obsidianPalette, 505)
    px(ctx, 2, 3, 2, 4, "#9d2ef2")
    px(ctx, 2, 4, 1, 2, "#e88cff")
    px(ctx, 3, 7, 1, 2, "#7418bd")
    px(ctx, 10, 2, 3, 2, "#b53cff")
    px(ctx, 11, 4, 2, 4, "#df78ff")
    px(ctx, 11, 5, 1, 2, "#ffd1ff")
    px(ctx, 6, 10, 3, 3, "#8a22db")
    px(ctx, 7, 11, 2, 2, "#e88cff")
    addBlockBevel(ctx, "rgba(220,160,255,0.18)", "rgba(0,0,0,0.45)")
  })

  const amethyst = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, amethystPalette, 606)
    px(ctx, 2, 2, 4, 2, "#e4c9ff")
    px(ctx, 3, 3, 2, 2, "#ffffff")
    px(ctx, 9, 4, 4, 3, "#bc8cff")
    px(ctx, 10, 5, 2, 1, "#f4e8ff")
    px(ctx, 4, 9, 5, 3, "#4e2091")
    px(ctx, 5, 10, 2, 2, "#c99eff")
    addBlockBevel(ctx, "rgba(245,225,255,0.24)", "rgba(30,10,60,0.38)")
  })

  const diamond_ore = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, stonePalette, 707, true)
    const clusters: Array<[number, number]> = [
      [3, 3],
      [10, 4],
      [6, 8],
      [11, 11],
      [2, 11],
    ]
    for (const [cx, cy] of clusters) {
      px(ctx, cx, cy, 3, 2, "#18a5d8")
      px(ctx, cx, cy, 2, 2, "#3be0ff")
      px(ctx, cx + 1, cy, 1, 1, "#aef9ff")
    }
    px(ctx, 10, 4, 1, 1, "#ffffff")
    px(ctx, 6, 8, 1, 1, "#ffffff")
    addBlockBevel(ctx, "rgba(255,255,255,0.16)", "rgba(0,0,0,0.3)")
  })

  const emerald_ore = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, stonePalette, 808, true)
    const clusters: Array<[number, number]> = [
      [3, 4],
      [10, 3],
      [6, 9],
      [11, 10],
      [2, 11],
    ]
    for (const [cx, cy] of clusters) {
      px(ctx, cx, cy, 2, 3, "#128a3a")
      px(ctx, cx, cy, 2, 2, "#2ee86c")
      px(ctx, cx, cy, 1, 1, "#9dffbc")
    }
    px(ctx, 10, 3, 1, 1, "#e6fff0")
    px(ctx, 6, 9, 1, 1, "#e6fff0")
    addBlockBevel(ctx, "rgba(255,255,255,0.16)", "rgba(0,0,0,0.3)")
  })

  const command = createSpriteCanvas((ctx) => {
    px(ctx, 0, 0, 16, 16, "#7a3d20")
    px(ctx, 1, 1, 14, 14, "#a85c36")
    px(ctx, 2, 2, 12, 12, "#cc7a4b")
    px(ctx, 1, 1, 2, 2, "#592b15")
    px(ctx, 13, 1, 2, 2, "#592b15")
    px(ctx, 1, 13, 2, 2, "#592b15")
    px(ctx, 13, 13, 2, 2, "#592b15")
    px(ctx, 2, 2, 1, 1, "#eb9d6e")
    px(ctx, 3, 3, 10, 10, "#1d1628")
    px(ctx, 4, 4, 8, 8, "#2b223a")
    px(ctx, 5, 5, 2, 2, "#3be8e8")
    px(ctx, 9, 5, 2, 2, "#ff66cc")
    px(ctx, 5, 9, 2, 2, "#ffcf4d")
    px(ctx, 9, 9, 2, 2, "#ff7755")
    px(ctx, 7, 7, 2, 2, "#2ee86c")
    px(ctx, 7, 5, 2, 1, "#55476e")
    px(ctx, 7, 10, 2, 1, "#55476e")
    px(ctx, 5, 7, 1, 2, "#55476e")
    px(ctx, 10, 7, 1, 2, "#55476e")
    addBlockBevel(ctx, "rgba(255,220,185,0.22)", "rgba(18,8,16,0.38)")
  })

  const tnt = createSpriteCanvas((ctx) => {
    const redShades = ["#c9241e", "#df2f26", "#a81b16", "#ea4335"] as const
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        if (y >= 5 && y <= 10) {
          px(ctx, x, y, 1, 1, (x + y) % 3 === 0 ? "#e7e5e4" : "#f8fafc")
        } else {
          const band = redShades[(x + (y % 2)) % redShades.length]
          px(ctx, x, y, 1, 1, x % 4 === 0 ? "#8f1410" : band)
        }
      }
    }
    // Dark seam borders around white band
    px(ctx, 0, 5, 16, 1, "#d6d3d1")
    px(ctx, 0, 10, 16, 1, "#d6d3d1")
    // Pixel "TNT" lettering in center white band (y = 6..9)
    // Left T (x = 2..4)
    px(ctx, 2, 6, 3, 1, "#18181b")
    px(ctx, 3, 7, 1, 3, "#18181b")
    // Middle N (x = 6..9)
    px(ctx, 6, 6, 1, 4, "#18181b")
    px(ctx, 7, 7, 1, 1, "#18181b")
    px(ctx, 8, 8, 1, 1, "#18181b")
    px(ctx, 9, 6, 1, 4, "#18181b")
    // Right T (x = 11..13)
    px(ctx, 11, 6, 3, 1, "#18181b")
    px(ctx, 12, 7, 1, 3, "#18181b")
    addBlockBevel(ctx, "rgba(255,210,200,0.22)", "rgba(30,5,5,0.38)")
  })

  cachedSprites = {
    grass,
    dirt,
    stone,
    obsidian,
    crying_obsidian,
    amethyst,
    diamond_ore,
    emerald_ore,
    command,
    tnt,
  }
  return cachedSprites
}

function getPortalIconSprite(): HTMLCanvasElement {
  if (cachedPortalIcon) return cachedPortalIcon

  cachedPortalIcon = createSpriteCanvas((ctx) => {
    // Obsidian outer frame
    px(ctx, 0, 0, 16, 16, "#140c21")
    px(ctx, 1, 1, 14, 14, "#291842")
    px(ctx, 2, 2, 12, 12, "#3b0764")
    // Swirling Nether/Ender portal field
    px(ctx, 3, 3, 10, 10, "#7e22ce")
    px(ctx, 4, 4, 8, 8, "#a855f7")
    px(ctx, 3, 6, 2, 4, "#e879f9")
    px(ctx, 11, 6, 2, 4, "#e879f9")
    px(ctx, 6, 3, 4, 2, "#e879f9")
    px(ctx, 6, 11, 4, 2, "#e879f9")
    // Glowing amethyst-white Ender core
    px(ctx, 5, 5, 6, 6, "#e879f9")
    px(ctx, 6, 6, 4, 4, "#f5d0fe")
    px(ctx, 7, 7, 2, 2, "#ffffff")
    // Obsidian corner glints
    px(ctx, 1, 1, 2, 2, "#a855f7")
    px(ctx, 13, 1, 2, 2, "#e879f9")
    px(ctx, 1, 13, 2, 2, "#e879f9")
    px(ctx, 13, 13, 2, 2, "#a855f7")
    addBlockBevel(ctx, "rgba(245, 208, 254, 0.28)", "rgba(9, 4, 18, 0.5)")
  })

  return cachedPortalIcon
}

function pickFrontierBlockKind(
  col: number,
  row: number,
  rows: number,
  rng: () => number
): BlockKind {
  // Bottom rows mirror Bastion/Nether/Deep Stone, middle mirrors Desert/Cherry/Library/Arena, top mirrors Village/Hero
  const heightRatio = 1 - row / Math.max(1, rows - 1)
  const r = rng()

  if (heightRatio < 0.25) {
    if (r < 0.34) return "obsidian"
    if (r < 0.56) return "crying_obsidian"
    if (r < 0.72) return "stone"
    if (r < 0.85) return "diamond_ore"
    if (r < 0.94) return "tnt"
    return "command"
  }

  if (heightRatio < 0.65) {
    if (r < 0.24) return "stone"
    if (r < 0.42) return "dirt"
    if (r < 0.58) return "amethyst"
    if (r < 0.72) return "diamond_ore"
    if (r < 0.85) return "emerald_ore"
    if (r < 0.93) return "command"
    return (col + row) % 3 === 0 ? "tnt" : "obsidian"
  }

  if (r < 0.38) return "grass"
  if (r < 0.56) return "emerald_ore"
  if (r < 0.72) return "amethyst"
  if (r < 0.84) return "dirt"
  if (r < 0.94) return "command"
  return "diamond_ore"
}

function buildPortalScene(vw: number, vh: number, seed: number): PortalSceneData {
  const rng = mulberry32(seed ^ 0x5f3759df)
  const cx = vw * 0.5
  const cy = vh * 0.5
  const maxRadius = Math.hypot(cx, cy)

  const particles: PortalVortexParticle[] = []
  const particleCount = 112
  for (let i = 0; i < particleCount; i++) {
    const colorIdx = 1 + Math.floor(rng() * (PORTAL_COLORS.length - 1))
    particles.push({
      baseAngle: (i / particleCount) * Math.PI * 2 + (rng() - 0.5) * 0.35,
      startRadiusRatio: 0.62 + rng() * 0.52,
      angularSpeed: 2.6 + rng() * 2.8,
      delay: (i % 8) * 65 + rng() * 80,
      life: 620 + rng() * 340,
      color: PORTAL_COLORS[colorIdx],
      trailColor: PORTAL_COLORS[Math.max(0, colorIdx - 1)],
    })
  }

  const sparks: PortalSpark[] = []
  const sparkCount = 96
  for (let i = 0; i < sparkCount; i++) {
    const colorIdx = 1 + (i % (PORTAL_COLORS.length - 1))
    sparks.push({
      angle: (i / sparkCount) * Math.PI * 2 + (rng() - 0.5) * 0.28,
      speed: 220 + rng() * 520,
      size: rng() < 0.35 ? 8 : rng() < 0.75 ? 6 : 4,
      delay: rng() * 210,
      life: 480 + rng() * 420,
      color: PORTAL_COLORS[colorIdx],
    })
  }

  const tileSize = vw < 640 ? 28 : 36
  const cols = Math.max(2, Math.ceil(vw / tileSize))
  const rows = Math.max(2, Math.ceil(vh / tileSize))
  const frameTiles: ObsidianFrameTile[] = []

  const addTile = (col: number, row: number, isCorner: boolean) => {
    const x = col * tileSize
    const y = row * tileSize
    const distNorm = Math.hypot(x + tileSize * 0.5 - cx, y + tileSize * 0.5 - cy) / Math.max(1, maxRadius)
    frameTiles.push({
      x,
      y,
      size: tileSize,
      isCorner,
      isCrying: isCorner ? rng() < 0.65 : rng() < 0.3,
      phaseOffset: rng() * Math.PI * 2,
      inDelay: (1 - clamp(distNorm, 0, 1)) * 240 + rng() * 90,
      outDelay: 1200 + rng() * 220,
    })
  }

  for (let col = 0; col < cols; col++) {
    const isCornerCol = col <= 1 || col >= cols - 2
    addTile(col, 0, isCornerCol)
    addTile(col, rows - 1, isCornerCol)
  }
  for (let row = 1; row < rows - 1; row++) {
    const isCornerRow = row <= 1 || row >= rows - 2
    addTile(0, row, isCornerRow)
    addTile(cols - 1, row, isCornerRow)
  }
  // Extra inner obsidian corner steps for Nether Portal silhouette
  if (cols > 4 && rows > 4) {
    addTile(1, 1, true)
    addTile(cols - 2, 1, true)
    addTile(1, rows - 2, true)
    addTile(cols - 2, rows - 2, true)
  }

  const glints: ObsidianGlint[] = []
  for (let i = 0; i < frameTiles.length; i++) {
    const tile = frameTiles[i]
    if (!tile.isCorner && i % 2 !== 0) continue
    glints.push({
      x: tile.x + Math.round(rng() * Math.max(4, tile.size - 8)),
      y: tile.y + Math.round(rng() * Math.max(4, tile.size - 8)),
      size: tile.isCorner && rng() < 0.5 ? 8 : 4,
      speed: 0.006 + rng() * 0.01,
      phase: rng() * Math.PI * 2,
      color: tile.isCorner ? (rng() < 0.5 ? "#f5d0fe" : "#e879f9") : "#a855f7",
    })
  }

  return {
    cx,
    cy,
    maxRadius,
    particles,
    sparks,
    frameTiles,
    glints,
  }
}

function createExplosionParticles(
  rng: () => number,
  smokeCount: number,
  emberCount: number,
  debrisCount: number,
  radiusScale: number,
  durScale: number
): { smoke: SmokePuff[]; embers: EmberParticle[]; debris: DebrisChunk[] } {
  const debrisKinds: readonly BlockKind[] = [
    "tnt",
    "obsidian",
    "stone",
    "dirt",
    "grass",
    "amethyst",
    "diamond_ore",
    "emerald_ore",
    "command",
  ]

  const smoke: SmokePuff[] = []
  for (let i = 0; i < smokeCount; i++) {
    const angle = (i / smokeCount) * Math.PI * 2 + (rng() - 0.5) * 0.45
    const dist = (14 + rng() * 95) * radiusScale
    const speed = (65 + rng() * 210) * radiusScale
    smoke.push({
      xOffset: Math.cos(angle) * dist,
      yOffset: Math.sin(angle) * dist,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (25 + rng() * 55) * radiusScale,
      baseSize: Math.round((16 + rng() * 22) * radiusScale),
      maxSize: Math.round((44 + rng() * 54) * radiusScale),
      delay: rng() * 95 * durScale,
      life: (290 + rng() * 230) * durScale,
      color: SMOKE_COLORS[i % SMOKE_COLORS.length],
    })
  }

  const embers: EmberParticle[] = []
  for (let i = 0; i < emberCount; i++) {
    const angle = (i / emberCount) * Math.PI * 2 + (rng() - 0.5) * 0.35
    embers.push({
      angle,
      speed: (220 + rng() * 480) * radiusScale,
      size: rng() < 0.35 ? 8 : rng() < 0.7 ? 6 : 4,
      delay: rng() * 75 * durScale,
      life: (240 + rng() * 210) * durScale,
      color: EMBER_COLORS[i % EMBER_COLORS.length],
      gravity: 160 + rng() * 220,
    })
  }

  const debris: DebrisChunk[] = []
  for (let i = 0; i < debrisCount; i++) {
    const angle = (i / debrisCount) * Math.PI * 2 + (rng() - 0.5) * 0.4
    debris.push({
      angle,
      speed: (180 + rng() * 420) * radiusScale,
      vyBoost: -(110 + rng() * 240) * radiusScale,
      size: Math.round((10 + rng() * 12) * Math.max(0.75, radiusScale * 0.85)),
      delay: rng() * 55 * durScale,
      life: (360 + rng() * 260) * durScale,
      kind: debrisKinds[i % debrisKinds.length],
    })
  }

  return { smoke, embers, debris }
}

function buildScene(
  vw: number,
  vh: number,
  origin: { x: number; y: number } | null | undefined,
  seed: number
): SceneData {
  const cellSize = vw < 640 ? 44 : 56
  const cols = Math.max(1, Math.ceil(vw / cellSize))
  const rows = Math.max(1, Math.ceil(vh / cellSize))

  const originX =
    origin && Number.isFinite(origin.x) ? clamp(origin.x, 24, vw - 24) : vw * 0.5
  const originY =
    origin && Number.isFinite(origin.y) ? clamp(origin.y, 24, vh - 24) : Math.max(48, vh - 88)
  const targetX = vw * 0.5
  const targetY = vh * 0.66

  const rng = mulberry32(seed)

  // Column wave profile for irregular living construction frontier
  const colOffsets: number[] = []
  for (let col = 0; col < cols; col++) {
    const wave =
      Math.sin(col * 0.58 + seed * 0.01) * cellSize * 0.95 +
      Math.cos(col * 1.17) * cellSize * 0.45 +
      (hash2d(col, 7, seed) - 0.5) * cellSize * 1.35
    colOffsets.push(wave)
  }

  const frontierBlocks: FrontierBlock[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize
      const y = row * cellSize
      const jitter = (hash2d(col, row, seed + 19) - 0.5) * cellSize * 0.85

      frontierBlocks.push({
        col,
        row,
        x,
        y,
        kind: pickFrontierBlockKind(col, row, rows, rng),
        colWaveOffset: colOffsets[col],
        cellJitter: jitter,
      })
    }
  }

  const primary = createExplosionParticles(rng, 42, 54, 24, 1.35, 1.0)

  const miniConfigs: Array<{ triggerMs: number; xRatio: number }> = [
    { triggerMs: 1650, xRatio: 0.27 },
    { triggerMs: 2250, xRatio: 0.73 },
    { triggerMs: 2850, xRatio: 0.48 },
  ]

  const miniExplosions: MiniExplosion[] = miniConfigs.map((cfg) => {
    const parts = createExplosionParticles(rng, 18, 22, 10, 0.72, 0.72)
    return {
      triggerMs: cfg.triggerMs,
      fuseMs: cfg.triggerMs - 240,
      xRatio: cfg.xRatio,
      smoke: parts.smoke,
      embers: parts.embers,
      debris: parts.debris,
    }
  })

  const xpOrbs: XpOrb[] = []
  for (let i = 0; i < 38; i++) {
    const xpColor = XP_COLORS[i % XP_COLORS.length]
    xpOrbs.push({
      xRatio: 0.1 + rng() * 0.8,
      yStartRatio: 0.04 + rng() * 0.42,
      vx: (rng() - 0.5) * 95,
      vy: -(75 + rng() * 145),
      size: rng() < 0.3 ? 10 : rng() < 0.7 ? 8 : 6,
      delay: rng() * 240,
      life: 480 + rng() * 290,
      color: xpColor,
      coreColor: "#ffffff",
    })
  }

  return {
    vw,
    vh,
    cellSize,
    cols,
    rows,
    originX,
    originY,
    targetX,
    targetY,
    frontierBlocks,
    primarySmoke: primary.smoke,
    primaryEmbers: primary.embers,
    primaryDebris: primary.debris,
    miniExplosions,
    xpOrbs,
    portal: buildPortalScene(vw, vh, seed),
  }
}

function getWaveY(buildProgress: number, vh: number, cellSize: number): number {
  const startY = vh + cellSize * 2.6
  const endY = cellSize * 1.1
  return startY + (endY - startY) * easeInOutCubic(buildProgress)
}

function drawFuseParticles(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  elapsed: number,
  seed: number
) {
  const count = 18
  ctx.save()
  for (let i = 0; i < count; i++) {
    const cycle = 320 + (i % 4) * 55
    const phase = ((elapsed + i * 37) % cycle) / cycle
    const h1 = hash2d(i, Math.floor((elapsed + i * 37) / cycle), seed)
    const h2 = hash2d(i + 13, Math.floor((elapsed + i * 37) / cycle), seed + 5)

    const pxX = Math.round(x + (h1 - 0.5) * (16 + phase * 36))
    const pxY = Math.round(y - phase * (44 + h2 * 48))
    const isSmoke = i % 3 === 0
    const size = isSmoke ? (phase < 0.5 ? 8 : 6) : phase < 0.4 ? 6 : 4
    ctx.globalAlpha = clamp(1 - phase, 0, 1) * (isSmoke ? 0.65 : 0.95)
    ctx.fillStyle = isSmoke
      ? h2 > 0.5
        ? "#d4d4d8"
        : "#71717a"
      : i % 2 === 0
        ? "#ff3b3b"
        : "#ffcf4d"
    ctx.fillRect(pxX - size / 2, pxY - size / 2, size, size)
  }
  ctx.restore()
}

function drawPixelExplosion(
  ctx: CanvasRenderingContext2D,
  sprites: Record<BlockKind, HTMLCanvasElement>,
  cx: number,
  cy: number,
  localElapsed: number,
  smoke: SmokePuff[],
  embers: EmberParticle[],
  debris: DebrisChunk[],
  maxRingRadius: number,
  flashRadius: number
) {
  if (localElapsed < 0) return

  ctx.save()
  // Expanding stepped pixel shockwave ring
  const ringDur = 360
  if (localElapsed < ringDur) {
    const p = clamp(localElapsed / ringDur, 0, 1)
    const eased = 1 - (1 - p) * (1 - p)
    const radius = eased * maxRingRadius
    const alpha = clamp(1 - p, 0, 1)
    const segments = 40
    const step = 6

    for (let ring = 0; ring < 2; ring++) {
      const r = ring === 0 ? radius : radius * 0.68
      if (r < 6) continue
      ctx.globalAlpha = ring === 0 ? alpha * 0.95 : alpha * 0.65
      ctx.fillStyle = ring === 0 ? "#ffcf4d" : "#ff6b1a"
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const rx = Math.round((cx + Math.cos(a) * r) / 4) * 4
        const ry = Math.round((cy + Math.sin(a) * r) / 4) * 4
        ctx.fillRect(rx - step / 2, ry - step / 2, step, step)
      }
    }
  }

  // Fiery embers
  for (let i = 0; i < embers.length; i++) {
    const e = embers[i]
    const dt = localElapsed - e.delay
    if (dt <= 0 || dt >= e.life) continue
    const p = dt / e.life
    const sec = dt / 1000
    const ex = Math.round(cx + Math.cos(e.angle) * e.speed * sec * (1 - p * 0.25))
    const ey = Math.round(
      cy + Math.sin(e.angle) * e.speed * sec * (1 - p * 0.25) + 0.5 * e.gravity * sec * sec
    )
    ctx.globalAlpha = clamp(1 - p * p, 0, 1)
    ctx.fillStyle = e.color
    ctx.fillRect(ex - e.size / 2, ey - e.size / 2, e.size, e.size)
  }

  // Blasted voxel debris chunks
  for (let i = 0; i < debris.length; i++) {
    const d = debris[i]
    const dt = localElapsed - d.delay
    if (dt <= 0 || dt >= d.life) continue
    const p = dt / d.life
    const sec = dt / 1000
    const dx = Math.round(cx + Math.cos(d.angle) * d.speed * sec)
    const dy = Math.round(
      cy + (Math.sin(d.angle) * d.speed + d.vyBoost) * sec + 0.5 * 520 * sec * sec
    )
    ctx.globalAlpha = clamp(1 - Math.max(0, p - 0.55) / 0.45, 0, 1)
    ctx.drawImage(sprites[d.kind], dx - d.size / 2, dy - d.size / 2, d.size, d.size)
  }

  // Blocky pixel smoke puffs
  for (let i = 0; i < smoke.length; i++) {
    const s = smoke[i]
    const dt = localElapsed - s.delay
    if (dt <= 0 || dt >= s.life) continue
    const p = dt / s.life
    const sec = dt / 1000
    const grow = p < 0.35 ? easeOutCubic(p / 0.35) : 1 - (p - 0.35) * 0.25
    const size = Math.max(4, Math.round((s.baseSize + (s.maxSize - s.baseSize) * grow) / 4) * 4)
    const sx = Math.round((cx + s.xOffset + s.vx * sec * (1 - p * 0.4)) / 2) * 2
    const sy = Math.round((cy + s.yOffset + s.vy * sec * (1 - p * 0.35)) / 2) * 2
    ctx.globalAlpha = clamp((1 - p) * 0.92, 0, 1)
    ctx.fillStyle = s.color
    ctx.fillRect(sx - size / 2, sy - size / 2, size, size)
  }

  // Bright radial white/amber core flash
  const flashDur = 210
  if (localElapsed < flashDur) {
    const fp = clamp(localElapsed / flashDur, 0, 1)
    const r = Math.round(flashRadius * (0.4 + fp * 0.75))
    const grad = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r)
    grad.addColorStop(0, `rgba(255, 255, 255, ${(1 - fp * 0.65).toFixed(3)})`)
    grad.addColorStop(0.45, `rgba(255, 215, 110, ${(0.85 * (1 - fp)).toFixed(3)})`)
    grad.addColorStop(1, "rgba(255, 107, 26, 0)")
    ctx.globalAlpha = 1
    ctx.fillStyle = grad
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  }

  ctx.restore()
}

function drawHudTicker(
  ctx: CanvasRenderingContext2D,
  vw: number,
  vh: number,
  elapsed: number,
  label: string,
  progress: number,
  iconSprite: HTMLCanvasElement,
  fontFamily: string,
  accentColor: string,
  innerColor: string,
  alpha: number,
  barColorA = "#2ee86c",
  barColorB = "#3be8e8",
  glowColor = "rgba(255, 207, 77, 0.24)"
) {
  if (alpha <= 0.01) return

  const isMobile = vw < 640
  const fontSize = isMobile ? 10 : 14
  const iconSize = isMobile ? 26 : 34
  const padX = isMobile ? 12 : 20
  const padY = isMobile ? 10 : 14
  const gap = isMobile ? 10 : 14

  ctx.save()
  ctx.globalAlpha = clamp(alpha, 0, 1)
  ctx.imageSmoothingEnabled = false
  ctx.font = `700 ${fontSize}px ${fontFamily}`
  const textWidth = Math.ceil(ctx.measureText(label).width)

  const plateW = Math.min(vw - 24, padX * 2 + iconSize + gap + textWidth + 14)
  const plateH = Math.max(iconSize + padY * 2, isMobile ? 54 : 68)
  const plateX = Math.round((vw - plateW) / 2)
  const plateY = Math.round((vh - plateH) / 2)

  // Drop shadow
  ctx.fillStyle = "rgba(4, 2, 10, 0.88)"
  ctx.fillRect(plateX + 6, plateY + 6, plateW, plateH)

  // Crisp 2-tier pixel border
  ctx.fillStyle = "#090612"
  ctx.fillRect(plateX, plateY, plateW, plateH)
  ctx.fillStyle = accentColor
  ctx.fillRect(plateX + 2, plateY + 2, plateW - 4, plateH - 4)
  ctx.fillStyle = "#120c22"
  ctx.fillRect(plateX + 4, plateY + 4, plateW - 8, plateH - 8)
  ctx.fillStyle = innerColor
  ctx.fillRect(plateX + 6, plateY + 6, plateW - 12, 2)
  ctx.fillRect(plateX + 6, plateY + plateH - 8, plateW - 12, 2)

  // Pulsing sprite icon
  const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.02)
  const pulseStep = pulse > 0.66 ? 4 : pulse > 0.33 ? 2 : 0
  const drawIconSize = iconSize + pulseStep
  const iconX = Math.round(plateX + padX - pulseStep / 2)
  const iconY = Math.round(plateY + (plateH - drawIconSize) / 2)

  if (pulse > 0.35) {
    ctx.fillStyle = glowColor
    ctx.fillRect(iconX - 3, iconY - 3, drawIconSize + 6, drawIconSize + 6)
  }
  ctx.drawImage(iconSprite, iconX, iconY, drawIconSize, drawIconSize)

  const textX = plateX + padX + iconSize + gap
  const textY = Math.round(plateY + plateH / 2 + fontSize * 0.32) - 5
  const maxTextW = Math.max(40, plateX + plateW - padX - textX)

  ctx.textBaseline = "alphabetic"
  ctx.fillStyle = "#07040d"
  ctx.fillText(label, textX + 2, textY + 2, maxTextW)
  ctx.fillStyle = "#f8fafc"
  ctx.fillText(label, textX, textY, maxTextW)

  // Segmented pixel progress bar
  const barX = textX
  const barY = textY + (isMobile ? 7 : 9)
  const barW = Math.max(40, plateX + plateW - padX - barX)
  const segments = 14
  const segGap = 2
  const segW = Math.max(2, Math.floor((barW - segGap * (segments - 1)) / segments))
  const litSegments = Math.ceil(clamp(progress, 0, 1) * segments)

  for (let s = 0; s < segments; s++) {
    const sx = barX + s * (segW + segGap)
    ctx.fillStyle =
      s < litSegments
        ? s % 2 === 0
          ? barColorA
          : barColorB
        : "rgba(255, 255, 255, 0.14)"
    ctx.fillRect(sx, barY, segW, 4)
  }

  ctx.restore()
}

export function TntBuildTransition({
  active,
  targetWorld,
  origin,
  onMidpointSwap,
  onComplete,
}: TntBuildTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const tntWrapRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fallbackImgRef = useRef<HTMLImageElement | null>(null)

  const onMidpointSwapRef = useRef(onMidpointSwap)
  const onCompleteRef = useRef(onComplete)
  const targetWorldRef = useRef(targetWorld)
  const originRef = useRef(origin)
  const midpointFiredRef = useRef(false)
  const completeFiredRef = useRef(false)
  const activationSeedRef = useRef(1)

  useEffect(() => {
    onMidpointSwapRef.current = onMidpointSwap
    onCompleteRef.current = onComplete
    targetWorldRef.current = targetWorld
    originRef.current = origin
  }, [onMidpointSwap, onComplete, targetWorld, origin])

  useEffect(() => {
    if (!active) {
      midpointFiredRef.current = false
      completeFiredRef.current = false
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    midpointFiredRef.current = false
    completeFiredRef.current = false

    const world = targetWorldRef.current
    const initialOrigin = originRef.current
    const seed = (activationSeedRef.current = (activationSeedRef.current + 1777) | 0)

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const sprites = getBlockSprites()
    const portalIcon = getPortalIconSprite()
    const pixelFont = resolvePixelFontFamily()

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let vw = window.innerWidth
    let vh = window.innerHeight
    let scene = buildScene(vw, vh, initialOrigin, seed)

    const syncCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      vw = window.innerWidth
      vh = window.innerHeight
      canvas.width = Math.max(1, Math.floor(vw * dpr))
      canvas.height = Math.max(1, Math.floor(vh * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      scene = buildScene(vw, vh, initialOrigin, seed)
    }

    syncCanvasSize()
    window.addEventListener("resize", syncCanvasSize)

    // Initialize primed TNT video when entering Minecraft mode
    const videoEl = videoRef.current
    const wrapEl = tntWrapRef.current
    const fallbackEl = fallbackImgRef.current

    if (fallbackEl) {
      fallbackEl.style.opacity = "0"
    }
    if (wrapEl) {
      wrapEl.style.display = !reducedMotion && world === "minecraft" ? "block" : "none"
      wrapEl.style.opacity = !reducedMotion && world === "minecraft" ? "1" : "0"
    }
    if (videoEl && !reducedMotion && world === "minecraft") {
      videoEl.style.display = "block"
      try {
        videoEl.currentTime = 0
        const playPromise = videoEl.play()
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            if (fallbackEl) fallbackEl.style.opacity = "1"
          })
        }
      } catch {
        if (fallbackEl) fallbackEl.style.opacity = "1"
      }
    }

    let rafId = 0
    const startTime = performance.now()

    // Scroll tracking for Minecraft bottom->top construction climb
    let postSwapFrames = 0
    let scrollInitialized = false
    let maxScroll = 0
    let scrollStartMs = BUILD_START_MS
    let heroScrollSnapped = false
    let reducedScrollSnapped = false
    let normalScrollSnapped = false

    const fireMidpointOnce = () => {
      if (midpointFiredRef.current) return
      midpointFiredRef.current = true
      onMidpointSwapRef.current()
    }

    const fireCompleteOnce = () => {
      if (completeFiredRef.current) return
      completeFiredRef.current = true
      onCompleteRef.current()
    }

    const renderReducedMotion = (elapsed: number) => {
      ctx.clearRect(0, 0, vw, vh)
      ctx.imageSmoothingEnabled = false

      if (midpointFiredRef.current && !reducedScrollSnapped) {
        reducedScrollSnapped = true
        window.scrollTo({ top: 0, behavior: "instant" })
      }

      let coverage = 1
      if (elapsed < 260) {
        coverage = Math.ceil((elapsed / 260) * 6) / 6
      } else if (elapsed > 390) {
        coverage = Math.ceil(((REDUCED_TOTAL_MS - elapsed) / 260) * 6) / 6
      }
      coverage = clamp(coverage, 0, 1)

      if (coverage > 0) {
        ctx.save()
        ctx.globalAlpha = coverage
        ctx.fillStyle = "#0b0714"
        ctx.fillRect(0, 0, vw, vh)

        const { frontierBlocks, cellSize } = scene
        ctx.globalAlpha = coverage * 0.88
        for (let i = 0; i < frontierBlocks.length; i++) {
          const b = frontierBlocks[i]
          ctx.drawImage(sprites[b.kind], b.x, b.y, cellSize + 0.5, cellSize + 0.5)
        }
        ctx.restore()
      }

      const label =
        world === "minecraft"
          ? "CONSTRUYENDO MUNDO MINECRAFT... 100%"
          : "VOLVIENDO AL OVERWORLD..."
      const progress = clamp(elapsed / REDUCED_TOTAL_MS, 0, 1)
      drawHudTicker(
        ctx,
        vw,
        vh,
        elapsed,
        label,
        progress,
        world === "minecraft" ? sprites.tnt : portalIcon,
        pixelFont,
        world === "minecraft" ? "#9d5cff" : "#a855f7",
        world === "minecraft" ? "#2ee86c" : "#e879f9",
        coverage,
        world === "minecraft" ? "#2ee86c" : "#a855f7",
        world === "minecraft" ? "#3be8e8" : "#f5d0fe",
        world === "minecraft" ? "rgba(255, 207, 77, 0.24)" : "rgba(232, 121, 249, 0.34)"
      )
    }

    const renderPortalVortex = (elapsed: number) => {
      ctx.clearRect(0, 0, vw, vh)
      ctx.imageSmoothingEnabled = false

      if (midpointFiredRef.current && !normalScrollSnapped) {
        normalScrollSnapped = true
        window.scrollTo({ top: 0, behavior: "instant" })
      }

      const { cx, cy, maxRadius, particles, sparks, frameTiles, glints } = scene.portal

      // Subtle pixel-snapped screen wobble peaking near midpoint swap
      let wobbleAmp = 0
      if (elapsed < NORMAL_MIDPOINT_MS) {
        const p1 = clamp(elapsed / NORMAL_MIDPOINT_MS, 0, 1)
        wobbleAmp = 0.7 + p1 * p1 * 3.1
      } else {
        const decay = clamp(1 - (elapsed - NORMAL_MIDPOINT_MS) / 480, 0, 1)
        wobbleAmp = 3.2 * decay * decay
      }
      const wobbleX = wobbleAmp > 0.2 ? Math.round(Math.sin(elapsed * 0.033) * wobbleAmp) : 0
      const wobbleY = wobbleAmp > 0.2 ? Math.round(Math.cos(elapsed * 0.027) * wobbleAmp * 0.8) : 0

      ctx.save()
      if (wobbleX !== 0 || wobbleY !== 0) {
        ctx.translate(wobbleX, wobbleY)
      }

      // 1. Deep Nether/Ender void backdrop & pixelated ripple reveal after midpoint
      if (elapsed < NORMAL_MIDPOINT_MS) {
        const inP = clamp(elapsed / 950, 0, 1)
        const veilAlpha = easeInOutCubic(inP)
        ctx.fillStyle = "#16042a"
        ctx.globalAlpha = veilAlpha
        ctx.fillRect(-20, -20, vw + 40, vh + 40)

        const coreGlowR = Math.round(maxRadius * (0.45 + 0.35 * easeOutCubic(inP)))
        const grad = ctx.createRadialGradient(cx, cy, 8, cx, cy, Math.max(24, coreGlowR))
        grad.addColorStop(0, `rgba(232, 121, 249, ${(0.34 * inP).toFixed(3)})`)
        grad.addColorStop(0.38, `rgba(126, 34, 206, ${(0.45 * inP).toFixed(3)})`)
        grad.addColorStop(1, "rgba(59, 7, 100, 0)")
        ctx.globalAlpha = 1
        ctx.fillStyle = grad
        ctx.fillRect(-20, -20, vw + 40, vh + 40)
      } else {
        const postElapsed = elapsed - NORMAL_MIDPOINT_MS
        const outP = clamp(postElapsed / 860, 0, 1)
        const veilAlpha = clamp(1 - outP * 0.92, 0, 1)

        if (veilAlpha > 0.01) {
          ctx.fillStyle = "#16042a"
          ctx.globalAlpha = veilAlpha
          ctx.fillRect(-20, -20, vw + 40, vh + 40)

          // Punch expanding pixelated ripple opening from center outward
          const revealRadius = easeOutCubic(outP) * maxRadius * 1.18
          if (revealRadius > 4) {
            ctx.save()
            ctx.globalCompositeOperation = "destination-out"
            ctx.globalAlpha = 1
            ctx.fillStyle = "#000000"
            const blockStep = 12
            const ringSteps = 44
            ctx.beginPath()
            for (let i = 0; i <= ringSteps; i++) {
              const a = (i / ringSteps) * Math.PI * 2
              const rippleWave = Math.sin(a * 8 + postElapsed * 0.024) * 14 * (1 - outP * 0.6)
              const r = Math.max(0, revealRadius + rippleWave)
              const pxX = Math.round((cx + Math.cos(a) * r) / blockStep) * blockStep
              const pxY = Math.round((cy + Math.sin(a) * r) / blockStep) * blockStep
              if (i === 0) ctx.moveTo(pxX, pxY)
              else ctx.lineTo(pxX, pxY)
            }
            ctx.closePath()
            ctx.fill()
            ctx.restore()
          }
        }
      }

      // 2. Swirling concentric violet/magenta/indigo portal rings
      if (elapsed < NORMAL_MIDPOINT_MS) {
        const p1 = clamp(elapsed / NORMAL_MIDPOINT_MS, 0, 1)
        const pullScale = 1.18 - easeInOutCubic(p1) * 0.72
        const ringAlpha = clamp(elapsed / 220, 0, 1)
        const ringCount = 6

        for (let rIdx = 0; rIdx < ringCount; rIdx++) {
          const baseFrac = (rIdx + 1) / ringCount
          const radius = Math.max(18, maxRadius * 0.74 * baseFrac * pullScale)
          const dir = rIdx % 2 === 0 ? 1 : -1
          const speed = (0.0022 + (ringCount - rIdx) * 0.00085) * (1 + p1 * 1.35)
          const rot = elapsed * speed * dir
          const segs = 22 + rIdx * 6
          const blockSize = rIdx < 2 ? 10 : rIdx < 4 ? 8 : 6
          const color = PORTAL_COLORS[(rIdx + 1) % PORTAL_COLORS.length]

          ctx.globalAlpha = ringAlpha * (0.45 + (1 - baseFrac) * 0.5)
          ctx.fillStyle = color

          for (let s = 0; s < segs; s++) {
            // Leave crisp portal swirl gaps on alternating clusters
            if ((s + rIdx) % 5 === 0) continue
            const a = rot + (s / segs) * Math.PI * 2
            const wobbleR = radius + Math.sin(a * 3 + elapsed * 0.012) * 8 * (1 - p1 * 0.5)
            const rx = Math.round((cx + Math.cos(a) * wobbleR) / 4) * 4
            const ry = Math.round((cy + Math.sin(a) * wobbleR * 0.88) / 4) * 4
            ctx.fillRect(rx - blockSize / 2, ry - blockSize / 2, blockSize, blockSize)
          }
        }

        // Central swirling Ender/Nether vortex core
        const coreSize = Math.round((24 + p1 * 44 + Math.sin(elapsed * 0.03) * 6) / 4) * 4
        for (let layer = 0; layer < 3; layer++) {
          const s = Math.max(8, coreSize - layer * 12)
          ctx.save()
          ctx.translate(cx, cy)
          ctx.rotate(elapsed * (0.004 + layer * 0.0025) * (layer % 2 === 0 ? 1 : -1))
          ctx.globalAlpha = ringAlpha * (0.55 + layer * 0.15)
          ctx.fillStyle = PORTAL_COLORS[layer + 2]
          ctx.fillRect(-s / 2, -s / 2, s, s)
          ctx.restore()
        }
      } else {
        // Phase 2: Expanding pixelated portal ripples radiating outward
        const postElapsed = elapsed - NORMAL_MIDPOINT_MS
        const rippleCount = 4
        for (let rIdx = 0; rIdx < rippleCount; rIdx++) {
          const rDelay = rIdx * 115
          const rDt = postElapsed - rDelay
          const rDur = 760
          if (rDt <= 0 || rDt >= rDur) continue
          const rp = rDt / rDur
          const radius = easeOutCubic(rp) * maxRadius * 1.24
          const segs = 40 + rIdx * 8
          const step = rIdx === 0 ? 10 : 8
          ctx.globalAlpha = clamp(1 - rp, 0, 1) * 0.92
          ctx.fillStyle = PORTAL_COLORS[4 - (rIdx % 3)]

          for (let s = 0; s < segs; s++) {
            const a = (s / segs) * Math.PI * 2 + postElapsed * 0.0018 * (rIdx % 2 === 0 ? 1 : -1)
            const jitterR = radius + Math.sin(a * 6 + rIdx) * 6
            const rx = Math.round((cx + Math.cos(a) * jitterR) / 4) * 4
            const ry = Math.round((cy + Math.sin(a) * jitterR) / 4) * 4
            ctx.fillRect(rx - step / 2, ry - step / 2, step, step)
          }
        }
      }

      // 3. Spiraling 8x8 pixel portal particles pulled inward toward center (0ms–1150ms)
      if (elapsed < NORMAL_MIDPOINT_MS + 90) {
        const pullFade =
          elapsed > NORMAL_MIDPOINT_MS
            ? clamp(1 - (elapsed - NORMAL_MIDPOINT_MS) / 90, 0, 1)
            : 1
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          if (elapsed < p.delay) continue
          const localMs = (elapsed - p.delay) % p.life
          const t = localMs / p.life
          const radius = p.startRadiusRatio * maxRadius * (1 - easeInOutCubic(t))
          const angle = p.baseAngle + t * p.angularSpeed + elapsed * 0.0014
          const pxX = Math.round((cx + Math.cos(angle) * radius) / 2) * 2
          const pxY = Math.round((cy + Math.sin(angle) * radius * 0.9) / 2) * 2

          const alpha =
            (t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1) * pullFade

          // Trailing 4x4 echo
          const trailAngle = angle - 0.18
          const trailR = radius + 14
          const tx = Math.round((cx + Math.cos(trailAngle) * trailR) / 2) * 2
          const ty = Math.round((cy + Math.sin(trailAngle) * trailR * 0.9) / 2) * 2
          ctx.globalAlpha = alpha * 0.5
          ctx.fillStyle = p.trailColor
          ctx.fillRect(tx - 2, ty - 2, 4, 4)

          // Main 8x8 pixel portal particle
          ctx.globalAlpha = alpha * 0.95
          ctx.fillStyle = p.color
          ctx.fillRect(pxX - 4, pxY - 4, 8, 8)
        }
      }

      // 4. Trailing violet sparks during Overworld reveal (1150ms–2200ms)
      if (elapsed >= NORMAL_MIDPOINT_MS) {
        const postElapsed = elapsed - NORMAL_MIDPOINT_MS
        for (let i = 0; i < sparks.length; i++) {
          const sp = sparks[i]
          const dt = postElapsed - sp.delay
          if (dt <= 0 || dt >= sp.life) continue
          const p = dt / sp.life
          const sec = dt / 1000
          const dist = sp.speed * sec * (1 - p * 0.25)
          const sx = Math.round((cx + Math.cos(sp.angle) * dist) / 2) * 2
          const sy = Math.round((cy + Math.sin(sp.angle) * dist) / 2) * 2

          // Trailing pixel spark echo
          const tailDist = Math.max(0, dist - 14)
          const tx = Math.round((cx + Math.cos(sp.angle) * tailDist) / 2) * 2
          const ty = Math.round((cy + Math.sin(sp.angle) * tailDist) / 2) * 2
          ctx.globalAlpha = clamp((1 - p) * 0.45, 0, 1)
          ctx.fillStyle = "#7e22ce"
          ctx.fillRect(tx - 2, ty - 2, 4, 4)

          ctx.globalAlpha = clamp(1 - p * p, 0, 1)
          ctx.fillStyle = sp.color
          ctx.fillRect(sx - sp.size / 2, sy - sp.size / 2, sp.size, sp.size)
        }
      }

      // 5. Pixel-art obsidian perimeter frame & animated amethyst corner/edge glints
      const frameEndMs = 1920
      if (elapsed < frameEndMs) {
        for (let i = 0; i < frameTiles.length; i++) {
          const tile = frameTiles[i]
          if (elapsed < tile.inDelay) continue

          let alpha = 1
          let scale = 1
          if (elapsed < tile.inDelay + 180) {
            const it = (elapsed - tile.inDelay) / 180
            scale = 0.4 + easeOutCubic(it) * 0.6
            alpha = clamp(it * 1.4, 0, 1)
          } else if (elapsed >= tile.outDelay) {
            const ot = clamp((elapsed - tile.outDelay) / 340, 0, 1)
            scale = 1 - ot * 0.7
            alpha = clamp(1 - ot, 0, 1)
          }

          if (alpha <= 0.02) continue
          const drawSize = Math.max(6, Math.round(tile.size * scale))
          const drawX = Math.round(tile.x + (tile.size - drawSize) / 2)
          const drawY = Math.round(tile.y + (tile.size - drawSize) / 2)
          ctx.globalAlpha = alpha * (tile.isCorner ? 0.96 : 0.84)
          ctx.drawImage(
            tile.isCrying ? sprites.crying_obsidian : sprites.obsidian,
            drawX,
            drawY,
            drawSize,
            drawSize
          )
        }

        const glintFadeIn = clamp(elapsed / 260, 0, 1)
        const glintFadeOut =
          elapsed > NORMAL_MIDPOINT_MS
            ? clamp(1 - (elapsed - NORMAL_MIDPOINT_MS) / 680, 0, 1)
            : 1
        const glintMasterAlpha = glintFadeIn * glintFadeOut

        if (glintMasterAlpha > 0.02) {
          for (let i = 0; i < glints.length; i++) {
            const g = glints[i]
            const twinkle = 0.5 + 0.5 * Math.sin(elapsed * g.speed + g.phase)
            if (twinkle < 0.25) continue
            ctx.globalAlpha = glintMasterAlpha * twinkle
            ctx.fillStyle = g.color
            ctx.fillRect(g.x, g.y, g.size, g.size)
          }
        }
      }

      // 6. Bright amethyst-white sealing flash across midpoint swap (~1150ms)
      if (elapsed >= 970 && elapsed <= 1390) {
        let flashAlpha = 0
        if (elapsed < 1105) {
          flashAlpha = (elapsed - 970) / 135
        } else if (elapsed < 1200) {
          flashAlpha = 1
        } else {
          flashAlpha = 1 - (elapsed - 1200) / 190
        }
        flashAlpha = clamp(flashAlpha, 0, 1)

        if (flashAlpha > 0.01) {
          ctx.globalAlpha = flashAlpha * 0.96
          ctx.fillStyle = elapsed < 1185 ? "#f5d0fe" : "#fae8ff"
          ctx.fillRect(-20, -20, vw + 40, vh + 40)

          const flashGrad = ctx.createRadialGradient(
            cx,
            cy,
            10,
            cx,
            cy,
            Math.max(vw, vh) * 0.72
          )
          flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha.toFixed(3)})`)
          flashGrad.addColorStop(0.55, `rgba(232, 121, 249, ${(flashAlpha * 0.6).toFixed(3)})`)
          flashGrad.addColorStop(1, "rgba(126, 34, 206, 0)")
          ctx.globalAlpha = 1
          ctx.fillStyle = flashGrad
          ctx.fillRect(-20, -20, vw + 40, vh + 40)
        }
      }

      ctx.restore()

      // 7. Crisp pixel HUD ticker (drawn without wobble so typography stays sharp)
      let hudAlpha = 0
      if (elapsed >= 130 && elapsed <= 2020) {
        if (elapsed < 280) hudAlpha = (elapsed - 130) / 150
        else if (elapsed > 1800) hudAlpha = (2020 - elapsed) / 220
        else hudAlpha = 1
      }
      drawHudTicker(
        ctx,
        vw,
        vh,
        elapsed,
        "VOLVIENDO AL OVERWORLD...",
        clamp((elapsed - 130) / 1890, 0, 1),
        portalIcon,
        pixelFont,
        "#a855f7",
        "#e879f9",
        hudAlpha,
        "#a855f7",
        "#f5d0fe",
        "rgba(232, 121, 249, 0.34)"
      )
    }

    const renderMinecraftTntTransition = (elapsed: number) => {
      // 1. Update upward scroll after midpoint swap has mounted PortfolioLanding
      if (midpointFiredRef.current) {
        postSwapFrames += 1
        if (!scrollInitialized && postSwapFrames >= 2) {
          const measuredMax = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
          )
          // Wait an extra frame if DOM height isn't non-zero yet (max 6 frames guard)
          if (measuredMax > 0 || postSwapFrames >= 6) {
            maxScroll = measuredMax
            scrollInitialized = true
            scrollStartMs = Math.max(BUILD_START_MS, elapsed)
            window.scrollTo({ top: maxScroll, behavior: "instant" })
          }
        } else if (scrollInitialized && elapsed < BUILD_END_MS) {
          const denom = Math.max(1, BUILD_END_MS - scrollStartMs)
          const u = clamp((elapsed - scrollStartMs) / denom, 0, 1)
          const eased = easeInOutCubic(u)
          const y = Math.round(maxScroll * (1 - eased))
          window.scrollTo({ top: y, behavior: "instant" })
        } else if (scrollInitialized && elapsed >= BUILD_END_MS && !heroScrollSnapped) {
          heroScrollSnapped = true
          window.scrollTo({ top: 0, behavior: "instant" })
        }
      }

      // 2. Compute camera shake across phases
      let shakeAmp = 0
      if (elapsed >= 350 && elapsed < PRIMARY_EXPLOSION_START_MS) {
        const fuseP = (elapsed - 350) / (PRIMARY_EXPLOSION_START_MS - 350)
        shakeAmp = 0.8 + fuseP * fuseP * 3.8
      } else if (
        elapsed >= PRIMARY_EXPLOSION_START_MS &&
        elapsed < PRIMARY_EXPLOSION_END_MS
      ) {
        const expP =
          (elapsed - PRIMARY_EXPLOSION_START_MS) /
          (PRIMARY_EXPLOSION_END_MS - PRIMARY_EXPLOSION_START_MS)
        shakeAmp = 13 * (1 - expP) * (1 - expP)
      } else {
        for (let i = 0; i < scene.miniExplosions.length; i++) {
          const m = scene.miniExplosions[i]
          if (elapsed >= m.triggerMs && elapsed < m.triggerMs + 320) {
            const mp = (elapsed - m.triggerMs) / 320
            shakeAmp = Math.max(shakeAmp, 6.5 * (1 - mp))
          }
        }
      }

      const shakeX =
        shakeAmp > 0.2
          ? Math.round(Math.sin(elapsed * 0.14) * shakeAmp)
          : 0
      const shakeY =
        shakeAmp > 0.2
          ? Math.round(Math.cos(elapsed * 0.19) * shakeAmp * 0.85)
          : 0

      // 3. Position & animate primed TNT video element (0ms – 970ms)
      const { originX, originY, targetX, targetY, cellSize } = scene
      const fuseMoveP = easeOutCubic(clamp(elapsed / 860, 0, 1))
      const arcLift = Math.sin(fuseMoveP * Math.PI) * -46
      const tntX = originX + (targetX - originX) * fuseMoveP
      const tntY = originY + (targetY - originY) * fuseMoveP + arcLift

      if (wrapEl) {
        if (elapsed < 980) {
          const swellP = clamp((elapsed - 760) / 220, 0, 1)
          const tntScale = 0.56 + fuseMoveP * 0.66 + swellP * 0.32
          const pulseFreq = 0.018 + fuseMoveP * 0.048
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * pulseFreq)
          const videoFade = elapsed > 910 ? clamp(1 - (elapsed - 910) / 70, 0, 1) : 1
          const basePx = vw < 640 ? 150 : 196

          wrapEl.style.display = "block"
          wrapEl.style.opacity = String(videoFade)
          wrapEl.style.width = `${basePx}px`
          wrapEl.style.height = `${basePx}px`
          wrapEl.style.transform = `translate3d(${Math.round(tntX - basePx / 2 + shakeX)}px, ${Math.round(tntY - basePx / 2 + shakeY)}px, 0) scale(${tntScale.toFixed(3)})`
          wrapEl.style.filter =
            pulse > 0.55
              ? `brightness(${(1 + pulse * 0.85).toFixed(2)}) drop-shadow(0 0 ${Math.round(14 + pulse * 18)}px rgba(255, 240, 210, 0.9))`
              : `drop-shadow(0 0 12px rgba(255, 72, 36, 0.55))`
        } else {
          wrapEl.style.display = "none"
          wrapEl.style.opacity = "0"
        }
      }

      // 4. Clear canvas & apply crisp camera shake transform
      ctx.clearRect(0, 0, vw, vh)
      ctx.imageSmoothingEnabled = false
      ctx.save()
      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY)
      }

      // Phase 1 fuse sparks, glow aura & smoke around moving TNT
      if (elapsed < PRIMARY_EXPLOSION_START_MS + 60) {
        const fuseP = clamp(elapsed / PRIMARY_EXPLOSION_START_MS, 0, 1)
        const pulse = 0.5 + 0.5 * Math.sin(elapsed * (0.018 + fuseP * 0.048))
        const glowRadius = 52 + fuseP * 74 + pulse * 24

        const grad = ctx.createRadialGradient(tntX, tntY, 6, tntX, tntY, glowRadius)
        grad.addColorStop(0, `rgba(255, 255, 255, ${(0.22 + pulse * 0.36).toFixed(3)})`)
        grad.addColorStop(0.55, `rgba(255, 107, 26, ${(0.18 + fuseP * 0.24).toFixed(3)})`)
        grad.addColorStop(1, "rgba(255, 59, 59, 0)")
        ctx.fillStyle = grad
        ctx.fillRect(
          tntX - glowRadius,
          tntY - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        )

        drawFuseParticles(ctx, tntX, tntY - (vw < 640 ? 28 : 38), elapsed, seed)
      }

      // Phase 2: Living Progressive Block-by-Block Construction Frontier (1040ms – 3400ms)
      const buildProgress = clamp(
        (elapsed - BUILD_START_MS) / (BUILD_END_MS - BUILD_START_MS),
        0,
        1
      )
      const waveY = getWaveY(buildProgress, vh, cellSize)

      if (elapsed >= PRIMARY_EXPLOSION_PEAK_MS && elapsed < BUILD_END_MS) {
        const { frontierBlocks, cols } = scene
        const bandHeight = cellSize * 5.2

        // Paint dark obsidian blueprint veil ABOVE the rising construction wave
        ctx.save()
        for (let col = 0; col < cols; col++) {
          const sample = frontierBlocks[col]
          if (!sample) continue
          const colWaveTop = Math.round(waveY + sample.colWaveOffset)
          if (colWaveTop > 0) {
            const veilH = Math.min(vh, colWaveTop + Math.round(cellSize * 0.4))
            ctx.fillStyle = "rgba(9, 6, 18, 0.92)"
            ctx.fillRect(col * cellSize, 0, cellSize + 0.5, veilH)

            // Crisp blueprint pixel grid ticks on the unbuilt upper void
            ctx.fillStyle = "rgba(167, 139, 250, 0.14)"
            ctx.fillRect(col * cellSize, 0, 1, veilH)
            for (let gy = 0; gy < veilH; gy += cellSize) {
              ctx.fillRect(col * cellSize, gy, cellSize, 1)
            }
          }
        }
        ctx.restore()

        // Paint the living block-by-block frontier band (blocks pop in ahead, clear behind)
        ctx.save()
        const popSpan = cellSize * 1.15
        const clearSpan = cellSize * 1.15
        for (let i = 0; i < frontierBlocks.length; i++) {
          const b = frontierBlocks[i]
          const localTop = waveY + b.colWaveOffset + b.cellJitter
          const blockCenterY = b.y + cellSize * 0.5
          const depth = blockCenterY - localTop

          if (depth < 0 || depth > bandHeight) continue

          let scale = 1
          let alpha = 1
          let driftY = 0

          if (depth < popSpan) {
            const tPop = depth / popSpan
            scale =
              tPop < 0.7
                ? 0.2 + (tPop / 0.7) * 0.88
                : 1.08 - ((tPop - 0.7) / 0.3) * 0.08
            alpha = clamp(tPop * 1.5, 0, 1)
          } else if (depth > bandHeight - clearSpan) {
            const tClear = (depth - (bandHeight - clearSpan)) / clearSpan
            scale = clamp(1 - tClear * 0.88, 0, 1)
            alpha = clamp(1 - tClear, 0, 1)
            driftY = tClear * 14
          }

          if (alpha <= 0.02 || scale <= 0.08) continue

          const drawSize = Math.max(4, Math.round(cellSize * scale))
          const drawX = Math.round(b.x + (cellSize - drawSize) / 2)
          const drawY = Math.round(b.y + driftY + (cellSize - drawSize) / 2)

          ctx.globalAlpha = alpha
          ctx.drawImage(sprites[b.kind], drawX, drawY, drawSize, drawSize)
        }
        ctx.restore()
      }

      // Phase 2: 3 Secondary Mini TNT Chain Explosions along the rising frontier
      for (let i = 0; i < scene.miniExplosions.length; i++) {
        const mini = scene.miniExplosions[i]
        const mx = Math.round(vw * mini.xRatio)
        const triggerBuildP = clamp(
          (mini.triggerMs - BUILD_START_MS) / (BUILD_END_MS - BUILD_START_MS),
          0,
          1
        )
        const my = Math.round(
          clamp(getWaveY(triggerBuildP, vh, cellSize) + cellSize * 1.4, 72, vh - 72)
        )

        if (elapsed >= mini.fuseMs && elapsed < mini.triggerMs) {
          const fp = (elapsed - mini.fuseMs) / (mini.triggerMs - mini.fuseMs)
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.06)
          const size = Math.round((cellSize * 0.95) * (1 + fp * 0.32))
          ctx.save()
          ctx.drawImage(sprites.tnt, mx - size / 2, my - size / 2, size, size)
          if (pulse > 0.45) {
            ctx.globalAlpha = 0.65 * pulse
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(mx - size / 2, my - size / 2, size, size)
          }
          ctx.restore()
          drawFuseParticles(ctx, mx, my - size / 2, elapsed + i * 97, seed + i)
        } else if (elapsed >= mini.triggerMs && elapsed < mini.triggerMs + 560) {
          drawPixelExplosion(
            ctx,
            sprites,
            mx,
            my,
            elapsed - mini.triggerMs,
            mini.smoke,
            mini.embers,
            mini.debris,
            190,
            135
          )
        }
      }

      // Phase 1 -> 2 Primary Pixel TNT Explosion + sealing flash over swap
      if (
        elapsed >= PRIMARY_EXPLOSION_START_MS &&
        elapsed <= PRIMARY_EXPLOSION_END_MS + 220
      ) {
        const expElapsed = elapsed - PRIMARY_EXPLOSION_START_MS
        drawPixelExplosion(
          ctx,
          sprites,
          targetX,
          targetY,
          expElapsed,
          scene.primarySmoke,
          scene.primaryEmbers,
          scene.primaryDebris,
          Math.hypot(vw, vh) * 0.56,
          Math.max(vw, vh) * 0.68
        )

        // Full-screen white/amber sealing flash peaking across midpointSwap (1000ms - 1150ms)
        if (elapsed >= 940 && elapsed <= 1280) {
          let flashAlpha = 0
          if (elapsed < 1040) {
            flashAlpha = (elapsed - 940) / 100
          } else if (elapsed < 1105) {
            flashAlpha = 1
          } else {
            flashAlpha = 1 - (elapsed - 1105) / 175
          }
          flashAlpha = clamp(flashAlpha, 0, 1)
          if (flashAlpha > 0.01) {
            ctx.save()
            ctx.globalAlpha = flashAlpha * 0.96
            ctx.fillStyle = elapsed < 1100 ? "#fffbeb" : "#fde68a"
            ctx.fillRect(-20, -20, vw + 40, vh + 40)
            ctx.restore()
          }
        }
      }

      // Phase 3 (3400ms – 4200ms): Final Hero Burst & Clean Reveal with green/gold XP orbs
      if (elapsed >= BUILD_END_MS) {
        const phase3Elapsed = elapsed - BUILD_END_MS
        const burstCenterX = vw * 0.5
        const burstCenterY = vh * 0.24

        // Scatter remaining top frontier blocks outward & upward
        if (phase3Elapsed < 480) {
          const sp = phase3Elapsed / 480
          const { frontierBlocks } = scene
          ctx.save()
          for (let i = 0; i < frontierBlocks.length; i++) {
            const b = frontierBlocks[i]
            if (b.row > 2) continue
            const dirX = b.x + cellSize * 0.5 >= burstCenterX ? 1 : -1
            const scatterX = b.x + dirX * sp * (36 + (b.col % 4) * 18)
            const scatterY = b.y - sp * (24 + (2 - b.row) * 28) + sp * sp * 70
            const scale = clamp(1 - sp * 0.75, 0, 1)
            const drawSize = Math.max(4, Math.round(cellSize * scale))
            ctx.globalAlpha = clamp(1 - sp, 0, 1)
            ctx.drawImage(
              sprites[b.kind],
              Math.round(scatterX + (cellSize - drawSize) / 2),
              Math.round(scatterY + (cellSize - drawSize) / 2),
              drawSize,
              drawSize
            )
          }
          ctx.restore()
        }

        // Emerald / amethyst pixel shockwave burst
        if (phase3Elapsed < 440) {
          const p = phase3Elapsed / 440
          const radius = easeOutCubic(p) * Math.max(vw, vh) * 0.45
          const segments = 40
          ctx.save()
          ctx.globalAlpha = clamp(1 - p, 0, 1)
          for (let i = 0; i < segments; i++) {
            const a = (i / segments) * Math.PI * 2
            const rx = Math.round((burstCenterX + Math.cos(a) * radius) / 4) * 4
            const ry = Math.round((burstCenterY + Math.sin(a) * radius * 0.65) / 4) * 4
            ctx.fillStyle = BURST_COLORS[i % BURST_COLORS.length]
            ctx.fillRect(rx - 3, ry - 3, 6, 6)
          }
          ctx.restore()
        }

        // Floating green/gold XP orbs
        ctx.save()
        for (let i = 0; i < scene.xpOrbs.length; i++) {
          const orb = scene.xpOrbs[i]
          const dt = phase3Elapsed - orb.delay
          if (dt <= 0 || dt >= orb.life) continue
          const p = dt / orb.life
          const sec = dt / 1000
          const ox = Math.round(vw * orb.xRatio + orb.vx * sec)
          const oy = Math.round(vh * orb.yStartRatio + orb.vy * sec)
          const alpha =
            p < 0.2 ? p / 0.2 : clamp(1 - (p - 0.35) / 0.65, 0, 1)

          ctx.globalAlpha = alpha
          ctx.fillStyle = "#081408"
          ctx.fillRect(ox - 1, oy - 1, orb.size + 2, orb.size + 2)
          ctx.fillStyle = orb.color
          ctx.fillRect(ox, oy, orb.size, orb.size)
          ctx.fillStyle = orb.coreColor
          ctx.fillRect(ox + 1, oy + 1, Math.max(2, Math.floor(orb.size / 3)), Math.max(2, Math.floor(orb.size / 3)))
        }
        ctx.restore()
      }

      // Crisp centered pixel HUD ticker during upward construction climb
      if (elapsed >= 1120 && elapsed <= 3620) {
        let hudAlpha = 1
        if (elapsed < 1260) hudAlpha = (elapsed - 1120) / 140
        else if (elapsed > 3440) hudAlpha = (3620 - elapsed) / 180

        const pct = Math.min(100, Math.round(buildProgress * 100))
        const pctLabel = String(pct).padStart(2, "0")
        drawHudTicker(
          ctx,
          vw,
          vh,
          elapsed,
          `CONSTRUYENDO MUNDO MINECRAFT... ${pctLabel}%`,
          buildProgress,
          sprites.tnt,
          pixelFont,
          "#2ee86c",
          "#ffcf4d",
          hudAlpha
        )
      }

      ctx.restore()
    }

    const totalMs = reducedMotion
      ? REDUCED_TOTAL_MS
      : world === "minecraft"
        ? MINECRAFT_TOTAL_MS
        : NORMAL_TOTAL_MS

    const midpointMs = reducedMotion
      ? REDUCED_MIDPOINT_MS
      : world === "minecraft"
        ? MINECRAFT_MIDPOINT_MS
        : NORMAL_MIDPOINT_MS

    const tick = (now: number) => {
      const elapsed = now - startTime

      if (!midpointFiredRef.current && elapsed >= midpointMs) {
        fireMidpointOnce()
      }

      if (reducedMotion) {
        renderReducedMotion(elapsed)
      } else if (world === "minecraft") {
        renderMinecraftTntTransition(elapsed)
      } else {
        renderPortalVortex(elapsed)
      }

      if (elapsed >= totalMs) {
        window.scrollTo({ top: 0, behavior: "instant" })
        if (wrapEl) {
          wrapEl.style.display = "none"
        }
        fireMidpointOnce()
        fireCompleteOnce()
        return
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("resize", syncCanvasSize)
      if (videoEl) {
        videoEl.pause()
      }
      if (wrapEl) {
        wrapEl.style.display = "none"
      }
    }
  }, [active])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={tntWrapRef}
        className="absolute top-0 left-0 z-[1] pointer-events-none will-change-transform"
        style={{ display: "none", transformOrigin: "center center" }}
      >
        <video
          ref={videoRef}
          src="/minecraft/tnt-fuse.webm"
          poster="/minecraft/tnt-fuse-frame.png"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain pointer-events-none"
          style={{ imageRendering: "pixelated" }}
          onPlaying={() => {
            if (fallbackImgRef.current) {
              fallbackImgRef.current.style.opacity = "0"
            }
          }}
          onError={() => {
            if (videoRef.current) {
              videoRef.current.style.display = "none"
            }
            if (fallbackImgRef.current) {
              fallbackImgRef.current.style.opacity = "1"
            }
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={fallbackImgRef}
          src="/minecraft/tnt-fuse-frame.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ opacity: 0, imageRendering: "pixelated" }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[2] w-full h-full pointer-events-auto"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}

export default TntBuildTransition
