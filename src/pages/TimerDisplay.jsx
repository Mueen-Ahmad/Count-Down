import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Share2, Plus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import CountdownTimer from '../components/CountdownTimer';
import { useApp } from '../contexts/AppContext';
import { decodeCountdownData, encodeCountdownData, calculateTimeRemaining } from '../utils/dateHelpers';

export default function TimerDisplay() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { currentCountdown, startCountdown } = useApp();
    const [countdown, setCountdown] = useState(null);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

    useEffect(() => {
        // Try to load from URL params first
        const urlData = decodeCountdownData(searchParams);
        if (urlData) {
            setCountdown(urlData);
            startCountdown(urlData);
        } else if (currentCountdown) {
            setCountdown(currentCountdown);

            // Update URL with countdown data
            const params = encodeCountdownData(currentCountdown);
            window.history.pushState({}, '', `?${params}`);
        } else {
            // No countdown data, redirect to dashboard
            navigate('/');
        }
    }, [searchParams, currentCountdown, navigate, startCountdown]);

    // Check for countdown completion and trigger confetti
    useEffect(() => {
        if (!countdown) return;

        const interval = setInterval(() => {
            const { isFinished, distance } = calculateTimeRemaining(countdown.date);

            if (isFinished && distance > -2000 && !hasTriggeredConfetti) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#3b82f6', '#f43f5e', '#fb923c']
                });
                setHasTriggeredConfetti(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown, hasTriggeredConfetti]);

    const handleShare = async () => {
        const shareData = {
            title: 'Count Down',
            text: `Check out the countdown for ${countdown?.name}!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share canceled or failed', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 3000);
        }
    };

    const handleBack = () => {
        navigate('/');
        window.history.pushState({}, '', window.location.pathname);
    };

    if (!countdown) {
        return null;
    }

    const getThemeClasses = () => {
        const gradients = {
            'purple-blue': 'bg-gradient-to-br from-purple-600 to-blue-600',
            'rose-orange': 'bg-gradient-to-br from-rose-500 to-orange-500',
            'emerald-teal': 'bg-gradient-to-br from-emerald-500 to-teal-500'
        };
        return gradients[countdown.theme] || gradients['purple-blue'];
    };

    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center fade-in">
            <div className="w-full max-w-4xl mb-6 flex justify-start">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition-colors bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/5 hover:bg-white/10"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>
            </div>

            <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden max-w-4xl w-full">
                {/* Background */}
                <div
                    className={`absolute inset-0 -z-10 opacity-30 transition-all duration-1000 ${countdown.bgImg ? '' : getThemeClasses()
                        }`}
                    style={countdown.bgImg ? {
                        backgroundImage: `url('${countdown.bgImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    } : {}}
                />

                <h3 className="text-3xl md:text-5xl font-display font-bold mb-12 drop-shadow-sm">
                    {countdown.name}
                </h3>

                <CountdownTimer targetDate={countdown.date} showDebug={true} />

                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleShare}
                        className={`flex items-center gap-2 ${shareSuccess
                            ? 'bg-green-600 border-green-500'
                            : 'bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500'
                            } text-white px-8 py-4 rounded-full transition-all border border-white/10 shadow-lg active:scale-95 text-lg font-semibold`}
                    >
                        {shareSuccess ? (
                            <>
                                <Check size={20} />
                                Link Copied!
                            </>
                        ) : (
                            <>
                                <Share2 size={20} />
                                Share with Friends
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => navigate('/create')}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-white/5 active:scale-95 text-slate-300"
                    >
                        <Plus size={20} />
                        New
                    </button>
                </div>
            </div>
        </section>
    );
}
