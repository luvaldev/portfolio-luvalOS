"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export interface CrtPcTransitionProps {
  active: boolean
  mode: "collapse" | "boot"
  onComplete?: () => void
}

const COLLAPSE_DURATION_MS = 780
const BOOT_DURATION_MS = 680
const REDUCED_MOTION_DURATION_MS = 220

export default function CrtPcTransition({
  active,
  mode,
  onComplete,
}: CrtPcTransitionProps) {
  const onCompleteRef = useRef(onComplete)
  const completedRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!active) {
      completedRef.current = false
      return
    }

    completedRef.current = false
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const duration = reduced
      ? REDUCED_MOTION_DURATION_MS
      : mode === "collapse"
        ? COLLAPSE_DURATION_MS
        : BOOT_DURATION_MS

    const timer = window.setTimeout(() => {
      if (completedRef.current) return
      completedRef.current = true
      onCompleteRef.current?.()
    }, duration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [active, mode])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto select-none"
      data-crt-mode={mode}
    >
      <style>{`
        @keyframes crt-collapse-backdrop {
          0% { opacity: 0; }
          32% { opacity: 0.92; }
          55% { opacity: 0.98; }
          100% { opacity: 1; }
        }

        @keyframes crt-collapse-scanlines {
          0% { opacity: 0; }
          20% { opacity: 0.65; }
          55% { opacity: 0.45; }
          100% { opacity: 0; }
        }

        @keyframes crt-collapse-frame {
          0% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.35;
            filter: brightness(1.1);
          }
          18% {
            transform: scaleX(1.01) scaleY(0.78);
            opacity: 0.95;
            filter: brightness(1.4);
          }
          43.6% {
            transform: scaleX(1) scaleY(0.007);
            opacity: 1;
            filter: brightness(2);
          }
          79.5% {
            transform: scaleX(0.008) scaleY(0.007);
            opacity: 1;
            filter: brightness(2.4);
          }
          92% {
            transform: scaleX(0.004) scaleY(0.004);
            opacity: 0.4;
          }
          100% {
            transform: scaleX(0.002) scaleY(0.002);
            opacity: 0;
          }
        }

        @keyframes crt-collapse-beam {
          0%, 34% {
            opacity: 0;
            transform: scaleX(1) scaleY(0.014);
          }
          43.6% {
            opacity: 1;
            transform: scaleX(1) scaleY(0.008);
          }
          79.5% {
            opacity: 0.95;
            transform: scaleX(0.014) scaleY(0.008);
          }
          100% {
            opacity: 0;
            transform: scaleX(0.004) scaleY(0.004);
          }
        }

        @keyframes crt-collapse-dot {
          0%, 62% {
            opacity: 0;
            transform: scale(0.3);
          }
          79.5% {
            opacity: 1;
            transform: scale(1.25);
          }
          90% {
            opacity: 0.85;
            transform: scale(0.75);
          }
          100% {
            opacity: 0;
            transform: scale(0.15);
          }
        }

        @keyframes crt-boot-backdrop {
          0%, 53% {
            opacity: 1;
          }
          78% {
            opacity: 0.55;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes crt-boot-dot {
          0% {
            opacity: 0.2;
            transform: scale(0.35);
          }
          14% {
            opacity: 1;
            transform: scale(1.3);
          }
          22% {
            opacity: 1;
            transform: scale(1);
          }
          36% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes crt-boot-beam {
          0%, 19% {
            opacity: 0;
            transform: scaleX(0.01) scaleY(0.008);
          }
          22% {
            opacity: 1;
            transform: scaleX(0.04) scaleY(0.008);
          }
          52.9% {
            opacity: 1;
            transform: scaleX(1) scaleY(0.01);
          }
          68% {
            opacity: 0.75;
            transform: scaleX(1) scaleY(0.32);
          }
          100% {
            opacity: 0;
            transform: scaleX(1) scaleY(1);
          }
        }

        @keyframes crt-boot-flash {
          0%, 50% {
            opacity: 0;
            transform: scaleY(0.012);
          }
          58% {
            opacity: 0.92;
            transform: scaleY(0.45);
          }
          76% {
            opacity: 0.52;
            transform: scaleY(1);
          }
          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }

        @keyframes crt-boot-scanlines {
          0%, 50% {
            opacity: 0;
          }
          62% {
            opacity: 0.65;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes crt-reduced-fade {
          0% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
          }
        }

        .crt-scanlines-layer {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(82, 255, 213, 0.14) 0px,
            rgba(82, 255, 213, 0.14) 1px,
            rgba(0, 0, 0, 0.55) 1px,
            rgba(0, 0, 0, 0.55) 3px
          );
        }

        .crt-collapse-backdrop-anim {
          animation: crt-collapse-backdrop ${COLLAPSE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .crt-collapse-scanlines-anim {
          animation: crt-collapse-scanlines ${COLLAPSE_DURATION_MS}ms linear forwards;
        }
        .crt-collapse-frame-anim {
          animation: crt-collapse-frame ${COLLAPSE_DURATION_MS}ms cubic-bezier(0.35, 0, 0.2, 1) forwards;
        }
        .crt-collapse-beam-anim {
          animation: crt-collapse-beam ${COLLAPSE_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .crt-collapse-dot-anim {
          animation: crt-collapse-dot ${COLLAPSE_DURATION_MS}ms ease-out forwards;
        }

        .crt-boot-backdrop-anim {
          animation: crt-boot-backdrop ${BOOT_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .crt-boot-dot-anim {
          animation: crt-boot-dot ${BOOT_DURATION_MS}ms ease-out forwards;
        }
        .crt-boot-beam-anim {
          animation: crt-boot-beam ${BOOT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .crt-boot-flash-anim {
          animation: crt-boot-flash ${BOOT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .crt-boot-scanlines-anim {
          animation: crt-boot-scanlines ${BOOT_DURATION_MS}ms ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .crt-collapse-backdrop-anim,
          .crt-boot-backdrop-anim {
            animation: crt-reduced-fade ${REDUCED_MOTION_DURATION_MS}ms ease-out forwards;
          }
          .crt-collapse-scanlines-anim,
          .crt-collapse-frame-anim,
          .crt-collapse-beam-anim,
          .crt-collapse-dot-anim,
          .crt-boot-dot-anim,
          .crt-boot-beam-anim,
          .crt-boot-flash-anim,
          .crt-boot-scanlines-anim {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>

      {mode === "collapse" ? (
        <>
          <div className="crt-collapse-backdrop-anim absolute inset-0 bg-[#040308]" />
          <div className="crt-collapse-scanlines-anim crt-scanlines-layer absolute inset-0" />
          <div
            className="crt-collapse-frame-anim absolute inset-0 origin-center border-2 border-[#a8fff0]/80"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.22) 0%, rgba(82,255,213,0.18) 50%, rgba(16,8,34,0.35) 100%)",
              boxShadow:
                "inset 0 0 64px rgba(82,255,213,0.55), 0 0 36px rgba(255,255,255,0.65)",
            }}
          />
          <div
            className="crt-collapse-beam-anim absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 origin-center"
            style={{
              background:
                "linear-gradient(90deg, rgba(82,255,213,0.2) 0%, #7fffe6 18%, #ffffff 50%, #7fffe6 82%, rgba(82,255,213,0.2) 100%)",
              boxShadow:
                "0 0 28px 8px rgba(255,255,255,0.95), 0 0 56px 16px rgba(82,255,213,0.7)",
            }}
          />
          <div
            className="crt-collapse-dot-anim absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              boxShadow:
                "0 0 24px 10px rgba(255,255,255,1), 0 0 60px 24px rgba(82,255,213,0.85)",
            }}
          />
        </>
      ) : (
        <>
          <div className="crt-boot-backdrop-anim absolute inset-0 bg-[#040308]" />
          <div
            className="crt-boot-flash-anim absolute inset-0 origin-center"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(82,255,213,0.45) 45%, rgba(12,7,23,0.1) 100%)",
            }}
          />
          <div className="crt-boot-scanlines-anim crt-scanlines-layer absolute inset-0" />
          <div
            className="crt-boot-beam-anim absolute inset-x-0 top-1/2 h-20 -translate-y-1/2 origin-center"
            style={{
              background:
                "linear-gradient(90deg, rgba(82,255,213,0.35) 0%, #8bfff0 16%, #ffffff 50%, #8bfff0 84%, rgba(82,255,213,0.35) 100%)",
              boxShadow:
                "0 0 32px 10px rgba(255,255,255,0.95), 0 0 64px 20px rgba(82,255,213,0.75)",
            }}
          />
          <div
            className="crt-boot-dot-anim absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              boxShadow:
                "0 0 24px 10px rgba(255,255,255,1), 0 0 64px 24px rgba(82,255,213,0.9)",
            }}
          />
        </>
      )}
    </div>
  )
}

export function CrtBootOverlay({ children }: { children: ReactNode }) {
  const [crtBooting, setCrtBooting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem("luval-crt-boot") === "1") {
          sessionStorage.removeItem("luval-crt-boot")
          setCrtBooting(true)
        }
      } catch {
        // Ignore storage errors
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {children}
      <CrtPcTransition
        mode="boot"
        active={crtBooting}
        onComplete={() => setCrtBooting(false)}
      />
    </>
  )
}
