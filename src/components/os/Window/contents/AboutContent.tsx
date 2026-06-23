"use client"
import React, { useState } from "react"

// ─── About Window ─────────────────────────────────────────────────────────────
export function AboutContent() {
  const timeline = [
    { year: "2023", title: "Ingeniería Informática y Telecom.", desc: "Comencé mis estudios de Ingeniería Civil en Informática y Telecomunicaciones en la Universidad Diego Portales." },
    { year: "2023", title: "Ayudante de Programación C++", desc: "Apoyo extracurricular en UDP a más de 100 estudiantes en C++, cubriendo memoria, estructuras de datos y POO." },
    { year: "2024", title: "Promotor de Ventas (Hites)", desc: "Soporte técnico básico y atención al cliente, especializado en tecnología." },
    { year: "2024", title: "Proyectos Full-Stack y Redes", desc: "Desarrollo de Casino Management Platform (Node.js/PostgreSQL) y Análisis de Tráfico HTTP (Python/Scapy) para interceptación MITM con Docker." },
    { year: "2025", title: "IoT & Sistemas Concurrentes", desc: "Desarrollo de Cercasco (prototipo de seguridad vial con ESP32-CAM y Flutter) y simulaciones multihilo en C++11." },
  ]

  const techFavorites = [
    { name: "C++", emoji: "⚙️", desc: "Concurrencia/POO" },
    { name: "Python", emoji: "🐍", desc: "Redes/Scapy" },
    { name: "Node.js", emoji: "🟢", desc: "Backend (Express)" },
    { name: "PostgreSQL", emoji: "🐘", desc: "Bases de Datos" },
    { name: "IoT/ESP32", emoji: "🎛️", desc: "Hardware embebido" },
    { name: "Docker", emoji: "🐳", desc: "Orquestación" },
  ]

  return (
    <article className="max-w-2xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F9BD2B] via-[#E8601A] to-[#DC4228] flex items-center justify-center text-white text-3xl font-black shadow-xl flex-shrink-0">
          L
        </div>
        <div>
          <h1 className="text-3xl font-black text-[var(--color-text-main)] leading-tight">Luval</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Enfocado en Redes, Desarrollo de Software & Web · Ciberseguridad · IoT</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-2 py-0.5 rounded-full text-[var(--color-text-muted)]">🌍 Disponible para proyectos</span>
          </div>
        </div>
      </div>
 
      {/* Bio */}
      <div className="bg-[var(--color-os-bg)] rounded-xl p-5 mb-6 border border-[var(--color-border-subtle)]">
        <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Sobre mí</h2>
        <p className="text-[14.5px] leading-relaxed text-[var(--color-text-main)] mb-3">
          Soy estudiante de Ingeniería Civil en Informática y Telecomunicaciones en la Universidad Diego Portales (UDP). Apasionado por la programación, las redes y la ciberseguridad, me enfoco en el desarrollo de software estructurado, aplicaciones web modernas, la resolución de problemas y la innovación tecnológica.
        </p>
        <p className="text-[14.5px] leading-relaxed text-[var(--color-text-main)]">
          Me especializo en lenguajes como C++ y Python, abarcando desde programación concurrente (hilos y sincronización) hasta análisis forense de tráfico de red y automatización. Además, tengo un gran interés por el desarrollo web moderno, la ciberseguridad, el trasteo con hardware embebido (IoT con ESP32/Arduino) y la administración de redes en entornos Linux.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Trayectoria</h2>
        <div className="relative pl-6 border-l-2 border-[var(--color-border-subtle)] space-y-5">
          {timeline.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[29px] w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-bg-primary)]"/>
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono font-bold text-[var(--color-accent)] bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-[13.5px] font-bold text-[var(--color-text-main)]">{item.title}</h3>
                  <p className="text-[12.5px] text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite tech */}
      <div>
        <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Tecnologías favoritas</h2>
        <div className="grid grid-cols-3 gap-2">
          {techFavorites.map(t => (
            <div key={t.name} className="flex items-center gap-2.5 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-lg p-3 hover:border-[var(--color-border-medium)] transition-colors">
              <span className="text-xl">{t.emoji}</span>
              <div>
                <div className="text-[12.5px] font-bold text-[var(--color-text-main)]">{t.name}</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
