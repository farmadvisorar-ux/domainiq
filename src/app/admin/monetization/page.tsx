'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DEFAULT_MONETIZATION, type MonetizationSettings } from '@/lib/monetization-schema';

export default function MonetizationPage() {
    const [settings, setSettings] = useState<MonetizationSettings>(DEFAULT_MONETIZATION);
    const [ready, setReady] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        async function load() {
            try {
                const auth = await fetch('/api/admin/auth').then((r) => r.json());
                if (!auth.authenticated) { window.location.assign('/admin/login'); return; }
                const response = await fetch('/api/monetization');
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
                setSettings(data); setReady(true);
            } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to load settings'); }
        }
        void load();
    }, []);
    async function save(e: React.FormEvent) {
        e.preventDefault(); setSaving(true); setMessage('');
        try {
            const response = await fetch('/api/monetization', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setMessage('Saved. Your links and advertising boxes are updated.');
        } catch (error) { setMessage(error instanceof Error ? error.message : 'Save failed'); }
        finally { setSaving(false); }
    }
    const inputClass = 'input w-full mt-1';
    return <div className="max-w-3xl mx-auto py-8 space-y-6">
        <Link href="/admin" className="text-brand-300">← Admin</Link>
        <h1 className="text-3xl font-bold">Affiliate links & advertising</h1>
        <p className="text-slate-400">Add your exact affiliate tracking URLs. For ads, paste hosted checkout links from your payment provider. Verify payment in your provider dashboard before activating a sponsor; checkout does not automatically reserve or publish an ad.</p>
        <p role="status" aria-live="polite">{message}</p>
        {!ready ? <p>Settings are not ready to edit.</p> : <form onSubmit={save} className="space-y-8">
            <section className="card p-6 space-y-4">
                <h2 className="text-xl font-bold">Affiliate links</h2>
                {settings.affiliates.map((affiliate, index) => <fieldset key={index} className="border border-slate-700 rounded-xl p-4 space-y-3">
                    <legend>Partner {index + 1}</legend>
                    {(['name', 'description', 'url'] as const).map((key) => <label key={key} className="block capitalize">{key === 'url' ? 'Affiliate HTTPS URL' : key}
                        <input className={inputClass} type={key === 'url' ? 'url' : 'text'} required={key !== 'description'} maxLength={key === 'url' ? 2048 : key === 'name' ? 80 : 300} value={affiliate[key]} onChange={(e) => setSettings({ ...settings, affiliates: settings.affiliates.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item) })} />
                    </label>)}
                    <button type="button" className="text-red-300" onClick={() => setSettings({ ...settings, affiliates: settings.affiliates.filter((_, i) => i !== index) })}>Remove partner</button>
                </fieldset>)}
                <button type="button" className="btn-secondary" disabled={settings.affiliates.length >= 12} onClick={() => setSettings({ ...settings, affiliates: [...settings.affiliates, { name: '', description: '', url: '' }] })}>Add affiliate link</button>
            </section>
            {settings.ads.map((ad, index) => <section key={ad.id} className="card p-6 space-y-4">
                <h2 className="text-xl font-bold">Advertising box {ad.id}</h2>
                {(['name', 'price', 'checkoutUrl', 'sponsorName', 'description', 'destinationUrl'] as const).map((key) => <label key={key} className="block">
                    {{ name: 'Placement name', price: 'Price and duration (e.g. $99 / 30 days)', checkoutUrl: 'Hosted payment checkout HTTPS URL', sponsorName: 'Approved sponsor name', description: 'Sponsor description', destinationUrl: 'Sponsor destination HTTPS URL' }[key]}
                    <input className={inputClass} type={key.endsWith('Url') ? 'url' : 'text'} required={key === 'name'} maxLength={key.endsWith('Url') ? 2048 : key === 'description' ? 300 : 80} value={ad[key]} onChange={(e) => setSettings({ ...settings, ads: settings.ads.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item) })} />
                </label>)}
                <label className="flex gap-3"><input type="checkbox" checked={ad.active} onChange={(e) => setSettings({ ...settings, ads: settings.ads.map((item, i) => i === index ? { ...item, active: e.target.checked } : item) })} />Publish approved sponsor (hide checkout for this box)</label>
            </section>)}
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</button>
        </form>}
    </div>;
}
