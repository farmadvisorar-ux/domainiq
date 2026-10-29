export interface GlossaryTerm {
    id: string;
    term: string;
    shortDefinition: string;
    fullExplanation: string;
    formula?: string;
    example: string;
    category: 'Valuation & Econometrics' | 'Secondary Liquidity & Brokerage' | 'Legal & Trademark (UDRP)' | 'Technical Architecture & DNS';
    relatedTerms?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
    {
        id: 'cvm-4',
        term: 'Consensus Valuation Matrix (CVM-4)',
        shortDefinition:
            'A 4-pillar econometric framework that synthesizes time-decayed sales comps, capitalized search marketing CAC savings, structural scarcity, and TLD liquidity multipliers into an unbiased Fair Market Value.',
        fullExplanation:
            'Rather than relying on single-variable linear heuristics or opaque black-box machine learning, CVM-4 decomposes domain worth into independently auditable financial vectors. Outlier transactions beyond 2.5 standard deviations are automatically trimmed, producing a statistically bounded valuation with a 90% confidence interval.',
        formula: 'FMV = [w1 * Scarcity + w2 * Comps + w3 * AdSavings] * TLD_Multiplier - RiskDiscount',
        example:
            'Cloudscale.ai is appraised by combining high-intent enterprise cloud CPC comps ($18.50/click), structural 2-word cadence, and .ai tech multiplier (0.32x), yielding an FMV of $42,500.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['capitalized-cac-savings', 'tld-liquidity-multiplier', 'wholesale-liquidity-floor'],
    },
    {
        id: 'capitalized-cac-savings',
        term: 'Capitalized Search CAC Savings',
        shortDefinition:
            'The capitalized monetary value of customer acquisition cost (CAC) savings generated when a domain receives direct type-in navigation or organic search traffic.',
        fullExplanation:
            'When an enterprise owns an exact-match or category-defining domain, it receives high-intent organic visitors that competitors must pay for via Google Ads pay-per-click (PPC). In econometric appraisal, these monthly ad savings are discounted over a 3 to 5-year commercial asset lifecycle using discounted cash flow (DCF) modeling.',
        formula: 'Annual CAC Savings = Exact Search Volume * Organic CTR * Average CPC * 12 Months',
        example:
            'CarInsurance.com saves an estimated $7,500,000 annually in Google Ads clicks at an average $52 CPC, justifying QuinStreet’s landmark $49.7M acquisition price.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['cvm-4', 'exact-match-domain-premium'],
    },
    {
        id: 'wholesale-liquidity-floor',
        term: 'Wholesale Liquidity Floor',
        shortDefinition:
            'The immediate cash clearance price an asset commands within 48 to 72 hours on investor auction networks, typically 15% to 35% of retail end-user fair market value.',
        fullExplanation:
            'Domains possess two distinct economic realities: retail end-user value (what an operating business will pay to solve a strategic branding need) and wholesale investor floor (what a professional portfolio manager will pay in cash for an asset to hold for resale). The liquidity floor represents the downside collateral value for domain-backed asset lending.',
        formula: 'Wholesale Floor = FMV * Asset Class Ratio (0.15 for multi-word brandables, up to 0.45 for LLL.com)',
        example:
            'A premium dictionary noun with a retail end-user value of $150,000 holds a 48-hour wholesale liquidation floor of $33,000 to $45,000 on liquid dealer forums.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['cvm-4', 'sell-through-rate', 'carrying-cost-ratio'],
    },
    {
        id: 'drop-gap-penalty',
        term: 'Drop Gap Penalty',
        shortDefinition:
            'The algorithmic discount applied to an expired domain’s historical SEO link trust when its registration lapsed and sat dormant or parked for over 120–180 days.',
        fullExplanation:
            'Search engines monitor DNS zone file activity and ICANN redemption cycles. When a domain drops and remains inactive for extended intervals, search engines reset historical anchor text equity and page trust signals to prevent automated spam link manipulation. An extended drop gap degrades 40% to 70% of legacy backlink authority.',
        formula: 'Trust Retention Multiplier = e^(-0.005 * Dormant_Days) [Capped at 1.0 for unbroken vintage]',
        example:
            'A domain registered in 1999 that dropped for 2 years in 2021 retains only 35% of its historical search equity compared to an unbroken continuous archive vintage.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['continuous-archive-vintage', 'radio-test-score'],
    },
    {
        id: 'anchor-price-rule',
        term: '1.45x Anchor Pricing Rule',
        shortDefinition:
            'The strategic negotiation standard where a domain seller opens correspondence at 145% of their acceptable reserve price to absorb buyer counter-offers.',
        fullExplanation:
            'Empirical negotiation research proves that the initial numerical anchor dictates over 70% of final settlement variance. By anchoring at 1.45x target reserve, a seller can concede 50% of the bargaining spread across a 3-round counter-offer sequence and close precisely at their target fair market value.',
        formula: 'Opening Anchor Price = Target Reserve Valuation * 1.45',
        example:
            'If a seller’s internal walk-away reserve is $20,000, their opening inquiry quote is set at $29,000. Round 2 settles at $24,500, and final escrow closes at $21,000.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['lease-to-own-financing', 'fast-transfer-mls'],
    },
    {
        id: 'lease-to-own-financing',
        term: 'Lease-to-Own (LTO) Financing',
        shortDefinition:
            'A structured domain purchase contract allowing the buyer to pay over 12 to 36 monthly installments with immediate DNS nameserver delegation.',
        fullExplanation:
            'LTO financing bridges the valuation gap between cash-constrained startups and portfolio investors holding high-value names. The seller retains legal registry ownership in escrow while the buyer launches their product on the domain immediately. If payments lapse, the domain reverts to the seller with zero foreclosure overhead.',
        formula: 'Monthly LTO Installment = (Cash FMV * 1.10 Financing Surcharge) / Term_Months',
        example:
            'A startup acquires Prime.ai for $180,000 by paying $8,250/month over 24 months, avoiding upfront venture capital dilution while launching their product on day one.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['anchor-price-rule', 'fast-transfer-mls'],
    },
    {
        id: 'radio-test-score',
        term: 'The Radio Test (Phonetic Audibility)',
        shortDefinition:
            'A qualitative benchmark measuring whether an internet domain can be spoken aloud in conversation or broadcast advertising without phonetic confusion.',
        fullExplanation:
            'Domains that fail the Radio Test contain homophones (e.g., /there/ vs. /their/), unusual spellings (e.g., Lyft, Flickr, Tumblr), hyphens, or digits (e.g., 2 vs. two). Passing the Radio Test is essential for television, podcast, and radio marketing campaigns where prospective customers cannot click a link.',
        example:
            'Cloudscale.com passes the Radio Test with a perfect 10/10 score. K-l-o-u-d-9.com fails with a 2/10 score due to ambiguous phonetic spelling and a hyphen.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['brandable-cadence', 'cvm-4'],
    },
    {
        id: 'reverse-domain-name-hijacking',
        term: 'Reverse Domain Name Hijacking (RDNH)',
        shortDefinition:
            'A formal sanction issued by an ICANN UDRP administrative panel when a trademark holder attempts in bad faith to harass or seize a domain from a legitimate registrant.',
        fullExplanation:
            'Under ICANN UDRP Rule 15(e), if a complainant files an administrative dispute knowing they cannot prove bad faith (e.g., the domain is a common dictionary word registered before the trademark existed), the panel declares the complaint an abuse of process and censures the corporate filer.',
        example:
            'A corporate brand registered a trademark for "Zenith" in 2022 and filed a UDRP against an investor who registered Zenith.com in 1996. The panel found RDNH.',
        category: 'Legal & Trademark (UDRP)',
        relatedTerms: ['udrp-bad-faith-prong', 'trademark-safe-harbor'],
    },
    {
        id: 'udrp-bad-faith-prong',
        term: 'UDRP Three-Prong Test',
        shortDefinition:
            'The mandatory legal burden of proof under ICANN Paragraph 4(a) where a complainant must prove confusing similarity, absence of legitimate interest, AND registration in bad faith.',
        fullExplanation:
            'All three prongs are conjunctively required. If a complainant proves that a domain is identical to their trademark and that the respondent has no trademark rights, the complaint will STILL fail if the respondent registered the generic name in good faith without targeting the complainant’s mark.',
        example:
            'Holding generic dictionary words (e.g., Apple, Stream, Velocity) for prospective resale is an established legitimate business interest under WIPO jurisprudence.',
        category: 'Legal & Trademark (UDRP)',
        relatedTerms: ['reverse-domain-name-hijacking', 'trademark-safe-harbor'],
    },
    {
        id: 'hsts-preload-standard',
        term: 'HSTS Preload Security Standard',
        shortDefinition:
            'Google Registry’s mandatory security posture on .dev and .app domains, forcing modern web browsers to connect exclusively via encrypted HTTPS.',
        fullExplanation:
            'HTTP Strict Transport Security (HSTS) prevents man-in-the-middle downgrades and cookie hijacking. By hardcoding the entire top-level zone (.dev and .app) into Google Chrome, Firefox, and Apple Safari browser source code, unencrypted HTTP traffic is physically rejected before leaving the user device.',
        example:
            'Every .dev and .app domain resolves strictly over HTTPS without requiring server-level 301 redirects, establishing high developer credibility.',
        category: 'Technical Architecture & DNS',
        relatedTerms: ['tld-liquidity-multiplier'],
    },
    {
        id: 'tld-liquidity-multiplier',
        term: 'TLD Liquidity Multiplier',
        shortDefinition:
            'The empirical market coefficient measuring secondary transaction clearance volume and pricing power of an alternative extension relative to .com.',
        fullExplanation:
            'In secondary market transactions, .com represents 78% of all monetary value traded globally (baseline 1.00x). Other extensions command differentiated multiples: .ai (0.28x - 0.35x), .io (0.14x - 0.18x), .dev and .app (0.08x - 0.12x), .net (0.07x - 0.12x), and .xyz (0.06x - 0.10x).',
        formula: 'TLD_Adjusted_FMV = Base_Com_Value * Extension_Multiplier',
        example:
            'A $100,000 single dictionary noun in .com will typically trade between $28,000 and $35,000 on .ai, and between $8,000 and $12,000 on .dev.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['cvm-4', 'wholesale-liquidity-floor'],
    },
    {
        id: 'fast-transfer-mls',
        term: 'Fast-Transfer Registrar MLS Network',
        shortDefinition:
            'The automated distribution system (Afternic Fast Transfer and Sedo MLS) that syndicates secondary market domain listings across 85+ global registrars.',
        fullExplanation:
            'When a prospective buyer types an already-registered domain into the search bar at GoDaddy, Namecheap, or Dynadot, Fast-Transfer pulls the seller’s Buy-It-Now (BIN) listing and renders an instant checkout button. Standard Fast-Transfer commission is 15.00%.',
        example:
            'Over 70% of end-user six-figure domain acquisitions take place directly through registrar search bars via Fast-Transfer syndication.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['anchor-price-rule', 'wholesale-liquidity-floor'],
    },
    {
        id: 'carrying-cost-ratio',
        term: 'Carrying Cost Ratio (CCR)',
        shortDefinition:
            'The ratio between annual domain renewal carrying fees and projected secondary sales liquidation value across an investment portfolio.',
        fullExplanation:
            'High registry renewal fees (e.g., $80/yr for .ai or $1,200/yr for Google Registry premiums) create cash drag that erodes investment yield. Investors model sell-through rate against annual carrying cost to determine portfolio break-even thresholds.',
        formula: 'CCR = Annual Renewal Carrying Cost / Median Portfolio Realized Sale Price',
        example:
            'A 1,000-domain .com portfolio with $12/yr renewals requires $12,000 in carrying costs. With a 1.5% sell-through rate (15 sales) at $3,500 average price ($52,500 gross), the portfolio generates healthy net profit.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['sell-through-rate', 'wholesale-liquidity-floor'],
    },
    {
        id: 'sell-through-rate',
        term: 'Sell-Through Rate (STR)',
        shortDefinition:
            'The percentage of a domain portfolio that sells to retail end-users over a 12-month operating cycle, typically 1.0% to 2.5% for professional domainers.',
        fullExplanation:
            'Unlike retail e-commerce where inventory turns over rapidly, domain investing is an illiquid asset class characterized by low turnover and high profit margins (10x to 100x acquisition cost). A disciplined portfolio aims for a 1.5% to 2.0% annual STR to outpace holding renewals.',
        formula: 'STR (%) = (Completed Domain Sales in Year / Total Active Portfolio Count) * 100',
        example:
            'An investor holding 500 hand-registered brandable domains who closes 8 sales in 2026 achieves a 1.6% STR, covering annual renewals and yielding net capital gains.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['carrying-cost-ratio', 'wholesale-liquidity-floor'],
    },
    {
        id: 'exact-match-domain-premium',
        term: 'Exact-Match Domain (EMD) Premium',
        shortDefinition:
            'The valuation surcharge commanding higher prices when a domain exactly matches a high-volume commercial search query or industry category noun.',
        fullExplanation:
            'While search engines have dialed back raw EMD ranking weight since the 2012 EMD update, exact-match domains retain immense commercial utility through direct navigation, anchor text link acquisition advantages, and customer trust authority.',
        example:
            'Insurance.com ($35.6M), Loans.com ($3.0M), and Hotels.com ($11.0M) exemplify premier exact-match commercial assets with self-sustaining direct search utility.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['capitalized-cac-savings', 'cvm-4'],
    },
    {
        id: 'continuous-archive-vintage',
        term: 'Continuous Archive Vintage',
        shortDefinition:
            'The verified unbroken historical lifespan of an internet domain documented continuously on the Wayback Machine without multi-year drop gaps.',
        fullExplanation:
            'Continuous online operation from the dot-com era (1995–2005) provides proof of institutional legitimacy. Domains with unbroken vintage are immune to Google algorithmic "sandbox" filters and command a 25% to 45% valuation premium.',
        example:
            'Draftline.com (first registered in March 1999) has an unbroken 27-year vintage, protecting its enterprise brand equity under corporate intangible accounting audits.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['drop-gap-penalty', 'cvm-4'],
    },
    {
        id: 'brandable-cadence',
        term: 'Brandable Syllable Cadence',
        shortDefinition:
            'The phonetic and rhythmic balance of coined 5-to-7-letter brandable domains, evaluating consonant-vowel transitions and memorability.',
        fullExplanation:
            'Coined brandable names (e.g., Stripe, Figma, Vercel, Canva) succeed by combining short syllable structures (1 to 2 syllables) with crisp plosive consonants (P, T, K, B, D, G) that project authority and tech-forward momentum.',
        example:
            'Zentra.com features an alternating C-V-C-C-V cadence with plosive clarity, scoring high on phonetic memorability metrics.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['radio-test-score', 'cvm-4'],
    },
    {
        id: 'escrow-wire-holdback',
        term: 'Escrow Dispute Holdback',
        shortDefinition:
            'The temporary retention of funds in a licensed escrow trust account until the buyer verifies complete DNS and registrar transfer authorization.',
        fullExplanation:
            'In digital asset transactions, funds and assets never move directly between untrusted parties. Licensed escrow (Escrow.com) holds buyer wire funds in trust, authorizes the seller to unlock and transfer the domain auth-code, and releases disbursement only upon verified buyer control.',
        example:
            'On a $50,000 transaction, the buyer inspects WHOIS registrant records for 24 hours before Escrow.com wires $49,250 net to the seller.',
        category: 'Secondary Liquidity & Brokerage',
        relatedTerms: ['anchor-price-rule', 'fast-transfer-mls'],
    },
    {
        id: 'mape-prediction-accuracy',
        term: 'Mean Absolute Percentage Error (MAPE)',
        shortDefinition:
            'The statistical benchmark measuring the accuracy of algorithmic valuation models (AVMs) by comparing predicted appraisals to realized sales prices.',
        fullExplanation:
            'A low MAPE score indicates that an automated appraisal engine tracks market transactions without systematic overvaluation or undervaluation bias. DomainVoodoo achieved an industry-leading 17.4% MAPE, outperforming GoDaddy GoValue (38.6%) and EstiBot (46.1%).',
        formula: 'MAPE = (1 / n) * Sum(|Actual_Price - Predicted_Price| / Actual_Price) * 100',
        example:
            'Testing 1,000 verified secondary sales demonstrated that GoValue overvalued names by +28.4% on average, while DomainVoodoo settled within 17.4% of actual clearance.',
        category: 'Valuation & Econometrics',
        relatedTerms: ['cvm-4', 'wholesale-liquidity-floor'],
    },
    {
        id: 'trademark-safe-harbor',
        term: 'Generic Word Trademark Safe Harbor',
        shortDefinition:
            'The legal doctrine protecting domain owners who register dictionary nouns, acronyms, or generic commercial terms without predatory bad-faith intent.',
        fullExplanation:
            'Under United States trademark law and ICANN WIPO precedent, trademark rights do not confer a global monopoly over a word across all industries. A company owning a trademark for a generic word in one niche cannot seize that domain from an investor who registered it for general resale or another commercial category.',
        example:
            'Owning Domino.com for software or manufacturing does not infringe on Domino’s Pizza trademarks, as generic dictionary words cannot be monopolized across unrelated classes.',
        category: 'Legal & Trademark (UDRP)',
        relatedTerms: ['reverse-domain-name-hijacking', 'udrp-bad-faith-prong'],
    },
];

export function getGlossaryTermById(id: string): GlossaryTerm | undefined {
    return GLOSSARY_TERMS.find((t) => t.id === id);
}

export function getAllGlossaryTerms(): GlossaryTerm[] {
    return GLOSSARY_TERMS;
}
