import { z } from 'zod';

export const webUrl = z.string().max(2048).refine((value) => {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && !url.username && !url.password;
    } catch { return false; }
}, 'Enter a valid HTTPS URL without credentials');
const optionalUrl = z.union([z.literal(''), webUrl]);
export const monetizationSchema = z.object({
    affiliates: z.array(z.object({
        name: z.string().trim().min(1).max(80),
        description: z.string().trim().max(300),
        url: webUrl,
    }).strict()).max(12),
    ads: z.array(z.object({
        id: z.number().int().min(1).max(2),
        name: z.string().trim().min(1).max(80),
        price: z.string().trim().max(80),
        checkoutUrl: optionalUrl,
        sponsorName: z.string().trim().max(80),
        description: z.string().trim().max(300),
        destinationUrl: optionalUrl,
        active: z.boolean(),
    }).strict().refine((ad) => !ad.active || Boolean(ad.sponsorName && ad.destinationUrl),
        'Active ads need a sponsor name and destination URL')).length(2),
}).strict().refine((data) => new Set(data.ads.map((ad) => ad.id)).size === 2, 'Ad IDs must be unique');
export type MonetizationSettings = z.infer<typeof monetizationSchema>;
export const DEFAULT_MONETIZATION: MonetizationSettings = {
    affiliates: [],
    ads: [1, 2].map((id) => ({
        id, name: `Advertising box ${id}`, price: 'Contact us for pricing',
        checkoutUrl: '', sponsorName: '', description: '', destinationUrl: '', active: false,
    })),
};
