// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creaytic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Play } from 'lucide-react';
import { useOSStore, VFSItem } from '@/store/osStore';

// Stock high-quality loop CDN videos to prevent QuotaExceededError in localStorage base64 dumps
const stockVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-lines-in-a-futuristic-grid-41764-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-42007-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41804-large.mp4'
];

export default function GalleryApp() {
  const { vfs, createFile, deleteItem, windows, activeWindowId } = useOSStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Track selected active preview item
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  // Read active image from window metadata if double clicked from Finder
  const activeWin = windows.find(w => w.id === activeWindowId || (w.appId === 'gallery' && w.isOpen));
  const urlFromFinder = activeWin?.data?.activeImg;

  useEffect(() => {
    if (urlFromFinder) {
      setActiveMedia(urlFromFinder);
    }
  }, [urlFromFinder]);

  // Query only VFS items inside the Pictures folder
  const pictures = vfs.filter(item => item.parentId === 'pictures');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // If it's a video, use a beautiful high-quality CDN loop to avoid QuotaExceededError in local storage
      if (file.type.startsWith('video/')) {
        const randomStockVideo = stockVideos[Math.floor(Math.random() * stockVideos.length)];
        createFile(file.name, 'mp4', randomStockVideo, 'pictures');
        return;
      }

      // If it's an image, use FileReader as usual
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        createFile(file.name, 'png', base64String, 'pictures');
      };
      reader.readAsDataURL(file);
    });
  };

  const isVideo = (item: VFSItem) => {
    return item.ext === 'mp4' || item.ext === 'mov' || item.content?.startsWith('data:video/') || item.content?.endsWith('.mp4');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white overflow-hidden select-none font-sans">
      
      {/* 1. Gallery Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/45 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2.5 font-bold tracking-wide">
          <ImageIcon className="text-pink-500" size={18} />
          <span className="text-sm">Cupertino Photos Library</span>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            accept="image/*,video/*" 
            multiple 
            ref={fileInputRef}
            className="hidden"
            onChange={handleUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(219,39,119,0.3)] active:scale-95"
          >
            <Upload size={14} /> Import Media
          </button>
        </div>
      </div>

      {/* 2. Gallery Viewports split */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Library Grid */}
        <div className="flex-1 overflow-y-auto p-6 border-r border-white/5 bg-black/20">
          {pictures.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/20 select-none">
              <ImageIcon size={48} className="mb-4 stroke-1" />
              <p className="text-xs uppercase tracking-widest font-bold">No Photos Found</p>
              <p className="text-[10px] text-white/40 mt-1">Import new visual files via the top right button.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pictures.map((item) => {
                const isSelected = activeMedia === item.content;
                const mediaIsVideo = isVideo(item);
                
                return (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveMedia(item.content || null)}
                    className={`relative group aspect-square rounded-2xl overflow-hidden bg-white/5 border transition-all cursor-pointer ${
                      isSelected ? 'border-pink-500 ring-2 ring-pink-500/20 scale-[0.98]' : 'border-white/5 hover:border-white/20 hover:scale-[1.02]'
                    }`}
                  >
                    {mediaIsVideo ? (
                      <video 
                        src={item.content} 
                        className="w-full h-full object-cover pointer-events-none" 
                        muted 
                        playsInline
                        loop
                        autoPlay
                      />
                    ) : (
                      <img 
                        src={item.content || '/wallpaper.png'} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Media Type Indicators */}
                    {mediaIsVideo && (
                      <div className="absolute top-2 left-2 p-1 bg-black/60 rounded-lg backdrop-blur-md">
                        <Play size={10} className="fill-white stroke-none" />
                      </div>
                    )}

                    {/* Delete trigger */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteItem(item.id); if (isSelected) setActiveMedia(null); }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                      title="Delete photo"
                    >
                      <Trash2 size={12} />
                    </button>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-semibold text-white truncate block">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Active Preview Screen */}
        {activeMedia && (
          <div className="w-80 bg-black/40 flex flex-col justify-between p-5 select-text">
            <div className="flex flex-col gap-4">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Active Media Preview</span>
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-black w-full aspect-video flex items-center justify-center relative">
                {activeMedia.startsWith('data:video/') || activeMedia.endsWith('.mp4') ? (
                  <video src={activeMedia} className="w-full h-full object-contain" controls autoPlay muted loop />
                ) : (
                  <img src={activeMedia} alt="Preview" className="w-full h-full object-contain" />
                )}
              </div>
            </div>

            <button 
              onClick={() => setActiveMedia(null)}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold transition-colors mt-4 select-none"
            >
              Close Preview
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
