import Link from "next/link"
import DesktopEnvironment from "@/components/os/DesktopEnvironment"
import { PixelCommandBlockIcon, PixelTntBlockIcon } from "@/components/icons/PixelIcons"

export const metadata = {
  title: "luvalOS // Computador Arcade · Luis Valdenegro",
  description: "Terminal arcade pixel-art con minijuegos y Minecraft Web (solo disponible en PC).",
}

export default function OSPage() {
  return (
    <main className="w-full min-h-screen bg-[#0c0717] text-[#f5f0ff]">
      {/* Desktop PC: Full Interactive Minecraft Arcade Computer */}
      <div className="hidden md:block w-full h-screen overflow-hidden">
        <DesktopEnvironment />
      </div>

      {/* Mobile / Small Screens: Disabled with Minecraft Command Block Notice */}
      <div className="flex md:hidden min-h-screen flex-col items-center justify-center p-6 text-center bg-[#0c0717]">
        <div className="w-full max-w-sm border-4 border-[#1b102d] bg-[#160e26] p-6 shadow-[6px_6px_0_#05030a]">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3 border-2 border-[#3b255e] bg-[#22143a] px-4 py-2.5">
            <PixelCommandBlockIcon size={30} />
            <PixelTntBlockIcon size={26} />
          </div>
          <span className="mc-pixel-font block text-[10px] tracking-widest text-[#ffcf4d] mb-2">
            LUVAL@STATION // SOLO ESCRITORIO
          </span>
          <h1 className="mc-pixel-font text-xl font-bold text-[#ffffff] mb-3">
            Computador Arcade Solo Disponible en PC
          </h1>
          <p className="text-sm text-[#cfc5e3] leading-relaxed mb-6">
            El entorno interactivo con ventanas, teclado arcade y Minecraft Web requiere pantalla de computador para jugar y desplazarse correctamente.
          </p>
          <Link
            href="/?world=minecraft"
            className="mc-btn-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-xs mc-pixel-font font-bold w-full"
          >
            <span>← VOLVER AL PORTAFOLIO</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

