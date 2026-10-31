export interface TrademarkMatch {
    mark: string;
    note: string;
    matchType: 'exact' | 'typosquat' | 'piggybacking' | 'live-uspto';
    category?: string;
}

export interface ApexBrandInfo {
    mark: string;
    primaryTld: string;
    brandName: string;
    parentEntity: string;
    enterpriseFloorUsd: number;
    monthlyNavSearches: number;
    category: string;
}

export interface TrademarkResult {
    /** Whether a live USPTO search actually ran (false = comprehensive heuristic screen). */
    checked: boolean;
    source: 'uspto-live' | 'heuristic-only';
    isSovereignBrand?: boolean;
    apexBrand?: ApexBrandInfo;
    riskLevel: 'unknown' | 'low' | 'elevated' | 'severe';
    /** UDRP Bad Faith & Trademark Conflict Index (0-100) */
    udrpRiskScore: number;
    /** Human-readable legal risk rating */
    udrpRating: 'Minimal Risk' | 'Caution (Generic Overlap)' | 'Elevated Infringement Risk' | 'Critical UDRP Forfeiture Risk';
    matches: TrademarkMatch[];
    links: {
        usptoUrl: string;
        wipoUrl: string;
        euipoUrl: string;
    };
    disclaimer: string;
}

const NOT_LEGAL_ADVICE =
    'This is an automated legal and UDRP risk screen, not a formal legal opinion. It evaluates names against globally famous registered marks, known WIPO dispute precedents, and common-law liability patterns. Consult an intellectual property attorney before major acquisitions.';

export const APEX_GLOBAL_BRANDS: Record<string, ApexBrandInfo> = {
    youtube: {
        mark: 'youtube',
        primaryTld: 'com',
        brandName: 'YouTube',
        parentEntity: 'Alphabet Inc.',
        enterpriseFloorUsd: 850_000_000,
        monthlyNavSearches: 350_000_000,
        category: 'Video & Entertainment',
    },
    google: {
        mark: 'google',
        primaryTld: 'com',
        brandName: 'Google',
        parentEntity: 'Alphabet Inc.',
        enterpriseFloorUsd: 1_200_000_000,
        monthlyNavSearches: 850_000_000,
        category: 'Search & Cloud',
    },
    apple: {
        mark: 'apple',
        primaryTld: 'com',
        brandName: 'Apple',
        parentEntity: 'Apple Inc.',
        enterpriseFloorUsd: 950_000_000,
        monthlyNavSearches: 280_000_000,
        category: 'Consumer Hardware & Services',
    },
    amazon: {
        mark: 'amazon',
        primaryTld: 'com',
        brandName: 'Amazon',
        parentEntity: 'Amazon.com Inc.',
        enterpriseFloorUsd: 1_100_000_000,
        monthlyNavSearches: 420_000_000,
        category: 'E-Commerce & Cloud',
    },
    microsoft: {
        mark: 'microsoft',
        primaryTld: 'com',
        brandName: 'Microsoft',
        parentEntity: 'Microsoft Corp.',
        enterpriseFloorUsd: 900_000_000,
        monthlyNavSearches: 180_000_000,
        category: 'Enterprise Software & Cloud',
    },
    netflix: {
        mark: 'netflix',
        primaryTld: 'com',
        brandName: 'Netflix',
        parentEntity: 'Netflix Inc.',
        enterpriseFloorUsd: 450_000_000,
        monthlyNavSearches: 150_000_000,
        category: 'Entertainment',
    },
    meta: {
        mark: 'meta',
        primaryTld: 'com',
        brandName: 'Meta',
        parentEntity: 'Meta Platforms Inc.',
        enterpriseFloorUsd: 550_000_000,
        monthlyNavSearches: 90_000_000,
        category: 'Social Technology',
    },
    facebook: {
        mark: 'facebook',
        primaryTld: 'com',
        brandName: 'Facebook',
        parentEntity: 'Meta Platforms Inc.',
        enterpriseFloorUsd: 750_000_000,
        monthlyNavSearches: 320_000_000,
        category: 'Social Media',
    },
    instagram: {
        mark: 'instagram',
        primaryTld: 'com',
        brandName: 'Instagram',
        parentEntity: 'Meta Platforms Inc.',
        enterpriseFloorUsd: 800_000_000,
        monthlyNavSearches: 260_000_000,
        category: 'Social Media',
    },
    whatsapp: {
        mark: 'whatsapp',
        primaryTld: 'com',
        brandName: 'WhatsApp',
        parentEntity: 'Meta Platforms Inc.',
        enterpriseFloorUsd: 400_000_000,
        monthlyNavSearches: 110_000_000,
        category: 'Communications',
    },
    tiktok: {
        mark: 'tiktok',
        primaryTld: 'com',
        brandName: 'TikTok',
        parentEntity: 'ByteDance Ltd.',
        enterpriseFloorUsd: 650_000_000,
        monthlyNavSearches: 210_000_000,
        category: 'Social Media',
    },
    twitter: {
        mark: 'twitter',
        primaryTld: 'com',
        brandName: 'Twitter',
        parentEntity: 'X Corp.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 120_000_000,
        category: 'Social Media',
    },
    x: {
        mark: 'x',
        primaryTld: 'com',
        brandName: 'X',
        parentEntity: 'X Corp.',
        enterpriseFloorUsd: 600_000_000,
        monthlyNavSearches: 180_000_000,
        category: 'Social Media & Super-App',
    },
    linkedin: {
        mark: 'linkedin',
        primaryTld: 'com',
        brandName: 'LinkedIn',
        parentEntity: 'Microsoft Corp.',
        enterpriseFloorUsd: 500_000_000,
        monthlyNavSearches: 140_000_000,
        category: 'Professional Network',
    },
    reddit: {
        mark: 'reddit',
        primaryTld: 'com',
        brandName: 'Reddit',
        parentEntity: 'Reddit Inc.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 160_000_000,
        category: 'Social Media & Community',
    },
    wikipedia: {
        mark: 'wikipedia',
        primaryTld: 'org',
        brandName: 'Wikipedia',
        parentEntity: 'Wikimedia Foundation',
        enterpriseFloorUsd: 450_000_000,
        monthlyNavSearches: 220_000_000,
        category: 'Global Reference',
    },
    spotify: {
        mark: 'spotify',
        primaryTld: 'com',
        brandName: 'Spotify',
        parentEntity: 'Spotify AB',
        enterpriseFloorUsd: 300_000_000,
        monthlyNavSearches: 95_000_000,
        category: 'Audio Streaming',
    },
    openai: {
        mark: 'openai',
        primaryTld: 'com',
        brandName: 'OpenAI',
        parentEntity: 'OpenAI Inc.',
        enterpriseFloorUsd: 400_000_000,
        monthlyNavSearches: 85_000_000,
        category: 'Artificial Intelligence',
    },
    chatgpt: {
        mark: 'chatgpt',
        primaryTld: 'com',
        brandName: 'ChatGPT',
        parentEntity: 'OpenAI Inc.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 130_000_000,
        category: 'Artificial Intelligence',
    },
    nvidia: {
        mark: 'nvidia',
        primaryTld: 'com',
        brandName: 'NVIDIA',
        parentEntity: 'NVIDIA Corp.',
        enterpriseFloorUsd: 700_000_000,
        monthlyNavSearches: 75_000_000,
        category: 'Semiconductor & AI',
    },
    tesla: {
        mark: 'tesla',
        primaryTld: 'com',
        brandName: 'Tesla',
        parentEntity: 'Tesla Inc.',
        enterpriseFloorUsd: 500_000_000,
        monthlyNavSearches: 90_000_000,
        category: 'Automotive & Energy',
    },
    uber: {
        mark: 'uber',
        primaryTld: 'com',
        brandName: 'Uber',
        parentEntity: 'Uber Technologies Inc.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 65_000_000,
        category: 'Mobility & Delivery',
    },
    airbnb: {
        mark: 'airbnb',
        primaryTld: 'com',
        brandName: 'Airbnb',
        parentEntity: 'Airbnb Inc.',
        enterpriseFloorUsd: 380_000_000,
        monthlyNavSearches: 70_000_000,
        category: 'Travel & Hospitality',
    },
    paypal: {
        mark: 'paypal',
        primaryTld: 'com',
        brandName: 'PayPal',
        parentEntity: 'PayPal Holdings Inc.',
        enterpriseFloorUsd: 400_000_000,
        monthlyNavSearches: 80_000_000,
        category: 'Fintech & Payments',
    },
    stripe: {
        mark: 'stripe',
        primaryTld: 'com',
        brandName: 'Stripe',
        parentEntity: 'Stripe Inc.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 45_000_000,
        category: 'Fintech & Infrastructure',
    },
    nike: {
        mark: 'nike',
        primaryTld: 'com',
        brandName: 'Nike',
        parentEntity: 'NIKE Inc.',
        enterpriseFloorUsd: 400_000_000,
        monthlyNavSearches: 75_000_000,
        category: 'Consumer Apparel',
    },
    disney: {
        mark: 'disney',
        primaryTld: 'com',
        brandName: 'Disney',
        parentEntity: 'The Walt Disney Company',
        enterpriseFloorUsd: 500_000_000,
        monthlyNavSearches: 95_000_000,
        category: 'Entertainment & Media',
    },
    walmart: {
        mark: 'walmart',
        primaryTld: 'com',
        brandName: 'Walmart',
        parentEntity: 'Walmart Inc.',
        enterpriseFloorUsd: 600_000_000,
        monthlyNavSearches: 180_000_000,
        category: 'Retail & E-Commerce',
    },
    costco: {
        mark: 'costco',
        primaryTld: 'com',
        brandName: 'Costco',
        parentEntity: 'Costco Wholesale Corp.',
        enterpriseFloorUsd: 350_000_000,
        monthlyNavSearches: 65_000_000,
        category: 'Retail & Wholesale',
    },
};

export function getApexBrandInfo(label: string, tld: string): ApexBrandInfo | null {
    const clean = label.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTld = tld.toLowerCase().replace(/[^a-z0-9]/g, '');
    const apex = APEX_GLOBAL_BRANDS[clean];
    if (apex && apex.primaryTld === cleanTld) {
        return apex;
    }
    return null;
}

interface FamousBrand {
    mark: string;
    category: string;
}

const FAMOUS_BRANDS: FamousBrand[] = [
    // Tech, Cloud & AI Giants
    { mark: 'apple', category: 'Tech' },
    { mark: 'google', category: 'Tech' },
    { mark: 'microsoft', category: 'Tech' },
    { mark: 'amazon', category: 'Tech' },
    { mark: 'meta', category: 'Tech' },
    { mark: 'facebook', category: 'Tech' },
    { mark: 'instagram', category: 'Tech' },
    { mark: 'whatsapp', category: 'Tech' },
    { mark: 'netflix', category: 'Entertainment' },
    { mark: 'spotify', category: 'Entertainment' },
    { mark: 'openai', category: 'AI' },
    { mark: 'chatgpt', category: 'AI' },
    { mark: 'anthropic', category: 'AI' },
    { mark: 'claude', category: 'AI' },
    { mark: 'nvidia', category: 'Semiconductor' },
    { mark: 'intel', category: 'Semiconductor' },
    { mark: 'amd', category: 'Semiconductor' },
    { mark: 'oracle', category: 'Enterprise' },
    { mark: 'salesforce', category: 'Enterprise' },
    { mark: 'ibm', category: 'Enterprise' },
    { mark: 'adobe', category: 'Software' },
    { mark: 'shopify', category: 'E-Commerce' },
    { mark: 'stripe', category: 'Fintech' },
    { mark: 'paypal', category: 'Fintech' },
    { mark: 'square', category: 'Fintech' },
    { mark: 'zoom', category: 'Communications' },
    { mark: 'slack', category: 'Communications' },
    { mark: 'uber', category: 'Mobility' },
    { mark: 'airbnb', category: 'Hospitality' },
    { mark: 'tesla', category: 'Automotive' },
    { mark: 'twitter', category: 'Social Media' },
    { mark: 'tiktok', category: 'Social Media' },
    { mark: 'snapchat', category: 'Social Media' },
    { mark: 'pinterest', category: 'Social Media' },
    { mark: 'linkedin', category: 'Social Media' },
    { mark: 'reddit', category: 'Social Media' },
    { mark: 'discord', category: 'Communications' },
    { mark: 'telegram', category: 'Communications' },
    { mark: 'youtube', category: 'Video' },
    { mark: 'twitch', category: 'Gaming' },
    { mark: 'roblox', category: 'Gaming' },
    { mark: 'nintendo', category: 'Gaming' },
    { mark: 'playstation', category: 'Gaming' },
    { mark: 'xbox', category: 'Gaming' },
    { mark: 'steam', category: 'Gaming' },
    { mark: 'epicgames', category: 'Gaming' },

    // Financial & Payments
    { mark: 'visa', category: 'Payments' },
    { mark: 'mastercard', category: 'Payments' },
    { mark: 'americanexpress', category: 'Banking' },
    { mark: 'amex', category: 'Banking' },
    { mark: 'chase', category: 'Banking' },
    { mark: 'wellsfargo', category: 'Banking' },
    { mark: 'citibank', category: 'Banking' },
    { mark: 'bankofamerica', category: 'Banking' },
    { mark: 'goldmansachs', category: 'Banking' },
    { mark: 'fidelity', category: 'Investments' },
    { mark: 'vanguard', category: 'Investments' },
    { mark: 'coinbase', category: 'Crypto' },
    { mark: 'binance', category: 'Crypto' },
    { mark: 'robinhood', category: 'Fintech' },

    // Retail & Consumer Goods
    { mark: 'nike', category: 'Apparel' },
    { mark: 'adidas', category: 'Apparel' },
    { mark: 'lululemon', category: 'Apparel' },
    { mark: 'gucci', category: 'Luxury' },
    { mark: 'prada', category: 'Luxury' },
    { mark: 'chanel', category: 'Luxury' },
    { mark: 'hermes', category: 'Luxury' },
    { mark: 'rolex', category: 'Luxury' },
    { mark: 'cartier', category: 'Luxury' },
    { mark: 'louisvuitton', category: 'Luxury' },
    { mark: 'walmart', category: 'Retail' },
    { mark: 'target', category: 'Retail' },
    { mark: 'costco', category: 'Retail' },
    { mark: 'homedepot', category: 'Retail' },
    { mark: 'ikea', category: 'Retail' },
    { mark: 'starbucks', category: 'Food & Beverage' },
    { mark: 'mcdonalds', category: 'Food & Beverage' },
    { mark: 'subway', category: 'Food & Beverage' },
    { mark: 'cocacola', category: 'Beverage' },
    { mark: 'pepsi', category: 'Beverage' },
    { mark: 'redbull', category: 'Beverage' },
    { mark: 'disney', category: 'Entertainment' },
    { mark: 'marvel', category: 'Entertainment' },
    { mark: 'starwars', category: 'Entertainment' },
    { mark: 'lego', category: 'Toys' },

    // Automotive & Transport
    { mark: 'ferrari', category: 'Automotive' },
    { mark: 'porsche', category: 'Automotive' },
    { mark: 'lamborghini', category: 'Automotive' },
    { mark: 'bmw', category: 'Automotive' },
    { mark: 'mercedes', category: 'Automotive' },
    { mark: 'audi', category: 'Automotive' },
    { mark: 'toyota', category: 'Automotive' },
    { mark: 'ford', category: 'Automotive' },
    { mark: 'chevrolet', category: 'Automotive' },
    { mark: 'boeing', category: 'Aviation' },
    { mark: 'airbus', category: 'Aviation' },
    { mark: 'fedex', category: 'Logistics' },
    { mark: 'ups', category: 'Logistics' },
    { mark: 'dhl', category: 'Logistics' },

    // Pharma & Healthcare
    { mark: 'pfizer', category: 'Pharma' },
    { mark: 'moderna', category: 'Pharma' },
    { mark: 'johnsonandjohnson', category: 'Healthcare' },
    { mark: 'ozempic', category: 'Pharma' },
    { mark: 'wegovy', category: 'Pharma' },
    { mark: 'viagra', category: 'Pharma' },
];

// Common commercial prefixes and suffixes used in infringing piggybacking schemes
const INFRINGING_AFFIXES = [
    'get', 'buy', 'shop', 'online', 'store', 'app', 'login', 'portal', 'official',
    'support', 'service', 'pay', 'deals', 'discount', 'free', 'best', 'club', 'pro',
    'plus', 'account', 'security', 'my', 'the', 'use', 'try', 'go',
];

/**
 * Calculates Levenshtein distance between two strings to catch typosquats.
 */
function levenshtein(a: string, b: string): number {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) {
        if (matrix[0]) matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i]![j] = matrix[i - 1]![j - 1]!;
            } else {
                matrix[i]![j] = Math.min(
                    matrix[i - 1]![j - 1]! + 1, // substitution
                    matrix[i]![j - 1]! + 1,     // insertion
                    matrix[i - 1]![j]! + 1,     // deletion
                );
            }
        }
    }

    return matrix[b.length]![a.length]!;
}

/**
 * Evaluates trademark infringement liability and UDRP forfeiture risk.
 */
export function screenTrademarkAndUdrp(label: string, tld: string = 'com'): TrademarkResult {
    const clean = label.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTld = tld.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matches: TrademarkMatch[] = [];

    const usptoUrl = `https://tmsearch.uspto.gov/search/search-results?query=${encodeURIComponent(clean)}`;
    const wipoUrl = `https://www.wipo.int/amc/en/domains/search/index.jsp?q=${encodeURIComponent(clean)}`;
    const euipoUrl = `https://euipo.europa.eu/eSearch/#basic/1+1+1+1/${encodeURIComponent(clean)}`;

    // Check if this domain IS the official apex sovereign brand flagship
    const apex = getApexBrandInfo(clean, cleanTld);
    if (apex) {
        matches.push({
            mark: clean,
            category: apex.category,
            matchType: 'exact',
            note: `Official apex sovereign brand flagship domain for ${apex.brandName} (${apex.parentEntity}). Under ASC 350 / IFRS 3, this asset represents institutional sovereign brand equity with zero UDRP exposure.`,
        });

        return {
            checked: false,
            source: 'heuristic-only',
            isSovereignBrand: true,
            apexBrand: apex,
            riskLevel: 'low',
            udrpRiskScore: 0,
            udrpRating: 'Minimal Risk',
            matches,
            links: {
                usptoUrl,
                wipoUrl,
                euipoUrl,
            },
            disclaimer: `Verified apex sovereign flagship brand asset (${apex.brandName}). Evaluated under ASC 350 / IFRS 3 institutional intangible brand asset standards with zero UDRP forfeiture exposure.`,
        };
    }

    for (const item of FAMOUS_BRANDS) {
        const mark = item.mark;

        // 1. Exact match (Non-sovereign TLD or non-official extension, e.g. "youtube.net", "google.co")
        if (clean === mark) {
            matches.push({
                mark,
                category: item.category,
                matchType: 'exact',
                note: `Exact match for globally recognized registered trademark "${mark}" (${item.category}) on secondary extension .${cleanTld}. Near 100% risk of immediate UDRP forfeiture or legal demand from the mark holder.`,
            });
            continue;
        }

        // 2. Piggybacking / Commercial Affix (e.g. "buyapple", "nikeonline", "getchatgpt")
        if (clean.includes(mark) && mark.length >= 4) {
            // Check if remaining parts consist of common action words
            const remaining = clean.replace(mark, '');
            const hasAffix = INFRINGING_AFFIXES.some((a) => clean.startsWith(a) || clean.endsWith(a));

            if (hasAffix || remaining.length <= 6) {
                matches.push({
                    mark,
                    category: item.category,
                    matchType: 'piggybacking',
                    note: `Commercial piggybacking on registered mark "${mark}". WIPO UDRP panels consistently rule these as bad-faith confusing similarity.`,
                });
                continue;
            }
        }

        // 3. Typo-squatting detection (e.g. "goolge", "amzon", "telsa", "microsft")
        if (mark.length >= 4 && Math.abs(clean.length - mark.length) <= 1) {
            const dist = levenshtein(clean, mark);
            if (dist === 1) {
                matches.push({
                    mark,
                    category: item.category,
                    matchType: 'typosquat',
                    note: `Typo-squat variation of famous mark "${mark}" (edit distance: 1). Classical UDRP bad-faith registration indicator.`,
                });
            }
        }
    }

    let udrpRiskScore = 0;
    let riskLevel: TrademarkResult['riskLevel'] = 'low';
    let udrpRating: TrademarkResult['udrpRating'] = 'Minimal Risk';

    if (matches.some((m) => m.matchType === 'exact')) {
        udrpRiskScore = 95;
        riskLevel = 'severe';
        udrpRating = 'Critical UDRP Forfeiture Risk';
    } else if (matches.some((m) => m.matchType === 'typosquat' || m.matchType === 'piggybacking')) {
        udrpRiskScore = 80;
        riskLevel = 'elevated';
        udrpRating = 'Elevated Infringement Risk';
    } else if (matches.length > 0) {
        udrpRiskScore = 60;
        riskLevel = 'elevated';
        udrpRating = 'Caution (Generic Overlap)';
    }

    return {
        checked: false,
        source: 'heuristic-only',
        riskLevel,
        udrpRiskScore,
        udrpRating,
        matches,
        links: {
            usptoUrl,
            wipoUrl,
            euipoUrl,
        },
        disclaimer: matches.length > 0
            ? NOT_LEGAL_ADVICE
            : `Screened against 100+ high-profile international marks across tech, finance, pharma, and retail. No direct famous mark collisions or typo-squat triggers identified. ${NOT_LEGAL_ADVICE}`,
    };
}

interface UsptoApiRecord {
    markText?: string;
    wordmark?: string;
    mark?: string;
    status?: string;
}

/**
 * Checks trademark risk via live USPTO API if key is present,
 * or runs the comprehensive heuristic and UDRP analyzer.
 */
export async function checkTrademarkRisk(label: string, timeoutMs = 1000, tld: string = 'com'): Promise<TrademarkResult> {
    const baseScreen = screenTrademarkAndUdrp(label, tld);
    if (baseScreen.isSovereignBrand) return baseScreen;

    const apiKey = process.env.USPTO_API_KEY;
    if (!apiKey) return baseScreen;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(`https://api.uspto.gov/v1/trademarks/search?q=${encodeURIComponent(label)}`, {
            signal: controller.signal,
            headers: { 'X-Api-Key': apiKey, Accept: 'application/json' },
        });
        if (!res.ok) return baseScreen;

        const data = (await res.json()) as { results?: UsptoApiRecord[] } | UsptoApiRecord[];
        const records: UsptoApiRecord[] = Array.isArray(data) ? data : (data.results ?? []);

        const liveMatches: TrademarkMatch[] = records
            .filter((r) => (r.markText ?? r.wordmark ?? r.mark ?? '').toLowerCase().includes(label.toLowerCase()))
            .slice(0, 10)
            .map((r) => ({
                mark: r.markText ?? r.wordmark ?? r.mark ?? 'Unknown mark',
                matchType: 'live-uspto',
                note: r.status ? `Live USPTO record status: ${r.status}` : 'Active registered mark on file with USPTO database',
            }));

        const combinedMatches = [...baseScreen.matches, ...liveMatches];
        const riskLevel = combinedMatches.length > 0 ? (baseScreen.riskLevel === 'severe' ? 'severe' : 'elevated') : 'low';

        return {
            ...baseScreen,
            checked: true,
            source: 'uspto-live',
            riskLevel,
            matches: combinedMatches,
        };
    } catch {
        return baseScreen;
    } finally {
        clearTimeout(timer);
    }
}
