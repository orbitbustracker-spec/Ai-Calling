'use client';

import React from 'react';
import { Download, Search, FileSpreadsheet, RefreshCcw, ExternalLink } from 'lucide-react';

const ORDERS = [
  { id: 'ORD-001', customer: 'Sneh Raj', mobile: '9841234567', items: '1x Black Jacket (L)', amount: 4500, status: 'Payment Verified', address: 'Baneshwor, Ktm' },
  { id: 'ORD-002', customer: 'Rajan Koirala', mobile: '9812345678', items: '2x Wireless Earbuds', amount: 3000, status: 'Pending Payment Verification', address: 'Lakeside, Pokhara' },
  { id: 'ORD-003', customer: 'Istuti', mobile: '9801234567', items: '1x Smart Watch', amount: 5500, status: 'Dispatched', address: 'Patan, Lalitpur' },
];

export default function OrdersPage() {
  return (
    <div className="h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Automated Orders</h1>
          <p className="text-slate-400">AI automatically extracts orders from social conversations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-600/30 rounded-lg transition-colors font-semibold text-sm">
            <FileSpreadsheet className="w-4 h-4" /> Sync to Google Sheets
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-lg transition-colors font-semibold text-sm">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md relative z-10">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-950/50 text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-bold tracking-wider">Items Ordered</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Amount (NPR)</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider">Address</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-900/30">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{order.customer}</div>
                    <div className="text-xs text-slate-500">{order.mobile}</div>
                  </td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 text-right font-bold text-white">Rs. {order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border
                      ${order.status === 'Payment Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                      ${order.status === 'Pending Payment Verification' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                      ${order.status === 'Dispatched' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate">{order.address}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 ml-auto">
                      View <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
