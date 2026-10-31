export function formatUsd(value: number): string {
    if (value >= 1_000_000_000) {
        const inB = value / 1_000_000_000;
        return `$${inB >= 10 ? Math.round(inB) : inB.toFixed(1).replace(/\.0$/, '')}B`;
    }
    if (value >= 1_000_000) {
        const inM = value / 1_000_000;
        return `$${inM >= 10 ? Math.round(inM) : inM.toFixed(1).replace(/\.0$/, '')}M`;
    }
    if (value >= 1_000) {
        return `$${Math.round(value / 1000)}K`;
    }
    return `$${Math.round(value).toLocaleString()}`;
}

export function formatUsdExact(value: number): string {
    return `$${Math.round(value).toLocaleString()}`;
}
