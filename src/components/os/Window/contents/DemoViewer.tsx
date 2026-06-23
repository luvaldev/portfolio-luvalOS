"use client"
import React, { useState } from "react"

export function DemoViewer({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-primary)] z-10">
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">Cargando demo...</p>
        </div>
      )}
      
      {hasError ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[var(--color-bg-primary)]">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-2">No se pudo cargar la demo</h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm mb-6">
            El sitio {url} puede tener bloqueada la visualización en Iframes (X-Frame-Options) o no se encuentra disponible.
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold rounded-lg transition-colors shadow-sm inline-flex items-center gap-2">
            Abrir en nueva pestaña
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      ) : (
        <iframe
          src={url}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </div>
  )
}
