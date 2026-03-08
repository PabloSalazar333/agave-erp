import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ROUTES } from '@/config/routes'
import AuthGuard from '@/components/AuthGuard'
import MainLayout from '@/layouts/MainLayout'
import PlaceholderPage from '@/components/PlaceholderPage'

// ─── LAZY PAGES ───────────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('@/modules/auth/LoginPage'))
const UsersPage = lazy(() => import('@/modules/admin/pages/UsersPage'))
const TenantsPage = lazy(() => import('@/modules/admin/pages/TenantsPage'))

// Dashboard — reuse the existing visual dashboard
const DashboardPage = lazy(() =>
    import('@/modules/dashboard/DashboardPage')
)

// ─── QUERY CLIENT ─────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 30_000,
        },
    },
})

// ─── LOADING FALLBACK ─────────────────────────────────────────────────────────
const Loading = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#1a9e7e', fontSize: 14 }}>
        Cargando módulo...
    </div>
)

// ─── ROUTER ───────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
    // Public
    {
        path: ROUTES.LOGIN,
        element: <Suspense fallback={<Loading />}><LoginPage /></Suspense>,
    },

    // Protected
    {
        element: <AuthGuard />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    // Index → dashboard
                    { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },

                    // Dashboard
                    {
                        path: ROUTES.DASHBOARD,
                        element: <Suspense fallback={<Loading />}><DashboardPage /></Suspense>,
                    },

                    // ── Restaurant ────────────────────────────────────────────────────
                    { path: ROUTES.RESTAURANT, element: <PlaceholderPage module="Restaurant" icon="🍽️" description="Módulo de restaurante. POS, órdenes, menú y cocina." endpoint="GET /api/restaurant" /> },
                    { path: ROUTES.RESTAURANT_POS, element: <PlaceholderPage module="POS Dashboard" icon="🧾" description="Terminal punto de venta para restaurante." endpoint="GET /api/restaurant/pos" /> },
                    { path: ROUTES.RESTAURANT_ORDERS, element: <PlaceholderPage module="Orders" icon="📋" description="Gestión de órdenes activas y cerradas." endpoint="GET /api/restaurant/orders" /> },
                    { path: ROUTES.RESTAURANT_MENU, element: <PlaceholderPage module="Menu Management" icon="🥗" description="Administración de platillos, categorías y precios." endpoint="GET /api/restaurant/menu" /> },
                    { path: ROUTES.RESTAURANT_TABLES, element: <PlaceholderPage module="Table Management" icon="🪑" description="Mapa del piso y estado de mesas." endpoint="GET /api/restaurant/tables" /> },
                    { path: ROUTES.RESTAURANT_KITCHEN, element: <PlaceholderPage module="Kitchen Display" icon="👨‍🍳" description="Display de cocina en tiempo real." endpoint="WS /api/restaurant/kitchen" /> },

                    // ── Hotel ─────────────────────────────────────────────────────────
                    { path: ROUTES.HOTEL, element: <PlaceholderPage module="Hotel" icon="🏨" description="Módulo hotelero: habitaciones, reservaciones y huéspedes." endpoint="GET /api/hotel" /> },
                    { path: ROUTES.HOTEL_ROOMS, element: <PlaceholderPage module="Room Management" icon="🛏️" description="Estado y disponibilidad de habitaciones." endpoint="GET /api/hotel/rooms" /> },
                    { path: ROUTES.HOTEL_RESERVATIONS, element: <PlaceholderPage module="Reservations" icon="📅" description="Calendario de reservaciones." endpoint="GET /api/hotel/reservations" /> },
                    { path: ROUTES.HOTEL_GUESTS, element: <PlaceholderPage module="Guest Management" icon="👤" description="Gestión de huéspedes y historial." endpoint="GET /api/hotel/guests" /> },
                    { path: ROUTES.HOTEL_CHECKIN, element: <PlaceholderPage module="Check-in / Check-out" icon="🔑" description="Proceso de entrada y salida de huéspedes." endpoint="POST /api/hotel/checkin" /> },

                    // ── Appointments ──────────────────────────────────────────────────
                    { path: ROUTES.APPOINTMENTS, element: <PlaceholderPage module="Appointments" icon="📅" description="Sistema de citas y agenda." endpoint="GET /api/appointments" /> },
                    { path: ROUTES.APPOINTMENTS_CALENDAR, element: <PlaceholderPage module="Calendar Scheduler" icon="🗓️" description="Vista de calendario con citas del día/semana." endpoint="GET /api/appointments/calendar" /> },
                    { path: ROUTES.APPOINTMENTS_STAFF, element: <PlaceholderPage module="Staff Availability" icon="👥" description="Disponibilidad del personal." endpoint="GET /api/staff/availability" /> },
                    { path: ROUTES.APPOINTMENTS_BOOKING, element: <PlaceholderPage module="Booking" icon="✅" description="Reservar nueva cita." endpoint="POST /api/appointments" /> },

                    // ── Other modules ─────────────────────────────────────────────────
                    { path: ROUTES.CRM, element: <PlaceholderPage module="CRM" icon="👥" description="Clientes, contactos e historial de comunicación." endpoint="GET /api/crm/customers" /> },
                    { path: ROUTES.INVENTORY, element: <PlaceholderPage module="Inventory" icon="📦" description="Productos, proveedores y movimientos de stock." endpoint="GET /api/inventory/products" /> },
                    { path: ROUTES.FINANCE, element: <PlaceholderPage module="Finance" icon="💰" description="Facturas, pagos y gastos." endpoint="GET /api/finance/invoices" /> },
                    { path: ROUTES.REPORTS, element: <PlaceholderPage module="Reports" icon="📊" description="Reportes de ventas, inventario y analytics." endpoint="GET /api/reports" /> },

                    // ── Admin (connected to real API) ─────────────────────────────────
                    { path: ROUTES.ADMIN, element: <Navigate to={ROUTES.ADMIN_USERS} replace /> },
                    {
                        path: ROUTES.ADMIN_USERS,
                        element: <Suspense fallback={<Loading />}><UsersPage /></Suspense>,
                    },
                    {
                        path: ROUTES.ADMIN_ROLES,
                        element: <Suspense fallback={<Loading />}><TenantsPage /></Suspense>,
                    },
                    { path: ROUTES.ADMIN_SETTINGS, element: <PlaceholderPage module="Settings" icon="⚙️" description="Configuración del sistema." endpoint="GET /api/admin/settings" /> },
                    { path: ROUTES.ADMIN_AUDIT, element: <PlaceholderPage module="Audit Logs" icon="📜" description="Registro de auditoría de acciones del sistema." endpoint="GET /api/admin/audit" /> },
                ],
            },
        ],
    },

    // Fallback
    { path: '*', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
])

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}
