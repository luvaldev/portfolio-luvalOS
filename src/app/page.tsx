import DesktopEnvironment from "@/components/os/DesktopEnvironment"
import MobileView from "@/components/mobile/MobileView"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <div className="hidden md:block w-full h-screen overflow-hidden">
        <DesktopEnvironment />
      </div>
      <div className="block md:hidden w-full min-h-screen bg-[var(--color-os-bg)]">
        <MobileView />
      </div>
    </main>
  )
}
