import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ThemePicker from '../components/ThemePicker';
import { useApp } from '../contexts/AppContext';

export default function CreateCountdown() {
    const navigate = useNavigate();
    const { startCountdown, setSelectedTheme, selectedTheme } = useApp();

    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        bgImgUrl: ''
    });

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const targetDate = `${formData.eventDate}T${formData.eventTime || '00:00'}:00`;

        startCountdown({
            name: formData.eventName,
            date: targetDate,
            theme: selectedTheme,
            bgImg: selectedTheme === 'custom-img' ? formData.bgImgUrl : ''
        });

        navigate('/timer');
    };

    return (
        <section className="max-w-2xl mx-auto fade-in">
            <div className="glass-card p-8 rounded-3xl border border-white/10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition-colors mb-6"
                >
                    <ChevronLeft size={20} />
                    Back to Dashboard
                </button>

                <h2 className="text-3xl font-display font-bold mb-8">
                    Create Your Countdown
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Event Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. My Birthday"
                            value={formData.eventName}
                            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                            className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <input
                                type="date"
                                required
                                value={formData.eventDate}
                                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Time</label>
                            <input
                                type="time"
                                value={formData.eventTime}
                                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                                className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                    </div>

                    <ThemePicker
                        selectedTheme={selectedTheme}
                        onThemeChange={handleThemeChange}
                        showImageInput={selectedTheme === 'custom-img'}
                        onImageInputChange={(e) => setFormData({ ...formData, bgImgUrl: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-xl active:scale-[0.98]"
                    >
                        Generate Countdown 🎉
                    </button>
                </form>
            </div>
        </section>
    );
}
