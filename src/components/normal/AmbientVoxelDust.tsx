"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  colorIdx: number
  alpha: number
  phase: number
}

const DARK_COLORS = ["#34d399", "#10b981", "#22d3ee", "#c084fc", "#e4e4e7"]
const LIGHT_COLORS = ["#059669", "#10b981", "#0284c7", "#7e22ce", "#52525b"]

function createParticles(w: number, h: number, count: number): DustParticle[] {
  const list: DustParticle[] = []
  let seed = 918273
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  for (let i = 0; i < count; i++) {
    list.push({
      x: next() * w,
      y: next() * h,
      vx: (next() - 0.5) * 0.22,
      vy: -(0.12 + next() * 0.28),
      size: next() > 0.65 ? 3 : 2,
      colorIdx: Math.floor(next() * DARK_COLORS.length),
      alpha: 0.22 + next() * 0.35,
      phase: next() * Math.PI * 2,
    })
  }
  return list
}

/**
 * Lightweight ambient geometric particle & network-link canvas.
 * Subtle mineral sparks (amber, emerald, cyan, amethyst) drifting upward with thin network links.
 */
export default function AmbientVoxelDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isLightRef = useRef(false)

  useEffect(() => {
    isLightRef.current = resolvedTheme === "light"
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let particles = createParticles(w, h, Math.min(46, Math.max(24, Math.floor(w / 32))))

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(w, h, Math.min(46, Math.max(24, Math.floor(w / 32))))
    }

    resize()
    window.addEventListener("resize", resize)

    let raf = 0
    let lastDraw = 0
    const FRAME_MS = 1000 / 30

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden || now - lastDraw < FRAME_MS) return
      lastDraw = now

      ctx.clearRect(0, 0, w, h)
      const light = isLightRef.current
      const palette = light ? LIGHT_COLORS : DARK_COLORS
      const linkRgb = light ? "24, 24, 27" : "228, 228, 231"
      const maxDist = 118

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx + Math.sin(now * 0.0005 + p.phase) * 0.08
        p.y += p.vy

        if (p.y < -12) {
          p.y = h + 12
          p.x = (p.x + w * 0.37) % w
        }
        if (p.x < -12) p.x = w + 12
        if (p.x > w + 12) p.x = -12
      }

      // Thin network constellation lines between nearby mineral sparks
      ctx.lineWidth = 0.75
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (light ? 0.08 : 0.075)
            ctx.strokeStyle = `rgba(${linkRgb}, ${lineAlpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw crisp small square sparks (abstract voxel dust)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const pulse = 0.78 + 0.22 * Math.sin(now * 0.0018 + p.phase)
        ctx.globalAlpha = p.alpha * pulse * (light ? 0.65 : 0.85)
        ctx.fillStyle = palette[p.colorIdx]
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
      }
      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 w-full h-full"
    />
  )
}

