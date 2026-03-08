import api from '../config/api'
import type {
    LoginRequest,
    LoginResponse,
    UserResponse,
    UserCreateRequest,
    TenantResponse,
    TenantCreateRequest,
} from '../types'

// ─── AUTH ─────────────────────────────────────────────────────────────────────
// NOTE: Spring Security default login endpoint is /login
// Your backend uses /api/auth/login based on CustomUserDetailsService + JwtTokenProvider
// Adjust the path below if your backend exposes a different auth endpoint

export const authService = {
    /**
     * POST /api/auth/login
     * Returns JWT token + user info
     * Default admin: admin@agaveerp.com / admin123
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>('/auth/login', credentials)
        return data
    },

    /**
     * GET /api/auth/me  — current user from JWT
     */
    me: async (): Promise<UserResponse> => {
        const { data } = await api.get<UserResponse>('/auth/me')
        return data
    },
}

// ─── USERS  (maps to /api/users in UserController.java) ──────────────────────
export const userService = {
    /** GET /api/users */
    getAll: async (): Promise<UserResponse[]> => {
        const { data } = await api.get<UserResponse[]>('/users')
        return data
    },

    /** GET /api/users/:id */
    getById: async (id: string): Promise<UserResponse> => {
        const { data } = await api.get<UserResponse>(`/users/${id}`)
        return data
    },

    /** POST /api/users */
    create: async (payload: UserCreateRequest): Promise<UserResponse> => {
        const { data } = await api.post<UserResponse>('/users', payload)
        return data
    },
}

// ─── TENANTS  (maps to /api/tenants in TenantController.java) ────────────────
export const tenantService = {
    /** GET /api/tenants */
    getAll: async (): Promise<TenantResponse[]> => {
        const { data } = await api.get<TenantResponse[]>('/tenants')
        return data
    },

    /** POST /api/tenants */
    create: async (payload: TenantCreateRequest): Promise<TenantResponse> => {
        const { data } = await api.post<TenantResponse>('/tenants', payload)
        return data
    },
}

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
export const healthService = {
    /** GET /api/hello — backend health check */
    ping: async (): Promise<string> => {
        const { data } = await api.get<string>('/hello')
        return data
    },
}
