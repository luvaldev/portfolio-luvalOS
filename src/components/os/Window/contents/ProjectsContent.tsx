"use client"
import React, { useState } from "react"
import { PROJECTS, Project } from "../windowData"
import { useOSStore } from "@/store/useOSStore"
import { DemoViewer } from "./DemoViewer"

function ProjectDetail({ project, onClose, onOpenDemo }: { project: Project; onClose: () => void; onOpenDemo: (url: string) => void }) {
  return (
    <article className="py-2">
      <button onClick={onClose} className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors mb-5 group">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform"><polyline points="15 18 9 12 15 6"/></svg>
        Volver a proyectos
      </button>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm" style={{ background: `${project.color}22`, border: `1.5px solid ${project.color}44` }}>
          {project.emoji}
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text-main)] mb-1">{project.name}</h1>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        {project.demoUrl && (
          <button 
            onClick={() => onOpenDemo(project.demoUrl!)} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            Ver Demo en vivo
          </button>
        )}
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-os-bg)] hover:bg-[var(--color-border-subtle)] border border-[var(--color-border-medium)] text-[var(--color-text-main)] text-sm font-bold rounded-lg transition-colors shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Ver Código Fuente
        </a>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Sobre el Proyecto</h2>
          <p className="text-[14.5px] leading-relaxed text-[var(--color-text-main)] whitespace-pre-line">
            {project.longDesc || project.desc}
          </p>
        </div>

        {project.features && project.features.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Características Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="p-3 bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {feat.emoji && <span className="text-sm">{feat.emoji}</span>}
                    <h3 className="text-[13px] font-bold text-[var(--color-text-main)]">{feat.title}</h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[var(--color-text-muted)]">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.stack && project.stack.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Stack Tecnológico</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech, idx) => (
                <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}


export function ProjectsContent() {
  const openWindow = useOSStore(state => state.openWindow)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", label: "Todos" },
    { id: "webapps", label: "Web Apps" },
    { id: "cybersec", label: "Forensics & Sec" },
    { id: "academic", label: "Académicos" },
    { id: "tools", label: "Herramientas" },
    { id: "others", label: "Otros" },
  ]

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  if (selectedProject) {
    return <ProjectDetail 
      project={selectedProject} 
      onClose={() => setSelectedProject(null)} 
      onOpenDemo={(url) => {
        openWindow(`demo-${selectedProject.name}`, {
          title: `Demo - ${selectedProject.name}`,
          icon: "🌐",
          width: 1024,
          height: 700,
          content: <DemoViewer url={url} />
        })
      }} 
    />
  }

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black text-[var(--color-text-main)]">Proyectos</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Trabajo seleccionado</p>
        </div>
        <span className="text-xs font-semibold bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-3 py-1 rounded-full text-[var(--color-text-muted)]">
          {filtered.length} proyectos
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              filter === cat.id
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(project => (
          <div
            key={project.name}
            className="group bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl p-5 hover:border-[var(--color-border-medium)] hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                style={{ background: `${project.color}22`, border: `1.5px solid ${project.color}44` }}
              >
                {project.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[var(--color-text-main)] text-[15px]">{project.name}</h3>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-[12.5px] font-bold transition-colors hover:opacity-80"
                  style={{ color: project.color }}
                >
                  Ver más
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
