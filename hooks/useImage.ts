import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Module-level cache to prevent re-fetching
const imageCache = new Map<string, string>();

/**
 * Hook to lazily fetch a single image.
 * - For Supabase Storage paths (starting with 'storage/'): generates a public URL.
 * - For external URLs (http/https): returns as-is.
 * - For local paths (starting with '/'): returns as-is.
 */
export const useImage = (path: string | undefined | null) => {
    const [src, setSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!path) {
            setLoading(false);
            return;
        }

        // Check cache first
        const cached = imageCache.get(path);
        if (cached) {
            setSrc(cached);
            setLoading(false);
            return;
        }

        // External URLs or local paths - use directly
        if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) {
            imageCache.set(path, path);
            setSrc(path);
            setLoading(false);
            return;
        }

        // Supabase Storage path (format: bucket/path/to/file)
        const fetchFromStorage = async () => {
            try {
                setLoading(true);
                const parts = path.split('/');
                const bucket = parts[0];
                const filePath = parts.slice(1).join('/');

                const { data } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(filePath);

                const url = data.publicUrl;
                imageCache.set(path, url);
                setSrc(url);
                setError(null);
            } catch (err: any) {
                console.error('Failed to load image:', path, err);
                setError(err.message || 'Failed to load image');
            } finally {
                setLoading(false);
            }
        };

        fetchFromStorage();
    }, [path]);

    return { src, loading, error };
};
