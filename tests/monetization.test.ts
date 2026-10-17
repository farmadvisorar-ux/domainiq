import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_MONETIZATION, monetizationSchema } from '../src/lib/monetization-schema';

test('empty affiliate list and two available ad boxes are valid', () => {
    assert.equal(monetizationSchema.safeParse(DEFAULT_MONETIZATION).success, true);
});
test('affiliate tracking query is preserved', () => {
    const settings = monetizationSchema.parse({ ...DEFAULT_MONETIZATION, affiliates: [{ name: 'Partner', description: '', url: 'https://example.com/?ref=owner&campaign=domain' }] });
    assert.equal(settings.affiliates[0]?.url, 'https://example.com/?ref=owner&campaign=domain');
});
test('unsafe URLs and embedded credentials cannot be published', () => {
    for (const url of ['javascript:alert(1)', 'http://example.com', 'https://user:password@example.com']) {
        assert.equal(monetizationSchema.safeParse({ ...DEFAULT_MONETIZATION, affiliates: [{ name: 'Partner', description: '', url }] }).success, false);
        assert.equal(monetizationSchema.safeParse({ ...DEFAULT_MONETIZATION, ads: DEFAULT_MONETIZATION.ads.map((ad) => ({ ...ad, checkoutUrl: url })) }).success, false);
    }
});
test('live ads need sponsor details and IDs cannot collide', () => {
    assert.equal(monetizationSchema.safeParse({ ...DEFAULT_MONETIZATION, ads: DEFAULT_MONETIZATION.ads.map((ad) => ({ ...ad, active: true })) }).success, false);
    assert.equal(monetizationSchema.safeParse({ ...DEFAULT_MONETIZATION, ads: [DEFAULT_MONETIZATION.ads[0], DEFAULT_MONETIZATION.ads[0]] }).success, false);
});
