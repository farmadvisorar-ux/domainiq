'use client';

import React, { useEffect, useState, useRef } from 'react';

interface FallingEntity {
    id: number;
    char: string;
    left: number; // percentage (0 - 100)
    topOffset?: number; // px from header bottom (e.g. 90)
    size: number; // px
    duration: number; // seconds
    delay: number; // seconds
    swayDuration: number;
    rotateStart?: number;
    rotateEnd?: number;
    opacity: number;
    animationType: 'fallFromLeftTree' | 'fallFromRightTree' | 'centerFall';
    isSnow?: boolean;
}

interface CursorSpark {
    id: number;
    x: number;
    y: number;
    char: string;
    size: number;
}

const HARVEST_MESSAGES = [
    'GOBBLE GOBBLE! 🦃',
    'HAPPY THANKSGIVING! 🍁',
    'FEAST ON REAL MARKET COMPS! 🥧',
    'HARVESTING MAXIMUM DOMAIN ROI! 🌾',
    'GIVING THANKS FOR ZERO PAYWALLS! ✨',
    'PLENTIFUL ASSET EQUITY! 🌽',
    'TURKEY TROT VALUATION! 🍗',
    'CRANBERRY-SWEET EXIT MULTIPLES! 🫐',
];

const TREE_RUSTLE_MESSAGES = [
    '🍂 RUSTLE! Golden Maple branches shaken! 🍁',
    '🍁 RUSTLE! Autumn Oak sheds crisp harvest leaves! 🍂',
    '🌾 AUTUMN BREEZE! Fresh foliage falls from the trees! 🍃',
    '🥧 HARVEST FEAST! Plentiful leaves detached! 🍁',
];

const SNOW_MESSAGES = [
    'FIRST SNOWFALL! ❄️',
    'WINTER IS COMING! ⛄',
    'CRISP WINTER MARKET COMPS! ❆',
    'EARLY WINTER FLURRY! 🌨️',
    'FROST-PROOF DOMAIN EQUITY! 🧊',
    'CLEAR COLD VALUATIONS! ✨',
];

const LEAF_CHARS = ['🍁', '🍂', '🍃', '🌰', '🌾', '🥧', '🍁', '🍂'];
const SNOW_CHARS = ['❄️', '❅', '❆', '🌨️', '⛄', '❄️', '❆', '✨'];
const CURSOR_EMOJIS_AUTUMN = ['🍁', '🍂', '✨', '🌽', '🥧', '🦃', '🌰'];
const CURSOR_EMOJIS_SNOW = ['❄️', '❅', '❆', '✨', '⛄', '🍁', '🍂'];

export default function ThanksgivingEffects() {
    const [mounted, setMounted] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [soundBursts, setSoundBursts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
    const [fallingLeaves, setFallingLeaves] = useState<FallingEntity[]>([]);
    const [occasionalSnow, setOccasionalSnow] = useState<FallingEntity[]>([]);
    const [flurrySnow, setFlurrySnow] = useState<FallingEntity[]>([]);
    const [isFlurryActive, setIsFlurryActive] = useState(false);
    const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
    const [turkeyFlockActive, setTurkeyFlockActive] = useState(false);
    const [turkeyPeeking, setTurkeyPeeking] = useState(false);
    const [shakingLeftTree, setShakingLeftTree] = useState(false);
    const [shakingRightTree, setShakingRightTree] = useState(false);
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

        // 1. Initial steady stream of autumn leaves drifting down FROM THE TREES (below header, never obscured)
        const initialLeaves: FallingEntity[] = [
            // Leaves falling from Left Autumn Tree (drift toward center-right)
            { id: 1, char: '🍁', left: 10, topOffset: 95, size: 28, duration: 13, delay: 0, swayDuration: 3.8, opacity: 0.9, animationType: 'fallFromLeftTree' },
            { id: 2, char: '🍂', left: 18, topOffset: 110, size: 24, duration: 16, delay: 2, swayDuration: 4.2, opacity: 0.85, animationType: 'fallFromLeftTree' },
            { id: 3, char: '🍁', left: 14, topOffset: 125, size: 30, duration: 14, delay: 5, swayDuration: 3.6, opacity: 0.92, animationType: 'fallFromLeftTree' },
            { id: 4, char: '🍃', left: 22, topOffset: 100, size: 22, duration: 15, delay: 1, swayDuration: 4.0, opacity: 0.8, animationType: 'fallFromLeftTree' },

            // Leaves falling from Right Autumn Tree (drift toward center-left)
            { id: 5, char: '🍂', left: 82, topOffset: 95, size: 28, duration: 14, delay: 1.5, swayDuration: 4.0, opacity: 0.9, animationType: 'fallFromRightTree' },
            { id: 6, char: '🍁', left: 88, topOffset: 115, size: 32, duration: 13, delay: 4, swayDuration: 3.5, opacity: 0.92, animationType: 'fallFromRightTree' },
            { id: 7, char: '🌰', left: 78, topOffset: 130, size: 20, duration: 18, delay: 6, swayDuration: 4.6, opacity: 0.82, animationType: 'fallFromRightTree' },
            { id: 8, char: '🌾', left: 85, topOffset: 105, size: 24, duration: 19, delay: 8, swayDuration: 4.8, opacity: 0.78, animationType: 'fallFromRightTree' },

            // Leaves gently drifting down the center corridor
            { id: 9, char: '🍂', left: 40, topOffset: 90, size: 26, duration: 16, delay: 3, swayDuration: 3.9, opacity: 0.85, animationType: 'centerFall' },
            { id: 10, char: '🍁', left: 60, topOffset: 90, size: 32, duration: 12, delay: 6.5, swayDuration: 3.4, opacity: 0.9, animationType: 'centerFall' },
        ];
        setFallingLeaves(initialLeaves);

        // 2. Continuous gentle stray occasional snow mixed with foliage (starts safely below header)
        const initialStraySnow: FallingEntity[] = [
            { id: 101, char: '❄️', left: 28, topOffset: 92, size: 20, duration: 17, delay: 1, swayDuration: 4.8, opacity: 0.85, animationType: 'centerFall', isSnow: true },
            { id: 102, char: '❆', left: 52, topOffset: 92, size: 24, duration: 20, delay: 5, swayDuration: 5.2, opacity: 0.8, animationType: 'centerFall', isSnow: true },
            { id: 103, char: '❅', left: 70, topOffset: 92, size: 18, duration: 16, delay: 3, swayDuration: 4.2, opacity: 0.75, animationType: 'centerFall', isSnow: true },
            { id: 104, char: '❄️', left: 92, topOffset: 92, size: 22, duration: 19, delay: 7.5, swayDuration: 5.0, opacity: 0.85, animationType: 'centerFall', isSnow: true },
            { id: 105, char: '⛄', left: 46, topOffset: 92, size: 24, duration: 22, delay: 11, swayDuration: 5.6, opacity: 0.88, animationType: 'centerFall', isSnow: true },
        ];
        setOccasionalSnow(initialStraySnow);

        // 3. Turkey peek-a-boo interval every 12 seconds
        const peekInterval = setInterval(() => {
            setTurkeyPeeking(true);
            setTimeout(() => setTurkeyPeeking(false), 4200);
        }, 12000);

        // 4. Occasional Snow Flurry Cycle (triggers automatically every 38 seconds for 16 seconds)
        const flurryInterval = setInterval(() => {
            triggerFlurryCycle();
        }, 38000);

        return () => {
            clearInterval(peekInterval);
            clearInterval(flurryInterval);
        };
    }, []);

    // Generate a burst of snow flurry (starts safely below header)
    const triggerFlurryCycle = () => {
        setIsFlurryActive(true);

        const flurryItems: FallingEntity[] = Array.from({ length: 18 }, (_, idx) => ({
            id: 200 + idx + Math.random(),
            char: SNOW_CHARS[idx % SNOW_CHARS.length] || '❄️',
            left: Math.round((idx * 5.5) + (Math.random() * 4)),
            topOffset: 92,
            size: Math.floor(Math.random() * 14) + 16,
            duration: Math.floor(Math.random() * 6) + 11,
            delay: Number((Math.random() * 4).toFixed(1)),
            swayDuration: Number((Math.random() * 2 + 3.2).toFixed(1)),
            opacity: Number((Math.random() * 0.3 + 0.65).toFixed(2)),
            animationType: 'centerFall',
            isSnow: true,
        }));
        setFlurrySnow(flurryItems);

        // End flurry after 16 seconds
        setTimeout(() => {
            setIsFlurryActive(false);
            setFlurrySnow([]);
        }, 16000);
    };

    // Mouse movement fall embers & leaf/snow trail
    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastSparkTime.current < 85) return;
            lastSparkTime.current = now;

            const emojiList = isFlurryActive ? CURSOR_EMOJIS_SNOW : CURSOR_EMOJIS_AUTUMN;
            const char = emojiList[Math.floor(Math.random() * emojiList.length)] || '🍁';
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
    }, [enabled, isFlurryActive]);

    const toggleTheme = () => {
        const next = !enabled;
        setEnabled(next);
        try {
            localStorage.setItem('domainvoodoo_thanksgiving_enabled', String(next));
        } catch {
            // ignore
        }
    };

    const triggerBurst = (e: React.MouseEvent, textOverride?: string, isWinter?: boolean) => {
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;

        const pool = isWinter ? SNOW_MESSAGES : HARVEST_MESSAGES;
        const text = textOverride || pool[Math.floor(Math.random() * pool.length)] || 'GOBBLE GOBBLE! 🦃';
        const burstId = Date.now() + Math.random();

        setSoundBursts((prev) => [...prev, { id: burstId, text, x, y }]);

        setTimeout(() => {
            setSoundBursts((prev) => prev.filter((b) => b.id !== burstId));
        }, 1800);
    };

    // Shake tree interactive handler: shakes tree and drops extra shower of leaves
    const shakeTree = (side: 'left' | 'right', e: React.MouseEvent) => {
        e.stopPropagation();
        if (side === 'left') {
            setShakingLeftTree(true);
            setTimeout(() => setShakingLeftTree(false), 900);
        } else {
            setShakingRightTree(true);
            setTimeout(() => setShakingRightTree(false), 900);
        }

        const msg = TREE_RUSTLE_MESSAGES[Math.floor(Math.random() * TREE_RUSTLE_MESSAGES.length)] || '🍂 RUSTLE! Autumn leaves fall from the tree!';
        triggerBurst(e, msg, false);

        // Spawn a mini shower of 4 fresh leaves from that tree
        const freshShower: FallingEntity[] = Array.from({ length: 4 }, (_, i) => ({
            id: Date.now() + i + Math.random(),
            char: LEAF_CHARS[Math.floor(Math.random() * LEAF_CHARS.length)] || '🍁',
            left: side === 'left' ? 12 + i * 4 : 80 + i * 4,
            topOffset: 120 + i * 15,
            size: Math.floor(Math.random() * 8) + 24,
            duration: Math.floor(Math.random() * 4) + 11,
            delay: Number((i * 0.3).toFixed(1)),
            swayDuration: 3.5,
            opacity: 0.95,
            animationType: side === 'left' ? 'fallFromLeftTree' : 'fallFromRightTree',
        }));

        setFallingLeaves((prev) => [...prev, ...freshShower]);
        setTimeout(() => {
            setFallingLeaves((prev) => prev.filter((item) => !freshShower.some((f) => f.id === item.id)));
        }, 15000);
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

    const triggerManualSnowFlurry = () => {
        triggerFlurryCycle();
        const burstId = Date.now() + Math.random();
        setSoundBursts((prev) => [
            ...prev,
            { id: burstId, text: '❄️ EARLY WINTER SNOW FLURRY ARRIVED! 🌨️', x: window.innerWidth / 2, y: 160 },
        ]);
        setTimeout(() => {
            setSoundBursts((prev) => prev.filter((b) => b.id !== burstId));
        }, 2200);
    };

    if (!mounted) return null;

    return (
        <>
            {enabled && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
                >
                    {/* Ambient Harvest Season Sky Glow (Warm Amber, Cinnamon & Spiced Gold) */}
                    <div className="absolute top-24 left-1/4 w-[600px] h-[300px] bg-gradient-to-br from-amber-500/10 via-orange-600/10 to-rose-700/5 blur-[140px] pointer-events-none rounded-full" />
                    <div className="absolute top-1/3 -right-32 w-[500px] h-[400px] bg-gradient-to-br from-yellow-500/8 via-amber-600/10 to-emerald-800/5 blur-[150px] pointer-events-none rounded-full" />

                    {/* Occasional Winter Frost Sky Glow when Snow Flurry is active */}
                    {isFlurryActive && (
                        <div
                            className="absolute top-20 inset-x-0 h-44 bg-gradient-to-b from-sky-400/15 via-cyan-400/10 to-transparent blur-2xl pointer-events-none transition-opacity duration-1000"
                            style={{ animation: 'winterFrostPulse 3.5s ease-in-out infinite' }}
                        />
                    )}

                    {/* Flurry Notification Pill (safely repositioned below header at top-28) */}
                    {isFlurryActive && (
                        <div className="fixed top-28 left-1/2 -translate-x-1/2 pointer-events-auto z-40 animate-bounce">
                            <div className="px-3.5 py-1 rounded-full bg-slate-900/95 border border-sky-400/60 shadow-lg shadow-sky-500/30 text-sky-200 text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md">
                                <span>❄️</span>
                                <span>Early Winter Snow Flurry</span>
                                <span>🌨️</span>
                            </div>
                        </div>
                    )}

                    {/* ----------------- AUTUMN TREES (LEFT & RIGHT) ----------------- */}
                    {/* Left Autumn Maple Tree */}
                    <div
                        className={`fixed top-24 -left-6 sm:left-1 md:left-4 w-32 sm:w-48 md:w-60 h-72 sm:h-88 pointer-events-auto cursor-pointer z-30 transition-transform duration-300 origin-bottom-left select-none ${
                            shakingLeftTree ? 'animate-[treeShake_0.8s_ease-in-out]' : ''
                        }`}
                        style={{ animation: shakingLeftTree ? undefined : 'treeSwayLeft 6.5s ease-in-out infinite' }}
                        onClick={(e) => shakeTree('left', e)}
                        title="Click the Autumn Maple Tree to shake leaves loose! 🍁"
                    >
                        <svg viewBox="0 0 200 300" className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(245,158,11,0.3)]">
                            <defs>
                                <linearGradient id="leftTrunk" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#854d0e" />
                                    <stop offset="60%" stopColor="#5c2b0c" />
                                    <stop offset="100%" stopColor="#3d1a04" />
                                </linearGradient>
                                <linearGradient id="canopyRed" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f87171" />
                                    <stop offset="50%" stopColor="#dc2626" />
                                    <stop offset="100%" stopColor="#991b1b" />
                                </linearGradient>
                                <linearGradient id="canopyOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fb923c" />
                                    <stop offset="50%" stopColor="#ea580c" />
                                    <stop offset="100%" stopColor="#c2410c" />
                                </linearGradient>
                                <linearGradient id="canopyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fde047" />
                                    <stop offset="50%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#d97706" />
                                </linearGradient>
                            </defs>

                            {/* Spreading Trunk & Boughs */}
                            <path d="M 40 300 Q 55 230, 50 170 Q 45 130, 70 95 Q 80 75, 95 60" stroke="url(#leftTrunk)" strokeWidth="16" fill="none" strokeLinecap="round" />
                            <path d="M 50 170 Q 80 150, 115 135" stroke="url(#leftTrunk)" strokeWidth="9" fill="none" strokeLinecap="round" />
                            <path d="M 68 115 Q 40 85, 25 70" stroke="url(#leftTrunk)" strokeWidth="7" fill="none" strokeLinecap="round" />
                            <path d="M 88 90 Q 125 75, 145 65" stroke="url(#leftTrunk)" strokeWidth="6" fill="none" strokeLinecap="round" />

                            {/* Layered Leaf Clouds */}
                            <ellipse cx="60" cy="85" rx="40" ry="30" fill="url(#canopyRed)" opacity="0.9" />
                            <ellipse cx="115" cy="105" rx="36" ry="26" fill="url(#canopyOrange)" opacity="0.9" />
                            <ellipse cx="85" cy="60" rx="44" ry="32" fill="url(#canopyGold)" opacity="0.94" />
                            <ellipse cx="135" cy="75" rx="32" ry="24" fill="url(#canopyRed)" opacity="0.88" />
                            <ellipse cx="35" cy="75" rx="26" ry="20" fill="url(#canopyOrange)" opacity="0.9" />
                            <ellipse cx="80" cy="35" rx="34" ry="24" fill="url(#canopyGold)" opacity="0.95" />

                            {/* Leaf highlights */}
                            <circle cx="48" cy="60" r="13" fill="#ef4444" opacity="0.85" />
                            <circle cx="75" cy="45" r="15" fill="#f59e0b" opacity="0.9" />
                            <circle cx="105" cy="60" r="14" fill="#ea580c" opacity="0.85" />
                            <circle cx="68" cy="80" r="16" fill="#d97706" opacity="0.9" />
                        </svg>
                        {/* Clustered falling leaf perched on tree */}
                        <span className="absolute top-12 right-2 text-lg sm:text-xl animate-pulse">🍁</span>
                        <span className="absolute top-24 right-8 text-base sm:text-lg animate-bounce">🍂</span>
                    </div>

                    {/* Right Autumn Oak Tree */}
                    <div
                        className={`fixed top-24 -right-6 sm:right-1 md:right-4 w-32 sm:w-48 md:w-60 h-72 sm:h-88 pointer-events-auto cursor-pointer z-30 transition-transform duration-300 origin-bottom-right select-none ${
                            shakingRightTree ? 'animate-[treeShake_0.8s_ease-in-out]' : ''
                        }`}
                        style={{ animation: shakingRightTree ? undefined : 'treeSwayRight 6.8s ease-in-out infinite' }}
                        onClick={(e) => shakeTree('right', e)}
                        title="Click the Autumn Oak Tree to shake leaves loose! 🍂"
                    >
                        <svg viewBox="0 0 200 300" className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(249,115,22,0.3)]">
                            <defs>
                                <linearGradient id="rightTrunk" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#92400e" />
                                    <stop offset="60%" stopColor="#662e0b" />
                                    <stop offset="100%" stopColor="#451a03" />
                                </linearGradient>
                                <linearGradient id="canopyAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="50%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#b45309" />
                                </linearGradient>
                                <linearGradient id="canopyWarm" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fdba74" />
                                    <stop offset="50%" stopColor="#f97316" />
                                    <stop offset="100%" stopColor="#c2410c" />
                                </linearGradient>
                            </defs>

                            {/* Spreading Oak Trunk & Branches */}
                            <path d="M 160 300 Q 145 230, 150 170 Q 155 130, 130 95 Q 120 75, 105 60" stroke="url(#rightTrunk)" strokeWidth="16" fill="none" strokeLinecap="round" />
                            <path d="M 150 170 Q 120 150, 85 135" stroke="url(#rightTrunk)" strokeWidth="9" fill="none" strokeLinecap="round" />
                            <path d="M 132 115 Q 160 85, 175 70" stroke="url(#rightTrunk)" strokeWidth="7" fill="none" strokeLinecap="round" />
                            <path d="M 112 90 Q 75 75, 55 65" stroke="url(#rightTrunk)" strokeWidth="6" fill="none" strokeLinecap="round" />

                            {/* Layered Autumn Oak Foliage */}
                            <ellipse cx="140" cy="85" rx="40" ry="30" fill="url(#canopyAmber)" opacity="0.92" />
                            <ellipse cx="85" cy="105" rx="36" ry="26" fill="url(#canopyWarm)" opacity="0.9" />
                            <ellipse cx="115" cy="60" rx="44" ry="32" fill="url(#canopyAmber)" opacity="0.95" />
                            <ellipse cx="65" cy="75" rx="32" ry="24" fill="url(#canopyWarm)" opacity="0.88" />
                            <ellipse cx="165" cy="75" rx="26" ry="20" fill="url(#canopyAmber)" opacity="0.9" />
                            <ellipse cx="120" cy="35" rx="34" ry="24" fill="url(#canopyWarm)" opacity="0.95" />

                            {/* Oak Leaf Clusters */}
                            <circle cx="152" cy="60" r="13" fill="#ea580c" opacity="0.85" />
                            <circle cx="125" cy="45" r="15" fill="#f59e0b" opacity="0.9" />
                            <circle cx="95" cy="60" r="14" fill="#dc2626" opacity="0.85" />
                            <circle cx="132" cy="80" r="16" fill="#f97316" opacity="0.9" />
                        </svg>
                        <span className="absolute top-12 left-2 text-lg sm:text-xl animate-pulse">🍂</span>
                        <span className="absolute top-24 left-8 text-base sm:text-lg animate-bounce">🍁</span>
                    </div>

                    {/* ----------------- GENTLY FALLING AUTUMN LEAVES (SPAWNING FROM TREES BELOW HEADER) ----------------- */}
                    {fallingLeaves.map((leaf) => {
                        const topStyle = leaf.topOffset ? `${leaf.topOffset}px` : '92px';
                        let anim = `leafFall ${leaf.duration}s infinite linear, leafSway ${leaf.swayDuration}s infinite ease-in-out alternate`;
                        if (leaf.animationType === 'fallFromLeftTree') {
                            anim = `leafDriftFromLeftTree ${leaf.duration}s infinite ease-in-out`;
                        } else if (leaf.animationType === 'fallFromRightTree') {
                            anim = `leafDriftFromRightTree ${leaf.duration}s infinite ease-in-out`;
                        }

                        return (
                            <div
                                key={leaf.id}
                                className="absolute pointer-events-auto cursor-pointer select-none"
                                style={{
                                    left: `${leaf.left}%`,
                                    top: topStyle,
                                    fontSize: `${leaf.size}px`,
                                    opacity: leaf.opacity,
                                    animation: anim,
                                    animationDelay: `${leaf.delay}s`,
                                    filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.45))',
                                    zIndex: 35,
                                }}
                                onClick={(e) => triggerBurst(e, `${leaf.char} Autumn Breeze!`, false)}
                                title="Catch the falling leaf! 🍂"
                            >
                                <span className="inline-block hover:scale-135 transition-transform duration-200">
                                    {leaf.char}
                                </span>
                            </div>
                        );
                    })}

                    {/* ----------------- OCCASIONAL DRIFTING SNOWFLAKES (BELOW HEADER) ----------------- */}
                    {occasionalSnow.map((snow) => (
                        <div
                            key={snow.id}
                            className="absolute pointer-events-auto cursor-pointer select-none"
                            style={{
                                left: `${snow.left}%`,
                                top: `${snow.topOffset || 92}px`,
                                fontSize: `${snow.size}px`,
                                opacity: snow.opacity,
                                animation: `snowFall ${snow.duration}s infinite linear, snowDrift ${snow.swayDuration}s infinite ease-in-out alternate`,
                                animationDelay: `${snow.delay}s`,
                                filter: 'drop-shadow(0 0 8px rgba(186, 230, 253, 0.9))',
                                zIndex: 35,
                            }}
                            onClick={(e) => triggerBurst(e, `${snow.char} Crisp Winter Snowflake!`, true)}
                            title="Catch the snowflake! ❄️"
                        >
                            <span className="inline-block hover:scale-135 transition-transform duration-200">
                                {snow.char}
                            </span>
                        </div>
                    ))}

                    {/* ----------------- INTENSIVE OCCASIONAL SNOW FLURRY PARTICLES ----------------- */}
                    {isFlurryActive &&
                        flurrySnow.map((snow) => (
                            <div
                                key={snow.id}
                                className="absolute pointer-events-auto cursor-pointer select-none"
                                style={{
                                    left: `${snow.left}%`,
                                    top: `${snow.topOffset || 92}px`,
                                    fontSize: `${snow.size}px`,
                                    opacity: snow.opacity,
                                    animation: `snowFall ${snow.duration}s linear infinite, snowDrift ${snow.swayDuration}s ease-in-out infinite alternate`,
                                    animationDelay: `${snow.delay}s`,
                                    filter: 'drop-shadow(0 0 10px rgba(186, 230, 253, 0.95))',
                                    zIndex: 36,
                                }}
                                onClick={(e) => triggerBurst(e, `${snow.char} Winter Flurry!`, true)}
                                title="Catch the flurry snowflake! ❄️"
                            >
                                <span className="inline-block hover:scale-135 transition-transform duration-200">
                                    {snow.char}
                                </span>
                            </div>
                        ))}

                    {/* ----------------- CORNUCOPIA / HARVEST BASKET (BELOW HEADER AT TOP-28) ----------------- */}
                    <div
                        className="fixed top-28 right-4 sm:right-10 pointer-events-auto cursor-pointer hover:scale-115 transition-transform"
                        style={{
                            animation: 'harvestGlowPulse 4.5s ease-in-out infinite',
                            zIndex: 35,
                        }}
                        onClick={(e) => triggerBurst(e, 'HORN OF PLENTY! 🌽')}
                        title="Click the Harvest Cornucopia! 🌽"
                    >
                        <div className="relative flex items-center gap-1 p-2 rounded-2xl bg-amber-950/80 border border-amber-500/50 shadow-xl shadow-amber-950/40 backdrop-blur-md">
                            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                                🌽
                            </span>
                            <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">
                                🥧
                            </span>
                            <span className="text-[11px] font-mono font-bold text-amber-300 pr-1 hidden sm:inline">
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
                    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-600/30 shadow-lg shadow-amber-950/20 backdrop-blur-md z-30">
                        <span className="text-sm">🍂</span>
                        <span className="text-xs font-mono text-amber-300/90 font-medium">
                            Fall Harvest &amp; Winter Snow
                        </span>
                        <span className="text-sm">🦃</span>
                        <span className="text-xs font-mono text-sky-300/90">
                            CVM-4 Algorithmic Matrix
                        </span>
                        <span className="text-sm">❄️</span>
                    </div>
                </div>
            )}

            {/* ----------------- MOUSE SPARKLE & FALL LEAF / SNOWFLAKE CURSOR TRAIL ----------------- */}
            {cursorSparks.map((spark) => (
                <div
                    key={spark.id}
                    className="fixed pointer-events-none z-50 select-none"
                    style={{
                        left: `${spark.x}px`,
                        top: `${spark.y}px`,
                        fontSize: `${spark.size}px`,
                        animation: 'sparkFade 0.75s ease-out forwards',
                        filter: isFlurryActive
                            ? 'drop-shadow(0 0 6px rgba(186, 230, 253, 0.95))'
                            : 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.9))',
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
                        <span className="text-xl">❄️</span>
                    </div>
                </div>
            ))}

            {/* ----------------- BOTTOM-RIGHT SEASONAL CONTROLS ----------------- */}
            <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
                {enabled && (
                    <>
                        <button
                            onClick={triggerTurkeyTrot}
                            className="px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-mono font-bold hover:bg-amber-900/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/30 backdrop-blur-md flex items-center gap-1.5"
                            title="Summon Turkey Trot!"
                        >
                            <span>🦃</span>
                            <span className="hidden md:inline">Turkey Trot!</span>
                        </button>
                        <button
                            onClick={triggerManualSnowFlurry}
                            className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all shadow-lg backdrop-blur-md flex items-center gap-1.5 ${
                                isFlurryActive
                                    ? 'bg-sky-950/90 border-sky-400 text-sky-200 shadow-sky-500/40 animate-pulse'
                                    : 'bg-slate-900/80 border-sky-500/40 text-sky-300 hover:bg-sky-950/70 hover:scale-105'
                            }`}
                            title="Summon an Occasional Snow Flurry!"
                        >
                            <span>❄️</span>
                            <span className="hidden md:inline">Snow Flurry</span>
                        </button>
                    </>
                )}

                <button
                    onClick={toggleTheme}
                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all duration-300 shadow-xl backdrop-blur-md ${
                        enabled
                            ? 'bg-slate-900/90 border-amber-500/60 text-amber-300 hover:border-amber-400 hover:bg-amber-950/50 shadow-amber-500/30'
                            : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={enabled ? 'Turn Fall / Winter Thanksgiving Theme Off' : 'Turn Fall / Winter Thanksgiving Theme On'}
                >
                    <span className="text-base group-hover:scale-125 transition-transform duration-200">
                        {enabled ? '🦃' : '❄️'}
                    </span>
                    <span className="font-bold">
                        {enabled ? 'Harvest & Snow: ON' : 'Seasonal: OFF'}
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
