// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creaytic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { useOSStore, appsRegistry, AppId } from '@/store/osStore';
import { motion } from 'framer-motion';
import MacIcon from './MacIcon';

export default function DesktopGrid() {
  const { desktopShortcuts, openApp, openContextMenu, customApps } = useOSStore();

  const handleOpen = (appId: AppId) => {
    openApp(appId);
  };

  const handleRightClick = (e: React.MouseEvent, appId: AppId) => {
    e.preventDefault();
    e.stopPropagation();
    openContextMenu(e.clientX, e.clientY, 'shortcut', { appId });
  };

  return (
    <div className="absolute left-6 top-16 bottom-24 w-32 flex flex-col flex-wrap gap-4.5 z-10 pointer-events-none select-none">
      {desktopShortcuts.map((appId) => {
        const app = appsRegistry[appId] || customApps[appId];
        if (!app) return null;
        return (
          <motion.div
            key={app.id}
            onDoubleClick={() => handleOpen(app.id)}
            onTouchStart={() => handleOpen(app.id)}
            onContextMenu={(e) => handleRightClick(e, app.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer bg-black/10 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 backdrop-blur-md transition-all duration-300 group pointer-events-auto w-24 align-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            <div className="w-11 h-11 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
              <MacIcon id={app.id} />
            </div>
            <span className="text-[9px] font-bold text-center tracking-wider text-white/90 group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] truncate w-full px-0.5 select-none uppercase">
              {app.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
