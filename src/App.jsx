import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BackgroundDecor from './components/BackgroundDecor';
import Dashboard from './pages/Dashboard';
import CreateCountdown from './pages/CreateCountdown';
import TimerDisplay from './pages/TimerDisplay';
import TestTimer from './pages/TestTimer';

export default function App() {
    return (
        <Router>
            <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen font-sans">
                <BackgroundDecor />
                <Navigation />

                <main className="max-w-7xl mx-auto px-6 py-12">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/create" element={<CreateCountdown />} />
                        <Route path="/timer" element={<TimerDisplay />} />
                        <Route path="/test" element={<TestTimer />} />
                    </Routes>
                </main>

                <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    <p>© 2025 Count Down. Celebrate Every Moment.</p>
                </footer>
            </div>
        </Router>
    );
}
