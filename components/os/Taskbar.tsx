// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creatic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useOSStore, appsRegistry, AppId } from '@/store/osStore';
import { motion } from 'framer-motion';
import { cn } from './Window';
import MacIcon from './MacIcon';

export default function Taskbar() {
  const { windows, openApp, focusWindow, activeWindowId, minimizeWindow, customApps } = useOSStore();

  const handleAppClick = (appId: AppId) => {
    const existingWindows = windows.filter(w => w.appId === appId);
    if (existingWindows.length === 0) {
      openApp(appId);
    } else {
      const win = existingWindows[0];
      if (activeWindowId === win.id && !win.isMinimized) {
        minimizeWindow(win.id);
      } else {
        openApp(appId);
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="bg-[#0f121d]/75 backdrop-blur-3xl px-6 py-3 rounded-3xl flex items-center gap-5 shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/10 relative overflow-hidden">
        {/* Glossy reflection */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {[...Object.values(appsRegistry), ...Object.values(customApps)].map((app) => {
          const isOpen = windows.some(w => w.appId === app.id && !w.isMinimized);
          const isActive = windows.some(w => w.appId === app.id && w.id === activeWindowId);
          
          return (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.18, y: -6 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleAppClick(app.id as AppId)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <div className="w-12 h-12 relative">
                <MacIcon id={app.id} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                {app.name}
              </div>

              {/* Indicator */}
              {windows.some(w => w.appId === app.id) && (
                <div className={cn(
                  "absolute -bottom-2 w-1.5 h-1.5 rounded-full transition-all",
                  isActive ? "bg-white" : "bg-white/50"
                )} />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
