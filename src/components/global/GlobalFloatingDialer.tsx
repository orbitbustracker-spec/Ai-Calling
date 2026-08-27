'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, Delete, PhoneCall, User, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalFloatingDialer() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState('');
  const dialerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialerRef.current && !dialerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDial = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all group"
        >
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}

      {/* Floating Dialer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialerRef}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-80 glass-card rounded-3xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100/20 dark:border-white/10 flex justify-between items-center bg-white/20 dark:bg-slate-900/30 cursor-grab active:cursor-grabbing">
              <h3 className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> WebRTC Dialer
              </h3>
              <div className="flex items-center gap-2">
                <GripHorizontal className="w-4 h-4 text-gray-400" />
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Number Display */}
            <div className="p-6 pb-2 text-center">
              <div className="h-12 flex items-center justify-center">
                <span className="text-3xl font-light text-gray-900 dark:text-white tracking-widest">{number || 'Enter number'}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">Connected to AI Pipeline</div>
            </div>

            {/* Keypad */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-3 gap-4 h-full">
                {[
                  { digit: '1', letters: '' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' },
                  { digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' },
                  { digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' },
                  { digit: '*', letters: '' }, { digit: '0', letters: '+' }, { digit: '#', letters: '' }
                ].map((btn) => (
                  <button
                    key={btn.digit}
                    onClick={() => handleDial(btn.digit)}
                    className="flex flex-col items-center justify-center rounded-full w-16 h-16 mx-auto bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-700 active:bg-indigo-100 dark:active:bg-indigo-500/20 active:scale-95 transition-all"
                  >
                    <span className="text-2xl font-medium text-gray-900 dark:text-white">{btn.digit}</span>
                    {btn.letters && <span className="text-[10px] text-gray-500 dark:text-slate-400 font-medium tracking-widest uppercase">{btn.letters}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex justify-center gap-6 items-center">
              <button className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 flex items-center justify-center text-white transition-transform active:scale-90">
                <PhoneCall className="w-6 h-6" />
              </button>
              <button 
                onClick={handleDelete}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
