import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <SettingsIcon className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">System Settings</h2>
            <p className="text-gray-500 max-w-md">
                Configuration options for the ERP system will be located here.
            </p>
        </div>
    );
};

export default Settings;
