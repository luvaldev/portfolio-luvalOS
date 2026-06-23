"use client"
import React, { useState } from "react"
import { SKILL_GROUPS } from "../windowData"

export function SkillsContent() {
  const [search, setSearch] = useState("")

  const filteredGroups = SKILL_GROUPS.map(group => {
    const filteredSkills = group.skills.filter(skill => {
      const matchName = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchDesc = skill.desc.toLowerCase().includes(search.toLowerCase());
      const matchProjects = skill.projects.some(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));
      return matchName || matchDesc || matchProjects;
    });
    return { ...group, skills: filteredSkills };
  }).filter(group => group.skills.length > 0);

  return (
    <div className="py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black text-[var(--color-text-main)] mb-1">Skills & Tecnologías</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Stack tecnológico respaldado por proyectos reales</p>
        </div>
        
        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Buscar por tecnología o proyecto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:outline-none rounded-lg text-sm text-[var(--color-text-main)] transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 text-[var(--color-text-muted)]"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {/* Main Groups */}
      <div className="space-y-8">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-muted)] text-sm">
            No se encontraron tecnologías o proyectos con tu búsqueda.
          </div>
        ) : (
          filteredGroups.map(group => (
            <div key={group.category} className="space-y-4">
              {/* Group Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-lg">{group.emoji}</span>
                <h2 className="text-sm font-bold text-[var(--color-text-main)] uppercase tracking-wider">{group.category}</h2>
                <div className="h-0.5 flex-1 ml-2 rounded-full" style={{ background: `${group.color}44` }} />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.skills.map(skill => (
                  <div
                    key={skill.name}
                    className="p-4 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] hover:shadow-sm rounded-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{skill.emoji}</span>
                          <h3 className="font-bold text-[14px] text-[var(--color-text-main)]">{skill.name}</h3>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: `${group.color}33`,
                            background: `${group.color}11`,
                            color: group.color
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[12.5px] leading-relaxed text-[var(--color-text-muted)] mb-3">
                        {skill.desc}
                      </p>
                    </div>

                    {/* Applied Projects */}
                    {skill.projects && skill.projects.length > 0 && (
                      <div className="pt-2 border-t border-[var(--color-border-subtle)] mt-2">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1.5">
                          Proyectos Relacionados:
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {skill.projects.map((proj, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded bg-[var(--color-os-bar)] border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-main)] flex flex-col"
                            >
                              <span className="font-bold text-[11px]">{proj.name}</span>
                              <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 leading-normal">{proj.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
