import { useState, useEffect } from 'react';
import { calculateTimeRemaining, padZero } from '../utils/dateHelpers';

// Simple test component to verify timer works
export default function TestTimer() {
    // Test with a known future date - New Year 2026
    const testDate = '2026-01-01T00:00:00';
    const [time, setTime] = useState(calculateTimeRemaining(testDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTimeRemaining(testDate));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 bg-slate-900 text-white">
            <h1 className="text-3xl mb-4">Timer Test</h1>
            <div className="mb-4">
                <strong>Test Date:</strong> {testDate}
            </div>
            <div className="mb-4">
                <strong>Parsed Date:</strong> {new Date(testDate).toString()}
            </div>
            <div className="text-6xl font-bold mb-4">
                {padZero(time.days)}:{padZero(time.hours)}:{padZero(time.minutes)}:{padZero(time.seconds)}
            </div>
            <div className="text-sm">
                <div>Distance: {time.distance}ms</div>
                <div>Is Finished: {time.isFinished ? 'YES' : 'NO'}</div>
                <div>Days: {time.days}</div>
                <div>Hours: {time.hours}</div>
                <div>Minutes: {time.minutes}</div>
                <div>Seconds: {time.seconds}</div>
            </div>
        </div>
    );
}
