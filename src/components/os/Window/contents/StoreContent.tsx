"use client"
import React, { useState } from "react"
import { SERVICES } from "../windowData"

export function StoreContent() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  
  // Calculator state
  const [calcService, setCalcService] = useState<"web" | "security" | "iot" | "mentoring">("web")
  const [dbAddon, setDbAddon] = useState(false)
  const [authAddon, setAuthAddon] = useState(false)
  const [scriptsAddon, setScriptsAddon] = useState(false)
  const [supportAddon, setSupportAddon] = useState(false)
  const [copied, setCopied] = useState(false)

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Calculate times
  const baseTimes = {
    web: 15,
    security: 7,
    iot: 20,
    mentoring: 3
  }

  let totalDays = baseTimes[calcService]
  const selectedTech = ["Git/GitHub", "Linux"]

  if (calcService === "web") {
    selectedTech.push("Next.js", "React", "Tailwind CSS")
    if (dbAddon) { totalDays += 3; selectedTech.push("PostgreSQL", "Prisma ORM") }
    if (authAddon) { totalDays += 2; selectedTech.push("NextAuth.js", "JWT") }
    if (scriptsAddon) { totalDays += 3; selectedTech.push("Python (Scripts)") }
  } else if (calcService === "security") {
    selectedTech.push("Python", "Scapy", "Docker", "Kali Linux")
    if (dbAddon) { selectedTech.push("SQLite") }
    if (scriptsAddon) { totalDays += 2; selectedTech.push("Bash Scripting") }
  } else if (calcService === "iot") {
    selectedTech.push("ESP32", "C/C++", "Arduino IDE")
    if (dbAddon) { totalDays += 3; selectedTech.push("Firebase/Supabase") }
    if (authAddon) { selectedTech.push("OAuth / BLE Security") }
    if (scriptsAddon) { totalDays += 4; selectedTech.push("Flutter / Dart (App)") }
  } else if (calcService === "mentoring") {
    selectedTech.push("C++", "Python", "POO", "Concurrencia")
  }

  const handleGenerateProposal = () => {
    const serviceNames = {
      web: "Desarrollo de Software & Web",
      security: "Auditoría de Seguridad & Hardening",
      iot: "Integración IoT & Sistemas Embebidos",
      mentoring: "Mentoría 1:1 / Asesoría Técnica"
    }

    const proposalText = `Hola Luis,\n\nMe interesa cotizar un proyecto con las siguientes características:\n- Servicio: ${serviceNames[calcService]}\n- Adicionales: ${[
      dbAddon ? "Base de datos relacional" : null,
      authAddon ? "Autenticación segura" : null,
      scriptsAddon ? "Automatización/Scripting" : null,
      supportAddon ? "Soporte Post-Entrega" : null
    ].filter(Boolean).join(", ") || "Ninguno"}\n- Tiempo estimado de entrega: ${totalDays} días\n- Tecnologías sugeridas: ${selectedTech.join(", ")}\n\nQuedo atento a tus comentarios.`

    navigator.clipboard.writeText(proposalText)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)

    const mailtoUrl = `mailto:primary@luvaldev.lat?subject=Cotización de Proyecto - ${serviceNames[calcService]}&body=${encodeURIComponent(proposalText)}`
    window.location.href = mailtoUrl
  }

  const faqs = [
    { q: "¿Cuánto tiempo toma un proyecto típico?", a: "Depende de la complejidad técnica. Un desarrollo web estándar o una auditoría de seguridad puede tomar entre 10 y 15 días hábiles, mientras que proyectos IoT con integración de hardware pueden requerir de 3 a 5 semanas para pruebas y calibración." },
    { q: "¿Cómo se gestiona el proceso de pago?", a: "Habitualmente se divide en un 50% al inicio de los trabajos y el restante 50% tras la entrega y aprobación final. Acepto transferencias bancarias directas, plataformas electrónicas seguras y PayPal para transacciones internacionales." },
    { q: "¿Qué incluye el soporte post-entrega?", a: "Todos mis desarrollos cuentan con 30 días de soporte técnico gratuito para corregir errores de implementación o fallos imprevistos. Ofrezco planes de soporte mensual extendido si requieres actualizaciones continuas." },
    { q: "¿Las tutorías académicas cubren proyectos completos?", a: "En la mentoría 1:1 te guío en el proceso de diseño, estructuración del código y corrección de bugs, cubriendo paradigmas como concurrencia, bases de datos y POO. No realizo entregas por ti, sino que te enseño a resolver los retos por tu cuenta." }
  ]

  return (
    <div className="py-2 space-y-8">
      {/* Intro */}
      <div>
        <h1 className="text-xl font-black text-[var(--color-text-main)] mb-0.5">Servicios & Cotizador</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Asesoría profesional, desarrollo de software a medida y auditorías de seguridad</p>
      </div>

      {/* Main Grid: Services on Left, Calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Services Cards List (Left) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Servicios Disponibles</h2>
          {SERVICES.map(service => {
            const isOpen = selectedService === service.title
            return (
              <div
                key={service.title}
                className="group bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl p-5 hover:border-[var(--color-border-medium)] hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${service.color}15`, border: `1.5px solid ${service.color}33` }}
                  >
                    {service.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-[14px] text-[var(--color-text-main)]">{service.title}</h3>
                    </div>
                    <p className="text-[12.5px] text-[var(--color-text-muted)] leading-relaxed mb-3">{service.desc}</p>
                    
                    {/* Collapsible features list */}
                    {isOpen && (
                      <div className="py-2.5 my-3 border-t border-b border-[var(--color-border-subtle)] space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">¿Qué incluye?</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {service.features.map(f => (
                            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[var(--color-text-main)]">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flex-shrink-0" style={{ color: service.color }}>
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:primary@luvaldev.lat?subject=Interés en servicio: ${service.title}`}
                        className="px-3.5 py-1.5 rounded-lg text-[11.5px] font-bold text-white transition-opacity hover:opacity-90 flex items-center gap-1"
                        style={{ background: service.color }}
                      >
                        Contactar
                      </a>
                      <button
                        className="px-3 py-1.5 rounded-lg text-[11.5px] font-semibold border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                        onClick={() => setSelectedService(isOpen ? null : service.title)}
                      >
                        {isOpen ? "Menos detalles" : "Ver detalles"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dynamic Calculator (Right) */}
        <div className="lg:col-span-5 bg-[var(--color-os-bar)] border border-[var(--color-border-medium)] rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🧮</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-main)]">Cotizador de Proyectos</h2>
            </div>
            <p className="text-[11.5px] text-[var(--color-text-muted)] mb-4 leading-relaxed">Personaliza el alcance técnico de tu proyecto para estimar plazos y requerimientos de desarrollo.</p>
            
            {/* Service selector */}
            <div className="space-y-3 mb-4">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">Tipo de Proyecto</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "web", label: "Software & Web" },
                  { id: "security", label: "Ciberseguridad" },
                  { id: "iot", label: "IoT / Hardware" },
                  { id: "mentoring", label: "Mentoría 1:1" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setCalcService(opt.id as any)
                      // Reset addons
                      setDbAddon(false)
                      setAuthAddon(false)
                      setScriptsAddon(false)
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold text-center border transition-all ${
                      calcService === opt.id
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm"
                        : "bg-[var(--color-os-bg)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Addons (Conditionals) */}
            {calcService !== "mentoring" && (
              <div className="space-y-2 mb-4 border-t border-[var(--color-border-subtle)] pt-3">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Módulos Adicionales</label>
                
                {calcService === "web" && (
                  <>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={dbAddon} onChange={(e) => setDbAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Base de Datos (PostgreSQL/Supabase)</span>
                    </label>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={authAddon} onChange={(e) => setAuthAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Autenticación OAuth2 / NextAuth / JWT</span>
                    </label>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={scriptsAddon} onChange={(e) => setScriptsAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Scripting & Backend de Soporte (Python)</span>
                    </label>
                  </>
                )}

                {calcService === "security" && (
                  <>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={dbAddon} onChange={(e) => setDbAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Base de datos para reportes (SQLite)</span>
                    </label>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={scriptsAddon} onChange={(e) => setScriptsAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Automatización de escaneo (Bash/Python)</span>
                    </label>
                  </>
                )}

                {calcService === "iot" && (
                  <>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={dbAddon} onChange={(e) => setDbAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Sincronización en la Nube (Firebase/Supabase)</span>
                    </label>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={authAddon} onChange={(e) => setAuthAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>Cifrado y Seguridad de Conexión BLE/Wi-Fi</span>
                    </label>
                    <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                      <input type="checkbox" checked={scriptsAddon} onChange={(e) => setScriptsAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                      <span>App Móvil Compañera (Flutter / Dart)</span>
                    </label>
                  </>
                )}
              </div>
            )}

            {/* Support Addon */}
            <div className="space-y-2 mb-4 border-t border-[var(--color-border-subtle)] pt-3">
              <label className="flex items-center gap-2 py-1 px-1.5 hover:bg-[var(--color-os-bg)] rounded cursor-pointer text-xs text-[var(--color-text-main)]">
                <input type="checkbox" checked={supportAddon} onChange={(e) => setSupportAddon(e.target.checked)} className="rounded accent-[var(--color-accent)]" />
                <span className="font-semibold">Soporte y Garantía Extendida (+6 meses)</span>
              </label>
            </div>
          </div>

          {/* Calculator Results */}
          <div className="mt-4 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl p-4 space-y-4">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">Plazo Estimado</span>
              <span className="text-lg font-black text-[var(--color-accent)]">{totalDays} días</span>
            </div>

            {/* Suggested Tech Stack */}
            <div className="text-[11px] border-t border-[var(--color-border-subtle)] pt-2.5">
              <span className="font-bold text-[var(--color-text-muted)] block mb-1">Stack Propuesto:</span>
              <div className="flex flex-wrap gap-1">
                {selectedTech.map(tech => (
                  <span key={tech} className="px-1.5 py-0.5 rounded bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[9.5px] font-semibold text-[var(--color-text-muted)]">{tech}</span>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateProposal}
              className="w-full py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {copied ? "¡Propuesta copiada!" : "Enviar Consulta por Email"}
            </button>
          </div>
        </div>

      </div>

      {/* Accordion FAQ (Bottom) */}
      <div className="border-t border-[var(--color-border-subtle)] pt-6">
        <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Preguntas Frecuentes</h2>
        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isFaqOpen = openFaq === index
            return (
              <div
                key={index}
                className="bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] rounded-lg overflow-hidden transition-all"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-bold text-[13px] text-[var(--color-text-main)] hover:bg-[var(--color-os-bar)] transition-colors"
                  onClick={() => setOpenFaq(isFaqOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`text-[var(--color-text-muted)] transition-transform duration-200 ${isFaqOpen ? "rotate-90" : ""}`}
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
                {isFaqOpen && (
                  <div className="px-4 pb-3.5 text-[12.5px] leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)] pt-2.5 bg-[var(--color-os-bar)]/10 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
