// ─── ENUMS (match backend exactly) ───────────────────────────────────────────

export type Role =
    | 'ROLE_SUPER_ADMIN'
    | 'ROLE_ADMIN'
    | 'ROLE_FINANCE'
    | 'ROLE_COLLECTION'
    | 'ROLE_HR'
    | 'ROLE_LOGISTICS'
    | 'ROLE_SALES'
    | 'ROLE_PURCHASING'
    | 'ROLE_USER'
    | 'ROLE_DEV'
    | 'ROLE_QA'
    | 'ROLE_BA'
    | 'ROLE_SUPPORT'

export type IndustryType = 'RESTAURANT' | 'HOTEL' | 'CLINIC' | 'GENERIC'

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    type: string
    user: UserResponse
}

// ─── USER ─────────────────────────────────────────────────────────────────────

export interface UserResponse {
    id: string
    email: string
    firstName: string
    lastName: string
    active: boolean
    createdAt: string
    tenantId: string | null
    tenantName: string | null
    role: Role
}

export interface UserCreateRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    tenantId?: string
    role?: Role
}

// ─── TENANT ───────────────────────────────────────────────────────────────────

export interface TenantResponse {
    id: string
    name: string
    active: boolean
    createdAt: string
    type?: IndustryType
}

export interface TenantCreateRequest {
    name: string
    type?: IndustryType
}

// ─── API GENERIC ──────────────────────────────────────────────────────────────

export interface ApiError {
    message: string
    status: number
    timestamp?: string
    errors?: Record<string, string>
}

export interface PagedResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    size: number
    number: number
}
