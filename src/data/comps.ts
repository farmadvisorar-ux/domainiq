import { DOMAIN_SALE_RECORDS } from './records';
import { COMPS as SEED_COMPS } from '../../scripts/seed-data';

export interface DomainCompItem {
    domain: string;
    priceUsd: number;
    year: number;
    tld: string;
    category: string;
    wordCount: number; // 0 = short / brandable / numeric, 1 = single dictionary word, 2 = two words, 3 = 3+ words
    sourceNote: string;
    verified: boolean;
    buyer?: string;
}

export interface CompsAggregateStats {
    count: number;
    totalUsd: number;
    medianUsd: number;
    meanUsd: number;
    maxUsd: number;
    minUsd: number;
}

export interface CompsQueryOptions {
    keyword?: string;
    tld?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    wordStructure?: string; // 'all' | 'short' | 'single' | 'compound' | 'longtail'
    sortBy?: 'price-desc' | 'price-asc' | 'year-desc' | 'year-asc' | 'alpha-asc';
    limit?: number;
    offset?: number;
}

// Additional high-profile verified market transactions
const EXTRA_MARKET_SALES: DomainCompItem[] = [
    { domain: 'pay.com', priceUsd: 28_000_000, year: 2022, tld: 'com', category: 'Finance & Crypto', wordCount: 1, sourceNote: 'Reported 3L fintech sale', verified: true },
    { domain: 'rocket.com', priceUsd: 14_000_000, year: 2024, tld: 'com', category: 'Finance & Crypto', wordCount: 1, sourceNote: 'Rocket Companies corporate acquisition', verified: true, buyer: 'Rocket Companies' },
    { domain: 'gold.com', priceUsd: 8_515_000, year: 2024, tld: 'com', category: 'Finance & Crypto', wordCount: 1, sourceNote: 'SEC Filing by A-Mark Precious Metals', verified: true, buyer: 'A-Mark' },
    { domain: 'help.com', priceUsd: 3_000_000, year: 2020, tld: 'com', category: 'Tech & AI', wordCount: 1, sourceNote: 'Reported enterprise SaaS buyout', verified: true },
    { domain: 'friend.com', priceUsd: 1_800_000, year: 2024, tld: 'com', category: 'Tech & AI', wordCount: 1, sourceNote: 'Hardware AI startup acquisition (Avi Schiffmann)', verified: true, buyer: 'Friend AI' },
    { domain: 'meme.com', priceUsd: 1_250_000, year: 2021, tld: 'com', category: 'Gaming & Web3', wordCount: 1, sourceNote: 'Reported Web3 ecosystem sale', verified: true },
    { domain: 'prompt.com', priceUsd: 1_200_000, year: 2024, tld: 'com', category: 'Tech & AI', wordCount: 1, sourceNote: 'Reported GenAI platform acquisition', verified: true },
    { domain: 'you.ai', priceUsd: 700_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'DNJournal top public .AI sale', verified: true },
    { domain: 'agent.ai', priceUsd: 400_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'HubSpot founder Dharmesh Shah acquisition', verified: true, buyer: 'Dharmesh Shah' },
    { domain: 'cloud.ai', priceUsd: 350_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'Reported AI cloud infrastructure sale', verified: true },
    { domain: 'stack.ai', priceUsd: 258_888, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'DNJournal verified auction comp', verified: true },
    { domain: 'prompt.ai', priceUsd: 150_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'Reported prompt engineering comp', verified: true },
    { domain: 'service.ai', priceUsd: 250_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'Autonomous agent enterprise sale', verified: true },
    { domain: 'robot.ai', priceUsd: 225_000, year: 2024, tld: 'ai', category: 'Tech & AI', wordCount: 1, sourceNote: 'Embodied AI robotics domain sale', verified: true },
];

function normalizeCategory(rawCat: string): string {
    const l = rawCat.toLowerCase();
    if (l.includes('finance') || l.includes('crypto') || l.includes('insurance')) return 'Finance & Crypto';
    if (l.includes('ai') || l.includes('tech') || l.includes('saas')) return 'Tech & AI';
    if (l.includes('retail') || l.includes('commerce') || l.includes('shop') || l.includes('goods')) return 'E-commerce & Retail';
    if (l.includes('travel') || l.includes('luxury') || l.includes('hotel')) return 'Travel & Luxury';
    if (l.includes('gaming') || l.includes('entertainment') || l.includes('adult')) return 'Gaming & Web3';
    if (l.includes('local') || l.includes('auto') || l.includes('real-estate') || l.includes('legal') || l.includes('health') || l.includes('food')) return 'Business & Services';
    return 'Brandable & Other';
}

function computeWordCount(domain: string, existingWordCount?: number): number {
    if (typeof existingWordCount === 'number') return existingWordCount;
    const sld = domain.split('.')[0] || '';
    if (sld.length <= 4) return 0;
    if (/^[a-z]+$/.test(sld) && sld.length <= 8) return 1;
    return 2;
}

// Build unified, deduplicated list of domain comps
function buildUnifiedComps(): DomainCompItem[] {
    const map = new Map<string, DomainCompItem>();

    // 1. Ingest historical Hall of Fame records
    for (const r of DOMAIN_SALE_RECORDS) {
        const dom = r.domain.toLowerCase().trim();
        map.set(dom, {
            domain: dom,
            priceUsd: r.priceUsd,
            year: r.year,
            tld: r.tld.toLowerCase(),
            category: normalizeCategory(r.category),
            wordCount: computeWordCount(dom),
            sourceNote: r.venue || 'SEC / DNJournal Verified Record',
            verified: r.verified ?? true,
            buyer: r.buyer,
        });
    }

    // 2. Ingest extra verified market sales
    for (const r of EXTRA_MARKET_SALES) {
        const dom = r.domain.toLowerCase().trim();
        const existing = map.get(dom);
        if (!existing || r.priceUsd > existing.priceUsd) {
            map.set(dom, r);
        }
    }

    // 3. Ingest curated seed comps from across TLDs and aftermarket bands
    for (const s of SEED_COMPS) {
        const dom = s.domain.toLowerCase().trim();
        const existing = map.get(dom);
        if (!existing) {
            const parts = dom.split('.');
            const tld = parts.length > 1 ? parts.slice(1).join('.') : 'com';
            map.set(dom, {
                domain: dom,
                priceUsd: s.salePriceUsd,
                year: s.saleYear,
                tld,
                category: normalizeCategory(s.category),
                wordCount: s.wordCount,
                sourceNote: s.sourceNote,
                verified: !s.sourceNote.toLowerCase().includes('illustrative'),
            });
        }
    }

    return Array.from(map.values());
}

export const ALL_COMPS: DomainCompItem[] = buildUnifiedComps();

export function getAllComps(): DomainCompItem[] {
    return ALL_COMPS;
}

export function queryComps(options: CompsQueryOptions = {}): {
    items: DomainCompItem[];
    total: number;
    stats: CompsAggregateStats;
} {
    const {
        keyword = '',
        tld = 'all',
        category = 'all',
        minPrice,
        maxPrice,
        wordStructure = 'all',
        sortBy = 'price-desc',
        limit = 50,
        offset = 0,
    } = options;

    const cleanKeyword = keyword.trim().toLowerCase();
    const cleanTld = tld.trim().toLowerCase().replace(/^\./, '');

    const filtered = ALL_COMPS.filter((item) => {
        if (cleanKeyword) {
            const dom = item.domain.toLowerCase();
            const sld = dom.split('.')[0] || '';
            const matchDomain = dom.includes(cleanKeyword) || sld.includes(cleanKeyword);
            const matchBuyer = item.buyer ? item.buyer.toLowerCase().includes(cleanKeyword) : false;
            const matchSource = item.sourceNote.toLowerCase().includes(cleanKeyword);
            if (!matchDomain && !matchBuyer && !matchSource) return false;
        }

        if (cleanTld && cleanTld !== 'all') {
            if (item.tld.toLowerCase() !== cleanTld) return false;
        }

        if (category && category !== 'all') {
            if (item.category.toLowerCase() !== category.toLowerCase()) return false;
        }

        if (typeof minPrice === 'number' && minPrice > 0) {
            if (item.priceUsd < minPrice) return false;
        }

        if (typeof maxPrice === 'number' && maxPrice > 0) {
            if (item.priceUsd > maxPrice) return false;
        }

        if (wordStructure && wordStructure !== 'all') {
            if (wordStructure === 'short' && item.wordCount !== 0) return false;
            if (wordStructure === 'single' && item.wordCount !== 1) return false;
            if (wordStructure === 'compound' && item.wordCount !== 2) return false;
            if (wordStructure === 'longtail' && item.wordCount < 3) return false;
        }

        return true;
    });

    // Compute aggregate statistics over ALL matched items (not just the paged subset)
    const count = filtered.length;
    let totalUsd = 0;
    let maxUsd = 0;
    let minUsd = count > 0 ? Infinity : 0;
    const prices: number[] = [];

    for (const item of filtered) {
        totalUsd += item.priceUsd;
        prices.push(item.priceUsd);
        if (item.priceUsd > maxUsd) maxUsd = item.priceUsd;
        if (item.priceUsd < minUsd) minUsd = item.priceUsd;
    }

    if (minUsd === Infinity) minUsd = 0;
    const meanUsd = count > 0 ? Math.round(totalUsd / count) : 0;

    prices.sort((a, b) => a - b);
    let medianUsd = 0;
    if (count > 0) {
        const mid = Math.floor(count / 2);
        medianUsd = count % 2 !== 0 ? prices[mid]! : Math.round((prices[mid - 1]! + prices[mid]!) / 2);
    }

    // Sort items
    filtered.sort((a, b) => {
        if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
        if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'year-asc') return a.year - b.year;
        if (sortBy === 'alpha-asc') return a.domain.localeCompare(b.domain);
        return b.priceUsd - a.priceUsd;
    });

    const paged = filtered.slice(offset, offset + limit);

    return {
        items: paged,
        total: count,
        stats: {
            count,
            totalUsd,
            medianUsd,
            meanUsd,
            maxUsd,
            minUsd,
        },
    };
}
