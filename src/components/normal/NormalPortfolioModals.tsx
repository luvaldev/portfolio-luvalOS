"use client"

import { useMemo, useState } from "react"
import {
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Mail,
  Rocket,
  Search,
  Server,
  ShieldAlert,
  Sparkles,
  Terminal,
  Wifi,
  X,
} from "lucide-react"
import ArrowUpRight from "@/components/icons/ArrowUpRight"
import LanguageCpp from "@/components/icons/LanguageCpp"
import LanguageDart from "@/components/icons/LanguageDart"
import LanguageJava from "@/components/icons/LanguageJava"
import LanguageJavaScript from "@/components/icons/LanguageJavaScript"
import LanguageMarkdown from "@/components/icons/LanguageMarkdown"
import LanguagePython from "@/components/icons/LanguagePython"
import LanguageTypeScript from "@/components/icons/LanguageTypeScript"
import { PixelCommandBlockIcon } from "@/components/icons/PixelIcons"
import { getProjectTechnologyIcon } from "@/components/icons/projectTechnologyIcons"
import {
  ALL_PROJECTS,
  NAV_ITEMS,
  isLanguageTechnology,
  projectLanguages,
  type FlagshipProject,
  type TimelineItem,
} from "@/data/portfolioData"

export function VectorGithubIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function VectorLinkedinIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function VectorInstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function renderNormalTechIcon(name: string, size = 18, techKey?: string) {
  if (techKey === "python" || /Python/i.test(name)) return <LanguagePython size={size} className="shrink-0" />
  if (techKey === "ts" || /TypeScript/i.test(name)) return <LanguageTypeScript size={size} className="shrink-0" />
  if (techKey === "js" || /JavaScript/i.test(name)) return <LanguageJavaScript size={size} className="shrink-0" />
  if (techKey === "cpp" || /C\+\+/i.test(name)) return <LanguageCpp size={size} className="shrink-0" />
  if (techKey === "java" || /^Java$/i.test(name)) return <LanguageJava size={size} className="shrink-0" />
  if (techKey === "dart" || /Dart/i.test(name)) return <LanguageDart size={size} className="shrink-0" />
  if (techKey === "markdown" || /^Markdown$/i.test(name)) return <LanguageMarkdown size={size} className="shrink-0" />

  const ProjectTechIcon = getProjectTechnologyIcon(name)
  if (ProjectTechIcon) return <ProjectTechIcon size={size} className="shrink-0" />

  if (techKey === "sql" || /^SQL/i.test(name)) return <Database size={size} className="shrink-0 text-[#38bdf8]" />
  if (techKey === "bash" || /Bash|Shell/i.test(name)) return <Terminal size={size} className="shrink-0 text-[#34d399]" />
  if (techKey === "ui" || /Componentes/i.test(name)) return <Layers size={size} className="shrink-0 text-[#f472b6]" />
  if (techKey === "linux" || /Linux/i.test(name)) return <Server size={size} className="shrink-0 text-[#fbbf24]" />
  if (techKey === "rfc" || /RFC|DNS|SMTP|WHOIS/i.test(name)) return <Globe size={size} className="shrink-0 text-[#2ce5d8]" />
  if (techKey === "git" || /^Git/i.test(name)) return <GitBranch size={size} className="shrink-0 text-[#fb923c]" />
  if (techKey === "ai-subagents") return <Bot size={size} className="shrink-0 text-[#c084fc]" />
  if (techKey === "ai-mcp") return <KeyRound size={size} className="shrink-0 text-[#38bdf8]" />
  if (techKey === "ai-security") return <ShieldAlert size={size} className="shrink-0 text-[#34d399]" />
  if (techKey === "ai-ideation") return <Rocket size={size} className="shrink-0 text-[#f472b6]" />
  if (techKey === "ai-rag") return <Sparkles size={size} className="shrink-0 text-[#d8b4fe]" />
  if (techKey === "ai-eval") return <Check size={size} className="shrink-0 text-[#2ce5d8]" />
  if (/POSIX|Threads|Mutex|Paginación|Swap|FIFOs/i.test(name)) return <Cpu size={size} className="shrink-0 text-[#a78bfa]" />
  if (/ToF|Sensores|WLAN|Wi-Fi/i.test(name)) return <Wifi size={size} className="shrink-0 text-[#38bdf8]" />

  return <Code2 size={size} className="shrink-0 text-[#c084fc]" />
}

interface NormalProjectModalProps {
  project: FlagshipProject | null
  projectIndex: number
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
}

export function NormalProjectModal({
  project,
  projectIndex,
  onClose,
  onNavigate,
}: NormalProjectModalProps) {
  if (!project) return null

  const languages = projectLanguages(project)
  const toolsAndConcepts = project.stack.filter((item) => !isLanguageTechnology(item))

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="np-project-modal-title"
      className="np-modal-backdrop fixed inset-0 z-50 overflow-y-auto px-3 py-6 sm:px-6 sm:py-10 flex items-start justify-center"
      onClick={onClose}
    >
      <div
        className="np-modal-surface w-full max-w-4xl rounded-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 border-b border-[var(--np-border)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[var(--np-accent-bright)]">
                {project.year} · {project.category}
              </span>
              <span className="font-mono text-[11px] text-[var(--np-muted)]">
                {String(projectIndex + 1).padStart(2, "0")} / {String(ALL_PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
            <h3 id="np-project-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--np-muted)] mt-1">{project.headline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha del proyecto"
            className="np-btn-secondary w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-7 max-h-[70vh] overflow-y-auto">
          {/* Description + Highlights */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base leading-relaxed text-[var(--np-ink-secondary)]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-400/25 text-[var(--np-accent-bright)]"
                >
                  <Sparkles size={12} />
                  <span>{highlight}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Numbered Architecture List */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--np-accent-bright)] mb-3">
              Arquitectura &amp; Decisiones Técnicas
            </h4>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.architecture.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-950/20 dark:bg-purple-950/25 border border-[var(--np-border)]"
                >
                  <span className="font-mono text-xs font-bold text-[var(--np-cyan)] shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed text-[var(--np-ink-secondary)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Full Stack with Clean Vector Icons */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--np-accent-bright)]">
              Stack Tecnológico Completo
            </h4>

            {languages.length > 0 && (
              <div>
                <p className="font-mono text-[11px] text-[var(--np-muted)] mb-2">Lenguajes principales</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-[var(--np-border)] text-xs font-medium"
                    >
                      {renderNormalTechIcon(lang.name, 16, lang.techKey)}
                      <span>{lang.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {toolsAndConcepts.length > 0 && (
              <div>
                <p className="font-mono text-[11px] text-[var(--np-muted)] mb-2">Frameworks, herramientas y protocolos</p>
                <div className="flex flex-wrap gap-2">
                  {toolsAndConcepts.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-[var(--np-border)] text-xs font-medium"
                    >
                      {renderNormalTechIcon(item, 16)}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7 border-t border-[var(--np-border)] bg-black/15">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="np-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium"
            >
              <ChevronLeft size={15} />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="np-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium"
            >
              <span>Siguiente</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.githubIsPrivate ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                title="Requiere acceso al repositorio privado"
                className="np-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium"
              >
                <Lock size={14} className="text-[var(--np-accent-bright)]" />
                <span>Repositorio privado</span>
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="np-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium"
              >
                <VectorGithubIcon size={15} />
                <span>Repositorio GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.demoUnavailable ? (
              <span
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border border-[var(--np-border)] text-[var(--np-muted)]"
                title="El despliegue público no está disponible actualmente"
              >
                Demo temporalmente no disponible
              </span>
            ) : (
              project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="np-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  <span>Probar demo en vivo</span>
                  <ExternalLink size={14} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NormalTimelineModalProps {
  item: TimelineItem | null
  onClose: () => void
}

export function NormalTimelineModal({ item, onClose }: NormalTimelineModalProps) {
  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="np-timeline-modal-title"
      className="np-modal-backdrop fixed inset-0 z-50 overflow-y-auto px-3 py-6 sm:px-6 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="np-modal-surface w-full max-w-3xl rounded-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 border-b border-[var(--np-border)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[var(--np-accent-bright)]">
                {item.badge}
              </span>
              <span className="font-mono text-xs text-[var(--np-cyan)]">{item.period}</span>
            </div>
            <h3 id="np-timeline-modal-title" className="text-lg sm:text-2xl font-bold leading-snug">
              {item.role}
            </h3>
            <p className="text-sm font-mono text-[var(--np-muted)] mt-1">{item.institution}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle de trayectoria"
            className="np-btn-secondary w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="p-4 rounded-xl bg-purple-500/10 border border-[var(--np-border)] space-y-2">
            <p className="text-sm font-semibold text-[var(--np-ink)]">{item.lootSummary}</p>
            <p className="text-xs sm:text-sm text-[var(--np-ink-secondary)] leading-relaxed">{item.description}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--np-accent-bright)] mb-3">
              Bitácora Técnica e Hitos
            </h4>
            <ul className="space-y-2.5">
              {item.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-purple-950/15 border border-[var(--np-border)]"
                >
                  <span className="font-mono text-xs font-bold text-[var(--np-cyan)] shrink-0 mt-0.5">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--np-ink-secondary)] leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--np-accent-bright)] mb-3">
              Tecnologías ({item.techStack.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-[var(--np-border)] text-xs font-medium"
                >
                  {renderNormalTechIcon(tech, 16)}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7 border-t border-[var(--np-border)] bg-black/15">
          {item.links && item.links.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {item.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`${
                    link.kind === "web" ? "np-btn-primary font-semibold" : "np-btn-secondary font-medium"
                  } inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs`}
                >
                  {link.kind === "github" ? <VectorGithubIcon size={15} /> : <ExternalLink size={14} />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          ) : (
            <span className="font-mono text-[11px] text-[var(--np-muted)]">
              Registro informativo de experiencia · Sin repositorio externo
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="np-btn-secondary px-4 py-2 rounded-xl text-xs font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

interface NormalCommandPaletteProps {
  open: boolean
  onClose: () => void
  onCopyEmail: () => void
  copiedEmail: boolean
  onActivateMinecraft: (origin?: { x: number; y: number }) => void
}

export function NormalCommandPalette({
  open,
  onClose,
  onCopyEmail,
  copiedEmail,
  onActivateMinecraft,
}: NormalCommandPaletteProps) {
  const [query, setQuery] = useState("")

  const closeAndReset = () => {
    setQuery("")
    onClose()
  }

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = [{ id: "hero", label: "Inicio & Resumen" }, ...NAV_ITEMS]
    if (!q) return items
    return items.filter((item) => item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q))
  }, [query])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de comandos rápida"
      className="np-modal-backdrop fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={closeAndReset}
    >
      <div
        className="np-modal-surface w-full max-w-lg rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--np-border)]">
          <Search size={17} className="text-[var(--np-accent-bright)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ir a sección, copiar correo, abrir CV o portal..."
            autoFocus
            className="w-full bg-transparent text-sm text-[var(--np-ink)] placeholder:text-[var(--np-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Cerrar paleta de comandos"
            className="np-btn-secondary w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-3 space-y-3 max-h-[65vh] overflow-y-auto">
          <div>
            <p className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--np-muted)]">
              Navegación
            </p>
            <div className="space-y-1">
              {filteredSections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeAndReset}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-purple-500/15 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--np-muted)]">#{item.id}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--np-muted)]">
              Acciones Rápidas
            </p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  onCopyEmail()
                  closeAndReset()
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-purple-500/15 transition-colors text-left"
              >
                <span className="inline-flex items-center gap-2.5">
                  {copiedEmail ? <Check size={15} className="text-[var(--np-emerald)]" /> : <Copy size={15} />}
                  <span>Copiar correo electrónico</span>
                </span>
                <span className="font-mono text-xs text-[var(--np-cyan)]">luvalprojects@gmail.com</span>
              </button>

              <a
                href="/CV_Valdenegro-Luis.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={closeAndReset}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-purple-500/15 transition-colors"
              >
                <span className="inline-flex items-center gap-2.5">
                  <FileText size={15} />
                  <span>Abrir Currículum Vitae (PDF)</span>
                </span>
                <ArrowUpRight size={14} className="text-[var(--np-muted)]" />
              </a>

              <a
                href="mailto:luvalprojects@gmail.com"
                onClick={closeAndReset}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-purple-500/15 transition-colors"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Mail size={15} />
                  <span>Enviar correo directo</span>
                </span>
                <ArrowUpRight size={14} className="text-[var(--np-muted)]" />
              </a>

              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  closeAndReset()
                  onActivateMinecraft({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-purple-500/15 border border-purple-400/30 hover:bg-purple-500/25 transition-colors text-left"
              >
                <span className="inline-flex items-center gap-2.5 font-medium text-[var(--np-accent-bright)]">
                  <PixelCommandBlockIcon size={18} />
                  <span>Ejecutar /world minecraft</span>
                </span>
                <span className="font-mono text-[11px] text-[#3be8e8]">Command Block</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--np-border)] flex items-center justify-between font-mono text-[11px] text-[var(--np-muted)]">
          <span>Presiona ESC para cerrar</span>
          <span>⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  )
}
