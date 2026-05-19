// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creatic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useOSStore } from '@/store/osStore';
import { Monitor, Lock, Palette, Info, ShieldAlert, Key, Trash2, Sun, Volume2, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const wallpapers = [
  { name: 'Default Abstract', url: '/wallpaper.png' },
  { name: 'Dark Flow', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { name: 'Cyberpunk City', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Minimalist Space', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop' },
];

export default function SettingsApp() {
  const { 
    wallpaper, 
    setWallpaper, 
    hasSetupPassword, 
    setSystemPassword, 
    resetSystem, 
    lockSystem,
    accentColor,
    setAccentColor,
    theme,
    setTheme,
    systemVolume,
    setSystemVolume,
    displayBrightness,
    setDisplayBrightness
  } = useOSStore();
  
  const [activeTab, setActiveTab] = useState('appearance');
  const [customUrl, setCustomUrl] = useState('');
  
  // Security PIN state
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState('');
  
  // Update state simulation
  const [updateState, setUpdateState] = useState<'idle' | 'checking' | 'ready' | 'installing' | 'completed'>('idle');
  const [updateProgress, setUpdateProgress] = useState(0);

  const handleSetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setPinMessage('PIN must be at least 4 characters long.');
      setTimeout(() => setPinMessage(''), 3000);
      return;
    }
    setSystemPassword(newPin);
    setNewPin('');
    setPinMessage('Passcode updated successfully!');
    setTimeout(() => setPinMessage(''), 3000);
  };

  const handleClearPin = () => {
    setSystemPassword('');
    setPinMessage('Security passcode removed successfully.');
    setTimeout(() => setPinMessage(''), 3000);
  };

  const startSoftwareUpdate = () => {
    setUpdateState('checking');
    setTimeout(() => {
      setUpdateState('ready');
    }, 2000);
  };

  const triggerInstallUpdate = () => {
    setUpdateState('installing');
    setUpdateProgress(0);
    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUpdateState('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  return (
    <div className="flex h-full bg-[#0a0a0c]/85 text-white backdrop-blur-3xl font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-56 bg-black/45 p-4 flex flex-col gap-1 border-r border-white/5 select-none">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs font-bold text-white/40 ml-2 uppercase tracking-widest">Settings</span>
        </div>

        <TabButton 
          active={activeTab === 'appearance'} 
          onClick={() => setActiveTab('appearance')}
          icon={<Palette size={14} className="text-pink-400" />}
          label="Appearance"
        />
        <TabButton 
          active={activeTab === 'display'} 
          onClick={() => setActiveTab('display')}
          icon={<Sun size={14} className="text-amber-400" />}
          label="Display & Sound"
        />
        <TabButton 
          active={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
          icon={<Lock size={14} className="text-emerald-400" />}
          label="Privacy & Security"
        />
        <TabButton 
          active={activeTab === 'about'} 
          onClick={() => setActiveTab('about')}
          icon={<Info size={14} className="text-blue-400" />}
          label="About This WebOS"
        />
      </div>

      {/* Content Viewports */}
      <div className="flex-1 p-8 overflow-y-auto select-text">
        
        {/* Appearance Options */}
        {activeTab === 'appearance' && (
          <div className="max-w-2xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Appearance & Theme Options</h3>
              <p className="text-[11px] text-white/40 mt-1">Configure your system accents, layouts, and desktop wallpaper backdrops.</p>
            </div>

            {/* Accent Color picker */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">System Accent Color</span>
              <div className="flex gap-3">
                {(['blue', 'graphite', 'pink', 'purple', 'green', 'yellow'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center capitalize ${
                      accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                    } ${
                      color === 'blue' ? 'bg-blue-600' : color === 'graphite' ? 'bg-zinc-600' : color === 'pink' ? 'bg-pink-600' : color === 'purple' ? 'bg-purple-600' : color === 'green' ? 'bg-green-600' : 'bg-yellow-500'
                    }`}
                    title={`${color} Accent`}
                  >
                    {accentColor === color && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark/Light mode toggle */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">System Theme</span>
                <span className="text-[10px] text-white/40">Toggle dark mode or light modes system wide.</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    theme === 'dark' ? 'bg-white/10 text-white font-black' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    theme === 'light' ? 'bg-white/10 text-white font-black' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  Light
                </button>
              </div>
            </div>

            {/* Wallpaper Selection */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Desktop Wallpaper Presets</span>
              <div className="grid grid-cols-2 gap-4">
                {wallpapers.map((wp) => (
                  <div 
                    key={wp.url}
                    onClick={() => setWallpaper(wp.url)}
                    className={`relative aspect-video rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      wallpaper === wp.url ? 'border-indigo-500 scale-[1.02] shadow-2xl' : 'border-transparent hover:border-white/20 hover:scale-[1.01]'
                    }`}
                  >
                    <Image src={wp.url} alt={wp.name} fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] backdrop-blur-md border-t border-white/5 font-semibold">
                      {wp.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom wallpaper address */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Custom Wallpaper Image Address</span>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/custom-art.jpg"
                  className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  onClick={() => { if (customUrl) setWallpaper(customUrl); }}
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                >
                  Apply
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Display & Sound Settings (100% Working Sliders!) */}
        {activeTab === 'display' && (
          <div className="max-w-2xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Display & Sound</h3>
              <p className="text-[11px] text-white/40 mt-1">Directly adjust display brightness overlays and core system volume mixers.</p>
            </div>

            {/* Brightness slider */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold flex items-center gap-1.5"><Sun size={14} className="text-amber-400" /> Display Brightness</span>
                <span className="text-xs font-mono font-bold text-amber-400">{displayBrightness}%</span>
              </div>
              <input 
                type="range"
                min="20"
                max="100"
                value={displayBrightness}
                onChange={(e) => setDisplayBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-white/30">Adjusts the dynamic light level screen dimming overlay.</span>
            </div>

            {/* Volume slider */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold flex items-center gap-1.5"><Volume2 size={14} className="text-blue-400" /> Output Volume</span>
                <span className="text-xs font-mono font-bold text-blue-400">{systemVolume}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={systemVolume}
                onChange={(e) => setSystemVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-white/30">Adjusts audio alert signals and dynamic media player mixers.</span>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="max-w-2xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Privacy & Lock Security</h3>
              <p className="text-[11px] text-white/40 mt-1">Configure biometric setup passwords and session lock controllers.</p>
            </div>

            {/* Password PIN Form */}
            <form onSubmit={handleSetPin} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white/80 flex items-center gap-1.5"><Key size={14} className="text-indigo-400" /> Configure Passcode Pin</h4>
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Enter 4-character PIN passcode..."
                  className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  Save PIN
                </button>
                {hasSetupPassword && (
                  <button 
                    type="button"
                    onClick={handleClearPin}
                    className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Remove PIN
                  </button>
                )}
              </div>
              {pinMessage && <span className="text-[10px] text-indigo-400 font-semibold">{pinMessage}</span>}
            </form>

            <button 
              onClick={lockSystem}
              className="bg-white/5 border border-white/5 hover:bg-white/10 active:scale-95 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 self-start px-6 select-none"
            >
              <Lock size={13} /> Lock Session Now
            </button>

            <div className="h-px bg-white/5 my-2" />

            {/* Wipe System memory Danger Zone */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert size={16} />
                <h4 className="font-bold text-xs uppercase tracking-wider">Danger Zone</h4>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Wiping system registers deletes all virtual VFS creations, Base64 uploads, Arcade match records, and restores the system back to the factory-fresh default setting.
              </p>
              <button 
                onClick={resetSystem}
                className="bg-red-600 hover:bg-red-500 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-1.5 self-start shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                <Trash2 size={13} /> Wipe System Memory
              </button>
            </div>
          </div>
        )}

        {/* About System & Live Software Updates */}
        {activeTab === 'about' && (
          <div className="max-w-2xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">About WebOS Cupertino</h3>
              <p className="text-[11px] text-white/40 mt-1">Build metrics, system specification indexes, and update nodes.</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col">
              <div className="flex justify-between py-3.5 border-b border-white/5 text-xs">
                <span className="text-white/40">Product Model</span>
                <span className="font-bold text-white/90"> WebOS High Sierra (Cupertino Spec)</span>
              </div>
              <div className="flex justify-between py-3.5 border-b border-white/5 text-xs">
                <span className="text-white/40">Core Processor Engine</span>
                <span className="font-bold text-indigo-400">Next.js 15 V8 Sandbox Controller</span>
              </div>
              <div className="flex justify-between py-3.5 border-b border-white/5 text-xs">
                <span className="text-white/40">System Memory Node</span>
                <span className="font-bold text-emerald-400">Zustand Dynamic VFS Active Sync</span>
              </div>
              <div className="flex justify-between py-3.5 text-xs">
                <span className="text-white/40">Active Accent Palette</span>
                <span className="font-bold uppercase tracking-wider text-pink-400">{accentColor}</span>
              </div>
            </div>

            {/* Live Software Update Simulator */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-400 animate-pulse" />
                  <span className="text-xs font-bold">Software Update</span>
                </div>
                {updateState === 'idle' && (
                  <button 
                    onClick={startSoftwareUpdate}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-bold transition-all"
                  >
                    Check for Updates <ChevronRight size={10} />
                  </button>
                )}
              </div>

              {updateState === 'checking' && (
                <div className="flex items-center gap-3 py-2 text-xs text-white/50">
                  <RotateCcw size={14} className="animate-spin text-indigo-400" />
                  <span>Checking for update nodes...</span>
                </div>
              )}

              {updateState === 'ready' && (
                <div className="flex flex-col gap-3 py-2">
                  <span className="text-xs font-bold text-emerald-400"> WebOS 15.4 High Sierra Update Available!</span>
                  <p className="text-[10px] text-white/50">Includes advanced local terminal prompts, Ollama model linkages, and custom system-wide accent variables.</p>
                  <button 
                    onClick={triggerInstallUpdate}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-bold self-start transition-all"
                  >
                    Download and Install Now
                  </button>
                </div>
              )}

              {updateState === 'installing' && (
                <div className="flex flex-col gap-2 py-2">
                  <span className="text-[10px] text-white/50">Downloading and compiling update nodes ({updateProgress}%)...</span>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${updateProgress}%` }} />
                  </div>
                </div>
              )}

              {updateState === 'completed' && (
                <div className="py-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  ✓ Your system is up to date. WebOS 15.4 installed.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]' 
          : 'hover:bg-white/5 text-white/50 hover:text-white/80'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
