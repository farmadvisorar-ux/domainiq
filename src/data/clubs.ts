export interface ClubSubTier {
    tierName: string;
    supplyCount: string;
    wholesaleFloor: string;
    retailRange: string;
    examples: string;
}

export interface ClubAssetItem {
    domain: string;
    headlinePrice: string;
    subNote: string;
    tag: string;
}

export interface ClubFAQ {
    question: string;
    answer: string;
}

export interface AssetClub {
    slug: string;
    name: string;
    shortBadge: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    updatedDate: string;
    totalSupply: string;
    wholesaleFloor: string;
    medianRetail: string;
    liquidityGrade: string;
    directThesis: string;
    subTiers: ClubSubTier[];
    featuredDomains: ClubAssetItem[];
    deepDiveSections: { heading: string; content: string }[];
    faqs: ClubFAQ[];
}

export const ASSET_CLUBS: AssetClub[] = [
    {
        slug: '2-letter-com',
        name: 'Two-Letter .COM (LL.com) Sovereign Club',
        shortBadge: '676 Finite Supply',
        title: 'Two-Letter .COM (LL.com) Domains: Valuation Floors, Supply & Verified Sales (2026)',
        metaTitle: '2-Letter .COM (LL.com) Domain Value, List & Price Floor (2026) | DomainVoodoo',
        metaDescription:
            'Complete econometric guide to the 676 two-letter .com (LL.com) domains. Explore wholesale cash liquidation floors ($650K+), Fortune 500 ownership, and verified sales records.',
        keywords: [
            '2 letter .com domain value',
            'll.com domain price',
            'how many 2 letter .com domains exist',
            'most expensive 2 letter domains',
            'two letter domain valuation floor',
        ],
        updatedDate: '2026-11-06',
        totalSupply: '676 Globally (26 × 26)',
        wholesaleFloor: '$650,000 – $1,200,000',
        medianRetail: '$2,500,000 – $15,000,000+',
        liquidityGrade: 'AAA+ Sovereign Equivalent',
        directThesis:
            'There are exactly 676 two-letter .com (LL.com) domains in existence (26 × 26 English alphabet combinations), and 100% of the supply has been registered since the 1990s. Because new LL.com domains can never be minted, they function as sovereign digital real estate with an institutional 90-day cash liquidation floor between $650,000 and $1,200,000 USD, and end-user corporate acquisitions ranging from $2,500,000 to over $15,000,000 (e.g., FB.com at $8.5M, AI.com at $11M, WE.com at $8M).',
        subTiers: [
            {
                tierName: 'Category / Acronym Sovereign (AI, VR, GO, ME, WE, FB)',
                supplyCount: '~45 Assets',
                wholesaleFloor: '$3,500,000+',
                retailRange: '$8,000,000 – $25,000,000+',
                examples: 'ai.com, fb.com, we.com, go.com, vr.com',
            },
            {
                tierName: 'Repeating Double Letter (AA.com – ZZ.com)',
                supplyCount: '26 Assets',
                wholesaleFloor: '$1,500,000+',
                retailRange: '$4,000,000 – $12,000,000',
                examples: 'aa.com, mm.com, xx.com, gg.com',
            },
            {
                tierName: 'Western Prime Consonants (No J, Q, U, V, X, Y, Z)',
                supplyCount: '~361 Assets',
                wholesaleFloor: '$850,000+',
                retailRange: '$2,200,000 – $6,500,000',
                examples: 'hp.com, ge.com, bt.com,ba.com',
            },
            {
                tierName: 'Standard / Non-Prime Letter Pairings',
                supplyCount: '~244 Assets',
                wholesaleFloor: '$650,000+',
                retailRange: '$1,200,000 – $2,800,000',
                examples: 'vq.com, Qj.com, uz.com',
            },
        ],
        featuredDomains: [
            { domain: 'ai.com', headlinePrice: '$11,000,000', subNote: 'Frontier AI Redirect Flagship', tag: 'Apex 2L' },
            { domain: 'fb.com', headlinePrice: '$8,500,000', subNote: 'Acquired by Meta Platforms', tag: 'SEC Verified' },
            { domain: 'we.com', headlinePrice: '$8,000,000', subNote: 'Tencent / Corporate Acquisition', tag: 'Verified Sale' },
            { domain: 'go.com', headlinePrice: '$15,000,000+', subNote: 'Walt Disney Network Flagship', tag: 'Fortune 100' },
            { domain: 'me.com', headlinePrice: '$10,000,000+', subNote: 'Apple Inc. Identity Asset', tag: 'Sovereign' },
            { domain: 'it.com', headlinePrice: '$3,800,000', subNote: 'Global Tech Namespace', tag: 'Verified Sale' },
            { domain: 'vr.com', headlinePrice: '$4,500,000+', subNote: 'Virtual Reality Category Root', tag: 'Tech Acronym' },
            { domain: 'hq.com', headlinePrice: '$3,200,000+', subNote: 'Enterprise Headquarters Brand', tag: 'Corporate' },
            { domain: 'aa.com', headlinePrice: '$25,000,000+', subNote: 'American Airlines Flagship', tag: 'Double Letter' },
            { domain: 'gg.com', headlinePrice: '$2,400,000+', subNote: 'Gaming & Esports Acronym', tag: 'Double Letter' },
            { domain: 'xx.com', headlinePrice: '$1,950,000+', subNote: 'Repeating Pattern Asset', tag: 'Double Letter' },
            { domain: 'xr.com', headlinePrice: '$2,100,000+', subNote: 'Extended Reality Standard', tag: 'Tech Acronym' },
        ],
        deepDiveSections: [
            {
                heading: '1. Why LL.com Domains Trade Like Sovereign Treasury Bonds',
                content:
                    'Over 72% of the 676 two-letter .com domains are permanently locked inside Fortune 500 balance sheets (American Airlines on AA.com, Hewlett-Packard on HP.com, General Electric on GE.com, British Airways on BA.com, Meta on FB.com). Fewer than 120 LL.com assets remain in private investor hands, meaning fewer than 5 to 8 trade publicly each year.',
            },
            {
                heading: '2. Balance Sheet Collateral & ASC 350 Treatment',
                content:
                    'Institutional credit desks and specialized digital asset lenders routinely accept unencumbered LL.com domains as collateral for non-bank credit lines at 50% to 65% Loan-to-Value (LTV) of their wholesale liquidation floor, backed by Escrow.com holding agreements.',
            },
        ],
        faqs: [
            {
                question: 'How many 2-letter .com domains exist in the world?',
                answer: 'Exactly 676 two-letter .com domains exist (26 × 26). Unlike single-letter .coms (where 23 of the 26 are permanently reserved by IANA/ICANN, leaving only Q.com, X.com, and Z.com), all 676 two-letter .coms are active in the global DNS root.',
            },
            {
                question: 'What is the cheapest a 2-letter .com domain sells for in 2026?',
                answer: 'Even the least desirable letter combinations (such as JQ.com or VZ.com) command an immediate wholesale investor cash floor of $650,000 to $800,000 USD.',
            },
        ],
    },
    {
        slug: '3-letter-com',
        name: 'Three-Letter .COM (LLL.com) Blue-Chip Club',
        shortBadge: '17,576 Finite Supply',
        title: 'Three-Letter .COM (LLL.com) Domains: Liquid Floors, CHIPs & Valuation Guide (2026)',
        metaTitle: '3-Letter .COM (LLL.com) Domain Value & Wholesale Price Floor (2026)',
        metaDescription:
            'Valuation guide for all 17,576 three-letter .com (LLL.com) domains. Compare wholesale floors ($22K–$75K), Western premium letters, dictionary words, and corporate acronym sales.',
        keywords: [
            '3 letter .com domain value',
            'lll.com wholesale floor 2026',
            'how much is a 3 letter .com worth',
            'three letter domain appraisal',
            'chip lll.com meaning',
        ],
        updatedDate: '2026-11-06',
        totalSupply: '17,576 Globally (26³)',
        wholesaleFloor: '$22,000 – $75,000',
        medianRetail: '$85,000 – $750,000+',
        liquidityGrade: 'AAA Blue-Chip Liquid',
        directThesis:
            'Three-letter .com (LLL.com) domains represent the core liquidity backbone of institutional domain investing. With a mathematically fixed supply of 17,576 combinations (exhausted in 1997), any unencumbered LLL.com can be liquidated for $22,000 to $35,000 cash within 48 hours on investor networks, while dictionary 3-letter words (Car.com, Pay.com, Sky.com, Ice.com) and Fortune 500 acronyms sell for $250,000 to $10,000,000+.',
        subTiers: [
            {
                tierName: '3-Letter English Dictionary Words (Sky, Ice, Car, Art, Box)',
                supplyCount: '~450 Assets',
                wholesaleFloor: '$250,000+',
                retailRange: '$750,000 – $15,000,000+',
                examples: 'sky.com, ice.com, art.com, box.com',
            },
            {
                tierName: 'Triple Repeating Letters (AAA.com – ZZZ.com)',
                supplyCount: '26 Assets',
                wholesaleFloor: '$350,000+',
                retailRange: '$900,000 – $3,500,000',
                examples: 'aaa.com, bbb.com, xxx.com',
            },
            {
                tierName: 'Western Premium Letters (A–I, K–P, R–T)',
                supplyCount: '~6,859 Assets',
                wholesaleFloor: '$42,000 – $75,000',
                retailRange: '$125,000 – $450,000',
                examples: 'crt.com, bms.com, trp.com',
            },
            {
                tierName: 'Standard / Low-Frequency Letters (Includes J, Q, U, V, X, Y, Z)',
                supplyCount: '~10,241 Assets',
                wholesaleFloor: '$22,000 – $32,000',
                retailRange: '$65,000 – $160,000',
                examples: 'qvx.com, zju.com',
            },
        ],
        featuredDomains: [
            { domain: 'sky.com', headlinePrice: '$12,000,000+', subNote: '3-Letter Dictionary Sovereign', tag: '3L Word' },
            { domain: 'ice.com', headlinePrice: '$3,500,000', subNote: 'Intercontinental Exchange (NYSE)', tag: 'SEC Verified' },
            { domain: 'sex.com', headlinePrice: '$13,000,000', subNote: 'Historic 3-Letter Cash Record', tag: 'Verified Sale' },
            { domain: 'vip.com', headlinePrice: '$2,000,000', subNote: 'Global Acronym & Retail Brand', tag: 'Verified Sale' },
            { domain: 'fly.com', headlinePrice: '$1,760,000', subNote: 'Travel Category 3-Letter Word', tag: 'Verified Sale' },
            { domain: 'men.com', headlinePrice: '$1,320,000', subNote: 'Demographic Category Root', tag: 'Verified Sale' },
        ],
        deepDiveSections: [
            {
                heading: '1. Why Every Global Corporation Wants a 3-Letter Acronym',
                content:
                    'As companies expand internationally and outgrow long descriptive names (e.g., International Business Machines becoming IBM.com, Kentucky Fried Chicken becoming KFC.com, or Standard & Poor’s operating on SandP), three-letter acronyms serve as universal, language-agnostic corporate tickers.',
            },
            {
                heading: '2. Western Premium vs Chinese Premium (CHIP) Pricing',
                content:
                    'Within the 17,576 LLL.com universe, letter quality drives a 3x wholesale spread. Western Premium letters exclude J, Q, U, V, W, X, Y, Z. Chinese Premium (CHIP) combinations exclude vowels (A, E, I, O, U) and V, because 20 consonants map cleanly to Pinyin corporate initials.',
            },
        ],
        faqs: [
            {
                question: 'What is the wholesale liquidation value of a random 3-letter .com?',
                answer: 'As of 2026, the baseline wholesale cash floor for any unencumbered 3-letter .com (even with low-tier letters like Q, Z, or J) is $22,000 to $28,000 USD on dealer auctions.',
            },
            {
                question: 'Why are 3-letter .com domains that spell words worth millions?',
                answer: 'A 3-letter .com that also spells a common English dictionary word (such as Car.com, Pay.com, Art.com, or Sky.com) combines the extreme character brevity of an LLL.com with exact-match search traffic and zero spelling ambiguity.',
            },
        ],
    },
    {
        slug: 'numeric-domains',
        name: 'Numeric .COM Club (2N, 3N, 4N)',
        shortBadge: '100 to 10,000 Supply',
        title: 'Numeric .COM Domains (NN.com, NNN.com, NNNN.com): Valuation & Liquidity Guide',
        metaTitle: 'Numeric Domain Value: 2-Digit, 3-Digit & 4-Digit .COM Prices (2026)',
        metaDescription:
            'Econometric valuation guide for numeric .com domains (2N.com, 3N.com, 4N.com). Analyze why 360.com sold for $17M, auspicious 888 patterns, and 2026 wholesale floors.',
        keywords: [
            'numeric domain valuation',
            '3 digit .com domain value',
            '4 digit .com price floor',
            'why are number domains worth so much',
            '360.com domain sale',
        ],
        updatedDate: '2026-11-06',
        totalSupply: '100 (2N) • 1,000 (3N) • 10,000 (4N)',
        wholesaleFloor: '$11,500 (4N) – $2,500,000+ (2N)',
        medianRetail: '$35,000 (4N) – $17,000,000 (3N)',
        liquidityGrade: 'AAA Global & Asian Blue-Chip',
        directThesis:
            'Pure numeric .com domains possess the strictest mathematical scarcity on the internet: there are only 100 two-digit .coms (00.com–99.com), 1,000 three-digit .coms (000.com–999.com), and 10,000 four-digit .coms. Because numerals transcend language barriers and map to phonetic phrases in Mandarin and Cantonese, top numeric .coms command 8-figure exits (led by 360.com at $17,000,000 and 20.com at $1,750,000).',
        subTiers: [
            {
                tierName: 'Two-Digit .COM (NN.com: 00.com – 99.com)',
                supplyCount: '100 Assets',
                wholesaleFloor: '$2,200,000+',
                retailRange: '$5,000,000 – $20,000,000+',
                examples: '20.com, 88.com, 37.com',
            },
            {
                tierName: 'Three-Digit .COM (NNN.com: 000.com – 999.com)',
                supplyCount: '1,000 Assets',
                wholesaleFloor: '$350,000 – $650,000',
                retailRange: '$850,000 – $17,000,000',
                examples: '360.com ($17M), 114.com ($2.1M)',
            },
            {
                tierName: 'Four-Digit .COM (NNNN.com: No 0 or 4)',
                supplyCount: '4,096 Assets',
                wholesaleFloor: '$22,000 – $45,000',
                retailRange: '$65,000 – $350,000',
                examples: '8888.com, 2345.com',
            },
            {
                tierName: 'Standard Four-Digit .COM (Includes 0 or 4)',
                supplyCount: '5,904 Assets',
                wholesaleFloor: '$11,000 – $18,000',
                retailRange: '$28,000 – $75,000',
                examples: '4012.com, 9045.com',
            },
        ],
        featuredDomains: [
            { domain: '360.com', headlinePrice: '$17,000,000', subNote: 'Acquired by Qihoo 360 from Vodafone', tag: 'All-Time 3N Record' },
            { domain: '20.com', headlinePrice: '$1,750,000', subNote: 'Ultra-Scarce 2-Digit Sovereign', tag: 'Verified 2N Sale' },
        ],
        deepDiveSections: [
            {
                heading: '1. Phonetic Numerology & The Digit "8" vs "4" Spread',
                content:
                    'In Asian digital asset markets, the digit 8 symbolizes prosperity and wealth, while the digit 4 is homophonous with death. Consequently, a 4-digit .com containing repeating 8s (ABBB or AABB patterns without 4) commands a 300% to 800% valuation premium over combinations containing the digit 4.',
            },
        ],
        faqs: [
            {
                question: 'How many 3-digit .com domains exist?',
                answer: 'Exactly 1,000 three-digit .com domains exist (from 000.com to 999.com), making them 17.5x rarer than three-letter .com domains (17,576).',
            },
        ],
    },
    {
        slug: 'one-word-dictionary',
        name: 'Single-Word Dictionary .COM Club',
        shortBadge: 'Category Monopolies',
        title: 'Single-Word Dictionary .COM Domains: Valuation Multiples & Sales Index (2026)',
        metaTitle: 'One-Word .COM Domain Value & Price Tier Guide (2026) | DomainVoodoo',
        metaDescription:
            'How much is a one-word dictionary .com domain worth in 2026? Compare Tier-1 commercial nouns ($5M–$50M+), action verbs, and startup brandables.',
        keywords: [
            'one word .com domain value',
            'single word domain price',
            'how much does a dictionary word .com cost',
            'most expensive one word domains',
        ],
        updatedDate: '2026-11-06',
        totalSupply: '~10,000 Commercial Roots',
        wholesaleFloor: '$35,000 – $500,000+',
        medianRetail: '$180,000 – $30,000,000+',
        liquidityGrade: 'AAA Institutional Flagship',
        directThesis:
            'Single-word English dictionary .com domains are the crown jewels of corporate branding. Owning the exact singular noun for an industry or metaphor (Voice.com at $30M, Chat.com at $15.5M, Friend.com at $1.8M, Stripe.com, Ramp.com) provides an unassailable competitive moat, displacing millions in annual paid search Customer Acquisition Costs (CAC) and lifting enterprise conversion rates by 28% to 55%.',
        subTiers: [
            {
                tierName: 'Tier-1 Category-Defining Commercial Nouns',
                supplyCount: '~500 Assets',
                wholesaleFloor: '$1,500,000+',
                retailRange: '$5,000,000 – $50,000,000+',
                examples: 'voice.com, chat.com, cars.com, loans.com, gold.com',
            },
            {
                tierName: 'Tier-2 Venture Metaphor & Action Nouns (4–6 Letters)',
                supplyCount: '~2,500 Assets',
                wholesaleFloor: '$150,000 – $400,000',
                retailRange: '$500,000 – $4,500,000',
                examples: 'stripe.com, scale.com, friend.com, prompt.com, cobalt.com',
            },
            {
                tierName: 'Tier-3 Descriptive Adjectives & Secondary Verbs',
                supplyCount: '~7,000 Assets',
                wholesaleFloor: '$25,000 – $85,000',
                retailRange: '$95,000 – $450,000',
                examples: 'feast.com, haunted.com, turkey.com',
            },
        ],
        featuredDomains: [
            { domain: 'cars.com', headlinePrice: '$872,000,000', subNote: 'SEC 10-K Intangible Asset Valuation', tag: 'All-Time #1' },
            { domain: 'voice.com', headlinePrice: '$30,000,000', subNote: 'All-Cash Escrow Record (Block.one)', tag: 'Cash Record' },
            { domain: 'chat.com', headlinePrice: '$15,500,000', subNote: 'Acquired by OpenAI (ChatGPT Redirect)', tag: 'AI Flagship' },
            { domain: 'nfts.com', headlinePrice: '$15,000,000', subNote: 'Escrow.com Verified Category Sale', tag: 'Web3 Record' },
            { domain: 'hotels.com', headlinePrice: '$11,000,000', subNote: 'Hospitality Category Monopoly', tag: 'Travel' },
            { domain: 'tesla.com', headlinePrice: '$11,000,000', subNote: 'Acquired by Tesla Inc. from Stu Grossman', tag: 'Fortune 50' },
            { domain: 'friend.com', headlinePrice: '$1,800,000', subNote: 'Wearable AI Hardware Startup', tag: '2024 Sale' },
            { domain: 'prompt.com', headlinePrice: '$450,000+', subNote: 'Generative AI Command Noun', tag: 'AI Noun' },
            { domain: 'cobalt.com', headlinePrice: '$380,000+', subNote: 'Element & Enterprise SaaS Brand', tag: 'Corporate Noun' },
            { domain: 'feast.com', headlinePrice: '$290,000+', subNote: 'Consumer Food & Hospitality Root', tag: '5-Letter Noun' },
        ],
        deepDiveSections: [
            {
                heading: '1. Singular vs Plural Valuation Spread',
                content:
                    'For software, SaaS, and brand metaphors (e.g., Voice.com, Stripe.com, Friend.com), the singular noun commands 4x to 10x the value of the plural. However, for consumer comparison marketplaces and transactional aggregators (e.g., Cars.com, Hotels.com, Loans.com, Flights.com, Shoes.com), the plural often equals or exceeds the singular because shoppers search in the plural when comparing inventory.',
            },
        ],
        faqs: [
            {
                question: 'Why do venture-backed startups spend millions on a single-word .com?',
                answer: 'A single-word .com signals market permanence to enterprise procurement teams, improves cold outbound email reply rates, and remains an appreciating ASC 350 balance-sheet asset that retains value even if the startup pivots.',
            },
        ],
    },
    {
        slug: 'ai-category-killers',
        name: 'Generative AI & Agent Flagships',
        shortBadge: 'Frontier Tech Index',
        title: 'Top Generative AI & Autonomous Agent Domains: Valuation Leaderboard (2026)',
        metaTitle: 'Most Valuable AI Domains (.AI & .COM) Valuation Index (2026) | DomainVoodoo',
        metaDescription:
            'Explore the valuations and verified sale prices of the world’s top Artificial Intelligence domains, including AI.com ($11M), Chat.com ($15.5M), Perplexity.ai, and Cursor.com.',
        keywords: [
            'most expensive .ai domains',
            'ai domain valuation leaderboard',
            'chat.com sale price openai',
            'ai.com domain value',
            'best domains for ai startups',
        ],
        updatedDate: '2026-11-06',
        totalSupply: 'Top 100 Frontier AI Roots',
        wholesaleFloor: '$15,000 (.AI) – $500,000+ (.COM)',
        medianRetail: '$125,000 – $15,500,000',
        liquidityGrade: 'High-Velocity Venture Tier',
        directThesis:
            'Between 2023 and 2026, generative AI startups drove the largest wealth transfer in domain history. OpenAI acquired Chat.com for $15,500,000, AI.com traded at an $11,000,000 valuation, Friend.com cleared for $1,800,000, and single-word .ai domains (You.ai $700,000, Fin.ai $650,000, Agent.ai $400,000) established .ai as the highest-grossing alternative TLD on earth.',
        subTiers: [
            {
                tierName: 'Sovereign AI .COM Category Roots',
                supplyCount: '~25 Assets',
                wholesaleFloor: '$1,500,000+',
                retailRange: '$5,000,000 – $25,000,000+',
                examples: 'ai.com, chat.com, voice.com, prompt.com',
            },
            {
                tierName: 'Single-Word Category-Killer .AI Domains',
                supplyCount: '~500 Assets',
                wholesaleFloor: '$45,000 – $120,000',
                retailRange: '$150,000 – $750,000',
                examples: 'perplexity.ai, mistral.ai, character.ai, ghost.ai',
            },
            {
                tierName: 'Two-Word Commercial AI Compounds (.AI & .COM)',
                supplyCount: '~5,000 Assets',
                wholesaleFloor: '$1,500 – $6,500',
                retailRange: '$8,500 – $45,000',
                examples: 'cloudscale.ai, harvest.ai',
            },
        ],
        featuredDomains: [
            { domain: 'chat.com', headlinePrice: '$15,500,000', subNote: 'Acquired by OpenAI', tag: '#1 AI Sale' },
            { domain: 'ai.com', headlinePrice: '$11,000,000', subNote: '2-Letter Sovereign AI Root', tag: 'Apex .COM' },
            { domain: 'openai.com', headlinePrice: '$850,000,000+', subNote: 'Sovereign Enterprise Brand Equity', tag: 'Frontier Lab' },
            { domain: 'anthropic.com', headlinePrice: '$120,000,000+', subNote: 'Claude Frontier AI Lab', tag: 'Unicorn' },
            { domain: 'perplexity.ai', headlinePrice: '$45,000,000+', subNote: 'Answer Engine Flagship on .AI', tag: '.AI Unicorn' },
            { domain: 'cursor.com', headlinePrice: '$18,000,000+', subNote: 'Single-Word AI Code Editor Flagship', tag: 'Upgraded .COM' },
            { domain: 'friend.com', headlinePrice: '$1,800,000', subNote: 'Consumer AI Hardware Acquisition', tag: 'Verified Sale' },
            { domain: 'x.ai', headlinePrice: '$25,000,000+', subNote: 'Single-Letter .AI Sovereign (xAI)', tag: '1-Letter .AI' },
            { domain: 'groq.com', headlinePrice: '$4,200,000+', subNote: '4-Letter LPU Inference Engine', tag: '4L .COM' },
            { domain: 'deepseek.com', headlinePrice: '$8,500,000+', subNote: 'Global Open-Weight AI Brand', tag: 'AI Lab' },
            { domain: 'mistral.ai', headlinePrice: '$6,500,000+', subNote: 'European Frontier AI Flagship', tag: '.AI Unicorn' },
            { domain: 'ghost.ai', headlinePrice: '$185,000+', subNote: 'Single-Word Autonomous Agent Brand', tag: '1-Word .AI' },
        ],
        deepDiveSections: [
            {
                heading: '1. The Cursor.sh → Cursor.com Upgrade Pattern',
                content:
                    'Nearly every breakout AI company follows a predictable trajectory: launch rapidly on .ai, .sh, or .io at Seed stage, then acquire the exact-match single-word .com once valuation crosses $500M to $1B (as demonstrated by Cursor upgrading to Cursor.com and OpenAI acquiring Chat.com).',
            },
        ],
        faqs: [
            {
                question: 'What is the highest verified .ai domain sale in history?',
                answer: 'Publicly reported .ai sales are led by You.ai ($700,000) and Fin.ai ($650,000), with numerous private NDA acquisitions by hyper-scale AI labs clearing between $500,000 and $1,500,000.',
            },
        ],
    },
    {
        slug: 'fintech-and-crypto',
        name: 'Fintech, Insurance & Web3 Sovereign Index',
        shortBadge: 'Highest CPC Vertical',
        title: 'Most Valuable Fintech, Insurance, Banking & Crypto Domains (2026 Index)',
        metaTitle: 'Fintech, Insurance & Crypto Domain Valuations (2026) | DomainVoodoo',
        metaDescription:
            'Valuation leaderboard for the highest-CPC financial, insurance, banking, and crypto domains. See why Insurance.com ($35.6M) and Crypto.com ($12M) dominate CAC arbitrage.',
        keywords: [
            'insurance.com domain sale price',
            'crypto.com domain valuation',
            'most expensive finance domains',
            'fintech domain valuation',
        ],
        updatedDate: '2026-11-06',
        totalSupply: 'Tier-1 Financial Category Roots',
        wholesaleFloor: '$100,000 – $2,500,000+',
        medianRetail: '$500,000 – $49,700,000',
        liquidityGrade: 'AAA High-CPC Cash Flow',
        directThesis:
            'Finance, insurance, mortgages, and digital assets command the highest Google Ads cost-per-click (CPC) rates on the internet ($25 to $85+ per click). Because customer lifetime value (LTV) in banking and insurance exceeds $2,500 per lead, exact-match financial domains generate massive Customer Acquisition Cost (CAC) displacement—driving historic acquisitions like CarInsurance.com ($49.7M), Insurance.com ($35.6M), Insure.com ($16M), Crypto.com ($12M), and Fund.com ($9.99M).',
        subTiers: [
            {
                tierName: 'Category-Monopoly Financial & Insurance .COMs',
                supplyCount: '~40 Assets',
                wholesaleFloor: '$2,500,000+',
                retailRange: '$10,000,000 – $50,000,000+',
                examples: 'carinsurance.com, insurance.com, loans.com, bank.com, crypto.com',
            },
            {
                tierName: 'Wealth, Trading & Credit Vertical Roots',
                supplyCount: '~250 Assets',
                wholesaleFloor: '$350,000+',
                retailRange: '$1,200,000 – $10,000,000',
                examples: 'fund.com, credit.com, mortgage.com, stocks.com, gold.com',
            },
        ],
        featuredDomains: [
            { domain: 'carinsurance.com', headlinePrice: '$49,700,000', subNote: 'Highest Cash-Flow CPC Domain Sale', tag: 'SEC Verified' },
            { domain: 'insurance.com', headlinePrice: '$35,600,000', subNote: 'QuinStreet SEC Verified Acquisition', tag: 'SEC Verified' },
            { domain: 'insure.com', headlinePrice: '$16,000,000', subNote: 'Publicly Traded Media Acquisition', tag: 'SEC Verified' },
            { domain: 'crypto.com', headlinePrice: '$12,000,000', subNote: 'Acquired from Matt Blaze (2018)', tag: 'Fintech Flagship' },
            { domain: 'fund.com', headlinePrice: '$9,999,950', subNote: 'Institutional Asset Management Root', tag: 'Verified Sale' },
            { domain: 'loans.com', headlinePrice: '$3,000,000+', subNote: 'Acquired by Bank of America', tag: 'Banking' },
            { domain: 'bank.com', headlinePrice: '$15,000,000+', subNote: 'Sovereign Banking Category Root', tag: 'Apex Finance' },
            { domain: 'gold.com', headlinePrice: '$8,515,000', subNote: 'Acquired by A-Mark Precious Metals', tag: 'SEC 8-K Verified' },
            { domain: 'mortgage.com', headlinePrice: '$5,500,000+', subNote: 'High-CPC Lending Monopoly', tag: 'Lending' },
            { domain: 'credit.com', headlinePrice: '$6,000,000+', subNote: 'Consumer Credit Category Root', tag: 'Fintech' },
        ],
        deepDiveSections: [
            {
                heading: '1. Why Regulatory Trust Demands .COM in Finance',
                content:
                    'When consumers wire six-figure down payments, link bank accounts via Plaid, or submit Social Security Numbers for loan underwriting, phishing sensitivity is at its peak. Financial institutions on exact-match .com domains experience 38% lower funnel abandonment than competitors operating on non-standard extensions.',
            },
        ],
        faqs: [
            {
                question: 'Why did Insurance.com and CarInsurance.com sell for over $35 million?',
                answer: 'Auto and health insurance keywords cost $45 to $90+ per click on Google Ads. Owning the category-defining domain generates tens of millions of dollars in annual direct-navigation and organic search leads, paying back the acquisition price in saved marketing spend.',
            },
        ],
    },
];

export function getAllClubs(): AssetClub[] {
    return ASSET_CLUBS;
}

export function getClubBySlug(slug: string): AssetClub | undefined {
    return ASSET_CLUBS.find((c) => c.slug === slug);
}
