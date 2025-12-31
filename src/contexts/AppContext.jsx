import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentCountdown, setCurrentCountdown] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState('purple-blue');

    // Apply dark mode to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const startCountdown = (countdownData) => {
        setCurrentCountdown(countdownData);
    };

    const clearCountdown = () => {
        setCurrentCountdown(null);
    };

    const value = {
        isDarkMode,
        toggleDarkMode,
        currentCountdown,
        startCountdown,
        clearCountdown,
        selectedTheme,
        setSelectedTheme
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
