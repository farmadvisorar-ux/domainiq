'use client';

import React, { useEffect, useState, useRef } from 'react';

interface FloatingEntity {
    id: number;
    type: 'ghost' | 'pumpkin' | 'bat' | 'skull' | 'candy';
    left: number; // percentage (0 - 100)
    top?: number; // percentage
    size: number; // px
    duration: number; // seconds
    delay: number; // seconds
    swayDuration: number;
    opacity: number;
}

interface CursorSpark {
    id: number;
    x: number;
    y: number;
    char: string;
    size: number;
}

const SPOOKY_MESSAGES = [
    'BOO! 👻',
    'HAPPY HALLOWEEN! 🎃',
    'HAUNTED DOMAIN DETECTED! 🦇',
    'VOODOO MAGIC UNLEASHED! 🧙‍♀️',
    'TRICK OR TREAT! 🍬',
    'FRIGHTFULLY VALUABLE! 💰',
    'SPECTRAL ROI BOOST! 📈',
    'DOUBLE, DOUBLE TOIL & TROUBLE! 🧪',
];

const CURSOR_EMOJIS = ['✨', '🎃', '👻', '🦇', '🍬', '🍂', '💀'];

export default function HalloweenEffects() {
    const [mounted, setMounted] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [spookySoundBurst, setSpookySoundBurst] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
    const [risingGhosts, setRisingGhosts] = useState<FloatingEntity[]>([]);
    const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
    const lastSparkTime = useRef(0);

    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem('domainvoodoo_halloween_enabled');
            if (saved !== null) {
                setEnabled(saved === 'true');
            }
        } catch {
            // ignore
        }

        // Continual rising ghosts from the bottom
        const bottomGhosts: FloatingEntity[] = [
            { id: 1, type: 'ghost', left: 12, size: 44, duration: 18, delay: 0, swayDuration: 4.2, opacity: 0.85 },
            { id: 2, type: 'ghost', left: 30, size: 36, duration: 22, delay: 5, swayDuration: 5.0, opacity: 0.8 },
            { id: 3, type: 'ghost', left: 52, size: 48, duration: 19, delay: 9, swayDuration: 4.6, opacity: 0.85 },
            { id: 4, type: 'ghost', left: 74, size: 40, duration: 21, delay: 3, swayDuration: 4.8, opacity: 0.8 },
            { id: 5, type: 'ghost', left: 90, size: 38, duration: 24, delay: 7, swayDuration: 5.2, opacity: 0.75 },
        ];
        setRisingGhosts(bottomGhosts);
    }, []);

    // Mouse movement ghost trail / embers
    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastSparkTime.current < 90) return; // Throttle to maintain 60fps
            lastSparkTime.current = now;

            const char = CURSOR_EMOJIS[Math.floor(Math.random() * CURSOR_EMOJIS.length)] || '✨';
            const sparkId = now + Math.random();
            const newSpark: CursorSpark = {
                id: sparkId,
                x: e.clientX,
                y: e.clientY,
                char,
                size: Math.floor(Math.random() * 8) + 14,
            };

            setCursorSparks((prev) => [...prev.slice(-12), newSpark]);

            setTimeout(() => {
                setCursorSparks((prev) => prev.filter((s) => s.id !== sparkId));
            }, 750);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enabled]);

    const toggleSpooky = () => {
        const next = !enabled;
        setEnabled(next);
        try {
            localStorage.setItem('domainvoodoo_halloween_enabled', String(next));
        } catch {
            // ignore
        }
    };

    const handleEntityClick = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;

        const randomMsg = SPOOKY_MESSAGES[Math.floor(Math.random() * SPOOKY_MESSAGES.length)] || 'BOO! 👻';
        const burstId = Date.now() + Math.random();

        setSpookySoundBurst((prev) => [...prev, { id: burstId, text: randomMsg, x, y }]);

        setTimeout(() => {
            setSpookySoundBurst((prev) => prev.filter((b) => b.id !== burstId));
        }, 1600);
    };

    const triggerBatStorm = () => {
        const burstId = Date.now() + Math.random();
        setSpookySoundBurst((prev) => [
            ...prev,
            { id: burstId, text: '🦇 BAT SWARM UNLEASHED! 🦇', x: window.innerWidth / 2, y: 180 },
        ]);
        setTimeout(() => {
            setSpookySoundBurst((prev) => prev.filter((b) => b.id !== burstId));
        }, 1800);
    };

    if (!mounted) return null;

    return (
        <>
            {/* Ambient Spooky Layer */}
            {enabled && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
                >
                    {/* Glowing Full Harvest Moon in Top-Right */}
                    <div
                        className="absolute top-6 right-6 sm:right-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'moonPulse 6s ease-in-out infinite',
                            zIndex: 21,
                        }}
                        onClick={(e) => handleEntityClick(e, 'moon')}
                        title="Click the Harvest Moon! 🌕"
                    >
                        {/* Moon Craters */}
                        <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-amber-400/40 blur-[1px]" />
                        <div className="absolute top-12 left-10 w-7 h-7 rounded-full bg-amber-400/30 blur-[1px]" />
                        <div className="absolute top-8 right-6 w-5 h-5 rounded-full bg-amber-400/35 blur-[1px]" />

                        {/* Silhouette Clouds crossing the moon */}
                        <div className="absolute top-6 -left-8 w-44 h-5 rounded-full bg-slate-950/40 blur-sm pointer-events-none" />
                        <div className="absolute top-16 -right-6 w-36 h-4 rounded-full bg-slate-950/35 blur-sm pointer-events-none" />
                    </div>

                    {/* Flying Witch on Broomstick crossing the sky */}
                    <div
                        className="absolute top-12 left-0 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'witchFly 20s linear infinite',
                            animationDelay: '3s',
                            zIndex: 23,
                        }}
                        onClick={(e) => handleEntityClick(e, 'witch')}
                        title="Click the Flying Witch! 🧙‍♀️"
                    >
                        <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] inline-block hover:scale-125 transition-transform">
                            🧙‍♀️
                        </span>
                    </div>

                    {/* ----------------- PROMINENT FLYING BATS ----------------- */}
                    {/* Bat 1: Swooping Left to Right High Altitude */}
                    <div
                        className="absolute top-16 left-0 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'batFlyLeftToRight 9s linear infinite',
                            animationDelay: '0s',
                            zIndex: 26,
                        }}
                        onClick={(e) => handleEntityClick(e, 'bat')}
                        title="Click the Flying Bat! 🦇"
                    >
                        <span
                            className="inline-block text-3xl sm:text-4xl filter drop-shadow-[0_0_10px_rgba(255,140,0,0.85)] hover:scale-150 transition-transform"
                            style={{ animation: 'batFlap 0.28s ease-in-out infinite' }}
                        >
                            🦇
                        </span>
                    </div>

                    {/* Bat 2: Swooping Right to Left across Center */}
                    <div
                        className="absolute top-36 left-0 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'batFlyRightToLeft 11s linear infinite',
                            animationDelay: '3.5s',
                            zIndex: 26,
                        }}
                        onClick={(e) => handleEntityClick(e, 'bat')}
                        title="Click the Flying Bat! 🦇"
                    >
                        <span
                            className="inline-block text-4xl sm:text-5xl filter drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] hover:scale-150 transition-transform"
                            style={{ animation: 'batFlap 0.24s ease-in-out infinite' }}
                        >
                            🦇
                        </span>
                    </div>

                    {/* Bat 3: Fast Darting Mini Bat */}
                    <div
                        className="absolute top-64 left-0 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'batFlyLeftToRight 7.5s linear infinite',
                            animationDelay: '5s',
                            zIndex: 26,
                        }}
                        onClick={(e) => handleEntityClick(e, 'bat')}
                        title="Click the Flying Bat! 🦇"
                    >
                        <span
                            className="inline-block text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(255,80,0,0.9)] hover:scale-150 transition-transform"
                            style={{ animation: 'batFlap 0.2s ease-in-out infinite' }}
                        >
                            🦇
                        </span>
                    </div>

                    {/* Bat 4: Duo Chasing Bat Right to Left */}
                    <div
                        className="absolute top-96 left-0 pointer-events-auto cursor-pointer"
                        style={{
                            animation: 'batFlyRightToLeft 10s linear infinite',
                            animationDelay: '8s',
                            zIndex: 26,
                        }}
                        onClick={(e) => handleEntityClick(e, 'bat')}
                        title="Click the Flying Bat! 🦇"
                    >
                        <span
                            className="inline-block text-3xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] hover:scale-150 transition-transform"
                            style={{ animation: 'batFlap 0.26s ease-in-out infinite' }}
                        >
                            🦇
                        </span>
                    </div>

                    {/* ----------------- IN-VIEW HOVERING GHOSTS ----------------- */}
                    {/* Ghost 1: Left Viewport Guardian (Always Visible!) */}
                    <div
                        className="absolute top-32 left-3 sm:left-8 pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{
                            animation: 'ghostHover 4.5s ease-in-out infinite',
                            zIndex: 25,
                        }}
                        onClick={(e) => handleEntityClick(e, 'ghost')}
                        title="Click me! Friendly Ghost 👻"
                    >
                        <div className="relative">
                            <span className="text-4xl sm:text-5xl filter drop-shadow-[0_0_18px_rgba(255,255,255,0.95)] drop-shadow-[0_0_35px_rgba(56,189,248,0.7)] select-none">
                                👻
                            </span>
                            <span className="absolute -top-3 -right-2 text-[11px] font-mono font-black px-1.5 py-0.2 rounded-full bg-purple-950/90 text-purple-300 border border-purple-500/50 animate-pulse">
                                Spooky
                            </span>
                        </div>
                    </div>

                    {/* Ghost 2: Right Viewport Guardian (Always Visible!) */}
                    <div
                        className="absolute top-64 right-3 sm:right-10 pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{
                            animation: 'ghostHover 5.2s ease-in-out infinite alternate',
                            animationDelay: '1.2s',
                            zIndex: 25,
                        }}
                        onClick={(e) => handleEntityClick(e, 'ghost')}
                        title="Click me! Spectral Phantom 👻"
                    >
                        <div className="relative">
                            <span className="text-4xl sm:text-5xl filter drop-shadow-[0_0_18px_rgba(255,255,255,0.95)] drop-shadow-[0_0_35px_rgba(168,85,247,0.7)] select-none">
                                👻
                            </span>
                            <span className="absolute -bottom-2 -left-2 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-950/90 text-orange-300 border border-orange-500/50">
                                Boo!
                            </span>
                        </div>
                    </div>

                    {/* Ghost 3: Center Wandering Ghost */}
                    <div
                        className="absolute top-48 left-1/3 pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{
                            animation: 'ghostWander 12s ease-in-out infinite alternate',
                            zIndex: 24,
                            opacity: 0.85,
                        }}
                        onClick={(e) => handleEntityClick(e, 'ghost')}
                        title="Click me! Wandering Spirit 👻"
                    >
                        <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] select-none">
                            👻
                        </span>
                    </div>

                    {/* ----------------- FLICKERING JACK-O'-LANTERNS ----------------- */}
                    {/* Left Bottom Pumpkin Patch */}
                    <div
                        className="absolute bottom-6 left-4 sm:left-10 flex items-end gap-1.5 pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                        onClick={(e) => handleEntityClick(e, 'pumpkin')}
                        title="Click the Pumpkin Patch! 🎃"
                        style={{ zIndex: 26 }}
                    >
                        <span
                            className="text-4xl sm:text-5xl select-none"
                            style={{ animation: 'pumpkinFlicker 3s ease-in-out infinite' }}
                        >
                            🎃
                        </span>
                        <span
                            className="text-3xl select-none -ml-2 mb-1"
                            style={{ animation: 'pumpkinFlicker 2.5s ease-in-out infinite', animationDelay: '0.8s' }}
                        >
                            🎃
                        </span>
                        <span
                            className="text-2xl select-none -ml-1"
                            style={{ animation: 'pumpkinFlicker 3.2s ease-in-out infinite', animationDelay: '1.4s' }}
                        >
                            🎃
                        </span>
                    </div>

                    {/* Right Mid Bobbing Pumpkin */}
                    <div
                        className="absolute top-80 right-20 hidden lg:block pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{
                            animation: 'ghostHover 4.0s ease-in-out infinite',
                            zIndex: 24,
                        }}
                        onClick={(e) => handleEntityClick(e, 'pumpkin')}
                        title="Click the Floating Jack-o'-lantern! 🎃"
                    >
                        <span
                            className="text-4xl select-none"
                            style={{ animation: 'pumpkinFlicker 3.6s ease-in-out infinite' }}
                        >
                            🎃
                        </span>
                    </div>

                    {/* ----------------- SPIDERWEBS & SPIDERS ----------------- */}
                    {/* Top-Left Corner Spiderweb SVG */}
                    <div className="absolute top-0 left-0 w-44 h-44 sm:w-60 sm:h-60 text-orange-500/25 pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,140,0,0.4)]">
                            <path d="M0 0 L100 0 M0 0 L92 38 M0 0 L70 70 M0 0 L38 92 M0 0 L0 100" />
                            <path d="M20 0 Q 18 10, 0 20" />
                            <path d="M40 0 Q 36 20, 0 40" />
                            <path d="M60 0 Q 52 30, 0 60" />
                            <path d="M80 0 Q 70 42, 0 80" />
                            <path d="M100 0 Q 86 52, 0 100" />
                            <path d="M18 10 Q 16 16, 10 18" />
                            <path d="M36 20 Q 30 30, 20 36" />
                            <path d="M52 30 Q 42 42, 30 52" />
                            <path d="M70 42 Q 56 56, 42 70" />
                            <path d="M86 52 Q 70 70, 52 86" />
                        </svg>
                        {/* Dangling Spider */}
                        <div
                            className="absolute top-36 left-24 animate-spider-dangle pointer-events-auto cursor-pointer"
                            onClick={(e) => handleEntityClick(e, 'spider')}
                            title="Eek! Click the spider! 🕷️"
                        >
                            <div className="w-[1px] h-12 bg-slate-400/50 -mt-12 mx-auto" />
                            <span className="text-xl filter drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">🕷️</span>
                        </div>
                    </div>

                    {/* Top-Right Corner Spiderweb SVG */}
                    <div className="absolute top-0 right-0 w-44 h-44 sm:w-60 sm:h-60 text-purple-400/25 pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9" className="w-full h-full transform scale-x-[-1] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                            <path d="M0 0 L100 0 M0 0 L92 38 M0 0 L70 70 M0 0 L38 92 M0 0 L0 100" />
                            <path d="M20 0 Q 18 10, 0 20" />
                            <path d="M40 0 Q 36 20, 0 40" />
                            <path d="M60 0 Q 52 30, 0 60" />
                            <path d="M80 0 Q 70 42, 0 80" />
                            <path d="M100 0 Q 86 52, 0 100" />
                            <path d="M18 10 Q 16 16, 10 18" />
                            <path d="M36 20 Q 30 30, 20 36" />
                            <path d="M52 30 Q 42 42, 30 52" />
                            <path d="M70 42 Q 56 56, 42 70" />
                            <path d="M86 52 Q 70 70, 52 86" />
                        </svg>
                    </div>

                    {/* Bottom Eerie Fog Layer */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-950/30 via-purple-950/25 to-transparent pointer-events-none animate-fog-drift" />

                    {/* ----------------- RISING GHOST SPIRITS ----------------- */}
                    {risingGhosts.map((entity) => (
                        <div
                            key={entity.id}
                            className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125"
                            style={{
                                left: `${entity.left}%`,
                                bottom: '-50px',
                                animation: `spookyFloat ${entity.duration}s infinite linear, spookySway ${entity.swayDuration}s infinite ease-in-out alternate`,
                                animationDelay: `${entity.delay}s`,
                                opacity: entity.opacity,
                                zIndex: 23,
                            }}
                            onClick={(e) => handleEntityClick(e, entity.type)}
                            title="Click the Floating Ghost! 👻"
                        >
                            <span
                                className="inline-block drop-shadow-[0_0_16px_rgba(255,255,255,0.85)] select-none"
                                style={{ fontSize: `${entity.size}px` }}
                            >
                                👻
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Mouse Ghost Sparkles Trail */}
            {cursorSparks.map((spark) => (
                <div
                    key={spark.id}
                    className="fixed pointer-events-none select-none z-50 text-base"
                    style={{
                        left: `${spark.x}px`,
                        top: `${spark.y}px`,
                        animation: 'sparkFade 0.75s ease-out forwards',
                        fontSize: `${spark.size}px`,
                        filter: 'drop-shadow(0 0 8px rgba(255,140,0,0.8))',
                    }}
                >
                    {spark.char}
                </div>
            ))}

            {/* Interactive "Boo!" Popup Bursts on Click */}
            {spookySoundBurst.map((burst) => (
                <div
                    key={burst.id}
                    className="fixed z-50 pointer-events-none animate-spooky-pop flex flex-col items-center select-none"
                    style={{ left: `${burst.x}px`, top: `${burst.y}px`, transform: 'translate(-50%, -100%)' }}
                >
                    <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border-2 border-orange-500 text-orange-300 font-black text-sm sm:text-base shadow-2xl shadow-orange-500/60 backdrop-blur-md flex items-center gap-2 animate-bounce">
                        <span className="text-xl">🎃</span>
                        <span>{burst.text}</span>
                        <span className="text-xl">👻</span>
                    </div>
                </div>
            ))}

            {/* Bottom-Right Seasonal Controls & Bat Storm Button */}
            <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
                {enabled && (
                    <button
                        onClick={triggerBatStorm}
                        className="px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/60 text-purple-300 text-xs font-mono font-bold hover:bg-purple-900/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/30 backdrop-blur-md flex items-center gap-1.5"
                        title="Summon Bat Swarm!"
                    >
                        <span>🦇</span>
                        <span className="hidden md:inline">Bat Swarm</span>
                    </button>
                )}

                <button
                    onClick={toggleSpooky}
                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all duration-300 shadow-xl backdrop-blur-md ${
                        enabled
                            ? 'bg-slate-900/90 border-orange-500/60 text-orange-300 hover:border-orange-400 hover:bg-orange-950/50 shadow-orange-500/30'
                            : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={enabled ? 'Turn Halloween Theme Off' : 'Turn Halloween Theme On'}
                >
                    <span className="text-base group-hover:scale-125 transition-transform duration-200">
                        {enabled ? '🎃' : '👻'}
                    </span>
                    <span className="font-bold">
                        {enabled ? 'Spooky Mode: ON' : 'Halloween Mode: OFF'}
                    </span>
                    <span
                        className={`h-2.5 w-2.5 rounded-full ${
                            enabled ? 'bg-orange-500 animate-ping shadow-[0_0_10px_#ff8800]' : 'bg-slate-600'
                        }`}
                    />
                </button>
            </div>
        </>
    );
}
