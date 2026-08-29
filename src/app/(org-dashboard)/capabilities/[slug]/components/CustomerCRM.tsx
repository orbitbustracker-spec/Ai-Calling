'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Calendar, Phone, Mail, MoreVertical, Paperclip, Send, Clock, User, FileText, CheckCircle2, AlertCircle, Activity, Plus } from 'lucide-react';

export default function CustomerCRM() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'activity';
  
  const [activeTab, setActiveTab] = useState('notes');
  const [activeDepartment, setActiveDepartment] = useState('Sales');
  
  // States
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [stayInTouch, setStayInTouch] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Forms
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [newTransaction, setNewTransaction] = useState({ amount: '', description: '' });
  const [newReminder, setNewReminder] = useState({ title: '', description: '', dueDate: '' });
  const [newStayInTouch, setNewStayInTouch] = useState({ title: '', description: '', dueDate: '' });

  const fetchData = async (endpoint: string, setter: any, type?: string) => {
    try {
      setLoading(true);
      const url = type ? `/api/crm/${endpoint}?type=${type}` : `/api/crm/${endpoint}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data[endpoint]) setter(data[endpoint]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'activity') {
      if (activeTab === 'notes') fetchData('notes', setNotes);
      if (activeTab === 'contacts') fetchData('contacts', setContacts);
      if (activeTab === 'members') fetchData('members', setMembers);
    } else if (view === 'tickets') {
      fetchData('tickets', setTickets);
    } else if (view === 'transactions') {
      fetchData('transactions', setTransactions);
    } else if (view === 'reminder') {
      fetchData('reminders', setReminders, 'REMINDER');
    } else if (view === 'stay-in-touch') {
      fetchData('reminders', setStayInTouch, 'STAY_IN_TOUCH');
    }
  }, [view, activeTab]);

  const handleSaveNote = async () => {
    if (!noteText.trim()) return;
    try {
      const res = await fetch('/api/crm/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: noteText }) });
      if (res.ok) { setNoteText(''); fetchData('notes', setNotes); }
    } catch (e) { console.error(e); }
  };

  const handleSaveContact = async () => {
    if (!newContact.name) return;
    try {
      const res = await fetch('/api/crm/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newContact) });
      if (res.ok) { setNewContact({ name: '', email: '', phone: '' }); fetchData('contacts', setContacts); }
    } catch (e) { console.error(e); }
  };

  const handleSaveTicket = async () => {
    if (!newTicket.title) return;
    try {
      const res = await fetch('/api/crm/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTicket) });
      if (res.ok) { setNewTicket({ title: '', description: '' }); fetchData('tickets', setTickets); }
    } catch (e) { console.error(e); }
  };

  const handleSaveTransaction = async () => {
    if (!newTransaction.amount) return;
    try {
      const res = await fetch('/api/crm/transactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: parseFloat(newTransaction.amount), description: newTransaction.description }) });
      if (res.ok) { setNewTransaction({ amount: '', description: '' }); fetchData('transactions', setTransactions); }
    } catch (e) { console.error(e); }
  };

  const handleSaveReminder = async () => {
    if (!newReminder.title || !newReminder.dueDate) return;
    try {
      const res = await fetch('/api/crm/reminders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newReminder, type: 'REMINDER' }) });
      if (res.ok) { setNewReminder({ title: '', description: '', dueDate: '' }); fetchData('reminders', setReminders, 'REMINDER'); }
    } catch (e) { console.error(e); }
  };

  const handleSaveStayInTouch = async () => {
    if (!newStayInTouch.title || !newStayInTouch.dueDate) return;
    try {
      const res = await fetch('/api/crm/reminders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newStayInTouch, type: 'STAY_IN_TOUCH' }) });
      if (res.ok) { setNewStayInTouch({ title: '', description: '', dueDate: '' }); fetchData('reminders', setStayInTouch, 'STAY_IN_TOUCH'); }
    } catch (e) { console.error(e); }
  };

  const markReminderComplete = async (id: string, type: 'REMINDER' | 'STAY_IN_TOUCH') => {
    try {
      const res = await fetch('/api/crm/reminders', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'COMPLETED' }) });
      if (res.ok) { 
        if (type === 'REMINDER') fetchData('reminders', setReminders, 'REMINDER');
        else fetchData('reminders', setStayInTouch, 'STAY_IN_TOUCH');
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* Top Header */}
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
          {view.replace('-', ' ')}
        </h2>
        
        {view === 'activity' && (
           <div className="flex gap-4">
             <div className="bg-orange-50 rounded-2xl p-4 flex gap-4 items-center border border-orange-100">
               <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">c</div>
               <div>
                 <div className="text-xs font-bold text-orange-600/60 tracking-wider">IVR Credit</div>
                 <div className="font-black text-slate-900">679.5</div>
               </div>
             </div>
             
             <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 items-center border border-slate-100">
               <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">V</div>
               <div>
                 <div className="text-xs font-bold text-slate-500 tracking-wider">Bulk Voice Credit</div>
                 <div className="font-black text-slate-900">14002</div>
               </div>
             </div>

             <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 rounded-2xl font-bold shadow-sm transition-all hover:shadow-md">
               Buy<br/>Credit
             </button>
           </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-50/50 p-8 overflow-y-auto">
        
        {view === 'activity' && (
          <div className="max-w-4xl mx-auto space-y-6">
             {/* Tabs */}
             <div className="flex gap-6 border-b border-slate-200">
                <button onClick={() => setActiveTab('notes')} className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 ${activeTab === 'notes' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <FileText className="w-4 h-4" /> Notes
                </button>
                <button onClick={() => setActiveTab('members')} className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 ${activeTab === 'members' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <User className="w-4 h-4" /> Members
                </button>
                <button onClick={() => setActiveTab('contacts')} className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 ${activeTab === 'contacts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <Phone className="w-4 h-4" /> Contacts
                </button>
             </div>

             {activeTab === 'notes' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">N</div>
                    <div className="flex-1 relative">
                      <textarea 
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Click to add note..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none min-h-[100px]"
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                        <button onClick={handleSaveNote} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"><Send className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mt-8">
                     {loading ? <div className="text-center text-slate-400 text-sm">Loading notes...</div> : 
                      notes.length === 0 ? <div className="text-center text-slate-400 text-sm">No notes found.</div> :
                      notes.map((note: any) => (
                        <div key={note.id} className="flex gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group">
                          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {note.user?.email?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900">{note.user?.email || 'Unknown User'}</span>
                              <span className="text-xs text-slate-400 font-medium">added a note</span>
                              <span className="text-xs text-slate-400 ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(note.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">{note.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
             )}

             {activeTab === 'contacts' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                     <h3 className="font-bold text-slate-800">Add New Contact</h3>
                     <input type="text" placeholder="Name" value={newContact.name} onChange={e=>setNewContact({...newContact, name: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
                     <input type="email" placeholder="Email" value={newContact.email} onChange={e=>setNewContact({...newContact, email: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
                     <input type="text" placeholder="Phone" value={newContact.phone} onChange={e=>setNewContact({...newContact, phone: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
                     <button onClick={handleSaveContact} className="bg-indigo-600 text-white p-3 rounded-lg font-bold">Add Contact</button>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-slate-800 mb-4">Contact List</h3>
                     {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                      contacts.map((c: any) => (
                        <div key={c.id} className="flex justify-between p-3 border-b border-slate-100 last:border-0">
                          <div>
                            <div className="font-bold text-slate-800">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.email} • {c.phone}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
             )}

             {activeTab === 'members' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-bold text-slate-800 mb-4">Organization Members</h3>
                   {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                    members.map((m: any) => (
                      <div key={m.id} className="flex items-center gap-3 p-3 border-b border-slate-100 last:border-0">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                          {m.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="font-medium text-slate-800">{m.email}</div>
                        <div className="text-xs px-2 py-1 bg-slate-100 rounded ml-auto">{m.role}</div>
                      </div>
                    ))}
                </div>
             )}
          </div>
        )}

        {view === 'tickets' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
               <h3 className="font-bold text-slate-800">Create New Ticket</h3>
               <input type="text" placeholder="Issue Title" value={newTicket.title} onChange={e=>setNewTicket({...newTicket, title: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <textarea placeholder="Description" value={newTicket.description} onChange={e=>setNewTicket({...newTicket, description: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <button onClick={handleSaveTicket} className="bg-indigo-600 text-white p-3 rounded-lg font-bold">Create Ticket</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-4">Open Tickets</h3>
               {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                tickets.map((t: any) => (
                  <div key={t.id} className="p-4 border border-slate-100 rounded-xl mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-slate-800">{t.title}</div>
                      <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${t.status === 'OPEN' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{t.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {view === 'transactions' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
               <h3 className="font-bold text-slate-800">New Transaction</h3>
               <input type="number" placeholder="Amount" value={newTransaction.amount} onChange={e=>setNewTransaction({...newTransaction, amount: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <input type="text" placeholder="Description" value={newTransaction.description} onChange={e=>setNewTransaction({...newTransaction, description: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <button onClick={handleSaveTransaction} className="bg-indigo-600 text-white p-3 rounded-lg font-bold">Add Transaction</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-4">Transaction History</h3>
               {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                transactions.map((t: any) => (
                  <div key={t.id} className="flex justify-between p-4 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="font-bold text-slate-800">{t.description || 'Payment'}</div>
                      <div className="text-xs text-slate-500">{new Date(t.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="font-black text-slate-900">NPR {t.amount}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {view === 'reminder' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
               <h3 className="font-bold text-slate-800">Set a Reminder</h3>
               <input type="text" placeholder="Reminder Title" value={newReminder.title} onChange={e=>setNewReminder({...newReminder, title: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <textarea placeholder="Description" value={newReminder.description} onChange={e=>setNewReminder({...newReminder, description: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <input type="date" value={newReminder.dueDate} onChange={e=>setNewReminder({...newReminder, dueDate: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <button onClick={handleSaveReminder} className="bg-indigo-600 text-white p-3 rounded-lg font-bold">Save Reminder</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-4">Upcoming Reminders</h3>
               {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                reminders.length === 0 ? <div className="text-sm text-slate-500">No upcoming reminders.</div> :
                reminders.map((r: any) => (
                  <div key={r.id} className={`p-4 border rounded-xl mb-3 ${r.status === 'COMPLETED' ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className={`font-bold ${r.status === 'COMPLETED' ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>{r.title}</div>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(r.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${r.status === 'COMPLETED' ? 'text-emerald-600 line-through' : 'text-slate-600'}`}>{r.description}</p>
                    {r.status !== 'COMPLETED' && (
                      <button onClick={() => markReminderComplete(r.id, 'REMINDER')} className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 font-bold py-1.5 px-3 rounded transition-colors">
                        Mark as Complete
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {view === 'stay-in-touch' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
               <h3 className="font-bold text-slate-800">Schedule Follow-Up</h3>
               <input type="text" placeholder="Contact Name / Organization" value={newStayInTouch.title} onChange={e=>setNewStayInTouch({...newStayInTouch, title: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <textarea placeholder="Reason for follow-up" value={newStayInTouch.description} onChange={e=>setNewStayInTouch({...newStayInTouch, description: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <input type="date" value={newStayInTouch.dueDate} onChange={e=>setNewStayInTouch({...newStayInTouch, dueDate: e.target.value})} className="border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500" />
               <button onClick={handleSaveStayInTouch} className="bg-indigo-600 text-white p-3 rounded-lg font-bold">Schedule Follow-Up</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-4">Stay In-Touch Schedule</h3>
               {loading ? <div className="text-sm text-slate-500">Loading...</div> : 
                stayInTouch.length === 0 ? <div className="text-sm text-slate-500">No follow-ups scheduled.</div> :
                stayInTouch.map((r: any) => (
                  <div key={r.id} className={`p-4 border rounded-xl mb-3 flex items-start gap-4 ${r.status === 'COMPLETED' ? 'border-emerald-200 bg-emerald-50' : 'border-indigo-100 bg-indigo-50/30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className={`font-bold ${r.status === 'COMPLETED' ? 'text-emerald-800' : 'text-slate-800'}`}>{r.title}</div>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(r.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm mb-3 ${r.status === 'COMPLETED' ? 'text-emerald-600' : 'text-slate-600'}`}>{r.description}</p>
                      {r.status !== 'COMPLETED' && (
                        <button onClick={() => markReminderComplete(r.id, 'STAY_IN_TOUCH')} className="text-xs bg-indigo-100 hover:bg-emerald-100 hover:text-emerald-700 text-indigo-700 font-bold py-1.5 px-3 rounded transition-colors flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
