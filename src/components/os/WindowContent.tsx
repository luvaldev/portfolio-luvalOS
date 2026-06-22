// Window content components for luvalOS
// Each one maps to a dock/desktop icon id

import React from "react"

// ─── README / About Window ────────────────────────────────────────────────────
export function ReadmeContent() {
  return (
    <article className="max-w-2xl mx-auto py-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F9BD2B] to-[#E8601A] flex items-center justify-center text-white text-2xl font-black shadow-lg">
          L
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text-main)] leading-tight">Hola, soy Luval 👋</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-0.5">Full Stack Developer & UI Engineer</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-[15px] leading-relaxed text-[var(--color-text-main)] mb-4">
          Soy un desarrollador apasionado por crear experiencias digitales memorables. 
          Me especializo en <strong>interfaces modernas</strong>, arquitecturas sólidas y 
          código limpio que escala.
        </p>
        <p className="text-[15px] leading-relaxed text-[var(--color-text-main)] mb-6">
          Este portfolio está construido como un <strong>OS interactivo</strong> porque creo 
          que la experiencia de usuario debe ser tan memorable como el trabajo que muestra.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Proyectos", value: "12+", color: "#F9BD2B" },
          { label: "Años exp.", value: "3+", color: "#27A3D6" },
          { label: "Tech stack", value: "15+", color: "#DC4228" },
        ].map(stat => (
          <div key={stat.label} className="bg-[var(--color-os-bg)] rounded-xl p-4 text-center border border-[var(--color-border-subtle)]">
            <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[var(--color-text-muted)] font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-border-subtle)] pt-5">
        <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Actualmente</h2>
        <ul className="space-y-2">
          {[
            "🚀 Construyendo productos con Next.js + TypeScript",
            "🎨 Explorando design systems y micro-interacciones",
            "📚 Aprendiendo sobre arquitecturas distribuidas",
          ].map(item => (
            <li key={item} className="text-[14px] text-[var(--color-text-main)] flex items-start gap-2">
              <span className="text-lg leading-none">{item.slice(0, 2)}</span>
              <span className="leading-relaxed">{item.slice(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

// ─── Projects Window ──────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: "luvalOS",
    desc: "Portfolio interactivo estilo sistema operativo, inspirado en PostHog.",
    tags: ["Next.js", "TypeScript", "Zustand", "Framer Motion"],
    color: "#F9BD2B",
    emoji: "🖥️",
    link: "#"
  },
  {
    name: "E-Commerce Platform",
    desc: "Plataforma de comercio electrónico con carrito, pagos y dashboard de administración.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    color: "#27A3D6",
    emoji: "🛒",
    link: "#"
  },
  {
    name: "Design System",
    desc: "Sistema de componentes reutilizables con Storybook y tokens de diseño.",
    tags: ["React", "CSS", "Storybook", "Figma"],
    color: "#DC4228",
    emoji: "🎨",
    link: "#"
  },
  {
    name: "CLI Tool",
    desc: "Herramienta de línea de comandos para scaffolding de proyectos.",
    tags: ["Node.js", "Commander.js", "Shell"],
    color: "#28c840",
    emoji: "⚡",
    link: "#"
  },
]

export function ProjectsContent() {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[var(--color-text-main)]">Proyectos</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Trabajo seleccionado</p>
        </div>
        <span className="text-xs font-semibold bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-3 py-1 rounded-full text-[var(--color-text-muted)]">
          {PROJECTS.length} proyectos
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map(project => (
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
                  <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Skills Window ────────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "#27A3D6",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "CSS / Tailwind", level: 90 },
      { name: "Framer Motion", level: 78 },
    ]
  },
  {
    category: "Backend",
    color: "#28c840",
    skills: [
      { name: "Node.js / Express", level: 82 },
      { name: "PostgreSQL", level: 76 },
      { name: "REST APIs", level: 88 },
      { name: "GraphQL", level: 65 },
    ]
  },
  {
    category: "Herramientas",
    color: "#F9BD2B",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Figma", level: 80 },
      { name: "Linux CLI", level: 75 },
    ]
  },
]

export function SkillsContent() {
  return (
    <div className="py-2">
      <h1 className="text-xl font-black text-[var(--color-text-main)] mb-1">Skills</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">Stack tecnológico y nivel de dominio</p>
      
      <div className="space-y-8">
        {SKILL_GROUPS.map(group => (
          <div key={group.category}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: group.color }}/>
              <h2 className="text-sm font-bold text-[var(--color-text-main)] uppercase tracking-wider">{group.category}</h2>
            </div>
            <div className="space-y-3">
              {group.skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[13px] font-semibold text-[var(--color-text-main)]">{skill.name}</span>
                    <span className="text-[12px] text-[var(--color-text-muted)] font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-os-bg)] rounded-full overflow-hidden border border-[var(--color-border-subtle)]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%`, background: group.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Contact Window ───────────────────────────────────────────────────────────
export function ContactContent() {
  return (
    <div className="max-w-lg mx-auto py-4">
      <h1 className="text-xl font-black text-[var(--color-text-main)] mb-1">Contacto</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">¿Tienes un proyecto en mente? Hablemos.</p>

      <div className="space-y-3 mb-8">
        {[
          { label: "Email", value: "luval@email.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, href: "mailto:luval@email.com" },
          { label: "GitHub", value: "@luvaldev", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, href: "https://github.com" },
          { label: "LinkedIn", value: "Luval Dev", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "https://linkedin.com" },
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl hover:border-[var(--color-border-medium)] hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-os-bar)] rounded-lg border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors">
              {link.icon}
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">{link.label}</div>
              <div className="text-sm font-semibold text-[var(--color-text-main)]">{link.value}</div>
            </div>
            <svg className="ml-auto text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ))}
      </div>

      <div className="border border-[var(--color-border-subtle)] rounded-xl p-5 bg-[var(--color-os-bg)]">
        <h2 className="text-sm font-bold text-[var(--color-text-main)] mb-4">Enviar mensaje</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors"
          />
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors"
          />
          <textarea
            rows={4}
            placeholder="Tu mensaje..."
            className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors resize-none"
          />
          <button className="w-full py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-lg text-sm transition-colors">
            Enviar mensaje
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Resume Window ────────────────────────────────────────────────────────────
export function ResumeContent() {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[var(--color-text-main)]">Curriculum Vitae</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Historial profesional y educación</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Descargar CV
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[var(--color-border-medium)] block"/>
            Experiencia
            <span className="flex-1 h-[1px] bg-[var(--color-border-subtle)] block"/>
          </h2>
          {[
            { role: "Full Stack Developer", co: "Startup SAS", period: "2023 — Presente", desc: "Desarrollo de aplicaciones web con Next.js, APIs REST y bases de datos PostgreSQL." },
            { role: "Frontend Developer", co: "Freelance", period: "2021 — 2023", desc: "Creación de interfaces y landing pages para clientes de múltiples industrias." },
          ].map(exp => (
            <div key={exp.role} className="mb-4 pl-4 border-l-2 border-[var(--color-border-subtle)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)] text-[14px]">{exp.role}</h3>
                  <span className="text-[12px] font-semibold text-[var(--color-accent)]">{exp.co}</span>
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-[13px] text-[var(--color-text-muted)] mt-1.5 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[var(--color-border-medium)] block"/>
            Educación
            <span className="flex-1 h-[1px] bg-[var(--color-border-subtle)] block"/>
          </h2>
          {[
            { degree: "Ingeniería en Sistemas", school: "Universidad XYZ", period: "2018 — 2023" },
            { degree: "Diseño UX/UI", school: "Platzi / Self-taught", period: "2021" },
          ].map(edu => (
            <div key={edu.degree} className="mb-3 pl-4 border-l-2 border-[var(--color-border-subtle)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)] text-[14px]">{edu.degree}</h3>
                  <span className="text-[12px] text-[var(--color-text-muted)]">{edu.school}</span>
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono whitespace-nowrap">{edu.period}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
