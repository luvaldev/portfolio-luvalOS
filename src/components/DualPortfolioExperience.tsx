"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import NormalPortfolioLanding from "@/components/normal/NormalPortfolioLanding"
import PortfolioLanding from "@/components/PortfolioLanding"
import BlockFallTransition from "@/components/transition/BlockFallTransition"

type PortfolioWorld = "normal" | "minecraft"

interface TransitionState {
  active: boolean
  targetWorld: PortfolioWorld
  origin: { x: number; y: number } | null
}

function dispatchWorldChange(world: PortfolioWorld) {
  if (typeof window === "undefined") return
  document.documentElement.dataset.portfolioWorld = world
  window.dispatchEvent(
    new CustomEvent<{ world: PortfolioWorld }>("luval-world-change", {
      detail: { world },
    })
  )
}

export default function DualPortfolioExperience() {
  const [world, setWorld] = useState<PortfolioWorld>("normal")
  const [transitionState, setTransitionState] = useState<TransitionState>({
    active: false,
    targetWorld: "minecraft",
    origin: null,
  })
  const urlCheckedRef = useRef(false)

  // Hydrate initial world from ?world=minecraft after mount to prevent SSR mismatch,
  // and stay in sync with browser history navigation.
  useEffect(() => {
    if (typeof window === "undefined") return

    const syncFromUrl = () => {
      const target: PortfolioWorld =
        new URLSearchParams(window.location.search).get("world") === "minecraft"
          ? "minecraft"
          : "normal"
      urlCheckedRef.current = true
      setWorld(target)
      dispatchWorldChange(target)
    }

    const timer = window.setTimeout(syncFromUrl, 0)
    window.addEventListener("popstate", syncFromUrl)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("popstate", syncFromUrl)
    }
  }, [])

  // Keep dataset.portfolioWorld and listeners synced whenever world state updates
  useEffect(() => {
    if (!urlCheckedRef.current) return
    dispatchWorldChange(world)
  }, [world])

  const handleActivateMinecraft = useCallback((origin?: { x: number; y: number }) => {
    setTransitionState((prev) => {
      if (prev.active) return prev
      return {
        active: true,
        targetWorld: "minecraft",
        origin: origin ?? null,
      }
    })
  }, [])

  const handleReturnNormal = useCallback(() => {
    setTransitionState((prev) => {
      if (prev.active) return prev
      return {
        active: true,
        targetWorld: "normal",
        origin: null,
      }
    })
  }, [])

  const handleMidpointSwap = useCallback(() => {
    const nextWorld = transitionState.targetWorld
    const nextUrl = nextWorld === "minecraft" ? "/?world=minecraft" : "/"
    urlCheckedRef.current = true
    window.history.replaceState(null, "", nextUrl)
    setWorld(nextWorld)
    dispatchWorldChange(nextWorld)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [transitionState.targetWorld])

  const handleTransitionComplete = useCallback(() => {
    setTransitionState((prev) => ({
      ...prev,
      active: false,
    }))
  }, [])

  return (
    <>
      {world === "normal" ? (
        <NormalPortfolioLanding onActivateMinecraft={handleActivateMinecraft} />
      ) : (
        <PortfolioLanding onReturnNormal={handleReturnNormal} />
      )}

      <BlockFallTransition
        active={transitionState.active}
        targetWorld={transitionState.targetWorld}
        origin={transitionState.origin}
        onMidpointSwap={handleMidpointSwap}
        onComplete={handleTransitionComplete}
      />
    </>
  )
}
