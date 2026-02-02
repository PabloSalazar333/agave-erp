import { useState } from 'react';
import { Search, BookOpen, UserPlus, Palette, LayoutGrid, BarChart3, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Help = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItem, setOpenItem] = useState(null);

    const helpTopics = [
        {
            id: 'getting-started',
            category: 'Getting Started',
            icon: BookOpen,
            title: 'Primeros Pasos / First Steps',
            content: 'Welcome to Agave ERP! To get started, navigate through the sidebar. The dashboard shows you a quick overview. You can customize your experience in the Settings menu.'
        },
        {
            id: 'add-user',
            category: 'User Management',
            icon: UserPlus,
            title: 'Como agregar un usuario / How to add a user',
            content: 'Go to the "Users" page in the sidebar. Click the "Add User" button in the top right corner. Fill in the details (Name, Email, Role) and click Save. The new user will be able to log in immediately.'
        },
        {
            id: 'change-industry',
            category: 'Configuration',
            icon: LayoutGrid,
            title: 'Como cambiar de area (Industria) / Change Industry',
            content: 'Navigate to "Settings". Look for the "Industry Simulator" section. Select your desired industry (Restaurant, Hotel, Service, etc.) and click "Switch Industry". The sidebar and available modules will update automatically.'
        },
        {
            id: 'customization',
            category: 'Personalization',
            icon: Palette,
            title: 'Cambiar letra y color / Change Font & Color',
            content: 'Go to "Settings" and scroll to "Visual Personalization". Use the Color Picker to choose your brand color. Use the Dropdown to select a font style (Modern, Elegant, or Technical). Changes apply instantly.'
        },
        {
            id: 'restaurant-tables',
            category: 'Modules',
            icon: LayoutGrid,
            title: 'Mostrar Tablas (Restaurante) / Show Tables',
            content: 'Ensure you are in "Restaurant" mode (Settings -> Industry). Click "Tables & Kitchen" in the sidebar. Use the top bar to add Square or Round tables. Drag them to arrange your floor plan. Click "Save Layout" to persist changes.'
        },
        {
            id: 'analytics',
            category: 'Modules',
            icon: BarChart3,
            title: 'Ver Estadísticas / View Statistics',
            content: 'Navigate to "Analytics" (or type /analytics in the address bar if not in sidebar). You will see real-time charts for Revenue vs Cost and Revenue Source distribution.'
        }
    ];

    const filteredTopics = helpTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for answers (e.g., 'user', 'color', 'tables')..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => (
                        <div key={topic.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                            <button
                                onClick={() => toggleItem(topic.id)}
                                className="w-full text-left p-4 sm:p-6 flex items-start sm:items-center gap-4 bg-white hover:bg-gray-50/50 transition"
                            >
                                <div className={`p-3 rounded-full bg-primary/10 text-primary shrink-0`}>
                                    <topic.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg">{topic.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{topic.category}</p>
                                </div>
                                {openItem === topic.id ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {openItem === topic.id && (
                                <div className="px-6 pb-6 pt-0 ml-[4.5rem] text-gray-600 leading-relaxed border-t border-gray-50 mt-2 pt-4">
                                    {topic.content}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                        <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
                <p>Can't find what you're looking for?</p>
                <div className="mt-4 flex justify-center gap-4">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">Contact Support</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-sm">Ask AI Copilot</button>
                </div>
            </div>
        </div>
    );
};

export default Help;
