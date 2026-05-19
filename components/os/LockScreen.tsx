// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creatic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useState, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert, Sparkles, X } from 'lucide-react';

export default function LockScreen() {
  const { isLocked, sysPassword, hasSetupPassword, unlockSystem, setSystemPassword, resetSystem } = useOSStore();
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showResetWarning, setShowResetWarning] = useState(false);

  // Time & Date Updates (Cupertino Style)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSetupPassword) {
      // First setup
      if (passwordInput.trim().length >= 4) {
        setSystemPassword(passwordInput);
        unlockSystem(passwordInput);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      return;
    }

    const success = unlockSystem(passwordInput);
    if (!success) {
      setError(true);
      setPasswordInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleResetData = () => {
    resetSystem();
    setShowResetWarning(false);
    window.location.reload();
  };

  if (!isLocked && hasSetupPassword) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-between p-12 bg-black/60 backdrop-blur-3xl text-white select-none">
      {/* Premium Dynamic macOS Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e1065]/20 via-[#030712] to-[#1e3a8a]/20 -z-10 animate-pulse duration-[8000ms]" />

      {/* 1. Sleek Clock Area */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mt-12"
      >
        <h1 className="text-8xl font-thin tracking-wider select-none text-white/90">
          {time}
        </h1>
        <p className="text-sm font-semibold text-white/60 mt-3 tracking-widest uppercase">
          {date}
        </p>
      </motion.div>

      {/* 2. Modern macOS Sonoma Profile Login Box */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        {/* User Circular Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] border-2 border-white/20 flex items-center justify-center text-4xl shadow-xl select-none select-none relative group overflow-hidden">
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
          👤
        </div>

        {/* Username */}
        <div className="text-center select-none">
          <h2 className="text-sm font-black tracking-wide text-white/90">
            {!hasSetupPassword ? 'Welcome to Creatic WebOS' : 'Cupertino User'}
          </h2>
          <p className="text-[10px] text-white/40 mt-1 font-semibold uppercase tracking-wider">
            {!hasSetupPassword 
              ? 'Initialize system environment passcode' 
              : 'Enter System Passcode'}
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleUnlock} className="w-full flex flex-col items-center gap-4">
          <div className="w-64 relative flex items-center">
            <input 
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder={!hasSetupPassword ? 'Set PIN (min 4 chars)' : 'Password'}
              className={`w-full bg-white/10 hover:bg-white/15 focus:bg-white/15 border ${
                error ? 'border-red-500/60 animate-bounce' : 'border-white/10 focus:border-white/20'
              } rounded-full py-2 px-4 pr-10 outline-none text-center text-xs tracking-widest transition-all placeholder-white/30 text-white font-medium backdrop-blur-md`}
              autoFocus
            />
            {passwordInput.trim().length > 0 && (
              <button
                type="submit"
                className="absolute right-1.5 p-1 bg-white hover:bg-white/90 text-black rounded-full transition-all active:scale-90"
              >
                <ArrowRight size={12} />
              </button>
            )}
          </div>

          {/* Forget Passcode Option */}
          {hasSetupPassword && (
            <button 
              type="button"
              onClick={() => setShowResetWarning(true)}
              className="text-[10px] text-white/30 hover:text-white/60 font-bold transition-all underline decoration-dotted"
            >
              Forgot Password?
            </button>
          )}
        </form>
      </motion.div>

      {/* 3. Sleek macOS Lock Screen Footer */}
      <div className="text-[9px] text-white/25 font-bold tracking-widest uppercase flex items-center gap-1.5 select-none">
        <Sparkles size={11} className="text-purple-400" />
        <span>Creatic WebOS Sandbox Security</span>
      </div>

      {/* 4. Stand-alone Apple Glassmorphic Forget Passcode / Wipe Overlay */}
      {showResetWarning && (
        <div className="fixed inset-0 z-[1000000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 select-none">
          <div className="bg-[#1e1f20]/90 backdrop-blur-2xl border border-white/15 rounded-2xl w-[380px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-500/20 text-red-400 rounded-xl">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Wipe System & Reset?</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">
                    For security reasons, forgetting your passcode requires resetting the local system container.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 text-[10px] text-red-300 leading-normal">
                ⚠️ **WARNING**: This action will permanently erase all files in the Documents/Applications folder, text drafts, and saved credentials from your browser's persistent storage. This cannot be undone.
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={handleResetData}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-red-500/20"
                >
                  Erase All Data & Unlock Fresh
                </button>
                <button
                  onClick={() => setShowResetWarning(false)}
                  className="w-full py-2.5 border border-white/10 hover:bg-white/5 text-white/80 active:scale-[0.98] font-bold rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
