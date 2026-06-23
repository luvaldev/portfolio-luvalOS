"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const LINKS = [
  {
    label: "Email",
    value: "primary@luvaldev.lat",
    href: "mailto:primary@luvaldev.lat",
    color: "#E8601A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "@luvaldev",
    href: "https://github.com/luvaldev",
    color: "#6366F1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Luis Valdenegro Mondaca",
    href: "https://www.linkedin.com/in/luis-valdenegro-mondaca-1b28b3334/",
    color: "#0A66C2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mailto fallback
    const subject = encodeURIComponent(`Contacto desde Portfolio - ${form.name}`)
    const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:primary@luvaldev.lat?subject=${subject}&body=${body}`, "_blank")
    setSent(true)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section className="px-5 pt-6 pb-28">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[var(--color-text-main)] mb-1">Contacto</h2>
        <p className="text-[13px] text-[var(--color-text-muted)]">¿Tienes un proyecto en mente? Hablemos.</p>
      </div>

      {/* Social links */}
      <div className="space-y-2.5 mb-7">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98]"
            style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${link.color}18` }}
            >
              <span style={{ color: link.color }}>{link.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-[var(--color-text-muted)] font-semibold mb-0.5">
                {link.label}
              </div>
              <div className="text-[14px] font-bold text-[var(--color-text-main)] truncate">
                {link.value}
              </div>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className="text-[var(--color-text-muted)] flex-shrink-0"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </motion.a>
        ))}
      </div>

      {/* Message form */}
      <div
        className="rounded-2xl border p-5"
        style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
      >
        <h3 className="font-bold text-[15px] text-[var(--color-text-main)] mb-4">
          Enviar mensaje
        </h3>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-[var(--color-text-main)]">¡Mensaje enviado!</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Te responderé lo antes posible.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm font-semibold underline"
              style={{ color: "var(--color-accent)" }}
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { field: "name",    label: "Nombre",   type: "text",  placeholder: "Tu nombre" },
              { field: "email",   label: "Email",    type: "email", placeholder: "tu@email.com" },
            ].map(({ field, label, type, placeholder }) => (
              <div key={field}>
                <label className="block text-[11px] font-semibold text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  required
                  type={type}
                  placeholder={placeholder}
                  value={form[field as "name" | "email"]}
                  onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors"
                  style={{
                    background: "var(--color-os-bg)",
                    borderColor: "var(--color-border-subtle)",
                    color: "var(--color-text-main)",
                  }}
                />
              </div>
            ))}

            <div>
              <label className="block text-[11px] font-semibold text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
                Mensaje
              </label>
              <textarea
                required
                rows={4}
                placeholder="¿En qué puedo ayudarte?"
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors resize-none"
                style={{
                  background: "var(--color-os-bg)",
                  borderColor: "var(--color-border-subtle)",
                  color: "var(--color-text-main)",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: "var(--color-accent)", boxShadow: "0 3px 0 var(--color-accent-hover)" }}
            >
              Enviar mensaje →
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-[11px] text-[var(--color-text-muted)]">
          luvalOS · Portfolio interactivo
        </p>
        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 opacity-60">
          Mejor experiencia en escritorio
        </p>
      </div>
    </section>
  )
}
