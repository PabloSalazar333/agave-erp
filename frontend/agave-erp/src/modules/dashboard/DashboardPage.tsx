import { useThemeStore } from '@/store/ui.store'
import { useAuthStore } from '@/store/auth.store'

const THEME = {
    light: { bg: '#f4f6f8', surface: '#fff', surfaceAlt: '#f0f4f3', border: '#e2ebe8', text: '#1a2e2a', textMuted: '#5a7a72', cardShadow: '0 2px 8px rgba(15,36,32,0.06)' },
    dark: { bg: '#0a1a17', surface: '#0f2420', surfaceAlt: '#132b26', border: '#1e3d35', text: '#e0f0ec', textMuted: '#7aada3', cardShadow: '0 2px 8px rgba(0,0,0,0.2)' },
}

// Mini sparkline SVG
const Spark = ({ data, color }: { data: number[]; color: string }) => {
    const w = 100, h = 32
    const max = Math.max(...data), min = Math.min(...data)
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w
        const y = h - ((v - min) / (max - min || 1)) * h * 0.85 - 2
        return `${x},${y}`
    }).join(' ')
    return (
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
            <polygon points={`${pts} ${w},${h} 0,${h}`} fill={color} opacity="0.12" />
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
    )
}

const KPI = ({ title, value, delta, icon, color, spark, t }: {
    title: string; value: string; delta: number; icon: string; color: string
    spark: number[]; t: typeof THEME.light
}) => (
    <div style={{ background: t.surface, borderRadius: 14, padding: '18px 20px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow, flex: 1, minWidth: 180 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: t.text, lineHeight: 1 }}>{value}</div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
        </div>
        <Spark data={spark} color={color} />
        <div style={{ marginTop: 6, fontSize: 12, color: delta > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
            {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}% vs mes anterior
        </div>
    </div>
)

export default function DashboardPage() {
    const { dark } = useThemeStore()
    const { user } = useAuthStore()
    const t = THEME[dark ? 'dark' : 'light']

    const kpis = [
        { title: 'Revenue Total', value: '$48,295', delta: 12.4, icon: '💰', color: '#1a9e7e', spark: [30,45,28,60,52,68,55,75,62,80,70,88] },
        { title: 'Órdenes Activas', value: '142', delta: 8.1, icon: '🍽️', color: '#6366f1', spark: [18,22,19,28,24,32,28,35,30,40,35,42] },
        { title: 'Ocupación Hotel', value: '78%', delta: -3.2, icon: '🏨', color: '#f59e0b', spark: [80,76,82,78,74,76,80,78,82,76,80,78] },
        { title: 'Citas Hoy', value: '36', delta: 15.6, icon: '📅', color: '#ec4899', spark: [20,25,22,30,28,32,28,38,34,40,36,42] },
    ]

    const recentActivity = [
        { icon: '✅', text: 'Orden #4521 completada — Mesa 7', time: '2m', color: '#10b981' },
        { icon: '🔑', text: 'Check-in Room 204 — García, M.', time: '15m', color: '#1a9e7e' },
        { icon: '⚠️', text: 'Stock bajo: Tomates (3 unidades)', time: '22m', color: '#f59e0b' },
        { icon: '💳', text: 'Factura #INV-1042 pagada', time: '1h', color: '#6366f1' },
        { icon: '👤', text: 'Nuevo usuario registrado via /api/users', time: '2h', color: '#ec4899' },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Welcome */}
            <div style={{ background: 'linear-gradient(135deg,#0d7a5f,#1a9e7e)', borderRadius: 16, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 32px #1a9e7e33' }}>
                <div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Bienvenido de regreso 👋</div>
                    <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 2 }}>
                        {user?.firstName} {user?.lastName}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4 }}>
                        {user?.role?.replace('ROLE_', '')} · {user?.tenantName ?? 'Sin tenant'} · Backend: localhost:8081
                    </div>
                </div>
                <div style={{ fontSize: 48 }}>🌵</div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {kpis.map((k) => <KPI key={k.title} {...k} t={t} />)}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {/* API Status */}
                <div style={{ flex: 1, minWidth: 280, background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>Estado de Servicios</div>
                        <div style={{ fontSize: 12, color: t.textMuted }}>Microservicios AGAVE-ERP</div>
                    </div>
                    {[
                        { name: 'API Gateway', port: 8080, status: 'online' },
                        { name: 'Core API (ERP)', port: 8081, status: 'online' },
                        { name: 'Identity Service', port: 8082, status: 'online' },
                        { name: 'Eureka Discovery', port: 8761, status: 'online' },
                        { name: 'PostgreSQL', port: 5433, status: 'online' },
                    ].map((svc) => (
                        <div key={svc.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: `1px solid ${t.border}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b98166' }} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{svc.name}</div>
                                    <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>localhost:{svc.port}</div>
                                </div>
                            </div>
                            <span style={{ background: '#10b98118', color: '#10b981', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>ONLINE</span>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div style={{ flex: 2, minWidth: 280, background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>Actividad Reciente</div>
                        <div style={{ fontSize: 12, color: t.textMuted }}>Todos los módulos</div>
                    </div>
                    {recentActivity.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderBottom: `1px solid ${t.border}` }}>
                            <div style={{ width: 34, height: 34, borderRadius: 8, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: t.text }}>{a.text}</div>
                            </div>
                            <div style={{ fontSize: 11, color: t.textMuted, flexShrink: 0 }}>{a.time} ago</div>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div style={{ flex: 1, minWidth: 200, background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>Acceso Rápido</div>
                    </div>
                    {[
                        { label: 'Gestionar Usuarios', icon: '👤', path: '/admin/users', color: '#6366f1' },
                        { label: 'Empresas / Tenants', icon: '🏢', path: '/admin/roles', color: '#1a9e7e' },
                        { label: 'Nueva Orden', icon: '🍽️', path: '/restaurant/orders', color: '#f59e0b' },
                        { label: 'Ver Habitaciones', icon: '🛏️', path: '/hotel/rooms', color: '#ec4899' },
                    ].map((link) => (
                        <a key={link.label} href={link.path} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderBottom: `1px solid ${t.border}`, textDecoration: 'none', color: t.text }}>
                            <div style={{ width: 34, height: 34, borderRadius: 8, background: link.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{link.icon}</div>
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{link.label}</span>
                            <span style={{ marginLeft: 'auto', color: t.textMuted, fontSize: 14 }}>→</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
