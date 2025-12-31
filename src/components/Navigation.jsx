import { Timer, Sun, Moon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const { isDarkMode, toggleDarkMode } = useApp();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 glass-effect border-b border-white/10 dark:border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1
                    className="text-2xl font-display font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <Timer className="text-purple-500" size={28} />
                    Count Down
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                        onClick={() => navigate('/create')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95"
                    >
                        Create My Own
                    </button>
                </div>
            </div>
        </nav>
    );
}
