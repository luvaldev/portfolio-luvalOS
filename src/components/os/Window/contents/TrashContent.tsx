"use client"
import React, { useState } from "react"
import { TRASH_FILES } from "../windowData"

export function TrashContent() {
  const [selectedFile, setSelectedFile] = useState<typeof TRASH_FILES[0] | null>(null)
  const [emptied, setEmptied] = useState(false)

  if (emptied) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="text-6xl mb-4">🗑️</div>
        <h2 className="text-xl font-black text-[var(--color-text-main)] mb-2">Papelera vacía</h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">La papelera está limpia. Por ahora.</p>
        <button onClick={() => setEmptied(false)} className="px-4 py-2 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-lg text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
          Restaurar archivos
        </button>
      </div>
    )
  }

  if (selectedFile) {
    return (
      <div className="py-2">
        <button onClick={() => setSelectedFile(null)} className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors mb-5 group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform"><polyline points="15 18 9 12 15 6" /></svg>
          Volver a la papelera
        </button>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">{selectedFile.emoji}</span>
          <div>
            <h1 className="text-[15px] font-black text-[var(--color-text-main)]">{selectedFile.name}</h1>
            <span className="text-[11px] text-[var(--color-text-muted)]">{selectedFile.type} · {selectedFile.size} · {selectedFile.date}</span>
          </div>
        </div>
        <div className="bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl p-5">
          <pre className="text-[12.5px] font-mono text-[var(--color-text-main)] whitespace-pre-wrap leading-relaxed">
            {selectedFile.content}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[var(--color-text-main)]">Papelera</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Archivos que no debería guardar pero tampoco puedo borrar</p>
        </div>
        <button
          onClick={() => setEmptied(true)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12.5px] font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
          Vaciar papelera
        </button>
      </div>

      <div className="space-y-2">
        {TRASH_FILES.map(file => (
          <button
            key={file.name}
            onClick={() => setSelectedFile(file)}
            className="w-full text-left flex items-center gap-3 p-3.5 bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl hover:border-[var(--color-border-medium)] hover:bg-[var(--color-hover-bg)] transition-all group"
          >
            <span className="text-2xl flex-shrink-0">{file.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-semibold text-[var(--color-text-main)] truncate">{file.name}</div>
              <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{file.type} · {file.size} · Eliminado: {file.date}</div>
            </div>
            <svg className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center text-[12px] text-[var(--color-text-muted)] opacity-60">
        Los elementos en la papelera se eliminarán definitivamente... nunca.
      </div>
    </div>
  )
}
