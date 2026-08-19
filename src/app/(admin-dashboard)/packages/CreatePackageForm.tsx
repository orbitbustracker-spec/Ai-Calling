'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePackageForm() {
  const router = useRouter();
  
  const [name, setName] = useState('Business 2000');
  const [minutes, setMinutes] = useState(2000);
  const [rate, setRate] = useState(5.0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const calculatedPrice = minutes * rate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          minutes,
          ratePerMinute: rate
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create package');
      }

      setMessage('Package created successfully!');
      // Reset to defaults
      setName('');
      setMinutes(0);
      setRate(5.0);
      
      // Refresh the page to see the new package in the list
      router.refresh();
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Error: ${err.message}`);
      } else {
        setMessage('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border space-y-6">
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Business 2000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
        <input 
          type="number" 
          required
          min="1"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rate / minute (Rs.)</label>
        <input 
          type="number" 
          required
          min="0.1"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex justify-between items-center">
        <span className="text-blue-900 font-medium">Total Package Price</span>
        <span className="text-2xl font-bold text-blue-900">
          Rs. {calculatedPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
      </div>

      {message && (
        <div className={`p-3 rounded-md text-sm ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Package'}
      </button>

    </form>
  );
}
