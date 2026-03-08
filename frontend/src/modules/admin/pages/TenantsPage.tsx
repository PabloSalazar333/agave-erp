import { useState } from 'react'
import { useTenants, useCreateTenant } from '../../../hooks/useApi'
import { useThemeStore } from '../../../store/ui.store'
import type { TenantCreateRequest } from '../../../types'

const THEME = {
    light: { surface: '#fff', surfaceAlt: '#f0f4f3', border: '#e2ebe8', text: '#1a2e2a', textMuted: '#5a7a72', cardShadow: '0 2px 8px rgba(15,36,32,0.06)' },
    dark: { surface: '#0f2420', surfaceAlt: '#132b26', border: '#1e3d35', text: '#e0f0ec', textMuted: '#7aada3', cardShadow: '0 2px 8px rgba(0,0,0,0.2)' },
}

export default function TenantsPage() {
    const { dark } = useThemeStore()
    const t = THEME[dark ? 'dark' : 'light']
    const { data: tenants, isLoading, error } = useTenants()
    const createTenant = useCreateTenant()
    const [form, setForm] = useState<TenantCreateRequest>({ name: '' })
    const [showForm, setShowForm] = useState(false)

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        await createTenant.mutateAsync(form)
        setShowForm(false)
        setForm({ name: '' })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Tenants / Empresas</h1>
                    <p style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Endpoint: GET /api/tenants</p>
                </div>
                <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg,#1a9e7e,#0d7a5f)', border: 'none', color: '#fff', borderRadius: 10, padding: '9px 20px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>+ Nuevo Tenant</button>
            </div>

            {showForm && (
                <form onSubmit={handleCreate} style={{ background: t.surface, borderRadius: 14, padding: 24, border: `1px solid #1a9e7e33`, display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: 'block', marginBottom: 5 }}>Nombre del Tenant</label>
                        <input required value={form.name} onChange={(e) => setForm({ name: e.target.value })} placeholder="Ej: Restaurante El Agave"
                               style={{ width: '100%', padding: '9px 12px', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, color: t.text, fontSize: 13, outline: 'none' }} />
                    </div>
                    <button type="submit" style={{ background: '#1a9e7e', border: 'none', color: '#fff', borderRadius: 8, padding: '9px 20px', fontWeight: 600, cursor: 'pointer' }}>Crear</button>
                    <button type="button" onClick={() => setShowForm(false)} style={{ background: t.surfaceAlt, border: `1px solid ${t.border}`, color: t.textMuted, borderRadius: 8, padding: '9px 16px', cursor: 'pointer' }}>Cancelar</button>
                </form>
            )}

            <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                {isLoading && <div style={{ padding: 40, textAlign: 'center', color: t.textMuted }}>Cargando tenants...</div>}
                {error && <div style={{ padding: 24, color: '#ef4444', textAlign: 'center' }}>⚠️ Error al conectar con la API</div>}
                {!isLoading && !error && (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ background: t.surfaceAlt }}>
                            {['Nombre', 'Estado', 'Creado'].map((h) => (
                                <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: t.textMuted }}>{h.toUpperCase()}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {(tenants ?? []).map((tenant) => (
                            <tr key={tenant.id} style={{ borderTop: `1px solid ${t.border}` }}>
                                <td style={{ padding: '13px 18px', fontWeight: 500, fontSize: 13.5, color: t.text }}>{tenant.name}</td>
                                <td style={{ padding: '13px 18px' }}>
                    <span style={{ background: tenant.active ? '#10b98118' : '#ef444418', color: tenant.active ? '#10b981' : '#ef4444', borderRadius: 6, padding: '3px 10px', fontSize: 11.5, fontWeight: 600 }}>
                      {tenant.active ? 'Activo' : 'Inactivo'}
                    </span>
                                </td>
                                <td style={{ padding: '13px 18px', fontSize: 12, color: t.textMuted }}>
                                    {new Date(tenant.createdAt).toLocaleDateString('es-MX')}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
