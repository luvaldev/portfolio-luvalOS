import TechReact from "./TechReact"
import TechReactHookForm from "./TechReactHookForm"
import TechTailwind from "./TechTailwind"
import TechNext from "./TechNext"
import TechNextAuth from "./TechNextAuth"
import TechMotion from "./TechMotion"
import TechPrisma from "./TechPrisma"
import TechPostgres from "./TechPostgres"
import TechSupabase from "./TechSupabase"
import TechZod from "./TechZod"
import TechGoogle from "./TechGoogle"
import TechNest from "./TechNest"
import TechESP32 from "./TechESP32"
import TechFlutter from "./TechFlutter"
import TechFusion from "./TechFusion"
import TechThree from "./TechThree"
import TechGSAP from "./TechGSAP"
import TechMercadoPago from "./TechMercadoPago"
import TechWebpay from "./TechWebpay"
import TechDocker from "./TechDocker"
import TechApache from "./TechApache"
import TechWireshark from "./TechWireshark"
import TechScapy from "./TechScapy"
import TechPydantic from "./TechPydantic"
import TechTyper from "./TechTyper"
import TechRich from "./TechRich"
import TechFastAPI from "./TechFastAPI"
import TechSQLite from "./TechSQLite"
import TechYAML from "./TechYAML"
import TechChrome from "./TechChrome"
import TechGmail from "./TechGmail"
import TechOutlook from "./TechOutlook"
import TechNode from "./TechNode"
import TechExpress from "./TechExpress"
import TechHandlebars from "./TechHandlebars"
import TechMaven from "./TechMaven"
import TechRedis from "./TechRedis"
import TechJWT from "./TechJWT"
import TechBcrypt from "./TechBcrypt"
import TechSpigot from "./TechSpigot"
import TechVelocity from "./TechVelocity"
import TechWorldGuard from "./TechWorldGuard"
import TechHikari from "./TechHikari"
import TechFreeRTOS from "./TechFreeRTOS"
import TechBLE from "./TechBLE"

const technologyIcons = [
  { match: /^React Hook Form/i, icon: TechReactHookForm },
  { match: /^React Three Fiber/i, icon: TechThree },
  { match: /^React(?:\s|$)/i, icon: TechReact },
  { match: /^Tailwind/i, icon: TechTailwind },
  { match: /^NextAuth/i, icon: TechNextAuth },
  { match: /^Next\.js/i, icon: TechNext },
  { match: /^Framer Motion/i, icon: TechMotion },
  { match: /^Prisma/i, icon: TechPrisma },
  { match: /^PostgreSQL/i, icon: TechPostgres },
  { match: /^Supabase/i, icon: TechSupabase },
  { match: /^Zod/i, icon: TechZod },
  { match: /^Google OAuth/i, icon: TechGoogle },
  { match: /^NestJS/i, icon: TechNest },
  { match: /^ESP32/i, icon: TechESP32 },
  { match: /^Flutter/i, icon: TechFlutter },
  { match: /^Fusion 360/i, icon: TechFusion },
  { match: /^Three\.js/i, icon: TechThree },
  { match: /^GSAP/i, icon: TechGSAP },
  { match: /^Mercado Pago/i, icon: TechMercadoPago },
  { match: /^Webpay/i, icon: TechWebpay },
  { match: /^Docker/i, icon: TechDocker },
  { match: /^Apache HTTP/i, icon: TechApache },
  { match: /^Wireshark/i, icon: TechWireshark },
  { match: /^Scapy/i, icon: TechScapy },
  { match: /^Pydantic/i, icon: TechPydantic },
  { match: /^Typer/i, icon: TechTyper },
  { match: /^Rich$/i, icon: TechRich },
  { match: /^FastAPI/i, icon: TechFastAPI },
  { match: /^SQLite/i, icon: TechSQLite },
  { match: /^PyYAML/i, icon: TechYAML },
  { match: /^Manifest V3/i, icon: TechChrome },
  { match: /^Chrome Extensions/i, icon: TechChrome },
  { match: /^Gmail/i, icon: TechGmail },
  { match: /^Outlook/i, icon: TechOutlook },
  { match: /^Node\.js/i, icon: TechNode },
  { match: /^Express/i, icon: TechExpress },
  { match: /^Handlebars/i, icon: TechHandlebars },
  { match: /^Maven/i, icon: TechMaven },
  { match: /^RedisDub/i, icon: TechRedis },
  { match: /^JWT/i, icon: TechJWT },
  { match: /^bcrypt/i, icon: TechBcrypt },
  { match: /^Spigot/i, icon: TechSpigot },
  { match: /^Velocity/i, icon: TechVelocity },
  { match: /^WorldGuard/i, icon: TechWorldGuard },
  { match: /^HikariCP/i, icon: TechHikari },
  { match: /^FreeRTOS/i, icon: TechFreeRTOS },
  { match: /^BLE$/i, icon: TechBLE },
]

export function getProjectTechnologyIcon(name: string) {
  return technologyIcons.find(({ match }) => match.test(name))?.icon ?? null
}
