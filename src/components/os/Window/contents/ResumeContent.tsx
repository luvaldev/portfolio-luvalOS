"use client"
import React, { useState } from "react"

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
            { role: "Promotor de Ventas (Especializado en Tecnología)", co: "Hites", period: "Julio 2024 — Actualmente", desc: "Brindo soporte técnico básico a clientes y asesoramiento especializado en la adquisición de equipos tecnológicos." },
            { role: "Ayudante de Programación C++ (Apoyo Extracurricular)", co: "Universidad Diego Portales", period: "Marzo 2023 — Julio 2023", desc: "Apoyo extracurricular a más de 100 estudiantes en C++, abarcando programación estructurada, gestión manual de memoria, estructuras de datos y paradigma POO. Elaboración de material práctico y corrección de evaluaciones." },
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
            { degree: "Ingeniería Civil en Informática y Telecomunicaciones", school: "Universidad Diego Portales", period: "2023 — Cursando" },
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
