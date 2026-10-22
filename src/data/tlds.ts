export interface TldGuideData {
    extension: string;
    label: string;
    fullName: string;
    registry: string;
    annualCarryingCost: string;
    liquidityMultiplier: string;
    trustScore: number;
    primaryTarget: string;
    metaTitle: string;
    metaDescription: string;
    overview: string;
    pricingHeuristics: string[];
    topComps: { domain: string; price: string; year: number; significance: string }[];
    faqs: { question: string; answer: string }[];
}

export const TLDS_DATA: Record<string, TldGuideData> = {
    ai: {
        extension: 'ai',
        label: '.ai',
        fullName: 'Anguilla / Artificial Intelligence ccTLD',
        registry: 'Government of Anguilla / Telecommunications Commission',
        annualCarryingCost: '$70 - $90/year (Mandatory 2-Year Registration Blocks)',
        liquidityMultiplier: '0.22x - 0.35x relative to .com baseline',
        trustScore: 89.1,
        primaryTarget: 'Generative AI Startups, Machine Learning Labs, Autonomous Agent Protocols',
        metaTitle: '.AI Domain Valuation & Pricing Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .ai domain names: Anguilla registry carrying costs, VC tech demand, 6-figure comps (You.ai $700k, Agent.ai $400k), and fair market pricing.',
        overview:
            'The .ai extension has established itself as the undisputed digital brand identifier for the artificial intelligence industry. Originally created in 1995 as the country code top-level domain for Anguilla, it is now treated by Silicon Valley investors, Y Combinator founders, and multinational enterprises as a premier generic technical standard.',
        pricingHeuristics: [
            'Single-word foundational AI terms (e.g., Agent, Neural, Prompt) command $250,000 to $1,000,000+.',
            'Universal English verbs and personal pronouns (e.g., You.ai, Create.ai) trade between $100,000 and $350,000.',
            'Vertical B2B industry applications (e.g., Legal.ai, Health.ai, Code.ai) clear in the $50,000 to $200,000 range.',
            'Mandatory 2-year registration cycles filter out low-quality domain squatters, ensuring high portfolio quality.',
        ],
        topComps: [
            { domain: 'You.ai', price: '$700,000', year: 2024, significance: 'Pinnacle personal AI pronoun transaction.' },
            { domain: 'Agent.ai', price: '$400,000', year: 2023, significance: 'Acquired by HubSpot founder Dharmesh Shah.' },
            { domain: 'Stack.ai', price: '$258,888', year: 2023, significance: 'YC enterprise infrastructure brand.' },
            { domain: 'Service.ai', price: '$125,000', year: 2024, significance: 'Enterprise automation category leader.' },
        ],
        faqs: [
            {
                question: 'How much is a .ai domain worth compared to .com?',
                answer:
                    'A premium single-word dictionary .ai domain is worth approximately 20% to 35% of its equivalent .com value. For two-word commercial compounds, .ai trades between $3,000 and $25,000 depending on startup search demand.',
            },
            {
                question: 'Can the Anguilla government revoke my .ai domain?',
                answer:
                    'No. Anguilla operates under stable British Common Law principles and adheres to standard ICANN-compatible registry conventions. Legitimate commercial registrations have zero risk of arbitrary repossession.',
            },
            {
                question: 'Why are .ai domains registered for two years at a time?',
                answer:
                    'The Anguilla Telecommunications Commission mandates 2-year increments ($140+ wholesale) to reduce administrative overhead and maintain higher economic quality across the namespace.',
            },
        ],
    },
    com: {
        extension: 'com',
        label: '.com',
        fullName: 'Commercial Top-Level Domain (Global Sovereign Standard)',
        registry: 'Verisign Inc. (under ICANN & US Department of Commerce agreement)',
        annualCarryingCost: '$10 - $14/year wholesale',
        liquidityMultiplier: '1.00x (Global Baseline Standard)',
        trustScore: 98.4,
        primaryTarget: 'Global Enterprises, Public Corporations, Consumer Brands, Institutional Investors',
        metaTitle: '.COM Domain Valuation & Price Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .com domain names: character length scarcity, 14.8M+ verified comps, capitalized search PPC savings, and institutional liquidity floors.',
        overview:
            'The .com extension is the universal sovereign currency of the internet. With over 160 million active registrations and 40 years of brand ubiquity, .com holds an unmatched liquidity premium over every other extension in existence. Public companies and high-growth scaleups routinely pay 6 to 8 figures to secure exact-match .com flagships.',
        pricingHeuristics: [
            'All 676 two-letter .coms (LL.com) carry an absolute wholesale liquidity floor of $500,000+.',
            'Three-letter .coms (LLL.com) trade between $22,000 wholesale and $150,000+ retail.',
            'Single English dictionary nouns and verbs command $100,000 to $30,000,000+ (Voice.com $30M, Insurance.com $35.6M).',
            'Two-word commercial brandables average $5,000 to $45,000 in secondary registrar sales.',
        ],
        topComps: [
            { domain: 'Cars.com', price: '$872,000,000', year: 2014, significance: 'SEC M&A filing valuation.' },
            { domain: 'Insurance.com', price: '$35,600,000', year: 2010, significance: 'All-time highest verified cash dictionary sale.' },
            { domain: 'Voice.com', price: '$30,000,000', year: 2019, significance: 'All-cash GoDaddy corporate brokerage transaction.' },
            { domain: 'NFTs.com', price: '$15,000,000', year: 2022, significance: 'Escrow.com public record.' },
        ],
        faqs: [
            {
                question: 'Why is .com always more expensive than alternative extensions?',
                answer:
                    '.com holds an undisputed monopoly on consumer trust (98.4/100 trust index) and default smartphone keyboard ergonomics (the ".com" key). Corporate executives and consumers instinctively append .com to any brand name.',
            },
            {
                question: 'Are there any unregistered dictionary .com domains remaining?',
                answer:
                    'Virtually zero English dictionary words exist unregistered in .com. Any desirable word must be acquired through secondary marketplaces (Afternic, Sedo, Dan) or private brokerage.',
            },
            {
                question: 'What is the fastest way to appraise a .com domain?',
                answer:
                    'Input the domain into the DomainVoodoo valuation terminal to run multivariate regression against 14.8M+ verified sales comps, capitalized search advertising CAC savings, and syllable fluidity scoring.',
            },
        ],
    },
    io: {
        extension: 'io',
        label: '.io',
        fullName: 'British Indian Ocean Territory / Input-Output Tech ccTLD',
        registry: 'Identity Digital (formerly Ethos Capital / Afilias)',
        annualCarryingCost: '$35 - $50/year',
        liquidityMultiplier: '0.12x - 0.18x relative to .com baseline',
        trustScore: 82.5,
        primaryTarget: 'SaaS Platforms, Developer Tools, API Services, Open Source Collectives',
        metaTitle: '.IO Domain Valuation & Startup Pricing Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .io domains: developer tooling cachet, Input/Output semantic appeal, startup pricing benchmarks (Mint.io, Meta.io), and secondary liquidity.',
        overview:
            'In software engineering, I/O stands for Input/Output. Because of this natural technical pun, .io became the startup darling for cloud platforms, developer APIs, and open-source infrastructure throughout the 2010s and 2020s.',
        pricingHeuristics: [
            'High-intent developer terms (e.g., Code, Cloud, API, Data) command $50,000 to $250,000.',
            'Short 3-4 letter acronyms trade between $5,000 and $25,000.',
            'Two-word technical compounds average $1,500 to $8,500.',
            'Recent geopolitical discussions regarding the Chagos Archipelago have increased awareness around registry transition agreements.',
        ],
        topComps: [
            { domain: 'Mint.io', price: '$230,000', year: 2020, significance: 'Fintech and developer platform benchmark.' },
            { domain: 'Meta.io', price: '$100,000', year: 2021, significance: 'High-profile metaverse tech acquisition.' },
            { domain: 'Ecosystem.io', price: '$65,000', year: 2022, significance: 'Enterprise software architecture brand.' },
        ],
        faqs: [
            {
                question: 'Is .io still a good domain extension for software startups in 2026?',
                answer:
                    'Yes, .io retains massive authority among software engineers, DevOps architects, and technical CTOs who immediately recognize it as a developer-first product marker.',
            },
            {
                question: 'What is the future of the .io extension?',
                answer:
                    'While diplomatic sovereignty over the Chagos Islands transferred to Mauritius, the registry contract is operated by Identity Digital, ensuring long-term DNS stability and commercial continuation.',
            },
            {
                question: 'How do I price a .io domain for an end-user?',
                answer:
                    'Single dictionary tech words should be listed between $25,000 and $75,000 with Lease-to-Own financing enabled. Coined brandables should be priced between $3,500 and $12,000.',
            },
        ],
    },
    xyz: {
        extension: 'xyz',
        label: '.xyz',
        fullName: 'Generation XYZ Generic Top-Level Domain',
        registry: 'XYZ.COM LLC (Daniel Negari)',
        annualCarryingCost: '$10 - $14/year standard ($0.99 promo years)',
        liquidityMultiplier: '0.03x - 0.07x relative to .com baseline',
        trustScore: 68.4,
        primaryTarget: 'Web3 Protocols, Decentralized Orgs (DAOs), Next-Gen Creators, Alphabet Inc. (abc.xyz)',
        metaTitle: '.XYZ Domain Valuation & Web3 Pricing Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .xyz domains: Web3 adoption, numeric 3-digit clubs (000.xyz $315k), Alphabet abc.xyz prestige, and secondary market liquidity.',
        overview:
            'Launched in 2014, .xyz achieved legendary status when Google restructured under parent company Alphabet and chose abc.xyz as its global corporate headquarters. Today, .xyz is the dominant extension for decentralized finance, Ethereum Name Service (ENS) integrations, and next-generation Web3 builders.',
        pricingHeuristics: [
            'Short 3-digit numeric clubs (NNN.xyz) trade between $10,000 and $350,000+ (000.xyz sold for $315,000).',
            'Single English dictionary nouns favored by Web3 founders command $15,000 to $150,000.',
            'Standard multi-word registrations carry low liquidity unless backed by an active venture.',
        ],
        topComps: [
            { domain: '000.xyz', price: '$315,000', year: 2023, significance: 'Record numeric 3-digit transaction in .xyz.' },
            { domain: 'Swag.xyz', price: '$150,000', year: 2022, significance: 'High-profile e-commerce brand sale.' },
            { domain: 'Logic.xyz', price: '$80,000', year: 2022, significance: 'Single-word dictionary tech brand.' },
        ],
        faqs: [
            {
                question: 'Why is .xyz so popular in Web3 and crypto?',
                answer:
                    '.xyz was embraced by Ethereum and ENS pioneers as an alternative to exhausted legacy extensions, representing modern decentralization and youthful defiance of traditional corporate norms.',
            },
            {
                question: 'Are numeric .xyz domains good investments?',
                answer:
                    'Yes, short 3-digit (NNN.xyz) and 4-digit (NNNN.xyz) domains maintain active trading volumes on secondary exchanges, functioning like digital NFT collectibles.',
            },
            {
                question: 'Does Google penalize .xyz domains in search rankings?',
                answer:
                    'No. Google treats all generic top-level domains identically in search algorithms, provided the domain has high-quality content and authoritative backlinks.',
            },
        ],
    },
    co: {
        extension: 'co',
        label: '.co',
        fullName: 'Colombia / Company Top-Level Domain',
        registry: 'GoDaddy Registry (formerly Neustar / .CO Internet SAS)',
        annualCarryingCost: '$25 - $30/year',
        liquidityMultiplier: '0.06x - 0.12x relative to .com baseline',
        trustScore: 76.0,
        primaryTarget: 'Modern Brands, Consumer Startups, Short Mobile URLs (t.co, g.co)',
        metaTitle: '.CO Domain Valuation & Modern Brand Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .co domains: typo traffic value, Twitter t.co / Google g.co brand equity, startup naming trends, and secondary clearance prices.',
        overview:
            'Originally assigned to Colombia, .co was re-commercialized as a global abbreviation for "Company", "Corporation", and "Commerce". It is used by tech titans like Twitter (t.co) and Google (g.co) for short link redirection.',
        pricingHeuristics: [
            'Short 1-letter and 2-letter .co domains hold multi-six-figure corporate utility.',
            'Single-word dictionary .co domains trade between $10,000 and $85,000.',
            'Heavy typo direct-navigation traffic from users dropping the "m" in .com creates distinct cash-flow value.',
        ],
        topComps: [
            { domain: 'O.co', price: '$350,000+', year: 2010, significance: 'Overstock.com global rebrand.' },
            { domain: 'Autos.co', price: '$100,000', year: 2021, significance: 'Automotive marketplace asset.' },
        ],
        faqs: [
            {
                question: 'Does .co lose traffic to .com?',
                answer:
                    'Yes, there is an inherent "typo bleed" where careless users type .com. However, companies holding high-value .co domains offset this through strong search marketing and mobile brand recall.',
            },
            {
                question: 'Who owns the .co registry?',
                answer:
                    'The registry is operated by GoDaddy Registry under an official concession agreement with the Ministry of Information Technologies and Communications of Colombia.',
            },
            {
                question: 'What is a typical price for a single-word .co domain?',
                answer:
                    'A desirable English dictionary .co domain typically clears between $15,000 and $45,000 in end-user secondary transactions.',
            },
        ],
    },
    org: {
        extension: 'org',
        label: '.org',
        fullName: 'Organization Top-Level Domain',
        registry: 'Public Interest Registry (PIR)',
        annualCarryingCost: '$12 - $16/year',
        liquidityMultiplier: '0.08x - 0.15x relative to .com baseline',
        trustScore: 91.2,
        primaryTarget: 'Non-Profits, Charities, Open Source Foundations, Standards Bodies (Wikipedia.org, Linux.org)',
        metaTitle: '.ORG Domain Valuation & Non-Profit Guide (2026) | DomainVoodoo',
        metaDescription:
            'How to value .org domains: institutional non-profit authority, high trust score (91.2/100), foundation naming, and secondary market valuations.',
        overview:
            'One of the original top-level domains created in 1985, .org carries the highest ethical and institutional trust score on the web alongside .gov and .edu. It is the gold standard for global charities, open-source software, and public interest institutions.',
        pricingHeuristics: [
            'Short medical, charitable, and public interest acronyms command $25,000 to $150,000.',
            'Commercial for-profit companies generally avoid .org due to consumer expectation of non-profit operations.',
        ],
        topComps: [
            { domain: 'Pork.org', price: '$1,000,000', year: 2004, significance: 'National Pork Board brand asset.' },
            { domain: 'Save.org', price: '$200,000+', year: 2018, significance: 'Suicide prevention public foundation.' },
        ],
        faqs: [
            {
                question: 'Can a for-profit commercial business use a .org domain?',
                answer:
                    'Yes, anyone can register a .org domain, but consumers psychologically expect a public benefit, educational resource, or non-profit mission.',
            },
            {
                question: 'Why does .org have such a high trust score in Google?',
                answer:
                    'Historically, .org domains attract non-commercial editorial links from universities, governments, and news organizations, creating immense organic link authority.',
            },
            {
                question: 'How do I value a .org domain?',
                answer:
                    'Evaluate the philanthropic fundraising potential, medical or advocacy search volume, and foundation utility on DomainVoodoo.',
            },
        ],
    },
};

export function getTldData(extension: string): TldGuideData | undefined {
    return TLDS_DATA[extension.toLowerCase().replace('.', '')];
}

export function getAllTlds(): TldGuideData[] {
    return Object.values(TLDS_DATA);
}
