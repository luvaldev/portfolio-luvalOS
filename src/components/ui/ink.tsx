"use client"

import * as React from "react"

export interface InkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered above the fluid ink canvas. */
  children?: React.ReactNode
  /** Three ink pigment colors (hex or CSS). Defaults to Luval's violet & cyan palette. */
  colors?: [string, string, string] | string[]
  /** Curl / vortex warp intensity. */
  curl?: number
  /** Ink coverage density (0..1.5). */
  density?: number
  /** Fine turbulent detail multiplier. */
  detail?: number
  /** Edge softness / ink diffusion (0.02..0.8). */
  diffusion?: number
  /** Spatial noise scale. */
  scale?: number
  /** Animation speed multiplier. */
  speed?: number
  /** Background base color beneath the ink. */
  backgroundColor?: string
}

const MAX_PIXELS = 2560 * 1600

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uBg;
uniform float uCurl;
uniform float uDensity;
uniform float uDetail;
uniform float uDiffusion;
uniform float uScale;

// 2D Simplex noise for ultra-smooth silky fluid gradients (zero grid artifacts)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Low-octave silky FBM (only 3 smooth octaves -> liquid silk, never busy marble)
float silkyFbm(vec2 p, float detailWeight) {
  float v = 0.0;
  v += 0.60 * snoise(p);
  v += 0.28 * snoise(p * 1.85 + vec2(4.2, -2.1));
  v += (0.12 * clamp(detailWeight, 0.3, 1.5)) * snoise(p * 3.4 - vec2(1.7, 3.8));
  return v * 0.5 + 0.5;
}

vec2 fluidCurl(vec2 p, float t, float det) {
  float e = 0.06;
  float n1 = silkyFbm(p + vec2(0.0, e) + vec2(0.0, t * 0.14), det);
  float n2 = silkyFbm(p - vec2(0.0, e) + vec2(0.0, t * 0.14), det);
  float n3 = silkyFbm(p + vec2(e, 0.0) - vec2(t * 0.10, 0.0), det);
  float n4 = silkyFbm(p - vec2(e, 0.0) - vec2(t * 0.10, 0.0), det);
  return vec2((n1 - n2) / (2.0 * e), -(n3 - n4) / (2.0 * e));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  // Broad, sweeping spatial scale so curls are large and graceful
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * (max(uScale, 0.3) * 0.72);

  float t = uTime * 0.22;
  float det = clamp(uDetail, 0.3, 1.6);
  float cAmt = clamp(uCurl, 0.0, 4.0) * 0.11;

  // Subtle pointer influence
  vec2 mp = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5) * (max(uScale, 0.3) * 0.72);
  float md = length(p - mp);
  p += (p - mp) * exp(-md * 2.5) * 0.04;

  // Smooth 2-stage curl advection
  vec2 q = fluidCurl(p * 1.15, t, det);
  vec2 p1 = p + q * cAmt + vec2(0.0, t * 0.09);
  vec2 r = fluidCurl(p1 * 1.35 + vec2(2.1, -1.4), -t * 0.75, det);
  vec2 p2 = p1 + r * (cAmt * 0.9);

  // Two complementary silky ink sheets
  float sheetA = silkyFbm(p2 * 1.25, det);
  float sheetB = silkyFbm(p2 * 1.65 + vec2(3.7, -2.4), det);

  // Thin glowing ink ribbons separated by deep black negative space
  float diff = clamp(uDiffusion, 0.02, 0.8);
  float bandA = exp(-pow((sheetA - 0.54) / (0.095 + diff * 0.18), 2.0));
  float bandB = exp(-pow((sheetB - 0.50) / (0.075 + diff * 0.16), 2.0));
  float ribbon = clamp(bandA * 0.82 + bandB * 0.52, 0.0, 1.0);

  // Top-poured ink envelope matching the reference:
  // Lush swirling plumes near top edge + wispy tendrils trailing down the right/upper-left,
  // leaving the lower-left and bottom-center deep velvety black.
  float tendril = silkyFbm(vec2(p1.x * 1.1, p1.y * 0.65 + t * 0.06), det);
  float topEdge = smoothstep(0.38, 0.99, uv.y + (tendril - 0.52) * 0.52);
  float rightCascade = smoothstep(0.42, 0.96, uv.x) * smoothstep(0.14, 0.85, uv.y + (tendril - 0.48) * 0.45);
  float mask = clamp(max(pow(topEdge, 1.75), pow(rightCascade, 1.8) * 0.72), 0.0, 1.0);

  // Density modulates plume reach
  float inkAmount = ribbon * mask * clamp(uDensity, 0.25, 1.35);

  // Smooth 3-color gradient along the silk folds
  vec3 inkColor = mix(uColor0, uColor1, smoothstep(0.25, 0.72, sheetB));
  inkColor = mix(inkColor, uColor2, smoothstep(0.45, 0.85, bandA * 0.6 + sheetA * 0.4));

  // Bright luminous glow concentrated only at the very top edge where ink pours in
  float topGlow = smoothstep(0.84, 1.0, uv.y) * pow(bandA, 1.4) * mask;
  vec3 col = uBg;
  col += inkColor * inkAmount * 1.05;
  col += mix(uColor2, vec3(0.96, 0.92, 1.0), 0.72) * topGlow * 0.85;

  // Keep darks velvety obsidian
  col = 1.0 - exp(-col * 1.15);
  col = max(col, uBg);
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function parseHexColor(hex: string): [number, number, number] {
  const m = hex.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i)
  if (!m) return [0.58, 0.2, 0.92]
  const h = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1]
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
  return shader
}

const DEFAULT_INK_COLORS: [string, string, string] = ["#4c1d95", "#9333ea", "#d8b4fe"]

export function Ink({
  children,
  colors = DEFAULT_INK_COLORS,
  curl = 2,
  density = 0.8,
  detail = 1,
  diffusion = 0.1,
  scale = 1.5,
  speed = 1,
  backgroundColor = "#070510",
  className,
  style,
  onPointerMove,
  ...props
}: InkProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = React.useState(false)
  const pointerRef = React.useRef({ x: 0.62, y: 0.45, tx: 0.62, ty: 0.45 })

  const c0 = colors[0] ?? DEFAULT_INK_COLORS[0]
  const c1 = colors[1] ?? DEFAULT_INK_COLORS[1]
  const c2 = colors[2] ?? DEFAULT_INK_COLORS[2]
  const colorKey = `${c0}|${c1}|${c2}|${backgroundColor}`

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false })
    if (!gl) {
      const id = requestAnimationFrame(() => setFallback(true))
      return () => cancelAnimationFrame(id)
    }

    const prog = gl.createProgram()!
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const id = requestAnimationFrame(() => setFallback(true))
      return () => cancelAnimationFrame(id)
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "aPos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(prog, name)
    const uRes = u("uRes")
    const uTime = u("uTime")
    const uMouse = u("uMouse")
    const uColor0 = u("uColor0")
    const uColor1 = u("uColor1")
    const uColor2 = u("uColor2")
    const uBg = u("uBg")
    const uCurl = u("uCurl")
    const uDensity = u("uDensity")
    const uDetail = u("uDetail")
    const uDiffusion = u("uDiffusion")
    const uScale = u("uScale")

    const rgb0 = parseHexColor(c0)
    const rgb1 = parseHexColor(c1)
    const rgb2 = parseHexColor(c2)
    const rgbBg = parseHexColor(backgroundColor)

    gl.uniform3f(uColor0, rgb0[0], rgb0[1], rgb0[2])
    gl.uniform3f(uColor1, rgb1[0], rgb1[1], rgb1[2])
    gl.uniform3f(uColor2, rgb2[0], rgb2[1], rgb2[2])
    gl.uniform3f(uBg, rgbBg[0], rgbBg[1], rgbBg[2])
    gl.uniform1f(uCurl, curl)
    gl.uniform1f(uDensity, density)
    gl.uniform1f(uDetail, detail)
    gl.uniform1f(uDiffusion, diffusion)
    gl.uniform1f(uScale, scale)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const moving = !reduce && speed > 0
    let cw = 1
    let ch = 1

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(MAX_PIXELS / Math.max(r.width * r.height, 1)))
      cw = Math.max(1, Math.round(r.width * dpr))
      ch = Math.max(1, Math.round(r.height * dpr))
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }
      gl.viewport(0, 0, cw, ch)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let raf = 0
    let visible = true
    const start = performance.now()
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(render)
    })
    io.observe(canvas)

    function render(now: number) {
      raf = 0
      const elapsed = moving ? ((now - start) / 1000) * speed : 4.2
      const pt = pointerRef.current
      pt.x += (pt.tx - pt.x) * 0.06
      pt.y += (pt.ty - pt.y) * 0.06

      gl!.uniform2f(uRes, cw, ch)
      gl!.uniform1f(uTime, elapsed)
      gl!.uniform2f(uMouse, pt.x, 1.0 - pt.y)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)

      if (visible && moving) {
        raf = requestAnimationFrame(render)
      }
    }

    raf = requestAnimationFrame(render)

    const onLost = (e: Event) => {
      e.preventDefault()
      setFallback(true)
    }
    canvas.addEventListener("webglcontextlost", onLost)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener("webglcontextlost", onLost)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [colorKey, c0, c1, c2, backgroundColor, curl, density, detail, diffusion, scale, speed, fallback])

  return (
    <div
      ref={rootRef}
      className={className ? `relative overflow-hidden ${className}` : "relative overflow-hidden"}
      style={{ backgroundColor, ...style }}
      onPointerMove={(e) => {
        const r = rootRef.current?.getBoundingClientRect()
        if (r && r.width > 0 && r.height > 0) {
          pointerRef.current.tx = (e.clientX - r.left) / r.width
          pointerRef.current.ty = (e.clientY - r.top) / r.height
        }
        onPointerMove?.(e)
      }}
      {...props}
    >
      {fallback ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 60% at 70% 35%, ${c1}55, transparent 70%), radial-gradient(50% 55% at 28% 72%, ${c2}35, transparent 70%), radial-gradient(75% 75% at 50% 50%, ${c0}40, ${backgroundColor} 100%)`,
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full block"
        />
      )}
      {children}
    </div>
  )
}

export default Ink

