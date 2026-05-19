// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creaytic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X, Maximize } from 'lucide-react';
import { useOSStore } from '@/store/osStore';
import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const windowState = useOSStore((state) => state.windows.find((w) => w.id === id));
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPos, activeWindowId } = useOSStore();
  const windowRef = useRef<HTMLDivElement>(null);
  
  if (!windowState) return null;
  
  const { title, isMinimized, isMaximized, zIndex, x, y, width, height, appId } = windowState;
  const isActive = activeWindowId === id;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isMaximized ? 0 : x,
            y: isMaximized ? 0 : y,
            width: isMaximized ? '100vw' : width,
            height: isMaximized ? 'calc(100vh - 64px)' : height, // 64px for taskbar
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          drag={!isMaximized}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            if (!isMaximized) updateWindowPos(id, info.point.x, info.point.y);
          }}
          onPointerDown={() => focusWindow(id)}
          className={cn(
            "absolute flex flex-col rounded-2xl overflow-hidden glass-panel border transition-shadow duration-300",
            isActive 
              ? "border-blue-500/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.18)]" 
              : "border-white/10 shadow-2xl"
          )}
          style={{ zIndex }}
        >
          {/* Title Bar */}
          <div
            className={cn(
              "flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing border-b border-white/5 relative",
              isActive ? "bg-white/10" : "bg-white/5"
            )}
            onDoubleClick={() => maximizeWindow(id)}
          >
            {/* Traffic Lights */}
            <div className="flex items-center gap-2 z-10">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (appId === 'notepad') {
                    window.dispatchEvent(new CustomEvent('notepad-try-close', { detail: { windowId: id } }));
                  } else {
                    closeWindow(id);
                  }
                }}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group transition-colors"
              >
                <X className="w-2 h-2 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => minimizeWindow(id)}
                className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group transition-colors"
              >
                <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => maximizeWindow(id)}
                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center group transition-colors"
              >
                <Maximize className="w-2 h-2 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Centered Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-white/80 select-none">
              {title}
            </div>

            {/* Spacer */}
            <div className="w-[60px]" />
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-hidden bg-black/40 backdrop-blur-md relative cursor-default">
            {children}
            {!isActive && <div className="absolute inset-0 z-50" onPointerDown={() => focusWindow(id)} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
