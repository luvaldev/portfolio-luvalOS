"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const RED = 0xe63c35
const DARK_RED = 0x6f151c
const INK = 0x101219
const METAL = 0x30333b

function makeScreenTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#090b10"
  ctx.fillRect(0, 0, 1024, 640)
  const glow = ctx.createRadialGradient(650, 260, 20, 650, 260, 700)
  glow.addColorStop(0, "rgba(163,25,34,.22)")
  glow.addColorStop(1, "rgba(163,25,34,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 1024, 640)

  ctx.fillStyle = "#171a20"
  ctx.fillRect(0, 0, 1024, 48)
  ctx.fillStyle = "#f25a4c"
  ctx.beginPath(); ctx.arc(23, 24, 6, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = "#e6c74b"
  ctx.beginPath(); ctx.arc(45, 24, 6, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = "#54bd75"
  ctx.beginPath(); ctx.arc(67, 24, 6, 0, Math.PI * 2); ctx.fill()
  ctx.font = "600 19px monospace"
  ctx.fillStyle = "#89919d"
  ctx.fillText("luval@redstation: ~/engineering", 105, 31)
  ctx.fillText("◉  23:41", 854, 31)

  ctx.fillStyle = "#10141b"
  ctx.fillRect(0, 48, 70, 592)
  ctx.fillStyle = "#e7473b"
  ctx.fillRect(0, 112, 4, 52)
  ctx.font = "26px monospace"
  ctx.fillStyle = "#e7473b"
  ctx.fillText("⌘", 22, 94)
  ctx.fillStyle = "#8b929d"
  ctx.fillText("▣", 22, 146)
  ctx.fillText("⌁", 22, 200)
  ctx.fillText("◇", 22, 254)
  ctx.fillText("◈", 22, 308)

  ctx.fillStyle = "#161a21"
  ctx.fillRect(94, 76, 888, 526)
  ctx.strokeStyle = "#343a44"
  ctx.lineWidth = 2
  ctx.strokeRect(94, 76, 888, 526)
  ctx.fillStyle = "#20252e"
  ctx.fillRect(94, 76, 888, 47)
  ctx.font = "600 19px monospace"
  ctx.fillStyle = "#f06a5e"
  ctx.fillText("●  SYSTEM / TERMINAL", 118, 107)
  ctx.fillStyle = "#697481"
  ctx.fillText("_  □  ×", 865, 107)

  ctx.font = "700 48px monospace"
  ctx.fillStyle = "#f4f0e9"
  ctx.fillText("LUVAL", 126, 205)
  ctx.fillStyle = "#f04a40"
  ctx.fillText("/OS", 300, 205)
  ctx.fillStyle = "#8d97a4"
  ctx.font = "19px monospace"
  ctx.fillText("LINUX  ·  SYSTEMS  ·  NETWORKS", 128, 239)

  const rows = [
    ["> boot --profile engineer", "#df685e"],
    ["[ OK ]  distributed systems online", "#aeb8c0"],
    ["[ OK ]  security modules loaded", "#aeb8c0"],
    ["[ OK ]  creative runtime ready", "#aeb8c0"],
    ["> building what matters_", "#f2685b"],
  ]
  ctx.font = "21px monospace"
  rows.forEach(([text, color], index) => {
    ctx.fillStyle = color
    ctx.fillText(text, 128, 310 + index * 47)
  })
  ctx.fillStyle = "#e7473b"
  ctx.fillRect(435, 478, 11, 23)
  ctx.strokeStyle = "rgba(236,75,62,.45)"
  ctx.strokeRect(120, 265, 820, 293)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function box(
  parent: THREE.Object3D,
  width: number,
  height: number,
  depth: number,
  material: THREE.Material,
  x: number,
  y: number,
  z: number,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material)
  mesh.position.set(x, y, z)
  parent.add(mesh)
  return mesh
}

function buildComputer(scene: THREE.Scene, screenTexture: THREE.Texture) {
  const computer = new THREE.Group()
  scene.add(computer)

  const shell = new THREE.MeshPhysicalMaterial({ color: RED, metalness: .56, roughness: .3, clearcoat: .65, clearcoatRoughness: .24 })
  const edge = new THREE.MeshStandardMaterial({ color: DARK_RED, metalness: .66, roughness: .36 })
  const graphite = new THREE.MeshStandardMaterial({ color: INK, metalness: .55, roughness: .32 })
  const steel = new THREE.MeshStandardMaterial({ color: METAL, metalness: .82, roughness: .24 })
  const keyMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d0c9, metalness: .18, roughness: .45 })
  const accent = new THREE.MeshBasicMaterial({ color: 0xff5b4e })

  // Monitor: thick red enclosure, recessed glass and a deliberately visible edge.
  box(computer, 4.15, 2.86, .5, edge, -.85, .46, -.21)
  box(computer, 4.07, 2.78, .48, shell, -.85, .48, -.16)
  box(computer, 3.67, 2.33, .045, graphite, -.85, .52, .11)
  box(computer, 3.52, 2.18, .018, new THREE.MeshBasicMaterial({ map: screenTexture }), -.85, .52, .145)
  box(computer, 4.1, .12, .18, edge, -.85, -.93, .02)
  box(computer, .12, .12, .05, accent, .9, -.91, .15)
  box(computer, .35, .58, .38, steel, -.85, -1.13, -.14)
  box(computer, 2.1, .11, .75, graphite, -.85, -1.43, .03)

  // Full tower on the right, with a glass side and three illuminated fans.
  box(computer, 1.35, 3.26, 1.55, graphite, 2.1, -.12, -.24)
  box(computer, 1.22, 3.13, .12, shell, 2.1, -.1, .6)
  box(computer, 1.07, 2.78, .025, new THREE.MeshPhysicalMaterial({ color: 0x17141c, metalness: .4, roughness: .2, transparent: true, opacity: .94 }), 2.1, -.13, .68)
  box(computer, .13, 2.83, .06, shell, 1.54, -.11, .72)
  box(computer, .13, 2.83, .06, shell, 2.66, -.11, .72)
  box(computer, 1.23, .13, .06, shell, 2.1, 1.3, .72)
  box(computer, 1.23, .13, .06, shell, 2.1, -1.52, .72)
  for (const y of [.71, -.13, -.97]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.3, .035, 8, 40), new THREE.MeshBasicMaterial({ color: 0xef3f3b }))
    ring.position.set(2.1, y, .73)
    computer.add(ring)
    const fan = new THREE.Mesh(new THREE.CircleGeometry(.235, 36), new THREE.MeshStandardMaterial({ color: 0x262932, metalness: .65, roughness: .35 }))
    fan.position.set(2.1, y, .725)
    computer.add(fan)
    for (let i = 0; i < 4; i++) {
      const blade = box(computer, .34, .045, .015, steel, 2.1, y, .75)
      blade.rotation.z = i * Math.PI / 4
    }
  }
  box(computer, .34, .055, .08, accent, 2.1, 1.58, .59)

  // Low-profile mechanical keyboard: individually modeled keys keep the silhouette legible.
  const keyboard = new THREE.Group()
  keyboard.position.set(-.85, -1.77, 1.34)
  keyboard.rotation.x = -.17
  computer.add(keyboard)
  box(keyboard, 3.84, .18, 1.04, edge, 0, 0, 0)
  box(keyboard, 3.76, .11, .96, shell, 0, .11, 0)
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 15; col++) {
      const isSpace = row === 3 && col >= 5 && col <= 9
      if (isSpace && col !== 5) continue
      const width = isSpace ? 1.12 : .174
      const x = -1.72 + col * .245 + (isSpace ? .49 : 0)
      const key = box(keyboard, width, .07, .14, row === 0 && col < 3 ? graphite : keyMaterial, x, .21, -.34 + row * .22)
      key.rotation.x = -.025
    }
  }

  const pointer = new THREE.Mesh(new THREE.BoxGeometry(.04, .04, .04), accent)
  pointer.position.set(.91, -.91, .19)
  computer.add(pointer)

  return computer
}

export default function HeroComputerScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const staticScene = reducedMotion.matches || !finePointer.matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100)
    camera.position.set(0, 1.45, 10.6)
    camera.lookAt(.1, -.1, 0)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    } catch {
      host.dataset.webgl = "unavailable"
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    host.prepend(renderer.domElement)
    renderer.domElement.setAttribute("aria-hidden", "true")

    scene.add(new THREE.AmbientLight(0xffffff, 2.2))
    const key = new THREE.DirectionalLight(0xffe2d8, 4.1)
    key.position.set(-3, 5, 7)
    scene.add(key)
    const rim = new THREE.PointLight(0xf02d2f, 85)
    rim.position.set(3, 2, -2)
    scene.add(rim)
    const screenTexture = makeScreenTexture()
    const computer = buildComputer(scene, screenTexture)
    computer.rotation.y = -.3
    computer.rotation.x = .025
    computer.scale.setScalar(1.12)
    computer.position.y = .32

    // A separate transparent engineering shell, revealed by the cursor.
    const hologram = new THREE.Group()
    scene.add(hologram)
    hologram.position.copy(computer.position)
    hologram.scale.copy(computer.scale)
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xff8b85, transparent: true, opacity: .1, metalness: .2, roughness: .12, transmission: .45, depthWrite: false, side: THREE.DoubleSide })
    const wire = new THREE.LineBasicMaterial({ color: 0xff8c80, transparent: true, opacity: .5, depthWrite: false })
    const ghostBody = new THREE.Mesh(new THREE.BoxGeometry(4.55, 3.24, .62), glass)
    ghostBody.position.set(-.85, .48, -.02)
    hologram.add(ghostBody)
    const ghostEdges = new THREE.LineSegments(new THREE.EdgesGeometry(ghostBody.geometry), wire)
    ghostEdges.position.copy(ghostBody.position)
    hologram.add(ghostEdges)
    const towerGhost = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.55, 3.5, 1.75)), wire.clone())
    towerGhost.position.set(2.1, -.12, -.24)
    hologram.add(towerGhost)

    const uniforms = { uPointer: { value: new THREE.Vector2(.5, .5) }, uTime: { value: 0 }, uStrength: { value: 0 } }
    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 2.16),
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
        fragmentShader: `varying vec2 vUv;
          uniform vec2 uPointer; uniform float uTime; uniform float uStrength;
          void main(){
            vec2 p=(vUv-uPointer)*vec2(1.6,1.0);
            float d=length(p);
            float ring=exp(-pow((d-.19)*23.,2.));
            float core=exp(-d*8.);
            float gridX=1.-smoothstep(.035,.075,abs(fract(vUv.x*30.)-.5));
            float gridY=1.-smoothstep(.035,.075,abs(fract(vUv.y*19.)-.5));
            float sweep=exp(-abs(vUv.y-fract(uTime*.08)) * 24.)*.07;
            float alpha=(ring*.22+core*.09+(gridX+gridY)*.018+sweep)*uStrength;
            gl_FragColor=vec4(vec3(1.,.35,.31),alpha);
          }`,
      }),
    )
    scan.position.set(-.85, .52, .19)
    hologram.add(scan)

    const target = new THREE.Vector2(0, 0)
    const current = new THREE.Vector2(0, 0)
    let pointerActive = false
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return
      const rect = host.getBoundingClientRect()
      target.set(
        THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
        THREE.MathUtils.clamp(1 - ((event.clientY - rect.top) / rect.height) * 2, -1, 1),
      )
      pointerActive = true
    }
    const onPointerLeave = () => { target.set(0, 0); pointerActive = false }
    host.addEventListener("pointermove", onPointerMove, { passive: true })
    host.addEventListener("pointerleave", onPointerLeave)

    let visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    observer.observe(host)
    const resize = () => {
      const width = Math.max(host.clientWidth, 1)
      const height = Math.max(host.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width < 540 ? 14.8 : width < 820 ? 12.5 : 10.6
      camera.updateProjectionMatrix()
      if (staticScene) renderer.render(scene, camera)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const clock = new THREE.Clock()
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!visible || staticScene || document.hidden) return
      current.lerp(target, .075)
      computer.rotation.y = -.3 + current.x * .15
      computer.rotation.x = .025 - current.y * .07
      computer.position.x = current.x * .055
      computer.position.y = .32 + current.y * .04
      hologram.rotation.y = -.3 + current.x * .27
      hologram.rotation.x = .025 - current.y * .14
      hologram.position.set(current.x * .11, .32 + current.y * .08, .14)
      uniforms.uPointer.value.set(current.x * .5 + .5, current.y * .5 + .5)
      uniforms.uStrength.value += ((pointerActive ? 1 : .25) - uniforms.uStrength.value) * .08
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    if (!staticScene) animate()
    else renderer.render(scene, camera)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerleave", onPointerLeave)
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      })
      screenTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div ref={hostRef} className="hero-computer-scene" role="img" aria-label="Computador de escritorio tridimensional con Linux rojo, terminal de ingeniería y una capa técnica transparente que sigue el cursor">
      <div className="hero-computer-fallback" aria-hidden="true">LUVAL<span>/OS</span></div>
      <div className="hero-scene-label hero-scene-label-top" aria-hidden="true">SYS_01 <span>RED STATION</span></div>
      <div className="hero-scene-label hero-scene-label-bottom" aria-hidden="true"><span>INTERACTIVE / ENGINEERED</span> 001</div>
    </div>
  )
}
