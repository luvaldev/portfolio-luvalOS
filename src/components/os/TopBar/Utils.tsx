import React from "react";

// ─── Keyboard shortcut badge ──────────────────────────────────────────────────
export function Kbd({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-0.5 ml-auto">
      {keys.map(k => (
        <kbd key={k} className="bg-black/[0.08] dark:bg-white/[0.1] text-[var(--color-text-muted)] text-[10px] font-semibold px-1.5 py-0.5 rounded min-w-[22px] text-center font-mono">
          {k}
        </kbd>
      ))}
    </div>
  )
}

// ─── Colorful mini icon ───────────────────────────────────────────────────────
export const CI = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
    {children}
  </div>
)