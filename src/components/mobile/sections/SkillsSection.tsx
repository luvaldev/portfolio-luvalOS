"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SKILL_GROUPS } from "../../os/Window/windowData"

export function SkillsSection() {
  const [openGroups, setOpenGroups] = useState<string[]>([SKILL_GROUPS[0]?.category ?? ""])
  const [search, setSearch] = useState("")

  const toggle = (cat: string) => {
    setOpenGroups(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filteredGroups = SKILL_GROUPS.map(group => ({
    ...group,
    skills: group.skills.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.projects.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter(g => g.skills.length > 0)

  return (
    <section className="px-5 pt-6 pb-28">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-[var(--color-text-main)] mb-1">Skills</h2>
        <p className="text-[13px] text-[var(--color-text-muted)]">Stack respaldado por proyectos reales</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar tecnología o proyecto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
          style={{
            background: "var(--color-bg-primary)",
            borderColor: "var(--color-border-subtle)",
            color: "var(--color-text-main)",
          }}
        />
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)] text-sm">
          Sin resultados para &quot;{search}&quot;
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGroups.map(group => {
            const isOpen = openGroups.includes(group.category)
            return (
              <div
                key={group.category}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "var(--color-bg-primary)", borderColor: "var(--color-border-subtle)" }}
              >
                {/* Group header (accordion trigger) */}
                <button
                  className="w-full flex items-center justify-between px-4 py-3.5 active:opacity-70 transition-opacity"
                  onClick={() => toggle(group.category)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{group.emoji}</span>
                    <span className="text-[13.5px] font-bold text-[var(--color-text-main)]">
                      {group.category}
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${group.color}20`, color: group.color }}
                    >
                      {group.skills.length}
                    </span>
                  </div>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    className="text-[var(--color-text-muted)]"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </motion.svg>
                </button>

                {/* Skills list */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-4 pb-4 space-y-3"
                        style={{ borderTop: "1px solid var(--color-border-subtle)" }}
                      >
                        {group.skills.map(skill => (
                          <div key={skill.name} className="pt-3">
                            {/* Skill header */}
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{skill.emoji}</span>
                                <span className="font-bold text-[13.5px] text-[var(--color-text-main)]">
                                  {skill.name}
                                </span>
                              </div>
                              <span
                                className="text-[9.5px] font-bold px-2 py-0.5 rounded-full border"
                                style={{
                                  borderColor: `${group.color}33`,
                                  background: `${group.color}11`,
                                  color: group.color,
                                }}
                              >
                                {skill.level}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed mb-2">
                              {skill.desc}
                            </p>

                            {/* Related projects */}
                            {skill.projects.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {skill.projects.map((proj, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] font-semibold px-2 py-1 rounded-lg border"
                                    style={{
                                      background: `${group.color}0D`,
                                      borderColor: `${group.color}22`,
                                      color: group.color,
                                    }}
                                  >
                                    {proj.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
