import React from 'react';

export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 pb-2 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-sm font-medium text-gray-500 ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);
