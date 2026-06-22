"use client"

import TopBar from "./TopBar"
import BottomDock from "./SideDock"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"
import AuroraBackground from "./AuroraBackground"
import { useOSStore } from "@/store/useOSStore"
import { useEffect, useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import React from "react"

const LEFT_ICONS = [
  { id: "readme",   title: "README.md",   y: 0   },
  { id: "projects", title: "projects/",   y: 92  },
  { id: "skills",   title: "skills.json", y: 184 },
  { id: "contact",  title: "contact.vcf", y: 276 },
  { id: "resume",   title: "resume.pdf",  y: 368 },
]

const RIGHT_ICONS = [
  { id: "about",    title: "about.mdx", y: 0   },
  { id: "blog",     title: "blog.md",   y: 92  },
  { id: "store",    title: "store/",    y: 184 },
  { id: "trash",    title: "Trash",     y: 276 },
]

export default function DesktopEnvironment() {
  const { windows, openWindow } = useOSStore()
  const [contents, setContents] = useState<Record<string, React.ReactNode>>({})
  const desktopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import("./WindowContent").then(mod => {
      setContents({
        readme:   React.createElement(mod.ReadmeContent),
        projects: React.createElement(mod.ProjectsContent),
        skills:   React.createElement(mod.SkillsContent),
        contact:  React.createElement(mod.ContactContent),
        resume:   React.createElement(mod.ResumeContent),
      })
    })
  }, [])

  useEffect(() => {
    if (!contents.readme) return
    const t = setTimeout(() => {
      openWindow("readme", {
        title: "README.md", icon: "📄",
        content: contents.readme,
        x: 160, y: 56,
        width: 960, height: 650,
      })
    }, 300)
    return () => clearTimeout(t)
  }, [contents.readme, openWindow])

  return (
    <div
      ref={desktopRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "var(--color-os-bg)" }}
    >
      <AuroraBackground />

      <TopBar />

      {/* Left column */}
      {LEFT_ICONS.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          x={4}
          y={52 + icon.y}
          content={contents[icon.id]}
          desktopRef={desktopRef}
        />
      ))}

      {/* Right column */}
      {RIGHT_ICONS.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          right={4}
          y={52 + icon.y}
          desktopRef={desktopRef}
        />
      ))}

      {/* Windows */}
      <AnimatePresence>
        {Object.keys(windows).map(id => (
          <Window key={id} id={id} />
        ))}
      </AnimatePresence>

      <BottomDock />
    </div>
  )
}
