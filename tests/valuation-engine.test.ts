import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateDomain } from '../src/lib/valuation/engine';
import { classifyStructuralArchetype } from '../src/lib/valuation/structural-classifier';
import { computeEconomicArbitrage } from '../src/lib/valuation/economic-arbitrage';

test('Structural Classifier correctly identifies investor asset archetypes', () => {
    // Apex Sovereign Brand Flagship
    const archApexFlagship = classifyStructuralArchetype('youtube', 'com');
    assert.equal(archApexFlagship.key, 'APEX_GLOBAL_BRAND_FLAGSHIP');
    assert.equal(archApexFlagship.rarity, 'Generational Scarcity');
    assert(archApexFlagship.marketFloorUsd >= 500_000_000);

    // 1L .com
    const arch1L = classifyStructuralArchetype('z', 'com');
    assert.equal(arch1L.key, 'APEX_1L_COM');
    assert.equal(arch1L.rarity, 'Generational Scarcity');
    assert.equal(arch1L.totalPossibleUniverse, 26);
    assert(arch1L.marketFloorUsd >= 10_000_000);

    // 2L .com
    const arch2L = classifyStructuralArchetype('ai', 'com');
    assert.equal(arch2L.key, 'APEX_2L_COM');
    assert.equal(arch2L.totalPossibleUniverse, 676);
    assert(arch2L.marketFloorUsd >= 500_000);

    // 3L .com
    const arch3L = classifyStructuralArchetype('nxs', 'com');
    assert.equal(arch3L.key, 'APEX_3L_COM');
    assert.equal(arch3L.totalPossibleUniverse, 17576);
    assert(arch3L.marketFloorUsd >= 30_000);

    // 4L CVCV .com
    const archCVCV = classifyStructuralArchetype('boba', 'com');
    assert.equal(archCVCV.key, '4L_CVCV_COM');
    assert(archCVCV.marketFloorUsd >= 15_000);

    // Single dictionary word apex
    const archApex = classifyStructuralArchetype('insurance', 'com');
    assert.equal(archApex.key, '1WORD_APEX_DICTIONARY');
    assert(archApex.marketFloorUsd >= 250_000);

    // 2-word power brandable
    const archPower = classifyStructuralArchetype('smartpay', 'com');
    assert.equal(archPower.key, '2WORD_POWER_BRANDABLE');

    // Hyphenated penalty
    const archHyphen = classifyStructuralArchetype('best-car-insurance', 'com');
    assert.equal(archHyphen.key, 'HYPHENATED_PENALTY');
    assert(archHyphen.structuralMultiplier < 0.5);
});

test('Economic Arbitrage accurately computes CAC savings and capitalized value', () => {
    // High-intent finance keyword
    const ecoFinance = computeEconomicArbitrage({
        label: 'insurance',
        tld: 'com',
        category: 'finance',
        isSingleWord: true,
        compositionScore: 100,
        charCount: 9,
    });

    assert(ecoFinance.estimatedCpcUsd >= 30.0);
    assert(ecoFinance.annualMarketingAvoidanceUsd > 50_000);
    assert(ecoFinance.capitalizedAssetValueUsd >= 500_000);
    assert.equal(ecoFinance.commercialIntentGrade, 'Tier-1 Institutional (High CPC)');
    assert(ecoFinance.conversionTrustLiftPercent >= 25);
});

test('Consensus Valuation Engine triangulates multi-model valuation correctly', async () => {
    // Test a liquid 3L .com
    const res3L = await evaluateDomain('nxs.com', {
        lookupAge: false,
        lookupArchive: false,
        checkTrademark: false,
    });

    assert.equal(res3L.domain, 'nxs.com');
    assert.equal(res3L.structuralArchetype.key, 'APEX_3L_COM');
    assert(res3L.midUsd >= 35_000, `Expected 3L .com to meet or exceed market floor, got ${res3L.midUsd}`);
    assert(res3L.triangulation.modelAgreementScore >= 50);
    assert(res3L.valuationLedger.length >= 2);
    assert.equal(res3L.liquidity.rating, 'Ultra-Liquid');
});

test('Consensus Valuation Engine correctly honors exact benchmark sales', async () => {
    const resExact = await evaluateDomain('voice.com', {
        lookupAge: false,
        lookupArchive: false,
        checkTrademark: false,
    });

    assert.equal(resExact.domain, 'voice.com');
    assert(resExact.exactComp !== null);
    assert.equal(resExact.exactComp?.sale_price_usd, 30_000_000);
    assert.equal(resExact.midUsd, 30_000_000);
    assert.equal(resExact.confidence, 'high');
});

test('Consensus Valuation Engine applies appropriate discipline to long-tail domains', async () => {
    const resLongTail = await evaluateDomain('affordablewebdesignco.com', {
        lookupAge: false,
        lookupArchive: false,
        checkTrademark: false,
    });

    assert(resLongTail.midUsd < 5_000, `Expected long-tail domain under $5,000, got ${resLongTail.midUsd}`);
    assert(resLongTail.lowUsd < resLongTail.midUsd);
    assert(resLongTail.highUsd > resLongTail.midUsd);
});

test('Consensus Valuation Engine correctly recognizes Apex Global Sovereign Brand assets', async () => {
    const yt = await evaluateDomain('youtube.com', {
        lookupAge: false,
        lookupArchive: false,
    });

    assert.equal(yt.domain, 'youtube.com');
    assert.equal(yt.structuralArchetype.key, 'APEX_GLOBAL_BRAND_FLAGSHIP');
    assert.equal(yt.trademark.isSovereignBrand, true);
    assert.equal(yt.trademark.riskLevel, 'low');
    assert.equal(yt.trademark.udrpRiskScore, 0);
    assert.equal(yt.liquidity.rating, 'Ultra-Liquid');
    assert.equal(yt.confidence, 'high');
    assert.equal(yt.confidenceScore, 99);
    assert(yt.midUsd >= 500_000_000, `Expected youtube.com to be worth $500M+, got ${yt.midUsd}`);
});

test('Consensus Valuation Engine correctly dampens slang keyword compounds vs sovereign brands', async () => {
    const da = await evaluateDomain('darealty.com', {
        lookupAge: false,
        lookupArchive: false,
    });

    const yt = await evaluateDomain('youtube.com', {
        lookupAge: false,
        lookupArchive: false,
    });

    assert(da.midUsd < 10_000, `Expected darealty.com under $10,000, got ${da.midUsd}`);
    assert(yt.midUsd > 500_000_000, `Expected youtube.com over $500,000,000, got ${yt.midUsd}`);
    assert(yt.midUsd > da.midUsd * 10_000, 'youtube.com must be worth orders of magnitude more than darealty.com');
});

test('Consensus Valuation Engine severely penalizes third-party trademark infringers on secondary TLDs', async () => {
    const ytNet = await evaluateDomain('youtube.net', {
        lookupAge: false,
        lookupArchive: false,
    });

    assert.equal(ytNet.trademark.riskLevel, 'severe');
    assert(ytNet.trademark.udrpRiskScore >= 90);
    assert(ytNet.midUsd < 5_000, `Expected infringing domain to suffer severe haircut, got ${ytNet.midUsd}`);
});
