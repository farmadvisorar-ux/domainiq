'use client';

import React, { useEffect, useState, useRef } from 'react';

interface FallingLeaf {
    id: number;
    char: string;
    left: number; // percentage (0 - 100)
    size: number; // px
    duration: number; // seconds
    delay: number; // seconds
    swayDuration: number;
    rotateStart: number;
    rotateEnd: number;
    opacity: number;
}

interface CursorSpark {
    id: number;
    x: number;
    y: number;
    char: string;
    size: number;
}

const THANKSGIVING_MESSAGES = [
    'GOBBLE GOBBLE! 🦃',
    'HAPPY THANKSGIVING! 🍁',
    'FEAST ON REAL MARKET COMPS! 🥧',
    'HARVESTING MAXIMUM DOMAIN ROI! 🌾',
    'GIVING THANKS FOR ZERO PAYWALLS! ✨',
    'PLENTIFUL ASSET EQUITY! 🌽',
    'TURKEY TROT VALUATION! 🍗',
    'CRANBERRY-SWEET EXIT MULTIPLES! 🫐',
];

const LEAF_CHARS = ['🍁', '🍂', '🍃', '🌰', '🌾', '🥧', '🍁', '🍂'];
const CURSOR_EMOJIS = ['🍁', '🍂', '✨', '🌽', '🥧', '🦃', '🌰'];

export default function ThanksgivingEffects() {
    const [mounted, setMounted] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [soundBursts, setSoundBursts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
    const [fallingLeaves, setFallingLeaves] = useState<FallingLeaf[]>([]);
    const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
    const [turkeyFlockActive, setTurkeyFlockActive] = useState(false);
    const [turkeyPeeking, setTurkeyPeeking] = useState(false);
    const lastSparkTime = useRef(0);

    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem('domainvoodoo_thanksgiving_enabled');
            if (saved !== null) {
                setEnabled(saved === 'true');
            }
        } catch {
            // ignore
        }

        // Generate initial steady stream of autumn leaves drifting down
        const initialLeaves: FallingLeaf[] = [
            { id: 1, char: '🍁', left: 8, size: 28, duration: 14, delay: 0, swayDuration: 3.8, rotateStart: -25, rotateEnd: 180, opacity: 0.85 },
            { id: 2, char: '🍂', left: 22, size: 24, duration: 18, delay: 2, swayDuration: 4.5, rotateStart: 15, rotateEnd: -160, opacity: 0.8 },
            { id: 3, char: '🍁', left: 38, size: 32, duration: 13, delay: 6, swayDuration: 3.5, rotateStart: -40, rotateEnd: 220, opacity: 0.9 },
            { id: 4, char: '🍃', left: 52, size: 22, duration: 16, delay: 1, swayDuration: 4.2, rotateStart: 30, rotateEnd: -190, opacity: 0.75 },
            { id: 5, char: '🍂', left: 68, size: 30, duration: 15, delay: 4, swayDuration: 4.0, rotateStart: -20, rotateEnd: 200, opacity: 0.85 },
            { id: 6, char: '🌰', left: 82, size: 20, duration: 19, delay: 7, swayDuration: 4.8, rotateStart: 10, rotateEnd: -140, opacity: 0.8 },
            { id: 7, char: '🍁', left: 94, size: 26, duration: 17, delay: 3, swayDuration: 4.4, rotateStart: -35, rotateEnd: 175, opacity: 0.85 },
            { id: 8, char: '🌾', left: 15, size: 24, duration: 21, delay: 9, swayDuration: 5.0, rotateStart: 25, rotateEnd: -150, opacity: 0.75 },
            { id: 9, char: '🍂', left: 45, size: 28, duration: 16, delay: 8, swayDuration: 3.9, rotateStart: -15, rotateEnd: 210, opacity: 0.8 },
            { id: 10, char: '🍁', left: 78, size: 34, duration: 12, delay: 5, swayDuration: 3.4, rotateStart: 45, rotateEnd: -230, opacity: 0.9 },
        ];
        setFallingLeaves(initialLeaves);

        // Random turkey peek-a-boo interval every 8-15 seconds
        const peekInterval = setInterval(() => {
            setTurkeyPeeking(true);
            setTimeout(() => setTurkeyPeeking(false), 4200);
        }, 12000);

        return () => clearInterval(peekInterval);
    }, []);

    // Mouse movement fall embers & leaf trail
    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastSparkTime.current < 85) return;
            lastSparkTime.current = now;

            const char = CURSOR_EMOJIS[Math.floor(Math.random() * CURSOR_EMOJIS.length)] || '🍁';
            const sparkId = now + Math.random();
            const newSpark: CursorSpark = {
                id: sparkId,
                x: e.clientX,
                y: e.clientY,
                char,
                size: Math.floor(Math.random() * 8) + 16,
            };

            setCursorSparks((prev) => [...prev.slice(-14), newSpark]);

            setTimeout(() => {
                setCursorSparks((prev) => prev.filter((s) => s.id !== sparkId));
            }, 800);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enabled]);

    const toggleTheme = () => {
        const next = !enabled;
        setEnabled(next);
        try {
            localStorage.setItem('domainvoodoo_thanksgiving_enabled', String(next));
        } catch {
            // ignore
        }
    };

    const triggerBurst = (e: React.MouseEvent, textOverride?: string) => {
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;

        const text = textOverride || THANKSGIVING_MESSAGES[Math.floor(Math.random() * THANKSGIVING_MESSAGES.length)] || 'GOBBLE GOBBLE! 🦃';
        const burstId = Date.now() + Math.random();

        setSoundBursts((prev) => [...prev, { id: burstId, text, x, y }]);

        setTimeout(() => {
            setSoundBursts((prev) => prev.filter((b) => b.id !== burstId));
        }, 1800);
    };

    const triggerTurkeyTrot = () => {
        setTurkeyFlockActive(true);
        const burstId = Date.now() + Math.random();
        setSoundBursts((prev) => [
            ...prev,
            { id: burstId, text: '🦃 TURKEY TROT FLOCK UNLEASHED! 🍂', x: window.innerWidth / 2, y: 160 },
        ]);
        setTimeout(() => {
            setSoundBursts((prev) => prev.filter((b) => b.id !== burstId));
        }, 2200);

        setTimeout(() => {
            setTurkeyFlockActive(false);
        }, 12000);
    };

    if (!mounted) return null;

    return (
        <>
            {enabled && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
                >
                    {/* Ambient Harvest Season Sky Glow (Warm Amber, Cinnamon & Spiced Gold) */}
                    <div className="absolute -top-32 left-1/4 w-[600px] h-[300px] bg-gradient-to-br from-amber-500/10 via-orange-600/10 to-rose-700/5 blur-[140px] pointer-events-none rounded-full" />
                    <div className="absolute top-1/3 -right-32 w-[500px] h-[400px] bg-gradient-to-br from-yellow-500/8 via-amber-600/10 to-emerald-800/5 blur-[150px] pointer-events-none rounded-full" />

                    {/* ----------------- GENTLY FALLING AUTUMN LEAVES ----------------- */}
                    {fallingLeaves.map((leaf) => (
                        <div
                            key={leaf.id}
                            className="absolute pointer-events-auto cursor-pointer select-none"
                            style={{
                                left: `${leaf.left}%`,
                                top: '-40px',
                                fontSize: `${leaf.size}px`,
                                opacity: leaf.opacity,
                                animation: `leafFall ${leaf.duration}s infinite linear, leafSway ${leaf.swayDuration}s infinite ease-in-out alternate`,
                                animationDelay: `${leaf.delay}s`,
                                filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.45))',
                                zIndex: 22,
                            }}
                            onClick={(e) => triggerBurst(e, `${leaf.char} Autumn Breeze!`)}
                            title="Catch the falling leaf! 🍂"
                        >
                            <span className="inline-block hover:scale-135 transition-transform duration-200">
                                {leaf.char}
                            </span>
                        </div>
                    ))}

                    {/* ----------------- CORNUCOPIA / HARVEST BASKET (TOP-RIGHT) ----------------- */}
                    <div
                        className="absolute top-6 right-6 sm:right-14 pointer-events-auto cursor-pointer hover:scale-115 transition-transform"
                        style={{
                            animation: 'harvestGlowPulse 4.5s ease-in-out infinite',
                            zIndex: 25,
                        }}
                        onClick={(e) => triggerBurst(e, 'HORN OF PLENTY! 🌽')}
                        title="Click the Harvest Cornucopia! 🌽"
                    >
                        <div className="relative flex items-center gap-1 p-2 rounded-2xl bg-amber-950/70 border border-amber-500/40 shadow-xl shadow-amber-950/40 backdrop-blur-md">
                            <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                                🌽
                            </span>
                            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">
                                🥧
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-300 pr-1 hidden sm:inline">
                                Feast Mode
                            </span>
                        </div>
                    </div>

                    {/* ----------------- PEEK-A-BOO POPPING TURKEY (BOTTOM-LEFT) ----------------- */}
                    <div
                        className={`fixed bottom-0 left-6 sm:left-14 pointer-events-auto cursor-pointer transition-transform duration-700 ease-out ${
                            turkeyPeeking ? 'translate-y-0' : 'translate-y-[85%]'
                        }`}
                        style={{ zIndex: 35 }}
                        onClick={(e) => triggerBurst(e, 'GOBBLE GOBBLE! 🦃')}
                        title="A Wild Turkey Peeks Out! Click to Gobble!"
                    >
                        <div className="relative flex flex-col items-center group">
                            {/* Speech Bubble */}
                            <div className="mb-1 px-2.5 py-1 rounded-xl bg-amber-950/95 border border-amber-500/60 text-amber-200 text-xs font-black font-mono shadow-lg shadow-amber-950/50 flex items-center gap-1 animate-bounce">
                                <span>🦃</span>
                                <span>Gobble!</span>
                            </div>
                            {/* Turkey Mascot Body */}
                            <div className="text-5xl sm:text-6xl filter drop-shadow-[0_0_16px_rgba(245,158,11,0.9)] group-hover:scale-125 transition-transform">
                                🦃
                            </div>
                        </div>
                    </div>

                    {/* ----------------- SECONDARY CURIOUS TURKEY (RIGHT EDGE) ----------------- */}
                    <div
                        className="fixed bottom-24 -right-1 sm:right-2 pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{
                            animation: 'turkeyBob 3.6s ease-in-out infinite',
                            zIndex: 34,
                        }}
                        onClick={(e) => triggerBurst(e, 'TURKEY FEAST ACTIVATED! 🍗')}
                        title="Click the curious Thanksgiving Turkey! 🦃"
                    >
                        <div className="relative flex items-center gap-1 px-2 py-1.5 rounded-l-2xl bg-slate-900/90 border-l border-y border-orange-500/50 shadow-xl shadow-orange-950/40 backdrop-blur-md">
                            <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                                🦃
                            </span>
                            <span className="text-[10px] font-mono font-black text-amber-400 hidden sm:inline pr-1">
                                Gobble!
                            </span>
                        </div>
                    </div>

                    {/* ----------------- FLOCK OF TROT-TURKEYS (TRIGGERED OR TIMED) ----------------- */}
                    {(turkeyFlockActive || true) && (
                        <>
                            {/* Turkey 1: Trotting Left to Right */}
                            <div
                                className="fixed bottom-6 left-0 pointer-events-auto cursor-pointer"
                                style={{
                                    animation: 'turkeyTrotLeftToRight 16s linear infinite',
                                    animationDelay: '1s',
                                    zIndex: 32,
                                }}
                                onClick={(e) => triggerBurst(e, 'TURKEY ON THE RUN! 🦃')}
                                title="Click the trotting turkey!"
                            >
                                <span
                                    className="inline-block text-4xl sm:text-5xl filter drop-shadow-[0_0_14px_rgba(245,158,11,0.9)] hover:scale-135 transition-transform"
                                    style={{ animation: 'turkeyWobble 0.35s ease-in-out infinite' }}
                                >
                                    🦃
                                </span>
                            </div>

                            {/* Turkey 2: Fast Baby Turkey Following */}
                            <div
                                className="fixed bottom-5 left-0 pointer-events-auto cursor-pointer"
                                style={{
                                    animation: 'turkeyTrotLeftToRight 16s linear infinite',
                                    animationDelay: '2.4s',
                                    zIndex: 32,
                                }}
                                onClick={(e) => triggerBurst(e, 'MINI GOBBLE! 🦃')}
                                title="Click the baby turkey!"
                            >
                                <span
                                    className="inline-block text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(234,88,12,0.9)] hover:scale-135 transition-transform"
                                    style={{ animation: 'turkeyWobble 0.28s ease-in-out infinite' }}
                                >
                                    🦃
                                </span>
                            </div>

                            {/* Turkey 3: Opposite Direction Trot (Right to Left across the screen) */}
                            <div
                                className="fixed bottom-14 left-0 pointer-events-auto cursor-pointer"
                                style={{
                                    animation: 'turkeyTrotRightToLeft 20s linear infinite',
                                    animationDelay: '8s',
                                    zIndex: 31,
                                }}
                                onClick={(e) => triggerBurst(e, 'THANKSGIVING BLESSINGS! 🥧')}
                                title="Click the traveling turkey!"
                            >
                                <span
                                    className="inline-block text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.85)] hover:scale-135 transition-transform"
                                    style={{ animation: 'turkeyWobble 0.32s ease-in-out infinite' }}
                                >
                                    🦃
                                </span>
                            </div>
                        </>
                    )}

                    {/* ----------------- WARM AUTUMN HARVEST BASKET (BOTTOM-CENTER ACCENTS) ----------------- */}
                    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-600/30 shadow-lg shadow-amber-950/20 backdrop-blur-md z-30">
                        <span className="text-sm">🍂</span>
                        <span className="text-xs font-mono text-amber-300/90 font-medium">
                            Thanksgiving Harvest Season
                        </span>
                        <span className="text-sm">🦃</span>
                        <span className="text-xs font-mono text-orange-400/80">
                            Consensus Valuation Matrix v3.0
                        </span>
                        <span className="text-sm">🥧</span>
                    </div>
                </div>
            )}

            {/* ----------------- MOUSE SPARKLE & FALL LEAF CURSOR TRAIL ----------------- */}
            {cursorSparks.map((spark) => (
                <div
                    key={spark.id}
                    className="fixed pointer-events-none z-50 select-none"
                    style={{
                        left: `${spark.x}px`,
                        top: `${spark.y}px`,
                        fontSize: `${spark.size}px`,
                        animation: 'sparkFade 0.75s ease-out forwards',
                        filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.9))',
                    }}
                >
                    {spark.char}
                </div>
            ))}

            {/* ----------------- POPUP SOUNDBURSTS / CELEBRATION CARDS ----------------- */}
            {soundBursts.map((burst) => (
                <div
                    key={burst.id}
                    className="fixed z-50 pointer-events-none animate-harvest-pop flex flex-col items-center select-none"
                    style={{ left: `${burst.x}px`, top: `${burst.y}px`, transform: 'translate(-50%, -100%)' }}
                >
                    <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border-2 border-amber-500 text-amber-300 font-black text-sm sm:text-base shadow-2xl shadow-amber-500/60 backdrop-blur-md flex items-center gap-2 animate-bounce">
                        <span className="text-xl">🦃</span>
                        <span>{burst.text}</span>
                        <span className="text-xl">🍁</span>
                    </div>
                </div>
            ))}

            {/* ----------------- BOTTOM-RIGHT SEASONAL CONTROLS ----------------- */}
            <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
                {enabled && (
                    <button
                        onClick={triggerTurkeyTrot}
                        className="px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-mono font-bold hover:bg-amber-900/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/30 backdrop-blur-md flex items-center gap-1.5"
                        title="Summon Turkey Trot!"
                    >
                        <span>🦃</span>
                        <span className="hidden md:inline">Turkey Trot!</span>
                    </button>
                )}

                <button
                    onClick={toggleTheme}
                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all duration-300 shadow-xl backdrop-blur-md ${
                        enabled
                            ? 'bg-slate-900/90 border-amber-500/60 text-amber-300 hover:border-amber-400 hover:bg-amber-950/50 shadow-amber-500/30'
                            : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={enabled ? 'Turn Fall / Thanksgiving Theme Off' : 'Turn Fall / Thanksgiving Theme On'}
                >
                    <span className="text-base group-hover:scale-125 transition-transform duration-200">
                        {enabled ? '🦃' : '🍂'}
                    </span>
                    <span className="font-bold">
                        {enabled ? 'Harvest Mode: ON' : 'Thanksgiving: OFF'}
                    </span>
                    <span
                        className={`h-2.5 w-2.5 rounded-full ${
                            enabled ? 'bg-amber-400 animate-ping shadow-[0_0_10px_#f59e0b]' : 'bg-slate-600'
                        }`}
                    />
                </button>
            </div>
        </>
    );
}
