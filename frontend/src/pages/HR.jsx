import { FileText } from 'lucide-react';

const HR = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-green-50 p-6 rounded-full mb-6">
                <FileText className="w-12 h-12 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">HR & Payroll</h2>
            <p className="text-gray-500 max-w-md">
                This module is currently under development. Employee management, payroll processing, and attendance tracking will be available here.
            </p>
        </div>
    );
};

export default HR;
