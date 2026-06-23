"use client"
import { motion } from "framer-motion"

const experience = [
  {
    role: "Promotor de Ventas — Tecnología",
    company: "Hites",
    period: "Jul 2024 — Actualmente",
    desc: "Soporte técnico básico a clientes y asesoramiento especializado en adquisición de equipos tecnológicos.",
    color: "#E8601A",
    emoji: "🏪",
  },
  {
    role: "Ayudante de Programación C++ (Extracurricular)",
    company: "Universidad Diego Portales",
    period: "Mar 2023 — Jul 2023",
    desc: "Apoyo a más de 100 estudiantes en C++: memoria, estructuras de datos y POO. Material práctico y corrección de evaluaciones.",
    color: "#27A3D6",
    emoji: "🎓",
  },
]

const education = [
  {
    degree: "Ingeniería Civil en Informática y Telecomunicaciones",
    school: "Universidad Diego Portales",
    period: "2023 — Cursando",
    emoji: "🏫",
  },
]

const highlights = [
  { emoji: "⚙️", label: "C++ & Concurrencia", sub: "Sistemas robustos, multihilo" },
  { emoji: "🐍", label: "Python & Scapy",      sub: "Redes, forense, automatización" },
  { emoji: "🌐", label: "Next.js & Node.js",   sub: "Web full-stack moderno" },
  { emoji: "🔒", label: "Ciberseguridad",       sub: "MITM, análisis de tráfico" },
  { emoji: "🎛️", label: "IoT / ESP32",          sub: "Hardware embebido, Flutter" },
  { emoji: "🐳", label: "Docker & Linux",        sub: "Entornos contenerizados" },
]

export function ResumeSection() {
  return (
    <section className="px-5 pt-6 pb-28">
      {/* Header + download */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-[var(--color-text-main)]">CV</h2>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">Experiencia y educación</p>
        </div>
        <a
          href="/CV_Valdenegro-Luis.pdf"
          download
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white active:scale-95 transition-transform"
          style={{ background: "var(--color-accent)", boxShadow: "0 3px 0 var(--color-accent-hover)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          PDF
        </a>
      </div>

      {/* Experience */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            Experiencia
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--color-border-subtle)" }}/>
        </div>

        <div className="relative pl-5 border-l-2 space-y-5" style={{ borderColor: "var(--color-border-subtle)" }}>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[25px] w-3 h-3 rounded-full border-2"
                style={{ background: exp.color, borderColor: "var(--color-bg-primary)" }}
              />
              <div
                className="p-4 rounded-2xl border"
                style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{exp.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[13.5px] text-[var(--color-text-main)] leading-snug mb-0.5">
                      {exp.role}
                    </h3>
                    <span className="text-[12px] font-semibold" style={{ color: exp.color }}>
                      {exp.company}
                    </span>
                    <div className="text-[10.5px] text-[var(--color-text-muted)] font-mono mt-0.5 mb-2">
                      {exp.period}
                    </div>
                    <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            Educación
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--color-border-subtle)" }}/>
        </div>
        {education.map((edu, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border flex items-start gap-3"
            style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
          >
            <span className="text-xl">{edu.emoji}</span>
            <div>
              <h3 className="font-bold text-[13.5px] text-[var(--color-text-main)] leading-snug mb-0.5">
                {edu.degree}
              </h3>
              <p className="text-[12px] text-[var(--color-text-muted)]">{edu.school}</p>
              <p className="text-[10.5px] font-mono text-[var(--color-text-muted)] mt-0.5">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            Competencias clave
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--color-border-subtle)" }}/>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {highlights.map(h => (
            <div
              key={h.label}
              className="p-3 rounded-xl border flex items-center gap-2.5"
              style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
            >
              <span className="text-xl">{h.emoji}</span>
              <div>
                <div className="text-[12px] font-bold text-[var(--color-text-main)]">{h.label}</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">{h.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
