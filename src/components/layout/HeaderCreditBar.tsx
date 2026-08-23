'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageSquare, Wallet, Plus, X, Zap } from 'lucide-react';

export const HeaderCreditBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState({
    remainingMinutes: 0,
    walletBalanceNpr: 0
  });

  useEffect(() => {
    fetch('/api/org/billing/summary')
      .then(res => res.json())
      .then(data => {
        if(data && typeof data.walletBalanceNpr === 'number') {
          setBalance({
            walletBalanceNpr: data.walletBalanceNpr,
            remainingMinutes: data.totalRemainingMinutes || 0
          });
        }
      }).catch(err => console.error("Error fetching balance:", err));
  }, []);

  const textCredits = Math.floor(balance.walletBalanceNpr / 0.50);

  return (
    <>
      <div className="h-16 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 shrink-0 relative z-40">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-bold text-lg hidden sm:block">Voice Engine Hub</h2>
        </div>

        {/* Global Credit Status */}
        <div className="flex items-center gap-3">
          
          <div className="hidden md:flex items-center gap-4 bg-slate-900 border border-white/10 rounded-xl px-4 py-1.5 h-10">
            {/* Voice Credit */}
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase leading-tight">Voice Min</span>
                <span className="text-sm font-black text-white leading-tight">{balance.remainingMinutes.toLocaleString()}</span>
              </div>
            </div>

            {/* Omnichannel Credit (Calculated dynamically) */}
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase leading-tight">Texts / WhatsApp</span>
                <span className="text-sm font-black text-white leading-tight">~{textCredits.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance & Top Up Button */}
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-1 h-10 pl-4">
            <div className="flex items-center gap-2 mr-2">
              <Wallet className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-black text-indigo-100">Rs. {balance.walletBalanceNpr.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white h-8 px-3 rounded-lg flex items-center gap-1 font-bold text-xs transition-colors"
            >
              <Plus className="w-3 h-3" /> Top Up
            </button>
          </div>

        </div>
      </div>

      {/* Top Up Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400"/> Quick Recharge
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['1000', '5000', '10000', '25000'].map((amt) => (
                    <button key={amt} className="py-3 rounded-xl bg-slate-950 border border-white/5 hover:border-indigo-500/50 text-slate-300 font-bold text-sm transition-all hover:bg-indigo-500/10 hover:text-indigo-300">
                      Rs. {amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">Rs.</span>
                  <input 
                    type="number" 
                    placeholder="Custom Amount" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  Proceed to Payment
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-wider">
                  Secure Payments via eSewa, Khalti, & ConnectIPS
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
