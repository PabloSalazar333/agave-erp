import { create } from 'zustand'

// ─── THEME STORE ──────────────────────────────────────────────────────────────
interface ThemeState {
    dark: boolean
    toggle: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    dark: localStorage.getItem('agave_theme') === 'dark',
    toggle: () => {
        const next = !get().dark
        localStorage.setItem('agave_theme', next ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
        set({ dark: next })
    },
}))

// ─── SIDEBAR STORE ────────────────────────────────────────────────────────────
interface SidebarState {
    collapsed: boolean
    openMenus: string[]
    setCollapsed: (v: boolean) => void
    toggleMenu: (id: string) => void
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
    collapsed: false,
    openMenus: ['restaurant'],

    setCollapsed: (collapsed) => set({ collapsed }),

    toggleMenu: (id) => {
        const { openMenus } = get()
        const exists = openMenus.includes(id)
        set({
            openMenus: exists
                ? openMenus.filter((m) => m !== id)
                : [...openMenus, id],
        })
    },
}))
