// All app routes in one place
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',

    // Restaurant
    RESTAURANT: '/restaurant',
    RESTAURANT_POS: '/restaurant/pos',
    RESTAURANT_ORDERS: '/restaurant/orders',
    RESTAURANT_MENU: '/restaurant/menu',
    RESTAURANT_TABLES: '/restaurant/tables',
    RESTAURANT_KITCHEN: '/restaurant/kitchen',

    // Hotel
    HOTEL: '/hotel',
    HOTEL_ROOMS: '/hotel/rooms',
    HOTEL_RESERVATIONS: '/hotel/reservations',
    HOTEL_GUESTS: '/hotel/guests',
    HOTEL_CHECKIN: '/hotel/checkin',

    // Appointments
    APPOINTMENTS: '/appointments',
    APPOINTMENTS_CALENDAR: '/appointments/calendar',
    APPOINTMENTS_STAFF: '/appointments/staff',
    APPOINTMENTS_BOOKING: '/appointments/booking',

    // Other modules
    CRM: '/crm',
    INVENTORY: '/inventory',
    FINANCE: '/finance',
    REPORTS: '/reports',

    // Admin
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/users',
    ADMIN_ROLES: '/admin/roles',
    ADMIN_SETTINGS: '/admin/settings',
    ADMIN_AUDIT: '/admin/audit',
} as const
