import { useState } from 'react'
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { useThemeStore } from '@/store/ui.store'
import { ROUTES } from '@/config/routes'

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEME = {
    light: {
        bg: '#f4f6f8', surface: '#ffffff', surfaceAlt: '#f0f4f3',
        border: '#e2ebe8', text: '#1a2e2a', textMuted: '#5a7a72',
        sidebar: '#0f2420', sidebarText: '#c8ddd9', topbar: '#ffffff',
        shadow: '0 2px 12px rgba(15,36,32,0.08)', cardShadow: '0 2px 8px rgba(15,36,32,0.06)',
    },
    dark: {
        bg: '#0a1a17', surface: '#0f2420', surfaceAlt: '#132b26',
        border: '#1e3d35', text: '#e0f0ec', textMuted: '#7aada3',
        sidebar: '#07120f', sidebarText: '#8ec8bc', topbar: '#0f2420',
        shadow: '0 2px 12px rgba(0,0,0,0.3)', cardShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
    { label: 'Dashboard', icon: '▦', path: ROUTES.DASHBOARD },
    {
        label: 'Restaurant', icon: '🍽', path: ROUTES.RESTAURANT,
        children: [
            { label: 'POS Dashboard', path: ROUTES.RESTAURANT_POS },
            { label: 'Orders', path: ROUTES.RESTAURANT_ORDERS },
            { label: 'Menu', path: ROUTES.RESTAURANT_MENU },
            { label: 'Tables', path: ROUTES.RESTAURANT_TABLES },
            { label: 'Kitchen Display', path: ROUTES.RESTAURANT_KITCHEN },
        ],
    },
    {
        label: 'Hotel', icon: '🏨', path: ROUTES.HOTEL,
        children: [
            { label: 'Rooms', path: ROUTES.HOTEL_ROOMS },
            { label: 'Reservations', path: ROUTES.HOTEL_RESERVATIONS },
            { label: 'Guests', path: ROUTES.HOTEL_GUESTS },
            { label: 'Check-in/out', path: ROUTES.HOTEL_CHECKIN },
        ],
    },
    {
        label: 'Appointments', icon: '📅', path: ROUTES.APPOINTMENTS,
        children: [
            { label: 'Calendar', path: ROUTES.APPOINTMENTS_CALENDAR },
            { label: 'Staff', path: ROUTES.APPOINTMENTS_STAFF },
            { label: 'Booking', path: ROUTES.APPOINTMENTS_BOOKING },
        ],
    },
    { label: 'CRM', icon: '👥', path: ROUTES.CRM },
    { label: 'Inventory', icon: '📦', path: ROUTES.INVENTORY },
    { label: 'Finance', icon: '💰', path: ROUTES.FINANCE },
    { label: 'Reports', icon: '📊', path: ROUTES.REPORTS },
    {
        label: 'Administration', icon: '⚙️', path: ROUTES.ADMIN,
        children: [
            { label: 'Users', path: ROUTES.ADMIN_USERS },
            { label: 'Roles', path: ROUTES.ADMIN_ROLES },
            { label: 'Settings', path: ROUTES.ADMIN_SETTINGS },
            { label: 'Audit Logs', path: ROUTES.ADMIN_AUDIT },
        ],
    },
]

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ t, collapsed, setCollapsed }: {
    t: typeof THEME.light
    collapsed: boolean
    setCollapsed: (v: boolean) => void
}) {
    const location = useLocation()
    const [openMenus, setOpenMenus] = useState<string[]>(['Restaurant'])

    const toggle = (label: string) =>
        setOpenMenus((prev) =>
            prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
        )

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + '/')

    return (
        <aside style={{
            width: collapsed ? 64 : 240, minHeight: '100vh',
            background: t.sidebar, display: 'flex', flexDirection: 'column',
            transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
            boxShadow: '3px 0 20px rgba(0,0,0,0.15)',
            position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
            overflow: 'hidden',
        }}>
            {/* Logo */}
            <div style={{
                padding: collapsed ? '18px 0' : '18px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between', minHeight: 64,
            }}>
                {!collapsed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1a9e7e,#0d7a5f)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌵</div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>AGAVE</div>
                            <div style={{ color: '#1a9e7e', fontSize: 10, letterSpacing: 3, fontWeight: 600 }}>ERP</div>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div onClick={() => setCollapsed(false)} style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1a9e7e,#0d7a5f)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>🌵</div>
                )}
                {!collapsed && (
                    <button onClick={() => setCollapsed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18 }}>✕</button>
                )}
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' }}>
                {NAV.map((item) => {
                    const active = isActive(item.path)
                    const open = openMenus.includes(item.label)
                    return (
                        <div key={item.label}>
                            <NavLink
                                to={item.children ? '#' : item.path}
                                onClick={(e) => { if (item.children) { e.preventDefault(); if (collapsed) setCollapsed(false); toggle(item.label) } }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: collapsed ? '10px 0' : '9px 14px',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    textDecoration: 'none',
                                    borderRadius: collapsed ? 0 : '0 8px 8px 0',
                                    margin: collapsed ? 0 : '1px 8px 1px 0',
                                    background: active ? 'linear-gradient(90deg,#1a9e7e22,#1a9e7e11)' : 'none',
                                    borderLeft: active ? '3px solid #1a9e7e' : '3px solid transparent',
                                    color: active ? '#1a9e7e' : t.sidebarText,
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                                {!collapsed && (
                                    <>
                                        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>{item.label}</span>
                                        {item.children && (
                                            <span style={{ fontSize: 11, opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
                                        )}
                                    </>
                                )}
                            </NavLink>

                            {/* Children */}
                            {item.children && !collapsed && open && (
                                <div>
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            style={({ isActive }) => ({
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                padding: '7px 14px 7px 44px',
                                                textDecoration: 'none', fontSize: 12.5,
                                                color: isActive ? '#1a9e7e' : 'rgba(200,221,217,0.55)',
                                                borderLeft: isActive ? '2px solid #1a9e7e' : '2px solid transparent',
                                                transition: 'all 0.15s',
                                            })}
                                        >
                                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Pro badge */}
            {!collapsed && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ background: 'linear-gradient(135deg,#0d7a5f22,#1a9e7e22)', border: '1px solid #1a9e7e33', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ color: '#1a9e7e', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>PRO PLAN</div>
                        <div style={{ color: 'rgba(200,221,217,0.6)', fontSize: 11 }}>All modules active</div>
                    </div>
                </div>
            )}
        </aside>
    )
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ t, collapsed, setCollapsed }: {
    t: typeof THEME.light
    collapsed: boolean
    setCollapsed: (v: boolean) => void
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuthStore()
    const { dark, toggle } = useThemeStore()
    const [profileOpen, setProfileOpen] = useState(false)

    // Breadcrumb from current path
    const crumb = NAV.flatMap((n) => [
        { label: n.label, path: n.path },
        ...(n.children || []).map((c) => ({ label: c.label, path: c.path })),
    ]).find((r) => location.pathname === r.path || location.pathname.startsWith(r.path + '/'))

    const handleLogout = () => {
        logout()
        navigate(ROUTES.LOGIN)
    }

    return (
        <header style={{
            height: 60, background: t.topbar, borderBottom: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', padding: '0 20px 0 16px',
            gap: 12, boxShadow: t.shadow, position: 'sticky', top: 0, zIndex: 50,
        }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{
                background: 'none', border: `1px solid ${t.border}`, color: t.textMuted,
                borderRadius: 8, cursor: 'pointer', padding: '6px 8px', fontSize: 16,
            }}>☰</button>

            <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>
        {crumb?.label ?? 'Dashboard'}
      </span>

            <div style={{ flex: 1 }} />

            {/* Search */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: t.surfaceAlt, border: `1px solid ${t.border}`,
                borderRadius: 10, padding: '6px 12px', width: 200,
            }}>
                <span style={{ color: t.textMuted, fontSize: 13 }}>🔍</span>
                <input placeholder="Buscar..." style={{
                    background: 'none', border: 'none', outline: 'none',
                    color: t.text, fontSize: 13, width: '100%',
                }} />
            </div>

            {/* Dark mode */}
            <button onClick={toggle} style={{
                background: dark ? '#1a9e7e22' : t.surfaceAlt,
                border: `1px solid ${t.border}`, borderRadius: 8,
                cursor: 'pointer', padding: '7px 10px',
                color: dark ? '#1a9e7e' : t.textMuted, fontSize: 15,
            }}>{dark ? '☀️' : '🌙'}</button>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
                <div onClick={() => setProfileOpen(!profileOpen)} style={{
                    display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    padding: '4px 8px 4px 4px', borderRadius: 10,
                    border: `1px solid ${t.border}`, background: t.surfaceAlt,
                }}>
                    <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: 'linear-gradient(135deg,#1a9e7e,#0d7a5f)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 700, fontSize: 13,
                    }}>
                        {user?.firstName?.[0] ?? 'A'}
                    </div>
                    <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: t.text, lineHeight: 1.2 }}>
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div style={{ fontSize: 10.5, color: t.textMuted }}>
                            {user?.role?.replace('ROLE_', '').replace('_', ' ')}
                        </div>
                    </div>
                    <span style={{ fontSize: 11, color: t.textMuted }}>▼</span>
                </div>

                {profileOpen && (
                    <div style={{
                        position: 'absolute', right: 0, top: 48,
                        background: t.surface, border: `1px solid ${t.border}`,
                        borderRadius: 12, width: 180, boxShadow: t.shadow, zIndex: 200,
                    }}>
                        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.border}` }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: t.text }}>{user?.email}</div>
                            <div style={{ fontSize: 11, color: '#1a9e7e', marginTop: 2 }}>
                                {user?.tenantName ?? 'No Tenant'}
                            </div>
                        </div>
                        <div
                            onClick={handleLogout}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', color: '#ef4444', fontSize: 13 }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceAlt)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                        >
                            🚪 Cerrar Sesión
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

// ─── MAIN LAYOUT ──────────────────────────────────────────────────────────────
export default function MainLayout() {
    const { dark } = useThemeStore()
    const t = THEME[dark ? 'dark' : 'light']
    const [collapsed, setCollapsed] = useState(false)
    const sidebarW = collapsed ? 64 : 240

    return (
        <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'DM Sans',system-ui,sans-serif", color: t.text }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(26,158,126,0.3); border-radius: 3px; }
      `}</style>

            <Sidebar t={t} collapsed={collapsed} setCollapsed={setCollapsed} />

            <div style={{ marginLeft: sidebarW, transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Topbar t={t} collapsed={collapsed} setCollapsed={setCollapsed} />
                <main style={{ flex: 1, padding: '24px 28px' }}>
                    <Outlet />
                </main>
                <footer style={{ padding: '14px 28px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.textMuted }}>
                    <span>© 2026 AGAVE ERP</span>
                    <span>Core API: localhost:8081 · Gateway: localhost:8080</span>
                </footer>
            </div>
        </div>
    )
}
