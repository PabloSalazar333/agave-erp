import { useThemeStore } from '../store/ui.store'

const THEME = {
    light: { surface: '#fff', border: '#e2ebe8', text: '#1a2e2a', textMuted: '#5a7a72', cardShadow: '0 2px 8px rgba(15,36,32,0.06)' },
    dark: { surface: '#0f2420', border: '#1e3d35', text: '#e0f0ec', textMuted: '#7aada3', cardShadow: '0 2px 8px rgba(0,0,0,0.2)' },
}

interface Props {
    module: string
    icon: string
    description: string
    endpoint?: string
}

export default function PlaceholderPage({ module, icon, description, endpoint }: Props) {
    const { dark } = useThemeStore()
    const t = THEME[dark ? 'dark' : 'light']

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 20, textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg,#1a9e7e22,#1a9e7e44)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 }}>{module}</div>
                <div style={{ fontSize: 14, color: t.textMuted, maxWidth: 400 }}>{description}</div>
                {endpoint && (
                    <div style={{ marginTop: 12, display: 'inline-block', background: '#1a9e7e12', border: '1px solid #1a9e7e33', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#1a9e7e', fontFamily: 'monospace' }}>
                        {endpoint}
                    </div>
                )}
            </div>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: '16px 24px', boxShadow: t.cardShadow, maxWidth: 400 }}>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
                    Este módulo se conectará al backend AGAVE-ERP cuando los endpoints estén disponibles.
                    <br />Actualmente el backend corre en <strong style={{ color: '#1a9e7e' }}>localhost:8081</strong>
                </div>
            </div>
        </div>
    )
}
