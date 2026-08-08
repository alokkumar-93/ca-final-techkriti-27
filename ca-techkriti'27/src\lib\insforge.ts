import { createClient } from '@insforge/sdk';

export const INSFORGE_BASE_URL = 'https://b4rq2cy5.ap-southeast.insforge.app';
export const INSFORGE_API_KEY = 'ik_f374da86ec84b3a265a72356f019cbcf';

export const insforge = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_API_KEY,
});
