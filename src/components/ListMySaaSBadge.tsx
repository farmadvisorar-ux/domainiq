'use client';

import { useState } from 'react';

interface Props {
    className?: string;
}

export default function ListMySaaSBadge({ className = '' }: Props) {
    const [imgSrc, setImgSrc] = useState('https://listmysaas.xyz/listmysaasbadgenormal.svg');

    return (
        <div className={`listmysaas-badge-embed inline-flex items-center ${className}`}>
            <a
                href="https://listmysaas.xyz"
                target="_blank"
                rel="noopener noreferrer"
                title="Featured on ListMySaaS"
                className="inline-flex items-center transition-all hover:scale-105 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            >
                <img
                    src={imgSrc}
                    alt="Featured on ListMySaaS"
                    width={125}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                        // Fail-safe local fallback if external CDN is blocked
                        setImgSrc('/badges/listmysaasbadgenormal.svg');
                    }}
                    className="h-9 w-auto rounded-md shadow-md shadow-black/20"
                />
            </a>
        </div>
    );
}
