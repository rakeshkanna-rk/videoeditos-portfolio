import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Save, ChevronDown, ChevronRight, CheckCircle,
    AlertCircle, RefreshCw, Type, Image, Link2, Hash,
    Upload, Trash2, Copy, Plus, X, FolderOpen, FileImage,
    Briefcase, Palette, Wrench, Music, Star
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../lib/supabaseClient';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
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
type AdminTab = 'content' | 'assets' | 'lists';

interface StorageFile {
    name: string;
    id: string;
    created_at: string;
    metadata: Record<string, any> | null;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
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

const STORAGE_URL = 'https://cajlytwvnnzaiiuxihjl.supabase.co/storage/v1/object/public/assets/';

const LIST_SECTIONS = [
    {
        section: 'specializations',
        label: '⚡ Specializations',
        icon: <Star size={18} />,
        prefix: 'spec_',
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'desc', label: 'Description', type: 'text' },
            { key: 'icon', label: 'Icon Name', type: 'text' },
        ],
    },
    {
        section: 'brands',
        label: '🏢 Brands',
        icon: <Briefcase size={18} />,
        prefix: 'brand_',
        fields: [
            { key: 'name', label: 'Brand Name', type: 'text' },
            { key: 'logo', label: 'Logo URL', type: 'image' },
        ],
    },
    {
        section: 'software',
        label: '🛠️ Software / Tools',
        icon: <Wrench size={18} />,
        prefix: 'sw_',
        fields: [
            { key: 'name', label: 'Tool Name', type: 'text' },
            { key: 'icon', label: 'Icon URL', type: 'image' },
            { key: 'level', label: 'Skill Level (0-100)', type: 'number' },
        ],
    },
    {
        section: 'experience',
        label: '💼 Experience',
        icon: <Palette size={18} />,
        prefix: 'exp_',
        fields: [
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'company', label: 'Company', type: 'text' },
            { key: 'period', label: 'Period', type: 'text' },
            { key: 'desc', label: 'Description', type: 'text' },
        ],
    },
    {
        section: 'dj_gigs',
        label: '🎤 DJ Gigs',
        icon: <Music size={18} />,
        prefix: 'gig_',
        fields: [
            { key: 'title', label: 'Gig Title', type: 'text' },
            { key: 'location', label: 'Location', type: 'text' },
            { key: 'type', label: 'Type', type: 'text' },
        ],
    },
];

// ─────────────────────────────────────────────
// CONTENT TAB — FIELD COMPONENT
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// CONTENT TAB — SECTION CARD
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// ASSETS TAB
// ─────────────────────────────────────────────
const AssetsTab: React.FC = () => {
    const [files, setFiles] = useState<StorageFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchFiles = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.storage.from('assets').list('', {
            limit: 200,
            sortBy: { column: 'created_at', order: 'desc' },
        });
        if (!error && data) {
            setFiles(data.filter(f => f.name !== '.emptyFolderPlaceholder') as StorageFile[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => { fetchFiles(); }, [fetchFiles]);

    const handleUpload = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;
        setUploading(true);
        for (const file of Array.from(fileList)) {
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
            await supabase.storage.from('assets').upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });
        }
        setUploading(false);
        fetchFiles();
    };

    const handleDelete = async (fileName: string) => {
        await supabase.storage.from('assets').remove([fileName]);
        setDeleteConfirm(null);
        fetchFiles();
    };

    const copyUrl = (fileName: string) => {
        const url = `${STORAGE_URL}${fileName}`;
        navigator.clipboard.writeText(url);
        setCopiedUrl(fileName);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${dragOver
                    ? 'border-sky-400 bg-sky-500/10 scale-[1.02]'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-900/30'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files)}
                />
                <div className="flex flex-col items-center gap-3">
                    {uploading ? (
                        <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                    ) : (
                        <Upload size={32} className={dragOver ? 'text-sky-400' : 'text-slate-500'} />
                    )}
                    <div>
                        <p className="text-white font-semibold">
                            {uploading ? 'Uploading...' : 'Drop images here or click to upload'}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            JPG, PNG, WebP, GIF, SVG — Max 10MB
                        </p>
                    </div>
                </div>
            </div>

            {/* File Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                    <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
                    <p>No assets uploaded yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {files.map((file) => (
                        <motion.div
                            key={file.id || file.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group relative bg-slate-900/50 border border-slate-800/60 rounded-xl overflow-hidden"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-square bg-slate-950 flex items-center justify-center overflow-hidden">
                                <img
                                    src={`${STORAGE_URL}${file.name}`}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.innerHTML =
                                            '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-700"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>';
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <p className="text-white text-xs font-medium truncate" title={file.name}>
                                    {file.name}
                                </p>
                                <p className="text-slate-600 text-[10px] mt-0.5">
                                    {file.metadata ? formatSize(file.metadata.size) : '—'}
                                </p>
                            </div>

                            {/* Actions overlay */}
                            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); copyUrl(file.name); }}
                                    className="p-2.5 bg-sky-500 hover:bg-sky-400 rounded-xl text-white transition-colors"
                                    title="Copy URL"
                                >
                                    {copiedUrl === file.name ? <CheckCircle size={16} /> : <Copy size={16} />}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (deleteConfirm === file.name) {
                                            handleDelete(file.name);
                                        } else {
                                            setDeleteConfirm(file.name);
                                            setTimeout(() => setDeleteConfirm(null), 3000);
                                        }
                                    }}
                                    className={`p-2.5 rounded-xl text-white transition-colors ${deleteConfirm === file.name
                                        ? 'bg-red-600 hover:bg-red-500'
                                        : 'bg-slate-700 hover:bg-red-600'
                                        }`}
                                    title={deleteConfirm === file.name ? 'Click again to confirm' : 'Delete'}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Copy confirmation toast */}
                            <AnimatePresence>
                                {copiedUrl === file.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full"
                                    >
                                        Copied!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// LISTS TAB — ITEM CARD
// ─────────────────────────────────────────────
interface ListItem {
    index: number;
    fields: Record<string, string>;
}

const ListItemCard: React.FC<{
    item: ListItem;
    fieldDefs: { key: string; label: string; type: string }[];
    onFieldChange: (index: number, fieldKey: string, value: string) => void;
    onDelete: (index: number) => void;
    deleting: boolean;
}> = ({ item, fieldDefs, onFieldChange, onDelete, deleting }) => (
    <div className="p-4 bg-slate-950/40 border border-slate-800/50 rounded-xl space-y-3 relative group">
        <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Item #{item.index}
            </span>
            <button
                onClick={() => onDelete(item.index)}
                disabled={deleting}
                className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete item"
            >
                {deleting ? (
                    <div className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                ) : (
                    <Trash2 size={14} />
                )}
            </button>
        </div>
        {fieldDefs.map((fd) => (
            <div key={fd.key}>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1 block">
                    {fd.label}
                </label>
                <input
                    type={fd.type === 'number' ? 'number' : 'text'}
                    value={item.fields[fd.key] || ''}
                    onChange={(e) => onFieldChange(item.index, fd.key, e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                    placeholder={fd.label}
                />
            </div>
        ))}
    </div>
);

// ─────────────────────────────────────────────
// LISTS TAB — SECTION MANAGER
// ─────────────────────────────────────────────
const ListSectionManager: React.FC<{
    config: typeof LIST_SECTIONS[number];
    token: string;
    refreshContent: () => Promise<void>;
    allContent: ContentRow[];
}> = ({ config, token, refreshContent, allContent }) => {
    const [expanded, setExpanded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);
    const [localItems, setLocalItems] = useState<ListItem[]>([]);
    const [modified, setModified] = useState(false);

    // Parse items from allContent for this section
    useEffect(() => {
        const sectionRows = allContent.filter(r => r.section_name === config.section);
        const indices = new Set<number>();
        sectionRows.forEach(row => {
            const match = row.content_key.match(new RegExp(`^${config.prefix}(\\d+)_`));
            if (match) indices.add(parseInt(match[1]));
        });

        const sortedIndices = Array.from(indices).sort((a, b) => a - b);
        const items: ListItem[] = sortedIndices.map(idx => {
            const fields: Record<string, string> = {};
            config.fields.forEach(fd => {
                const found = sectionRows.find(r => r.content_key === `${config.prefix}${idx}_${fd.key}`);
                fields[fd.key] = found?.content_value || '';
            });
            return { index: idx, fields };
        });

        setLocalItems(items);
        setModified(false);
    }, [allContent, config]);

    const handleFieldChange = (index: number, fieldKey: string, value: string) => {
        setLocalItems(prev =>
            prev.map(item =>
                item.index === index
                    ? { ...item, fields: { ...item.fields, [fieldKey]: value } }
                    : item
            )
        );
        setModified(true);
    };

    const handleAddItem = () => {
        const maxIndex = localItems.length > 0 ? Math.max(...localItems.map(i => i.index)) : 0;
        const newIndex = maxIndex + 1;
        const fields: Record<string, string> = {};
        config.fields.forEach(fd => { fields[fd.key] = ''; });
        setLocalItems(prev => [...prev, { index: newIndex, fields }]);
        setModified(true);
    };

    const handleDeleteItem = async (index: number) => {
        setDeleting(index);
        try {
            // Delete from DB
            const { data, error } = await supabase.rpc('admin_delete_content', {
                p_token: token,
                p_section_name: config.section,
                p_key_prefix: `${config.prefix}${index}_`,
            });
            if (error) throw error;
            if (data && !data.success) throw new Error(data.error);

            // Remove from local state
            setLocalItems(prev => prev.filter(i => i.index !== index));
            await refreshContent();
        } catch (err: any) {
            alert(`Delete failed: ${err.message}`);
        } finally {
            setDeleting(null);
        }
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setSaved(false);

        try {
            // For each item, upsert all fields
            for (const item of localItems) {
                for (const fd of config.fields) {
                    const contentKey = `${config.prefix}${item.index}_${fd.key}`;
                    const value = item.fields[fd.key] || '';
                    const sortOrder = (item.index - 1) * config.fields.length + config.fields.indexOf(fd);

                    // Try update first
                    const { data: updateData, error: updateError } = await supabase.rpc('admin_update_content', {
                        p_token: token,
                        p_section_name: config.section,
                        p_content_key: contentKey,
                        p_content_value: value,
                    });

                    // If update found no row, insert it
                    if (!updateError && updateData && !updateData.success && updateData.error === 'Content key not found') {
                        const { error: insertError } = await supabase.rpc('admin_insert_content', {
                            p_token: token,
                            p_section_name: config.section,
                            p_content_key: contentKey,
                            p_content_value: value,
                            p_content_type: fd.type === 'number' ? 'number' : fd.type === 'image' ? 'image' : 'text',
                            p_sort_order: sortOrder,
                        });
                        if (insertError) throw insertError;
                    } else if (updateError) {
                        throw updateError;
                    }
                }
            }

            await refreshContent();
            setModified(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            alert(`Save failed: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div layout className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/20 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {expanded ? <ChevronDown size={18} className="text-slate-500" /> : <ChevronRight size={18} className="text-slate-500" />}
                    <span className="text-slate-400">{config.icon}</span>
                    <h3 className="font-bold text-white text-base">{config.label}</h3>
                    <span className="text-[10px] font-mono text-slate-600">{localItems.length} items</span>
                    {modified && (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            unsaved
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {saved && (
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
                            {/* Add button */}
                            <button
                                onClick={handleAddItem}
                                className="w-full border-2 border-dashed border-slate-700 hover:border-sky-500/50 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-500 hover:text-sky-400 transition-all"
                            >
                                <Plus size={16} />
                                <span className="text-sm font-medium">Add {config.label.replace(/[^\w\s]/g, '').trim()}</span>
                            </button>

                            {localItems.map((item) => (
                                <ListItemCard
                                    key={item.index}
                                    item={item}
                                    fieldDefs={config.fields}
                                    onFieldChange={handleFieldChange}
                                    onDelete={handleDeleteItem}
                                    deleting={deleting === item.index}
                                />
                            ))}

                            {/* Save button */}
                            {modified && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={handleSaveAll}
                                    disabled={saving}
                                    whileHover={{ scale: saving ? 1 : 1.02 }}
                                    whileTap={{ scale: saving ? 1 : 0.98 }}
                                    className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save All Changes
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

// ─────────────────────────────────────────────
// LISTS TAB
// ─────────────────────────────────────────────
const ListsTab: React.FC<{
    token: string;
    allContent: ContentRow[];
    refreshContent: () => Promise<void>;
}> = ({ token, allContent, refreshContent }) => (
    <div className="space-y-3">
        {LIST_SECTIONS.map(config => (
            <ListSectionManager
                key={config.section}
                config={config}
                token={token}
                refreshContent={refreshContent}
                allContent={allContent}
            />
        ))}
    </div>
);

// ─────────────────────────────────────────────
// TAB BUTTON
// ─────────────────────────────────────────────
const TAB_INFO: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'content', label: 'Content', icon: <Type size={16} /> },
    { key: 'assets', label: 'Assets', icon: <FileImage size={16} /> },
    { key: 'lists', label: 'Lists', icon: <FolderOpen size={16} /> },
];

// ─────────────────────────────────────────────
// MAIN ADMIN DASHBOARD
// ─────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
    const { email, token, logout } = useAdminAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('content');
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
                        {totalModified > 0 && activeTab === 'content' && (
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

            {/* Tab Navigation */}
            <div className="sticky top-[73px] z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/40">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex gap-1">
                        {TAB_INFO.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all ${activeTab === tab.key
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="activeAdminTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* ── CONTENT TAB ── */}
                        {activeTab === 'content' && (
                            <>
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
                            </>
                        )}

                        {/* ── ASSETS TAB ── */}
                        {activeTab === 'assets' && (
                            <>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">Asset Manager</h1>
                                    <p className="text-slate-500 text-sm">
                                        Upload, browse, and manage your images. Copy URLs to use in content fields.
                                    </p>
                                </div>
                                <AssetsTab />
                            </>
                        )}

                        {/* ── LISTS TAB ── */}
                        {activeTab === 'lists' && (
                            <>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">List Manager</h1>
                                    <p className="text-slate-500 text-sm">
                                        Add, edit, or remove items from specializations, brands, tools, experience, and gigs.
                                    </p>
                                </div>
                                {loading ? (
                                    <div className="flex items-center justify-center py-24">
                                        <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <ListsTab
                                        token={token!}
                                        allContent={allContent}
                                        refreshContent={fetchAllContent}
                                    />
                                )}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
