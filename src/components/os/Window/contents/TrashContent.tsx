"use client"

import React, { useState } from "react"
import { PixelTntBlockIcon } from "@/components/icons/PixelIcons"

interface TrashItem {
  name: string
  type: string
  size: string
  date: string
  badge: string
  content: string
}

const MC_TRASH_FILES: TrashItem[] = [
  {
    name: "mundo_hardcore_perdido_en_lava.sav",
    type: "SAV",
    size: "184 MB",
    date: "Hace 3 días",
    badge: "NETHER",
    content:
      "[CRASH LOG · DAY 412]\nJugador: luvaldev\nCausa: Minar directamente hacia abajo en capa Y=11 con inventario lleno de diamantes.\nRecuperación recomendada: nunca minar hacia abajo.",
  },
  {
    name: "contraseñas_no_abrir.txt",
    type: "TXT",
    size: "12 KB",
    date: "Ayer",
    badge: "SECRETO",
    content: "123456\nadmin\npassword\niloveyou\n\n(Es broma, usa un gestor de contraseñas y llaves SSH)",
  },
  {
    name: "proyecto_final_final_v4_ahorasi.zip",
    type: "ZIP",
    size: "450 MB",
    date: "Hace 2 meses",
    badge: "BACKUP",
    content: "Error: El archivo está corrupto porque no usaste Git.\nMoraleja: Haz commits atómicos y ramas limpias.",
  },
  {
    name: "historial_navegacion.log",
    type: "LOG",
    size: "2.1 GB",
    date: "Hace 1 año",
    badge: "LOGS",
    content:
      "[23:01] ¿Cómo centrar un div?\n[23:05] Centrar un div flexbox\n[23:10] Centrar div CSS 2026\n[23:15] Por qué mi div no se centra\n[23:30] Cómo hacer una granja automática de hierro en Minecraft",
  },
]

export function TrashContent() {
  const [selectedFile, setSelectedFile] = useState<TrashItem | null>(null)
  const [emptied, setEmptied] = useState(false)

  if (emptied) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16 px-4 text-[#f3edff]">
        <div className="w-16 h-16 mb-4 grid place-items-center bg-[#231938] border-3 border-[#0c0817] shadow-[3px_3px_0_#07040d]">
          <PixelTntBlockIcon size={36} />
        </div>
        <h2 className="mc-pixel-font text-xl font-bold text-[#ffffff] mb-2">PAPELERA VACÍA</h2>
        <p className="text-[#c5bad9] text-sm mb-6">
          Los bloques fueron incinerados en lava. Por ahora.
        </p>
        <button
          onClick={() => setEmptied(false)}
          className="px-4 py-2 bg-[#231938] border-2 border-[#6b46c1] text-xs mc-pixel-font font-bold text-[#ffe694] hover:bg-[#312250] transition-colors cursor-pointer"
        >
          RESTAURAR ARCHIVOS DE LA LAVA
        </button>
      </div>
    )
  }

  if (selectedFile) {
    return (
      <div className="p-2 text-[#f3edff]">
        <button
          onClick={() => setSelectedFile(null)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs mc-pixel-font font-bold bg-[#221936] border-2 border-[#473370] text-[#52ffd5] hover:border-[#2ee86c] transition-colors mb-5 cursor-pointer"
        >
          <span>← VOLVER A LA PAPELERA</span>
        </button>

        <div className="flex items-center gap-3 mb-5 p-3.5 bg-[#1b132b] border-2 border-[#392959]">
          <span className="mc-pixel-font text-[10px] px-2 py-1 bg-[#4b1f2a] text-[#ff9f9f] border border-[#8c3649]">
            {selectedFile.badge}
          </span>
          <div>
            <h1 className="mc-pixel-font text-sm sm:text-base font-bold text-[#ffffff]">
              {selectedFile.name}
            </h1>
            <span className="text-[11px] font-mono text-[#b9add1]">
              {selectedFile.type} · {selectedFile.size} · Eliminado: {selectedFile.date}
            </span>
          </div>
        </div>

        <div className="bg-[#0e0a18] border-2 border-[#32234f] p-5">
          <pre className="text-xs sm:text-[13px] font-mono text-[#e5dcf7] whitespace-pre-wrap leading-relaxed">
            {selectedFile.content}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="p-2 text-[#f3edff]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#2d2147]">
        <div>
          <span className="mc-pixel-font text-[10px] tracking-widest text-[#ffcf4d] block mb-1">
            ZONA DE LAVA · RECICLAJE
          </span>
          <h1 className="mc-pixel-font text-xl font-bold text-[#ffffff]">Papelera del Sistema</h1>
          <p className="text-xs text-[#b9add1] mt-1">
            Archivos descartados del viejo escritorio (el único clásico que sobrevivió al comando).
          </p>
        </div>
        <button
          onClick={() => setEmptied(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs mc-pixel-font font-bold text-[#ffffff] bg-[#a82424] border-2 border-[#3b0909] shadow-[2px_2px_0_#09040a] hover:bg-[#c92e2e] transition-colors cursor-pointer"
        >
          <span>INCINERAR PAPELERA</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {MC_TRASH_FILES.map((file) => (
          <button
            key={file.name}
            onClick={() => setSelectedFile(file)}
            className="w-full text-left flex items-center justify-between gap-3 p-3.5 bg-[#191229] border-2 border-[#2f224a] hover:border-[#ffcf4d] hover:bg-[#231938] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mc-pixel-font text-[10px] px-2 py-1 bg-[#291e42] text-[#ffcf4d] border border-[#4a3673] shrink-0">
                {file.type}
              </span>
              <div className="min-w-0">
                <div className="font-mono text-xs sm:text-sm font-semibold text-[#ffffff] truncate group-hover:text-[#52ffd5]">
                  {file.name}
                </div>
                <div className="text-[11px] font-mono text-[#a99cc4] mt-0.5">
                  {file.size} · Eliminado: {file.date}
                </div>
              </div>
            </div>
            <span className="mc-pixel-font text-[10px] text-[#ffcf4d] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              INSPECCIONAR ▸
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center text-[11px] font-mono text-[#8e80ab]">
        Nota: Todo el portafolio e información profesional vive ahora en la landing principal.
      </div>
    </div>
  )
}
