import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, FileText, Settings, LogOut, Menu, X, Bell, Utensils, Bed, Wrench, HelpCircle, Code } from 'lucide-react';
import logo from '../assets/logo.png';
import AgaveCopilot from './AgaveCopilot'; // Import Copilot
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const { t, language, toggleLanguage } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Safer local storage parsing
    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            user = JSON.parse(storedUser);
        }
    } catch (e) {
        console.error("Failed to parse user from local storage", e);
    }
    const currentIndustry = localStorage.getItem('dev_industry') || 'GENERIC';

    // Helper to check if user has ANY of the required roles AND matches Industry
    const hasAccess = (item) => {
        // 1. Check Industry (if item has restricted industries)
        if (item.industries && !item.industries.includes(currentIndustry)) {
            return false;
        }

        // 2. Check Roles
        // Fix: Backend returns single role string "ROLE_ADMIN", not an array.
        if (!user.role) return false;
        if (user.role === 'ROLE_SUPER_ADMIN') return true;

        // If the item allows the user's specific role
        return item.allowed.includes(user.role);
    };

    const allNavigation = [
        {
            name: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
            allowed: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_FINANCE', 'ROLE_HR', 'ROLE_LOGISTICS', 'ROLE_SALES', 'ROLE_PURCHASING']
        },
        {
            name: 'Tables & Kitchen',
            href: '/restaurant/tables',
            icon: Utensils, // You'll need to import this
            allowed: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SALES'],
            industries: ['RESTAURANT']
        },
        {
            name: 'Rooms & Guests',
            href: '/hotel/rooms',
            icon: Bed, // You'll need to import this
            allowed: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SALES'],
            industries: ['HOTEL']
        },
        {
            name: 'Service Tickets',
            href: '/service/tickets',
            icon: Wrench, // You'll need to import this
            allowed: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SALES'],
            industries: ['SERVICE_PROVIDER']
        },
        {
            name: 'Users',
            href: '/users',
            icon: Users,
            allowed: ['ROLE_ADMIN', 'ROLE_HR']
        },
        {
            name: 'Inventory',
            href: '/inventory',
            icon: Package,
            allowed: ['ROLE_LOGISTICS', 'ROLE_PURCHASING', 'ROLE_SALES', 'ROLE_FINANCE', 'ROLE_ADMIN'],
            industries: ['GENERIC', 'RETAIL', 'RESTAURANT'] // Hotels might use a different system? Or keep generic.
        },
        {
            name: 'HR & Payroll',
            href: '/hr',
            icon: FileText,
            allowed: ['ROLE_HR', 'ROLE_FINANCE', 'ROLE_ADMIN']
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: Settings,
            allowed: ['ROLE_ADMIN']
        },
        {
            name: 'Help Center',
            href: '/help',
            icon: HelpCircle,
            allowed: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_HR', 'ROLE_FINANCE', 'ROLE_LOGISTICS', 'ROLE_SALES', 'ROLE_PURCHASING']
        },
        {
            name: 'Dev Portal',
            href: '/dev/wiki',
            icon: Code, // Import this
            allowed: ['ROLE_DEV', 'ROLE_SUPER_ADMIN']
        },
    ];

    // Filter navigation
    const navigation = allNavigation.filter(hasAccess);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 flex items-center justify-center border-b border-gray-100">
                    <img src={logo} alt="Agave ERP" className="h-12 w-auto" />
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary/10 text-primary shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                {t(item.name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        {t('sign_out')}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center text-lg font-semibold text-gray-800">
                        {t((navigation.find(item => item.href === location.pathname)?.name || 'dashboard').toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-sm font-medium">{language.toUpperCase()}</span>
                        </button>

                        {/* Role Switcher (Dev Only) */}
                        <select
                            className="text-xs border border-gray-200 rounded p-1"
                            value={user.role || ''}
                            onChange={(e) => {
                                const newUser = { ...user, role: e.target.value };
                                localStorage.setItem('user', JSON.stringify(newUser));
                                window.location.reload();
                            }}
                        >
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_HR">HR</option>
                            <option value="ROLE_SALES">Sales</option>
                            <option value="ROLE_USER">User</option>
                        </select>
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-full relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-900">{user.firstName || 'User'}</p>
                                <p className="text-xs text-gray-500">{user.email || 'Admin'}</p>
                            </div>
                            <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold border border-secondary/20">
                                {user.firstName ? user.firstName[0] : 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex-1">
                    <Outlet />
                </div>
            </main>
            {/* AI Assistant Widget */}
            <AgaveCopilot />
        </div>
    );
};

export default Layout;
