import { useState } from 'react';
import { Code, Server, Database, Layers, Shield, FileText, ExternalLink } from 'lucide-react';

const Wiki = () => {
    const [activeSection, setActiveSection] = useState('architecture');

    const sections = [
        { id: 'architecture', name: 'Architecture', icon: Layers },
        { id: 'api', name: 'API Reference', icon: Server },
        { id: 'database', name: 'Database Schema', icon: Database },
        { id: 'security', name: 'Security & Roles', icon: Shield },
        { id: 'deployment', name: 'Deployment', icon: Code },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'architecture':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">System Architecture</h2>
                        <div className="bg-gray-800 text-gray-200 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                            <pre>{`
[Frontend (React + Vite)]
       |
       v
[API Gateway / Load Balancer] (Future)
       |
       v
[Backend (Spring Boot 3.5)] 
   |-> [Security Filter Chain (JWT)]
   |-> [Controllers (REST API)]
   |-> [Services (Business Logic)]
   |-> [Repositories (JPA/Hibernate)]
       |
       v
[Database (PostgreSQL 16)]
                            `}</pre>
                        </div>
                        <p className="text-gray-600">
                            The system follows a monolithic architecture designed for modularity. Each module (Restaurant, Hotel, Service) resides in the same codebase but is logically separated in the domain layer.
                        </p>
                    </div>
                );
            case 'api':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">API Documentation</h2>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-blue-900">Swagger UI</h3>
                                <p className="text-blue-700 text-sm">Interactive API documentation (OpenAPI 3.0)</p>
                            </div>
                            <a
                                href="http://localhost:8080/swagger-ui/index.html"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Open Swagger <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-2">Key Endpoints</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex gap-2"><span className="font-mono bg-gray-100 px-2 py-1 rounded text-green-700">POST</span> /api/auth/login</li>
                                <li className="flex gap-2"><span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-700">GET</span> /api/users</li>
                                <li className="flex gap-2"><span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-700">GET</span> /api/tenants</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'database':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Database Schema</h2>
                        <ul className="list-disc ml-6 space-y-2 text-gray-600">
                            <li><strong>users</strong>: Stores user credentials, roles interaction.</li>
                            <li><strong>tenants</strong>: Stores organization/company info.</li>
                            <li><strong>roles</strong>: (Enum based) permissions.</li>
                        </ul>
                        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-800 text-sm">
                            <strong>Note:</strong> We are running PostgreSQL 16 on Docker (Port 5433).
                        </div>
                    </div>
                );
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6">
            {/* Sidebar */}
            <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Dev Portal</h2>
                <nav className="space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <section.icon className="w-4 h-4 mr-3" />
                            {section.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8 overflow-y-auto h-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default Wiki;
