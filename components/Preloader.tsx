import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { content } = useSiteContent();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('INITIALIZING_CORE');
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!content) return;

        // Collect all image URLs from content
        const images: string[] = [];
        Object.values(content).forEach(section => {
            section.forEach(item => {
                if (item.type === 'image' && item.value && item.value.startsWith('http')) {
                    images.push(item.value);
                }
            });
        });

        // Unique images
        const uniqueImages = Array.from(new Set(images));
        const totalItems = uniqueImages.length || 1;
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const newProgress = Math.min(Math.round((loadedCount / totalItems) * 100), 100);
            setProgress(newProgress);
            
            if (newProgress < 30) setStatus('FETCHING_ASSETS');
            else if (newProgress < 60) setStatus('BUFFERING_TIMELINE');
            else if (newProgress < 90) setStatus('SYNCING_METADATA');
            else setStatus('CORE_READY');

            if (loadedCount >= totalItems) {
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(onComplete, 1000);
                }, 800);
            }
        };

        if (uniqueImages.length === 0) {
            // Fake progress if no images
            let p = 0;
            const interval = setInterval(() => {
                p += 5;
                setProgress(p);
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(onComplete, 1000);
                    }, 500);
                }
            }, 100);
        } else {
            uniqueImages.forEach(src => {
                const img = new Image();
                img.src = src;
                img.onload = updateProgress;
                img.onerror = updateProgress;
            });
        }
    }, [content, onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-500 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    </div>

                    <div className="relative z-10 w-full max-w-md px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 text-center"
                        >
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white mb-2">
                                THIRU<span className="text-sky-500">.</span>STUDIO
                            </h1>
                            <div className="flex items-center justify-center gap-2">
                                <motion.div 
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-1.5 h-1.5 rounded-full bg-sky-500" 
                                />
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">
                                    {status}
                                </p>
                            </div>
                        </motion.div>

                        <div className="relative h-1 w-full bg-slate-900 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="absolute inset-0 bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                            />
                        </div>

                        <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 tracking-widest">
                            <span>LOADING_STREAMS</span>
                            <span className="text-white">{progress}%</span>
                        </div>
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-5"></div>
                    
                    {/* Corner Marks */}
                    <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-slate-800" />
                    <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-slate-800" />
                    <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-slate-800" />
                    <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-slate-800" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
