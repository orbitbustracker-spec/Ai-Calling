'use client';

import React, { useState } from 'react';
import { Phone, X, Delete, PhoneCall, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DialerPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [number, setNumber] = useState('');

  const handleDial = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="absolute right-80 top-4 bottom-4 w-80 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" /> Web Dialer
            </h3>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Number Display */}
          <div className="p-6 pb-2 text-center">
            <div className="h-12 flex items-center justify-center">
              <span className="text-3xl font-light text-white tracking-widest">{number || 'Enter number'}</span>
            </div>
            <div className="text-sm text-slate-500 mt-2">Voice AI Sandbox</div>
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
                  className="flex flex-col items-center justify-center rounded-full w-16 h-16 mx-auto bg-slate-800/50 hover:bg-slate-700 active:bg-indigo-500/20 active:scale-95 transition-all"
                >
                  <span className="text-2xl font-medium text-white">{btn.digit}</span>
                  {btn.letters && <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">{btn.letters}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0 flex justify-center gap-6 items-center">
            <button className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 flex items-center justify-center text-white transition-transform active:scale-90">
              <PhoneCall className="w-6 h-6" />
            </button>
            <button 
              onClick={handleDelete}
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
