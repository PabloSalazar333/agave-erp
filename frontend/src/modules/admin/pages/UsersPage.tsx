import { useState } from 'react'
import { useUsers, useCreateUser } from '../../../hooks/useApi'
import { useThemeStore } from '../../../store/ui.store'
import type { UserCreateRequest, Role } from '../../../types'

const THEME = {
    light: { surface: '#fff', surfaceAlt: '#f0f4f3', border: '#e2ebe8', text: '#1a2e2a', textMuted: '#5a7a72', cardShadow: '0 2px 8px rgba(15,36,32,0.06)' },
    dark: { surface: '#0f2420', surfaceAlt: '#132b26', border: '#1e3d35', text: '#e0f0ec', textMuted: '#7aada3', cardShadow: '0 2px 8px rgba(0,0,0,0.2)' },
}

const ROLES: Role[] = [
    'ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FINANCE','ROLE_HR',
    'ROLE_LOGISTICS','ROLE_SALES','ROLE_PURCHASING','ROLE_USER',
    'ROLE_SUPPORT',
]

const roleColor: Record<string, string> = {
    ROLE_SUPER_ADMIN: '#ef4444', ROLE_ADMIN: '#6366f1', ROLE_FINANCE: '#f59e0b',
    ROLE_HR: '#ec4899', ROLE_SALES: '#1a9e7e', ROLE_USER: '#64748b',
}

export default function UsersPage() {
    const { dark } = useThemeStore()
    const t = THEME[dark ? 'dark' : 'light']
    const { data: users, isLoading, error } = useUsers()
    const createUser = useCreateUser()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState<UserCreateRequest>({
        email: '', password: '', firstName: '', lastName: '', role: 'ROLE_USER',
    })
    const [formError, setFormError] = useState('')

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')
        try {
            await createUser.mutateAsync(form)
            setShowForm(false)
            setForm({ email: '', password: '', firstName: '', lastName: '', role: 'ROLE_USER' })
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al crear usuario'
            setFormError(msg)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Usuarios</h1>
                    <p style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>
                        Gestiona los usuarios del sistema · Endpoint: GET /api/users
                    </p>
                </div>
                <button onClick={() => setShowForm(true)} style={{
                    background: 'linear-gradient(135deg,#1a9e7e,#0d7a5f)', border: 'none',
                    color: '#fff', borderRadius: 10, padding: '9px 20px',
                    fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
                }}>+ Nuevo Usuario</button>
            </div>

            {/* Create form */}
            {showForm && (
                <div style={{ background: t.surface, borderRadius: 14, padding: 24, border: `1px solid #1a9e7e33`, boxShadow: t.cardShadow }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Crear Usuario → POST /api/users</h3>
                    {formError && (
                        <div style={{ background: '#ef444415', border: '1px solid #ef444433', borderRadius: 8, padding: '8px 12px', color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{formError}</div>
                    )}
                    <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {([
                            ['email', 'Email', 'email'],
                            ['password', 'Contraseña', 'password'],
                            ['firstName', 'Nombre', 'text'],
                            ['lastName', 'Apellido', 'text'],
                        ] as [keyof UserCreateRequest, string, string][]).map(([field, label, type]) => (
                            <div key={field}>
                                <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: 'block', marginBottom: 5 }}>{label}</label>
                                <input
                                    type={type} required value={form[field] as string}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                    style={{
                                        width: '100%', padding: '9px 12px',
                                        background: t.surfaceAlt, border: `1px solid ${t.border}`,
                                        borderRadius: 8, color: t.text, fontSize: 13, outline: 'none',
                                    }}
                                />
                            </div>
                        ))}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: 'block', marginBottom: 5 }}>Rol</label>
                            <select
                                value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                                style={{ width: '100%', padding: '9px 12px', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, color: t.text, fontSize: 13, outline: 'none' }}
                            >
                                {ROLES.map((r) => <option key={r} value={r}>{r.replace('ROLE_', '')}</option>)}
                            </select>
                        </div>
                        <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                            <button type="button" onClick={() => setShowForm(false)} style={{ background: t.surfaceAlt, border: `1px solid ${t.border}`, color: t.textMuted, borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 }}>Cancelar</button>
                            <button type="submit" disabled={createUser.isPending} style={{ background: '#1a9e7e', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                {createUser.isPending ? 'Creando...' : 'Crear Usuario'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Users table */}
            <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                {isLoading && (
                    <div style={{ padding: 40, textAlign: 'center', color: t.textMuted }}>
                        Cargando usuarios desde /api/users...
                    </div>
                )}
                {error && (
                    <div style={{ padding: 24, color: '#ef4444', textAlign: 'center' }}>
                        ⚠️ Error al conectar con la API. Verifica que el backend esté corriendo en localhost:8081
                    </div>
                )}
                {!isLoading && !error && (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ background: t.surfaceAlt }}>
                            {['Nombre', 'Email', 'Rol', 'Tenant', 'Estado', 'Creado'].map((h) => (
                                <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: t.textMuted, letterSpacing: 0.5 }}>{h.toUpperCase()}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {(users ?? []).map((user, i) => (
                            <tr key={user.id} style={{ borderTop: `1px solid ${t.border}` }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceAlt)}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                            >
                                <td style={{ padding: '12px 18px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 8,
                                            background: `hsl(${(i * 67) % 360},60%,65%)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0,
                                        }}>
                                            {user.firstName[0]}{user.lastName[0]}
                                        </div>
                                        <span style={{ fontWeight: 500, fontSize: 13.5, color: t.text }}>
                        {user.firstName} {user.lastName}
                      </span>
                                    </div>
                                </td>
                                <td style={{ padding: '12px 18px', fontSize: 13, color: t.textMuted }}>{user.email}</td>
                                <td style={{ padding: '12px 18px' }}>
                    <span style={{
                        background: (roleColor[user.role] ?? '#888') + '18',
                        color: roleColor[user.role] ?? '#888',
                        borderRadius: 6, padding: '3px 10px', fontSize: 11.5, fontWeight: 600,
                    }}>{user.role.replace('ROLE_', '').replace('_', ' ')}</span>
                                </td>
                                <td style={{ padding: '12px 18px', fontSize: 13, color: t.textMuted }}>{user.tenantName ?? '—'}</td>
                                <td style={{ padding: '12px 18px' }}>
                    <span style={{
                        background: user.active ? '#10b98118' : '#ef444418',
                        color: user.active ? '#10b981' : '#ef4444',
                        borderRadius: 6, padding: '3px 10px', fontSize: 11.5, fontWeight: 600,
                    }}>{user.active ? 'Activo' : 'Inactivo'}</span>
                                </td>
                                <td style={{ padding: '12px 18px', fontSize: 12, color: t.textMuted }}>
                                    {new Date(user.createdAt).toLocaleDateString('es-MX')}
                                </td>
                            </tr>
                        ))}
                        {users?.length === 0 && (
                            <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: t.textMuted }}>No hay usuarios registrados</td></tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
