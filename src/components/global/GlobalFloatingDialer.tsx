'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, Delete, PhoneCall, User, GripHorizontal, PhoneOff, Mic, MicOff, Volume2, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CallState = 'idle' | 'calling' | 'connected' | 'ended';

export function GlobalFloatingDialer() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [callState, setCallState] = useState<CallState>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const dialerRef = useRef<HTMLDivElement>(null);

  // Click outside to close (only if idle)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialerRef.current && !dialerRef.current.contains(event.target as Node) && callState === 'idle') {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, callState]);

  // Handle call timer and state transitions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (callState === 'calling') {
      // Simulate ringing for 3 seconds then connect
      timer = setTimeout(() => {
        setCallState('connected');
      }, 3000);
    } else if (callState === 'connected') {
      // Start call timer
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else if (callState === 'ended') {
      // Show "Call Ended" for 2 seconds then reset to idle
      timer = setTimeout(() => {
        setCallState('idle');
        setNumber('');
        setCallDuration(0);
        setIsMuted(false);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (timer) clearInterval(timer as any);
    };
  }, [callState]);

  const handleDial = (digit: string) => {
    if (callState === 'idle') {
      setNumber(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    if (callState === 'idle') {
      setNumber(prev => prev.slice(0, -1));
    }
  };

  const handleCallAction = () => {
    if (callState === 'idle') {
      if (number.length > 0) setCallState('calling');
    } else {
      setCallState('ended');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          {callState !== 'idle' && (
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
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
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Number Display & Status */}
            <div className="p-6 pb-2 text-center h-28 flex flex-col justify-center">
              <div className="h-10 flex items-center justify-center">
                <span className="text-3xl font-light text-gray-900 dark:text-white tracking-widest">{number || 'Enter number'}</span>
              </div>
              <div className="text-sm mt-3 font-medium h-6">
                {callState === 'idle' && <span className="text-gray-500">Ready to call</span>}
                {callState === 'calling' && <span className="text-amber-500 animate-pulse">Ringing...</span>}
                {callState === 'connected' && <span className="text-emerald-500 font-bold">{formatDuration(callDuration)}</span>}
                {callState === 'ended' && <span className="text-red-500 font-bold">Call Ended</span>}
              </div>
            </div>

            {/* Main Content Area (Keypad or In-Call Actions) */}
            <div className="flex-1 p-6 relative">
              <AnimatePresence mode="wait">
                {callState === 'idle' ? (
                  <motion.div 
                    key="keypad"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-3 gap-4 h-full"
                  >
                    {[
                      { digit: '1', letters: '' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' },
                      { digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' },
                      { digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' },
                      { digit: '*', letters: '' }, { digit: '0', letters: '+' }, { digit: '#', letters: '' }
                    ].map((btn) => (
                      <button
                        key={btn.digit}
                        onClick={() => handleDial(btn.digit)}
                        className="flex flex-col items-center justify-center rounded-full w-16 h-16 mx-auto bg-gray-50/50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-700 active:bg-indigo-100 dark:active:bg-indigo-500/20 active:scale-95 transition-all border border-gray-200/50 dark:border-white/5"
                      >
                        <span className="text-2xl font-medium text-gray-900 dark:text-white">{btn.digit}</span>
                        {btn.letters && <span className="text-[10px] text-gray-500 dark:text-slate-400 font-medium tracking-widest uppercase">{btn.letters}</span>}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="incall"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center h-full gap-6"
                  >
                    {/* Ripple animation for calling/connected */}
                    <div className="relative flex justify-center items-center w-24 h-24 mt-4">
                      {callState === 'connected' && (
                        <>
                          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                          <div className="absolute inset-2 rounded-full border-2 border-emerald-500/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                        </>
                      )}
                      {callState === 'calling' && (
                         <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-ping" />
                      )}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg z-10 ${
                        callState === 'connected' ? 'bg-emerald-500 text-white' : 
                        callState === 'calling' ? 'bg-amber-500 text-white' : 
                        'bg-gray-200 dark:bg-slate-700 text-gray-400'
                      }`}>
                        <User className="w-10 h-10" />
                      </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        disabled={callState !== 'connected'}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isMuted 
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'bg-gray-100/50 text-gray-600 dark:bg-slate-800/50 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                        } disabled:opacity-50`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <button 
                        disabled={callState !== 'connected'}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-gray-100/50 text-gray-600 dark:bg-slate-800/50 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50"
                      >
                        <Pause className="w-5 h-5" />
                      </button>
                      <button 
                        disabled={callState !== 'connected'}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-gray-100/50 text-gray-600 dark:bg-slate-800/50 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex justify-center gap-6 items-center">
              {callState === 'idle' ? (
                <>
                  <button className="w-12 h-12 rounded-full bg-gray-100/50 dark:bg-slate-800/50 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleCallAction}
                    disabled={!number}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center text-white transition-transform active:scale-90 disabled:opacity-50 disabled:active:scale-100"
                  >
                    <PhoneCall className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="w-12 h-12 rounded-full bg-gray-100/50 dark:bg-slate-800/50 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleCallAction}
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center text-white transition-transform active:scale-90"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
