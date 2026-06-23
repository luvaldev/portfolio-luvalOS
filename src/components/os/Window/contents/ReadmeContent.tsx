"use client"
import React, { useState } from "react"

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
          <p className="text-[var(--color-text-muted)] text-sm mt-0.5">Enfocado en Redes, Desarrollo de Software & Web</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-[15px] leading-relaxed text-[var(--color-text-main)] mb-4">
          Soy un estudiante de Ingeniería Civil en Informática y Telecomunicaciones apasionado por la programación, las redes y la ciberseguridad. Me especializo en <strong>desarrollo de software y web</strong>, <strong>sistemas concurrentes</strong> e <strong>infraestructura de red</strong>.
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
          { label: "Tech stack", value: "20+", color: "#DC4228" },
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
            "🚀 Desarrollando soluciones de software, web e IoT",
            "🔐 Explorando análisis forense de redes y ciberseguridad",
            "📡 Estudiando Ingeniería Civil en Informática y Telecomunicaciones",
            "🐧 Usando Arch Linux como entorno principal de desarrollo",
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
