# 💻 luvalOS - The Portfolio Operating System

Welcome to **luvalOS**! This isn't just another static portfolio page; it's a fully interactive, web-based Operating System experience designed to showcase my projects, skills, and creativity in a unique and engaging way.

## ✨ Features

- **🖥️ Desktop Environment:** A familiar, yet modern desktop interface for larger screens. Complete with a taskbar, start menu, and interactive window management.
- **📱 Mobile Experience:** A sleek, optimized mobile view that ensures the portfolio looks great and is fully functional on any device.
- **⚡ Blazing Fast:** Built on top of the cutting-edge Next.js 16 App Router and React 19.
- **🎨 Beautifully Animated:** Powered by Framer Motion for smooth, native-feeling window movements, app launches, and transitions.
- **🧠 Intelligent State:** Leveraging Zustand to effortlessly keep track of open windows, active apps, z-indexes, and system settings.
- **💅 Modern Styling:** Styled with the brand new Tailwind CSS v4, utilizing a custom design system built for maximum flexibility.
- **🌗 Dark/Light Mode:** Seamless theme switching integrated into the OS settings via `next-themes`.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`clsx` + `tailwind-merge`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/) 🥟

## 🚀 Boot Sequence (Getting Started)

Want to boot up luvalOS locally? Here is how to power it on:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio-luvalOS.git
   cd portfolio-luvalOS
   ```

2. **Install dependencies:**
   We recommend using [Bun](https://bun.sh/) for the fastest experience (the project uses `bun.lock`).
   ```bash
   bun install
   ```

3. **Power On (Start development server):**
   ```bash
   bun dev
   ```

4. **Login:**
   Open [http://localhost:3000](http://localhost:3000) in your browser and enjoy the OS!

## 📂 System Architecture

- `/src/app` - Next.js App Router core. The `page.tsx` acts as the display manager, switching between Desktop and Mobile environments based on screen size.
- `/src/components/os` - The core building blocks of the Desktop Environment (Taskbar, Windows, Desktop Icons).
- `/src/components/mobile` - Components tailored specifically for the responsive mobile layout.
- `/src/store` - Zustand stores for managing the OS state globally.
- `/src/lib` - System utility functions and helpers.

---
⭐️ From [@luvaldev](https://github.com/luvaldev)
