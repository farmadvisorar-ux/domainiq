import { getPool } from './db';
import { DEFAULT_MONETIZATION, monetizationSchema, type MonetizationSettings } from './monetization-schema';

async function settingsTable() {
    const pool = getPool();
    await pool.query(`CREATE TABLE IF NOT EXISTS monetization_settings (
        id integer PRIMARY KEY CHECK (id = 1), settings jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
    )`);
    return pool;
}
export async function readMonetization(): Promise<MonetizationSettings> {
    const pool = await settingsTable();
    const { rows } = await pool.query('SELECT settings FROM monetization_settings WHERE id = 1');
    return rows[0] ? monetizationSchema.parse(rows[0].settings) : DEFAULT_MONETIZATION;
}
export async function saveMonetization(settings: MonetizationSettings) {
    const pool = await settingsTable();
    await pool.query(`INSERT INTO monetization_settings (id, settings) VALUES (1, $1::jsonb)
        ON CONFLICT (id) DO UPDATE SET settings = EXCLUDED.settings, updated_at = now()`, [JSON.stringify(settings)]);
}
