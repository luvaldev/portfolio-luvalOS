"use client"

import { memo, useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"
import Github from "@/components/icons/Github"
import Linkedin from "@/components/icons/Linkedin"
import Mail from "@/components/icons/Mail"
import Sun from "@/components/icons/Sun"
import Moon from "@/components/icons/Moon"
import {
  PixelAnvilSprite,
  PixelArmorIcon,
  PixelArrowUpRightIcon,
  PixelBookSprite,
  PixelCheckIcon,
  PixelChestSprite,
  PixelChipSprite,
  PixelCloseIcon,
  PixelCommandBlockIcon,
  PixelCopyIcon,
  PixelCraftingTableIcon,
  PixelCubeSprite,
  PixelDiamondIcon,
  PixelEmeraldIcon,
  PixelEnderChestIcon,
  PixelExternalLinkIcon,
  PixelFurnaceIcon,
  PixelGrassBlockIcon,
  PixelHeartIcon,
  PixelHelmetSprite,
  PixelInstagramIcon,
  PixelOpenChestSprite,
  PixelRedstoneRepeaterIcon,
  PixelScrollIcon,
  PixelSearchIcon,
  PixelServerBarsIcon,
  PixelShieldIcon,
  PixelSwordCodeIcon,
  PixelTargetIcon,
  PixelTechBadge,
  PixelTntBlockIcon,
  PixelTorchIcon,
  PixelTrophyMedalIcon,
  PixelXpOrbIcon,
  getPixelTechKey,
} from "@/components/icons/PixelIcons"
import HeroPixelBackground from "@/components/HeroPixelBackground"
import {
  ActividadesArenaPattern,
  BastionOutpostPattern,
  BiomeTransitionStrip,
  CherryGrovePattern,
  SandstoneOutpostPattern,
  VillageBiomePattern,
} from "@/components/ModulePixelBackgrounds"
import EnchantedBookOrnament from "@/components/icons/EnchantedBookOrnament"
import PixelMenuIcon from "@/components/icons/PixelMenuIcon"
import CrtPcTransition from "@/components/transition/CrtPcTransition"

// ─── DATA DEFINITIONS ─────────────────────────────────────────────────────────

interface FlagshipProject {
  id: string
  year: number
  title: string
  category: string
  headline: string
  description: string
  architecture: string[]
  stack: string[]
  githubUrl: string
  githubIsPrivate?: boolean
  demoUrl?: string
  demoUnavailable?: boolean
  highlights: string[]
  badge: string
  color: string
}

const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: "forensic-email",
    year: 2025,
    title: "Forensic Email Marketing Analyzer",
    category: "Ciberseguridad Defensiva & Redes",
    headline: "Motor de análisis de infraestructura legítima de correo y mitigación de phishing en retail chileno.",
    description:
      "Plataforma de ciberseguridad defensiva que analiza registros DNS, cabeceras RFC 5322 y modelos de infraestructura en marcas de retail para detectar anomalías de spoofing y phishing. Introduce el algoritmo Email Trust Index (ETI) para cuantificar la autenticidad en tiempo real.",
    architecture: [
      "Extracción y parsing determinista de cabeceras RFC 5322 con Regex Engine en Python",
      "Auditoría automatizada de registros SPF para comprobar emisores autorizados",
      "Validación de claves DKIM y políticas DMARC restrictivas",
      "Algoritmo ETI (Email Trust Index) ponderado por reputación de ASN y coincidencia de Message-ID",
      "Core-framework para el análisis central de infraestructura de correo",
      "Data-curator: proceso ETL con hash SHA-256 de datos personales",
      "Extensión de navegador para Gmail y Outlook que integra la validación del remitente",
    ],
    stack: ["Python", "DNS / WHOIS", "Regex RFC 5322", "React", "Tailwind CSS", "Mbox ETL"],
    githubUrl: "https://github.com/Email-Infra-Forensics/core-framework",
    demoUrl: "https://emailtrust-validator.vercel.app/",
    highlights: ["Algoritmo ETI 0-100", "Mitigación de Spoofing", "Gmail y Outlook"],
    badge: "DESTACADO · SEGURIDAD",
    color: "#2ce5d8",
  },
  {
    id: "pulso-maq",
    year: 2026,
    title: "Pulso Maq",
    category: "SaaS Full-Stack & Telemetría Logística",
    headline: "Sistema de gestión de inventario, arriendo y control satelital GPS de maquinaria pesada.",
    description:
      "Plataforma de gestión de maquinaria pesada y equipos en arriendo. Su repositorio documenta inventario, disponibilidad, asignaciones a clientes, panel administrativo y seguimiento GPS como integración del producto.",
    architecture: [
      "Interfaz y rutas construidas con Next.js 16 App Router",
      "Rutas de API de Next.js para las funciones del servidor",
      "Modelo relacional en PostgreSQL con Prisma ORM y Supabase",
      "Gestión de inventario y contratos de arriendo de maquinaria",
      "Cálculo de costos operativos, depreciación y cobranzas",
      "Panel administrativo para métricas, finanzas y reportes de uso",
      "Integración de seguimiento GPS para ubicar equipos",
      "Interfaz adaptable con Framer Motion y variables CSS; formularios con React Hook Form y Zod",
    ],
    stack: ["TypeScript", "Next.js 16", "React 19", "Framer Motion", "Prisma ORM", "PostgreSQL", "Supabase", "React Hook Form", "Zod"],
    githubUrl: "https://github.com/luvaldev/pulso-maq",
    githubIsPrivate: true,
    demoUrl: "https://pulso-maq.vercel.app/",
    highlights: ["Telemetría GPS", "Mantenimiento Preventivo", "Next.js 16 Server Actions"],
    badge: "SAAS EN PRODUCCIÓN",
    color: "#d4ff33",
  },
  {
    id: "campusswap",
    year: 2026,
    title: "CampusSwap",
    category: "Plataforma Colaborativa Académica",
    headline: "Ecosistema universitario para el intercambio seguro y curado de recursos de estudio.",
    description:
      "Plataforma académica para estudiantes de la Universidad Diego Portales. El primer sprint implementa acceso institucional con Google OAuth2 y la base del dashboard; la moderación, el karma y la base de datos figuran en el roadmap del siguiente sprint.",
    architecture: [
      "Acceso con cuentas institucionales @udp.cl y @mail.udp.cl mediante NextAuth.js",
      "Dashboard base con navegación y diseño adaptable en Next.js App Router",
      "Roadmap: API modular con NestJS y Node.js, PostgreSQL y Prisma",
      "Roadmap: cuarentena de archivos y moderación comunitaria",
      "Roadmap: organización por Facultad, Carrera y Ramo, más karma por aportes",
    ],
    stack: ["TypeScript", "Next.js", "React", "Tailwind CSS", "NextAuth.js", "Google OAuth2", "NestJS (planificado)", "PostgreSQL (planificado)"],
    githubUrl: "https://github.com/luvaldev/CampusSwap",
    demoUnavailable: true,
    highlights: ["Exclusivo UDP", "Sistema de Karma", "Arquitectura NestJS"],
    badge: "COMUNIDAD UDP",
    color: "#ff5226",
  },
  {
    id: "cercasco",
    year: 2025,
    title: "Cercasco",
    category: "IoT, Hardware Embebido & Seguridad Vial",
    headline: "Casco inteligente con radar de proximidad posterior y alertas hápticas en manillar.",
    description:
      "Proyecto académico de seguridad para ciclistas. La documentación describe una arquitectura con ESP32-CAM, sensores de distancia, motor vibrador, LEDs y aplicación móvil para alertar sobre vehículos que se aproximan por detrás.",
    architecture: [
      "Arquitectura documentada: firmware C/C++ para ESP32 y ESP32-CAM, señalado como planificado en el README",
      "Medición de proximidad trasera con sensores de tiempo de vuelo (ToF)",
      "Primera alerta háptica: vibración suave cuando la distancia baja de 2 metros",
      "Alerta crítica bajo 1,5 metros con vibración y señal estroboscópica de 500 lm",
      "Carcasas aerodinámicas modeladas en Fusion 360 e impresas en 3D",
      "Telemetría BLE y Wi-Fi hacia la aplicación móvil complementaria",
    ],
    stack: ["C++ (planificado)", "Dart", "Java", "ESP32-CAM", "Sensores ToF", "Flutter", "Fusion 360", "BLE"],
    githubUrl: "https://github.com/luvaldev/cercasco",
    demoUrl: "https://cercasco.vercel.app/",
    highlights: ["Alerta Háptica Manillar", "C++ Embebido", "Hardware Abierto"],
    badge: "HARDWARE & IOT",
    color: "#00d4ff",
  },
]

interface RepositoryItem {
  id: string
  name: string
  year: number
  category: "saas" | "security" | "iot" | "academic"
  language: string
  stars: number
  description: string
  href: string
  tags: string[]
}

const REPOSITORIES: RepositoryItem[] = [
  {
    id: "forensic-email",
    name: "Forensic-Email-Marketing-Analyzer",
    year: 2025,
    category: "security",
    language: "Python",
    stars: 12,
    description: "Análisis forense de infraestructura de correo (SPF, DKIM, DMARC, ASN) y cálculo de reputación ETI.",
    href: "https://github.com/Email-Infra-Forensics/core-framework",
    tags: ["Ciberseguridad", "DNS", "Regex", "RFC 5322"],
  },
  {
    id: "pulso-maq",
    name: "pulso-maq",
    year: 2026,
    category: "saas",
    language: "TypeScript",
    stars: 8,
    description: "Plataforma SaaS para arriendo de maquinaria pesada, control de inventario y monitoreo GPS.",
    href: "https://github.com/luvaldev/pulso-maq",
    tags: ["Next.js 16", "Prisma", "PostgreSQL", "Supabase"],
  },
  {
    id: "campusswap",
    name: "CampusSwap",
    year: 2026,
    category: "academic",
    language: "TypeScript",
    stars: 14,
    description: "Plataforma universitaria colaborativa de apuntes con autenticación institucional y karma points.",
    href: "https://github.com/luvaldev/CampusSwap",
    tags: ["Next.js", "NestJS", "NextAuth", "PostgreSQL"],
  },
  {
    id: "ivis-biotech",
    name: "Ivis Biotech",
    year: 2026,
    category: "saas",
    language: "TypeScript",
    stars: 0,
    description: "Sitio y tienda de Neurobiotic Balance con visuales 3D, checkout y panel administrativo.",
    href: "https://github.com/luvaldev/ivis-biotech",
    tags: ["Next.js 16", "Three.js", "Webpay", "Mercado Pago"],
  },
  {
    id: "cercasco",
    name: "cercasco",
    year: 2025,
    category: "iot",
    language: "C++",
    stars: 9,
    description: "Casco de seguridad para ciclistas con radar de proximidad ToF, alerta háptica y baliza LED.",
    href: "https://github.com/luvaldev/cercasco",
    tags: ["ESP32", "C++", "FreeRTOS", "IoT", "BLE"],
  },
  {
    id: "scapy-traffic",
    name: "http-scapy-traffic-analysis",
    year: 2025,
    category: "security",
    language: "Python",
    stars: 7,
    description: "Laboratorio Docker con Apache, cliente Python y Scapy para captura y pruebas de tráfico HTTP alterado.",
    href: "https://github.com/luvaldev/http-scapy-traffic-analysis",
    tags: ["Scapy", "Docker", "Apache", "Redes"],
  },
  {
    id: "os-internals",
    name: "OS-Internals-Practice",
    year: 2025,
    category: "academic",
    language: "C++",
    stars: 11,
    description: "Concurrencia, sincronización de hilos, mutexes (std::mutex) y memoria compartida en C++11.",
    href: "https://github.com/luvaldev/OS-Internals-Practice",
    tags: ["C++11", "POSIX", "Multithreading", "Sistemas Operativos"],
  },
  {
    id: "core-framework",
    name: "Email-Infra-Forensics/core-framework",
    year: 2025,
    category: "security",
    language: "Python",
    stars: 6,
    description: "Motor central en Python para parsing de cabeceras Received y cálculo del algoritmo Email Trust Index.",
    href: "https://github.com/Email-Infra-Forensics/core-framework",
    tags: ["Python", "ETI Engine", "Forense"],
  },
  {
    id: "thunderbird-validator",
    name: "Email-Infra-Forensics/thunderbird-validator",
    year: 2025,
    category: "security",
    language: "JavaScript",
    stars: 5,
    description: "Extensión Manifest V3 para Gmail y Outlook que consulta un motor ETI local.",
    href: "https://github.com/Email-Infra-Forensics/thunderbird-validator",
    tags: ["Manifest V3", "Gmail", "Outlook", "Seguridad"],
  },
  {
    id: "casino-platform",
    name: "casino-management-platform",
    year: 2025,
    category: "saas",
    language: "JavaScript",
    stars: 6,
    description: "Evolución arquitectónica en 3 fases: Monolito -> Cliente ES6 -> REST API con Express y JWT.",
    href: "https://github.com/luvaldev/casino-management-platform",
    tags: ["Express", "JWT", "REST API", "Arquitectura"],
  },
  {
    id: "survivaldub-core",
    name: "SurvivalDubCore",
    year: 2024,
    category: "academic",
    language: "Java",
    stars: 18,
    description: "Utilidades Java para la red SurvivalDub: conexión entre servidores, moderación y configuración remota.",
    href: "https://github.com/survivaldub/SurvivalDubCore",
    tags: ["Java", "Velocity", "Spigot", "RedisDub"],
  },
  {
    id: "study-resources",
    name: "programming-study-resources",
    year: 2025,
    category: "academic",
    language: "Markdown",
    stars: 15,
    description: "Resúmenes y recursos de aprendizaje organizados en áreas de C++, Java y Python.",
    href: "https://github.com/luvaldev/programming-study-resources",
    tags: ["C++", "Java", "Python"],
  },
]

const CATEGORY_LABELS: Record<RepositoryItem["category"], string> = {
  security: "Ciberseguridad y redes",
  saas: "Web y SaaS",
  iot: "IoT y sistemas embebidos",
  academic: "Académico y sistemas",
}

const REPOSITORY_DETAILS: Record<string, Pick<FlagshipProject, "description" | "architecture" | "stack" | "highlights">> = {
  "ivis-biotech": {
    description: "Plataforma web para Ivis Biotech y su producto Neurobiotic Balance. Combina una experiencia de producto con escenas 3D, contenido educativo, carrito y checkout; el repositorio también contiene rutas de pago y módulos de operación administrativa.",
    architecture: [
      "La portada de Next.js App Router reúne secciones de producto, ciencia, preguntas frecuentes, blog, testimonios, precios y un cuestionario interactivo.",
      "Las escenas y representaciones del frasco usan Three.js con React Three Fiber y Drei.",
      "El carrito y el checkout organizan productos, datos de despacho y el flujo de compra.",
      "Las rutas de Webpay crean y confirman transacciones; el proyecto también incluye una ruta para preferencias y webhook de Mercado Pago.",
      "El esquema Prisma modela pedidos, estados de pago y envío, registros del sistema y perfiles de administración sobre PostgreSQL.",
      "El área administrativa separa módulos para pedidos, envíos, analítica, registros y perfil.",
      "El frontend utiliza Framer Motion y GSAP para movimiento, React Hook Form y Zod para formularios, y Zustand para estado compartido.",
    ],
    stack: ["TypeScript", "Next.js 16", "React 19", "Three.js", "React Three Fiber", "GSAP", "Framer Motion", "Prisma", "PostgreSQL", "Supabase", "Webpay", "Mercado Pago", "Zod"],
    highlights: ["Producto en 3D", "Checkout multimedio de pago", "Administración de pedidos"],
  },
  "scapy-traffic": {
    description: "Laboratorio reproducible con Docker Compose para observar cómo responde Apache a tráfico HTTP normal y a solicitudes alteradas. Separa el servidor, un cliente Python y un contenedor Scapy dedicado a captura y pruebas de paquetes.",
    architecture: [
      "Docker Compose levanta un servidor Apache que publica una página HTML en el puerto 8080.",
      "Un cliente Python con urllib3 envía una petición GET y comprueba la respuesta del servidor.",
      "El contenedor Scapy usa libpcap y tcpdump para capturar paquetes HTTP mediante sniffer.py.",
      "injector.py prueba una URL de 5000 caracteres y un método HTTP alterado.",
      "modifier.py envía variantes de Host, User-Agent y método DELETE para observar respuestas inesperadas.",
      "La documentación incluye un filtro de Wireshark para inspeccionar el tráfico del puerto 8080.",
    ],
    stack: ["Python", "Scapy", "Docker Compose", "Apache HTTP Server", "urllib3", "Wireshark"],
    highlights: ["Tres servicios aislados", "Captura de paquetes", "Pruebas HTTP alteradas"],
  },
  "os-internals": {
    description: "Colección académica de tres actividades de sistemas operativos: comunicación entre procesos, sincronización de hilos y simulación de memoria virtual. Cada entrega tiene su propio directorio y documentación.",
    architecture: [
      "Sistemas-t1 implementa un chat comunitario con procesos y tuberías FIFO.",
      "Sistemas-t2 presenta una simulación tipo Doom para trabajar con hilos y mutex.",
      "Sistemas-t3 aborda paginación y swap mediante un simulador de memoria.",
      "Las actividades se compilan en Linux o WSL con g++ compatible con C++17 y herramientas make/build-essential.",
    ],
    stack: ["C++17", "POSIX", "FIFOs", "Threads", "Mutex", "Paginación", "Swap"],
    highlights: ["Procesos y FIFOs", "Hilos y mutex", "Memoria virtual"],
  },
  "core-framework": {
    description: "Núcleo forense Python del Email Trust Index. Analiza archivos .eml o cabeceras de correo, enriquece la ruta con RDAP/WHOIS y calcula una puntuación de confianza mediante pesos configurables.",
    architecture: [
      "Modelos Pydantic definen los contratos de Hop, EmailHeaders y TrustScore.",
      "El módulo traceroute procesa cabeceras Received y detecta anomalías en la ruta del mensaje.",
      "Enrichment consulta RDAP/WHOIS y ASN con una caché SQLite.",
      "Auth interpreta Authentication-Results para SPF, DKIM y DMARC; msgid extrae la firma organizacional.",
      "Scoring calcula ETI con pesos editables en weights.yaml: ASN 40 %, Message-ID 30 % y autenticación 30 %.",
      "Expone una CLI con Typer y Rich, y una API FastAPI con POST /analyze.",
    ],
    stack: ["Python", "Pydantic", "Typer", "Rich", "FastAPI", "RDAP / WHOIS", "SQLite", "PyYAML"],
    highlights: ["CLI y API", "Pesos configurables", "Caché RDAP"],
  },
  "thunderbird-validator": {
    description: "Extensión Manifest V3 para navegadores web que analiza mensajes de Gmail y Outlook con el motor ETI local. Incluye ventana emergente, panel React, análisis manual de .eml y notificaciones del resultado.",
    architecture: [
      "El manifiesto registra scripts de contenido en mail.google.com y outlook.live.com.",
      "Un service worker recupera el mensaje o sus cabeceras y envía el contenido a la API local POST /analyze.",
      "La ventana emergente permite analizar la pestaña activa, pegar cabeceras o cargar un archivo .eml.",
      "El panel React muestra resultados detallados y la extensión puede notificar la puntuación ETI.",
      "La preferencia de tema claro u oscuro se guarda con chrome.storage.local.",
    ],
    stack: ["JavaScript", "Manifest V3", "Chrome Extensions API", "React", "Gmail", "Outlook", "FastAPI"],
    highlights: ["Gmail y Outlook", "Análisis de .eml", "Notificaciones ETI"],
  },
  "casino-platform": {
    description: "Proyecto web desarrollado en tres etapas que evoluciona desde vistas Handlebars a un cliente JavaScript modular y una API REST. Cubre cuentas, roles, saldo, productos, compras y administración.",
    architecture: [
      "Fase I: servidor Express con vistas Handlebars, registro, acceso y panel administrativo.",
      "Fase II: cliente HTML y JavaScript ES6 dividido en módulos de perfil, carrito, productos y administración.",
      "La segunda fase conecta el cliente con el backend mediante Fetch API.",
      "Fase III: API REST con rutas y controladores separados para usuarios, autenticación, productos, compras y carrito.",
      "Persistencia SQLite3; autenticación JWT, bcrypt y roles para operaciones administrativas.",
      "El repositorio incluye una especificación api.yaml para la API.",
    ],
    stack: ["JavaScript", "Node.js", "Express", "Handlebars", "SQLite3", "JWT", "bcrypt", "Fetch API"],
    highlights: ["Tres fases", "API REST", "Roles y compras"],
  },
  "survivaldub-core": {
    description: "Conjunto de utilidades Java para la red de servidores SurvivalDub. Su README documenta conexión global entre servidores, herramientas de moderación, perfiles, menús y configuración remota.",
    architecture: [
      "La conexión global utiliza RedisDub para coordinar los servidores de la red.",
      "El acceso del personal incorpora contraseñas y autenticación de dos factores.",
      "Incluye comandos y permisos para perfiles, grupos, reportes, monedas y selección de servidores.",
      "La versión Velocity documenta comandos para movilidad entre modalidades y comunicación del staff.",
      "Hooks integran placeholders, vanish y regiones WorldGuard; la configuración remota administra selector y actualizaciones.",
      "El proyecto se empaqueta con Maven como JAR para instalarlo en los plugins del servidor.",
    ],
    stack: ["Java", "Velocity", "Spigot", "RedisDub", "Maven", "HikariCP", "WorldGuard"],
    highlights: ["Red multiserver", "Seguridad staff", "Configuración remota"],
  },
  "study-resources": {
    description: "Repositorio de resúmenes y recursos de programación para apoyar el estudio de la comunidad. Su estructura publica áreas de aprendizaje para C++, Java y Python.",
    architecture: [
      "El README presenta el repositorio como una colección concisa de material de aprendizaje.",
      "La raíz organiza los recursos en áreas c-plusplus-learning, java-learning y python-learning.",
      "El contenido está orientado a reforzar conceptos de lenguajes y facilitar su consulta por la comunidad.",
    ],
    stack: ["Markdown", "C++", "Java", "Python"],
    highlights: ["C++", "Java", "Python"],
  },
}

const ALL_PROJECTS: FlagshipProject[] = REPOSITORIES.map((repo) => {
  const featured = FLAGSHIP_PROJECTS.find((project) => project.id === repo.id)
  if (featured) return { ...featured, year: repo.year, githubUrl: repo.href }
  return {
    id: repo.id,
    year: repo.year,
    title: repo.name,
    category: CATEGORY_LABELS[repo.category],
    headline: repo.description,
    description: REPOSITORY_DETAILS[repo.id]?.description ?? repo.description,
    architecture: REPOSITORY_DETAILS[repo.id]?.architecture ?? [repo.description],
    stack: REPOSITORY_DETAILS[repo.id]?.stack ?? [...new Set([repo.language, ...repo.tags])],
    githubUrl: repo.href,
    githubIsPrivate: repo.id === "ivis-biotech" || repo.id === "survivaldub-core",
    demoUrl: repo.id === "ivis-biotech" ? "https://ivisbiotech.vercel.app/" : undefined,
    highlights: REPOSITORY_DETAILS[repo.id]?.highlights ?? repo.tags.slice(0, 3),
    badge: CATEGORY_LABELS[repo.category],
    color: "#8b3029",
  }
}).sort((a, b) => a.year - b.year)

const LANGUAGE_MODULES = [
  { name: "Python", techKey: "python", matches: (value: string) => /Python/i.test(value) },
  { name: "TypeScript", techKey: "ts", matches: (value: string) => /TypeScript/i.test(value) },
  { name: "JavaScript", techKey: "js", matches: (value: string) => /^JavaScript$/i.test(value) },
  { name: "C++", techKey: "cpp", matches: (value: string) => /C\+\+/i.test(value) },
  { name: "Java", techKey: "java", matches: (value: string) => /^Java$/i.test(value) },
  { name: "Dart", techKey: "dart", matches: (value: string) => /Dart/i.test(value) },
  { name: "Markdown", techKey: "markdown", matches: (value: string) => /^Markdown$/i.test(value) },
]

const PIXEL_TOOL_PATTERN =
  /React|Tailwind|NextAuth|Next\.js|Framer Motion|Prisma|PostgreSQL|Supabase|Zod|Google OAuth|NestJS|ESP32|Flutter|Fusion 360|Three\.js|GSAP|Mercado Pago|Webpay|Docker|Apache HTTP|Wireshark|Scapy|Pydantic|Typer|Rich|FastAPI|SQLite|PyYAML|Manifest V3|Chrome Extensions|Gmail|Outlook|Node\.js|Express|Handlebars|Maven|RedisDub|JWT|bcrypt|Spigot|Velocity|WorldGuard|HikariCP|FreeRTOS|BLE|DNS|RFC/i

const isPixelToolTechnology = (value: string) => PIXEL_TOOL_PATTERN.test(value)

const projectLanguages = (project: FlagshipProject) => {
  const sources = [REPOSITORIES.find((repo) => repo.id === project.id)?.language ?? "", ...project.stack]
  return LANGUAGE_MODULES.filter((language) => sources.some(language.matches))
}

const isLanguageTechnology = (value: string) => LANGUAGE_MODULES.some((language) => language.matches(value))

interface StackGroup {
  category: string
  icon: typeof PixelSwordCodeIcon
  accent: string
  fullWidth?: boolean
  items: { techKey: string; name: string; role: string }[]
}

const STACK_MATRIX: StackGroup[] = [
  {
    category: "Lenguajes de Programación",
    icon: PixelSwordCodeIcon,
    accent: "#2ee86c",
    items: [
      { techKey: "ts", name: "TypeScript", role: "Sistemas web & APIs estrictamente tipadas" },
      { techKey: "cpp", name: "C++ (C++11/17)", role: "Concurrencia, gestión de memoria & SO" },
      { techKey: "python", name: "Python", role: "Forense, análisis de paquetes & scripting" },
      { techKey: "sql", name: "SQL (PostgreSQL)", role: "Modelado relacional y transacciones" },
      { techKey: "js", name: "JavaScript (ESNext)", role: "Full-stack runtime & frontends" },
      { techKey: "bash", name: "Bash / Shell", role: "Automatización Linux y contenedores" },
      { techKey: "dart", name: "Dart", role: "Prototipado de clientes móviles IoT" },
    ],
  },
  {
    category: "Frontend & Sistemas Interactivos",
    icon: PixelCraftingTableIcon,
    accent: "#ff75b5",
    items: [
      { techKey: "nextjs", name: "Next.js 16 (App Router)", role: "Arquitecturas SSR, RSC y Server Actions" },
      { techKey: "react", name: "React 19", role: "Componentes reactivos e interactividad" },
      { techKey: "ui", name: "Arquitectura de Componentes & UI", role: "Sistemas de diseño pixel-perfect y accesibles" },
      { techKey: "gsap", name: "GSAP & ScrollTrigger", role: "Animaciones coreografiadas de scroll" },
      { techKey: "tailwind", name: "Tailwind CSS v4", role: "Diseño por tokens y sistemas de diseño" },
      { techKey: "motion", name: "Framer Motion", role: "Transiciones de interfaz y microinteracciones" },
    ],
  },
  {
    category: "Backend, APIs & Datos",
    icon: PixelEnderChestIcon,
    accent: "#2ce5d8",
    items: [
      { techKey: "node", name: "Node.js & Express", role: "Microservicios REST y autenticación JWT" },
      { techKey: "nest", name: "NestJS", role: "Arquitectura modular empresarial y DI" },
      { techKey: "postgres", name: "PostgreSQL", role: "Base de datos primaria para SaaS" },
      { techKey: "prisma", name: "Prisma ORM", role: "Migraciones y acceso a datos tipado" },
      { techKey: "supabase", name: "Supabase", role: "Autenticación, Storage y DB serverless" },
      { techKey: "nextauth", name: "NextAuth.js", role: "OAuth2 institucional y JWT session flows" },
    ],
  },
  {
    category: "Redes, Sistemas & Hardware",
    icon: PixelRedstoneRepeaterIcon,
    accent: "#ffcf4d",
    items: [
      { techKey: "scapy", name: "Scapy & Wireshark", role: "Inspección profunda de paquetes y sniffing" },
      { techKey: "linux", name: "Linux (Debian / Arch)", role: "Entorno nativo de trabajo y servidores" },
      { techKey: "esp32", name: "ESP32 & Arduino C++", role: "Sistemas embebidos, ToF y actuadores" },
      { techKey: "docker", name: "Docker & Docker Compose", role: "Laboratorios aislados y despliegues" },
      { techKey: "rfc", name: "Protocolos RFC (DNS, SMTP)", role: "Forense de infraestructura y seguridad" },
      { techKey: "git", name: "Git & GitHub CI", role: "Flujos de colaboración y control de versiones" },
    ],
  },
  {
    category: "IA, Subagentes & Automatización Inteligente",
    icon: PixelCommandBlockIcon,
    accent: "#c084fc",
    fullWidth: true,
    items: [
      {
        techKey: "ai-subagents",
        name: "Subagentes & Orquestación",
        role: "Coordinación multi-agente en paralelo, delegación por contexto y supervisión autónoma",
      },
      {
        techKey: "ai-mcp",
        name: "MCP, Skills & Control Operativo",
        role: "Integración de servidores MCP, tool-calling determinista y flujos con validación humana",
      },
      {
        techKey: "ai-security",
        name: "Seguridad IA & Guardrails",
        role: "Aislamiento de secretos, sandboxing de comandos y prevención de prompt injection",
      },
      {
        techKey: "ai-ideation",
        name: "Implementación Rápida de Ideas",
        role: "De concepto técnico a prototipos, sistemas y despliegue productivo asistido por IA",
      },
      {
        techKey: "ai-rag",
        name: "Ingeniería de Contexto & Flujos LLM",
        role: "Estructuración de memoria técnica, prompts modulares y automatización CI asistida",
      },
      {
        techKey: "ai-eval",
        name: "Evaluación & Control de Calidad IA",
        role: "Revisión de diffs generados, pruebas automatizadas (tsc/build) y auditoría continua",
      },
    ],
  },
]

interface CtfEvent {
  date: string
  name: string
  team: string
  rank: number
  placement: string
  url: string
  ctaLabel: string
}

const CTF_EVENTS: CtfEvent[] = [
  {
    date: "11 DE NOVIEMBRE DE 2026",
    name: "CTF UDP",
    team: "Inside",
    rank: 3,
    placement: "3.° de 19 equipos",
    url: "https://ctfd-udp.my-ctf.com/scoreboard",
    ctaLabel: "Ver marcador",
  },
  {
    date: "10 DE JUNIO DE 2026",
    name: "CTF UDP–SEK",
    team: "Inside",
    rank: 4,
    placement: "4.° de 24 equipos",
    url: "https://eit.udp.cl/capture-the-flag-se-consolida-como-una-competencia-con-alta-participacion-estudiantil/",
    ctaLabel: "Sobre el evento",
  },
  {
    date: "11 DE JUNIO DE 2025",
    name: "CTF UDP–Dreamlab",
    team: "INSAID",
    rank: 6,
    placement: "6.° de 13 equipos",
    url: "https://eit.udp.cl/exitosa-segunda-version-de-evento-capture-the-flag-udp-dreamlab/",
    ctaLabel: "Sobre el evento",
  },
]

const MANIFESTO_RAW_WORDS: Array<{ text: string; accent?: boolean }> = [
  { text: "No " },
  { text: "construyo " },
  { text: "demos " },
  { text: "superficiales. " },
  { text: "Conecto " },
  { text: "hardware, ", accent: true },
  { text: "protocolos ", accent: true },
  { text: "de ", accent: true },
  { text: "red ", accent: true },
  { text: "y " },
  { text: "software " },
  { text: "de " },
  { text: "alta " },
  { text: "precisión " },
  { text: "con " },
  { text: "disciplina " },
  { text: "técnica: " },
  { text: "desde " },
  { text: "punteros " },
  { text: "en " },
  { text: "C++ ", accent: true },
  { text: "y " },
  { text: "paquetes " },
  { text: "en " },
  { text: "Scapy, ", accent: true },
  { text: "hasta " },
  { text: "arquitecturas ", accent: true },
  { text: "distribuidas ", accent: true },
  { text: "y " },
  { text: "aplicaciones " },
  { text: "web " },
  { text: "de " },
  { text: "alto ", accent: true },
  { text: "rendimiento.", accent: true },
]

const MANIFESTO_TOKENS = (() => {
  let cursor = 0
  return MANIFESTO_RAW_WORDS.map((word) => {
    const start = cursor
    cursor += word.text.length
    return { ...word, start }
  })
})()

const MANIFESTO_TOTAL_CHARS = MANIFESTO_TOKENS.reduce((acc, word) => acc + word.text.length, 0)

const ManifestoScrollBoard = memo(function ManifestoScrollBoard() {
  const manifestoRef = useRef<HTMLDivElement | null>(null)
  const [litCharCount, setLitCharCount] = useState(0)

  // ── Reading-speed character illumination for #manifiesto on scroll ──
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const immediate = setTimeout(() => setLitCharCount(MANIFESTO_TOTAL_CHARS), 0)
      return () => clearTimeout(immediate)
    }

    let rafId: number | null = null
    let targetChars = 0
    let displayedChars = 0

    const stepReveal = () => {
      if (displayedChars < targetChars) {
        displayedChars = Math.min(targetChars, displayedChars + 3)
        setLitCharCount(displayedChars)
        rafId = requestAnimationFrame(stepReveal)
      } else {
        rafId = null
      }
    }

    const updateProgress = () => {
      const el = manifestoRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const startY = vh * 0.88
      const endY = vh * 0.24
      const raw = (startY - rect.top) / Math.max(1, startY - endY)
      const clamped = Math.max(0, Math.min(1, raw))
      targetChars = Math.round(clamped * MANIFESTO_TOTAL_CHARS)

      if (targetChars < displayedChars) {
        displayedChars = targetChars
        setLitCharCount(displayedChars)
      } else if (targetChars > displayedChars && rafId === null) {
        rafId = requestAnimationFrame(stepReveal)
      }
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={manifestoRef} className="mc-manifesto-board mb-10">
      <h2 className="mc-pixel-font text-2xl sm:text-4xl font-bold leading-[1.32] tracking-tight">
        {MANIFESTO_TOKENS.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-pre">
            {Array.from(word.text).map((char, charOffset) => {
              const globalIndex = word.start + charOffset
              const isLit = globalIndex < litCharCount
              return (
                <span
                  key={charOffset}
                  className={`mc-manifesto-char${word.accent ? " is-accent" : ""}${isLit ? " is-lit" : ""}`}
                >
                  {char}
                </span>
              )
            })}
          </span>
        ))}
      </h2>
    </div>
  )
})

interface TimelineLink {
  label: string
  url: string
  kind: "github" | "web"
}

interface TimelineItem {
  id: string
  period: string
  role: string
  institution: string
  description: string
  badge: string
  chestTitle: string
  lootSummary: string
  details: string[]
  techStack: string[]
  links?: TimelineLink[]
}

const TIMELINE: TimelineItem[] = [
  {
    id: "pulso-maq",
    period: "Julio 2026 — Actualidad",
    role: "IT & Software Consultant | Web · Apps · Infraestructura · Soporte",
    institution: "Pulso Maq · Chile",
    description:
      "Desarrollo actual de plataforma digital, arquitectura de sistemas web, automatización operativa y soporte integral de infraestructura tecnológica para maquinaria industrial.",
    badge: "En curso",
    chestTitle: "COFRE DE MISIÓN · PULSO MAQ",
    lootSummary: "Consultoría TI integral, desarrollo web productivo, automatización y continuidad operativa.",
    details: [
      "Diseño y desarrollo continuo de plataforma web corporativa, presencia digital y flujos de contacto comercial.",
      "Integración de automatizaciones internas y soporte técnico de infraestructura para operación de maquinaria.",
      "Mantenimiento evolutivo, optimización de rendimiento y monitoreo de disponibilidad de servicios digitales.",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Linux"],
  },
  {
    id: "ivis-biotech",
    period: "Julio 2026 — Octubre 2026",
    role: "Full-Stack Developer | E-Commerce, 3D Web & Pasarelas de Pago",
    institution: "Ivis Biotech · Chile",
    description:
      "Desarrollo concluido en Octubre 2026 de plataforma e-commerce científica de alto impacto con experiencia 3D interactiva, catálogo e integración completa de pagos en línea.",
    badge: "Concluido · Oct 2026",
    chestTitle: "COFRE DE MISIÓN · IVIS BIOTECH",
    lootSummary: "Plataforma e-commerce biotecnológica full-stack finalizada con visor 3D e infraestructura de pagos.",
    details: [
      "Arquitectura full-stack en Next.js App Router, Prisma ORM y PostgreSQL para gestión de catálogo científico y órdenes.",
      "Integración de visualización 3D interactiva en navegador con Three.js / React Three Fiber y animaciones GSAP.",
      "Implementación de checkout seguro con Transbank Webpay Plus y Mercado Pago, validado con Zod y React Hook Form.",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Three.js", "Webpay", "Mercado Pago", "Tailwind CSS"],
    links: [
      { label: "Repositorio GitHub (privado)", url: "https://github.com/luvaldev/ivis-biotech", kind: "github" },
      { label: "Sitio web en vivo", url: "https://ivisbiotech.vercel.app/", kind: "web" },
    ],
  },
  {
    id: "practica-forensics",
    period: "Junio 2026 — Agosto 2026 · Activo",
    role: "Práctica Laboral I & Cofundador — Email Infra Forensics",
    institution: "Universidad Diego Portales · Prof. Guía Nicolás Boettcher",
    description:
      "Caracterización forense y análisis de infraestructura de correos masivos en Chile: 21.183 correos capturados vía Zero-Payload IMAP, 62 líneas base sectoriales (OrgSignature) y motor ETI con 98,40% de sensibilidad y 0,81% FPR.",
    badge: "PRÁCTICA I & INVESTIGACIÓN",
    chestTitle: "COFRE DE BOTÍN · PRÁCTICA I & EMAIL-INFRA-FORENSICS",
    lootSummary: "Sistema completo de forense de infraestructura de correo: ETL Zero-Payload, baselines DNS/RDAP y validador ETI en tiempo real.",
    details: [
      "Adquisición Zero-Payload vía IMAP IDLE / FETCH (BODY.PEEK[HEADER]) logrando 21.183 correos reales normalizados sin descargar cuerpos ni adjuntos.",
      "Anonimización HMAC-SHA256 irreversible cumpliendo Ley 19.628 y Ley 21.663 sobre protección de datos e infraestructura crítica en Chile.",
      "Construcción de 62 líneas base organizacionales (OrgSignature) distribuidas en 7 sectores productivos chilenos (banca, retail, salud, telecomunicaciones, tecnología, universidades y gobierno).",
      "Modelo heurístico Email Trust Index (ETI) determinista < 5 ms offline en SQLite: 40% ASN/RDAP + 30% Message-ID + 30% alineación SPF/DKIM/DMARC.",
      "Validación Phase 3 sobre 25.683 correos (4.500 ataques adversariales): 98,40% Recall (Sensibilidad), 99,19% Specificity, 96,28% Precision, 97,33% F1-Score y 0,81% FPR.",
    ],
    techStack: ["Python", "SQLite", "FastAPI", "TypeScript", "React", "Chrome Extensions", "Gmail", "Outlook", "RFC 5322", "Wireshark"],
    links: [
      { label: "Organización GitHub", url: "https://github.com/Email-Infra-Forensics", kind: "github" },
      { label: "Repo core-framework", url: "https://github.com/Email-Infra-Forensics/core-framework", kind: "github" },
      { label: "Validador Web en Vivo", url: "https://emailtrust-validator.vercel.app/", kind: "web" },
      { label: "Portal web del proyecto", url: "https://github.com/Email-Infra-Forensics/web-portal", kind: "github" },
    ],
  },
  {
    id: "udp-degree",
    period: "2023 — Actualidad",
    role: "Estudiante de Ingeniería Civil en Informática y Telecomunicaciones",
    institution: "Universidad Diego Portales (UDP), Santiago de Chile",
    description:
      "Formación rigurosa en ciencias de la computación, arquitectura de computadores, telecomunicaciones, redes de datos, sistemas operativos, bases de datos y electrónica aplicada.",
    badge: "GRADO UNIVERSITARIO",
    chestTitle: "COFRE ACADÉMICO · INGENIERÍA CIVIL UDP",
    lootSummary: "Base sólida en sistemas de bajo nivel, redes TCP/IP, telemática e ingeniería de software.",
    details: [
      "Línea troncal en redes de computadores, enrutamiento, seguridad defensiva (CTFs EIT-UDP) y protocolos de Internet.",
      "Desarrollo de sistemas en C/C++, Java, Python y TypeScript aplicados a simulación, embebidos ESP32 y plataformas distribuidas.",
      "Participación activa en investigación aplicada y ayudantías de programación para estudiantes de primer año.",
    ],
    techStack: ["C++", "Python", "TypeScript", "Java", "SQL", "Linux", "ESP32", "Docker"],
  },
  {
    id: "hites-retail",
    period: "Julio 2024 — Actualidad",
    role: "Promotor de Ventas & Especialista en Tecnología",
    institution: "Empresas Hites S.A., Santiago · Solo información",
    description:
      "Asesoría técnica presencial a clientes en selección de hardware de cómputo, laptops, periféricos y arquitecturas de procesadores, traduciendo especificaciones en recomendaciones reales.",
    badge: "EXPERIENCIA LABORAL",
    chestTitle: "COFRE DE EXPERIENCIA · EMPRESAS HITES S.A.",
    lootSummary: "Asesoría técnica especializada en hardware de consumo, diagnóstico comparativo y comunicación con cliente.",
    details: [
      "Evaluación comparativa de laptops, CPUs (Intel/AMD), GPUs, memoria RAM, almacenamiento NVMe y periféricos según carga de trabajo del usuario.",
      "Resolución en terreno de dudas sobre compatibilidad de hardware, conectividad, autonomía térmica y relación precio/rendimiento.",
      "Comunicación técnica clara para perfiles no técnicos, fortaleciendo habilidades blandas y orientación a resultados en retail.",
    ],
    techStack: ["Linux", "Docker", "Git", "RFC"],
  },
  {
    id: "ayudantia-cpp",
    period: "Marzo 2023 — Julio 2023",
    role: "Ayudante de Cátedra de Programación (C++)",
    institution: "Universidad Diego Portales (UDP)",
    description:
      "Docencia extracurricular y mentoría técnica a más de 100 estudiantes en fundamentos de C++, punteros, gestión de memoria heap/stack, POO y depuración en Linux.",
    badge: "DOCENCIA & AYUDANTÍA",
    chestTitle: "COFRE DE DOCENCIA · AYUDANTÍA C++ UDP",
    lootSummary: "Formación directa a +100 estudiantes en C++, memoria dinámica y pensamiento algorítmico.",
    details: [
      "Dictado de laboratorios semanales de reforzamiento en punteros, referencias, arreglos dinámicos y manejo de memoria heap/stack.",
      "Acompañamiento en programación orientada a objetos, estructuras de datos elementales y prevención de memory leaks en Linux.",
      "Revisión de entregas prácticas y apoyo individual para destrabar errores de compilación y lógica algorítmica.",
    ],
    techStack: ["C++", "Bash", "Linux", "Git"],
  },
]

const TIMELINE_PAIRS: TimelineItem[][] = []
for (let i = 0; i < TIMELINE.length; i += 2) {
  TIMELINE_PAIRS.push(TIMELINE.slice(i, i + 2))
}

const NAV_ITEMS = [
  { id: "manifiesto", label: "Manifiesto" },
  { id: "actividades", label: "Actividades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Tecnologías" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
]

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PortfolioLanding({ onReturnNormal }: { onReturnNormal?: () => void } = {}) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [canOpenComputer, setCanOpenComputer] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Modals & Panels
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [bookTurn, setBookTurn] = useState(false)
  const [turningOut, setTurningOut] = useState(false)
  const [crtLaunching, setCrtLaunching] = useState(false)
  const turnTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileBookIndexRef = useRef<HTMLDivElement | null>(null)

  const openArcadeComputer = () => {
    if (!canOpenComputer || crtLaunching || typeof window === "undefined" || window.innerWidth < 768) return
    setCrtLaunching(true)
  }

  const handleCrtLaunchComplete = () => {
    try {
      sessionStorage.setItem("luval-crt-boot", "1")
    } catch {
      // Ignore storage errors
    }
    router.push("/os")
  }
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [avatarMoodIndex, setAvatarMoodIndex] = useState(0)

  const AVATAR_STATUSES = [
    "luvaldev",
    "@luvaldev · UDP",
    "LVL 96 · ING. CIVIL",
    "ESP32 TOF: < 15 MS",
  ]

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setCanOpenComputer(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  // ── Track active section for the Minecraft hotbar HUD ──
  useEffect(() => {
    const sectionIds = ["hero", "manifiesto", "actividades", "proyectos", "stack", "trayectoria", "contacto"]
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: "-30% 0px -52% 0px", threshold: [0, 0.2, 0.5] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // ── Keyboard shortcuts (Command Palette ⌘K / Ctrl+K) ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setCommandOpen(false)
        setSelectedProject(null)
        setSelectedTimelineItem(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // ── Theme toggle with Circular View Transition ──
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    const x = event.clientX || window.innerWidth - 45
    const y = event.clientY || 35

    if (!("startViewTransition" in document) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme)
      return
    }

    document.documentElement.style.setProperty("--theme-x", `${x}px`)
    document.documentElement.style.setProperty("--theme-y", `${y}px`)
    document.startViewTransition(() => setTheme(nextTheme))
  }

  // ── Copy email helper ──
  const copyEmail = () => {
    navigator.clipboard.writeText("luvalprojects@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const moveBook = (direction: -1 | 1) => {
    if (turnTimer.current) clearTimeout(turnTimer.current)
    setBookTurn((turn) => !turn)
    const nextIndex = (activeProjectIndex + direction + ALL_PROJECTS.length) % ALL_PROJECTS.length
    setActiveProjectIndex(nextIndex)
    if (selectedProject) {
      setTurningOut(true)
      turnTimer.current = setTimeout(() => {
        setSelectedProject(ALL_PROJECTS[nextIndex])
        setTurningOut(false)
        requestAnimationFrame(() => document.querySelector(".mc-open-book-modal")?.scrollTo({ top: 0, behavior: "smooth" }))
      }, 430)
    }
  }

  const openProject = (project: FlagshipProject, index: number) => {
    setActiveProjectIndex(index)
    setSelectedProject(project)
  }

  const selectBook = (project: FlagshipProject, index: number) => {
    if (activeProjectIndex === index) openProject(project, index)
    else {
      setBookTurn((turn) => !turn)
      setActiveProjectIndex(index)
    }
  }

  useEffect(() => {
    const index = mobileBookIndexRef.current
    const activeBook = index?.children[activeProjectIndex] as HTMLElement | undefined
    if (!index || !activeBook) return
    const indexBounds = index.getBoundingClientRect()
    const bookBounds = activeBook.getBoundingClientRect()
    index.scrollTo({
      left: index.scrollLeft + bookBounds.left - indexBounds.left - (index.clientWidth - activeBook.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }, [activeProjectIndex])

  const selectProjectYear = (year: number) => {
    const firstIndex = ALL_PROJECTS.findIndex((project) => project.year === year)
    if (firstIndex < 0) return
    setBookTurn((turn) => !turn)
    setActiveProjectIndex(firstIndex)
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
      {/* ── Top Navigation Bar (Minecraft TIER 4 Purple Banner HUD) ── */}
      <header className="mc-header mc-header-tier4 fixed top-0 inset-x-0 z-40 transition-colors">
        <div className="mc-header-inner relative max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-3">
          {/* Logo / Pixel Avatar Identity */}
          <a
            href="#hero"
            className="mc-brand flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] p-1"
          >
            <Image
              src="/luval-avatar.png"
              alt="Avatar pixel-art de Luis Valdenegro"
              width={40}
              height={40}
              unoptimized
              style={{ imageRendering: "pixelated" }}
              className="mc-brand-avatar w-10 h-10 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="mc-pixel-title text-xs sm:text-sm leading-none tracking-wide">
                LUIS VALDENEGRO
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#d9b8ff] flex items-center gap-1.5 mt-1">
                <span className="mc-pixel-dot" />
                @luvaldev · Santiago, CL
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Minecraft Purple TIER 4 Hotbar Slots) */}
          <nav className="mc-hotbar hidden xl:flex items-center gap-1 text-xs font-medium" aria-label="Navegación principal">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`mc-slot${activeSection === item.id ? " is-active" : ""}`}
              >
                <span className="mc-slot-num" aria-hidden="true">{idx + 1}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions: Theme toggle, CV button */}
          <div className="mc-actions flex items-center gap-2">
            <button
              type="button"
              className="mc-icon-slot mc-menu-toggle w-10 h-10 flex xl:hidden items-center justify-center"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Cerrar menú de secciones" : "Abrir menú de secciones"}
              aria-controls="mc-mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <PixelMenuIcon size={22} />
            </button>
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Cambiar tema de color"
                className="mc-icon-slot w-10 h-10 flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={22} className="text-[#ffe694]" /> : <Moon size={22} className="text-[#c58aff]" />}
              </button>
            )}

            <a
              href="/CV_Valdenegro-Luis.pdf"
              target="_blank"
              rel="noreferrer"
              className="mc-cv-slot hidden sm:inline-flex items-center gap-2 px-3.5 h-10 text-xs tracking-wider"
            >
              <PixelScrollIcon size={22} />
              <span className="mc-pixel-font font-bold">CV</span>
            </a>
          </div>

          {mobileMenuOpen && (
            <nav id="mc-mobile-menu" className="mc-mobile-menu xl:hidden" aria-label="Navegación de secciones">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}><span>00</span><strong>Inicio</strong></a>
              {NAV_ITEMS.map((item, idx) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false) }}>
                  <span>{String(idx + 1).padStart(2, "0")}</span><strong>{item.label}</strong>
                </a>
              ))}
              <a href="/CV_Valdenegro-Luis.pdf" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}><span>↗</span><strong>CV (PDF)</strong></a>
            </nav>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT SECTIONS ── */}
      <main className="relative z-10 pt-[68px]">
        {/* ── SECTION 0: HERO (MINECRAFT MARKETPLACE PIXEL GUI + VECTOR BLOCK WALL) ── */}
        <section id="hero" className="mc-hero-stage relative overflow-hidden min-h-[90vh] flex flex-col justify-center py-12 lg:py-16">
          <HeroPixelBackground />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mc-hero-grid">
              {/* Left Column: Pixel Title + Lore Box + Pixel CTAs */}
              <div className="mc-hero-copy">
                {/* Hero Main Heading inside dark pixel contrast plate */}
                <div className="mc-hero-title-plate mb-5">
                  <h1 className="mc-hero-heading">
                    <span className="block text-[#ffffff]">INGENIERÍA DE REDES,</span>
                    <span className="mc-hero-heading-accent block">SISTEMAS DISTRIBUIDOS</span>
                    <span className="block text-[#ffffff]">&amp; SOFTWARE DE ALTA FIDELIDAD.</span>
                  </h1>
                </div>

                {/* Framed Lore Box */}
                <div className="mc-lore-box mb-6">
                  <p className="text-sm sm:text-base text-[#e6dff2] leading-relaxed">
                    Soy <strong className="text-[#ffe6b2] font-semibold">Luis Valdenegro</strong> (
                    <code className="mc-inline-tag">@luvaldev</code>), estudiante de{" "}
                    <strong className="text-[#ffffff]">Ingeniería Civil en Informática y Telecomunicaciones</strong> en la
                    Universidad Diego Portales. Investigo en ciberseguridad defensiva, firmware embebido en C++, análisis
                    forense de paquetes y arquitectura web de alto rendimiento.
                  </p>
                </div>

                {/* Pixel Primary CTAs + Square Social Icon Slots */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <a href="#proyectos" className="mc-btn-primary inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm">
                    <PixelBookSprite size={24} />
                    <span className="mc-pixel-font font-bold">EXPLORAR PROYECTOS</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mc-btn-secondary inline-flex items-center gap-2 px-4 py-3 text-xs font-mono"
                  >
                    {copiedEmail ? (
                      <PixelCheckIcon size={20} className="text-[#2ee86c]" />
                    ) : (
                      <PixelCopyIcon size={20} className="text-[#df96ff]" />
                    )}
                    <span>{copiedEmail ? "¡CORREO COPIADO!" : "luvalprojects@gmail.com"}</span>
                  </button>
                </div>

                {/* Pixel Social Icon Slots Row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="mc-social-label-badge mc-pixel-font">
                    REDES &amp; CONTACTO
                  </span>
                  <a
                    href="https://github.com/luvaldev"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub de Luis Valdenegro"
                    className="mc-social-slot mc-social-github"
                    title="GitHub (@luvaldev)"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://cl.linkedin.com/in/luis-valdenegrom"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn de Luis Valdenegro"
                    className="mc-social-slot mc-social-linkedin"
                    title="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/lwchito/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram de Luis Valdenegro"
                    className="mc-social-slot mc-social-instagram"
                    title="Instagram (@lwchito)"
                  >
                    <PixelInstagramIcon size={24} />
                  </a>
                  <a
                    href="mailto:luvalprojects@gmail.com"
                    aria-label="Enviar correo directo"
                    className="mc-social-slot mc-social-mail"
                    title="Enviar correo (luvalprojects@gmail.com)"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>

              {/* Right Column: Minecraft MARKETPLACE GUI Window */}
              <div className="mc-marketplace-shell">
                <div className="mc-marketplace-window">
                  {/* Elevated Top Plate Title */}
                  <div className="mc-marketplace-header-plate">
                    <span className="mc-pixel-font text-[11px] sm:text-xs font-bold tracking-wider">
                      LUVALDEV // WORKSTATION
                    </span>
                  </div>

                  <div className="mc-marketplace-grid">
                    {/* Large Left Cyan Panel (Minecraft Player + Inventory Hotbar + Game Blocks) */}
                    <div className="mc-panel-cyan">
                      <div className="mc-panel-top-bar">
                        <PixelDiamondIcon size={24} />
                        <span className="mc-pixel-font mc-panel-title">LUVAL // ENGINEER</span>
                      </div>

                      {/* Minecraft Game Blocks Shelf + Inventory Hotbar + Crafting/Furnace Flanks + User Pixel Avatar */}
                      <div className="mc-stage-scene">
                        {/* Upper Shelf with Classic Minecraft Blocks */}
                        <div className="mc-pixel-shelf" aria-hidden="true">
                          <PixelGrassBlockIcon size={22} />
                          <PixelTntBlockIcon size={22} />
                          <PixelChestSprite size={22} />
                          <PixelAnvilSprite size={22} />
                        </div>

                        {/* Minecraft 6-Slot Inventory Hotbar */}
                        <div className="mc-workstation-hotbar" aria-hidden="true">
                          <span className="mc-hotbar-cell is-selected">
                            <PixelSwordCodeIcon size={20} />
                          </span>
                          <span className="mc-hotbar-cell">
                            <PixelDiamondIcon size={20} />
                          </span>
                          <span className="mc-hotbar-cell">
                            <PixelBookSprite size={20} />
                          </span>
                          <span className="mc-hotbar-cell">
                            <PixelCommandBlockIcon size={20} />
                          </span>
                          <span className="mc-hotbar-cell">
                            <PixelEmeraldIcon size={20} />
                          </span>
                          <span className="mc-hotbar-cell">
                            <PixelTorchIcon size={20} />
                          </span>
                        </div>

                        {/* Floating XP / Emerald Particles */}
                        <span className="mc-xp-particle mc-note-1" aria-hidden="true">
                          <PixelXpOrbIcon size={20} />
                        </span>
                        <span className="mc-xp-particle mc-note-2" aria-hidden="true">
                          <PixelEmeraldIcon size={20} />
                        </span>

                        {/* Minecraft Game Blocks Flanking the User Pixel Avatar */}
                        <div className="mc-stage-floor">
                          <div className="mc-game-block-prop" aria-hidden="true" title="Mesa de Crafteo">
                            <PixelCraftingTableIcon size={34} />
                          </div>

                          <button
                            type="button"
                            onClick={() => setAvatarMoodIndex((i) => (i + 1) % AVATAR_STATUSES.length)}
                            className="mc-avatar-pedestal group"
                            title="Haz clic para inspeccionar el estado de ingeniería"
                          >
                            <span className="mc-avatar-bubble mc-pixel-font">
                              {AVATAR_STATUSES[avatarMoodIndex]}
                            </span>
                            <Image
                              src="/luval-avatar.png"
                              alt="Luis Valdenegro Pixel Avatar"
                              width={128}
                              height={128}
                              unoptimized
                              style={{ imageRendering: "pixelated" }}
                              className="mc-hero-avatar"
                            />
                          </button>

                          <div className="mc-game-block-prop" aria-hidden="true" title="Horno de Compilación">
                            <PixelFurnaceIcon size={34} />
                          </div>
                        </div>

                        <div className="mc-white-ledge" aria-hidden="true" />
                      </div>

                      <div className="mc-panel-bottom-bar">
                        <span className="mc-pixel-font text-[10px] sm:text-[11px] tracking-wider">
                          ING. CIVIL UDP · LVL 96
                        </span>
                      </div>
                    </div>

                    {/* Right Column: 3 Stacked Colored Panels (Lime, Purple, Gold) */}
                    <div className="mc-panels-stack">
                      <a href="#actividades" className="mc-panel-card mc-panel-lime">
                        <span className="mc-pixel-font mc-panel-title">ACTIVIDADES</span>
                        <div className="mc-panel-sprites">
                          <PixelSwordCodeIcon size={38} />
                          <PixelTargetIcon size={38} />
                          <PixelEmeraldIcon size={38} />
                        </div>
                        <div className="mc-white-ledge" aria-hidden="true" />
                      </a>

                      <a href="#proyectos" className="mc-panel-card mc-panel-purple">
                        <span className="mc-pixel-font mc-panel-title">PROYECTOS</span>
                        <div className="mc-panel-sprites">
                          <PixelBookSprite size={38} />
                          <PixelCubeSprite size={38} />
                          <PixelChestSprite size={38} />
                        </div>
                        <div className="mc-white-ledge" aria-hidden="true" />
                      </a>

                      <a href="#stack" className="mc-panel-card mc-panel-gold">
                        <span className="mc-pixel-font mc-panel-title">STACK &amp; IOT</span>
                        <div className="mc-panel-sprites">
                          <PixelChipSprite size={38} />
                          <PixelAnvilSprite size={38} />
                          <PixelHelmetSprite size={38} />
                        </div>
                        <div className="mc-white-ledge" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Strip: TIER 2..5 Banners */}
              <div className="mc-hero-metrics grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
                {[
                  { metric: "12+", label: "Repositorios Open Source", sub: "Python, C++, TypeScript", tier: "mc-tier-2" },
                  { metric: "PRÁCTICA I", label: "Práctica Profesional Superada", sub: "Ingeniería Civil Informática · UDP", tier: "mc-tier-3" },
                  { metric: "FULL-STACK", label: "Plataformas Web & SaaS", sub: "Next.js 16, React 19 & PostgreSQL", tier: "mc-tier-4" },
                  { metric: "REDES & SO", label: "Infraestructura, Linux & IoT", sub: "Docker, Scapy, C++ & ESP32", tier: "mc-tier-5" },
                ].map((stat, i) => (
                  <div key={i} className={`mc-metric-banner ${stat.tier}`}>
                    <div className="mc-pixel-font text-lg sm:text-xl font-bold leading-none mb-1.5 mc-metric-value">
                      {stat.metric}
                    </div>
                    <div className="text-xs font-semibold leading-tight mc-metric-label">{stat.label}</div>
                    <div className="text-[10px] font-mono mt-0.5 mc-metric-sub">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="hero-to-village" />

        {/* ── SECTION 1: EL MANIFIESTO TÉCNICO (Temática Aldea Overworld · Imagen 1) ── */}
        <section id="manifiesto" className="mc-section-biome mc-section-village relative overflow-hidden py-24 sm:py-28 px-4 sm:px-6">
          <VillageBiomePattern />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="mc-biome-badge">
                  <span className="mc-biome-num">01</span>
                  <span className="mc-pixel-font text-xs tracking-wider">GREMIO DE INGENIERÍA · ALDEA OVERWORLD</span>
                </div>

                {/* Hearts & Armor HUD Strip (Reference Image 2 & 3) */}
                <div className="mc-hud-status-pill" aria-hidden="true">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <PixelHeartIcon key={`h-${idx}`} size={20} />
                    ))}
                  </div>
                  <span className="mc-hud-divider" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <PixelArmorIcon key={`a-${idx}`} size={20} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Manifiesto técnico dentro de marco estilo atril Minecraft con iluminación letra por letra */}
              <ManifestoScrollBoard />

              {/* 3 Pillars: Market Guild Stalls inspired by Reference Image 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="mc-guild-stall">
                  <div className="mc-stall-awning mc-awning-cyan" aria-hidden="true" />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="mc-item-frame">
                        <PixelShieldIcon size={38} />
                      </div>
                      <span className="mc-pixel-font text-[10px] text-[#2ce5d8] tracking-widest uppercase">
                        GREMIO // REDES
                      </span>
                    </div>
                    <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mb-2.5 leading-snug">
                      Redes &amp; Ciberseguridad Defensiva
                    </h3>
                    <p className="text-sm text-[#cfc8dc] leading-relaxed flex-1">
                      Comprensión profunda de la pila OSI, especificaciones RFC (SMTP, DNS, HTTP) y análisis de vulnerabilidades mediante inspección de tramas y modelos de confianza.
                    </p>
                  </div>
                  <div className="mc-white-ledge" aria-hidden="true" />
                </div>

                <div className="mc-guild-stall">
                  <div className="mc-stall-awning mc-awning-amber" aria-hidden="true" />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="mc-item-frame">
                        <PixelChipSprite size={38} />
                      </div>
                      <span className="mc-pixel-font text-[10px] text-[#ffcf4d] tracking-widest uppercase">
                        GREMIO // HARDWARE
                      </span>
                    </div>
                    <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mb-2.5 leading-snug">
                      Concurrencia &amp; Hardware Embebido
                    </h3>
                    <p className="text-sm text-[#cfc8dc] leading-relaxed flex-1">
                      Manejo de hilos POSIX, exclusión mutua con <code>std::mutex</code>, memoria dinámica en C++ y programación para microcontroladores ESP32 con sensores ToF.
                    </p>
                  </div>
                  <div className="mc-white-ledge" aria-hidden="true" />
                </div>

                <div className="mc-guild-stall">
                  <div className="mc-stall-awning mc-awning-purple" aria-hidden="true" />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="mc-item-frame">
                        <PixelCraftingTableIcon size={38} />
                      </div>
                      <span className="mc-pixel-font text-[10px] text-[#df96ff] tracking-widest uppercase">
                        GREMIO // SOFTWARE
                      </span>
                    </div>
                    <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mb-2.5 leading-snug">
                      Sistemas Reactivos &amp; Arquitectura Web
                    </h3>
                    <p className="text-sm text-[#cfc8dc] leading-relaxed flex-1">
                      Next.js 16 con Server Actions, modelado relacional en PostgreSQL y sistemas reactivos de alta precisión optimizados con Framer Motion y GSAP.
                    </p>
                  </div>
                  <div className="mc-white-ledge" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="village-to-arena" />

        {/* ── SECTION 2: ACTIVIDADES & PARTICIPACIÓN (Arena Solo & Co-op + Historial CTF) ── */}
        <section id="actividades" className="mc-section-biome mc-section-arena relative overflow-hidden py-24 px-4 sm:px-6">
          <ActividadesArenaPattern />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mc-section-header-plate flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <div className="mc-biome-badge mb-3">
                  <span className="mc-biome-num">02</span>
                  <span className="mc-pixel-font text-xs tracking-wider">COLISEO DE DESAFÍOS · ACTIVIDADES</span>
                </div>
                <h2 className="mc-pixel-font text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight">
                  Actividades &amp; Participación.
                </h2>
              </div>
              <div className="mc-hud-status-pill self-start md:self-auto">
                <PixelTrophyMedalIcon rank={3} size={22} />
                <span className="mc-pixel-font text-xs text-[#ffe694]">3 CTFs COMPETITIVOS · EIT UDP</span>
              </div>
            </div>

            {/* Tablón Minecraft: Historial de Capture The Flag (CTF) */}
            <div className="mc-ctf-board mb-8">
              <div className="mc-ctf-board-header">
                <div className="flex items-center gap-3">
                  <div className="mc-guild-icon-box">
                    <PixelTrophyMedalIcon rank={1} size={30} />
                  </div>
                  <div>
                    <span className="mc-pixel-font text-[10px] tracking-widest text-[#2ee86c] block">
                      TABLÓN DE TORNEOS · CIBERSEGURIDAD
                    </span>
                    <h3 className="mc-pixel-font text-lg sm:text-xl font-bold text-[#ffffff]">
                      Historial de CTF
                    </h3>
                  </div>
                </div>
                <span className="mc-activity-slot-pill mc-pixel-font">
                  CAPTURA LA BANDERA · UDP &amp; DREAMLAB
                </span>
              </div>

              <div className="divide-y-2 divide-[#2a1f3d]">
                {CTF_EVENTS.map((ctf) => (
                  <div key={`${ctf.date}-${ctf.name}`} className="mc-ctf-row">
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-[#9d92b5] block mb-1">
                        {ctf.date}
                      </span>
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <h4 className="mc-pixel-font text-base sm:text-lg font-bold text-[#ffffff]">
                          {ctf.name}
                        </h4>
                        <span className="text-xs sm:text-sm text-[#c9bedd]">
                          · Equipo{" "}
                          <strong className="mc-pixel-font text-[#52ffd5] font-semibold">
                            {ctf.team}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <div className={`mc-ctf-rank-badge ${ctf.rank <= 3 ? "is-podium" : ""}`}>
                        <PixelTrophyMedalIcon rank={ctf.rank} size={22} />
                        <span className="mc-pixel-font text-xs font-bold">{ctf.placement}</span>
                      </div>

                      <a
                        href={ctf.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mc-ctf-link mc-pixel-font text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <span>{ctf.ctaLabel}</span>
                        <PixelExternalLinkIcon size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mc-activity-card mc-activity-solo">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="mc-guild-icon-box">
                      <PixelSwordCodeIcon size={34} />
                    </div>
                    <div>
                      <span className="mc-activity-mode-tag mc-pixel-font">SOLO // INVESTIGACIÓN &amp; REDES</span>
                      <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mt-1">
                        Participación Individual
                      </h3>
                    </div>
                  </div>
                  <PixelEmeraldIcon size={26} />
                </div>
                <p className="text-sm text-[#d6eedc] leading-relaxed mb-4">
                  Auditorías técnicas de infraestructura DNS/SMTP, retos individuales de reversing/forense y contribuciones abiertas de software.
                </p>
                <div className="mc-activity-slot-pill mc-pixel-font">
                  MODO SOLO · FORENSE &amp; RETOS TÉCNICOS
                </div>
              </div>

              <div className="mc-activity-card mc-activity-group">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="mc-guild-icon-box">
                      <PixelTargetIcon size={34} />
                    </div>
                    <div>
                      <span className="mc-activity-mode-tag mc-pixel-font">PARTY // EQUIPO INSIDE &amp; UDP</span>
                      <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mt-1">
                        Actividades Grupales
                      </h3>
                    </div>
                  </div>
                  <PixelXpOrbIcon size={26} />
                </div>
                <p className="text-sm text-[#f4e5c8] leading-relaxed mb-4">
                  Competencias Capture The Flag junto a los equipos Inside e INSAID en EIT UDP, ayudantías de C++ y proyectos colaborativos de laboratorio.
                </p>
                <div className="mc-activity-slot-pill mc-pixel-font">
                  MODO PARTY · 3 TORNEOS CTF COMPLETADOS
                </div>
              </div>
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="arena-to-library" />

        {/* ── SECTION 3: PROYECTOS DESTACADOS (Biblioteca Encantada intacta) ── */}
        <section id="proyectos" className="mc-section-library relative py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mc-section-header-plate flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div className="mc-biome-badge mb-3">
                  <span className="mc-biome-num">03</span>
                  <span className="mc-pixel-font text-xs tracking-wider">BIBLIOTECA ARCANA · CATÁLOGO</span>
                </div>
                <h2 className="mc-pixel-font text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight">
                  Todos mis proyectos.
                </h2>
              </div>
            </div>

            <div className="project-years"><span>PROYECTOS · {Math.min(...ALL_PROJECTS.map(project => project.year))}—{Math.max(...ALL_PROJECTS.map(project => project.year))}</span><span>{ALL_PROJECTS.length} proyectos del catálogo</span></div>
            <div className="project-year-selector" aria-label="Seleccionar año de proyectos">
              {[...new Set(ALL_PROJECTS.map((project) => project.year))].sort((a, b) => a - b).map((year) => (
                <button key={year} type="button" aria-pressed={ALL_PROJECTS[activeProjectIndex]?.year === year} onClick={() => selectProjectYear(year)}>{year}</button>
              ))}
            </div>
            <div className={`project-library${bookTurn ? " book-turn-reverse" : " book-turn-forward"}`} aria-label="Proyectos destacados">
              {ALL_PROJECTS.map((project, index) => {
                const rawOffset = index - activeProjectIndex
                const midpoint = Math.floor(ALL_PROJECTS.length / 2)
                const carouselOffset = rawOffset > midpoint ? rawOffset - ALL_PROJECTS.length : rawOffset < -midpoint ? rawOffset + ALL_PROJECTS.length : rawOffset
                const offsetMagnitude = Math.abs(carouselOffset)
                const bookOffset = carouselOffset === 0
                  ? "0px"
                  : `calc(0px ${carouselOffset < 0 ? "-" : "+"} var(--book-first-step)${Array.from({ length: Math.max(0, offsetMagnitude - 1) }, () => ` ${carouselOffset < 0 ? "-" : "+"} var(--book-step)`).join("")})`
                return <button
                  key={project.id}
                  type="button"
                  className={`project-book${activeProjectIndex === index ? " book-selected" : " book-visible"}`}
                  onClick={() => selectBook(project, index)}
                  onPointerMove={(event) => {
                    if (activeProjectIndex !== index || event.pointerType !== "mouse") return
                    const rect = event.currentTarget.getBoundingClientRect()
                    const x = (event.clientX - rect.left) / rect.width - .5
                    const y = (event.clientY - rect.top) / rect.height - .5
                    event.currentTarget.style.setProperty("--tilt-x", `${(-y * 9).toFixed(2)}deg`)
                    event.currentTarget.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`)
                  }}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.removeProperty("--tilt-x")
                    event.currentTarget.style.removeProperty("--tilt-y")
                  }}
                  aria-label={`${activeProjectIndex === index ? "Abrir detalles de" : "Seleccionar"} ${project.title}`}
                  data-carousel-offset={carouselOffset}
                  style={{ "--book-index": index, "--book-offset": bookOffset } as React.CSSProperties}
                >
                  <span className="book-number">0{index + 1}</span>
                  <span className="book-spine" aria-hidden="true"><span className="book-spine-ribbon" /><small>{project.year}</small><strong>{project.title}</strong><i>{String(index + 1).padStart(2, "0")}</i></span>
                  <span className="book-cover" aria-hidden="true"><span className="book-enchantment"><EnchantedBookOrnament /></span><strong>{project.title}</strong><small>{project.year} · {project.category}</small><span className="cover-description">{project.headline}</span><span className="cover-stack">{project.stack.slice(0, 4).join(" · ")}</span></span>
                  <span className="book-page-bottom" aria-hidden="true"><span className="book-bookmark" /><span className="book-clasp-wrap" /></span>
                  <span className="book-copy">
                    <span className="book-category">{project.year} · {project.category}</span>
                    <strong>{project.title}</strong>
                    <span className="book-description">{project.headline}</span>
                    <span className="book-stack">{project.stack.slice(0, 4).join(" · ")}</span>
                  </span>
                </button>
              })}
            </div>
            <div className="book-navigation">
              <span>Libro {String(activeProjectIndex + 1).padStart(2, "0")} / {String(ALL_PROJECTS.length).padStart(2, "0")}</span>
              <button className="book-open-action" type="button" onClick={() => openProject(ALL_PROJECTS[activeProjectIndex], activeProjectIndex)}>Abrir ficha <PixelArrowUpRightIcon size={20} /></button>
              <div><button type="button" onClick={() => moveBook(-1)} aria-label="Libro anterior">←</button><button type="button" onClick={() => moveBook(1)} aria-label="Libro siguiente">→</button></div>
            </div>
            <div ref={mobileBookIndexRef} className="mobile-book-index" role="group" aria-label="Índice táctil de proyectos">
              {ALL_PROJECTS.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Ir al libro ${String(index + 1).padStart(2, "0")}: ${project.title}`}
                  aria-pressed={activeProjectIndex === index}
                  onClick={() => {
                    selectBook(project, index)
                    document.querySelector(".project-library")?.scrollIntoView({
                      block: "center",
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    })
                  }}
                >
                  <span className="mobile-book-index-volume" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></span>
                  <span className="mobile-book-index-name">{project.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="library-to-cherry" />

        {/* ── SECTION 3: MATRIZ DE TECNOLOGÍAS (Temática Bosque de Cerezos & Íconos Pixel-Art) ── */}
        <section id="stack" className="mc-section-biome mc-section-cherry relative overflow-hidden py-24 px-4 sm:px-6">
          <CherryGrovePattern />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mc-section-header-plate flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div className="max-w-3xl">
                <div className="mc-biome-badge mb-3">
                  <span className="mc-biome-num">04</span>
                  <span className="mc-pixel-font text-xs tracking-wider">TALLER DE CRAFTEO · MATRIZ DE TECNOLOGÍAS</span>
                </div>
                <h2 className="mc-pixel-font text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight">
                  Matriz de Tecnologías.
                </h2>
              </div>

              <div className="mc-hud-status-pill self-start md:self-auto">
                <PixelEmeraldIcon size={24} />
                <span className="mc-pixel-font text-xs text-[#7dff9b]">31 TECNOLOGÍAS EQUIPADAS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STACK_MATRIX.map((group) => {
                const Icon = group.icon
                return (
                  <div
                    key={group.category}
                    className={`mc-crafting-window${group.fullWidth ? " md:col-span-2" : ""}`}
                  >
                    <div className="mc-crafting-header">
                      <div className="flex items-center gap-3.5">
                        <div className="mc-item-frame">
                          <Icon size={40} />
                        </div>
                        <div>
                          <span className="mc-pixel-font text-[10px] tracking-widest block" style={{ color: group.accent }}>
                            {group.fullWidth ? "BLOQUE DE COMANDO · IA AVANZADA" : "MESA DE CRAFTEO"}
                          </span>
                          <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] leading-snug">
                            {group.category}
                          </h3>
                        </div>
                      </div>
                      <PixelXpOrbIcon size={24} />
                    </div>

                    <div
                      className={`p-4 sm:p-5 ${
                        group.fullWidth
                          ? "grid grid-cols-1 md:grid-cols-2 gap-2.5"
                          : "space-y-2.5"
                      }`}
                    >
                      {group.items.map((tech) => (
                        <div key={tech.name} className="mc-tech-slot">
                          <PixelTechBadge techKey={tech.techKey} size={42} className="shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="mc-pixel-font font-bold text-xs sm:text-sm text-[#ffffff] truncate">
                                {tech.name}
                              </span>
                            </div>
                            <div className="text-xs text-[#cfc8dc] leading-snug">{tech.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="cherry-to-desert" />

        {/* ── SECTION 4: TRAYECTORIA ACADÉMICA & CV (Temática Desierto Sandstone & Cofres) ── */}
        <section id="trayectoria" className="mc-section-biome mc-section-desert relative overflow-x-clip py-24 px-4 sm:px-6">
          <SandstoneOutpostPattern />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mc-section-header-plate flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
              <div>
                <div className="mc-biome-badge mb-3">
                  <span className="mc-biome-num">05</span>
                  <span className="mc-pixel-font text-xs tracking-wider">BITÁCORA DE MISIONES · TRAYECTORIA</span>
                </div>
                <h2 className="mc-pixel-font text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight mb-3">
                  Trayectoria &amp; Compromiso.
                </h2>
                <div className="mc-hud-status-pill inline-flex" aria-hidden="true">
                  <PixelHeartIcon size={20} />
                  <PixelHeartIcon size={20} />
                  <PixelHeartIcon size={20} />
                  <span className="mc-hud-divider" />
                  <PixelEmeraldIcon size={22} />
                  <span className="mc-pixel-font text-[10px] text-[#ffe694]">CLIC EN CADA MISIÓN PARA ABRIR COFRE</span>
                </div>
              </div>
              <a
                href="/CV_Valdenegro-Luis.pdf"
                target="_blank"
                rel="noreferrer"
                className="mc-btn-primary inline-flex items-center gap-3 px-5 py-3 text-xs sm:text-sm self-start md:self-auto"
              >
                <PixelScrollIcon size={24} />
                <span className="mc-pixel-font font-bold">DESCARGAR CURRÍCULUM COMPLETO</span>
              </a>
            </div>

            <div className="mc-quest-stack-pairs">
              {TIMELINE_PAIRS.map((pair, pairIndex) => (
                <div
                  key={`pair-${pairIndex}`}
                  className="mc-quest-pair-row"
                  style={{ "--pair-index": pairIndex } as React.CSSProperties}
                >
                  {pair.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTimelineItem(item)}
                      className="mc-sandstone-card mc-sandstone-chest-trigger group text-left w-full"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-[#4d3820]">
                        <div className="flex items-center gap-2 min-w-0">
                          <PixelTorchIcon size={22} />
                          <span className="mc-pixel-font text-xs font-bold text-[#ffcf4d] drop-shadow-[1px_1px_0_#140804] truncate">
                            {item.period}
                          </span>
                        </div>
                        <span className="mc-quest-badge mc-pixel-font">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="mc-pixel-font font-bold text-base sm:text-lg text-[#ffffff] mb-1.5 leading-snug">
                        {item.role}
                      </h3>
                      <div className="text-xs font-mono font-semibold text-[#ffe694] mb-3">
                        {item.institution}
                      </div>
                      <p className="text-sm text-[#e0d7c5] leading-relaxed mb-4 flex-1">{item.description}</p>
                      <div className="mt-auto pt-2.5 border-t border-[#4d3820]/80 flex items-center justify-between gap-2 text-xs">
                        <span className="mc-pixel-font text-[10px] tracking-wider text-[#ffcf4d] group-hover:text-[#52ffd5] transition-colors">
                          ABRIR COFRE DEL TRAYECTO ▸
                        </span>
                        <PixelChestSprite size={22} />
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <BiomeTransitionStrip variant="desert-to-bastion" />

        {/* ── SECTION 5: PORTAL DE CONTACTO & CONSOLA DE SERVIDOR (Temática Bastión) ── */}
        <section id="contacto" className="mc-section-biome mc-section-bastion relative overflow-hidden py-24 px-4 sm:px-6">
          <BastionOutpostPattern />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mc-section-header-plate text-center mb-10">
              <div className="mc-biome-badge mb-4 mx-auto">
                <span className="mc-biome-num">06</span>
                <span className="mc-pixel-font text-xs tracking-wider">SERVIDOR MULTIJUGADOR · CONEXIÓN DIRECTA</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <PixelTargetIcon size={32} />
                <h2 className="mc-pixel-font text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight">
                  Hablemos de Ingeniería.
                </h2>
                <PixelXpOrbIcon size={28} />
              </div>
              <p className="text-base text-[#dfd7ec] max-w-xl mx-auto">
                ¿Tienes un proyecto desafiante, una oportunidad de pasantía o quieres colaborar en sistemas distribuidos y forense de redes?
              </p>
            </div>

            {/* Minecraft Command Block Console (centered) + Animated Armor-Up Companion attached on the left */}
            <div className="mc-console-stage">
              <div className="mc-console-companion" aria-hidden="true">
                <div className="mc-companion-glow" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/minecraft/luval-armor-anim.webp"
                  alt="Luval equipando armadura y celebrando"
                  loading="lazy"
                  decoding="async"
                  className="mc-companion-character"
                />
              </div>

              <div className="mc-command-console w-full">
                <div className="mc-console-topbar">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={openArcadeComputer}
                      disabled={!canOpenComputer}
                      className="mc-cmd-launch-btn pointer-events-none md:pointer-events-auto"
                      title="Abrir LuvalOS Arcade (Solo disponible en PC)"
                      aria-label="Abrir LuvalOS Arcade (Solo disponible en PC)"
                    >
                      <PixelCommandBlockIcon size={28} />
                    </button>
                    <div>
                      <span className="mc-pixel-font text-xs font-bold text-[#ffe6b2] block leading-none">
                        LUVAL@STATION // CONSOLA ACTIVA
                      </span>
                      <span className="font-mono text-[11px] text-[#ffe1cc]">
                        Santiago, Chile · UTC-3
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={openArcadeComputer}
                      disabled={!canOpenComputer}
                      className="mc-cmd-leds mc-cmd-launch-btn pointer-events-none md:pointer-events-auto"
                      title="Abrir LuvalOS Arcade + Minecraft (Solo PC)"
                      aria-label="Abrir LuvalOS Arcade y Minecraft Web (Solo PC)"
                    >
                      <i />
                      <i />
                      <i />
                      <i />
                    </button>
                    {/* Server Bars + Mini Pixel Avatar Pill */}
                    <div className="mc-server-player-pill">
                      <PixelServerBarsIcon size={22} />
                      <Image
                        src="/luval-avatar.png"
                        alt="Luval avatar"
                        width={28}
                        height={28}
                        unoptimized
                        style={{ imageRendering: "pixelated" }}
                        className="w-7 h-7 object-contain"
                      />
                      <span className="mc-pixel-font text-[10px] text-[#2ee86c]">ONLINE · 12MS</span>
                    </div>
                  </div>
                </div>

              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-5">
                <div className="mc-console-prompt">
                  <span className="text-[#2ee86c] font-bold">luval@station</span>
                  <span className="text-[#949ca8]">:</span>
                  <span className="text-[#df96ff] font-bold">~</span>
                  <span className="text-[#949ca8]">$ </span>
                  <span className="text-[#ffe6b2]">/status contact_channels --all</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="mailto:luvalprojects@gmail.com" className="mc-channel-tile group">
                    <div className="mc-channel-icon">
                      <Mail size={24} className="text-[#df96ff]" />
                    </div>
                    <div className="min-w-0">
                      <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">EMAIL DIRECTO</span>
                      <span className="text-xs sm:text-sm text-[var(--ink)] group-hover:text-[#2ee86c] truncate block">
                        luvalprojects@gmail.com
                      </span>
                    </div>
                  </a>

                  <a href="https://github.com/luvaldev" target="_blank" rel="noreferrer" className="mc-channel-tile group">
                    <div className="mc-channel-icon">
                      <Github size={24} className="text-[#e6edf3]" />
                    </div>
                    <div className="min-w-0">
                      <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">GITHUB</span>
                      <span className="text-xs sm:text-sm text-[var(--ink)] group-hover:text-[#2ee86c] truncate block">
                        github.com/luvaldev
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://cl.linkedin.com/in/luis-valdenegrom"
                    target="_blank"
                    rel="noreferrer"
                    className="mc-channel-tile group"
                  >
                    <div className="mc-channel-icon">
                      <Linkedin size={24} className="text-[#64b5f6]" />
                    </div>
                    <div className="min-w-0">
                      <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">LINKEDIN</span>
                      <span className="text-xs sm:text-sm text-[var(--ink)] group-hover:text-[#2ee86c] truncate block">
                        Luis Valdenegro
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/lwchito/"
                    target="_blank"
                    rel="noreferrer"
                    className="mc-channel-tile group"
                  >
                    <div className="mc-channel-icon">
                      <PixelInstagramIcon size={24} className="text-[#ff70b8]" />
                    </div>
                    <div className="min-w-0">
                      <span className="mc-pixel-font text-[10px] text-[#ffcf4d] block">INSTAGRAM</span>
                      <span className="text-xs sm:text-sm text-[var(--ink)] group-hover:text-[#ff70b8] truncate block">
                        @lwchito
                      </span>
                    </div>
                  </a>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="mailto:luvalprojects@gmail.com"
                    className="mc-btn-primary inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm"
                  >
                    <Mail size={22} />
                    <span className="mc-pixel-font font-bold">ENVIAR CORREO DIRECTO</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="mc-btn-secondary inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm"
                  >
                    {copiedEmail ? (
                      <PixelCheckIcon size={22} className="text-[#2ee86c]" />
                    ) : (
                      <PixelCopyIcon size={22} className="text-[#df96ff]" />
                    )}
                    <span className="mc-pixel-font font-bold">
                      {copiedEmail ? "¡COPIADO AL PORTAPAPELES!" : "COPIAR EMAIL"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER (Bedrock Bar) ── */}
      <footer className="mc-bedrock-footer border-t-4 border-[#241033] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Image
              src="/luval-avatar.png"
              alt="Luis Valdenegro"
              width={32}
              height={32}
              unoptimized
              style={{ imageRendering: "pixelated" }}
              className="w-8 h-8 object-contain"
            />
            <span className="mc-pixel-font text-[11px] text-[#f4e4ff]">
              © 2026 LUIS VALDENEGRO (LUVAL)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/luvaldev"
              target="_blank"
              rel="noreferrer"
              className="mc-footer-link inline-flex items-center gap-2"
            >
              <Github size={20} />
              <span className="mc-pixel-font text-[10px]">GITHUB</span>
            </a>
            <a
              href="https://cl.linkedin.com/in/luis-valdenegrom"
              target="_blank"
              rel="noreferrer"
              className="mc-footer-link inline-flex items-center gap-2"
            >
              <Linkedin size={20} />
              <span className="mc-pixel-font text-[10px]">LINKEDIN</span>
            </a>
            <a
              href="https://www.instagram.com/lwchito/"
              target="_blank"
              rel="noreferrer"
              className="mc-footer-link inline-flex items-center gap-2"
            >
              <PixelInstagramIcon size={20} />
              <span className="mc-pixel-font text-[10px]">INSTAGRAM</span>
            </a>
            <a
              href="/CV_Valdenegro-Luis.pdf"
              target="_blank"
              rel="noreferrer"
              className="mc-footer-link inline-flex items-center gap-2"
            >
              <PixelScrollIcon size={20} />
              <span className="mc-pixel-font text-[10px]">CV</span>
            </a>
            {onReturnNormal && (
              <button
                type="button"
                onClick={onReturnNormal}
                title="Volver al Overworld"
                aria-label="Volver al Overworld"
                className="mc-footer-link inline-flex items-center gap-2 cursor-pointer"
              >
                <PixelEnderChestIcon size={20} />
                <span className="mc-pixel-font text-[10px]">VOLVER AL OVERWORLD</span>
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* ── COMMAND PALETTE MODAL (⌘K / Ctrl+K) ── */}
      {commandOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="mc-command-modal w-full max-w-lg space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-[#3a1f5e] pb-3">
              <div className="flex items-center gap-2.5 text-xs mc-pixel-font text-[#ffe6b2]">
                <PixelSearchIcon size={22} className="text-[#df96ff]" />
                <span>COMANDO RÁPIDO</span>
              </div>
              <button
                onClick={() => setCommandOpen(false)}
                className="mc-icon-slot w-9 h-9 flex items-center justify-center text-[#f4d9e7]"
                aria-label="Cerrar paleta de comandos"
              >
                <PixelCloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <a
                href="#proyectos"
                onClick={() => setCommandOpen(false)}
                className="mc-cmd-row"
              >
                <span className="mc-pixel-font text-[11px]">/proyectos</span>
                <span className="text-[#c79eff]">Ir a Biblioteca</span>
              </a>
              <button
                onClick={() => {
                  copyEmail()
                  setCommandOpen(false)
                }}
                className="mc-cmd-row w-full text-left"
              >
                <span className="mc-pixel-font text-[11px]">/copiar-email</span>
                <span className="text-[#2ee86c]">luvalprojects@gmail.com</span>
              </button>
              <a
                href="/CV_Valdenegro-Luis.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setCommandOpen(false)}
                className="mc-cmd-row"
              >
                <span className="mc-pixel-font text-[11px]">/cv</span>
                <span className="text-[#ffe694]">Abrir Currículum</span>
              </a>
              {onReturnNormal && (
                <button
                  type="button"
                  onClick={() => {
                    setCommandOpen(false)
                    onReturnNormal()
                  }}
                  className="mc-cmd-row w-full text-left"
                >
                  <span className="mc-pixel-font text-[11px]">/overworld</span>
                  <span className="text-[#52ffd5]">Volver al Overworld</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t-2 border-[#3a1f5e] text-[10px] mc-pixel-font text-[#c7b8db] text-center">
              PRESIONA <kbd className="px-1.5 py-0.5 bg-[#2a124a] border border-[#7c30a4] text-[#ffe694]">ESC</kbd> PARA CERRAR
            </div>
          </div>
        </div>
      )}

      {/* ── PROJECT ARCHITECTURE MODAL: MINECRAFT ENCHANTED OPEN BOOK ── */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className={`mc-open-book-modal fixed inset-0 z-50 overflow-y-auto px-3 py-6 sm:px-8 sm:py-10 ${bookTurn ? "detail-turn-reverse" : "detail-turn-forward"}${turningOut ? " is-turning-out" : ""}`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            key={selectedProject.id}
            className="mc-open-book-shell mx-auto w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer Enchanted Leather & Gold Clasps Top Bar */}
            <div className="mc-book-hud-header">
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="mc-book-emblem-slot shrink-0">
                  <PixelBookSprite size={34} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="mc-pixel-font text-[11px] font-bold px-2 py-0.5 bg-[#5c1b9e] border-2 border-[#14062e] text-[#ffe6b2]">
                      {selectedProject.year} · {selectedProject.category}
                    </span>
                    <span className="inline-flex items-center gap-1 mc-pixel-font text-[10px] text-[#7dff9b]">
                      <PixelEmeraldIcon size={18} />
                      <span>LVL 96 · TOMO ENCANTADO</span>
                    </span>
                  </div>
                  <h3 className="mc-pixel-font text-xl sm:text-3xl font-bold text-[#ffffff] leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="mc-book-close-btn shrink-0"
                aria-label="Cerrar ficha del proyecto"
              >
                <PixelCloseIcon size={22} />
              </button>
            </div>

            {/* Inner Parchment / Reading Desk Body */}
            <div className="mc-open-book-pages space-y-7">
              {/* Chapter I: Lore Scroll */}
              <div className="mc-book-lore-scroll">
                <div className="flex items-center gap-2 mb-2.5">
                  <PixelDiamondIcon size={22} />
                  <span className="mc-pixel-font text-xs font-bold text-[#ffcf4d] tracking-wider">
                    CAPÍTULO I · DESCRIPCIÓN DEL TOMO
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--mc-book-ink)] leading-relaxed mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlights.map((highlight) => (
                    <span key={highlight} className="mc-enchant-tag">
                      <PixelXpOrbIcon size={18} />
                      <span className="mc-pixel-font text-[11px]">{highlight}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Chapter II: Crafting Recipe Architecture Breakdown (Reference Image 3 Popup) */}
              <section className="mc-book-crafting-section">
                <div className="flex items-center gap-2.5 mb-4">
                  <PixelCraftingTableIcon size={28} />
                  <h4 className="mc-pixel-font text-sm sm:text-base font-bold text-[var(--mc-book-ink)] tracking-wide">
                    CAPÍTULO II · RECETA DE ARQUITECTURA TÉCNICA
                  </h4>
                </div>
                <ol className="mc-arch-grid">
                  {selectedProject.architecture.map((item, idx) => (
                    <li key={idx} className="mc-arch-slot">
                      <span className="mc-arch-num mc-pixel-font">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-[var(--mc-book-ink)]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Chapter III: Inventory Slots for Languages & Tools (Reference Images 2 & 3) */}
              <section className="mc-book-inventory-section">
                <div className="flex items-center gap-2.5 mb-4">
                  <PixelAnvilSprite size={28} />
                  <h4 className="mc-pixel-font text-sm sm:text-base font-bold text-[var(--mc-book-ink)] tracking-wide">
                    CAPÍTULO III · INVENTARIO DE LENGUAJES Y STACK
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-5">
                  <div>
                    <h5 className="mc-pixel-font text-[11px] font-bold text-[#ffcf4d] mb-2.5 tracking-wider">
                      LENGUAJES PRINCIPALES
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {projectLanguages(selectedProject).map(({ name, techKey }) => (
                        <div
                          className="mc-inventory-slot"
                          key={name}
                          title={name}
                          aria-label={`Lenguaje: ${name}`}
                          tabIndex={0}
                        >
                          <PixelTechBadge techKey={techKey} size={38} />
                          <strong className="mc-pixel-font text-[11px] leading-tight">{name}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="mc-pixel-font text-[11px] font-bold text-[#df96ff] mb-2.5 tracking-wider">
                      HERRAMIENTAS &amp; CONCEPTOS
                    </h5>
                    <div className="flex flex-wrap gap-2.5 mb-3">
                      {selectedProject.stack
                        .filter((item) => !isLanguageTechnology(item) && isPixelToolTechnology(item))
                        .map((item) => (
                          <div
                            className="mc-inventory-slot mc-inventory-tech-slot"
                            key={item}
                            title={item}
                            aria-label={`Tecnología: ${item}`}
                            tabIndex={0}
                          >
                            <PixelTechBadge techKey={getPixelTechKey(item)} size={38} />
                            <strong className="mc-pixel-font text-[10px] leading-tight">{item}</strong>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack
                        .filter((item) => !isLanguageTechnology(item) && !isPixelToolTechnology(item))
                        .map((item) => (
                          <span key={item} className="mc-concept-rune mc-pixel-font">
                            {item}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Action Strip inside the Open Book */}
            <div className="mc-book-footer-bar">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => moveBook(-1)} className="mc-btn-secondary px-4 py-2.5 text-xs mc-pixel-font font-bold">
                  ← ANTERIOR
                </button>
                <button type="button" onClick={() => moveBook(1)} className="mc-btn-secondary px-4 py-2.5 text-xs mc-pixel-font font-bold">
                  SIGUIENTE →
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={selectedProject.githubIsPrivate ? "Requiere acceso al repositorio privado" : undefined}
                  className="mc-btn-secondary inline-flex items-center gap-2.5 px-4 py-2.5 text-xs mc-pixel-font font-bold"
                >
                  <Github size={22} />
                  <span>{selectedProject.githubIsPrivate ? "REPOSITORIO PRIVADO" : "REPOSITORIO GITHUB"}</span>
                </a>

                {selectedProject.demoUnavailable ? (
                  <span
                    className="mc-demo-unavailable inline-flex items-center gap-2.5 px-4 py-2.5 text-xs mc-pixel-font font-bold"
                    title="El despliegue público de CampusSwap no está disponible actualmente"
                  >
                    DEMO TEMPORALMENTE NO DISPONIBLE
                  </span>
                ) : selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mc-btn-primary inline-flex items-center gap-2.5 px-4 py-2.5 text-xs mc-pixel-font font-bold"
                  >
                    <span>PROBAR DEMO EN VIVO</span>
                    <PixelExternalLinkIcon size={22} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MINECRAFT OPEN CHEST MODAL FOR TIMELINE MILESTONES ── */}
      {selectedTimelineItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedTimelineItem(null)}
        >
          <div
            className="mc-open-chest-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedTimelineItem.chestTitle}
          >
            <div className="mc-chest-shell">
              {/* Open Chest Raised Wooden Lid Header */}
              <div className="mc-chest-lid-header">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="mc-chest-sprite-frame shrink-0">
                    <PixelOpenChestSprite size={46} />
                  </div>
                  <div className="min-w-0">
                    <span className="mc-pixel-font text-[10px] tracking-widest text-[#ffe66d] block truncate">
                      {selectedTimelineItem.chestTitle}
                    </span>
                    <h3 className="mc-pixel-font text-base sm:text-xl font-bold text-[#ffffff] leading-snug">
                      {selectedTimelineItem.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono text-[#ffdfa8]">
                      <span>{selectedTimelineItem.institution}</span>
                      <span className="text-[#8a5d32]">·</span>
                      <span className="text-[#52ffd5] font-bold">{selectedTimelineItem.period}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTimelineItem(null)}
                  className="mc-close-btn shrink-0"
                  aria-label="Cerrar cofre de trayectoria"
                >
                  <PixelCloseIcon size={18} />
                </button>
              </div>

              {/* Open Chest Inner Wood Cavity & Loot Slots */}
              <div className="mc-chest-body space-y-5">
                <div className="mc-chest-summary-box">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="mc-pixel-font text-[11px] font-bold text-[#ffcf4d] tracking-wider">
                      RESUMEN DE LA MISIÓN
                    </span>
                    <span className="mc-quest-badge mc-pixel-font">{selectedTimelineItem.badge}</span>
                  </div>
                  <p className="text-sm text-[#f7eedc] font-semibold mb-2">
                    {selectedTimelineItem.lootSummary}
                  </p>
                  <p className="text-xs sm:text-sm text-[#d6c9b2] leading-relaxed">
                    {selectedTimelineItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="mc-pixel-font text-xs font-bold text-[#52ffd5] mb-3 tracking-wider">
                    BITÁCORA TÉCNICA E HITOS
                  </h4>
                  <div className="space-y-2.5">
                    {selectedTimelineItem.details.map((detail, idx) => (
                      <div key={idx} className="mc-chest-detail-row">
                        <span className="mc-pixel-font text-[11px] font-bold text-[#ffcf4d] shrink-0">
                          [{String(idx + 1).padStart(2, "0")}]
                        </span>
                        <span className="text-xs sm:text-sm text-[#efe7d8] leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mc-pixel-font text-xs font-bold text-[#ffcf4d] mb-3 tracking-wider">
                    RANURAS DE EQUIPAMIENTO ({selectedTimelineItem.techStack.length} ITEMS)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {selectedTimelineItem.techStack.map((tech) => (
                      <div key={tech} className="mc-chest-loot-slot" title={tech}>
                        <PixelTechBadge techKey={getPixelTechKey(tech)} size={36} className="shrink-0" />
                        <span className="mc-pixel-font text-[10px] text-[#ffffff] leading-tight truncate">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links Bar (GitHub / Live Sites when available, clean informational note otherwise) */}
                <div className="pt-3 border-t-2 border-[#4d351c] flex flex-wrap items-center justify-between gap-3">
                  {selectedTimelineItem.links && selectedTimelineItem.links.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      {selectedTimelineItem.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`${
                            link.kind === "web" ? "mc-btn-primary" : "mc-btn-secondary"
                          } inline-flex items-center gap-2 px-3.5 py-2 text-xs mc-pixel-font font-bold`}
                        >
                          {link.kind === "github" ? (
                            <Github size={18} />
                          ) : (
                            <PixelExternalLinkIcon size={18} />
                          )}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="mc-pixel-font text-[10px] text-[#cbb89a] tracking-wider">
                      REGISTRO INFORMATIVO DE EXPERIENCIA · SIN REPOSITORIO EXTERNO
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedTimelineItem(null)}
                    className="mc-btn-secondary px-4 py-2 text-xs mc-pixel-font font-bold"
                  >
                    CERRAR COFRE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CrtPcTransition
        mode="collapse"
        active={crtLaunching}
        onComplete={handleCrtLaunchComplete}
      />
    </div>
  )
}
