import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types'

// Core API (port 8081) — all /api/* routes
const api = axios.create({
    baseURL: import.meta.env.VITE_CORE_API || 'http://localhost:8081/api',
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
})

// ── REQUEST INTERCEPTOR — attach JWT ─────────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('agave_token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ── RESPONSE INTERCEPTOR — handle 401 globally ───────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('agave_token')
            localStorage.removeItem('agave_user')
            // Redirect to login without React Router dependency
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api
