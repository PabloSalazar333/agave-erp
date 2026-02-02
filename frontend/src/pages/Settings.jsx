import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, RefreshCw } from 'lucide-react';

const Settings = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [selectedRole, setSelectedRole] = useState(user.roles && user.roles.length > 0 ? user.roles[0].name : 'ROLE_USER');

    const availableRoles = [
        'ROLE_SUPER_ADMIN',
        'ROLE_ADMIN',
        'ROLE_FINANCE',
        'ROLE_COLLECTION',
        'ROLE_HR',
        'ROLE_LOGISTICS',
        'ROLE_SALES',
        'ROLE_PURCHASING',
        'ROLE_USER'
    ];

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const applyRole = () => {
        const updatedUser = {
            ...user,
            roles: [{ id: 999, name: selectedRole }] // Mocking the role object structure
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.location.reload(); // Reload to refresh Sidebar permissions
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-dark mb-6">System Settings</h1>

            {/* Role Simulator Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center">
                    <Shield className="w-5 h-5 text-primary mr-3" />
                    <div>
                        <h2 className="font-semibold text-gray-800">Role Simulator (Dev Mode)</h2>
                        <p className="text-xs text-gray-500">Temporarily switch roles to test permissions.</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Active Role
                            </label>
                            <select
                                value={selectedRole}
                                onChange={handleRoleChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border bg-white"
                            >
                                {availableRoles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-none pt-6">
                            <button
                                onClick={applyRole}
                                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-secondary hover:bg-secondary/90 transition-colors shadow-sm"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Switch Role
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
                        <strong>Current Session Role:</strong> {user.roles && user.roles.length > 0 ? user.roles[0].name : 'None'}
                    </div>
                </div>
            </div>

            {/* General Settings Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-400">
                <SettingsIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Global system configurations will appear here.</p>
            </div>
        </div>
    );
};

export default Settings;
