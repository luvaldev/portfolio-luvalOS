"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Image from "next/image"

const SECTIONS = [
  {
    id: "about",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.75"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    title: "Hola, soy Luval 👋",
    text: "Enfocado en Redes, Desarrollo de Software & Web. Apasionado por la programación, la infraestructura y la ciberseguridad. Este portfolio funciona como un OS interactivo.",
    color: "#A78BFA",
  },
  {
    id: "projects",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.75"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    title: "Proyectos",
    text: "12+ proyectos construidos con Next.js, C++, Python, Flutter y más. Desde simulaciones concurrentes hasta sistemas IoT.",
    color: "#FBBF24",
  },
  {
    id: "skills",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.75"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: "Skills",
    text: "C++, Python, Java, SQL, Dart, Node.js, Docker, Linux, redes TCP/IP y ciberseguridad.",
    color: "#60A5FA",
  },
  {
    id: "contact",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.75"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    title: "Contacto",
    text: "¿Tienes una consulta o propuesta? Escríbeme a primary@luvaldev.lat o búscame en GitHub y LinkedIn.",
    color: "#F87171",
  },
]

export default function MobileView() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-os-bg)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{
          background: "var(--color-os-bar)",
          borderColor: "var(--color-border-subtle)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image src="/logo.svg" alt="luvalOS" fill className="object-contain" />
          </div>
          <span className="font-black text-[15px] tracking-tight text-[var(--color-text-main)]">luvalOS</span>
        </div>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-text-muted)]"
            style={{ background: "var(--color-hover-bg)" }}
          >
            {theme === "dark"
              ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        )}
      </header>

      {/* Hero */}
      <div className="px-5 pt-10 pb-6 text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-lg"
          style={{ background: "linear-gradient(135deg, #F9BD2B, #E8601A)" }}>
          L
        </div>
        <h1 className="text-2xl font-black text-[var(--color-text-main)] mb-2">Hola, soy Luval</h1>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
          Enfocado en Redes, Desarrollo de Software & Web. Este portfolio es un OS interactivo — mejor en escritorio.
        </p>
        <button
          className="mt-5 px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md"
          style={{ background: "var(--color-accent)", boxShadow: "0 3px 0 var(--color-accent-hover)" }}
        >
          Descargar CV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-5 mb-6">
        {[
          { v: "12+", l: "Proyectos", c: "#F9BD2B" },
          { v: "3+", l: "Años", c: "#60A5FA" },
          { v: "15+", l: "Tecnologías", c: "#F87171" },
        ].map(s => (
          <div key={s.l} className="rounded-xl p-3 text-center border" style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}>
            <div className="text-xl font-black mb-0.5" style={{ color: s.c }}>{s.v}</div>
            <div className="text-[11px] text-[var(--color-text-muted)] font-semibold">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <div className="px-5 flex flex-col gap-4 pb-10">
        {SECTIONS.map(s => (
          <div key={s.id} className="rounded-2xl p-5 border transition-shadow hover:shadow-md"
            style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                style={{ background: `${s.color}15`, borderColor: `${s.color}30` }}>
                {s.icon}
              </div>
              <div>
                <h2 className="font-bold text-[15px] text-[var(--color-text-main)] mb-1">{s.title}</h2>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="px-5 pb-8 text-center text-[11px] text-[var(--color-text-muted)]">
        <p>luvalOS · Portfolio interactivo</p>
        <p className="mt-1">Para la experiencia completa, visita desde escritorio.</p>
      </footer>
    </div>
  )
}
