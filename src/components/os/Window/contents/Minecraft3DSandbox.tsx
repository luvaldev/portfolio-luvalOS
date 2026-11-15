"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export type BlockType3D =
  | "grass"
  | "dirt"
  | "stone"
  | "wood"
  | "leaf"
  | "plank"
  | "diamond"
  | "tnt"

interface BlockDef {
  id: BlockType3D
  label: string
  colorTop: string
  colorSide: string
  accent: string
}

export const BLOCK_DEFS_3D: BlockDef[] = [
  { id: "grass", label: "Pasto", colorTop: "#55b849", colorSide: "#7a5233", accent: "#439939" },
  { id: "dirt", label: "Tierra", colorTop: "#7a5233", colorSide: "#6e482b", accent: "#5a3a22" },
  { id: "stone", label: "Piedra", colorTop: "#7c828c", colorSide: "#707680", accent: "#565b64" },
  { id: "wood", label: "Madera", colorTop: "#a0794d", colorSide: "#5e3e24", accent: "#442c18" },
  { id: "leaf", label: "Hojas", colorTop: "#368a3e", colorSide: "#2b7332", accent: "#1f5925" },
  { id: "plank", label: "Tablones", colorTop: "#b88a50", colorSide: "#a37841", accent: "#785529" },
  { id: "diamond", label: "Diamante", colorTop: "#4be8f0", colorSide: "#68707a", accent: "#22d4e8" },
  { id: "tnt", label: "TNT", colorTop: "#d9342b", colorSide: "#e6e0d8", accent: "#b8231b" },
]

function createPixelTexture(def: BlockDef, face: "top" | "side"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext("2d")!

  const base = face === "top" ? def.colorTop : def.colorSide
  ctx.fillStyle = base
  ctx.fillRect(0, 0, 16, 16)

  // Deterministic pixel noise pattern
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const hash = ((x * 73 + y * 139 + def.id.charCodeAt(0) * 19) % 17) / 17
      if (hash > 0.72) {
        ctx.fillStyle = "rgba(255,255,255,0.09)"
        ctx.fillRect(x, y, 1, 1)
      } else if (hash < 0.25) {
        ctx.fillStyle = "rgba(0,0,0,0.11)"
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

  // Block-specific Minecraft pixel details
  if (def.id === "grass" && face === "side") {
    ctx.fillStyle = def.colorTop
    ctx.fillRect(0, 0, 16, 4)
    ctx.fillStyle = def.accent
    for (let x = 0; x < 16; x += 2) {
      ctx.fillRect(x, 4, 1, (x % 4 === 0 ? 2 : 1))
    }
  } else if (def.id === "plank") {
    ctx.fillStyle = def.accent
    ctx.fillRect(0, 4, 16, 1)
    ctx.fillRect(0, 11, 16, 1)
    ctx.fillRect(7, 0, 1, 4)
    ctx.fillRect(12, 5, 1, 6)
    ctx.fillRect(4, 12, 1, 4)
  } else if (def.id === "diamond" && face === "side") {
    ctx.fillStyle = def.accent
    ctx.fillRect(3, 4, 3, 2)
    ctx.fillRect(10, 3, 2, 3)
    ctx.fillRect(6, 9, 4, 3)
    ctx.fillRect(2, 11, 2, 2)
  } else if (def.id === "tnt" && face === "side") {
    ctx.fillStyle = def.colorTop
    ctx.fillRect(0, 0, 16, 5)
    ctx.fillRect(0, 11, 16, 5)
    ctx.fillStyle = "#18141c"
    // Mini "TNT" band
    ctx.fillRect(2, 6, 3, 1)
    ctx.fillRect(3, 7, 1, 3)
    ctx.fillRect(6, 6, 1, 4)
    ctx.fillRect(7, 7, 1, 1)
    ctx.fillRect(8, 8, 1, 1)
    ctx.fillRect(9, 6, 1, 4)
    ctx.fillRect(11, 6, 3, 1)
    ctx.fillRect(12, 7, 1, 3)
  } else if (def.id === "wood" && face === "top") {
    ctx.fillStyle = def.accent
    ctx.fillRect(0, 0, 16, 2)
    ctx.fillRect(0, 14, 16, 2)
    ctx.fillRect(0, 0, 2, 16)
    ctx.fillRect(14, 0, 2, 16)
  }

  // Subtle pixel border
  ctx.strokeStyle = "rgba(0,0,0,0.16)"
  ctx.lineWidth = 1
  ctx.strokeRect(0.5, 0.5, 15, 15)

  const tex = new THREE.CanvasTexture(canvas)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function keyOf(x: number, y: number, z: number): string {
  return `${x},${y},${z}`
}

export default function Minecraft3DSandbox({
  selectedBlock,
  onSelectBlock,
  seedTrigger,
}: {
  selectedBlock: BlockType3D
  onSelectBlock: (b: BlockType3D) => void
  seedTrigger: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<BlockType3D>(selectedBlock)
  const [locked, setLocked] = useState(false)
  const [blockCount, setBlockCount] = useState(0)

  useEffect(() => {
    selectedRef.current = selectedBlock
  }, [selectedBlock])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = Math.max(320, container.clientWidth)
    const height = Math.max(300, container.clientHeight)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#6bb3ff")
    scene.fog = new THREE.Fog("#8ac7ff", 18, 46)

    const camera = new THREE.PerspectiveCamera(72, width / height, 0.1, 80)
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.innerHTML = ""
    container.appendChild(renderer.domElement)

    // Lighting
    const hemi = new THREE.HemisphereLight("#ffffff", "#3a4c32", 0.9)
    scene.add(hemi)
    const sun = new THREE.DirectionalLight("#fff6df", 0.95)
    sun.position.set(16, 28, 12)
    scene.add(sun)

    // Materials & Geometry
    const boxGeo = new THREE.BoxGeometry(1, 1, 1)
    const materials = new Map<BlockType3D, THREE.Material | THREE.Material[]>()
    const texturesToDispose: THREE.Texture[] = []

    for (const def of BLOCK_DEFS_3D) {
      const topTex = createPixelTexture(def, "top")
      const sideTex = createPixelTexture(def, "side")
      texturesToDispose.push(topTex, sideTex)

      if (def.id === "grass" || def.id === "wood" || def.id === "tnt") {
        const topMat = new THREE.MeshLambertMaterial({ map: topTex })
        const sideMat = new THREE.MeshLambertMaterial({ map: sideTex })
        const bottomMat =
          def.id === "grass"
            ? new THREE.MeshLambertMaterial({
                map: texturesToDispose[1] ?? sideTex,
              })
            : topMat
        materials.set(def.id, [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat])
      } else {
        materials.set(def.id, new THREE.MeshLambertMaterial({ map: sideTex }))
      }
    }

    // Highlight wireframe around aimed block
    const hlGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.01, 1.01, 1.01))
    const hlMat = new THREE.LineBasicMaterial({ color: 0x000000 })
    const highlightBox = new THREE.LineSegments(hlGeo, hlMat)
    highlightBox.visible = false
    scene.add(highlightBox)

    // World storage
    const blocks = new Map<string, { mesh: THREE.Mesh; type: BlockType3D; x: number; y: number; z: number }>()
    const blockMeshes: THREE.Mesh[] = []

    const addBlock = (x: number, y: number, z: number, type: BlockType3D) => {
      const k = keyOf(x, y, z)
      if (blocks.has(k)) return
      const mat = materials.get(type)
      if (!mat) return
      const mesh = new THREE.Mesh(boxGeo, mat)
      mesh.position.set(x, y, z)
      mesh.userData = { x, y, z, type }
      scene.add(mesh)
      blocks.set(k, { mesh, type, x, y, z })
      blockMeshes.push(mesh)
    }

    const removeBlock = (x: number, y: number, z: number) => {
      const k = keyOf(x, y, z)
      const entry = blocks.get(k)
      if (!entry) return
      scene.remove(entry.mesh)
      blocks.delete(k)
      const idx = blockMeshes.indexOf(entry.mesh)
      if (idx !== -1) blockMeshes.splice(idx, 1)

      if (entry.type === "tnt") {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              if (dx === 0 && dy === 0 && dz === 0) continue
              if (y + dy > 0) removeBlock(x + dx, y + dy, z + dz)
            }
          }
        }
      }
    }

    // Procedural terrain (22x22)
    const HALF = 11
    for (let x = -HALF; x <= HALF; x++) {
      for (let z = -HALF; z <= HALF; z++) {
        const h = Math.round(
          2 + Math.sin(x * 0.28 + seedTrigger) * 1.4 + Math.cos(z * 0.31 - seedTrigger * 0.5) * 1.2,
        )
        addBlock(x, 0, z, "stone")
        for (let y = 1; y < h; y++) {
          addBlock(x, y, z, y === 1 && (x + z) % 7 === 0 ? "diamond" : "dirt")
        }
        addBlock(x, h, z, "grass")
      }
    }

    // Spawn 3 pixel oak trees
    const treeSpots = [
      [-5, -4],
      [6, -5],
      [-4, 6],
    ]
    for (const [tx, tz] of treeSpots) {
      let topY = 2
      for (let y = 8; y >= 0; y--) {
        if (blocks.has(keyOf(tx, y, tz))) {
          topY = y
          break
        }
      }
      for (let h = 1; h <= 3; h++) addBlock(tx, topY + h, tz, "wood")
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          addBlock(tx + dx, topY + 4, tz + dz, "leaf")
          if (Math.abs(dx) + Math.abs(dz) <= 1) {
            addBlock(tx + dx, topY + 5, tz + dz, "leaf")
          }
        }
      }
    }
    setBlockCount(blocks.size)

    // Player physics & controls
    const playerPos = new THREE.Vector3(0, 7, 3)
    let yaw = 0
    let pitch = -0.18
    let velY = 0
    let onGround = false
    const keys = new Set<string>()

    const raycaster = new THREE.Raycaster()
    raycaster.far = 7

    const getHeightAt = (px: number, pz: number, feetY: number): number => {
      const bx = Math.round(px)
      const bz = Math.round(pz)
      for (let y = Math.floor(feetY + 0.6); y >= -1; y--) {
        if (blocks.has(keyOf(bx, y, bz))) return y + 0.5
      }
      return -10
    }

    const onKeyDown = (e: KeyboardEvent) => {
      keys.add(e.code)
      const num = Number(e.key)
      if (num >= 1 && num <= BLOCK_DEFS_3D.length) {
        onSelectBlock(BLOCK_DEFS_3D[num - 1].id)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.code)

    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) return
      yaw -= e.movementX * 0.0024
      pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, pitch - e.movementY * 0.0024))
    }

    const onPointerLockChange = () => {
      setLocked(document.pointerLockElement === renderer.domElement)
    }

    const onMouseDown = (e: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) {
        renderer.domElement.requestPointerLock?.()
        return
      }
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
      const hits = raycaster.intersectObjects(blockMeshes, false)
      if (hits.length === 0) return
      const hit = hits[0]
      const { x, y, z } = hit.object.userData as { x: number; y: number; z: number }

      if (e.button === 0) {
        if (y > 0) {
          removeBlock(x, y, z)
          setBlockCount(blocks.size)
        }
      } else if (e.button === 2 && hit.face) {
        const nx = x + Math.round(hit.face.normal.x)
        const ny = y + Math.round(hit.face.normal.y)
        const nz = z + Math.round(hit.face.normal.z)
        // Avoid trapping player head/body
        const distPlayer = Math.hypot(nx - playerPos.x, nz - playerPos.z)
        if (distPlayer > 0.7 || ny < playerPos.y - 1.6 || ny > playerPos.y + 0.4) {
          addBlock(nx, ny, nz, selectedRef.current)
          setBlockCount(blocks.size)
        }
      }
    }

    const onContextMenu = (e: MouseEvent) => e.preventDefault()

    const onResize = () => {
      if (!container) return
      const w = Math.max(320, container.clientWidth)
      const h = Math.max(300, container.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("pointerlockchange", onPointerLockChange)
    renderer.domElement.addEventListener("mousedown", onMouseDown)
    renderer.domElement.addEventListener("contextmenu", onContextMenu)
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    let rafId = 0
    let lastTime = performance.now()
    const forward = new THREE.Vector3()
    const right = new THREE.Vector3()

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      const speed = (keys.has("ShiftLeft") || keys.has("ShiftRight") ? 7.2 : 4.8) * dt
      forward.set(-Math.sin(yaw), 0, -Math.cos(yaw)).normalize()
      right.set(Math.cos(yaw), 0, -Math.sin(yaw)).normalize()

      if (keys.has("KeyW") || keys.has("ArrowUp")) playerPos.addScaledVector(forward, speed)
      if (keys.has("KeyS") || keys.has("ArrowDown")) playerPos.addScaledVector(forward, -speed)
      if (keys.has("KeyD") || keys.has("ArrowRight")) playerPos.addScaledVector(right, speed)
      if (keys.has("KeyA") || keys.has("ArrowLeft")) playerPos.addScaledVector(right, -speed)

      // Clamp to island bounds
      playerPos.x = Math.max(-HALF, Math.min(HALF, playerPos.x))
      playerPos.z = Math.max(-HALF, Math.min(HALF, playerPos.z))

      if (keys.has("Space") && onGround) {
        velY = 6.6
        onGround = false
      }

      velY -= 18 * dt
      playerPos.y += velY * dt

      const groundTop = getHeightAt(playerPos.x, playerPos.z, playerPos.y - 1.6)
      if (playerPos.y - 1.6 <= groundTop) {
        playerPos.y = groundTop + 1.6
        velY = 0
        onGround = true
      } else {
        onGround = false
      }

      if (playerPos.y < -6) {
        playerPos.set(0, 8, 3)
        velY = 0
      }

      camera.position.copy(playerPos)
      camera.rotation.order = "YXZ"
      camera.rotation.y = yaw
      camera.rotation.x = pitch

      // Aimed block highlight
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
      const hits = raycaster.intersectObjects(blockMeshes, false)
      if (hits.length > 0) {
        const { x, y, z } = hits[0].object.userData as { x: number; y: number; z: number }
        highlightBox.position.set(x, y, z)
        highlightBox.visible = true
      } else {
        highlightBox.visible = false
      }

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("pointerlockchange", onPointerLockChange)
      renderer.domElement.removeEventListener("mousedown", onMouseDown)
      renderer.domElement.removeEventListener("contextmenu", onContextMenu)
      resizeObserver.disconnect()
      if (document.pointerLockElement === renderer.domElement) {
        document.exitPointerLock?.()
      }
      boxGeo.dispose()
      hlGeo.dispose()
      hlMat.dispose()
      texturesToDispose.forEach((t) => t.dispose())
      materials.forEach((m) => {
        if (Array.isArray(m)) m.forEach((sub) => sub.dispose())
        else m.dispose()
      })
      renderer.dispose()
    }
  }, [seedTrigger, onSelectBlock])

  return (
    <div className="relative flex-1 min-h-[380px] bg-[#07040f] border-3 border-[#140a24] overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full cursor-crosshair" />

      {/* Center Crosshair */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-4 h-4">
          <span className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/85 shadow-[0_0_2px_#000]" />
          <span className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/85 shadow-[0_0_2px_#000]" />
        </div>
      </div>

      {/* Top HUD */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] mc-pixel-font">
        <span className="px-2 py-1 bg-[#0b0714]/80 border border-[#3d2966] text-[#52ffd5]">
          3D WEBGL · {blockCount} BLOQUES
        </span>
        <span className="px-2 py-1 bg-[#0b0714]/80 border border-[#3d2966] text-[#ffe694]">
          {locked ? "ESC PARA LIBERAR MOUSE" : "CLIC EN EL MUNDO PARA JUGAR"}
        </span>
      </div>

      {/* Click-to-play overlay when pointer is unlocked */}
      {!locked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="px-4 py-3 bg-[#120b22]/90 border-2 border-[#2ee86c] text-center shadow-[4px_4px_0_#06040d]">
            <p className="mc-pixel-font text-[12px] font-bold text-[#2ee86c]">
              HAZ CLIC PARA ENTRAR AL MUNDO 3D
            </p>
            <p className="text-[11px] font-mono text-[#e2dbf5] mt-1">
              WASD mover · Espacio saltar · Clic Izq romper · Clic Der construir · Teclas 1-8 bloque
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

