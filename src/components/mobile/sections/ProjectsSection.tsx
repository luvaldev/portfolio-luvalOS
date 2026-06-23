"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PROJECTS, Project } from "../../os/Window/windowData"

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close on backdrop tap
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={handleBackdrop}
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh]"
          style={{ background: "var(--color-bg-primary)", borderTop: "1px solid var(--color-border-subtle)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: "var(--color-border-medium)" }}/>
          </div>

          <div className="overflow-y-auto px-5 pb-10 pt-3">
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${project.color}22`, border: `1.5px solid ${project.color}44` }}
              >
                {project.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-[var(--color-text-main)] leading-tight mb-1">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        background: "var(--color-os-bar)",
                        border: "1px solid var(--color-border-subtle)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 mb-5">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white active:scale-95 transition-transform"
                  style={{ background: "var(--color-accent)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                  Ver Demo
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-transform border"
                style={{
                  background: "var(--color-os-bg)",
                  borderColor: "var(--color-border-medium)",
                  color: "var(--color-text-main)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                Código
              </a>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Sobre el proyecto
              </h3>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-main)] whitespace-pre-line">
                {project.longDesc || project.desc}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Características
                </h3>
                <div className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border"
                      style={{ background: "var(--color-os-bg)", borderColor: "var(--color-border-subtle)" }}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        {feat.emoji && <span className="text-sm">{feat.emoji}</span>}
                        <span className="text-[13px] font-bold text-[var(--color-text-main)]">{feat.title}</span>
                      </div>
                      <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border"
                      style={{
                        background: "var(--color-os-bar)",
                        borderColor: "var(--color-border-subtle)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ProjectsSection() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = PROJECTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <section className="px-5 pt-6 pb-28">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-[var(--color-text-main)] mb-1">Proyectos</h2>
        <p className="text-[13px] text-[var(--color-text-muted)]">{PROJECTS.length} repositorios · Toca para ver detalles</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar proyecto o tecnología..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
          style={{
            background: "var(--color-bg-primary)",
            borderColor: "var(--color-border-subtle)",
            color: "var(--color-text-main)",
          }}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)] text-sm">
          Sin resultados para &quot;{search}&quot;
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project, i) => (
            <motion.button
              key={project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              onClick={() => setSelected(project)}
              className="w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.98]"
              style={{
                background: "var(--color-bg-primary)",
                borderColor: "var(--color-border-subtle)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${project.color}22`, border: `1.5px solid ${project.color}44` }}
                >
                  {project.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-[14px] text-[var(--color-text-main)] truncate">
                      {project.name}
                    </span>
                    {project.demoUrl && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${project.color}22`, color: project.color }}
                      >
                        DEMO
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                    {project.desc || "Ver repositorio →"}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          background: "var(--color-os-bar)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)] flex-shrink-0 mt-1">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
