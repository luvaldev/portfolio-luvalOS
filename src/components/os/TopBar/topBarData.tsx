import React from "react";

// ─── Project categories data ──────────────────────────────────────────────────
export const PROJECT_CATEGORIES = [
  {
    id: "overview",
    label: "Vista General",
    bg: "#E5E7EB",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    windowId: "projects",
    projects: [],
  },
  {
    id: "webapps",
    label: "Web Apps",
    bg: "#DBEAFE",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    projects: [
      { name: "CampusSwap", desc: "SaaS de colaboración académica UDP." },
      { name: "pulso-maq", desc: "Gestión y seguimiento GPS para arriendo de equipos." },
      { name: "cercasco", desc: "Detección de vehículos en tiempo real para ciclistas." },
      { name: "casino-management-platform", desc: "Plataforma de casino en tres fases." },
      { name: "portfolio-luvaldev", desc: "Portafolio personal clásico en Astro." },
      { name: "Portfolio luvalOS", desc: "Este portfolio interactivo." },
    ],
  },
  {
    id: "cybersec",
    label: "Forensics & Security",
    bg: "#FEE2E2",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    projects: [
      { name: "core-framework", desc: "Motor Python forense." },
      { name: "Forensic-Email-Marketing-Analyzer", desc: "Análisis forense retail chileno." }
    ],
  },
  {
    id: "academic",
    label: "Academic & Coursework",
    bg: "#EDE9FE",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>,
    projects: [
      { name: "OS Internals", desc: "Simulación concurrente multihilo en C++." },
      { name: "Sistemas Distribuidos", desc: "Tareas y algoritmos distribuidos." },
    ],
  },
  {
    id: "tools",
    label: "Tools & CLI",
    bg: "#FEF3C7",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    projects: [
      { name: "Data Curator", desc: "Herramientas ETL de correos." },
      { name: "Bots", desc: "Automatización y bots." }
    ],
  },
  {
    id: "others",
    label: "Otros Proyectos",
    bg: "#D1FAE5",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    projects: [
      { name: "SurvivalDubCore", desc: "Core de servidor Minecraft." }
    ],
  },
]

// ─── Skills categories data ───────────────────────────────────────────────────
export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    bg: "#DBEAFE",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    skills: [
      { name: "React", level: 90 }, { name: "Next.js", level: 88 },
      { name: "Astro", level: 75 }, { name: "TypeScript", level: 87 },
      { name: "Tailwind CSS", level: 92 }, { name: "Framer Motion", level: 78 },
    ]
  },
  {
    id: "backend",
    label: "Backend",
    bg: "#D1FAE5",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    skills: [
      { name: "Node.js", level: 84 }, { name: "Bun", level: 80 },
      { name: "Express", level: 82 }, { name: "pnpm", level: 85 },
      { name: "REST APIs", level: 88 }, { name: "PostgreSQL", level: 76 },
    ]
  },
  {
    id: "languages",
    label: "Lenguajes",
    bg: "#FEF3C7",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
    skills: [
      { name: "Python", level: 82 }, { name: "JavaScript", level: 92 },
      { name: "C++", level: 68 }, { name: "C", level: 65 },
      { name: "Java", level: 70 }, { name: "Bash/Shell", level: 80 },
    ]
  },
  {
    id: "cybersec",
    label: "Ciberseguridad",
    bg: "#FEE2E2",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    skills: [
      { name: "Kali Linux", level: 82 }, { name: "Wireshark", level: 75 },
      { name: "Nmap", level: 80 }, { name: "Metasploit", level: 68 },
      { name: "Burp Suite", level: 72 }, { name: "CTF", level: 78 },
    ]
  },
  {
    id: "so",
    label: "Sist. Operativos",
    bg: "#EDE9FE",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>,
    skills: [
      { name: "Arch Linux", level: 88 }, { name: "Ubuntu", level: 85 },
      { name: "Debian", level: 80 }, { name: "Fedora", level: 72 },
      { name: "Windows", level: 78 }, { name: "macOS", level: 65 },
    ]
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    bg: "#FCE7F3",
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 1 1 4.93 19.07"/></svg>,
    skills: [
      { name: "Git / GitHub", level: 92 }, { name: "Docker", level: 74 },
      { name: "Figma", level: 78 }, { name: "Linux CLI", level: 88 },
      { name: "Vercel", level: 85 }, { name: "Nginx", level: 68 },
    ]
  },
]