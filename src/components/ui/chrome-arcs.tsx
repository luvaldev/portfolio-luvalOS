"use client"

// Chrome Arcs adapted to Luval's obsidian-violet & cyan-lavender palette.
import * as React from "react"

export interface ChromeArcsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content on top of the arcs, centred. */
  children?: React.ReactNode
  /** Playback speed. 1 = the stack flows outward by one ring every 10 s. 0 holds the reference still frame. */
  speed?: number
  /** Ring density. 1 = the reference spacing, about six rings across the shorter side; 2 packs twice as many. */
  rings?: number
  /**
   * Sheen colours `[warm, cool]`: the outer and inner fringe of each iridescent streak, with
   * white between them. Any CSS colour. Defaults to Luval's electric violet & cyan-lavender sheen.
   */
  tint?: [string, string]
  /** Brightness of the streaks and rim glints. 1 = the reference. */
  intensity?: number
  /** The light follows the pointer sideways, sliding the streaks along the arcs. */
  interactive?: boolean
  /** Render brushed pearl-silver chrome arcs for light mode instead of black chrome. */
  light?: boolean
  /** Accessible name. Without children the arcs are announced as an image with this label. */
  label?: string
}

const LOOP = 10
const TAU = Math.PI * 2
const REF_W = 1179
const REF_H = 1967
const VIEW_X = 590
const VIEW_Y = 984
const SWAY = 26
const PULL = 0.42
const MAX_PIXELS = 2560 * 1600

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec4 uView;
uniform vec3 uMotion;
uniform mat3 uTint;
uniform float uSeed;
uniform float uLight;

const vec2 C = vec2(3777.39, 2674.21);
const float R0 = 6657.9;
const float D1 = 2264.66;
const float LNQ = 0.0670042;

float sq(float x) { return x * x; }

const float CORE = 0.24;
const vec2 TAIL_R = vec2(0.40033, 0.33513);
const vec2 TAIL_G = vec2(0.38067, 0.32096);
const vec2 TAIL_B = vec2(0.35736, 0.32278);
const float BLOOM = 2.2;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

float nudge(vec2 p) {
  vec2 q = clamp(p, vec2(0.0), vec2(${REF_W}.0, ${REF_H}.0)) / 1000.0 - vec2(0.6, 1.0);
  float X = q.x, Y = q.y;
  return -0.01066 + Y * (-0.0588 + Y * (0.02479 + Y * 0.12054))
    + X * (0.00943 + Y * (0.08212 + Y * 0.05649)) + X * X * (0.06149 - 0.00377 * Y) - 0.01411 * X * X * X;
}

float envelope(vec2 q, float a, float bx, float by, float bxx, float byy, float bxy, float cap) {
  return exp(min(a + bx * q.x + by * q.y + bxx * q.x * q.x + byy * q.y * q.y + bxy * q.x * q.y, cap));
}

vec2 meet(float ra, float x0, float sx) {
  float A = x0 - 1000.0 * sx - C.x;
  float a = sx * sx + 1.0, b = 2.0 * (A * sx - C.y), c = A * A + C.y * C.y - ra * ra;
  float y = (-b - sqrt(max(b * b - 4.0 * a * c, 0.0))) / (2.0 * a);
  return vec2(atan(y - C.y, x0 + sx * (y - 1000.0) - C.x), y);
}

float radius(float k) { return R0 - D1 * exp(LNQ * (k - 1.0)); }

float lobe(float d, float outer, float inner) {
  return 1.0 * exp(-sq(d / CORE)) + 0.31106 * exp(-abs(d) / (d > 0.0 ? outer : inner));
}
vec3 sheen(float phi) {
  return vec3(
    16.614 * lobe(phi - 0.11247, TAIL_R.x, TAIL_R.y),
    16.018 * lobe(phi + 0.040111, TAIL_G.x, TAIL_G.y),
    16.169 * lobe(phi + 0.17831, TAIL_B.x, TAIL_B.y));
}

vec3 band(float kp, float t, float th, float r, float w, float aa, vec4 env) {
  float m = uView.w, flow = uMotion.x;
  float kc = 4.5 + (kp + 0.5 - flow - 4.5) / m;

  float crest = 0.46263 + 0.070742 * (kc - 4.0) - 0.0040818 * (degrees(th) + 150.0);
  float spread = t < crest ? max(0.38553 - 0.071703 * (kc - 4.0), 0.03) : 0.12301;
  // Subtle obsidian-violet metallic body tint instead of neutral grey
  vec3 col = vec3(env.x * exp(-sq((t - crest) / spread))) * vec3(0.92, 0.82, 1.08);
  col += env.y * exp(-sq((1.0 - t) / 0.16965)) * vec3(0.68, 0.45, 1.0);

  float t0 = 0.26151 + 0.032207 * (kc - 4.5);
  float ta = meet(radius(4.5 + (kp + t0 - flow - 4.5) / m), 536.54 + uMotion.y, 0.014062).x;
  float u = (th - ta) * r / w;
  float dt = t - t0;
  float bend = dt < 0.0 ? 8.3036 : 3.5178 - 0.021064 * (kc - 4.5);
  float phi = (-u + bend * dt * dt - 0.37954) * (1.0471 - 0.14429 * (kc - 4.5));
  col += uTint * sheen(phi) * env.w;
  col += BLOOM * env.w * exp(-sq((phi - 0.12) / 0.42) - sq(dt / 0.2)) * vec3(0.95, 0.84, 1.0);

  float rw = sqrt(0.000144 + aa * aa * 0.35);
  float prof = 0.012 / rw * exp(-sq(t / rw));
  if (prof > 1e-4) {
    float rk = radius(4.5 + (kp - flow - 4.5) / m);
    vec2 g = meet(rk, 613.43 + uMotion.y, 0.0);
    float s = (th - g.x) * rk;
    float hl = max(137.51 + 0.37297 * (g.y - 1000.0), 10.0);
    float o = -s - hl, i = s - hl;
    vec3 glint = exp(-max(max(vec3(o - 20.938, o, o + 31.302), vec3(i + 20.938, i, i - 31.302)), 0.0) / 76.225);
    col += prof * (vec3(env.z) * vec3(0.9, 0.78, 1.05) + uTint * (25.0 * env.w * glint));
  }
  return col;
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 fc = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = uView.xy + (fc - 0.5 * uRes) * uView.z;
  vec2 d = p - C;
  float r = length(d);
  float th = atan(d.y, d.x);
  float gap = max(R0 - r, 1.0);
  float m = uView.w;
  float K = 4.5 + (1.0 + log(gap / D1) / LNQ + nudge(p) - 4.5) * m + uMotion.x;
  float w = gap * LNQ / m;
  float aa = uView.z / w;

  vec2 q = clamp(p, vec2(0.0), vec2(${REF_W}.0, ${REF_H}.0)) / 1000.0 - vec2(0.6, 1.0);
  float body = envelope(q, -3.7092, 2.4996, -4.3156, -4.975, -1.6414, 0.77581, 0.5);
  vec4 env = vec4(
    body,
    min(sqrt(body) * exp(-2.9914), 1.65),
    envelope(q, -9.7404, 26.18, -13.223, -19.901, -6.2186, 16.602, 1.0),
    envelope(q, -1.8032, -1.5862, -0.34234, -12.467, -1.9718, 7.467, 1.0) * uMotion.z
  );

  float kp = floor(K);
  float t = K - kp;
  vec3 col = band(kp, t, th, r, w, aa, env);
  if (t < aa * 0.5) col = mix(band(kp - 1.0, t + 1.0, th, r, w, aa, env), col, 0.5 + t / aa);
  else if (t > 1.0 - aa * 0.5) col = mix(band(kp + 1.0, t - 1.0, th, r, w, aa, env), col, 0.5 + (1.0 - t) / aa);

  // Subtle deep obsidian-violet ambient floor (#09090b) in dark mode,
  // or brushed pearl-silver chrome (#f5f4f0) with emerald/amethyst iridescence in light mode.
  if (uLight > 0.5) {
    vec3 mapped = encode(1.0 - exp(-col * 0.69504));
    float luma = dot(mapped, vec3(0.299, 0.587, 0.114));
    vec3 chroma = mapped - vec3(luma);
    // Pearl-mineral base (#f5f4f0) sculpted by the metallic arc rings
    vec3 pearl = vec3(0.961, 0.957, 0.941) - vec3(luma * 0.24) + chroma * 0.62;
    // Soft metallic sheen along bright crests
    pearl += vec3(0.035) * smoothstep(0.55, 0.95, luma);
    col = pearl;
  } else {
    col += vec3(0.0018, 0.0018, 0.0026);
    col = encode(1.0 - exp(-col * 0.69504));
  }
  col += (hash(fc + uSeed) - 0.5) * (3.0 / 255.0);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s))
  }
  return s
}

function readColor(css: string, ctx: CanvasRenderingContext2D | null): [number, number, number] {
  const hex = css.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i)
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].replace(/./g, "$&$&") : hex[1]
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
  }
  if (!ctx) return [0.5, 0.5, 0.5]
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = css
  ctx.fillRect(0, 0, 1, 1)
  const p = ctx.getImageData(0, 0, 1, 1).data
  return [p[0] / 255, p[1] / 255, p[2] / 255]
}

const linear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)

function tintMatrix(tint: [string, string] | undefined, ctx: CanvasRenderingContext2D | null) {
  if (!tint) return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
  const warm = readColor(tint[0], ctx).map(linear)
  const cool = readColor(tint[1], ctx).map(linear)
  const peak = Math.max(...warm.map((v, i) => v + cool[i]), 1e-3)
  const s = Math.min(1, 1 / peak)
  const mid = warm.map((v, i) => Math.max(0, 1 - s * (v + cool[i])))
  return new Float32Array([...warm.map((v) => v * s), ...mid, ...cool.map((v) => v * s)])
}

type Spring = { x: number; v: number }
function step(s: Spring, target: number, dt: number, omega: number) {
  const f = 1 + 2 * dt * omega
  const oo = omega * omega
  const det = 1 / (f + dt * dt * oo)
  const x = (f * s.x + dt * s.v + dt * dt * oo * target) * det
  s.v = (s.v + dt * oo * (target - s.x)) * det
  s.x = x
}

function viewScale(w: number, h: number) {
  const aspect = w / Math.max(h, 1)
  return aspect >= 1 ? (REF_W * Math.sqrt(aspect)) / w : REF_W / w
}

const DEFAULT_PURPLE_TINT: [string, string] = ["#c084fc", "#2ce5d8"]

export function ChromeArcs({
  children,
  speed = 0.85,
  rings = 1.05,
  tint = DEFAULT_PURPLE_TINT,
  intensity = 1.05,
  interactive = true,
  light = false,
  label = "Chrome arcs",
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: ChromeArcsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = React.useState(false)
  const pointer = React.useRef({ x: 0, on: 0 })
  const kick = React.useRef<() => void>(() => {})
  const scale = React.useRef(1)
  const tintKey = tint ? tint.join("|") : ""

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false })
    if (!gl) {
      const id = requestAnimationFrame(() => setFallback(true))
      return () => cancelAnimationFrame(id)
    }

    const prog = gl.createProgram()!
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
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

    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = u("uRes"),
      uView = u("uView"),
      uMotion = u("uMotion"),
      uTint = u("uTint"),
      uSeed = u("uSeed"),
      uLight = u("uLight")

    const probe = document.createElement("canvas")
    probe.width = probe.height = 1
    gl.uniformMatrix3fv(uTint, false, tintMatrix(tint, probe.getContext("2d", { willReadFrequently: true })))

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const moving = !reduce && speed > 0
    let cw = 0,
      ch = 0,
      ref = 1
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / Math.max(r.width * r.height, 1)))
      cw = Math.max(1, Math.round(r.width * dpr))
      ch = Math.max(1, Math.round(r.height * dpr))
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }
      scale.current = viewScale(r.width, r.height)
      ref = (scale.current * r.width) / cw
      gl.viewport(0, 0, cw, ch)
      kick.current()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const shift: Spring = { x: 0, v: 0 }
    const hover: Spring = { x: 0, v: 0 }
    let raf = 0
    let visible = true
    let last = -1
    let clock = 0
    const start = performance.now()
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)

    function frame(now: number) {
      raf = 0
      const dt = last < 0 ? 0 : Math.min(Math.max(now - last, 0) / 1000, 1 / 20)
      last = now
      if (moving) clock = ((now - start) / 1000) * speed
      const lap = (((clock / LOOP) % 1) + 1) % 1

      const p = pointer.current
      const on = interactive ? p.on : 0
      step(shift, on ? (p.x - 537) * PULL : 0, dt, 4)
      step(hover, on, dt, 5)
      const sway = moving ? SWAY * Math.sin(TAU * lap) : 0

      gl!.uniform2f(uRes, cw, ch)
      gl!.uniform4f(uView, VIEW_X, VIEW_Y, ref, Math.max(rings, 0.1))
      gl!.uniform3f(uMotion, lap, sway + shift.x, intensity * (1 + 0.08 * Math.max(hover.x, 0)))
      gl!.uniform1f(uSeed, moving ? Math.floor(clock * 30) % 97 : 0)
      gl!.uniform1f(uLight, light ? 1.0 : 0.0)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)

      const settled = Math.abs(shift.v) + Math.abs(hover.v) + Math.abs(hover.x - on) < 1e-3
      if (visible && (moving || !settled)) raf = requestAnimationFrame(frame)
    }
    kick.current = () => {
      if (visible && !raf) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const lost = (e: Event) => {
      e.preventDefault()
      setFallback(true)
    }
    canvas.addEventListener("webglcontextlost", lost)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      kick.current = () => {}
      canvas.removeEventListener("webglcontextlost", lost)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, rings, tintKey, intensity, interactive, light, fallback])

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    pointer.current.x = VIEW_X + (e.clientX - r.left - r.width / 2) * scale.current
    pointer.current.on = 1
    kick.current()
  }

  return (
    <div
      ref={rootRef}
      role={children ? undefined : "img"}
      aria-label={children ? undefined : label}
      className={className ? `chrome-arcs-root ${className}` : "chrome-arcs-root"}
      style={{ position: "relative", overflow: "hidden", background: light ? "#f5f4f0" : "#09090b", ...style }}
      onPointerMove={(e) => {
        if (interactive) track(e)
        onPointerMove?.(e)
      }}
      onPointerLeave={(e) => {
        pointer.current.on = 0
        kick.current()
        onPointerLeave?.(e)
      }}
      {...props}
    >
      <style>{`:where(.chrome-arcs-root){width:100%;height:100%}`}</style>
      {fallback ? (
        <div aria-hidden="true" className="chrome-arcs-fallback" style={FALLBACK}>
          <style>{FALLBACK_CSS}</style>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        />
      )}
      {children ? (
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

const streak = (x: number, y: number) =>
  [
    `radial-gradient(5% 6% at ${x}% ${y}%, rgba(245,235,255,0.85), rgba(235,215,255,0) 100%)`,
    `radial-gradient(10% 5% at ${x + 6}% ${y - 4}%, rgba(44,229,216,0.5), rgba(44,229,216,0) 100%)`,
    `radial-gradient(6% 14% at ${x - 2}% ${y + 9}%, rgba(192,132,252,0.52), rgba(168,85,247,0) 100%)`,
  ].join(",")

const FALLBACK: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "#070510",
  backgroundImage: [
    streak(38, 21),
    streak(41, 56),
    "linear-gradient(55deg, #070510 22%, rgba(7,5,16,0.6) 45%, rgba(7,5,16,0) 68%)",
    "repeating-radial-gradient(circle at 330% 150%, #070510 0, #7c5ca8 0.12%, #0e091b 0.9%, #1f1438 3.2%, #4a3173 5%, #160e26 6.2%, #070510 7.2%, #070510 8.8%)",
  ].join(","),
  animation: "chrome-arcs-drift 5s ease-in-out infinite alternate",
}

const FALLBACK_CSS =
  "@keyframes chrome-arcs-drift{to{background-position:2% -1%,2% -1%,2% -1%,2% -1%,2% -1%,2% -1%,0 0,0 0}}" +
  "@media (prefers-reduced-motion:reduce){.chrome-arcs-fallback{animation:none!important}}"

export default ChromeArcs

