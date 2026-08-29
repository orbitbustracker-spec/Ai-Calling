'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Clock, History, AlertCircle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/Button';

export default function BillingClient({ balance, activeAssignment, recentTransactions }: any) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('5000');

  const progressPercent = activeAssignment && activeAssignment.purchasedMinutes > 0
    ? (activeAssignment.usedMinutes / activeAssignment.purchasedMinutes) * 100
    : 0;

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-gray-700 dark:text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> Billing & Usage
          </h1>
          <p className="text-gray-500 dark:text-slate-400">Manage your organization's credits, packages, and transaction history.</p>
        </div>
        <Button onClick={() => setShowTopUp(true)} className="bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10 shadow-sm">
          <CreditCard className="w-5 h-5" /> Buy Credit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 dark:bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <h3 className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-2">Available Balance</h3>
          <div className="text-4xl font-black text-gray-900 dark:text-white mb-4">Rs. {balance?.currentBalance?.toLocaleString() || '0.00'}</div>
          
          <div className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> Account is active
          </div>
        </div>

        {/* Current Package */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">Active Voice Package</h3>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{activeAssignment?.package?.name || 'Pay-As-You-Go Plan'}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{activeAssignment?.remainingMinutes?.toLocaleString() || '0'} min</div>
              <div className="text-sm text-gray-500 dark:text-slate-400">Remaining</div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">
              <span>{activeAssignment?.usedMinutes?.toLocaleString() || '0'} min used</span>
              <span>{activeAssignment?.purchasedMinutes?.toLocaleString() || '0'} total min</span>
            </div>
            <div className="h-3 w-full bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden border border-gray-200 dark:border-white/5">
              <div 
                className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-sm dark:shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000" 
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col flex-1 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-900/80">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Recent Transactions
          </h3>
        </div>
        
        <div className="overflow-y-auto">
           <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
              <thead className="text-[10px] uppercase bg-gray-100 dark:bg-slate-950/50 text-gray-500 dark:text-slate-500 border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {recentTransactions && recentTransactions.length > 0 ? recentTransactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{new Date(tx.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-[10px] font-bold uppercase rounded-full px-2 py-0.5 w-fit border ${
                        tx.type === 'DEDUCTION' ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-transparent' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-transparent'
                      }`}>
                        {tx.type === 'DEDUCTION' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'DEDUCTION' ? 'text-gray-700 dark:text-slate-300' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {tx.type === 'DEDUCTION' ? '-' : '+'} Rs. {tx.amount.toFixed(2)}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-slate-500 font-medium">No transactions found.</td>
                  </tr>
                )}
              </tbody>
           </table>
        </div>
      </div>

      {/* Top Up Modal */}
      <AnimatePresence>
        {showTopUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm">
             <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/> Recharge Wallet
                  </h3>
                  <button onClick={() => setShowTopUp(false)} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Select Amount</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['1000', '5000', '10000'].map(amt => (
                        <button 
                          key={amt}
                          onClick={() => setTopUpAmount(amt)}
                          className={`py-3 rounded-xl font-bold text-sm transition-all border ${topUpAmount === amt ? 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-white/5 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-white/20'}`}
                        >
                          Rs. {amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 dark:text-slate-500">Rs.</span>
                      <input 
                        type="number" 
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500" 
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900 flex gap-3">
                  <Button onClick={() => setShowTopUp(false)} className="flex-1 bg-white dark:bg-transparent border border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-400 font-bold shadow-sm dark:shadow-none">Cancel</Button>
                  <Button onClick={() => {
                    alert('Integration with eSewa / Khalti / Stripe goes here.');
                    setShowTopUp(false);
                  }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-bold shadow-sm dark:shadow-[0_0_15px_rgba(79,70,229,0.3)]">Proceed to Pay</Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
