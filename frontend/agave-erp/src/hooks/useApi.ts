import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService, tenantService, authService } from '@/services'
import type { UserCreateRequest, TenantCreateRequest } from '@/types'

// ─── USERS ────────────────────────────────────────────────────────────────────
export const useUsers = () =>
    useQuery({
        queryKey: ['users'],
        queryFn: userService.getAll,
        staleTime: 60_000,
    })

export const useUser = (id: string) =>
    useQuery({
        queryKey: ['users', id],
        queryFn: () => userService.getById(id),
        enabled: !!id,
    })

export const useCreateUser = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (payload: UserCreateRequest) => userService.create(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
    })
}

// ─── TENANTS ──────────────────────────────────────────────────────────────────
export const useTenants = () =>
    useQuery({
        queryKey: ['tenants'],
        queryFn: tenantService.getAll,
        staleTime: 120_000,
    })

export const useCreateTenant = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (payload: TenantCreateRequest) => tenantService.create(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tenants'] }),
    })
}

// ─── HEALTH ───────────────────────────────────────────────────────────────────
export const useHealthCheck = () =>
    useQuery({
        queryKey: ['health'],
        queryFn: authService.me,
        retry: false,
        staleTime: 30_000,
    })
