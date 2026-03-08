import { create } from 'zustand'
import type { UserResponse, Role } from '@/types'

interface AuthState {
    token: string | null
    user: UserResponse | null
    isAuthenticated: boolean

    // Actions
    setAuth: (token: string, user: UserResponse) => void
    logout: () => void
    hasRole: (role: Role) => boolean
    isSuperAdmin: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
    // Hydrate from localStorage on init
    token: localStorage.getItem('agave_token'),
    user: (() => {
        try {
            const raw = localStorage.getItem('agave_user')
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    })(),
    isAuthenticated: !!localStorage.getItem('agave_token'),

    setAuth: (token, user) => {
        localStorage.setItem('agave_token', token)
        localStorage.setItem('agave_user', JSON.stringify(user))
        set({ token, user, isAuthenticated: true })
    },

    logout: () => {
        localStorage.removeItem('agave_token')
        localStorage.removeItem('agave_user')
        set({ token: null, user: null, isAuthenticated: false })
    },

    hasRole: (role) => get().user?.role === role,

    isSuperAdmin: () => get().user?.role === 'ROLE_SUPER_ADMIN',
}))
