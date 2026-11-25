export interface FlagshipProject {
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

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
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

export interface RepositoryItem {
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

export const REPOSITORIES: RepositoryItem[] = [
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

export const CATEGORY_LABELS: Record<RepositoryItem["category"], string> = {
  security: "Ciberseguridad y redes",
  saas: "Web y SaaS",
  iot: "IoT y sistemas embebidos",
  academic: "Académico y sistemas",
}

export const REPOSITORY_DETAILS: Record<string, Pick<FlagshipProject, "description" | "architecture" | "stack" | "highlights">> = {
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

export const ALL_PROJECTS: FlagshipProject[] = REPOSITORIES.map((repo) => {
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

export const LANGUAGE_MODULES = [
  { name: "Python", techKey: "python", matches: (value: string) => /Python/i.test(value) },
  { name: "TypeScript", techKey: "ts", matches: (value: string) => /TypeScript/i.test(value) },
  { name: "JavaScript", techKey: "js", matches: (value: string) => /^JavaScript$/i.test(value) },
  { name: "C++", techKey: "cpp", matches: (value: string) => /C\+\+/i.test(value) },
  { name: "Java", techKey: "java", matches: (value: string) => /^Java$/i.test(value) },
  { name: "Dart", techKey: "dart", matches: (value: string) => /Dart/i.test(value) },
  { name: "Markdown", techKey: "markdown", matches: (value: string) => /^Markdown$/i.test(value) },
]

export function projectLanguages(project: FlagshipProject) {
  const sources = [REPOSITORIES.find((repo) => repo.id === project.id)?.language ?? "", ...project.stack]
  return LANGUAGE_MODULES.filter((language) => sources.some(language.matches))
}

export function isLanguageTechnology(value: string) {
  return LANGUAGE_MODULES.some((language) => language.matches(value))
}

export interface StackItemData {
  techKey: string
  name: string
  role: string
}

export interface StackGroupData {
  category: string
  iconKey: "languages" | "frontend" | "backend" | "systems" | "ai"
  accent: string
  fullWidth?: boolean
  items: StackItemData[]
}

export const STACK_DATA: StackGroupData[] = [
  {
    category: "Lenguajes de Programación",
    iconKey: "languages",
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
    iconKey: "frontend",
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
    iconKey: "backend",
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
    iconKey: "systems",
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
    iconKey: "ai",
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

export interface CtfEvent {
  date: string
  name: string
  team: string
  rank: number
  placement: string
  url: string
  ctaLabel: string
}

export const CTF_EVENTS: CtfEvent[] = [
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

export const MANIFESTO_RAW_WORDS: Array<{ text: string; accent?: boolean }> = [
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

export const MANIFESTO_TOKENS = (() => {
  let cursor = 0
  return MANIFESTO_RAW_WORDS.map((word) => {
    const start = cursor
    cursor += word.text.length
    return { ...word, start }
  })
})()

export const MANIFESTO_TOTAL_CHARS = MANIFESTO_TOKENS.reduce((acc, word) => acc + word.text.length, 0)

export interface ManifestoPillar {
  id: string
  tag: string
  title: string
  description: string
  accent: string
  iconKey: "shield" | "cpu" | "layers"
}

export const MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    id: "redes",
    tag: "GREMIO // REDES",
    title: "Redes & Ciberseguridad Defensiva",
    description:
      "Comprensión profunda de la pila OSI, especificaciones RFC (SMTP, DNS, HTTP) y análisis de vulnerabilidades mediante inspección de tramas y modelos de confianza.",
    accent: "#2ce5d8",
    iconKey: "shield",
  },
  {
    id: "hardware",
    tag: "GREMIO // HARDWARE",
    title: "Concurrencia & Hardware Embebido",
    description:
      "Manejo de hilos POSIX, exclusión mutua con std::mutex, memoria dinámica en C++ y programación para microcontroladores ESP32 con sensores ToF.",
    accent: "#ffcf4d",
    iconKey: "cpu",
  },
  {
    id: "software",
    tag: "GREMIO // SOFTWARE",
    title: "Sistemas Reactivos & Arquitectura Web",
    description:
      "Next.js 16 con Server Actions, modelado relacional en PostgreSQL y sistemas reactivos de alta precisión optimizados con Framer Motion y GSAP.",
    accent: "#d8b4fe",
    iconKey: "layers",
  },
]

export interface HeroMetric {
  metric: string
  label: string
  sub: string
  accent: string
}

export const HERO_METRICS: HeroMetric[] = [
  { metric: "12+", label: "Repositorios Open Source", sub: "Python, C++, TypeScript", accent: "#c084fc" },
  { metric: "PRÁCTICA I", label: "Práctica Profesional Superada", sub: "Ingeniería Civil Informática · UDP", accent: "#2ce5d8" },
  { metric: "FULL-STACK", label: "Plataformas Web & SaaS", sub: "Next.js 16, React 19 & PostgreSQL", accent: "#a78bfa" },
  { metric: "REDES & SO", label: "Infraestructura, Linux & IoT", sub: "Docker, Scapy, C++ & ESP32", accent: "#f472b6" },
]

export interface TimelineLink {
  label: string
  url: string
  kind: "github" | "web"
}

export interface TimelineItem {
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

export const TIMELINE: TimelineItem[] = [
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

export const TIMELINE_PAIRS: TimelineItem[][] = []
for (let i = 0; i < TIMELINE.length; i += 2) {
  TIMELINE_PAIRS.push(TIMELINE.slice(i, i + 2))
}

export const NAV_ITEMS = [
  { id: "manifiesto", label: "Manifiesto" },
  { id: "actividades", label: "Actividades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Tecnologías" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
]
