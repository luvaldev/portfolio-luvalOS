"use client"

import { useEffect, useRef } from "react"

export interface BlockFallTransitionProps {
  active: boolean
  targetWorld: "minecraft" | "normal"
  origin?: { x: number; y: number } | null
  onMidpointSwap: () => void
  onComplete: () => void
}

type BlockKind =
  | "command"
  | "grass"
  | "dirt"
  | "stone"
  | "obsidian"
  | "crying_obsidian"
  | "amethyst"
  | "diamond_ore"
  | "emerald_ore"

interface BlockCell {
  col: number
  row: number
  x: number
  targetY: number
  startY: number
  kind: BlockKind
  fallDelay: number
  fallDur: number
  bounceDur: number
  releaseDelay: number
  releaseDropDur: number
  sparkSeed: number
}

interface ShockSpark {
  angle: number
  speed: number
  size: number
  color: string
  delay: number
  life: number
}

interface SceneData {
  vw: number
  vh: number
  cellSize: number
  cols: number
  rows: number
  originX: number
  originY: number
  releaseGravity: number
  blocks: BlockCell[]
  shockSparks: ShockSpark[]
}

const SHOCK_COLORS = [
  "#ff3b3b",
  "#ff6b4a",
  "#ffcf4d",
  "#b53cff",
  "#df96ff",
  "#3be8e8",
]

const XP_COLORS = ["#70f527", "#2ee86c", "#d4ff33", "#ffcf4d", "#ffe670"]

let cachedSprites: Record<BlockKind, HTMLCanvasElement> | null = null

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v
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

  const command = createSpriteCanvas((ctx) => {
    px(ctx, 0, 0, 16, 16, "#7a3d20")
    px(ctx, 1, 1, 14, 14, "#a85c36")
    px(ctx, 2, 2, 12, 12, "#cc7a4b")
    // Corner rivets
    px(ctx, 1, 1, 2, 2, "#592b15")
    px(ctx, 13, 1, 2, 2, "#592b15")
    px(ctx, 1, 13, 2, 2, "#592b15")
    px(ctx, 13, 13, 2, 2, "#592b15")
    px(ctx, 2, 2, 1, 1, "#eb9d6e")
    // Inner dark frame
    px(ctx, 3, 3, 10, 10, "#1d1628")
    px(ctx, 4, 4, 8, 8, "#2b223a")
    // 4-color core + center node
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

  const dirtPalette = ["#8a5a36", "#74492a", "#9c6841", "#5e391f", "#7d6859"] as const

  const dirt = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, dirtPalette, 101)
    // Subtle dark pebbles
    px(ctx, 3, 4, 2, 1, "#5e5753")
    px(ctx, 11, 9, 2, 2, "#4f4945")
    px(ctx, 6, 12, 2, 1, "#827973")
    addBlockBevel(ctx, "rgba(255,220,180,0.12)", "rgba(20,10,5,0.32)")
  })

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

  const stonePalette = ["#7d7d7d", "#6c6c6c", "#8f8f8f", "#5b5b5b", "#9e9e9e"] as const

  const stone = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, stonePalette, 303, true)
    px(ctx, 2, 3, 4, 1, "#a6a6a6")
    px(ctx, 9, 7, 5, 1, "#545454")
    px(ctx, 3, 11, 5, 1, "#626262")
    addBlockBevel(ctx, "rgba(255,255,255,0.14)", "rgba(0,0,0,0.28)")
  })

  const obsidianPalette = ["#140c21", "#1d1130", "#291842", "#0c0714", "#382159"] as const

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
    // Glowing crying magenta/violet veins
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

  const amethystPalette = ["#7339c9", "#8e52e6", "#ab73f7", "#532499", "#cfa6ff"] as const

  const amethyst = createSpriteCanvas((ctx) => {
    paintTexturedBase(ctx, amethystPalette, 606)
    // Crystal facet highlights
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

  cachedSprites = {
    command,
    grass,
    dirt,
    stone,
    obsidian,
    crying_obsidian,
    amethyst,
    diamond_ore,
    emerald_ore,
  }
  return cachedSprites
}

function pickBlockKind(
  col: number,
  row: number,
  rows: number,
  rng: () => number,
  targetWorld: "minecraft" | "normal"
): BlockKind {
  const distFromTop = rows - 1 - row
  const depthFromTop = distFromTop / Math.max(1, rows - 1)
  const r = rng()

  if (distFromTop <= 1) {
    if (targetWorld === "minecraft") {
      if (r < 0.5) return "grass"
      if (r < 0.76) return "command"
      return "amethyst"
    }
    if (r < 0.44) return "amethyst"
    if (r < 0.74) return "command"
    return "grass"
  }

  if (depthFromTop < 0.34) {
    if (r < 0.44) return "dirt"
    if (r < 0.64) return "amethyst"
    if (r < 0.78) return "grass"
    if (r < 0.9) return "stone"
    return "command"
  }

  if (depthFromTop < 0.72) {
    if (r < 0.4) return "stone"
    if (r < 0.55) return "dirt"
    if (r < 0.71) return "diamond_ore"
    if (r < 0.85) return "emerald_ore"
    if (r < 0.94) return "obsidian"
    return "amethyst"
  }

  // Deepest bedrock/obsidian layer
  if (r < 0.36) return "obsidian"
  if (r < 0.58) return "crying_obsidian"
  if (r < 0.74) return "diamond_ore"
  if (r < 0.88) return "emerald_ore"
  return (col + row) % 5 === 0 ? "command" : "stone"
}

function buildScene(
  vw: number,
  vh: number,
  targetWorld: "minecraft" | "normal",
  origin: { x: number; y: number } | null | undefined,
  seed: number
): SceneData {
  const cellSize = vw < 640 ? 44 : 56
  const cols = Math.max(1, Math.ceil(vw / cellSize))
  const rows = Math.max(1, Math.ceil(vh / cellSize))
  const scale = targetWorld === "minecraft" ? 1 : 2300 / 3000

  const originX =
    origin && Number.isFinite(origin.x) ? clamp(origin.x, 0, vw) : vw * 0.5
  const originY =
    origin && Number.isFinite(origin.y) ? clamp(origin.y, 0, vh) : Math.max(0, vh - 56)

  const rng = mulberry32(seed)
  const blocks: BlockCell[] = []

  const fallBeginMs = 200 * scale
  const sealEndMs = 1750 * scale
  const releaseBeginMs = 2050 * scale
  const totalMs = 3000 * scale
  const rowReleaseStep = Math.min(10, 140 / Math.max(1, rows))
  let minDropMs = totalMs - releaseBeginMs

  for (let row = 0; row < rows; row++) {
    const rowRatio = row / Math.max(1, rows - 1)
    for (let col = 0; col < cols; col++) {
      const colWave =
        cols <= 1 ? 0 : Math.abs(col - (cols - 1) / 2) / ((cols - 1) / 2)
      const jitter = hash2d(col, row, seed)

      const rawFallDur = (450 + (1 - rowRatio) * 140) * scale
      const bounceDur = 135 * scale
      const rawFallDelay =
        fallBeginMs +
        rowRatio * 660 * scale +
        colWave * 165 * scale +
        jitter * 65 * scale
      const maxFallDelay = Math.max(
        fallBeginMs,
        sealEndMs - rawFallDur - bounceDur - 16 * scale
      )
      const fallDelay = Math.min(rawFallDelay, maxFallDelay)

      const maxReleaseDelay = totalMs - 380 * scale
      const releaseDelay = Math.min(
        maxReleaseDelay,
        releaseBeginMs +
          colWave * 240 * scale +
          row * rowReleaseStep * scale +
          jitter * 38 * scale
      )
      const releaseDropDur = Math.max(360 * scale, totalMs - releaseDelay)
      if (releaseDropDur < minDropMs) {
        minDropMs = releaseDropDur
      }

      blocks.push({
        col,
        row,
        x: col * cellSize,
        targetY: vh - (row + 1) * cellSize,
        startY: -cellSize * (1.15 + rng() * 1.45),
        kind: pickBlockKind(col, row, rows, rng, targetWorld),
        fallDelay,
        fallDur: rawFallDur,
        bounceDur,
        releaseDelay,
        releaseDropDur,
        sparkSeed: Math.floor(rng() * 100000),
      })
    }
  }

  const minDropSec = Math.max(0.3, minDropMs / 1000)
  const releaseGravity = (2 * (vh + cellSize * 1.8)) / (minDropSec * minDropSec)

  const shockSparks: ShockSpark[] = []
  const sparkCount = 44
  for (let i = 0; i < sparkCount; i++) {
    const baseAngle = (i / sparkCount) * Math.PI * 2
    shockSparks.push({
      angle: baseAngle + (rng() - 0.5) * 0.22,
      speed: 220 + rng() * 520,
      size: rng() < 0.35 ? 8 : rng() < 0.7 ? 6 : 4,
      color: SHOCK_COLORS[i % SHOCK_COLORS.length],
      delay: rng() * 70 * scale,
      life: (260 + rng() * 170) * scale,
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
    releaseGravity,
    blocks,
    shockSparks,
  }
}

function drawPixelShockwave(
  ctx: CanvasRenderingContext2D,
  scene: SceneData,
  elapsed: number,
  scale: number
) {
  const shockDur = 380 * scale
  if (elapsed <= 0 || elapsed >= shockDur + 120 * scale) return

  const { originX, originY, vw, vh, shockSparks } = scene
  const maxRadius = Math.hypot(vw, vh) * 0.52

  if (elapsed < shockDur) {
    const p = clamp(elapsed / shockDur, 0, 1)
    const eased = 1 - (1 - p) * (1 - p)
    const radius = eased * maxRadius
    const alpha = clamp(1 - p, 0, 1)

    // Stepped pixel ring (sampled onto a 4px pixel grid)
    const segments = 48
    const stepSize = 6
    ctx.save()
    for (let ring = 0; ring < 2; ring++) {
      const r = ring === 0 ? radius : radius * 0.72
      if (r < 6) continue
      ctx.globalAlpha = ring === 0 ? alpha * 0.95 : alpha * 0.65
      ctx.fillStyle = ring === 0 ? "#df96ff" : "#ff4b4b"
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const pxX = Math.round((originX + Math.cos(a) * r) / 4) * 4
        const pxY = Math.round((originY + Math.sin(a) * r) / 4) * 4
        ctx.fillRect(pxX - stepSize / 2, pxY - stepSize / 2, stepSize, stepSize)
      }
    }

    // Core flash at origin
    if (p < 0.45) {
      const flashAlpha = (1 - p / 0.45) * 0.9
      const flashSize = Math.round((28 + p * 44) / 4) * 4
      ctx.globalAlpha = flashAlpha
      ctx.fillStyle = "#ffcf4d"
      ctx.fillRect(
        Math.round(originX - flashSize / 2),
        Math.round(originY - flashSize / 2),
        flashSize,
        flashSize
      )
    }
    ctx.restore()
  }

  ctx.save()
  for (let i = 0; i < shockSparks.length; i++) {
    const s = shockSparks[i]
    const localT = elapsed - s.delay
    if (localT <= 0 || localT >= s.life) continue
    const sp = localT / s.life
    const dist = s.speed * (localT / 1000) * (1 - sp * 0.35)
    const sx = Math.round((originX + Math.cos(s.angle) * dist) / 2) * 2
    const sy = Math.round((originY + Math.sin(s.angle) * dist) / 2) * 2
    ctx.globalAlpha = clamp(1 - sp * sp, 0, 1)
    ctx.fillStyle = s.color
    ctx.fillRect(sx - s.size / 2, sy - s.size / 2, s.size, s.size)
  }
  ctx.restore()
}

function drawHudPlate(
  ctx: CanvasRenderingContext2D,
  vw: number,
  vh: number,
  elapsed: number,
  targetWorld: "minecraft" | "normal",
  commandSprite: HTMLCanvasElement,
  fontFamily: string,
  startMs: number,
  endMs: number
) {
  if (elapsed < startMs || elapsed > endMs) return

  const dur = endMs - startMs
  const local = elapsed - startMs
  const fadeWindow = Math.min(90, dur * 0.2)
  let alpha = 1
  if (local < fadeWindow) {
    alpha = Math.ceil((local / fadeWindow) * 4) / 4
  } else if (local > dur - fadeWindow) {
    alpha = Math.ceil(((dur - local) / fadeWindow) * 4) / 4
  }
  alpha = clamp(alpha, 0, 1)
  if (alpha <= 0) return

  const isMobile = vw < 640
  const label =
    targetWorld === "minecraft"
      ? "EXECUTING /world minecraft..."
      : "RESTORING MINIMALIST VIEW..."
  const fontSize = isMobile ? 11 : 15
  const iconSize = isMobile ? 28 : 38
  const padX = isMobile ? 14 : 22
  const padY = isMobile ? 12 : 16
  const gap = isMobile ? 10 : 14

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.imageSmoothingEnabled = false
  ctx.font = `700 ${fontSize}px ${fontFamily}`
  const textWidth = Math.ceil(ctx.measureText(label).width)

  const plateW = Math.min(vw - 24, padX * 2 + iconSize + gap + textWidth + 8)
  const plateH = Math.max(iconSize + padY * 2, isMobile ? 56 : 72)
  const plateX = Math.round((vw - plateW) / 2)
  const plateY = Math.round((vh - plateH) / 2)

  // Drop shadow
  ctx.fillStyle = "rgba(4, 2, 10, 0.85)"
  ctx.fillRect(plateX + 6, plateY + 6, plateW, plateH)

  // Crisp 2-tier pixel border
  const accentBorder = targetWorld === "minecraft" ? "#9d5cff" : "#3be8e8"
  const innerBorder = targetWorld === "minecraft" ? "#3be8e8" : "#c4b5fd"
  ctx.fillStyle = "#090612"
  ctx.fillRect(plateX, plateY, plateW, plateH)
  ctx.fillStyle = accentBorder
  ctx.fillRect(plateX + 2, plateY + 2, plateW - 4, plateH - 4)
  ctx.fillStyle = "#120c22"
  ctx.fillRect(plateX + 4, plateY + 4, plateW - 8, plateH - 8)
  ctx.fillStyle = innerBorder
  ctx.fillRect(plateX + 6, plateY + 6, plateW - 12, 2)
  ctx.fillRect(plateX + 6, plateY + plateH - 8, plateW - 12, 2)

  // Pulsing Command Block sprite
  const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.018)
  const pulseStep = pulse > 0.66 ? 4 : pulse > 0.33 ? 2 : 0
  const drawIconSize = iconSize + pulseStep
  const iconX = Math.round(plateX + padX - pulseStep / 2)
  const iconY = Math.round(plateY + (plateH - drawIconSize) / 2)

  if (pulse > 0.35) {
    ctx.fillStyle = targetWorld === "minecraft" ? "rgba(59, 232, 232, 0.28)" : "rgba(181, 60, 255, 0.28)"
    ctx.fillRect(iconX - 3, iconY - 3, drawIconSize + 6, drawIconSize + 6)
  }
  ctx.drawImage(commandSprite, iconX, iconY, drawIconSize, drawIconSize)

  // Pixel label text with hard shadow
  const textX = plateX + padX + iconSize + gap
  const textY = Math.round(plateY + plateH / 2 + fontSize * 0.32) - 4
  const maxTextW = Math.max(40, plateX + plateW - padX - textX)

  ctx.textBaseline = "alphabetic"
  ctx.fillStyle = "#07040d"
  ctx.fillText(label, textX + 2, textY + 2, maxTextW)
  ctx.fillStyle = "#f8fafc"
  ctx.fillText(label, textX, textY, maxTextW)

  // Segmented pixel progress bar under text
  const barX = textX
  const barY = textY + (isMobile ? 7 : 9)
  const barW = Math.max(40, plateX + plateW - padX - barX)
  const progress = clamp(local / dur, 0, 1)
  const segments = 12
  const segGap = 2
  const segW = Math.max(2, Math.floor((barW - segGap * (segments - 1)) / segments))
  const litSegments = Math.ceil(progress * segments)

  for (let s = 0; s < segments; s++) {
    const sx = barX + s * (segW + segGap)
    ctx.fillStyle =
      s < litSegments
        ? s % 2 === 0
          ? "#2ee86c"
          : "#3be8e8"
        : "rgba(255, 255, 255, 0.14)"
    ctx.fillRect(sx, barY, segW, 4)
  }

  ctx.restore()
}

function drawXpTrailSparks(
  ctx: CanvasRenderingContext2D,
  block: BlockCell,
  blockY: number,
  cellSize: number,
  elapsed: number,
  vh: number
) {
  if (elapsed <= block.releaseDelay) return
  const dt = (elapsed - block.releaseDelay) / 1000
  if (blockY > vh + cellSize * 1.4) return

  ctx.save()
  // Emit 2 deterministic XP sparks trailing behind the falling block
  for (let i = 0; i < 2; i++) {
    const h1 = hash2d(block.col + i * 17, block.row, block.sparkSeed)
    const h2 = hash2d(block.row, block.col + i * 31, block.sparkSeed + 9)
    const life = 0.28 + h1 * 0.24
    const phase = dt / life
    if (phase > 1.25) continue

    const sx = Math.round(
      block.x + cellSize * (0.18 + h1 * 0.64) + (h2 - 0.5) * 24 * phase
    )
    const sy = Math.round(blockY - 4 - phase * (24 + h2 * 30))
    if (sy < -12 || sy > vh + 12) continue

    const size = h1 < 0.4 ? 6 : 4
    ctx.globalAlpha = clamp(1 - phase * 0.8, 0, 1)
    ctx.fillStyle = XP_COLORS[(block.col + block.row + i) % XP_COLORS.length]
    ctx.fillRect(sx, sy, size, size)
  }
  ctx.restore()
}

export function BlockFallTransition({
  active,
  targetWorld,
  origin,
  onMidpointSwap,
  onComplete,
}: BlockFallTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
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
    const seed = (activationSeedRef.current = (activationSeedRef.current + 1337) | 0)

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const sprites = getBlockSprites()
    const pixelFont = resolvePixelFontFamily()

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let vw = window.innerWidth
    let vh = window.innerHeight
    let scene = buildScene(vw, vh, world, initialOrigin, seed)

    const syncCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      vw = window.innerWidth
      vh = window.innerHeight
      canvas.width = Math.max(1, Math.floor(vw * dpr))
      canvas.height = Math.max(1, Math.floor(vh * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      scene = buildScene(vw, vh, world, initialOrigin, seed)
    }

    syncCanvasSize()
    window.addEventListener("resize", syncCanvasSize)

    const scale = world === "minecraft" ? 1 : 2300 / 3000
    const totalMs = reducedMotion ? 650 : 3000 * scale
    const midpointMs = reducedMotion ? 325 : 1850 * scale
    const sealEndMs = 1750 * scale
    const hudStartMs = 1450 * scale
    const hudEndMs = 2050 * scale
    const releaseBeginMs = 2050 * scale

    let rafId = 0
    const startTime = performance.now()

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

      // 8 stepped pixel crossfade levels
      let coverage = 1
      if (elapsed < 260) {
        coverage = Math.ceil((elapsed / 260) * 6) / 6
      } else if (elapsed > 390) {
        coverage = Math.ceil(((650 - elapsed) / 260) * 6) / 6
      }
      coverage = clamp(coverage, 0, 1)

      if (coverage > 0) {
        ctx.save()
        ctx.globalAlpha = coverage
        ctx.fillStyle = "#0b0714"
        ctx.fillRect(0, 0, vw, vh)

        // Crisp mosaic of sprites over the backdrop
        const { blocks, cellSize } = scene
        ctx.globalAlpha = coverage * 0.92
        for (let i = 0; i < blocks.length; i++) {
          const b = blocks[i]
          ctx.drawImage(sprites[b.kind], b.x, b.targetY, cellSize + 0.5, cellSize + 0.5)
        }
        ctx.restore()
      }

      drawHudPlate(
        ctx,
        vw,
        vh,
        elapsed,
        world,
        sprites.command,
        pixelFont,
        140,
        510
      )
    }

    const renderFullAnimation = (elapsed: number) => {
      ctx.clearRect(0, 0, vw, vh)
      ctx.imageSmoothingEnabled = false

      const { blocks, cellSize, releaseGravity } = scene
      const bounceHeight = Math.min(12, cellSize * 0.2)

      // 1. Expanding pixel shockwave + redstone/amethyst sparks
      drawPixelShockwave(ctx, scene, elapsed, scale)

      // 2. While 100% sealed (between sealEnd and releaseBegin), backstop any fractional-DPR seam
      if (elapsed >= sealEndMs && elapsed < releaseBeginMs) {
        ctx.fillStyle = "#0e0918"
        ctx.fillRect(0, 0, vw, vh)
      }

      // 3. Render blocks (bottom row to top row)
      const isSealedWindow = elapsed >= sealEndMs && elapsed < releaseBeginMs
      const drawSize = isSealedWindow ? cellSize + 0.5 : cellSize

      ctx.save()
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]
        if (elapsed < b.fallDelay) continue

        let y = b.targetY

        if (elapsed < b.fallDelay + b.fallDur) {
          // Gravity acceleration from above viewport
          const u = (elapsed - b.fallDelay) / b.fallDur
          y = b.startY + (b.targetY - b.startY) * (u * u)
        } else if (elapsed < b.fallDelay + b.fallDur + b.bounceDur) {
          // Crisp 1-bounce landing
          const bu = (elapsed - b.fallDelay - b.fallDur) / b.bounceDur
          y = b.targetY - bounceHeight * 4 * bu * (1 - bu)
        } else if (elapsed >= b.releaseDelay) {
          // Staggered column cascade falling off-screen downward with uniform gravity
          const dt = (elapsed - b.releaseDelay) / 1000
          y = b.targetY + 0.5 * releaseGravity * dt * dt
        }

        if (y > vh + cellSize || y + cellSize < -cellSize * 2.8) continue

        const drawX = Math.round(b.x)
        const drawY = Math.round(y)
        ctx.drawImage(sprites[b.kind], drawX, drawY, drawSize, drawSize)

        if (elapsed >= b.releaseDelay) {
          drawXpTrailSparks(ctx, b, drawY, cellSize, elapsed, vh)
        }
      }
      ctx.restore()

      // 4. Centered crisp pixel HUD plate
      drawHudPlate(
        ctx,
        vw,
        vh,
        elapsed,
        world,
        sprites.command,
        pixelFont,
        hudStartMs,
        hudEndMs
      )
    }

    const tick = (now: number) => {
      const elapsed = now - startTime

      if (!midpointFiredRef.current && elapsed >= midpointMs) {
        fireMidpointOnce()
      }

      if (reducedMotion) {
        renderReducedMotion(elapsed)
      } else {
        renderFullAnimation(elapsed)
      }

      if (elapsed >= totalMs) {
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
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] w-full h-full pointer-events-auto"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  )
}

export default BlockFallTransition
