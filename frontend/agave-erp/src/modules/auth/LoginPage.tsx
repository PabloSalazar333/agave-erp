import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services'
import { ROUTES } from '@/config/routes'

export default function LoginPage() {
    const navigate = useNavigate()
    const setAuth = useAuthStore((s) => s.setAuth)

    const [email, setEmail] = useState('admin@agaveerp.com')
    const [password, setPassword] = useState('admin123')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await authService.login({ email, password })
            setAuth(res.token, res.user)
            navigate(ROUTES.DASHBOARD, { replace: true })
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? 'Credenciales inválidas'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const t = {
        bg: '#f4f6f8',
        surface: '#ffffff',
        border: '#e2ebe8',
        text: '#1a2e2a',
        muted: '#5a7a72',
        primary: '#1a9e7e',
        shadow: '0 8px 32px rgba(15,36,32,0.10)',
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, #0f2420 0%, #1a3a30 50%, #0d7a5f22 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                padding: 20,
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 420,
                    background: t.surface,
                    borderRadius: 20,
                    padding: '40px 36px',
                    boxShadow: t.shadow,
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            background: 'linear-gradient(135deg, #1a9e7e, #0d7a5f)',
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                            margin: '0 auto 14px',
                        }}
                    >
                        🌵
                    </div>
                    <div
                        style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: 1 }}
                    >
                        AGAVE ERP
                    </div>
                    <div style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>
                        Inicia sesión en tu cuenta
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div
                        style={{
                            background: '#ef444415',
                            border: '1px solid #ef444433',
                            borderRadius: 10,
                            padding: '10px 14px',
                            color: '#ef4444',
                            fontSize: 13,
                            marginBottom: 20,
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Email */}
                    <div>
                        <label
                            style={{ display: 'block', fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 6 }}
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@agaveerp.com"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                border: `1.5px solid ${t.border}`,
                                borderRadius: 10,
                                fontSize: 14,
                                color: t.text,
                                outline: 'none',
                                background: '#f9fbfa',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = t.primary)}
                            onBlur={(e) => (e.target.style.borderColor = t.border)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            style={{ display: 'block', fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 6 }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                border: `1.5px solid ${t.border}`,
                                borderRadius: 10,
                                fontSize: 14,
                                color: t.text,
                                outline: 'none',
                                background: '#f9fbfa',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = t.primary)}
                            onBlur={(e) => (e.target.style.borderColor = t.border)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading
                                ? '#a0d4c4'
                                : 'linear-gradient(135deg, #1a9e7e, #0d7a5f)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 10,
                            fontSize: 15,
                            fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: 4,
                            transition: 'opacity 0.2s',
                        }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* Footer hint */}
                <div
                    style={{
                        marginTop: 28,
                        padding: '12px 14px',
                        background: '#1a9e7e08',
                        border: '1px solid #1a9e7e22',
                        borderRadius: 10,
                        fontSize: 12,
                        color: t.muted,
                        lineHeight: 1.6,
                    }}
                >
                    <strong style={{ color: t.primary }}>Default:</strong> admin@agaveerp.com / admin123
                    <br />
                    Creado automáticamente por{' '}
                    <code style={{ fontSize: 11 }}>DataInitializer.java</code>
                </div>
            </div>
        </div>
    )
}
