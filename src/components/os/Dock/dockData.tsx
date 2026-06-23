import React from "react";

export const AppIcon = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div
    className="w-full h-full rounded-[22%] flex items-center justify-center relative overflow-hidden"
    style={{ background: bg }}
  >
    {/* Gloss overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"/>
    {children}
  </div>
)

export const DOCK_ICONS: Record<string, React.ReactNode> = {
  readme: (
    <AppIcon bg="#8B5CF6">
      <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="white"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="8" y1="17" x2="12" y2="17" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </AppIcon>
  ),
  projects: (
    <AppIcon bg="#F59E0B">
      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
        <path d="M3 7a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2A2 2 0 0 0 13.07 8H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="white"/>
      </svg>
    </AppIcon>
  ),
  skills: (
    <AppIcon bg="#3B82F6">
      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="white">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </AppIcon>
  ),
  contact: (
    <AppIcon bg="#EF4444">
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="white">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    </AppIcon>
  ),
  resume: (
    <AppIcon bg="#10B981">
      <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="white"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="8" y1="17" x2="14" y2="17" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="8" y1="9" x2="10" y2="9" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </AppIcon>
  ),
}