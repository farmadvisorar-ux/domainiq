'use client';

import { useEffect, useState } from 'react';
import type { MonetizationSettings } from '@/lib/monetization-schema';

export default function MonetizationPanel({ booking = false }: { booking?: boolean }) {
    const [settings, setSettings] = useState<MonetizationSettings | null>(null);
    useEffect(() => {
        fetch('/api/monetization').then((res) => res.ok ? res.json() : null).then(setSettings).catch(() => {});
    }, []);
    if (!settings) return null;
    return <section className="space-y-6" aria-label="Partners and advertising">
        {!booking && settings.affiliates.length > 0 && <div className="space-y-3">
            <h2 className="text-xl font-bold">Partner resources</h2>
            <p className="text-xs text-slate-400">Affiliate links — we may earn a commission at no extra cost to you.</p>
            <div className="grid gap-4 sm:grid-cols-2">{settings.affiliates.map((partner, index) => <a key={index} href={partner.url} target="_blank" rel="sponsored noopener noreferrer" className="card p-5 hover:border-brand-500">
                <h3 className="font-bold text-brand-300">{partner.name} →</h3><p className="text-sm text-slate-400 mt-2">{partner.description}</p>
            </a>)}</div>
        </div>}
        <h2 className="text-xl font-bold">{booking ? 'Book an advertising box' : 'Sponsored placements'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">{settings.ads.map((ad) => <div key={ad.id} className="card p-6 border-dashed space-y-3">
            <p className="text-xs uppercase text-slate-400">{ad.active ? 'Advertisement · Sponsored' : 'Advertising space available'}</p>
            <h3 className="text-lg font-bold">{ad.active ? ad.sponsorName : ad.name}</h3>
            <p className="text-sm text-slate-400">{ad.active ? ad.description : 'Reach people exploring domain names on DomainIQ.'}</p>
            {ad.active ? <a href={ad.destinationUrl} target="_blank" rel="sponsored noopener noreferrer" className="btn-primary inline-block">Visit sponsor →</a> : <>
                <p className="font-semibold">{ad.price}</p>
                {ad.checkoutUrl ? <a href={ad.checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">Pay for this placement →</a> : <p className="text-sm text-slate-400">Online payment not available yet.</p>}
                <p className="text-xs text-slate-500">{ad.checkoutUrl ? 'Opens secure external checkout. Payment is subject to availability and owner approval; ads are not published automatically.' : 'Use the advertising inquiry form to request this placement.'}</p>
            </>}
        </div>)}</div>
    </section>;
}
