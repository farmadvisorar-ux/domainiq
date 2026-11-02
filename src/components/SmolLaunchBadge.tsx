'use client';

import { useState } from 'react';

interface Props {
    className?: string;
}

export default function SmolLaunchBadge({ className = '' }: Props) {
    const [imgSrc, setImgSrc] = useState('https://smollaunch.com/badges/featured.svg');

    return (
        <a
            href="https://smollaunch.com"
            target="_blank"
            rel="noopener noreferrer"
            title="DomainVoodoo — Featured on Smol Launch"
            className={`inline-flex items-center transition-all hover:scale-105 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${className}`}
        >
            <img
                src={imgSrc}
                alt="DomainVoodoo — Featured on Smol Launch"
                width={250}
                height={60}
                loading="lazy"
                decoding="async"
                onError={() => {
                    // Fail-safe local fallback if external CDN is blocked
                    setImgSrc('/badges/smollaunch-featured.svg');
                }}
                className="h-9 w-auto rounded-md shadow-md shadow-black/20"
            />
        </a>
    );
}
