'use client';

import React, { useEffect, useState } from 'react';

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
    label?: string;
}

const SPOOKY_MESSAGES = [
    'Boo! 👻',
    'Happy Halloween! 🎃',
    'Spooky High Appraisal! ✨',
    'Trick or Treat! 🍬',
    'Voodoo Magic at Work! 🧙‍♀️',
    'Haunted Domain Detected! 🦇',
    'Spectral ROI! 📈',
    'Frightfully Valuable! 💰',
];

export default function HalloweenEffects() {
    const [mounted, setMounted] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [spookySoundBurst, setSpookySoundBurst] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
    const [ghosts, setGhosts] = useState<FloatingEntity[]>([]);

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

        // Generate randomized floating entities across the viewport
        const initialEntities: FloatingEntity[] = [
            // Floating Ghosts (drifting upward and swaying)
            { id: 1, type: 'ghost', left: 8, size: 42, duration: 24, delay: 0, swayDuration: 4.5, opacity: 0.85 },
            { id: 2, type: 'ghost', left: 24, size: 34, duration: 28, delay: 6, swayDuration: 5.2, opacity: 0.75 },
            { id: 3, type: 'ghost', left: 45, size: 48, duration: 22, delay: 12, swayDuration: 4.8, opacity: 0.8 },
            { id: 4, type: 'ghost', left: 68, size: 38, duration: 26, delay: 4, swayDuration: 5.0, opacity: 0.85 },
            { id: 5, type: 'ghost', left: 88, size: 44, duration: 25, delay: 9, swayDuration: 4.2, opacity: 0.8 },
            { id: 6, type: 'ghost', left: 93, size: 32, duration: 30, delay: 15, swayDuration: 6.0, opacity: 0.7 },

            // Floating Glowing Pumpkins (bobbing in atmospheric spots)
            { id: 10, type: 'pumpkin', left: 14, size: 36, duration: 18, delay: 2, swayDuration: 3.8, opacity: 0.9 },
            { id: 11, type: 'pumpkin', left: 35, size: 42, duration: 20, delay: 8, swayDuration: 4.2, opacity: 0.95 },
            { id: 12, type: 'pumpkin', left: 78, size: 40, duration: 19, delay: 5, swayDuration: 3.9, opacity: 0.9 },
            { id: 13, type: 'pumpkin', left: 85, size: 34, duration: 21, delay: 11, swayDuration: 4.5, opacity: 0.85 },

            // Gliding Bats (zipping across)
            { id: 20, type: 'bat', left: 18, size: 28, duration: 15, delay: 1, swayDuration: 2.2, opacity: 0.8 },
            { id: 21, type: 'bat', left: 55, size: 32, duration: 17, delay: 7, swayDuration: 2.5, opacity: 0.85 },
            { id: 22, type: 'bat', left: 82, size: 26, duration: 14, delay: 13, swayDuration: 2.0, opacity: 0.75 },

            // Mystical Charms & Candy
            { id: 30, type: 'candy', left: 28, size: 24, duration: 27, delay: 3, swayDuration: 4.0, opacity: 0.7 },
            { id: 31, type: 'skull', left: 62, size: 26, duration: 25, delay: 10, swayDuration: 4.3, opacity: 0.75 },
        ];

        setGhosts(initialEntities);
    }, []);

    const toggleSpooky = () => {
        const next = !enabled;
        setEnabled(next);
        try {
            localStorage.setItem('domainvoodoo_halloween_enabled', String(next));
        } catch {
            // ignore
        }
    };

    const handleEntityClick = (e: React.MouseEvent, entity: FloatingEntity) => {
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;

        const randomMsg = SPOOKY_MESSAGES[Math.floor(Math.random() * SPOOKY_MESSAGES.length)] || 'Boo! 👻';
        const burstId = Date.now() + Math.random();

        setSpookySoundBurst((prev) => [...prev, { id: burstId, text: randomMsg, x, y }]);

        setTimeout(() => {
            setSpookySoundBurst((prev) => prev.filter((b) => b.id !== burstId));
        }, 1600);
    };

    if (!mounted) return null;

    return (
        <>
            {/* Ambient Spooky Layer */}
            {enabled && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
                    style={{ perspective: 1000 }}
                >
                    {/* Top-Left Corner Spiderweb SVG */}
                    <div className="absolute top-0 left-0 w-36 h-36 sm:w-52 sm:h-52 text-orange-500/20 dark:text-purple-400/20 pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,140,0,0.3)]">
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
                        <div className="absolute top-28 left-20 animate-spider-dangle pointer-events-auto cursor-pointer" title="Eek! A friendly spider! 🕷️">
                            <div className="w-[1px] h-8 bg-slate-500/40 -mt-8 mx-auto" />
                            <span className="text-sm filter drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">🕷️</span>
                        </div>
                    </div>

                    {/* Top-Right Corner Spiderweb SVG */}
                    <div className="absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52 text-purple-400/20 dark:text-orange-500/20 pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full transform scale-x-[-1] drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
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

                    {/* Eerie Bottom Fog / Glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-orange-950/20 via-purple-950/15 to-transparent pointer-events-none animate-fog-drift" />

                    {/* Floating Entities (Ghosts, Pumpkins, Bats, etc.) */}
                    {ghosts.map((entity) => {
                        const icon =
                            entity.type === 'ghost'
                                ? '👻'
                                : entity.type === 'pumpkin'
                                ? '🎃'
                                : entity.type === 'bat'
                                ? '🦇'
                                : entity.type === 'skull'
                                ? '💀'
                                : '🍬';

                        const glowClass =
                            entity.type === 'pumpkin'
                                ? 'drop-shadow-[0_0_12px_rgba(255,140,0,0.85)]'
                                : entity.type === 'ghost'
                                ? 'drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]'
                                : entity.type === 'bat'
                                ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]'
                                : 'drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]';

                        return (
                            <div
                                key={entity.id}
                                className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125"
                                style={{
                                    left: `${entity.left}%`,
                                    bottom: '-60px',
                                    animation: `spookyFloat ${entity.duration}s infinite linear, spookySway ${entity.swayDuration}s infinite ease-in-out alternate`,
                                    animationDelay: `${entity.delay}s`,
                                    opacity: entity.opacity,
                                    zIndex: 25,
                                }}
                                onClick={(e) => handleEntityClick(e, entity)}
                                title={`Click me! ${icon}`}
                            >
                                <span
                                    className={`inline-block ${glowClass} transition-all duration-300 select-none`}
                                    style={{ fontSize: `${entity.size}px` }}
                                >
                                    {icon}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Interactive "Boo!" Popup Bursts on Click */}
            {spookySoundBurst.map((burst) => (
                <div
                    key={burst.id}
                    className="fixed z-50 pointer-events-none animate-spooky-pop flex flex-col items-center select-none"
                    style={{ left: `${burst.x}px`, top: `${burst.y}px`, transform: 'translate(-50%, -100%)' }}
                >
                    <div className="px-3 py-1.5 rounded-full bg-slate-900/95 border border-orange-500/80 text-orange-300 font-extrabold text-xs shadow-2xl shadow-orange-500/50 backdrop-blur-md flex items-center gap-1.5 animate-bounce">
                        <span>✨</span>
                        <span>{burst.text}</span>
                        <span>✨</span>
                    </div>
                </div>
            ))}

            {/* Bottom-Right Seasonal Halloween Pill & Toggle */}
            <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
                <button
                    onClick={toggleSpooky}
                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all duration-300 shadow-xl backdrop-blur-md ${
                        enabled
                            ? 'bg-slate-900/90 border-orange-500/50 text-orange-300 hover:border-orange-400 hover:bg-orange-950/40 shadow-orange-500/20'
                            : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={enabled ? 'Turn Halloween Theme Off' : 'Turn Halloween Theme On'}
                >
                    <span className="text-base group-hover:scale-125 transition-transform duration-200">
                        {enabled ? '🎃' : '👻'}
                    </span>
                    <span className="hidden sm:inline">
                        {enabled ? 'Halloween Mode: ON' : 'Halloween Mode: OFF'}
                    </span>
                    <span
                        className={`h-2 w-2 rounded-full ${
                            enabled ? 'bg-orange-500 animate-pulse shadow-[0_0_8px_#ff8800]' : 'bg-slate-600'
                        }`}
                    />
                </button>
            </div>
        </>
    );
}
