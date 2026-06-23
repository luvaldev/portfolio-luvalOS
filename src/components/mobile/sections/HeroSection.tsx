"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import type { Easing } from "framer-motion"
const EASE: Easing = "easeOut"
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE, delay },
})

export function HeroSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/luvaldev",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/luis-valdenegro-mondaca-1b28b3334/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:primary@luvaldev.lat",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
    },
  ]

  const stats = [
    { v: "12+", l: "Proyectos", color: "#F9BD2B" },
    { v: "3+",  l: "Años",      color: "#60A5FA" },
    { v: "15+", l: "Tecnologías", color: "#F87171" },
  ]

  return (
    <section className="px-5 pt-10 pb-28">
      {/* Avatar + theme toggle row */}
      <div className="flex items-start justify-between mb-7">
        <motion.div {...fadeUp(0)}>
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl"
            style={{ background: "linear-gradient(135deg, #F9BD2B 0%, #E8601A 50%, #DC4228 100%)" }}
          >
            L
          </div>
        </motion.div>

        {mounted && (
          <motion.button
            {...fadeUp(0)}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors"
            style={{ background: "var(--color-hover-bg)" }}
          >
            {theme === "dark" ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </motion.button>
        )}
      </div>

      {/* Name & title */}
      <motion.div {...fadeUp(0.05)} className="mb-5">
        <h1 className="text-3xl font-black text-[var(--color-text-main)] leading-tight mb-1">
          Hola, soy Luval 👋
        </h1>
        <p className="text-[var(--color-accent)] font-bold text-[15px]">
          Networks, Software &amp; Web Developer
        </p>
        <p className="text-[13.5px] text-[var(--color-text-muted)] mt-2 leading-relaxed">
          Estudiante de Ing. en Informática y Telecomunicaciones en UDP. Apasionado por redes, ciberseguridad, desarrollo web y hardware embebido.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-3 gap-2.5 mb-6">
        {stats.map(s => (
          <div
            key={s.l}
            className="rounded-xl p-3 text-center border"
            style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
          >
            <div className="text-xl font-black mb-0.5" style={{ color: s.color }}>{s.v}</div>
            <div className="text-[11px] text-[var(--color-text-muted)] font-semibold">{s.l}</div>
          </div>
        ))}
      </motion.div>

      {/* Status pill */}
      <motion.div {...fadeUp(0.12)} className="mb-6">
        <span
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full border"
          style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)", color: "var(--color-text-muted)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          Disponible para proyectos
        </span>
      </motion.div>

      {/* Action buttons */}
      <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-7">
        <a
          href="/CV_Valdenegro-Luis.pdf"
          download
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
          style={{ background: "var(--color-accent)", boxShadow: "0 4px 0 var(--color-accent-hover)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Descargar CV
        </a>
        <a
          href="mailto:primary@luvaldev.lat"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 border"
          style={{
            background: "var(--color-bg-primary)",
            borderColor: "var(--color-border-medium)",
            color: "var(--color-text-main)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Contactar
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div {...fadeUp(0.18)} className="flex gap-3">
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-all active:scale-95"
            style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
          >
            {s.icon}
            <span className="text-[10px] font-semibold">{s.label}</span>
          </a>
        ))}
      </motion.div>
    </section>
  )
}
