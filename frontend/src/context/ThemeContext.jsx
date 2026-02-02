import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Load saved settings or use defaults
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('app_theme');
        return saved ? JSON.parse(saved) : {
            primaryColor: '#1F6E8C', // Default Blue
            fontFamily: 'Inter',
            borderRadius: '0.75rem', // 12px
        };
    });

    useEffect(() => {
        // Apply variables to root
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.primaryColor);
        root.style.setProperty('--font-family-sans', theme.fontFamily);
        root.style.setProperty('--radius-lg', theme.borderRadius);

        localStorage.setItem('app_theme', JSON.stringify(theme));
    }, [theme]);

    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
