// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creatic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useOSStore } from '@/store/osStore';

interface MacIconProps {
  id: string;
  className?: string;
}

export default function MacIcon({ id, className = "w-full h-full" }: MacIconProps) {
  const customApp = id.startsWith('custom-app-') ? useOSStore(state => state.customApps[id]) : null;

  if (id.startsWith('custom-app-') && customApp) {
    if (customApp.icon) {
      return (
        <div className={`${className} rounded-2xl overflow-hidden shadow-md bg-white flex items-center justify-center border border-white/10 w-full h-full`}>
          <img src={customApp.icon} alt={customApp.name} className="w-full h-full object-cover" />
        </div>
      );
    }
    
    // Premium fallback: custom gradient icon with first letter!
    const gradients = [
      'from-pink-500 via-rose-500 to-red-500',
      'from-emerald-400 to-teal-500',
      'from-violet-600 to-indigo-600',
      'from-amber-400 via-orange-500 to-rose-600',
      'from-cyan-400 to-blue-500',
      'from-purple-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < customApp.name.length; i++) {
      hash = customApp.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % gradients.length;
    const initial = customApp.name.trim().charAt(0).toUpperCase();

    return (
      <div className={`${className} rounded-2xl shadow-md bg-gradient-to-tr ${gradients[idx]} flex items-center justify-center border border-white/20 select-none relative group overflow-hidden w-full h-full`}>
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
        <span className="text-white font-black text-xl drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.3)]">{initial}</span>
      </div>
    );
  }

  switch (id) {
    case 'browser': // Safari Compass
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="safariBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e90ff" />
              <stop offset="60%" stopColor="#0047ab" />
              <stop offset="100%" stopColor="#002163" />
            </radialGradient>
            <linearGradient id="needleRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="100%" stopColor="#ff0000" />
            </linearGradient>
            <linearGradient id="needleWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d3d3d3" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Compass Body */}
          <circle cx="32" cy="32" r="28" fill="url(#safariBg)" filter="url(#shadow)" />
          <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          
          {/* Compass Dial markings */}
          <circle cx="32" cy="32" r="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="32" cy="32" r="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          
          {/* Outer Chrome Ring */}
          <circle cx="32" cy="32" r="27.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />

          {/* Compass Needle */}
          <g transform="rotate(45 32 32)">
            {/* North (Red) */}
            <path d="M32 32 L36 32 L32 12 Z" fill="url(#needleRed)" filter="url(#shadow)" />
            {/* South (White/Silver) */}
            <path d="M32 32 L28 32 L32 52 Z" fill="url(#needleWhite)" filter="url(#shadow)" />
            {/* Needle center pin */}
            <circle cx="32" cy="32" r="3" fill="#ffd700" />
            <circle cx="32" cy="32" r="1" fill="#ffffff" />
          </g>
        </svg>
      );

    case 'folder': // macOS Finder Logo
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="finderLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3ca0f3" />
              <stop offset="100%" stopColor="#1a6cc4" />
            </linearGradient>
            <linearGradient id="finderRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#75c2f6" />
              <stop offset="100%" stopColor="#3b9df2" />
            </linearGradient>
            <filter id="finderShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#finderShadow)">
            {/* Base Rounded Box */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#finderLeft)" />
            {/* Split right-half face */}
            <path d="M32 4 H46 C53.7 4 60 10.3 60 18 V46 C60 53.7 53.7 60 46 60 H32 V4 Z" fill="url(#finderRight)" />
            
            {/* Two Eyes */}
            <circle cx="21" cy="24" r="4.5" fill="#0c2340" />
            <circle cx="43" cy="24" r="4.5" fill="#0c2340" />

            {/* Nose line down and around */}
            <path d="M32 4 V32 H25.5" stroke="#0c2340" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Smiling Mouth */}
            <path d="M16 41 C24 50 40 50 48 41" stroke="#0c2340" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case 'notepad': // macOS Notes/VS Code Sheet
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="notePadBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdfcf0" />
              <stop offset="100%" stopColor="#f5f0cd" />
            </linearGradient>
            <linearGradient id="pencilWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd269" />
              <stop offset="100%" stopColor="#f39c12" />
            </linearGradient>
            <filter id="padShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#padShadow)">
            {/* Notepad Page */}
            <rect x="6" y="4" width="52" height="56" rx="11" fill="url(#notePadBg)" />
            
            {/* Yellow Header section */}
            <path d="M6 15 V11 C6 7.1 9.1 4 13 4 H51 C54.9 4 58 7.1 58 11 V15 H6 Z" fill="#ffd043" />
            
            {/* Paper Lines */}
            <line x1="12" y1="23" x2="52" y2="23" stroke="#e0dbb5" strokeWidth="1.5" />
            <line x1="12" y1="31" x2="52" y2="31" stroke="#e0dbb5" strokeWidth="1.5" />
            <line x1="12" y1="39" x2="52" y2="39" stroke="#e0dbb5" strokeWidth="1.5" />
            <line x1="12" y1="47" x2="52" y2="47" stroke="#e0dbb5" strokeWidth="1.5" />
            
            {/* Marginal Vertical pink line */}
            <line x1="18" y1="15" x2="18" y2="60" stroke="#fca5a5" strokeWidth="1" />

            {/* Premium Metallic Ring binders */}
            <rect x="14" y="2" width="4" height="6" rx="1.5" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="0.8" />
            <rect x="30" y="2" width="4" height="6" rx="1.5" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="0.8" />
            <rect x="46" y="2" width="4" height="6" rx="1.5" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="0.8" />

            {/* Shiny Pencil lying diagonally */}
            <g transform="rotate(-30 42 42)">
              <rect x="38" y="15" width="6" height="34" rx="1.5" fill="url(#pencilWood)" />
              {/* Pencil Eraser */}
              <rect x="38" y="12" width="6" height="4" fill="#fc8181" rx="0.5" />
              <rect x="38" y="11" width="6" height="1" fill="#4a5568" />
              {/* Pencil Tip */}
              <path d="M38 49 L41 54 L44 49 Z" fill="#ebdcb9" />
              <path d="M40 52.3 L41 54 L42 52.3 Z" fill="#2d3748" />
            </g>
          </g>
        </svg>
      );

    case 'gallery': // Apple Photos Flower leaf
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="photoShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#photoShadow)">
            {/* White rounded square backdrop */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="#ffffff" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="#eaeaea" strokeWidth="0.8" />
            
            {/* Elegant Flower Leafs (Radial symmetrical layout) */}
            <g transform="translate(32, 32)">
              {/* Yellow */}
              <ellipse cx="0" cy="-11" rx="6.2" ry="11.5" fill="#ffcc00" opacity="0.9" />
              {/* Orange */}
              <ellipse cx="7.7" cy="-7.7" rx="6.2" ry="11.5" fill="#ff9500" opacity="0.9" transform="rotate(45)" />
              {/* Red */}
              <ellipse cx="11" cy="0" rx="6.2" ry="11.5" fill="#ff3b30" opacity="0.9" transform="rotate(90)" />
              {/* Pink */}
              <ellipse cx="7.7" cy="7.7" rx="6.2" ry="11.5" fill="#ff2d55" opacity="0.9" transform="rotate(135)" />
              {/* Purple */}
              <ellipse cx="0" cy="11" rx="6.2" ry="11.5" fill="#af52de" opacity="0.9" transform="rotate(180)" />
              {/* Blue */}
              <ellipse cx="-7.7" cy="7.7" rx="6.2" ry="11.5" fill="#007aff" opacity="0.9" transform="rotate(225)" />
              {/* Cyan/Teal */}
              <ellipse cx="-11" cy="0" rx="6.2" ry="11.5" fill="#5ac8fa" opacity="0.9" transform="rotate(270)" />
              {/* Green */}
              <ellipse cx="-7.7" cy="-7.7" rx="6.2" ry="11.5" fill="#34c759" opacity="0.9" transform="rotate(315)" />
              
              {/* Center overlapping cover dot */}
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </g>
          </g>
        </svg>
      );

    case 'settings': // macOS System Settings Gears
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gearMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eceff1" />
              <stop offset="50%" stopColor="#b0bec5" />
              <stop offset="100%" stopColor="#78909c" />
            </linearGradient>
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cfd8dc" />
              <stop offset="100%" stopColor="#455a64" />
            </linearGradient>
            <filter id="gearShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4.5" stdDeviation="3.5" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#gearShadow)">
            {/* Base Rounded Plate */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#darkMetal)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            
            {/* Big Gear Center */}
            <g transform="translate(32,32)">
              <circle cx="0" cy="0" r="16" fill="url(#gearMetal)" />
              {/* Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect 
                  key={angle}
                  x="-4.5" 
                  y="-21.5" 
                  width="9" 
                  height="7" 
                  rx="1.5" 
                  fill="url(#gearMetal)" 
                  transform={`rotate(${angle})`} 
                />
              ))}
              {/* Gear Inner Cutout */}
              <circle cx="0" cy="0" r="8" fill="#455a64" />
              <circle cx="0" cy="0" r="4.5" fill="#1e293b" />
            </g>
          </g>
        </svg>
      );

    case 'game': // Apple Arcade purple/pink gamepad
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arcadeBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="padBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="gameShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#gameShadow)">
            {/* Backplate */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#arcadeBg)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            
            {/* Game Controller White Base */}
            <rect x="14" y="20" width="36" height="24" rx="12" fill="url(#padBody)" />
            
            {/* D-Pad */}
            <path d="M23 28 H27 V32 H23 Z M25 26 V34 M22 30 H28" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
            
            {/* Action Buttons (colored dots) */}
            <circle cx="39" cy="32" r="2.2" fill="#ef4444" />
            <circle cx="43" cy="28" r="2.2" fill="#3b82f6" />
            <circle cx="43" cy="36" r="2.2" fill="#10b981" />
            <circle cx="47" cy="32" r="2.2" fill="#f59e0b" />

            {/* Menu Buttons */}
            <rect x="29" y="24" width="2.5" height="1" rx="0.5" fill="#94a3b8" />
            <rect x="32.5" y="24" width="2.5" height="1" rx="0.5" fill="#94a3b8" />
          </g>
        </svg>
      );

    case 'passwords': // SafePass Padlock
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe066" />
              <stop offset="50%" stopColor="#f5b041" />
              <stop offset="100%" stopColor="#b7950b" />
            </linearGradient>
            <linearGradient id="steelShackle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cfd8dc" />
              <stop offset="100%" stopColor="#78909c" />
            </linearGradient>
            <filter id="lockShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#lockShadow)">
            {/* Metal Shackle */}
            <path 
              d="M20 28 V19 C20 12.3 25.3 7 32 7 C38.7 7 44 12.3 44 19 V28" 
              stroke="url(#steelShackle)" 
              strokeWidth="5" 
              strokeLinecap="round" 
              fill="none" 
            />
            
            {/* Lock Body */}
            <rect x="12" y="23" width="40" height="32" rx="9" fill="url(#goldPlate)" />
            <rect x="12" y="23" width="40" height="32" rx="9" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            
            {/* Keyhole */}
            <circle cx="32" cy="35" r="3.5" fill="#1e293b" />
            <path d="M30.5 37.5 L33.5 37.5 L34 46 L30 46 Z" fill="#1e293b" />
            
            {/* Highlights */}
            <path d="M15 26 H49" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'calculator': // Calculator buttons
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="calcBackplate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <filter id="calcShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#calcShadow)">
            {/* Base Rounded Plate */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#calcBackplate)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            
            {/* Screen */}
            <rect x="10" y="10" width="44" height="10" rx="2" fill="#0f172a" />
            <text x="50" y="18" fill="#10b981" fontSize="7" fontFamily="monospace" textAnchor="end">1,337.8</text>
            
            {/* Calculator Grid Buttons */}
            <g transform="translate(10, 24)">
              {/* Row 1 */}
              <rect x="0" y="0" width="8" height="6" rx="1.5" fill="#d1d5db" />
              <rect x="12" y="0" width="8" height="6" rx="1.5" fill="#d1d5db" />
              <rect x="24" y="0" width="8" height="6" rx="1.5" fill="#d1d5db" />
              <rect x="36" y="0" width="8" height="6" rx="1.5" fill="#f97316" />
              
              {/* Row 2 */}
              <rect x="0" y="9" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="12" y="9" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="24" y="9" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="36" y="9" width="8" height="6" rx="1.5" fill="#f97316" />
              
              {/* Row 3 */}
              <rect x="0" y="18" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="12" y="18" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="24" y="18" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="36" y="18" width="8" height="6" rx="1.5" fill="#f97316" />
              
              {/* Row 4 */}
              <rect x="0" y="27" width="20" height="6" rx="1.5" fill="#6b7280" />
              <rect x="24" y="27" width="8" height="6" rx="1.5" fill="#6b7280" />
              <rect x="36" y="27" width="8" height="6" rx="1.5" fill="#f97316" />
            </g>
          </g>
        </svg>
      );

    case 'monitor': // Activity Monitor EKG line
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monitorBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="ekgLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <filter id="monitorShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#monitorShadow)">
            {/* Screen border */}
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#monitorBody)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            
            {/* EKG Grid Lines */}
            <g opacity="0.15">
              <line x1="4" y1="18" x2="60" y2="18" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="4" y1="32" x2="60" y2="32" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="4" y1="46" x2="60" y2="46" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="18" y1="4" x2="18" y2="60" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="32" y1="4" x2="32" y2="60" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="46" y1="4" x2="46" y2="60" stroke="#ffffff" strokeWidth="0.5" />
            </g>

            {/* Glowing EKG Waveform */}
            <path 
              d="M6 32 H20 L24 20 L28 44 L32 30 L35 34 L38 32 H58" 
              stroke="url(#ekgLine)" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              filter="drop-shadow(0 0 4px rgba(52, 211, 153, 0.4))"
            />
          </g>
        </svg>
      );

    case 'terminal': // macOS Terminal Prompt Icon
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="termBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="termShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#termShadow)">
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#termBg)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            {/* Command prompt characters */}
            <path d="M16 20 L26 28 L16 36" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="28" y1="36" x2="46" y2="36" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'gemini': // Google Gemini Glowing Star Icon
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="geminiBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d0e12" />
              <stop offset="100%" stopColor="#07080a" />
            </linearGradient>
            <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9bc5ff" />
              <stop offset="35%" stopColor="#84b0ff" />
              <stop offset="70%" stopColor="#ea9aff" />
              <stop offset="100%" stopColor="#ffbade" />
            </linearGradient>
            <filter id="geminiShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#geminiShadow)">
            <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#geminiBg)" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            {/* Primary Gemini Spark Star */}
            <path 
              d="M32 14c.7 6.8 5.2 11.2 12 12-6.8.8-11.3 5.2-12 12-.7-6.8-5.2-11.2-12-12 6.8-.8 11.3-5.2 12-12z" 
              fill="url(#geminiGrad)" 
              filter="drop-shadow(0 0 6px rgba(132, 176, 255, 0.5))"
            />
            {/* Secondary Small Spark Star */}
            <path 
              d="M45 37c.4 4.5 3.5 7.5 8 8-4.5.5-7.6 3.5-8 8-.4-4.5-3.5-7.5-8-8 4.5-.5 7.6-3.5 8-8z" 
              fill="url(#geminiGrad)" 
              opacity="0.8"
            />
          </g>
        </svg>
      );

    case 'chatgpt': // ChatGPT Official Green Swirl Icon
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="gptShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#gptShadow)">
            <rect x="4" y="4" width="56" height="56" rx="14" fill="#10a37f" />
            <rect x="4" y="4" width="56" height="56" rx="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            {/* Exact mathematical SVG path of ChatGPT logo spiral */}
            <path 
              d="M37.5 24.4c-.6-1-1.8-1.4-2.8-.8l-3.3 1.9v-7c0-1.2-1-2.2-2.2-2.2s-2.2 1-2.2 2.2v7l-3.3-1.9c-1-.6-2.3-.2-2.8.8-.6 1-.2 2.3.8 2.8l6 3.5-6 3.5c-1 .6-1.4 1.8-.8 2.8.4.7 1.1 1 1.8 1.1.3 0 .7-.1 1-.3l6-3.5v7c0 1.2 1 2.2 2.2 2.2s2.2-1 2.2-2.2v-7l6 3.5c.3.2.6.3 1 .3.7 0 1.4-.4 1.8-1.1.6-1 .2-2.3-.8-2.8l-6-3.5 6-3.5c1-.6 1.4-1.8.8-2.8z" 
              fill="#ffffff" 
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
