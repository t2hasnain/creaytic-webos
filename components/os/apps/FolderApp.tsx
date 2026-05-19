// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creatic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { Folder, File, ChevronRight, HardDrive, Image as ImageIcon, FileText, Download, Play, Compass, Trash2, Edit, Plus, FolderPlus, FileCode } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useOSStore, VFSItem } from '@/store/osStore';

export default function FolderApp() {
  const { vfs, createFile, createFolder, deleteItem, renameItem, setItemTag, openApp } = useOSStore();
  const [currentFolderId, setCurrentFolderId] = useState<string>('documents');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Modals / Input states
  const [newItemModal, setNewItemModal] = useState<{ isOpen: boolean; type: 'folder' | 'txt' | 'png'; parentId: string } | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [renameModal, setRenameModal] = useState<{ isOpen: boolean; id: string; currentName: string } | null>(null);
  const [renameValue, setRenameValue] = useState('');
  
  // Custom right-click menu within Finder
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; itemId: string | null } | null>(null);
  const finderRef = useRef<HTMLDivElement>(null);

  // Get current folder details
  const currentFolder = vfs.find(item => item.id === currentFolderId) || vfs[0];

  // Resolve path history list for breadcrumbs
  const getPathHistory = (): VFSItem[] => {
    const path: VFSItem[] = [];
    let current = currentFolder;
    while (current) {
      path.unshift(current);
      if (current.parentId) {
        const parent = vfs.find(item => item.id === current.parentId);
        if (parent) current = parent;
        else break;
      } else {
        break;
      }
    }
    return path;
  };

  const handleItemDoubleClick = (item: VFSItem) => {
    if (item.type === 'folder') {
      setCurrentFolderId(item.id);
      setSelectedItemId(null);
    } else if (item.ext === 'app' && item.appId) {
      openApp(item.appId as any);
    } else if (item.ext === 'txt') {
      // Open Notepad with this active file ID!
      openApp('notepad', { fileId: item.id });
    } else if (item.ext === 'png' || item.ext === 'jpg') {
      // Open Photos with this active file ID or media URL
      openApp('gallery', { activeImg: item.content });
    }
  };

  const handleRightClick = (e: React.MouseEvent, itemId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = finderRef.current?.getBoundingClientRect();
    if (!rect) return;
    setContextMenu({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      itemId
    });
  };

  // Close context menu on outside click
  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const triggerCreateItem = () => {
    if (!newItemName.trim() || !newItemModal) return;
    const name = newItemName.trim();
    if (newItemModal.type === 'folder') {
      createFolder(name, newItemModal.parentId);
    } else if (newItemModal.type === 'txt') {
      createFile(name.endsWith('.txt') ? name : `${name}.txt`, 'txt', '// Write here...', newItemModal.parentId);
    } else {
      createFile(name.endsWith('.png') ? name : `${name}.png`, 'png', '/wallpaper.png', newItemModal.parentId);
    }
    setNewItemModal(null);
    setNewItemName('');
  };

  const triggerRename = () => {
    if (!renameValue.trim() || !renameModal) return;
    renameItem(renameModal.id, renameValue.trim());
    setRenameModal(null);
    setRenameValue('');
  };

  const getIcon = (item: VFSItem) => {
    if (item.type === 'folder') return <Folder size={36} className="text-blue-400 fill-blue-400/20" />;
    if (item.ext === 'app') return <Compass size={36} className="text-pink-400" />;
    if (item.ext === 'png' || item.ext === 'jpg') return <ImageIcon size={36} className="text-purple-400" />;
    if (item.ext === 'txt') return <FileText size={36} className="text-slate-300" />;
    return <File size={36} className="text-slate-400" />;
  };

  // Filter children of current directory
  const currentItems = vfs.filter(item => item.parentId === currentFolderId);

  return (
    <div 
      className="flex h-full bg-[#161a22]/70 text-white backdrop-blur-2xl select-none relative" 
      ref={finderRef}
      onContextMenu={(e) => handleRightClick(e, null)}
    >
      {/* Sidebar - macOS Finder style */}
      <div className="w-52 bg-[#0e1116]/80 flex flex-col border-r border-white/5 p-3.5 gap-4">
        
        {/* Favorites section */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-2 mb-1.5">Favorites</span>
          
          <SidebarBtn 
            active={currentFolderId === 'applications'} 
            onClick={() => setCurrentFolderId('applications')}
            icon={<Compass size={14} className="text-pink-400" />}
            label="Applications"
          />
          <SidebarBtn 
            active={currentFolderId === 'documents'} 
            onClick={() => setCurrentFolderId('documents')}
            icon={<FileText size={14} className="text-blue-400" />}
            label="Documents"
          />
          <SidebarBtn 
            active={currentFolderId === 'pictures'} 
            onClick={() => setCurrentFolderId('pictures')}
            icon={<ImageIcon size={14} className="text-purple-400" />}
            label="Pictures"
          />
          <SidebarBtn 
            active={currentFolderId === 'downloads'} 
            onClick={() => setCurrentFolderId('downloads')}
            icon={<Download size={14} className="text-amber-400" />}
            label="Downloads"
          />
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-1.5 mt-2">
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-2 mb-1.5 font-bold">Quick Actions</span>
          <button 
            onClick={() => setNewItemModal({ isOpen: true, type: 'folder', parentId: currentFolderId })}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white/90 transition-all text-left"
          >
            <FolderPlus size={13} className="text-blue-400" /> New Folder
          </button>
          <button 
            onClick={() => setNewItemModal({ isOpen: true, type: 'txt', parentId: currentFolderId })}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white/90 transition-all text-left"
          >
            <FileCode size={13} className="text-emerald-400" /> New Document
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#161b22]/40" onClick={() => setSelectedItemId(null)}>
        
        {/* Top bar search path */}
        <div className="h-12 bg-black/15 border-b border-white/5 flex items-center justify-between px-5 gap-2.5">
          <div className="flex items-center text-[10px] text-white/60 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 w-full max-w-xl font-semibold tracking-wide">
            {getPathHistory().map((folder, i) => (
              <div key={folder.id} className="flex items-center">
                <span 
                  className="hover:text-white cursor-pointer transition-colors"
                  onClick={() => setCurrentFolderId(folder.id)}
                >
                  {folder.name}
                </span>
                {i < getPathHistory().length - 1 && <ChevronRight size={11} className="mx-1 text-white/30" />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setNewItemModal({ isOpen: true, type: 'folder', parentId: currentFolderId })}
              className="p-1.5 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
              title="New Folder"
            >
              <FolderPlus size={14} />
            </button>
            <button 
              onClick={() => setNewItemModal({ isOpen: true, type: 'txt', parentId: currentFolderId })}
              className="p-1.5 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
              title="New File"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Files Grid Pane */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {currentItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div 
                    key={item.id} 
                    onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    onContextMenu={(e) => handleRightClick(e, item.id)}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 group active:scale-95 text-center shadow-sm relative ${
                      isSelected 
                        ? 'bg-blue-600/25 border-blue-500/40 text-white font-bold' 
                        : 'bg-black/10 border-white/5 hover:border-blue-500/20 hover:bg-white/5 text-white/90'
                    }`}
                  >
                    <div className="group-hover:scale-105 group-hover:rotate-1 transition-all duration-200">
                      {getIcon(item)}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wide truncate w-full px-1">{item.name}</span>
                    
                    {item.tag && (
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                        item.tag === 'Red' ? 'bg-red-500' : item.tag === 'Orange' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/20 select-none">
              <Folder size={48} className="stroke-1 mb-2" />
              <span className="text-xs font-semibold uppercase tracking-widest">Empty Directory</span>
            </div>
          )}
        </div>
      </div>

      {/* Internal Custom Right-Click Context Menu */}
      {contextMenu && (
        <div 
          className="absolute bg-[#141822]/90 border border-white/10 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.65)] backdrop-blur-3xl py-1.5 min-w-[150px] flex flex-col gap-0.5 text-white text-[10px] font-semibold z-[9999]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.itemId ? (
            <>
              <button 
                onClick={() => {
                  const item = vfs.find(i => i.id === contextMenu.itemId);
                  if (item) setRenameModal({ isOpen: true, id: item.id, currentName: item.name });
                  setContextMenu(null);
                }}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-blue-600/20 text-left rounded-xl mx-1.5 transition-colors"
              >
                <Edit size={12} className="text-blue-400" /> Rename
              </button>
              
              <div className="h-px bg-white/5 my-1 mx-3" />
              
              <div className="px-3.5 py-1 text-[8px] uppercase tracking-widest text-white/30">Set Tag</div>
              <div className="flex gap-2.5 px-3.5 py-1.5 hover:bg-white/5 rounded-xl mx-1.5">
                <button onClick={() => { setItemTag(contextMenu.itemId!, 'Red'); setContextMenu(null); }} className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white/10 active:scale-90" />
                <button onClick={() => { setItemTag(contextMenu.itemId!, 'Orange'); setContextMenu(null); }} className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-white/10 active:scale-90" />
                <button onClick={() => { setItemTag(contextMenu.itemId!, 'Blue'); setContextMenu(null); }} className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-white/10 active:scale-90" />
                <button onClick={() => { setItemTag(contextMenu.itemId!, null); setContextMenu(null); }} className="w-3.5 h-3.5 rounded-full bg-slate-500 border border-white/10 active:scale-90 flex items-center justify-center text-[8px] text-white">×</button>
              </div>

              <div className="h-px bg-white/5 my-1 mx-3" />

              <button 
                onClick={() => { deleteItem(contextMenu.itemId!); setContextMenu(null); }}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-600/20 text-red-400 text-left rounded-xl mx-1.5 transition-colors"
              >
                <Trash2 size={12} /> Delete Item
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => { setNewItemModal({ isOpen: true, type: 'folder', parentId: currentFolderId }); setContextMenu(null); }}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-blue-600/20 text-left rounded-xl mx-1.5 transition-colors"
              >
                <FolderPlus size={12} className="text-blue-400" /> New Folder
              </button>
              <button 
                onClick={() => { setNewItemModal({ isOpen: true, type: 'txt', parentId: currentFolderId }); setContextMenu(null); }}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-blue-600/20 text-left rounded-xl mx-1.5 transition-colors"
              >
                <FileCode size={12} className="text-emerald-400" /> New Document
              </button>
              <button 
                onClick={() => { setNewItemModal({ isOpen: true, type: 'png', parentId: currentFolderId }); setContextMenu(null); }}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-blue-600/20 text-left rounded-xl mx-1.5 transition-colors"
              >
                <ImageIcon size={12} className="text-purple-400" /> New Image (PNG)
              </button>
            </>
          )}
        </div>
      )}

      {/* 1. Modal: Create New Item */}
      {newItemModal && (
        <div className="absolute inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-5 max-w-sm w-full flex flex-col gap-4 text-center shadow-2xl">
            <h3 className="font-bold text-sm tracking-wide">
              Create New {newItemModal.type === 'folder' ? 'Folder' : newItemModal.type === 'txt' ? 'Text Document' : 'Image'}
            </h3>
            <input 
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter name...`}
              className="bg-[#242427] border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none text-white w-full"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') triggerCreateItem(); }}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setNewItemModal(null)}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={triggerCreateItem}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Rename Item */}
      {renameModal && (
        <div className="absolute inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-5 max-w-sm w-full flex flex-col gap-4 text-center shadow-2xl">
            <h3 className="font-bold text-sm tracking-wide">Rename Item</h3>
            <input 
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder={renameModal.currentName}
              className="bg-[#242427] border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none text-white w-full"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') triggerRename(); }}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setRenameModal(null)}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={triggerRename}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold transition-colors"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all w-full text-left ${
        active 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-sm font-bold' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function TagBtn({ color, label, active, onClick }: { color: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
        active ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5'
      }`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-sm`} />
      <span>{label}</span>
    </div>
  );
}
