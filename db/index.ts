import {env} from 'cloudflare:workers';
export function isInterestStorageConfigured(){return Boolean((env as unknown as {DB?:D1Database}).DB)}
export async function getRawDb(){const db=(env as unknown as {DB?:D1Database}).DB;if(!db)throw new Error('Interest storage is not configured.');return db;}
