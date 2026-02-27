import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Save, ChevronDown, ChevronRight, CheckCircle,
    AlertCircle, RefreshCw, Type, Image, Link2, Hash
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../lib/supabaseClient';

interface ContentRow {
    id: string;
    section_name: string;
    content_key: string;
    content_value: string;
    content_type: string;
    sort_order: number;
    updated_at: string;
}

type GroupedContent = Record<string, ContentRow[]>;

const SECTION_LABELS: Record<string, string> = {
    hero: '🎬 Hero',
    about: '👤 About',
    specializations: '⚡ Specializations',
    brands: '🏢 Brands',
    software: '🛠️ Software / Toolkit',
    experience: '💼 Experience',
    portfolio: '🎥 Portfolio Projects',
    reels: '📱 Reels / 9:16 Showcase',
    contact: '📧 Contact',
    footer: '📄 Footer',
    dj_hero: '🎧 DJ Hero',
    dj_about: '🎵 DJ About',
    dj_genres: '🎶 DJ Genres',
    dj_equipment: '🔧 DJ Equipment',
    dj_gigs: '🎤 DJ Gigs',
    dj_booking: '📅 DJ Booking',
    dj_available_for: '✅ DJ Available For',
};

const TYPE_ICON: Record<string, React.ReactNode> = {
    text: <Type size={14} />,
    image: <Image size={14} />,
    url: <Link2 size={14} />,
    number: <Hash size={14} />,
};

const ContentField: React.FC<{
    row: ContentRow;
    onChange: (id: string, value: string) => void;
    modified: boolean;
}> = ({ row, onChange, modified }) => {
    const isLong = row.content_value.length > 80;

    return (
        <div className={`p-4 rounded-xl border transition-all ${modified
                ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-slate-800/50 bg-slate-950/40 hover:border-slate-700'
            }`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-500">{TYPE_ICON[row.content_type] || TYPE_ICON.text}</span>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex-1">
                    {row.content_key}
                </label>
                <span className="text-[9px] font-mono text-slate-700 uppercase">
                    {row.content_type}
                </span>
                {modified && (
                    <span className="text-[9px] font-mono text-amber-400 uppercase">modified</span>
                )}
            </div>
            {isLong ? (
                <textarea
                    value={row.content_value}
                    onChange={(e) => onChange(row.id, e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-y"
                />
            ) : (
                <input
                    type="text"
                    value={row.content_value}
                    onChange={(e) => onChange(row.id, e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                />
            )}
        </div>
    );
};

const SectionCard: React.FC<{
    sectionName: string;
    rows: ContentRow[];
    onSave: (section: string, rows: ContentRow[]) => Promise<void>;
    onFieldChange: (id: string, value: string) => void;
    modifiedIds: Set<string>;
    savingSection: string | null;
    savedSection: string | null;
}> = ({ sectionName, rows, onSave, onFieldChange, modifiedIds, savingSection, savedSection }) => {
    const [expanded, setExpanded] = useState(false);
    const label = SECTION_LABELS[sectionName] || sectionName;
    const modifiedCount = rows.filter(r => modifiedIds.has(r.id)).length;
    const isSaving = savingSection === sectionName;
    const justSaved = savedSection === sectionName;

    return (
        <motion.div
            layout
            className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/20 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {expanded ? <ChevronDown size={18} className="text-slate-500" /> : <ChevronRight size={18} className="text-slate-500" />}
                    <h3 className="font-bold text-white text-base">{label}</h3>
                    <span className="text-[10px] font-mono text-slate-600">{rows.length} fields</span>
                    {modifiedCount > 0 && (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            {modifiedCount} changed
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {justSaved && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-green-400 flex items-center gap-1 text-xs"
                        >
                            <CheckCircle size={14} /> Saved
                        </motion.span>
                    )}
                </div>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-3">
                            {rows.sort((a, b) => a.sort_order - b.sort_order).map(row => (
                                <ContentField
                                    key={row.id}
                                    row={row}
                                    onChange={onFieldChange}
                                    modified={modifiedIds.has(row.id)}
                                />
                            ))}

                            {modifiedCount > 0 && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => onSave(sectionName, rows.filter(r => modifiedIds.has(r.id)))}
                                    disabled={isSaving}
                                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                                    className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save {modifiedCount} Change{modifiedCount > 1 ? 's' : ''}
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const AdminDashboard: React.FC = () => {
    const { email, token, logout } = useAdminAuth();
    const [allContent, setAllContent] = useState<ContentRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());
    const [savingSection, setSavingSection] = useState<string | null>(null);
    const [savedSection, setSavedSection] = useState<string | null>(null);

    const fetchAllContent = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('site_content')
                .select('*')
                .order('section_name')
                .order('sort_order');

            if (fetchError) throw fetchError;
            setAllContent(data || []);
            setModifiedIds(new Set());
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllContent();
    }, []);

    const handleFieldChange = (id: string, value: string) => {
        setAllContent(prev =>
            prev.map(row => row.id === id ? { ...row, content_value: value } : row)
        );
        setModifiedIds(prev => new Set(prev).add(id));
    };

    const handleSaveSection = async (sectionName: string, modifiedRows: ContentRow[]) => {
        if (!token) return;
        setSavingSection(sectionName);
        setSavedSection(null);

        try {
            for (const row of modifiedRows) {
                const { data, error } = await supabase.rpc('admin_update_content', {
                    p_token: token,
                    p_section_name: row.section_name,
                    p_content_key: row.content_key,
                    p_content_value: row.content_value,
                });

                if (error) throw error;
                if (data && !data.success) throw new Error(data.error);
            }

            // Remove saved IDs from modified set
            setModifiedIds(prev => {
                const next = new Set(prev);
                modifiedRows.forEach(r => next.delete(r.id));
                return next;
            });
            setSavedSection(sectionName);
            setTimeout(() => setSavedSection(null), 3000);
        } catch (err: any) {
            alert(`Save failed: ${err.message}`);
        } finally {
            setSavingSection(null);
        }
    };

    // Group content by section
    const grouped: GroupedContent = {};
    allContent.forEach(row => {
        if (!grouped[row.section_name]) grouped[row.section_name] = [];
        grouped[row.section_name].push(row);
    });

    const sectionOrder = Object.keys(SECTION_LABELS);
    const sortedSections = Object.keys(grouped).sort((a, b) => {
        const ai = sectionOrder.indexOf(a);
        const bi = sectionOrder.indexOf(b);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

    const totalModified = modifiedIds.size;

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="#/" className="text-xl font-bold tracking-tighter">
                            THIRU<span className="text-sky-500">.</span>CMS
                        </a>
                        {totalModified > 0 && (
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                {totalModified} unsaved changes
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 text-xs hidden sm:block">{email}</span>
                        <button
                            onClick={fetchAllContent}
                            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                            title="Refresh content"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Content Manager</h1>
                    <p className="text-slate-500 text-sm">
                        Edit website content below. Changes are saved per section.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedSections.map(section => (
                            <SectionCard
                                key={section}
                                sectionName={section}
                                rows={grouped[section]}
                                onSave={handleSaveSection}
                                onFieldChange={handleFieldChange}
                                modifiedIds={modifiedIds}
                                savingSection={savingSection}
                                savedSection={savedSection}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
