#!/usr/bin/env node
/**
 * DomainVoodoo CVM-4 Open CLI Appraiser
 * Zero-dependency command-line utility for deterministic domain valuation.
 * Endpoint: https://prstuvw.xyz/api/v1/valuate
 *
 * Usage:
 *   node valuate-cli.mjs voice.com
 *   node valuate-cli.mjs voice.com --json
 */

const args = process.argv.slice(2);
const domainArg = args.find((a) => !a.startsWith('--'));
const wantJson = args.includes('--json');

if (!domainArg) {
    console.log('Usage: node valuate-cli.mjs <domain.tld> [--json]');
    console.log('Example: node valuate-cli.mjs voice.com');
    process.exit(1);
}

const cleanDomain = domainArg.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
const endpoint = `https://prstuvw.xyz/api/v1/valuate?domain=${encodeURIComponent(cleanDomain)}${wantJson ? '' : '&format=markdown'}`;

async function main() {
    const res = await fetch(endpoint, {
        headers: {
            Accept: wantJson ? 'application/json' : 'text/markdown',
            'User-Agent': 'DomainVoodoo-CLI/1.0 (+https://prstuvw.xyz)',
        },
    });

    if (!res.ok) {
        console.error(`Error (${res.status}): Failed to appraise ${cleanDomain}`);
        process.exit(1);
    }

    const text = await res.text();
    console.log(text);
}

main().catch((err) => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});
