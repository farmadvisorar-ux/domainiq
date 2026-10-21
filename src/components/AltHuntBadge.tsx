'use client';

import { useState } from 'react';

interface Props {
    className?: string;
}

export default function AltHuntBadge({ className = '' }: Props) {
    const [imgSrc, setImgSrc] = useState('https://althunt.io/badges/featured-light.svg');

    return (
        <a
            href="https://althunt.io/compare/domainvoodoo-vs-dynadot"
            target="_blank"
            rel="noopener noreferrer"
            title="DomainVoodoo vs Dynadot on AltHunt"
            className={`inline-flex items-center transition-all hover:scale-105 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${className}`}
        >
            <img
                src={imgSrc}
                alt="Featured on AltHunt"
                width={168}
                height={36}
                onError={() => {
                    // Fail-safe local fallback if external CDN is blocked
                    setImgSrc('/badges/althunt-featured-light.svg');
                }}
                className="h-9 w-auto rounded-md shadow-md shadow-black/20"
            />
        </a>
    );
}
