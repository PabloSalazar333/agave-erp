import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
    en: {
        'dashboard': 'Dashboard',
        'tables_kitchen': 'Tables & Kitchen',
        'rooms_guests': 'Rooms & Guests',
        'service_tickets': 'Service Tickets',
        'users': 'Users',
        'inventory': 'Inventory',
        'hr_payroll': 'HR & Payroll',
        'settings': 'Settings',
        'help_center': 'Help Center',
        'dev_portal': 'Dev Portal',
        'sign_out': 'Sign Out',
        'welcome_back': 'Welcome Back',
        'overview': 'Overview',
        'language': 'Language',
        'role': 'Role',
        'switch_role': 'Switch Role (Dev)',
    },
    es: {
        'dashboard': 'Panel de Control',
        'tables_kitchen': 'Mesas y Cocina',
        'rooms_guests': 'Habitaciones y Huéspedes',
        'service_tickets': 'Tickets de Servicio',
        'users': 'Usuarios',
        'inventory': 'Inventario',
        'hr_payroll': 'RRHH y Nómina',
        'settings': 'Configuración',
        'help_center': 'Centro de Ayuda',
        'dev_portal': 'Portal Dev',
        'sign_out': 'Cerrar Sesión',
        'welcome_back': 'Bienvenido de nuevo',
        'overview': 'Resumen',
        'language': 'Idioma',
        'role': 'Rol',
        'switch_role': 'Cambiar Rol (Dev)',
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app_language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'es' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
