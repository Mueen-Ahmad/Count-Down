import { ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/dateHelpers';

export default function EventCard({ event, onClick }) {
    return (
        <div
            className="glass-card p-6 rounded-2xl cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{event.icon}</span>
                <ArrowRight
                    size={20}
                    className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"
                />
            </div>
            <h3 className="text-xl font-bold mb-1">{event.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatDate(event.date)}
            </p>
        </div>
    );
}
