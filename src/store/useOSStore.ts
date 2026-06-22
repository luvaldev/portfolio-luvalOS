import { create } from 'zustand'
import React from 'react'

export interface WindowData {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  isMaximized?: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  content?: React.ReactNode
}

interface OSState {
  windows: Record<string, WindowData>
  focusedWindowId: string | null
  zIndexCounter: number
  openWindow: (id: string, initialData?: Partial<WindowData>) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, x: number, y: number) => void
}

export const useOSStore = create<OSState>((set) => ({
  windows: {},
  focusedWindowId: null,
  zIndexCounter: 10,

  openWindow: (id, initialData) => set((state) => {
    const isAlreadyOpen = !!state.windows[id]
    const newZIndex = state.zIndexCounter + 1

    if (isAlreadyOpen) {
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: false,
            isFocused: true,
            zIndex: newZIndex,
            // Update content if provided
            ...(initialData?.content ? { content: initialData.content } : {}),
          }
        },
        focusedWindowId: id,
        zIndexCounter: newZIndex
      }
    }

    return {
      windows: {
        ...state.windows,
        [id]: {
          id,
          title: initialData?.title || 'Window',
          icon: initialData?.icon || '📁',
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
          x: initialData?.x ?? 100,
          y: initialData?.y ?? 80,
          width: initialData?.width ?? 960,
          height: initialData?.height ?? 650,
          zIndex: newZIndex,
          content: initialData?.content,
        }
      },
      focusedWindowId: id,
      zIndexCounter: newZIndex
    }
  }),

  closeWindow: (id) => set((state) => {
    const newWindows = { ...state.windows }
    delete newWindows[id]
    return {
      windows: newWindows,
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
    }
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true, isFocused: false }
    },
    focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
  })),

  toggleMaximize: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

  focusWindow: (id) => set((state) => {
    if (state.focusedWindowId === id && state.windows[id]?.isFocused && !state.windows[id]?.isMinimized) return state
    const newZIndex = state.zIndexCounter + 1
    // unfocus all, then focus id
    const newWindows = { ...state.windows }
    Object.keys(newWindows).forEach(key => {
      newWindows[key] = {
        ...newWindows[key],
        isFocused: key === id,
        ...(key === id ? { zIndex: newZIndex, isMinimized: false } : {}) // unminimize the focused window
      }
    })
    return {
      windows: newWindows,
      focusedWindowId: id,
      zIndexCounter: newZIndex
    }
  }),

  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], x, y }
    }
  }))
}))
