import { Package } from 'lucide-react';

const Inventory = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Package className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Inventory Management</h2>
            <p className="text-gray-500 max-w-md">
                This module is currently under development. Soon you will be able to manage products, stock levels, and suppliers here.
            </p>
        </div>
    );
};

export default Inventory;
