import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { presetEvents } from '../utils/presetEvents';
import { useApp } from '../contexts/AppContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const { startCountdown } = useApp();

    const handleEventClick = (event) => {
        startCountdown({
            name: event.name,
            date: event.date,
            theme: event.theme,
            bgImg: ''
        });
        navigate('/timer');
    };

    return (
        <section className="fade-in">
            <header className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    Upcoming Celebrations
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Track global festivals or create your own special moment.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {presetEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        event={event}
                        onClick={() => handleEventClick(event)}
                    />
                ))}
            </div>
        </section>
    );
}
