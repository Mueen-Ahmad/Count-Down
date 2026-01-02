import { useState, useEffect } from 'react';
import { calculateTimeRemaining, padZero } from '../utils/dateHelpers';

export default function CountdownTimer({ targetDate, showDebug = false }) {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const { days, hours, minutes, seconds, distance, isFinished } = timeRemaining;

    return (
        <div className="relative">
            {isFinished && distance < 0 && (
                <div className="mb-8 text-2xl md:text-3xl font-bold text-purple-400 animate-pulse">
                    🎉 This event has passed! 🎉
                </div>
            )}

            <div className="flex gap-1 sm:gap-4 md:gap-8 justify-center overflow-x-auto pb-2 sm:pb-0">
                <div className="time-block">
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display">
                        {padZero(days)}
                    </span>
                    <span className="text-[10px] sm:text-sm md:text-base uppercase tracking-widest opacity-60">
                        Days
                    </span>
                </div>
                <div className="time-block">
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display">
                        {padZero(hours)}
                    </span>
                    <span className="text-[10px] sm:text-sm md:text-base uppercase tracking-widest opacity-60">
                        Hours
                    </span>
                </div>
                <div className="time-block">
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display">
                        {padZero(minutes)}
                    </span>
                    <span className="text-[10px] sm:text-sm md:text-base uppercase tracking-widest opacity-60">
                        Mins
                    </span>
                </div>
                <div className="time-block">
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display text-purple-400">
                        {padZero(seconds)}
                    </span>
                    <span className="text-[10px] sm:text-sm md:text-base uppercase tracking-widest opacity-60">
                        Secs
                    </span>
                </div>
            </div>

            {showDebug && (
                <div className="mt-8 text-xs text-slate-300 font-mono text-left bg-black/40 p-4 rounded-lg border border-white/10">
                    <div className="grid grid-cols-2 gap-2">
                        <div><strong>Target:</strong></div>
                        <div>{new Date(targetDate).toLocaleString()}</div>

                        <div><strong>Now:</strong></div>
                        <div>{new Date().toLocaleString()}</div>

                        <div><strong>Distance:</strong></div>
                        <div>{distance}ms ({(distance / (1000 * 60 * 60 * 24)).toFixed(2)} days)</div>

                        <div><strong>Status:</strong></div>
                        <div className={isFinished ? 'text-red-400' : 'text-green-400'}>
                            {isFinished ? 'FINISHED' : 'RUNNING'}
                        </div>

                        <div><strong>Raw Date:</strong></div>
                        <div className="break-all">{String(targetDate)}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
