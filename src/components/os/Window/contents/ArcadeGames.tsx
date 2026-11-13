"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useOSStore } from "@/store/useOSStore"
import {
  PixelBookSprite,
  PixelCommandBlockIcon,
  PixelDiamondIcon,
  PixelEmeraldIcon,
  PixelEnderChestIcon,
  PixelExternalLinkIcon,
  PixelFurnaceIcon,
  PixelGrassBlockIcon,
  PixelRedstoneRepeaterIcon,
  PixelSwordCodeIcon,
  PixelTntBlockIcon,
  PixelTrophyMedalIcon,
} from "@/components/icons/PixelIcons"

/* ── Shared Helper to Launch Another App Window from Inside Arcade Hub ── */
function useOpenArcadeWindow() {
  const { openWindow, windows, focusWindow } = useOSStore()

  return useCallback(
    (id: string, title: string, width = 940, height = 650) => {
      if (windows[id]) {
        focusWindow(id)
        return
      }
      import("../../WindowContent").then((mod) => {
        const map: Record<string, React.ComponentType> = {
          "arcade-hub": mod.ArcadeHubContent,
          minecraft: mod.MinecraftWebContent,
          "creeper-sweeper": mod.CreeperSweeperContent,
          "redstone-snake": mod.RedstoneSnakeContent,
          "nether-invaders": mod.NetherInvadersContent,
          "memory-enchants": mod.MemoryEnchantsContent,
          trash: mod.TrashContent,
        }
        const Comp = map[id]
        openWindow(id, {
          title,
          icon: "🎮",
          content: Comp ? React.createElement(Comp) : undefined,
          x: 90 + (Object.keys(windows).length % 4) * 28,
          y: 54 + (Object.keys(windows).length % 3) * 22,
          width,
          height,
        })
      })
    },
    [openWindow, windows, focusWindow],
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. ARCADE HUB (Launcher Central en el Escritorio)
   ═══════════════════════════════════════════════════════════════════════════ */
export function ArcadeHubContent() {
  const launch = useOpenArcadeWindow()

  const games = [
    {
      id: "minecraft",
      title: "Minecraft Web · Eaglercraft",
      subtitle: "Eaglercraft Web + Sandbox Voxel 2D Instantáneo",
      tag: "SANDBOX 3D / 2D",
      accent: "#2ee86c",
      width: 1020,
      height: 680,
      icon: <PixelGrassBlockIcon size={38} />,
    },
    {
      id: "creeper-sweeper",
      title: "CreeperSweeper",
      subtitle: "Buscaminas clásico con Creepers, antorchas y niveles",
      tag: "ESTRATEGIA",
      accent: "#ffcf4d",
      width: 720,
      height: 620,
      icon: <PixelTntBlockIcon size={38} />,
    },
    {
      id: "redstone-snake",
      title: "Redstone Snake",
      subtitle: "Arcade 60 FPS: recolecta manzanas doradas y esmeraldas",
      tag: "ARCADE CANVAS",
      accent: "#52ffd5",
      width: 720,
      height: 640,
      icon: <PixelRedstoneRepeaterIcon size={38} />,
    },
    {
      id: "nether-invaders",
      title: "Nether Invaders",
      subtitle: "Shooter arcade contra oleadas de Ghasts y Blazes",
      tag: "SHOOTER RETRO",
      accent: "#ff70b8",
      width: 760,
      height: 640,
      icon: <PixelSwordCodeIcon size={38} />,
    },
    {
      id: "memory-enchants",
      title: "Memoria Arcana",
      subtitle: "Encuentra los pares de artefactos y minerales encantados",
      tag: "PUZZLE 4×4",
      accent: "#c084fc",
      width: 680,
      height: 610,
      icon: <PixelBookSprite size={38} />,
    },
  ]

  return (
    <div className="p-2 sm:p-3 text-[#f4edff] space-y-6">
      {/* Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-gradient-to-r from-[#231442] via-[#1c1036] to-[#17122b] border-3 border-[#0c0717] shadow-[4px_4px_0_#07040d]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 grid place-items-center bg-[#140c24] border-2 border-[#7c30a4] shadow-[2px_2px_0_#07040d]">
            <PixelCommandBlockIcon size={34} />
          </div>
          <div>
            <span className="mc-pixel-font text-[10px] tracking-widest text-[#2ee86c] block">
              LUVAL@STATION // SALA ARCADE
            </span>
            <h1 className="mc-pixel-font text-lg sm:text-2xl font-bold text-[#ffffff]">
              Computador Arcade Pixel-Art
            </h1>
            <p className="text-xs text-[#cfc6e3] mt-0.5">
              Toda tu info profesional vive en la landing. Aquí solo quedan juegos arcade, Minecraft Web y la Papelera.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#120b21] border-2 border-[#3c2763]">
          <PixelEmeraldIcon size={20} />
          <span className="mc-pixel-font text-[10px] text-[#ffe694]">5 JUEGOS LISTOS</span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => launch(g.id, g.title, g.width, g.height)}
            className="group text-left p-4 bg-[#171129] border-3 border-[#0c0717] shadow-[4px_4px_0_#07040d] hover:border-[#ffcf4d] hover:-translate-y-0.5 transition-all cursor-pointer flex items-start gap-3.5"
          >
            <div className="w-14 h-14 shrink-0 grid place-items-center bg-[#231a3d] border-2 border-[#3f2f66] group-hover:border-[#2ee86c] transition-colors">
              {g.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="mc-pixel-font text-[10px] tracking-wider" style={{ color: g.accent }}>
                  {g.tag}
                </span>
                <span className="mc-pixel-font text-[10px] text-[#ffcf4d] opacity-80 group-hover:opacity-100">
                  JUGAR ▸
                </span>
              </div>
              <h2 className="mc-pixel-font text-sm sm:text-base font-bold text-[#ffffff] group-hover:text-[#52ffd5] transition-colors">
                {g.title}
              </h2>
              <p className="text-xs text-[#c2b8d9] mt-1 leading-relaxed">{g.subtitle}</p>
            </div>
          </button>
        ))}

        {/* Quick Trash Shortcut Card */}
        <button
          type="button"
          onClick={() => launch("trash", "Papelera", 680, 560)}
          className="group text-left p-4 bg-[#171129] border-3 border-[#0c0717] shadow-[4px_4px_0_#07040d] hover:border-[#ff7070] hover:-translate-y-0.5 transition-all cursor-pointer flex items-start gap-3.5"
        >
          <div className="w-14 h-14 shrink-0 grid place-items-center bg-[#291724] border-2 border-[#59293d]">
            <PixelFurnaceIcon size={36} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="mc-pixel-font text-[10px] tracking-wider text-[#ff8585]">SISTEMA</span>
              <span className="mc-pixel-font text-[10px] text-[#ffcf4d]">ABRIR ▸</span>
            </div>
            <h2 className="mc-pixel-font text-sm sm:text-base font-bold text-[#ffffff]">
              Papelera de Reciclaje
            </h2>
            <p className="text-xs text-[#c2b8d9] mt-1 leading-relaxed">
              Conserva tus archivos clásicos descartados y logs ocultos en la zona de lava.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. MINECRAFT WEB (Eaglercraft Web + Sandbox Voxel 2D Instantáneo)
   ═══════════════════════════════════════════════════════════════════════════ */
type VoxelBlockId = "air" | "grass" | "dirt" | "stone" | "wood" | "leaf" | "water" | "brick" | "diamond" | "tnt"

const VOXEL_PALETTE: Array<{ id: Exclude<VoxelBlockId, "air">; label: string; top: string; fill: string }> = [
  { id: "grass", label: "Pasto", top: "#5bb832", fill: "#7a5230" },
  { id: "dirt", label: "Tierra", top: "#8c5f3a", fill: "#6e4726" },
  { id: "stone", label: "Piedra", top: "#9da5b5", fill: "#69707d" },
  { id: "wood", label: "Madera", top: "#b57d45", fill: "#855529" },
  { id: "leaf", label: "Hojas", top: "#42a840", fill: "#287526" },
  { id: "water", label: "Agua", top: "#4f86f7", fill: "#2a56c6" },
  { id: "brick", label: "Ladrillo", top: "#b85042", fill: "#8a3126" },
  { id: "diamond", label: "Diamante", top: "#6ef9ff", fill: "#1fa7c9" },
  { id: "tnt", label: "TNT", top: "#ff5959", fill: "#c92424" },
]

function createInitialTerrain(): VoxelBlockId[][] {
  const rows = 14
  const cols = 26
  const grid: VoxelBlockId[][] = Array.from({ length: rows }, () => Array<VoxelBlockId>(cols).fill("air"))
  for (let c = 0; c < cols; c++) {
    const surface = 8 + Math.round(Math.sin(c * 0.42) * 1.4)
    grid[surface][c] = "grass"
    for (let r = surface + 1; r < rows; r++) {
      grid[r][c] = r > surface + 2 ? "stone" : "dirt"
    }
    if (c === 21 || c === 22) {
      grid[12][c] = "diamond"
    }
  }
  // Small pixel oak tree at col 6
  const treeBase = 8 + Math.round(Math.sin(6 * 0.42) * 1.4)
  for (let h = 1; h <= 3; h++) grid[treeBase - h][6] = "wood"
  for (let dc = -1; dc <= 1; dc++) {
    grid[treeBase - 4][6 + dc] = "leaf"
    grid[treeBase - 3][6 + dc] = grid[treeBase - 3][6 + dc] === "wood" ? "wood" : "leaf"
  }
  grid[treeBase - 5][6] = "leaf"
  return grid
}

export function MinecraftWebContent() {
  const [mode, setMode] = useState<"eagler" | "sandbox">("eagler")
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const [selectedBlock, setSelectedBlock] = useState<Exclude<VoxelBlockId, "air">>("grass")
  const [terrain, setTerrain] = useState<VoxelBlockId[][]>(() => createInitialTerrain())
  const [isPainting, setIsPainting] = useState(false)
  const [creeperCol, setCreeperCol] = useState(14)

  // Move mini pixel mob slowly inside 2D sandbox
  useEffect(() => {
    if (mode !== "sandbox") return
    const id = setInterval(() => {
      setCreeperCol((prev) => (prev + 1) % 26)
    }, 900)
    return () => clearInterval(id)
  }, [mode])

  const enterFullscreen = () => {
    iframeContainerRef.current?.requestFullscreen?.().catch(() => {})
  }

  const handleCellAction = (r: number, c: number, erase = false) => {
    setTerrain((prev) => {
      const next = prev.map((row) => [...row])
      if (erase) {
        next[r][c] = "air"
        return next
      }
      if (next[r][c] === "tnt") {
        // Trigger a 3x3 TNT blast!
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < next.length && nc >= 0 && nc < next[0].length) {
              next[nr][nc] = "air"
            }
          }
        }
        return next
      }
      next[r][c] = next[r][c] === "air" ? selectedBlock : "air"
      return next
    })
  }

  return (
    <div className="flex flex-col h-full text-[#f4edff] gap-3">
      {/* Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#19112b] border-2 border-[#3c2763]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("eagler")}
            className={`px-3 py-1.5 text-[11px] mc-pixel-font font-bold border-2 cursor-pointer transition-colors ${
              mode === "eagler"
                ? "bg-[#1a5c2d] border-[#2ee86c] text-[#ffffff]"
                : "bg-[#130d21] border-[#322252] text-[#b9add1] hover:text-white"
            }`}
          >
            EAGLERCRAFT WEB (1.8 / 1.12)
          </button>
          <button
            type="button"
            onClick={() => setMode("sandbox")}
            className={`px-3 py-1.5 text-[11px] mc-pixel-font font-bold border-2 cursor-pointer transition-colors ${
              mode === "sandbox"
                ? "bg-[#4f257d] border-[#df82ff] text-[#ffffff]"
                : "bg-[#130d21] border-[#322252] text-[#b9add1] hover:text-white"
            }`}
          >
            MINI-CRAFT 2D SANDBOX
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mode === "eagler" ? (
            <>
              <button
                type="button"
                onClick={enterFullscreen}
                className="px-3 py-1.5 text-[11px] mc-pixel-font font-bold bg-[#251840] border-2 border-[#5c3c99] text-[#ffe694] hover:border-[#ffcf4d] cursor-pointer"
              >
                PANTALLA COMPLETA
              </button>
              <a
                href="https://eaglercraft.com/es/play"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] mc-pixel-font font-bold bg-[#1a5c2d] border-2 border-[#2ee86c] text-[#ffffff] hover:brightness-110"
              >
                <span>ABRIR EAGLERCRAFT</span>
                <PixelExternalLinkIcon size={14} />
              </a>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setTerrain(createInitialTerrain())}
              className="px-3 py-1.5 text-[11px] mc-pixel-font font-bold bg-[#251840] border-2 border-[#5c3c99] text-[#52ffd5] hover:border-[#2ee86c] cursor-pointer"
            >
              REGENERAR MUNDO
            </button>
          )}
        </div>
      </div>

      {mode === "eagler" ? (
        <div ref={iframeContainerRef} className="relative flex-1 min-h-[420px] bg-[#07040f] border-3 border-[#140a24] flex flex-col">
          <iframe
            title="Minecraft Web · Eaglercraft"
            src="https://eaglercraft.com/es/play"
            className="w-full flex-1 border-0 bg-black"
            allow="fullscreen; pointer-lock; autoplay; gamepad; clipboard-read; clipboard-write"
            allowFullScreen
          />
          <div className="px-3 py-2 bg-[#140d24] border-t-2 border-[#2d1e4a] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#cfc6e3]">
            <span>
              Si tu navegador bloquea iframes externos (X-Frame-Options), usa{" "}
              <strong className="text-[#52ffd5]">ABRIR EAGLERCRAFT ↗</strong> o juega al instante en{" "}
              <button
                type="button"
                onClick={() => setMode("sandbox")}
                className="underline text-[#ffcf4d] hover:text-white cursor-pointer"
              >
                Mini-Craft 2D Sandbox
              </button>.
            </span>
          </div>
        </div>
      ) : (
        <div
          className="flex-1 flex flex-col gap-3 select-none"
          onMouseUp={() => setIsPainting(false)}
          onMouseLeave={() => setIsPainting(false)}
        >
          {/* 2D Voxel Grid */}
          <div
            className="flex-1 bg-gradient-to-b from-[#1a345e] via-[#274b80] to-[#3a6899] border-3 border-[#0c0717] p-2 grid gap-0 overflow-hidden min-h-[340px]"
            style={{ gridTemplateRows: "repeat(14, minmax(0, 1fr))" }}
          >
            {terrain.map((row, r) => (
              <div
                key={r}
                className="grid gap-0"
                style={{ gridTemplateColumns: "repeat(26, minmax(0, 1fr))" }}
              >
                {row.map((cell, c) => {
                  const cfg = VOXEL_PALETTE.find((b) => b.id === cell)
                  const isMobHere = r === 7 && c === creeperCol && cell === "air"
                  return (
                    <div
                      key={`${r}-${c}`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setIsPainting(true)
                        handleCellAction(r, c, e.button === 2)
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        handleCellAction(r, c, true)
                      }}
                      onMouseEnter={() => {
                        if (isPainting) handleCellAction(r, c, false)
                      }}
                      className="relative w-full h-full border border-white/[0.04] cursor-crosshair hover:outline hover:outline-1 hover:outline-white"
                      style={
                        cfg
                          ? {
                              backgroundColor: cfg.fill,
                              boxShadow: `inset 0 4px 0 ${cfg.top}`,
                            }
                          : undefined
                      }
                    >
                      {cell === "tnt" && (
                        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white bg-black/30">
                          TNT
                        </span>
                      )}
                      {isMobHere && (
                        <span
                          title="Creeper"
                          className="absolute inset-1 bg-[#2ee86c] border border-[#0b2e13]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Sandbox Hotbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#19112b] border-2 border-[#3c2763]">
            <div className="flex flex-wrap items-center gap-1.5">
              {VOXEL_PALETTE.map((blk) => (
                <button
                  key={blk.id}
                  type="button"
                  onClick={() => setSelectedBlock(blk.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] mc-pixel-font border-2 cursor-pointer transition-transform ${
                    selectedBlock === blk.id
                      ? "bg-[#312154] border-[#ffcf4d] text-white -translate-y-0.5"
                      : "bg-[#120c21] border-[#2e204a] text-[#b9add1]"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 border border-black"
                    style={{ background: blk.top }}
                  />
                  <span>{blk.label}</span>
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#cfc6e3]">
              Clic izq: construir / picar · Clic en TNT: detonar 3×3
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. CREEPERSWEEPER (Minecraft Minesweeper)
   ═══════════════════════════════════════════════════════════════════════════ */
type SweeperPreset = "aldea" | "caverna" | "nether"

const SWEEPER_PRESETS: Record<SweeperPreset, { label: string; rows: number; cols: number; mines: number }> = {
  aldea: { label: "Aldea 9×9", rows: 9, cols: 9, mines: 10 },
  caverna: { label: "Caverna 12×12", rows: 12, cols: 12, mines: 22 },
  nether: { label: "Nether 12×14", rows: 12, cols: 14, mines: 30 },
}

interface SweeperCell {
  isMine: boolean
  revealed: boolean
  flagged: boolean
  adj: number
}

function buildEmptyBoard(rows: number, cols: number): SweeperCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ isMine: false, revealed: false, flagged: false, adj: 0 })),
  )
}

function seedSweeperMines(
  rows: number,
  cols: number,
  mines: number,
  safeR: number,
  safeC: number,
  src: SweeperCell[][],
): SweeperCell[][] {
  const next = src.map((row) => row.map((cell) => ({ ...cell })))
  let placed = 0
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if ((Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) || next[r][c].isMine) continue
    next[r][c].isMine = true
    placed++
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr
          const nc = c + dc
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && next[nr][nc].isMine) count++
        }
      }
      next[r][c].adj = count
    }
  }
  return next
}

export function CreeperSweeperContent() {
  const [preset, setPreset] = useState<SweeperPreset>("aldea")
  const cfg = SWEEPER_PRESETS[preset]
  const [board, setBoard] = useState<SweeperCell[][]>(() => buildEmptyBoard(cfg.rows, cfg.cols))
  const [seeded, setSeeded] = useState(false)
  const [flagMode, setFlagMode] = useState(false)
  const [status, setStatus] = useState<"ready" | "playing" | "won" | "lost">("ready")
  const [seconds, setSeconds] = useState(0)

  const resetGame = useCallback(
    (nextPreset: SweeperPreset = preset) => {
      const p = SWEEPER_PRESETS[nextPreset]
      setPreset(nextPreset)
      setBoard(buildEmptyBoard(p.rows, p.cols))
      setSeeded(false)
      setStatus("ready")
      setSeconds(0)
    },
    [preset],
  )

  useEffect(() => {
    if (status !== "playing") return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [status])

  const revealCell = (r: number, c: number) => {
    if (status === "won" || status === "lost") return
    if (flagMode) {
      toggleFlag(r, c)
      return
    }
    let working = board.map((row) => row.map((cell) => ({ ...cell })))
    if (working[r][c].flagged || working[r][c].revealed) return

    if (!seeded) {
      working = seedSweeperMines(cfg.rows, cfg.cols, cfg.mines, r, c, working)
      setSeeded(true)
      setStatus("playing")
    }

    if (working[r][c].isMine) {
      for (let rr = 0; rr < cfg.rows; rr++) {
        for (let cc = 0; cc < cfg.cols; cc++) {
          if (working[rr][cc].isMine) working[rr][cc].revealed = true
        }
      }
      setBoard(working)
      setStatus("lost")
      return
    }

    const queue: Array<[number, number]> = [[r, c]]
    while (queue.length > 0) {
      const [cr, cc] = queue.shift()!
      const cell = working[cr][cc]
      if (cell.revealed || cell.flagged) continue
      cell.revealed = true
      if (cell.adj === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr
            const nc = cc + dc
            if (
              nr >= 0 &&
              nr < cfg.rows &&
              nc >= 0 &&
              nc < cfg.cols &&
              !working[nr][nc].revealed &&
              !working[nr][nc].isMine
            ) {
              queue.push([nr, nc])
            }
          }
        }
      }
    }

    const unrevealedSafe = working.flat().filter((cell) => !cell.isMine && !cell.revealed).length
    if (unrevealedSafe === 0) {
      setStatus("won")
    }
    setBoard(working)
  }

  const toggleFlag = (r: number, c: number) => {
    if (status === "won" || status === "lost") return
    setBoard((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })))
      if (!next[r][c].revealed) {
        next[r][c].flagged = !next[r][c].flagged
      }
      return next
    })
  }

  const flagsCount = board.flat().filter((c) => c.flagged).length
  const adjColor: Record<number, string> = {
    1: "#64b5f6",
    2: "#2ee86c",
    3: "#ff5c5c",
    4: "#c084fc",
    5: "#ffcf4d",
    6: "#52ffd5",
    7: "#ffffff",
    8: "#cbd5e1",
  }

  return (
    <div className="flex flex-col h-full items-center gap-3 p-2 text-[#f4edff]">
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 p-3 bg-[#19112b] border-2 border-[#3c2763]">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(SWEEPER_PRESETS) as SweeperPreset[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => resetGame(key)}
              className={`px-2.5 py-1 text-[10px] mc-pixel-font border-2 cursor-pointer ${
                preset === key
                  ? "bg-[#235432] border-[#2ee86c] text-white"
                  : "bg-[#120c21] border-[#322252] text-[#b9add1]"
              }`}
            >
              {SWEEPER_PRESETS[key].label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs mc-pixel-font">
          <span className="text-[#ff8585]">TNT: {cfg.mines - flagsCount}</span>
          <span className="text-[#52ffd5]">TIEMPO: {seconds}s</span>
          <button
            type="button"
            onClick={() => setFlagMode((v) => !v)}
            className={`px-2.5 py-1 text-[10px] border-2 cursor-pointer ${
              flagMode
                ? "bg-[#5c3d10] border-[#ffcf4d] text-[#ffe694]"
                : "bg-[#120c21] border-[#322252] text-[#cfc6e3]"
            }`}
          >
            ANTORCHA {flagMode ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => resetGame(preset)}
            className="px-2.5 py-1 text-[10px] bg-[#2e1e52] border-2 border-[#7c30a4] text-white cursor-pointer"
          >
            REINICIAR
          </button>
        </div>
      </div>

      {status === "won" && (
        <div className="mc-pixel-font text-xs px-4 py-2 bg-[#164a27] border-2 border-[#2ee86c] text-[#ffffff]">
          ¡VICTORIA! Limpiaste el campo de Creepers en {seconds}s.
        </div>
      )}
      {status === "lost" && (
        <div className="mc-pixel-font text-xs px-4 py-2 bg-[#5c1616] border-2 border-[#ff5959] text-[#ffffff]">
          ¡BOOM! Un Creeper detonó. Presiona REINICIAR para otro intento.
        </div>
      )}

      <div
        className="grid gap-1 p-3 bg-[#140e24] border-3 border-[#0a0612] shadow-[4px_4px_0_#07040d]"
        style={{ gridTemplateColumns: `repeat(${cfg.cols}, minmax(26px, 32px))` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => {
                e.preventDefault()
                toggleFlag(r, c)
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mc-pixel-font text-xs font-bold border-2 select-none cursor-pointer ${
                cell.revealed
                  ? cell.isMine
                    ? "bg-[#7a1b1b] border-[#ff5959] text-white"
                    : "bg-[#241b38] border-[#160f24]"
                  : "bg-[#3f3161] border-[#5f4b8f] hover:bg-[#4c3b73]"
              }`}
              style={{ color: cell.revealed && !cell.isMine ? adjColor[cell.adj] : undefined }}
            >
              {cell.revealed
                ? cell.isMine
                  ? "💥"
                  : cell.adj > 0
                    ? cell.adj
                    : ""
                : cell.flagged
                  ? "🔥"
                  : ""}
            </button>
          )),
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. REDSTONE SNAKE (60 FPS Canvas Arcade)
   ═══════════════════════════════════════════════════════════════════════════ */
export function RedstoneSnakeContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 })
  const pendingDirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 })
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    if (typeof window === "undefined") return 0
    return Number(localStorage.getItem("luval_snake_best") || "0")
  })
  const [gameOver, setGameOver] = useState(false)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const cur = dirRef.current
      if ((k === "arrowup" || k === "w") && cur.y !== 1) pendingDirRef.current = { x: 0, y: -1 }
      else if ((k === "arrowdown" || k === "s") && cur.y !== -1) pendingDirRef.current = { x: 0, y: 1 }
      else if ((k === "arrowleft" || k === "a") && cur.x !== 1) pendingDirRef.current = { x: -1, y: 0 }
      else if ((k === "arrowright" || k === "d") && cur.x !== -1) pendingDirRef.current = { x: 1, y: 0 }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const GRID = 20
    const TILE = 20
    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]
    dirRef.current = { x: 1, y: 0 }
    pendingDirRef.current = { x: 1, y: 0 }

    const spawnFood = (isEmerald: boolean) => ({
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
      emerald: isEmerald,
    })

    let food = spawnFood(false)
    let localScore = 0
    let alive = true

    const draw = () => {
      ctx.fillStyle = "#0d0917"
      ctx.fillRect(0, 0, GRID * TILE, GRID * TILE)
      // Subtle grid lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath()
        ctx.moveTo(i * TILE, 0)
        ctx.lineTo(i * TILE, GRID * TILE)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i * TILE)
        ctx.lineTo(GRID * TILE, i * TILE)
        ctx.stroke()
      }

      // Draw Food (Emerald or Golden Apple)
      ctx.fillStyle = food.emerald ? "#2ee86c" : "#ffcf4d"
      ctx.fillRect(food.x * TILE + 2, food.y * TILE + 2, TILE - 4, TILE - 4)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(food.x * TILE + 5, food.y * TILE + 5, 4, 4)

      // Draw Snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#52ffd5" : i % 2 === 0 ? "#e63946" : "#b81d2b"
        ctx.fillRect(seg.x * TILE + 1, seg.y * TILE + 1, TILE - 2, TILE - 2)
      })
    }

    draw()
    const timer = setInterval(() => {
      if (!alive) return
      dirRef.current = pendingDirRef.current
      const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y }

      const hitWall = head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID
      const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y)
      if (hitWall || hitSelf) {
        alive = false
        setGameOver(true)
        return
      }

      snake = [head, ...snake]
      if (head.x === food.x && head.y === food.y) {
        localScore += food.emerald ? 25 : 10
        setScore(localScore)
        if (localScore > best) {
          setBest(localScore)
          localStorage.setItem("luval_snake_best", String(localScore))
        }
        food = spawnFood(Math.random() > 0.72)
      } else {
        snake.pop()
      }
      draw()
    }, 105)

    return () => clearInterval(timer)
  }, [runId, best])

  const restart = () => {
    setScore(0)
    setGameOver(false)
    setRunId((n) => n + 1)
  }

  return (
    <div className="flex flex-col items-center gap-3 p-2 text-[#f4edff]">
      <div className="w-full max-w-[440px] flex items-center justify-between gap-3 p-3 bg-[#19112b] border-2 border-[#3c2763]">
        <div>
          <span className="mc-pixel-font text-[10px] text-[#52ffd5] block">PUNTUACIÓN</span>
          <strong className="mc-pixel-font text-base text-[#ffffff]">{score}</strong>
        </div>
        <div>
          <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">RÉCORD</span>
          <strong className="mc-pixel-font text-base text-[#ffe694]">{best}</strong>
        </div>
        <button
          type="button"
          onClick={restart}
          className="px-3 py-1.5 text-xs mc-pixel-font font-bold bg-[#2e1e52] border-2 border-[#7c30a4] text-white cursor-pointer"
        >
          REINICIAR
        </button>
      </div>

      <div className="relative border-4 border-[#130a24] shadow-[4px_4px_0_#07040d]">
        <canvas ref={canvasRef} width={400} height={400} className="block bg-[#0d0917]" />
        {gameOver && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <span className="mc-pixel-font text-lg font-bold text-[#ff7070]">GAME OVER</span>
            <span className="text-xs text-[#dfd7ec]">Puntaje final: {score}</span>
            <button
              type="button"
              onClick={restart}
              className="px-4 py-2 text-xs mc-pixel-font font-bold bg-[#1a5c2d] border-2 border-[#2ee86c] text-white cursor-pointer"
            >
              JUGAR DE NUEVO
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] font-mono text-[#b9add1]">
        Controles: Flechas o WASD · Manzana dorada (+10) · Esmeralda (+25)
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. NETHER INVADERS (Arcade Shooter Canvas)
   ═══════════════════════════════════════════════════════════════════════════ */
export function NetherInvadersContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const keysRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({
    left: false,
    right: false,
    fire: false,
  })
  const [score, setScore] = useState(0)
  const [wave, setWave] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "arrowleft" || k === "a") keysRef.current.left = true
      if (k === "arrowright" || k === "d") keysRef.current.right = true
      if (e.code === "Space") {
        e.preventDefault()
        keysRef.current.fire = true
      }
    }
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "arrowleft" || k === "a") keysRef.current.left = false
      if (k === "arrowright" || k === "d") keysRef.current.right = false
      if (e.code === "Space") keysRef.current.fire = false
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = 520
    const H = 380
    let playerX = W / 2 - 14
    let bullets: Array<{ x: number; y: number }> = []
    let enemyDir = 1
    let currentWave = 1
    let currentScore = 0
    let cooldown = 0
    let active = true

    const buildWave = (wNum: number) => {
      const list: Array<{ x: number; y: number; alive: boolean; kind: "ghast" | "blaze" }> = []
      const rows = Math.min(5, 2 + Math.floor(wNum / 2))
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < 8; c++) {
          list.push({
            x: 56 + c * 52,
            y: 36 + r * 36,
            alive: true,
            kind: r === 0 ? "ghast" : "blaze",
          })
        }
      }
      return list
    }

    let enemies = buildWave(1)
    let rafId = 0

    const loop = () => {
      if (!active) return
      if (keysRef.current.left) playerX = Math.max(8, playerX - 4.5)
      if (keysRef.current.right) playerX = Math.min(W - 36, playerX + 4.5)
      if (cooldown > 0) cooldown--
      if (keysRef.current.fire && cooldown === 0) {
        bullets.push({ x: playerX + 12, y: H - 34 })
        cooldown = 12
      }

      // Move bullets
      bullets = bullets.map((b) => ({ ...b, y: b.y - 7 })).filter((b) => b.y > -10)

      // Move enemies
      let hitEdge = false
      const speed = 0.7 + currentWave * 0.22
      for (const en of enemies) {
        if (!en.alive) continue
        en.x += enemyDir * speed
        if (en.x < 12 || en.x > W - 36) hitEdge = true
      }
      if (hitEdge) {
        enemyDir *= -1
        for (const en of enemies) {
          en.y += 14
          if (en.alive && en.y >= H - 46) {
            active = false
            setGameOver(true)
            return
          }
        }
      }

      // Collisions
      for (const b of bullets) {
        for (const en of enemies) {
          if (!en.alive) continue
          if (b.x > en.x - 4 && b.x < en.x + 24 && b.y > en.y && b.y < en.y + 22) {
            en.alive = false
            b.y = -99
            currentScore += en.kind === "ghast" ? 30 : 15
            setScore(currentScore)
          }
        }
      }

      if (enemies.every((e) => !e.alive)) {
        currentWave++
        setWave(currentWave)
        enemies = buildWave(currentWave)
      }

      // Draw Nether Backdrop
      ctx.fillStyle = "#16070d"
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = "#330d18"
      ctx.fillRect(0, H - 16, W, 16)

      // Draw Enemies
      for (const en of enemies) {
        if (!en.alive) continue
        ctx.fillStyle = en.kind === "ghast" ? "#f4f1ff" : "#ff9d26"
        ctx.fillRect(en.x, en.y, 24, 20)
        ctx.fillStyle = "#16070d"
        ctx.fillRect(en.x + 4, en.y + 6, 4, 4)
        ctx.fillRect(en.x + 16, en.y + 6, 4, 4)
        ctx.fillStyle = "#ff4d4d"
        ctx.fillRect(en.x + 8, en.y + 13, 8, 3)
      }

      // Draw Arrows
      ctx.fillStyle = "#52ffd5"
      for (const b of bullets) {
        ctx.fillRect(b.x, b.y, 4, 12)
      }

      // Draw Diamond Cannon
      ctx.fillStyle = "#38b6ff"
      ctx.fillRect(playerX, H - 30, 28, 12)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(playerX + 10, H - 38, 8, 8)

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [runId])

  const restart = () => {
    setScore(0)
    setWave(1)
    setGameOver(false)
    setRunId((n) => n + 1)
  }

  return (
    <div className="flex flex-col items-center gap-3 p-2 text-[#f4edff]">
      <div className="w-full max-w-[540px] flex items-center justify-between gap-3 p-3 bg-[#19112b] border-2 border-[#3c2763]">
        <div>
          <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">SCORE</span>
          <strong className="mc-pixel-font text-base text-[#ffffff]">{score}</strong>
        </div>
        <div className="flex items-center gap-2">
          <PixelTrophyMedalIcon rank={1} size={22} />
          <span className="mc-pixel-font text-xs text-[#2ee86c]">OLEADA {wave}</span>
        </div>
        <button
          type="button"
          onClick={restart}
          className="px-3 py-1.5 text-xs mc-pixel-font font-bold bg-[#2e1e52] border-2 border-[#7c30a4] text-white cursor-pointer"
        >
          REINICIAR
        </button>
      </div>

      <div className="relative border-4 border-[#2b0b16] shadow-[4px_4px_0_#07040d]">
        <canvas ref={canvasRef} width={520} height={380} className="block bg-[#16070d]" />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <span className="mc-pixel-font text-lg font-bold text-[#ff7070]">INVASIÓN COMPLETADA</span>
            <span className="text-xs text-[#dfd7ec]">
              Oleada {wave} · Puntaje final: {score}
            </span>
            <button
              type="button"
              onClick={restart}
              className="px-4 py-2 text-xs mc-pixel-font font-bold bg-[#1a5c2d] border-2 border-[#2ee86c] text-white cursor-pointer"
            >
              DEFENDER DE NUEVO
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] font-mono text-[#b9add1]">
        Controles: A / D o Flechas ← → para moverte · Barra Espaciadora para disparar
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. MEMORIA ARCANA (4×4 Pixel Art Card Memory)
   ═══════════════════════════════════════════════════════════════════════════ */
interface MemoryCard {
  uid: number
  pairId: string
  flipped: boolean
  matched: boolean
}

const MEMORY_SYMBOLS: Array<{ pairId: string; label: string; render: () => React.ReactNode }> = [
  { pairId: "sword", label: "Espada", render: () => <PixelSwordCodeIcon size={34} /> },
  { pairId: "diamond", label: "Diamante", render: () => <PixelDiamondIcon size={34} /> },
  { pairId: "emerald", label: "Esmeralda", render: () => <PixelEmeraldIcon size={34} /> },
  { pairId: "cmd", label: "Command", render: () => <PixelCommandBlockIcon size={34} /> },
  { pairId: "chest", label: "EnderChest", render: () => <PixelEnderChestIcon size={34} /> },
  { pairId: "furnace", label: "Horno", render: () => <PixelFurnaceIcon size={34} /> },
  { pairId: "tnt", label: "TNT", render: () => <PixelTntBlockIcon size={34} /> },
  { pairId: "book", label: "Tomo", render: () => <PixelBookSprite size={34} /> },
]

function buildShuffledDeck(): MemoryCard[] {
  const doubled = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[doubled[i], doubled[j]] = [doubled[j], doubled[i]]
  }
  return doubled.map((item, idx) => ({
    uid: idx,
    pairId: item.pairId,
    flipped: false,
    matched: false,
  }))
}

export function MemoryEnchantsContent() {
  const [cards, setCards] = useState<MemoryCard[]>(() => buildShuffledDeck())
  const [picked, setPicked] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const symbolMap = useMemo(
    () => Object.fromEntries(MEMORY_SYMBOLS.map((s) => [s.pairId, s])),
    [],
  )

  const handleFlip = (index: number) => {
    if (locked || cards[index].flipped || cards[index].matched) return
    const nextCards = cards.map((c, idx) => (idx === index ? { ...c, flipped: true } : c))
    const nextPicked = [...picked, index]
    setCards(nextCards)
    setPicked(nextPicked)

    if (nextPicked.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextPicked
      if (nextCards[a].pairId === nextCards[b].pairId) {
        setCards((prev) =>
          prev.map((c, idx) => (idx === a || idx === b ? { ...c, matched: true } : c)),
        )
        setPicked([])
      } else {
        setLocked(true)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) => (idx === a || idx === b ? { ...c, flipped: false } : c)),
          )
          setPicked([])
          setLocked(false)
        }, 680)
      }
    }
  }

  const allMatched = cards.every((c) => c.matched)

  const resetDeck = () => {
    setCards(buildShuffledDeck())
    setPicked([])
    setMoves(0)
    setLocked(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-2 text-[#f4edff]">
      <div className="w-full max-w-md flex items-center justify-between gap-3 p-3 bg-[#19112b] border-2 border-[#3c2763]">
        <div>
          <span className="mc-pixel-font text-[10px] text-[#c084fc] block">MOVIMIENTOS</span>
          <strong className="mc-pixel-font text-base text-white">{moves}</strong>
        </div>
        {allMatched && (
          <span className="mc-pixel-font text-xs text-[#2ee86c] font-bold">
            ¡MESA COMPLETADA!
          </span>
        )}
        <button
          type="button"
          onClick={resetDeck}
          className="px-3 py-1.5 text-xs mc-pixel-font font-bold bg-[#2e1e52] border-2 border-[#7c30a4] text-white cursor-pointer"
        >
          BARAJAR
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md w-full">
        {cards.map((card, idx) => {
          const isOpen = card.flipped || card.matched
          const sym = symbolMap[card.pairId]
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleFlip(idx)}
              className={`aspect-square flex flex-col items-center justify-center border-3 transition-all cursor-pointer ${
                card.matched
                  ? "bg-[#163826] border-[#2ee86c]"
                  : isOpen
                    ? "bg-[#2b1b4a] border-[#ffcf4d]"
                    : "bg-[#1a122e] border-[#432d70] hover:border-[#b565f2]"
              }`}
            >
              {isOpen ? (
                <>
                  {sym?.render()}
                  <span className="mc-pixel-font text-[9px] text-[#efe7ff] mt-1">{sym?.label}</span>
                </>
              ) : (
                <span className="mc-pixel-font text-lg text-[#7a5ca8]">?</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
