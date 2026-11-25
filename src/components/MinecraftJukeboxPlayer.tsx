"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface JukeboxTrack {
  id: string
  title: string
  artist: string
  album: "Volume Alpha" | "Volume Beta"
  discColor: string
  discRing: string
  videoId: string
}

const MINECRAFT_TRACKS: JukeboxTrack[] = [
  {
    id: "haggstrom",
    title: "Haggstrom",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#f0d443",
    discRing: "#b38c14",
    videoId: "laZusNy8QiY",
  },
  {
    id: "aria-math",
    title: "Aria Math",
    artist: "C418",
    album: "Volume Beta",
    discColor: "#ff7a3d",
    discRing: "#b34414",
    videoId: "atgjKEgSqSU",
  },
  {
    id: "mice-on-venus",
    title: "Mice on Venus",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#e685ff",
    discRing: "#8b33a8",
    videoId: "DZ47H84Bc_Q",
  },
  {
    id: "living-mice",
    title: "Living Mice",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#52ffd5",
    discRing: "#189e7f",
    videoId: "oGxQNQtnr6Q",
  },
  {
    id: "clark",
    title: "Clark",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#63b3ff",
    discRing: "#1e63a8",
    videoId: "UhWjWdlnmEw",
  },
  {
    id: "wet-hands",
    title: "Wet Hands",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#4ce670",
    discRing: "#1d8c37",
    videoId: "mukiMaOSLEs",
  },
  {
    id: "dry-hands",
    title: "Dry Hands",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#ffd070",
    discRing: "#a8791e",
    videoId: "2j8im-7KS9Y",
  },
  {
    id: "sweden",
    title: "Sweden",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#ff5c8a",
    discRing: "#a62148",
    videoId: "aBkTkxKDduc",
  },
  {
    id: "subwoofer-lullaby",
    title: "Subwoofer Lullaby",
    artist: "C418",
    album: "Volume Alpha",
    discColor: "#9c7aff",
    discRing: "#5232b0",
    videoId: "Gpd85y_iTxY",
  },
]

const JUKEBOX_PROMPT_LABELS = [
  "♪ REPRODÚCEME",
  "▶ PON MÚSICA",
  "♫ C418 OST",
] as const

interface YTPlayerInstance {
  playVideo: () => void
  pauseVideo: () => void
  loadVideoById: (videoId: string) => void
  setVolume: (vol: number) => void
  mute: () => void
  unMute: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getCurrentTime: () => number
  getDuration: () => number
  destroy: () => void
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      height?: string | number
      width?: string | number
      videoId: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void
        onError?: () => void
      }
    },
  ) => YTPlayerInstance
  PlayerState: {
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
  }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

function PixelMusicDisc({
  color,
  ring,
  size = 28,
  spinning = false,
}: {
  color: string
  ring: string
  size?: number
  spinning?: boolean
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={spinning ? "mc-disc-spin flex-shrink-0" : "flex-shrink-0"}
      aria-hidden="true"
    >
      <path d="M5 1h6v1h2v1h1v2h1v6h-1v2h-1v1h-2v1H5v-1H3v-1H2v-2H1V5h1V3h1V2h2z" fill="#120f17" />
      <path d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2z" fill="#252130" />
      <rect x="4" y="3" width="2" height="1" fill="#464059" />
      <rect x="3" y="4" width="1" height="2" fill="#464059" />
      <rect x="10" y="12" width="2" height="1" fill="#3a344a" />
      <rect x="12" y="10" width="1" height="2" fill="#3a344a" />
      <rect x="5" y="5" width="6" height="6" fill={ring} />
      <rect x="6" y="6" width="4" height="4" fill={color} />
      <rect x="6" y="6" width="1" height="1" fill="#ffffff" fillOpacity="0.45" />
      <rect x="7" y="7" width="2" height="2" fill="#120e1a" />
    </svg>
  )
}

function PixelPlayIcon() {
  return (
    <svg viewBox="0 0 12 12" width="14" height="14" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 1h2v1h2v1h2v1h2v1h1v2h-1v1H8v1H6v1H4v1H2z" fill="currentColor" />
    </svg>
  )
}

function PixelPauseIcon() {
  return (
    <svg viewBox="0 0 12 12" width="14" height="14" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="3" height="10" fill="currentColor" />
      <rect x="7" y="1" width="3" height="10" fill="currentColor" />
    </svg>
  )
}

function PixelPrevIcon() {
  return (
    <svg viewBox="0 0 12 12" width="13" height="13" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="2" width="2" height="8" fill="currentColor" />
      <path d="M11 2H9v1H7v1H5v1H4v2h1v1h2v1h2v1h2z" fill="currentColor" />
    </svg>
  )
}

function PixelNextIcon() {
  return (
    <svg viewBox="0 0 12 12" width="13" height="13" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="9" y="2" width="2" height="8" fill="currentColor" />
      <path d="M1 2h2v1h2v1h2v1h1v2H7v1H5v1H3v1H1z" fill="currentColor" />
    </svg>
  )
}

function PixelVolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 14 14" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M1 5h3v4H1zM4 4h1v6H4zM5 3h1v8H5zM6 2h2v10H6z" fill="currentColor" />
      {muted ? (
        <path d="M9 4h1v1h1v1h1V5h1V4h1v1h-1v1h-1v2h1v1h1v1h-1V9h-1V8h-1v1h-1v1H9V9h1V8h1V6h-1V5H9z" fill="#ff5c5c" />
      ) : (
        <>
          <rect x="9" y="5" width="1" height="4" fill="#2ee86c" />
          <rect x="11" y="3" width="1" height="8" fill="#2ee86c" />
        </>
      )}
    </svg>
  )
}

function JukeboxBlockVisual({ size }: { size: number }) {
  return (
    <video
      src="/minecraft/jukebox-spin.webm"
      poster="/minecraft/jukebox-idle.png"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      width={size}
      height={size}
      className="object-contain pointer-events-none select-none"
      style={{ width: size, height: size }}
    />
  )
}

function formatTime(secs: number): string {
  if (!Number.isFinite(secs) || secs < 0) return "0:00"
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function MinecraftJukeboxPlayer() {
  const pathname = usePathname()
  const [routeWorld, setRouteWorld] = useState<"normal" | "minecraft">("normal")
  const effectiveWorld: "normal" | "minecraft" = pathname?.startsWith("/os") ? "minecraft" : routeWorld

  const [open, setOpen] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [volume, setVolume] = useState(30)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [promptIndex, setPromptIndex] = useState(0)

  const playerHostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayerInstance | null>(null)
  const pendingPlayRef = useRef(false)
  const userPausedRef = useRef(false)
  const isPlayingRef = useRef(false)
  const isReadyRef = useRef(false)
  const effectiveWorldRef = useRef(effectiveWorld)
  const volumeRef = useRef(volume)
  const mutedRef = useRef(muted)
  const shuffleRef = useRef(shuffle)
  const trackIndexRef = useRef(trackIndex)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  useEffect(() => {
    effectiveWorldRef.current = effectiveWorld
  }, [effectiveWorld])

  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    shuffleRef.current = shuffle
  }, [shuffle])

  useEffect(() => {
    trackIndexRef.current = trackIndex
  }, [trackIndex])

  // Sync active world from route, dataset/query param, and luval-world-change events
  useEffect(() => {
    if (typeof window === "undefined") return

    const syncTimer = window.setTimeout(() => {
      if (pathname?.startsWith("/os")) {
        setRouteWorld("minecraft")
        return
      }
      const isMc =
        document.documentElement.dataset.portfolioWorld === "minecraft" ||
        new URLSearchParams(window.location.search).get("world") === "minecraft"
      setRouteWorld(isMc ? "minecraft" : "normal")
    }, 0)

    const onWorldChange = (event: Event) => {
      window.clearTimeout(syncTimer)
      const next = (event as CustomEvent<{ world: "normal" | "minecraft" }>).detail?.world
      if (next === "normal" || next === "minecraft") {
        setRouteWorld(next)
      }
    }

    window.addEventListener("luval-world-change", onWorldChange)
    return () => {
      window.clearTimeout(syncTimer)
      window.removeEventListener("luval-world-change", onWorldChange)
    }
  }, [pathname])

  const currentTrack = MINECRAFT_TRACKS[trackIndex]

  const selectAndPlayTrack = useCallback((nextIdx: number, autoPlay = true) => {
    const normalized = ((nextIdx % MINECRAFT_TRACKS.length) + MINECRAFT_TRACKS.length) % MINECRAFT_TRACKS.length
    setTrackIndex(normalized)
    setCurrentTime(0)
    setDuration(0)
    const nextTrack = MINECRAFT_TRACKS[normalized]

    if (playerRef.current) {
      setIsBuffering(autoPlay)
      playerRef.current.loadVideoById(nextTrack.videoId)
      if (!autoPlay) {
        playerRef.current.pauseVideo()
      }
    } else if (autoPlay) {
      pendingPlayRef.current = true
    }
  }, [])

  const handleNext = useCallback(() => {
    if (shuffleRef.current) {
      const candidates = MINECRAFT_TRACKS.map((_, i) => i).filter((i) => i !== trackIndexRef.current)
      const pick = candidates[Math.floor(Math.random() * candidates.length)] ?? 0
      selectAndPlayTrack(pick, true)
    } else {
      selectAndPlayTrack(trackIndexRef.current + 1, true)
    }
  }, [selectAndPlayTrack])

  const handlePrev = useCallback(() => {
    if (currentTime > 4 && playerRef.current) {
      playerRef.current.seekTo(0, true)
      setCurrentTime(0)
      return
    }
    selectAndPlayTrack(trackIndexRef.current - 1, true)
  }, [currentTime, selectAndPlayTrack])

  // Load YouTube IFrame API & mount hidden player
  useEffect(() => {
    if (typeof window === "undefined") return
    let destroyed = false

    const initPlayer = () => {
      if (destroyed || !playerHostRef.current || !window.YT?.Player || playerRef.current) return
      const mountEl = document.createElement("div")
      playerHostRef.current.innerHTML = ""
      playerHostRef.current.appendChild(mountEl)

      playerRef.current = new window.YT.Player(mountEl, {
        height: 1,
        width: 1,
        videoId: MINECRAFT_TRACKS[0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            if (destroyed) return
            e.target.setVolume(volumeRef.current || 30)
            setIsReady(true)
            if ((effectiveWorldRef.current === "minecraft" || pendingPlayRef.current) && !userPausedRef.current) {
              pendingPlayRef.current = false
              if (!mutedRef.current) {
                e.target.unMute()
                e.target.setVolume(volumeRef.current || 30)
              }
              e.target.playVideo()
            }
          },
          onStateChange: (e) => {
            if (destroyed || !window.YT) return
            const state = e.data
            if (state === window.YT.PlayerState.PLAYING) {
              if (effectiveWorldRef.current !== "minecraft") {
                e.target.pauseVideo()
                setIsPlaying(false)
                setIsBuffering(false)
                return
              }
              setIsPlaying(true)
              setIsBuffering(false)
              setDuration(e.target.getDuration() || 0)
            } else if (state === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              setIsBuffering(false)
            } else if (state === window.YT.PlayerState.BUFFERING) {
              if (effectiveWorldRef.current === "minecraft") {
                setIsBuffering(true)
              }
            } else if (state === window.YT.PlayerState.ENDED) {
              setIsPlaying(false)
              if (effectiveWorldRef.current === "minecraft") {
                handleNext()
              }
            }
          },
          onError: () => {
            if (!destroyed) {
              setIsBuffering(false)
              if (effectiveWorldRef.current === "minecraft") {
                handleNext()
              }
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.()
        initPlayer()
      }
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        tag.async = true
        document.head.appendChild(tag)
      }
    }

    return () => {
      destroyed = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [handleNext])

  // Pause/play cleanly whenever active world switches between normal and minecraft
  useEffect(() => {
    const player = playerRef.current
    if (effectiveWorld === "normal") {
      pendingPlayRef.current = false
      if (player && isReadyRef.current) {
        player.pauseVideo()
      }
      return
    }

    if (player && isReadyRef.current) {
      if (!mutedRef.current) {
        player.unMute()
        player.setVolume(volumeRef.current || 30)
      }
      if (!userPausedRef.current) {
        player.playVideo()
      }
    } else if (!userPausedRef.current) {
      pendingPlayRef.current = true
    }
  }, [effectiveWorld])

  // Fallback for browsers that block audio autoplay until first user gesture (only in minecraft world)
  useEffect(() => {
    if (effectiveWorld !== "minecraft") return
    const unlockAutoplay = () => {
      if (effectiveWorldRef.current !== "minecraft" || userPausedRef.current || isPlayingRef.current) return
      if (playerRef.current && isReadyRef.current) {
        if (!mutedRef.current) {
          playerRef.current.unMute()
          playerRef.current.setVolume(volumeRef.current || 30)
        }
        playerRef.current.playVideo()
      } else {
        pendingPlayRef.current = true
      }
    }
    window.addEventListener("pointerdown", unlockAutoplay, { once: true })
    window.addEventListener("keydown", unlockAutoplay, { once: true })
    window.addEventListener("touchstart", unlockAutoplay, { once: true })
    return () => {
      window.removeEventListener("pointerdown", unlockAutoplay)
      window.removeEventListener("keydown", unlockAutoplay)
      window.removeEventListener("touchstart", unlockAutoplay)
    }
  }, [effectiveWorld])

  // Sync progress bar while playing
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      const p = playerRef.current
      if (!p) return
      setCurrentTime(p.getCurrentTime() || 0)
      const dur = p.getDuration()
      if (dur > 0) setDuration(dur)
    }, 500)
    return () => clearInterval(timer)
  }, [isPlaying])

  // Cycle idle prompt tag while paused and collapsed
  useEffect(() => {
    if (effectiveWorld !== "minecraft" || isPlaying || open) return
    const timer = window.setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % JUKEBOX_PROMPT_LABELS.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [effectiveWorld, isPlaying, open])

  const togglePlay = () => {
    if (!playerRef.current || !isReady) {
      userPausedRef.current = false
      pendingPlayRef.current = true
      setIsBuffering(true)
      return
    }
    if (isPlaying) {
      userPausedRef.current = true
      playerRef.current.pauseVideo()
    } else {
      userPausedRef.current = false
      setIsBuffering(true)
      playerRef.current.playVideo()
    }
  }

  const handleVolumeChange = (nextVol: number) => {
    setVolume(nextVol)
    setMuted(nextVol === 0)
    if (playerRef.current) {
      if (nextVol === 0) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
        playerRef.current.setVolume(nextVol)
      }
    }
  }

  const toggleMute = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    if (playerRef.current) {
      if (nextMuted) playerRef.current.mute()
      else {
        playerRef.current.unMute()
        playerRef.current.setVolume(volume || 50)
      }
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration <= 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const target = pct * duration
    playerRef.current.seekTo(target, true)
    setCurrentTime(target)
  }

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <>
      {/* Hidden YouTube audio engine (kept mounted silently across worlds) */}
      <div
        ref={playerHostRef}
        className="pointer-events-none fixed -bottom-10 -right-10 w-px h-px opacity-0 overflow-hidden"
        aria-hidden="true"
      />

      <div
        className={
          effectiveWorld === "minecraft"
            ? "fixed bottom-4 right-4 z-[1200] flex flex-col items-end gap-2.5 select-none"
            : "hidden"
        }
      >

      {/* Expanded Minecraft Jukebox Block Panel */}
      {open && (
        <div className="mc-jukebox-panel w-[320px] sm:w-[356px] text-[#f7efe6]">
          {/* Top Jukebox Slot Header */}
          <div className="mc-jukebox-top">
            <div className="mc-jukebox-slot" aria-hidden="true" />
            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-block w-2 h-2 bg-[#2ee86c] flex-shrink-0" />
                <span className="mc-pixel-font text-[10px] font-bold tracking-wider text-[#ffe3b8] truncate">
                  JUKEBOX · C418 OST
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-2 py-0.5 bg-[#29150b] border-2 border-[#160a05] text-[#f5cfa0] hover:text-white mc-pixel-font text-[10px] cursor-pointer"
                aria-label="Minimizar reproductor"
              >
                —
              </button>
            </div>
          </div>

          {/* Now Playing Deck with 3D Spinning Jukebox Block */}
          <div className="p-3.5 bg-[#1b100c] border-y-2 border-[#3b2114]">
            <div className="flex items-center gap-3.5">
              <div className="relative w-[84px] h-[84px] flex-shrink-0 flex items-center justify-center bg-[#120a08] border-2 border-[#4f2d1b] shadow-[inset_2px_2px_0_#090403]">
                {isPlaying && (
                  <>
                    <span className="mc-music-note mc-note-1" aria-hidden="true">♪</span>
                    <span className="mc-music-note mc-note-2" aria-hidden="true">♫</span>
                  </>
                )}
                <JukeboxBlockVisual size={78} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <PixelMusicDisc
                    color={currentTrack.discColor}
                    ring={currentTrack.discRing}
                    size={24}
                    spinning={isPlaying}
                  />
                  <span className="mc-pixel-font text-[9px] uppercase tracking-widest text-[#d4a373]">
                    {currentTrack.album}
                  </span>
                </div>
                <p className="mc-pixel-font text-[14px] font-bold text-[#fff5e6] truncate mt-1">
                  {currentTrack.title}
                </p>
                <p className="font-mono text-[11px] text-[#c7a98e]">
                  {currentTrack.artist} · {isBuffering ? "Cargando disco..." : isPlaying ? "Reproduciendo" : "En pausa"}
                </p>
              </div>
            </div>

            {/* Interactive Progress Bar */}
            <div className="mt-3">
              <div
                role="slider"
                tabIndex={0}
                aria-label="Progreso de canción"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                onClick={handleSeek}
                className="h-2.5 bg-[#0e0705] border-2 border-[#4a2b1a] cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full transition-[width] duration-300"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, ${currentTrack.discRing}, ${currentTrack.discColor})`,
                  }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#bfa186] mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShuffle((s) => !s)}
                  title="Modo aleatorio"
                  className={`px-2 py-1.5 border-2 mc-pixel-font text-[10px] cursor-pointer transition-colors ${
                    shuffle
                      ? "bg-[#225c33] border-[#2ee86c] text-white"
                      : "bg-[#2a1810] border-[#4f2e1d] text-[#d1b092] hover:text-white"
                  }`}
                >
                  SHUF
                </button>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Canción anterior"
                  className="p-2 bg-[#2a1810] border-2 border-[#4f2e1d] hover:border-[#d4a373] text-[#ffe6c4] cursor-pointer"
                >
                  <PixelPrevIcon />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  className="px-3.5 py-2 bg-[#207339] border-2 border-[#2ee86c] hover:brightness-110 text-white mc-pixel-font text-[10px] font-bold cursor-pointer shadow-[2px_2px_0_#071c0d] flex items-center justify-center min-w-[42px]"
                >
                  {isBuffering ? "..." : isPlaying ? <PixelPauseIcon /> : <PixelPlayIcon />}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Siguiente canción"
                  className="p-2 bg-[#2a1810] border-2 border-[#4f2e1d] hover:border-[#d4a373] text-[#ffe6c4] cursor-pointer"
                >
                  <PixelNextIcon />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  className="p-1.5 bg-[#2a1810] border-2 border-[#4f2e1d] hover:border-[#d4a373] text-[#ffe3b8] cursor-pointer flex items-center justify-center"
                >
                  <PixelVolumeIcon muted={muted || volume === 0} />
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  aria-label="Volumen"
                  className="w-16 accent-[#2ee86c] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Playlist (9 Minecraft Discs) */}
          <div className="max-h-[240px] overflow-y-auto p-2 bg-[#140c09] space-y-1.5">
            {MINECRAFT_TRACKS.map((track, idx) => {
              const active = idx === trackIndex
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectAndPlayTrack(idx, true)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 text-left border-2 transition-colors cursor-pointer ${
                    active
                      ? "bg-[#2e1a11] border-[#d4975a] text-[#fff6e8]"
                      : "bg-[#1a100c] border-transparent hover:border-[#4d2d1c] text-[#d6bfa9] hover:text-white"
                  }`}
                >
                  <PixelMusicDisc
                    color={track.discColor}
                    ring={track.discRing}
                    size={30}
                    spinning={active && isPlaying}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mc-pixel-font text-[11px] font-bold truncate">
                      {idx + 1}. {track.title}
                    </div>
                    <div className="font-mono text-[10px] text-[#a8896f] truncate">
                      {track.artist} · {track.album}
                    </div>
                  </div>
                  {active && (
                    <span className="mc-pixel-font text-[9px] text-[#2ee86c] flex-shrink-0">
                      {isPlaying ? "♪ ON" : "PAUSA"}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Compact Floating Jukebox Block Launcher (Clean Floating 3D Block, no bulky square box) */}
      <div className="flex items-end gap-2.5">
        {!open && isPlaying && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 mb-2 bg-[#1b100c]/95 border-2 border-[#6e4026] shadow-[3px_3px_0_#090403] text-left cursor-pointer hover:border-[#2ee86c]"
          >
            <PixelMusicDisc color={currentTrack.discColor} ring={currentTrack.discRing} size={26} spinning />
            <div className="leading-tight">
              <span className="block mc-pixel-font text-[9px] text-[#2ee86c]">NOW PLAYING</span>
              <span className="block mc-pixel-font text-[10px] text-[#fff3e0] max-w-[140px] truncate">
                {currentTrack.title}
              </span>
            </div>
          </button>
        )}

        <div className="flex flex-col items-center gap-1.5">
          {!open && !isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Reproducir música de Minecraft (C418)"
              className="mc-jukebox-prompt-tag mc-pixel-font"
            >
              <span
                className="inline-block w-1.5 h-1.5 bg-[#2ee86c] shadow-[0_0_6px_#2ee86c] flex-shrink-0"
                aria-hidden="true"
              />
              <span>{JUKEBOX_PROMPT_LABELS[promptIndex]}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            title={open ? "Minimizar Jukebox de Minecraft" : "Abrir Jukebox de Minecraft (C418)"}
            aria-label={open ? "Minimizar Jukebox de Minecraft" : "Abrir Jukebox de Minecraft"}
            className="mc-jukebox-fab relative w-[92px] h-[92px] sm:w-[98px] sm:h-[98px] flex items-center justify-center cursor-pointer"
          >
            {isPlaying && (
              <>
                <span className="mc-music-note mc-note-1" aria-hidden="true">♪</span>
                <span className="mc-music-note mc-note-2" aria-hidden="true">♫</span>
              </>
            )}
            <JukeboxBlockVisual size={92} />
          </button>
        </div>
      </div>
      </div>
    </>
  )
}

