"use client"
import React, { useState } from "react"

// ─── Contact Window ───────────────────────────────────────────────────────────
export function ContactContent() {
  return (
    <div className="max-w-lg mx-auto py-4">
      <h1 className="text-xl font-black text-[var(--color-text-main)] mb-1">Contacto</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">¿Tienes un proyecto en mente? Hablemos.</p>

      <div className="space-y-3 mb-8">
        {[
          { label: "Email", value: "luval@email.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, href: "mailto:luval@email.com" },
          { label: "GitHub", value: "@luvaldev", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, href: "https://github.com/luvaldev" },
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
          <input type="text" placeholder="Tu nombre" className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors"/>
          <input type="email" placeholder="Tu email" className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors"/>
          <textarea rows={4} placeholder="Tu mensaje..." className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] transition-colors resize-none"/>
          <button className="w-full py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-lg text-sm transition-colors">
            Enviar mensaje
          </button>
        </div>
      </div>
    </div>
  )
}
