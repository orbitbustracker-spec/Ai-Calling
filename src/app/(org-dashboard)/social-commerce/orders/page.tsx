'use client';

import React from 'react';
import { Download, Search, FileSpreadsheet, RefreshCcw, ExternalLink } from 'lucide-react';

const ORDERS = [
  { id: 'ORD-001', customer: 'Sneh Raj', mobile: '9841234567', items: '1x Black Jacket (L)', amount: 4500, status: 'Payment Verified', address: 'Baneshwor, Ktm' },
  { id: 'ORD-002', customer: 'Rajan Koirala', mobile: '9812345678', items: '2x Wireless Earbuds', amount: 3000, status: 'Pending Payment Verification', address: 'Lakeside, Pokhara' },
  { id: 'ORD-003', customer: 'Istuti', mobile: '9801234567', items: '1x Smart Watch', amount: 5500, status: 'Dispatched', address: 'Patan, Lalitpur' },
];

export default function OrdersPage() {
  const handleSyncGoogleSheets = () => {
    alert("Authenticating with Google...\nSyncing orders to Google Sheets.");
  };

  const handleExportExcel = () => {
    alert("Downloading orders_export.xlsx...");
  };

  return (
    <div className="h-full text-slate-900 dark:text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Automated Orders</h1>
          <p className="text-gray-500 dark:text-slate-400">AI automatically extracts orders from social conversations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSyncGoogleSheets}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-green-600/10 hover:bg-emerald-100 dark:hover:bg-green-600/20 text-emerald-700 dark:text-green-500 border border-emerald-200 dark:border-green-600/30 rounded-lg transition-colors font-semibold text-sm shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" /> Sync to Google Sheets
          </button>
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-lg transition-colors font-semibold text-sm shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-900/80 backdrop-blur-md relative z-10">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:border-indigo-500 outline-none"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-slate-950/50 text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-white/10">
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
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-slate-900/30">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 dark:text-white">{order.customer}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-500">{order.mobile}</div>
                  </td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">Rs. {order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border
                      ${order.status === 'Payment Verified' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : ''}
                      ${order.status === 'Pending Payment Verification' ? 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20' : ''}
                      ${order.status === 'Dispatched' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate">{order.address}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 ml-auto">
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
