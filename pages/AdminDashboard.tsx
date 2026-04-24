import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Save, ChevronDown, ChevronRight, CheckCircle,
    AlertCircle, RefreshCw, Type, Image as ImageIcon, Link2, Hash,
    Plus, Trash2, Upload, GripVertical, Zap, Clock,
    Settings, LayoutDashboard, Briefcase, Film, User, Mail,
    Globe, Smartphone, Music, Mic, Wrench, Calendar, CheckSquare,
    X, Search, Copy, ExternalLink, FileText, Video as VideoIcon
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../lib/supabaseClient';

interface ContentRow {
    id: string;
    section_name: string;
    key: string;
    value: string;
    type: string;
    sort_order: number;
    updated_at: string;
}

type GroupedContent = Record<string, ContentRow[]>;

const SECTION_LABELS: Record<string, string> = {
    hero: '🎬 Hero',
    about: '👤 About',
    specializations: '⚡ Expert Areas',
    brands: '🏢 Brand Marks',
    software: '🛠️ Tool Kit',
    experience: '💼 Timeline',
    portfolio: '🎥 Works (16:9)',
    reels: '📱 Works (9:16)',
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

const TAB_GROUPS = {
    editor: [
        { id: 'hero', label: 'Hero', icon: LayoutDashboard },
        { id: 'about', label: 'About', icon: User },
        { id: 'specializations', label: 'Expert Areas', icon: Zap },
        { id: 'brands', label: 'Brand Marks', icon: Globe },
        { id: 'software', label: 'Tool Kit', icon: Wrench },
        { id: 'experience', label: 'Timeline', icon: Clock },
        { id: 'portfolio', label: 'Works (16:9)', icon: Briefcase },
        { id: 'reels', label: 'Works (9:16)', icon: Film },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'footer', label: 'Footer', icon: Settings },
    ],
    dj: [
        { id: 'dj_hero', label: 'DJ Hero', icon: Music },
        { id: 'dj_about', label: 'DJ About', icon: User },
        { id: 'dj_genres', label: 'DJ Genres', icon: Mic },
        { id: 'dj_equipment', label: 'DJ Equipment', icon: Wrench },
        { id: 'dj_gigs', label: 'DJ Gigs', icon: Calendar },
        { id: 'dj_booking', label: 'DJ Booking', icon: Mail },
        { id: 'dj_available_for', label: 'Availability', icon: CheckSquare },
    ]
};

const LIST_CONFIGS: Record<string, { prefix: string; fields: { key: string; label: string; type: string }[] }> = {
    specializations: {
        prefix: 'spec_',
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'desc', label: 'Description', type: 'text' },
            { key: 'icon', label: 'Icon (URL or Lucide name)', type: 'image' },
        ]
    },
    brands: {
        prefix: 'brand_',
        fields: [
            { key: 'name', label: 'Brand Name', type: 'text' },
            { key: 'logo', label: 'Logo URL', type: 'image' },
        ]
    },
    software: {
        prefix: 'soft_',
        fields: [
            { key: 'name', label: 'Software Name', type: 'text' },
            { key: 'icon', label: 'Icon URL/Upload', type: 'image' },
        ]
    },
    experience: {
        prefix: 'exp_',
        fields: [
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'company', label: 'Company', type: 'text' },
            { key: 'period', label: 'Period', type: 'text' },
            { key: 'desc', label: 'Description', type: 'text' },
        ]
    },
    portfolio: {
        prefix: 'proj_',
        fields: [
            { key: 'title', label: 'Project Title', type: 'text' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'thumbnail', label: 'Thumbnail URL', type: 'image' },
            { key: 'video', label: 'Video URL', type: 'url' },
        ]
    },
    reels: {
        prefix: 'reel_',
        fields: [
            { key: 'title', label: 'Reel Title', type: 'text' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'thumbnail', label: 'Thumbnail URL', type: 'image' },
            { key: 'video', label: 'Video URL', type: 'url' },
        ]
    },
    dj_gigs: {
        prefix: 'gig_',
        fields: [
            { key: 'title', label: 'Event Name', type: 'text' },
            { key: 'location', label: 'Location', type: 'text' },
            { key: 'type', label: 'Type', type: 'text' },
        ]
    },
    dj_genres: {
        prefix: 'genre_',
        fields: [
            { key: 'name', label: 'Genre Name', type: 'text' },
            { key: 'icon', label: 'Icon (Lucide Name)', type: 'text' },
        ]
    },
    dj_equipment: {
        prefix: 'equip_',
        fields: [
            { key: 'name', label: 'Gear Name', type: 'text' },
            { key: 'desc', label: 'Description', type: 'text' },
        ]
    }
};

const TYPE_ICON: Record<string, React.ReactNode> = {
    text: <Type size={14} />,
    image: <ImageIcon size={14} />,
    url: <Link2 size={14} />,
    number: <Hash size={14} />,
};



const COMMON_ICONS = [
    'Film', 'Video', 'Camera', 'Layers', 'Monitor', 'Smartphone', 'Scissors', 'Zap', 
    'Award', 'Star', 'User', 'Mail', 'Link', 'Instagram', 'Linkedin', 'Github',
    'Play', 'Music', 'Mic', 'Headphones', 'Disc', 'Radio', 'Search', 'Globe',
    'Heart', 'Smile', 'Settings', 'Shield', 'Target', 'Cpu', 'Box', 'Compass'
];

const MediaLibrary: React.FC<{
    onClose: () => void;
}> = ({ onClose }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copying, setCopying] = useState<string | null>(null);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.storage.from('content').list('uploads');
            if (error) throw error;
            // Filter out folders and placeholders
            setFiles(data?.filter(f => f.metadata) || []);
        } catch (err: any) {
            alert(`Failed to fetch files: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDeleteFile = async (name: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            const { data, error } = await supabase.storage.from('content').remove([`uploads/${name}`]);
            if (error) throw error;
            
            if (data && data.length > 0) {
                alert('File deleted successfully');
                await fetchFiles();
            } else {
                alert('File not found in storage. It may have already been deleted.');
                await fetchFiles();
            }
        } catch (err: any) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    const handleCopy = (name: string) => {
        const { data: { publicUrl } } = supabase.storage.from('content').getPublicUrl(`uploads/${name}`);
        navigator.clipboard.writeText(publicUrl);
        setCopying(name);
        setTimeout(() => setCopying(null), 2000);
    };

    const getIcon = (name: string) => {
        const ext = name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return <ImageIcon size={20} />;
        if (['mp4', 'mov', 'webm'].includes(ext || '')) return <VideoIcon size={20} />;
        return <FileText size={20} />;
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic">Media <span className="text-sky-500">Vault</span></h3>
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">Manage all uploaded assets</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <RefreshCw className="animate-spin text-sky-500" size={40} />
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Scanning bucket...</p>
                        </div>
                    ) : files.length === 0 ? (
                        <div className="text-center py-20 bg-slate-950/50 rounded-3xl border border-dashed border-slate-800">
                            <ImageIcon className="mx-auto text-slate-800 mb-4" size={48} />
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No files found in storage</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {files.map((file) => {
                                const { data: { publicUrl } } = supabase.storage.from('content').getPublicUrl(`uploads/${file.name}`);
                                return (
                                    <div key={file.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl group hover:border-sky-500/30 transition-all">
                                        <div className="aspect-video mb-4 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center relative">
                                            {['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(file.name.split('.').pop()?.toLowerCase() || '') ? (
                                                <img src={publicUrl} alt={file.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="text-slate-700">{getIcon(file.name)}</div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-white font-bold text-xs truncate mb-1" title={file.name}>{file.name}</p>
                                            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                                                {file.metadata?.size ? (file.metadata.size / 1024).toFixed(1) + ' KB' : 'Size Unknown'} • {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'Date Unknown'}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(file.name)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${copying === file.name ? 'bg-green-500 text-slate-950' : 'bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-400'}`}
                                            >
                                                {copying === file.name ? <CheckCircle size={14} /> : <Copy size={14} />}
                                                {copying === file.name ? 'Copied!' : 'Copy Link'}
                                            </button>
                                            <a
                                                href={publicUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                            <button
                                                onClick={() => handleDeleteFile(file.name)}
                                                className="p-2 bg-slate-800 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                                                title="Delete File"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const IconPicker: React.FC<{
    onSelect: (name: string) => void;
    onClose: () => void;
}> = ({ onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Select Icon</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    {COMMON_ICONS.map(name => {
                        const Icon = (LucideIcons as any)[name];
                        return (
                            <button
                                key={name}
                                onClick={() => { onSelect(name); onClose(); }}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all group"
                            >
                                <div className="text-slate-400 group-hover:text-sky-400 transition-colors">
                                    {Icon && <Icon size={24} />}
                                </div>
                                <span className="text-[9px] font-mono text-slate-500 uppercase">{name}</span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

const ContentField: React.FC<{
    row: ContentRow;
    onChange: (id: string, key: string, value: string) => void;
    onUpload: (id: string, key: string, file: File) => Promise<void>;
    modified: boolean;
    uploading: boolean;
}> = ({ row, onChange, onUpload, modified, uploading }) => {
    const [showPicker, setShowPicker] = useState(false);
    const value = row.value || '';
    const isLong = value.length > 50 || 
                   row.key.includes('bio') || 
                   row.key.includes('desc') || 
                   row.key.includes('intro') || 
                   row.key.includes('subtitle') ||
                   row.key.includes('tagline') ||
                   row.key.includes('quote');
    const isImage = row.type === 'image' || 
                    row.key.includes('thumbnail') || 
                    row.key.includes('logo') || 
                    row.key.includes('image') ||
                    row.key.includes('icon');
    const isIcon = row.key.includes('icon');
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={`p-4 rounded-xl border transition-all ${modified
            ? 'border-sky-500/30 bg-sky-500/5'
            : 'border-slate-800/50 bg-slate-900/40 hover:border-slate-700'
            }`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-500">{TYPE_ICON[row.type] || TYPE_ICON.text}</span>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex-1">
                    {row.key.replace(/_/g, ' ')}
                </label>
                {modified && (
                    <span className="text-[9px] font-mono text-sky-400 uppercase">modified</span>
                )}
            </div>
            <div className="flex gap-2">
                {isLong ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(row.id, row.key, e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-y"
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(row.id, row.key, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                    />
                )}
                {isImage && (
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {isIcon && (
                                <button
                                    onClick={() => setShowPicker(true)}
                                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                    title="Select Icon"
                                >
                                    <LucideIcons.Search size={18} />
                                </button>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                                title="Upload Custom Icon/Image"
                            >
                                {uploading ? <RefreshCw size={18} className="animate-spin" /> : <Upload size={18} />}
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onUpload(row.id, row.key, file);
                            }}
                        />
                        {value && (
                            <div className="w-10 h-10 rounded border border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center">
                                {isIcon && !value.includes('/') ? (
                                    (() => {
                                        const Icon = (LucideIcons as any)[value];
                                        return Icon ? <Icon size={24} className="text-sky-400" /> : <span className="text-[10px] text-slate-500">?</span>;
                                    })()
                                ) : (
                                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showPicker && <IconPicker onSelect={(name) => onChange(row.id, row.key, name)} onClose={() => setShowPicker(false)} />}
        </div>
    );
};

const TABLE_MAPPING: Record<string, string> = {
    hero: 'site_settings',
    about: 'site_settings',
    contact: 'site_settings',
    footer: 'site_settings',
    dj_hero: 'site_settings',
    dj_about: 'site_settings',
    dj_booking: 'site_settings',
    dj_available_for: 'site_settings',
    specializations: 'specializations',
    brands: 'brands',
    software: 'software',
    experience: 'experience',
    portfolio: 'portfolio_projects',
    reels: 'reels',
    dj_gigs: 'dj_gigs',
    dj_genres: 'dj_genres',
    dj_equipment: 'dj_equipment'
};

const LIST_FIELD_MAPS: Record<string, Record<string, string>> = {
    specializations: { title: 'title', desc: 'description', icon: 'icon' },
    brands: { name: 'name', logo: 'logo' },
    software: { name: 'name', icon: 'icon' },
    experience: { role: 'role', company: 'company', period: 'period', desc: 'description' },
    portfolio: { title: 'title', category: 'category', thumbnail: 'thumbnail', video: 'video_url' },
    reels: { title: 'title', category: 'category', thumbnail: 'thumbnail', video: 'video_url' },
    dj_gigs: { title: 'title', location: 'location', type: 'type' },
    dj_genres: { name: 'name', icon: 'icon' },
    dj_equipment: { name: 'name', desc: 'description' }
};

export const AdminDashboard: React.FC = () => {
    const { user, logout, loading: authLoading } = useAdminAuth();
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [allContent, setAllContent] = useState<ContentRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());
    const [saving, setSaving] = useState(false);
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    
    const [activeMode, setActiveMode] = useState<'editor' | 'dj'>('editor');
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        if (!authLoading && !user) {
            window.location.hash = '#/admin/login';
        }
    }, [user, authLoading]);

    const fetchAllContent = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase.rpc('get_site_content');

            if (fetchError) throw fetchError;
            
            // Flatten the nested JSON structure into a single array for easier management
            const flatContent: ContentRow[] = [];
            Object.keys(data).forEach(section => {
                data[section].forEach((row: any) => {
                    flatContent.push({ ...row, section_name: section });
                });
            });

            setAllContent(flatContent);
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

    const handleFieldChange = (id: string, key: string, value: string) => {
        setAllContent(prev =>
            prev.map(row => (row.id === id && row.key === key) ? { ...row, value: value } : row)
        );
        // Track unique combination of row ID and field key
        setModifiedIds(prev => new Set(prev).add(`${id}:${key}`));
    };

    const handleUpload = async (id: string, key: string, file: File) => {
        setUploadingId(`${id}:${key}`);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('content')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('content')
                .getPublicUrl(filePath);

            handleFieldChange(id, key, publicUrl);
        } catch (err: any) {
            alert(`Upload failed: ${err.message}`);
        } finally {
            setUploadingId(null);
        }
    };

    const handleSave = async () => {
        if (!user || modifiedIds.size === 0) return;
        setSaving(true);

        try {
            // Group modified items by ID to handle multi-field rows (lists)
            const modifiedRows = allContent.filter(r => modifiedIds.has(`${r.id}:${r.key}`));
            const uniqueIds = Array.from(new Set(modifiedRows.map(r => r.id)));

            for (const rowId of uniqueIds) {
                const rows = modifiedRows.filter(r => r.id === rowId);
                const firstRow = rows[0];
                const tableName = TABLE_MAPPING[firstRow.section_name];

                if (tableName === 'site_settings') {
                    // Site settings are updated directly
                    for (const row of rows) {
                        const { error: updateError } = await supabase
                            .from('site_settings')
                            .update({ value: row.value })
                            .eq('section', row.section_name)
                            .eq('key', row.key);
                        
                        if (updateError) throw updateError;
                    }
                } else {
                    // List items are updated by row
                    const updateData: any = {};
                    const fieldMap = LIST_FIELD_MAPS[firstRow.section_name];
                    
                    // We need to find all fields for this ID from the current state (allContent)
                    // because some fields might not be "modified" but need to be included if we do a full row update.
                    // Actually, Supabase .update() only updates provided fields. 
                    // But our keys are like 'spec_1_title', so we need to map them to 'title' column.
                    
                    rows.forEach(row => {
                        const fieldKey = row.key.split('_').pop() || '';
                        const dbColumn = fieldMap[fieldKey];
                        if (dbColumn) {
                            updateData[dbColumn] = row.value;
                        }
                    });

                    const { error } = await supabase
                        .from(tableName)
                        .update(updateData)
                        .eq('id', rowId);

                    if (error) throw error;
                }
            }

            setModifiedIds(new Set());
            alert('Changes saved successfully!');
            await fetchAllContent();
        } catch (err: any) {
            alert(`Save failed: ${err.message}`);
            if (err.message.includes('session')) {
                logout();
            }
        } finally {
            setSaving(false);
        }
    };

    const handleAddListItem = async (sectionName: string) => {
        const tableName = TABLE_MAPPING[sectionName];
        const config = LIST_CONFIGS[sectionName];
        if (!tableName || !config) return;

        // Default data based on fields
        const insertData: any = { sort_order: allContent.filter(r => r.section_name === sectionName).length * 10 };
        config.fields.forEach(f => {
            const dbColumn = LIST_FIELD_MAPS[sectionName][f.key];
            if (dbColumn) insertData[dbColumn] = '';
        });

        try {
            setSaving(true);
            const { error: insertError } = await supabase
                .from(tableName)
                .insert([insertData]);

            if (insertError) throw insertError;
            await fetchAllContent();
        } catch (err: any) {
            alert(`Failed to add item: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteListItem = async (sectionName: string, id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        const tableName = TABLE_MAPPING[sectionName];

        try {
            setSaving(true);
            const { error: deleteError } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;
            await fetchAllContent();
        } catch (err: any) {
            alert(`Failed to delete item: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const grouped: GroupedContent = {};
    allContent.forEach(row => {
        if (!grouped[row.section_name]) grouped[row.section_name] = [];
        grouped[row.section_name].push(row);
    });

    const activeTabData = grouped[activeTab] || [];
    const isListSection = !!LIST_CONFIGS[activeTab];

    // Get unique IDs for list sections
    const itemIds = isListSection ? Array.from(new Set(activeTabData.map(r => r.id))) : [];

    return (
        <div className="min-h-screen bg-[#050505] flex text-slate-200">
            {/* Sidebar */}
            <aside className="w-72 bg-black border-r border-slate-800/50 flex flex-col fixed h-full z-50">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tighter uppercase italic text-sky-500">
                        THIRU<span className="text-white">.</span>HUB
                    </h1>
                    <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">
                        Management System
                    </p>
                </div>

                <div className="px-6 mb-4">
                    <button
                        onClick={() => setShowMediaLibrary(true)}
                        className="w-full flex items-center justify-center gap-3 py-3 bg-slate-900 hover:bg-slate-800 text-sky-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800 transition-all group"
                    >
                        <ImageIcon size={16} className="group-hover:rotate-12 transition-transform" />
                        View Uploads
                    </button>
                </div>

                <div className="px-6 mb-6">
                    <div className="bg-slate-900/50 p-1 rounded-xl flex gap-1 border border-slate-800">
                        <button
                            onClick={() => { setActiveMode('editor'); setActiveTab('hero'); }}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeMode === 'editor' ? 'bg-sky-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Video Editor
                        </button>
                        <button
                            onClick={() => { setActiveMode('dj'); setActiveTab('dj_hero'); }}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeMode === 'dj' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Disc Jockey
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {TAB_GROUPS[activeMode].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${activeTab === tab.id
                                ? (activeMode === 'editor' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20')
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 border border-transparent'
                                }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? '' : 'group-hover:scale-110 transition-transform'} />
                            <span className="flex-1 text-left uppercase tracking-wider text-[11px]">{tab.label}</span>
                            {activeTab === tab.id && <div className={`w-1 h-4 rounded-full ${activeMode === 'editor' ? 'bg-sky-500' : 'bg-purple-500'}`} />}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-800/50 mt-auto">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold text-[11px] uppercase tracking-widest border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-72 flex-1 p-12 min-h-screen">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${activeMode === 'editor' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
                                {activeMode} mode
                            </span>
                            <span className="text-slate-700 font-mono text-[10px] uppercase">{activeTab}</span>
                        </div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic">
                            {SECTION_LABELS[activeTab]?.split(' ').slice(1).join(' ') || activeTab}
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={fetchAllContent}
                            className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 hover:text-white hover:border-slate-700 transition-all"
                            title="Refresh"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin text-sky-500' : ''} />
                        </button>
                        {modifiedIds.size > 0 && (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${activeMode === 'editor' ? 'bg-sky-500 text-slate-950 hover:bg-sky-400' : 'bg-purple-500 text-white hover:bg-purple-400'}`}
                            >
                                {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                                Save {modifiedIds.size} Changes
                            </button>
                        )}
                    </div>
                </header>

                <div className="max-w-5xl">
                    {loading && allContent.length === 0 ? (
                        <div className="flex items-center justify-center py-32">
                            <RefreshCw size={48} className="text-sky-500 animate-spin opacity-20" />
                        </div>
                    ) : error ? (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-center gap-4">
                            <AlertCircle size={24} />
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {isListSection ? (
                                <div className="space-y-12">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">
                                            Manage Items ({itemIds.length})
                                        </h3>
                                        <button
                                            onClick={() => handleAddListItem(activeTab)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'editor' ? 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20'}`}
                                        >
                                            <Plus size={14} />
                                            Add New Item
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {itemIds.map((id, i) => {
                                            const itemRows = activeTabData.filter(r => r.id === id);
                                            return (
                                                <motion.div
                                                    key={`${activeTab}-${id}`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="bg-slate-900/20 border border-slate-800/50 rounded-3xl p-6 relative group"
                                                >
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-xs">
                                                                {i + 1}
                                                            </div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                                {LIST_CONFIGS[activeTab].fields[0].label}: {itemRows.find(r => r.key.endsWith('_title') || r.key.endsWith('_name') || r.key.endsWith('_role'))?.value || 'New Item'}
                                                            </h4>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteListItem(activeTab, id)}
                                                            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                            title="Delete Item"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {itemRows.sort((a, b) => a.sort_order - b.sort_order).map(row => (
                                                            <ContentField
                                                                key={row.id + row.key}
                                                                row={row}
                                                                onChange={handleFieldChange}
                                                                onUpload={handleUpload}
                                                                modified={modifiedIds.has(`${row.id}:${row.key}`)}
                                                                uploading={uploadingId === `${row.id}:${row.key}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {itemIds.length === 0 && (
                                        <div className="py-20 text-center border-2 border-dashed border-slate-800/50 rounded-3xl">
                                            <p className="text-slate-600 uppercase tracking-widest text-xs">No items found in this section</p>
                                            <button
                                                onClick={() => handleAddListItem(activeTab)}
                                                className="mt-4 text-sky-500 hover:text-sky-400 text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Create your first item
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeTabData.sort((a, b) => a.sort_order - b.sort_order).map(row => (
                                        <ContentField
                                            key={row.id}
                                            row={row}
                                            onChange={handleFieldChange}
                                            onUpload={handleUpload}
                                            modified={modifiedIds.has(row.id)}
                                            uploading={uploadingId === row.id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }
            `}</style>
            {showMediaLibrary && <MediaLibrary onClose={() => setShowMediaLibrary(false)} />}
        </div>
    );
};

