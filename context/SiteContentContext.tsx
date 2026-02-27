import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ContentItem {
    key: string;
    value: string;
    type: string;
    sort_order: number;
}

interface SiteContent {
    [section: string]: ContentItem[];
}

interface SiteContentContextType {
    content: SiteContent | null;
    loading: boolean;
    error: string | null;
    getVal: (section: string, key: string) => string;
    getList: (section: string, prefix: string, fields: string[]) => Record<string, string>[];
    refetch: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
    content: null,
    loading: true,
    error: null,
    getVal: () => '',
    getList: () => [],
    refetch: async () => { },
});

export const useSiteContent = () => useContext(SiteContentContext);

export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContent = async () => {
        const maxRetries = 3;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                setLoading(true);
                const { data, error: rpcError } = await supabase.rpc('get_site_content');
                if (rpcError) throw rpcError;
                setContent(data as SiteContent);
                setError(null);
                return; // Success — exit
            } catch (err: any) {
                console.error(`Fetch attempt ${attempt + 1}/${maxRetries} failed:`, err);
                if (attempt === maxRetries - 1) {
                    setError(err.message || 'Failed to load content');
                } else {
                    await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
                }
            } finally {
                if (attempt === maxRetries - 1) setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const getVal = (section: string, key: string): string => {
        if (!content || !content[section]) return '';
        const item = content[section].find((i: ContentItem) => i.key === key);
        return item?.value || '';
    };

    /**
     * Extract a numbered list from content.
     * E.g., getList('experience', 'exp_', ['role', 'company', 'period', 'desc'])
     * returns [{role: '...', company: '...', ...}, ...]
     */
    const getList = (section: string, prefix: string, fields: string[]): Record<string, string>[] => {
        if (!content || !content[section]) return [];
        const items = content[section];

        // Find the max index by scanning keys like prefix + "1_" + field
        const indices = new Set<number>();
        items.forEach((item: ContentItem) => {
            const match = item.key.match(new RegExp(`^${prefix}(\\d+)_`));
            if (match) indices.add(parseInt(match[1]));
        });

        const sortedIndices = Array.from(indices).sort((a, b) => a - b);

        return sortedIndices.map(idx => {
            const record: Record<string, string> = {};
            fields.forEach(field => {
                const found = items.find((i: ContentItem) => i.key === `${prefix}${idx}_${field}`);
                record[field] = found?.value || '';
            });
            return record;
        });
    };

    return (
        <SiteContentContext.Provider value={{ content, loading, error, getVal, getList, refetch: fetchContent }}>
            {children}
        </SiteContentContext.Provider>
    );
};
