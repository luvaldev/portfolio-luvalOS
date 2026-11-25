import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";
import "./enchanted-books.css";
import "./normal-portfolio.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MinecraftJukeboxPlayer from "@/components/MinecraftJukeboxPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const silkscreen = Silkscreen({
  variable: "--font-pixel",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luis Valdenegro (Luval) — Ingeniería de Software, Redes, Ciberseguridad & IoT",
  description:
    "Portafolio de Luis Valdenegro Mondaca (@luvaldev). Estudiante de Ingeniería Civil en Informática y Telecomunicaciones (UDP). Desarrollo Full-Stack (Next.js, NestJS, PostgreSQL), Ciberseguridad Forense (Python, Scapy) y Sistemas Embebidos (C++, ESP32).",
  other: {
    "page-type": "software",
    "site-kind": "software",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-type="software"
      className={`${inter.variable} ${silkscreen.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans selection:bg-[#d4ff33] selection:text-[#090a0c]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <MinecraftJukeboxPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
