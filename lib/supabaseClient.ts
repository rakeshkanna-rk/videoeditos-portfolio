import { createClient } from '@supabase/supabase-js';
/**
 * Custom fetch with retry logic to handle intermittent Cloudflare 525 SSL errors.
 * Retries up to 3 times with exponential backoff.
 */
const fetchWithRetry = async (
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> => {
    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(input, init);
            // Retry on Cloudflare 525 (SSL Handshake Failed)
            if (response.status === 525 && attempt < maxRetries - 1) {
                await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
                continue;
            }
            return response;
        } catch (err) {
            if (attempt === maxRetries - 1) throw err;
            // Wait before retrying on network errors
            await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        }
    }
    // Fallback (should never reach here)
    return fetch(input, init);
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { fetch: fetchWithRetry },
});
