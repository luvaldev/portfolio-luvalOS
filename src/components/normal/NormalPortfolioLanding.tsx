"use client"

import { memo, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import {
  Bot,
  Check,
  Code2,
  Command,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  FolderGit2,
  Layers,
  Lock,
  Mail,
  Menu,
  Moon,
  Server,
  Shield,
  Sparkles,
  Sun,
  Trophy,
  User,
  Users,
  Wifi,
  X,
} from "lucide-react"
import ArrowUpRight from "@/components/icons/ArrowUpRight"
import { ChromeArcs } from "@/components/ui/chrome-arcs"
import AmbientVoxelDust from "@/components/normal/AmbientVoxelDust"
import {
  ALL_PROJECTS,
  CATEGORY_LABELS,
  CTF_EVENTS,
  HERO_METRICS,
  MANIFESTO_PILLARS,
  MANIFESTO_TOKENS,
  MANIFESTO_TOTAL_CHARS,
  NAV_ITEMS,
  STACK_DATA,
  TIMELINE_PAIRS,
  type FlagshipProject,
  type RepositoryItem,
  type TimelineItem,
} from "@/data/portfolioData"
import {
  NormalCommandPalette,
  NormalProjectModal,
  NormalTimelineModal,
  VectorGithubIcon,
  VectorInstagramIcon,
  VectorLinkedinIcon,
  renderNormalTechIcon,
} from "@/components/normal/NormalPortfolioModals"
import "@/app/normal-portfolio.css"

const CATEGORY_FILTER_OPTIONS: Array<{ value: "all" | RepositoryItem["category"]; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "security", label: CATEGORY_LABELS.security },
  { value: "saas", label: CATEGORY_LABELS.saas },
  { value: "iot", label: CATEGORY_LABELS.iot },
  { value: "academic", label: CATEGORY_LABELS.academic },
]

const PROJECT_CATEGORY_MAP: Record<string, RepositoryItem["category"]> = {
  "Ciberseguridad Defensiva & Redes": "security",
  "SaaS Full-Stack & Telemetría Logística": "saas",
  "Plataforma Colaborativa Académica": "academic",
  "IoT, Hardware Embebido & Seguridad Vial": "iot",
  [CATEGORY_LABELS.security]: "security",
  [CATEGORY_LABELS.saas]: "saas",
  [CATEGORY_LABELS.iot]: "iot",
  [CATEGORY_LABELS.academic]: "academic",
}

const ManifestoScrollBoard = memo(function ManifestoScrollBoard() {
  const manifestoRef = useRef<HTMLDivElement | null>(null)
  const [litCharCount, setLitCharCount] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const immediate = setTimeout(() => setLitCharCount(MANIFESTO_TOTAL_CHARS), 0)
      return () => clearTimeout(immediate)
    }

    let rafId: number | null = null
    let targetChars = 0
    let displayedChars = 0

    const stepReveal = () => {
      if (displayedChars < targetChars) {
        displayedChars = Math.min(targetChars, displayedChars + 3)
        setLitCharCount(displayedChars)
        rafId = requestAnimationFrame(stepReveal)
      } else {
        rafId = null
      }
    }

    const updateProgress = () => {
      const el = manifestoRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const startY = vh * 0.88
      const endY = vh * 0.24
      const raw = (startY - rect.top) / Math.max(1, startY - endY)
      const clamped = Math.max(0, Math.min(1, raw))
      targetChars = Math.round(clamped * MANIFESTO_TOTAL_CHARS)

      if (targetChars < displayedChars) {
        displayedChars = targetChars
        setLitCharCount(displayedChars)
      } else if (targetChars > displayedChars && rafId === null) {
        rafId = requestAnimationFrame(stepReveal)
      }
    }

    const initialTick = setTimeout(updateProgress, 0)
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      clearTimeout(initialTick)
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={manifestoRef} className="np-card rounded-3xl p-6 sm:p-10 mb-8">
      <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight">
        {MANIFESTO_TOKENS.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-pre">
            {Array.from(word.text).map((char, charOffset) => {
              const globalIndex = word.start + charOffset
              const isLit = globalIndex < litCharCount
              return (
                <span
                  key={charOffset}
                  className={`np-manifesto-char${word.accent ? " is-accent" : ""}${isLit ? " is-lit" : ""}`}
                >
                  {char}
                </span>
              )
            })}
          </span>
        ))}
      </h2>
    </div>
  )
})

function PillarIcon({ iconKey, accent }: { iconKey: "shield" | "cpu" | "layers"; accent: string }) {
  if (iconKey === "shield") return <Shield size={20} style={{ color: accent }} />
  if (iconKey === "cpu") return <Cpu size={20} style={{ color: accent }} />
  return <Layers size={20} style={{ color: accent }} />
}

function StackGroupIcon({ iconKey, accent }: { iconKey: "languages" | "frontend" | "backend" | "systems" | "ai"; accent: string }) {
  if (iconKey === "languages") return <Code2 size={20} style={{ color: accent }} />
  if (iconKey === "frontend") return <Layers size={20} style={{ color: accent }} />
  if (iconKey === "backend") return <Database size={20} style={{ color: accent }} />
  if (iconKey === "systems") return <Wifi size={20} style={{ color: accent }} />
  return <Bot size={20} style={{ color: accent }} />
}

function handleCardPointerMove(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
}

export default function NormalPortfolioLanding({
  onActivateMinecraft,
}: {
  onActivateMinecraft: (origin?: { x: number; y: number }) => void
}) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isLight = mounted && resolvedTheme === "light"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Project filters & modals
  const [yearFilter, setYearFilter] = useState<"all" | number>("all")
  const [categoryFilter, setCategoryFilter] = useState<"all" | RepositoryItem["category"]>("all")
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null)
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["hero", "manifiesto", "actividades", "proyectos", "stack", "trayectoria", "contacto"]
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: "-28% 0px -54% 0px", threshold: [0, 0.2, 0.5] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Keyboard shortcuts (Cmd/Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setCommandOpen(false)
        setSelectedProject(null)
        setSelectedTimelineItem(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    const x = event.clientX || window.innerWidth - 45
    const y = event.clientY || 35

    if (!("startViewTransition" in document) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme)
      return
    }

    document.documentElement.style.setProperty("--theme-x", `${x}px`)
    document.documentElement.style.setProperty("--theme-y", `${y}px`)
    document.startViewTransition(() => setTheme(nextTheme))
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText("luvalprojects@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const availableYears = useMemo(
    () => [...new Set(ALL_PROJECTS.map((project) => project.year))].sort((a, b) => b - a),
    []
  )

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      if (yearFilter !== "all" && project.year !== yearFilter) return false
      if (categoryFilter !== "all") {
        const mapped = PROJECT_CATEGORY_MAP[project.category]
        if (mapped !== categoryFilter) return false
      }
      return true
    })
  }, [yearFilter, categoryFilter])

  const selectedProjectIndex = selectedProject
    ? ALL_PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : -1

  const navigateProjectModal = (direction: -1 | 1) => {
    if (selectedProjectIndex < 0) return
    const nextIdx = (selectedProjectIndex + direction + ALL_PROJECTS.length) % ALL_PROJECTS.length
    setSelectedProject(ALL_PROJECTS[nextIdx])
  }

  return (
    <div className="np-root selection:bg-[var(--np-accent)] selection:text-[var(--np-accent-ink)]">
      {/* Continuous Base + Live Subtle Mineral/Network Particle Field */}
      <div className="np-ambient-backdrop" aria-hidden="true" />
      <AmbientVoxelDust />

      {/* ── Sticky Glass Navbar ── */}
      <header className="np-navbar fixed top-0 inset-x-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-3">
          <a href="#hero" className="flex flex-col group focus-visible:outline-none">
            <span className="text-sm font-bold tracking-tight text-[var(--np-ink)] leading-none">
              Luis Valdenegro
            </span>
            <span className="font-mono text-[11px] text-[var(--np-muted)] mt-1">
              @luvaldev · Santiago, CL
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`np-nav-link px-3 py-2 rounded-xl${activeSection === item.id ? " is-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Abrir paleta de comandos"
              className="np-btn-secondary hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-xl font-mono text-xs text-[var(--np-muted)]"
            >
              <Command size={13} className="text-[var(--np-accent-bright)]" />
              <span>K</span>
            </button>

            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Cambiar tema de color"
                className="np-btn-secondary w-9 h-9 rounded-xl flex items-center justify-center"
              >
                {theme === "dark" ? (
                  <Sun size={17} className="text-amber-300" />
                ) : (
                  <Moon size={17} className="text-purple-700" />
                )}
              </button>
            )}

            <a
              href="/CV_Valdenegro-Luis.pdf"
              target="_blank"
              rel="noreferrer"
              className="np-btn-primary hidden sm:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl text-xs font-semibold"
            >
              <FileText size={14} />
              <span>CV</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              className="np-btn-secondary w-9 h-9 rounded-xl flex xl:hidden items-center justify-center"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Navegación móvil"
            className="xl:hidden border-t border-[var(--np-border)] bg-[var(--np-surface-strong)] backdrop-blur-xl px-4 py-4 space-y-1.5"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm hover:bg-purple-500/10"
            >
              <span>Inicio</span>
              <span className="font-mono text-xs text-[var(--np-muted)]">00</span>
            </a>
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm hover:bg-purple-500/10"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[var(--np-muted)]">{String(idx + 1).padStart(2, "0")}</span>
              </a>
            ))}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setCommandOpen(true)
                }}
                className="np-btn-secondary flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono"
              >
                <Command size={14} />
                <span>Comandos (⌘K)</span>
              </button>
              <a
                href="/CV_Valdenegro-Luis.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="np-btn-primary flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
              >
                <FileText size={14} />
                <span>Abrir CV</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 pt-[68px]">
        {/* ── SECTION 0: HERO (Chrome Arcs Metallic Shader · Adapts to Light Pearl & Dark Obsidian) ── */}
        <section id="hero" className={`relative overflow-hidden ${isLight ? "text-[#111114]" : "text-[#fafafa]"}`}>
          <ChromeArcs
            className="min-h-[34rem] w-full"
            tint={isLight ? ["#059669", "#7e22ce"] : ["#34d399", "#a855f7"]}
            speed={0.85}
            rings={1.05}
            intensity={isLight ? 0.95 : 1.05}
            light={isLight}
            interactive
          >
            {/* Long seamless bottom blend into var(--np-bg) — zero hard edge in both themes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background: isLight
                  ? "radial-gradient(ellipse 74% 72% at 24% 44%, rgba(245, 244, 240, 0.72), rgba(245, 244, 240, 0.16) 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(245, 244, 240, 0.55) 74%, var(--np-bg) 100%)"
                  : "radial-gradient(ellipse 74% 72% at 24% 44%, rgba(9, 9, 11, 0.72), rgba(9, 9, 11, 0.18) 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, transparent 38%, rgba(9, 9, 11, 0.45) 68%, var(--np-bg) 100%)",
              }}
            />
            <div className="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24 lg:py-28 px-4 sm:px-6">
              <div className="max-w-3xl">
                {/* Editorial Hero Copy */}
                <div className="space-y-6">
                <h1 className={`text-3xl sm:text-5xl xl:text-[3.35rem] font-extrabold tracking-tight leading-[1.08] ${isLight ? "text-[#111114]" : "text-[#fafafa]"}`}>
                  <span className="block">INGENIERÍA DE REDES,</span>
                  <span className="block">
                    <span
                      className={`inline-block bg-clip-text text-transparent ${
                        isLight
                          ? "bg-gradient-to-r from-[#047857] via-[#059669] to-[#7e22ce]"
                          : "bg-gradient-to-r from-[#d1fae5] via-[#34d399] to-[#a855f7]"
                      }`}
                    >
                      SISTEMAS DISTRIBUIDOS
                    </span>
                  </span>
                  <span className="block">&amp; SOFTWARE DE ALTA FIDELIDAD.</span>
                </h1>

                <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isLight ? "text-[#3f3f46]" : "text-[#d4d4d8]"}`}>
                  Soy <strong className={`font-semibold ${isLight ? "text-[#111114]" : "text-white"}`}>Luis Valdenegro</strong> (
                  <code
                    className={`font-mono text-sm px-1.5 py-0.5 rounded-md border ${
                      isLight
                        ? "bg-emerald-600/10 border-emerald-700/20 text-[#047857]"
                        : "bg-white/10 border-white/15 text-[#6ee7b7]"
                    }`}
                  >
                    @luvaldev
                  </code>
                  ), estudiante de{" "}
                  <strong className={`font-semibold ${isLight ? "text-[#111114]" : "text-white"}`}>
                    Ingeniería Civil en Informática y Telecomunicaciones
                  </strong>{" "}
                  en la Universidad Diego Portales. Investigo en ciberseguridad defensiva, firmware embebido en C++,
                  análisis forense de paquetes y arquitectura web de alto rendimiento.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#proyectos"
                    className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isLight
                        ? "bg-[#111114] text-[#fafafa] hover:bg-[#27272a] shadow-[0_10px_24px_-10px_rgba(17,17,20,0.4)]"
                        : "bg-[#fafafa] text-[#09090b] hover:bg-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.7)]"
                    }`}
                  >
                    <FolderGit2 size={17} />
                    <span>Explorar Proyectos</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className={`inline-flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono backdrop-blur-md transition-all cursor-pointer border ${
                      isLight
                        ? "bg-white/80 hover:bg-white border-zinc-900/15 text-[#111114]"
                        : "bg-white/10 hover:bg-white/15 border-white/15 text-[#fafafa]"
                    }`}
                  >
                    {copiedEmail ? (
                      <Check size={16} className={isLight ? "text-[#059669]" : "text-[#34d399]"} />
                    ) : (
                      <Copy size={16} className={isLight ? "text-[#059669]" : "text-[#34d399]"} />
                    )}
                    <span>{copiedEmail ? "¡Correo copiado!" : "luvalprojects@gmail.com"}</span>
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <span className={`font-mono text-[11px] uppercase tracking-wider mr-1 ${isLight ? "text-[#63636e]" : "text-[#a1a1aa]"}`}>
                    Redes &amp; Contacto
                  </span>
                  {[
                    { href: "https://github.com/luvaldev", label: "GitHub de Luis Valdenegro", title: "GitHub (@luvaldev)", icon: <VectorGithubIcon size={18} />, external: true },
                    { href: "https://cl.linkedin.com/in/luis-valdenegrom", label: "LinkedIn de Luis Valdenegro", title: "LinkedIn", icon: <VectorLinkedinIcon size={18} />, external: true },
                    { href: "https://www.instagram.com/lwchito/", label: "Instagram de Luis Valdenegro", title: "Instagram (@lwchito)", icon: <VectorInstagramIcon size={18} />, external: true },
                    { href: "mailto:luvalprojects@gmail.com", label: "Enviar correo directo", title: "Enviar correo (luvalprojects@gmail.com)", icon: <Mail size={18} />, external: false },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      aria-label={item.label}
                      title={item.title}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isLight
                          ? "bg-white/80 hover:bg-white border-zinc-900/15 text-[#111114]"
                          : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                      }`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
              </div>

            {/* Unified Architectural Metrics Strip */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 mt-14 rounded-2xl border backdrop-blur-md divide-y lg:divide-y-0 lg:divide-x overflow-hidden ${
                isLight
                  ? "border-zinc-900/12 bg-white/82 divide-zinc-900/10 shadow-[0_14px_34px_-22px_rgba(24,24,27,0.18)]"
                  : "border-white/12 bg-[#0c0c10]/80 divide-white/10"
              }`}
            >
              {HERO_METRICS.map((stat) => (
                <div key={stat.metric} className="p-5">
                  <div
                    className="font-mono text-xl sm:text-2xl font-bold tracking-tight mb-1.5"
                    style={{ color: stat.accent }}
                  >
                    {stat.metric}
                  </div>
                  <div className={`text-sm font-semibold leading-snug ${isLight ? "text-[#111114]" : "text-[#fafafa]"}`}>
                    {stat.label}
                  </div>
                  <div className={`font-mono text-[11px] mt-1 ${isLight ? "text-[#63636e]" : "text-[#a1a1aa]"}`}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ChromeArcs>
        </section>

        {/* ── SECTION 1: MANIFIESTO TÉCNICO ── */}
        <section id="manifiesto" className="np-sec np-sec-manifiesto py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="np-section-eyebrow">
                  <span>01</span>
                  <span>Manifiesto de Ingeniería</span>
                </div>
                <span className="font-mono text-xs text-[var(--np-muted)]">
                  Hardware · Redes · Software
                </span>
              </div>

              <ManifestoScrollBoard />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {MANIFESTO_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="np-spotlight-card rounded-2xl p-6 flex flex-col"
                    onPointerMove={handleCardPointerMove}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center">
                        <PillarIcon iconKey={pillar.iconKey} accent={pillar.accent} />
                      </div>
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase font-semibold"
                        style={{ color: pillar.accent }}
                      >
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--np-ink)] mb-2.5 leading-snug">{pillar.title}</h3>
                    <p className="text-sm text-[var(--np-ink-secondary)] leading-relaxed flex-1">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: ACTIVIDADES & PARTICIPACIÓN ── */}
        <section id="actividades" className="np-sec np-sec-actividades py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <div className="np-section-eyebrow mb-3">
                  <span>02</span>
                  <span>Coliseo de Desafíos · Actividades</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                  Actividades &amp; Participación.
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 border border-[var(--np-border)] font-mono text-xs text-[var(--np-accent-bright)] self-start md:self-auto">
                <Trophy size={15} className="text-amber-400" />
                <span>3 CTFs Competitivos · EIT UDP</span>
              </div>
            </div>

            {/* Historial de CTF */}
            <div className="np-card rounded-3xl overflow-hidden mb-7">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-[var(--np-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center">
                    <Trophy size={19} className="text-amber-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--np-emerald)] block">
                      Torneos de Ciberseguridad
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">Historial de CTF</h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-purple-500/10 border border-[var(--np-border)] text-[var(--np-muted)]">
                  Captura la Bandera · UDP &amp; Dreamlab
                </span>
              </div>

              <div className="divide-y divide-[var(--np-border)]">
                {CTF_EVENTS.map((ctf) => (
                  <div
                    key={`${ctf.date}-${ctf.name}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 hover:bg-purple-500/5 transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] text-[var(--np-muted)] block mb-1">{ctf.date}</span>
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <h4 className="text-base sm:text-lg font-bold text-[var(--np-ink)]">{ctf.name}</h4>
                        <span className="text-xs sm:text-sm text-[var(--np-ink-secondary)]">
                          · Equipo <strong className="font-mono text-[var(--np-cyan)]">{ctf.team}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border ${
                          ctf.rank <= 3
                            ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                            : "bg-purple-500/10 border-[var(--np-border)] text-[var(--np-ink)]"
                        }`}
                      >
                        <Trophy size={13} />
                        <span>{ctf.placement}</span>
                      </span>

                      <a
                        href={ctf.url}
                        target="_blank"
                        rel="noreferrer"
                        className="np-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium"
                      >
                        <span>{ctf.ctaLabel}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Participación Individual & Actividades Grupales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="np-spotlight-card rounded-2xl p-6" onPointerMove={handleCardPointerMove}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                      <User size={19} className="text-[var(--np-emerald)]" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--np-emerald)] block">
                        SOLO // INVESTIGACIÓN &amp; REDES
                      </span>
                      <h3 className="text-lg font-bold mt-0.5">Participación Individual</h3>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--np-ink-secondary)] leading-relaxed mb-4">
                  Auditorías técnicas de infraestructura DNS/SMTP, retos individuales de reversing/forense y contribuciones abiertas de software.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] bg-emerald-500/10 border border-emerald-400/25 text-[var(--np-emerald)]">
                  MODO SOLO · FORENSE &amp; RETOS TÉCNICOS
                </span>
              </div>

              <div className="np-spotlight-card rounded-2xl p-6" onPointerMove={handleCardPointerMove}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center">
                      <Users size={19} className="text-[var(--np-accent-bright)]" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--np-accent-bright)] block">
                        PARTY // EQUIPO INSIDE &amp; UDP
                      </span>
                      <h3 className="text-lg font-bold mt-0.5">Actividades Grupales</h3>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--np-ink-secondary)] leading-relaxed mb-4">
                  Competencias Capture The Flag junto a los equipos Inside e INSAID en EIT UDP, ayudantías de C++ y proyectos colaborativos de laboratorio.
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] bg-purple-500/15 border border-purple-400/30 text-[var(--np-accent-bright)]">
                  MODO PARTY · 3 TORNEOS CTF COMPLETADOS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: PROYECTOS ── */}
        <section id="proyectos" className="np-sec np-sec-proyectos py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="np-section-eyebrow mb-3">
                  <span>03</span>
                  <span>Catálogo Técnico · {ALL_PROJECTS.length} Proyectos</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Todos mis proyectos.</h2>
              </div>
              <span className="font-mono text-xs text-[var(--np-muted)]">
                Mostrando {filteredProjects.length} de {ALL_PROJECTS.length} proyectos
              </span>
            </div>

            {/* Filters: Year + Category */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
                {CATEGORY_FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={categoryFilter === option.value}
                    onClick={() => setCategoryFilter(option.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                      categoryFilter === option.value
                        ? "bg-purple-500/25 border-purple-400/50 text-[var(--np-ink)]"
                        : "bg-[var(--np-surface)] border-[var(--np-border)] text-[var(--np-muted)] hover:text-[var(--np-ink)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por año">
                <button
                  type="button"
                  aria-pressed={yearFilter === "all"}
                  onClick={() => setYearFilter("all")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all border ${
                    yearFilter === "all"
                      ? "bg-purple-500/25 border-purple-400/50 text-[var(--np-ink)]"
                      : "bg-[var(--np-surface)] border-[var(--np-border)] text-[var(--np-muted)] hover:text-[var(--np-ink)]"
                  }`}
                >
                  Todos
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    aria-pressed={yearFilter === year}
                    onClick={() => setYearFilter(year)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all border ${
                      yearFilter === year
                        ? "bg-purple-500/25 border-purple-400/50 text-[var(--np-ink)]"
                        : "bg-[var(--np-surface)] border-[var(--np-border)] text-[var(--np-muted)] hover:text-[var(--np-ink)]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Pointer-Spotlight Grid of all 12 Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  onPointerMove={handleCardPointerMove}
                  className="np-spotlight-card rounded-2xl p-6 text-left flex flex-col group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[var(--np-accent-bright)]">
                      {project.year}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--np-muted)] truncate">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--np-ink)] group-hover:text-[var(--np-accent-bright)] transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--np-ink-secondary)] leading-relaxed mb-4 flex-1">
                    {project.headline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/30 border border-[var(--np-border)] text-[11px] text-[var(--np-ink-secondary)]"
                      >
                        {renderNormalTechIcon(tech, 13)}
                        <span className="truncate max-w-[120px]">{tech}</span>
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[var(--np-border)] flex items-center justify-between gap-2 w-full text-xs">
                    <span className="font-mono text-[var(--np-muted)] inline-flex items-center gap-1.5">
                      {project.githubIsPrivate && <Lock size={12} className="text-[var(--np-accent-bright)]" />}
                      <span>{project.category}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--np-accent-bright)] group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>Ver ficha</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: MATRIZ DE TECNOLOGÍAS (All 5 groups / 31 items) ── */}
        <section id="stack" className="np-sec np-sec-stack py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-3xl">
                <div className="np-section-eyebrow mb-3">
                  <span>04</span>
                  <span>Stack Técnico</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Matriz de Tecnologías.</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 border border-[var(--np-border)] font-mono text-xs text-[var(--np-emerald)] self-start md:self-auto">
                <Sparkles size={15} />
                <span>31 Tecnologías Equipadas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STACK_DATA.map((group) => (
                <div
                  key={group.category}
                  onPointerMove={handleCardPointerMove}
                  className={`np-spotlight-card rounded-3xl p-6${group.fullWidth ? " md:col-span-2" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--np-border)]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center shrink-0">
                        <StackGroupIcon iconKey={group.iconKey} accent={group.accent} />
                      </div>
                      <div>
                        <span
                          className="font-mono text-[10px] tracking-widest uppercase block font-semibold"
                          style={{ color: group.accent }}
                        >
                          {group.fullWidth ? "Orquestación & Automatización IA" : "Dominio Técnico"}
                        </span>
                        <h3 className="text-lg font-bold text-[var(--np-ink)] leading-snug">{group.category}</h3>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[var(--np-muted)]">{group.items.length} items</span>
                  </div>

                  <div className={group.fullWidth ? "grid grid-cols-1 md:grid-cols-2 gap-2.5" : "divide-y divide-[var(--np-border)]"}>
                    {group.items.map((tech) => (
                      <div
                        key={tech.name}
                        className={`flex items-start gap-3.5 transition-colors ${
                          group.fullWidth
                            ? "p-3.5 rounded-xl bg-[var(--np-item-bg)] border border-[var(--np-border)] hover:border-[var(--np-border-strong)]"
                            : "py-3 first:pt-0 last:pb-0"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-[var(--np-item-bg)] border border-[var(--np-border)] flex items-center justify-center shrink-0 mt-0.5">
                          {renderNormalTechIcon(tech.name, 19, tech.techKey)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-[var(--np-ink)] truncate">{tech.name}</div>
                          <div className="text-xs text-[var(--np-muted)] leading-snug mt-0.5">{tech.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: TRAYECTORIA ── */}
        <section id="trayectoria" className="np-sec np-sec-trayectoria py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <div>
                <div className="np-section-eyebrow mb-3">
                  <span>05</span>
                  <span>Bitácora de Experiencia</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Trayectoria &amp; Compromiso.</h2>
              </div>
              <a
                href="/CV_Valdenegro-Luis.pdf"
                target="_blank"
                rel="noreferrer"
                className="np-btn-primary inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold self-start md:self-auto"
              >
                <FileText size={16} />
                <span>Descargar Currículum Completo</span>
              </a>
            </div>

            <div className="space-y-5">
              {TIMELINE_PAIRS.map((pair, pairIdx) => (
                <div key={`pair-${pairIdx}`} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pair.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTimelineItem(item)}
                      onPointerMove={handleCardPointerMove}
                      className="np-spotlight-card rounded-2xl p-6 text-left flex flex-col group w-full"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--np-border)] w-full">
                        <span className="font-mono text-xs font-semibold text-[var(--np-cyan)]">{item.period}</span>
                        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[var(--np-accent-bright)]">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--np-ink)] group-hover:text-[var(--np-accent-bright)] transition-colors mb-1.5 leading-snug">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs text-[var(--np-muted)] mb-3">{item.institution}</div>
                      <p className="text-sm text-[var(--np-ink-secondary)] leading-relaxed mb-4 flex-1">
                        {item.description}
                      </p>
                      <div className="pt-3 border-t border-[var(--np-border)] flex items-center justify-between w-full text-xs">
                        <span className="font-mono text-[var(--np-muted)]">{item.techStack.length} tecnologías</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--np-accent-bright)]">
                          <span>Ver detalle completo</span>
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CONTACTO ── */}
        <section id="contacto" className="np-sec np-sec-contacto py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="np-section-eyebrow mb-4">
                <span>06</span>
                <span>Conexión Directa</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">Hablemos de Ingeniería.</h2>
              <p className="text-base text-[var(--np-ink-secondary)] max-w-xl mx-auto">
                ¿Tienes un proyecto desafiante, una oportunidad de pasantía o quieres colaborar en sistemas distribuidos y forense de redes?
              </p>
            </div>

            {/* Sleek Purple Terminal Contact Card */}
            <div className="np-card rounded-3xl overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[var(--np-border)] bg-purple-950/25">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/35 flex items-center justify-center shrink-0">
                    <Server size={17} className="text-[var(--np-accent-bright)]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[var(--np-ink)] block leading-none">
                      LUVAL@STATION // CONSOLA ACTIVA
                    </span>
                    <span className="font-mono text-[11px] text-[var(--np-muted)]">Santiago, Chile · UTC-3</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      onActivateMinecraft({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                      })
                    }}
                    title="Activar Bloque de Comandos · Ir al mundo Minecraft"
                    aria-label="Activar Bloque de Comandos hacia el mundo Minecraft"
                    className="np-portal-leds p-1.5 rounded-lg bg-black/40 border border-purple-400/35 hover:border-amber-300/80 hover:scale-105 transition-all cursor-pointer"
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                  </button>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 font-mono text-[11px] text-[var(--np-emerald)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--np-emerald)] shadow-[0_0_8px_#34d399]" />
                    <span>ONLINE · 12MS</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="font-mono text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-black/25 border border-[var(--np-border)]">
                  <span className="text-[var(--np-emerald)] font-bold">luval@station</span>
                  <span className="text-[var(--np-muted)]">:</span>
                  <span className="text-[var(--np-accent-bright)] font-bold">~</span>
                  <span className="text-[var(--np-muted)]">$ </span>
                  <span className="text-[var(--np-ink)]">/status contact_channels --all</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <a
                    href="mailto:luvalprojects@gmail.com"
                    className="np-spotlight-card rounded-2xl p-4 flex items-center gap-3.5 group"
                    onPointerMove={handleCardPointerMove}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-[var(--np-accent-bright)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--np-muted)] block">
                        Email Directo
                      </span>
                      <span className="text-sm font-medium text-[var(--np-ink)] group-hover:text-[var(--np-accent-bright)] truncate block">
                        luvalprojects@gmail.com
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://github.com/luvaldev"
                    target="_blank"
                    rel="noreferrer"
                    className="np-spotlight-card rounded-2xl p-4 flex items-center gap-3.5 group"
                    onPointerMove={handleCardPointerMove}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center shrink-0">
                      <VectorGithubIcon size={18} className="text-[var(--np-ink)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--np-muted)] block">
                        GitHub
                      </span>
                      <span className="text-sm font-medium text-[var(--np-ink)] group-hover:text-[var(--np-accent-bright)] truncate block">
                        github.com/luvaldev
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://cl.linkedin.com/in/luis-valdenegrom"
                    target="_blank"
                    rel="noreferrer"
                    className="np-spotlight-card rounded-2xl p-4 flex items-center gap-3.5 group"
                    onPointerMove={handleCardPointerMove}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center shrink-0">
                      <VectorLinkedinIcon size={18} className="text-sky-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--np-muted)] block">
                        LinkedIn
                      </span>
                      <span className="text-sm font-medium text-[var(--np-ink)] group-hover:text-[var(--np-accent-bright)] truncate block">
                        Luis Valdenegro
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/lwchito/"
                    target="_blank"
                    rel="noreferrer"
                    className="np-spotlight-card rounded-2xl p-4 flex items-center gap-3.5 group"
                    onPointerMove={handleCardPointerMove}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-[var(--np-border)] flex items-center justify-center shrink-0">
                      <VectorInstagramIcon size={18} className="text-pink-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--np-muted)] block">
                        Instagram
                      </span>
                      <span className="text-sm font-medium text-[var(--np-ink)] group-hover:text-pink-400 truncate block">
                        @lwchito
                      </span>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="mailto:luvalprojects@gmail.com"
                    className="np-btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold"
                  >
                    <Mail size={16} />
                    <span>Enviar Correo Directo</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="np-btn-secondary inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium"
                  >
                    {copiedEmail ? (
                      <Check size={16} className="text-[var(--np-emerald)]" />
                    ) : (
                      <Copy size={16} className="text-[var(--np-accent-bright)]" />
                    )}
                    <span>{copiedEmail ? "¡Copiado al portapapeles!" : "Copiar Email"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--np-border)] py-10 px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--np-muted)]">
          <span className="font-mono">© 2026 Luis Valdenegro (Luval)</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/luvaldev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--np-ink)] transition-colors"
            >
              <VectorGithubIcon size={15} />
              <span>GitHub</span>
            </a>
            <a
              href="https://cl.linkedin.com/in/luis-valdenegrom"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--np-ink)] transition-colors"
            >
              <VectorLinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/lwchito/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--np-ink)] transition-colors"
            >
              <VectorInstagramIcon size={15} />
              <span>Instagram</span>
            </a>
            <a
              href="/CV_Valdenegro-Luis.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--np-ink)] transition-colors"
            >
              <FileText size={15} />
              <span>CV</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ── MODALS & COMMAND PALETTE ── */}
      <NormalCommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onCopyEmail={copyEmail}
        copiedEmail={copiedEmail}
        onActivateMinecraft={onActivateMinecraft}
      />

      <NormalProjectModal
        project={selectedProject}
        projectIndex={selectedProjectIndex}
        onClose={() => setSelectedProject(null)}
        onNavigate={navigateProjectModal}
      />

      <NormalTimelineModal
        item={selectedTimelineItem}
        onClose={() => setSelectedTimelineItem(null)}
      />
    </div>
  )
}
